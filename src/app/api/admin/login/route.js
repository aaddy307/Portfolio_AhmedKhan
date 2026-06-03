import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import { checkRateLimit, clearRateLimit } from '@/lib/rateLimit';
import Admin from '@/models/Admin';

async function ensureAdmin() {
  try {
    await connectDB();
    const count = await Admin.countDocuments();
    if (count === 0) {
      const username = process.env.ADMIN_USERNAME || 'aaddy307';
      const passwordHash = process.env.ADMIN_PASSWORD_HASH;

      if (!passwordHash) {
        throw new Error(
          'ADMIN_PASSWORD_HASH environment variable is not set. ' +
          'Please set it before the server starts.'
        );
      }

      await Admin.create({ username, passwordHash, role: 'admin' });
      console.log('Admin user auto-created:', username);
    }
  } catch (e) {
    console.error('Failed to auto-create admin:', e);
    throw e;
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
    // Check Authorization header first (from client-side localStorage fetch)
    const authHeader = request.headers.get('authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }

    // Fall back to cookie (for direct browser navigation)
    if (!token) {
      token = request.cookies.get('admin_token')?.value;
    }

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

    // Rate limiting check
    const rateLimit = checkRateLimit(request);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: rateLimit.message },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimit.retryAfterMs / 1000).toString(),
          },
        }
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

    // Login successful — clear rate limit for this IP
    clearRateLimit(request);

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