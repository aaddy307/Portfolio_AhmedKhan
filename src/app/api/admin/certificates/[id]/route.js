import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin } from '@/lib/verifyAdmin';
import Certificate from '@/models/Certificate';

export async function PUT(request, { params }) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();

    const certificate = await Certificate.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        type: body.type || '',
        issuer: body.issuer || '',
        description: body.description || '',
        date: body.date || '',
        duration: body.duration || '',
        imageUrl: body.imageUrl || '',
        certificateUrl: body.certificateUrl || '',
      },
      { new: true }
    );

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json(certificate, { status: 200 });
  } catch (error) {
    console.error('PUT certificate error:', error);
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const certificate = await Certificate.findByIdAndDelete(params.id);

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Certificate deleted' }, { status: 200 });
  } catch (error) {
    console.error('DELETE certificate error:', error);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
