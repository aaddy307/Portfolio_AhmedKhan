import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/verifyAdmin';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: 'Ahmed_Portfolio',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve(
              NextResponse.json({ error: 'Upload failed' }, { status: 500 })
            );
          } else {
            resolve(
              NextResponse.json({ url: result.secure_url }, { status: 200 })
            );
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
