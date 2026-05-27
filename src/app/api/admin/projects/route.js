import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin } from '@/lib/verifyAdmin';
import Project from '@/models/Project';

export async function GET(request) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('GET projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
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

    const project = await Project.create({
      title: body.title,
      description: body.description || '',
      longDescription: body.longDescription || body.description || '',
      tags: body.tags || [],
      category: body.category || [],
      githubUrl: body.githubUrl || '',
      figmaUrl: body.figmaUrl || '',
      liveUrl: body.liveUrl || '',
      imageUrl: body.imageUrl || '',
      featured: body.featured || false,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
