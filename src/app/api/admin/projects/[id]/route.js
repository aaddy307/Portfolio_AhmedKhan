import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin } from '@/lib/verifyAdmin';
import Project from '@/models/Project';

export async function PUT(request, { params }) {
  const { id } = await params;
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();

    const project = await Project.findByIdAndUpdate(
      id,
      {
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
      },
      { returnDocument: 'after' }
    );

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('PUT project error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error) {
    console.error('DELETE project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
