import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Certificate from '@/models/Certificate';

export async function GET() {
  try {
    await connectDB();
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error('GET public certificates error:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}
