import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin } from '@/lib/verifyAdmin';
import Certificate from '@/models/Certificate';

export async function GET(request) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error('GET certificates error:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(request) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();

    const certificate = await Certificate.create({
      title: body.title,
      type: body.type || '',
      issuer: body.issuer || '',
      description: body.description || '',
      date: body.date || '',
      duration: body.duration || '',
      imageUrl: body.imageUrl || '',
      certificateUrl: body.certificateUrl || '',
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error('POST certificate error:', error);
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
