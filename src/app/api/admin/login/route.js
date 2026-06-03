import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/models/Admin';

async function ensureAdmin() {
  try {
    await connectDB();
    const count = await Admin.countDocuments();
    if (count === 0) {
      const username = process.env.ADMIN_USERNAME || 'aaddy307';
      const passwordHash = process.env.ADMIN_PASSWORD_HASH
        ? process.env.ADMIN_PASSWORD_HASH
        : await bcrypt.hash('Mh05fl7946', 10);
      await Admin.create({ username, passwordHash, role: 'admin' });
      console.log('Admin user auto-created:', username);
    }
  } catch (e) {
    console.error('Failed to auto-create admin:', e);
  }
}

async function findAdmin(username) {
  try {
    await connectDB();
    const admin = await Admin.findOne({ username });
    return admin;
  } catch {
    return null;
  }
}

async function verifyCredentials(username, password) {
  const admin = await findAdmin(username);
  if (admin) {
    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (valid) return true;
  }
  return false;
}

export async function HEAD(request) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: 'Authenticated' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    await ensureAdmin();

    const isValid = await verifyCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      { message: 'Login successful', token },
      { status: 200 }
    );

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
