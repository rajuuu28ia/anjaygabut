import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, projectTechnologies, technologies } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET single project
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);

    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { error: 'Project tidak ditemukan' },
        { status: 404 }
      );
    }

    // Get technologies
    const techs = await db
      .select({
        id: technologies.id,
        name: technologies.name,
        slug: technologies.slug,
      })
      .from(technologies)
      .innerJoin(
        projectTechnologies,
        eq(projectTechnologies.technologyId, technologies.id)
      )
      .where(eq(projectTechnologies.projectId, projectId));

    return NextResponse.json({
      ...project,
      technologies: techs,
    });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data project' },
      { status: 500 }
    );
  }
}

// PATCH update project
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const projectId = parseInt(id);

    const body = await request.json();
    const { title, description, imageUrl, demoUrl, technologyIds } = body;

    // Update project
    const [updatedProject] = await db
      .update(projects)
      .set({
        title,
        description,
        imageUrl,
        demoUrl,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId))
      .returning();

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project tidak ditemukan' },
        { status: 404 }
      );
    }

    // Update technologies
    if (technologyIds) {
      // Delete existing technologies
      await db
        .delete(projectTechnologies)
        .where(eq(projectTechnologies.projectId, projectId));

      // Insert new technologies
      if (technologyIds.length > 0) {
        await db.insert(projectTechnologies).values(
          technologyIds.map((techId: number) => ({
            projectId,
            technologyId: techId,
          }))
        );
      }
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const projectId = parseInt(id);

    await db.delete(projects).where(eq(projects.id, projectId));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus project' },
      { status: 500 }
    );
  }
}
