import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, projectTechnologies, technologies, categories } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';
import { eq, desc } from 'drizzle-orm';

// GET all projects with their technologies and category
export async function GET() {
  try {
    const allProjects = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        imageUrl: projects.imageUrl,
        demoUrl: projects.demoUrl,
        categoryId: projects.categoryId,
        order: projects.order,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .orderBy(desc(projects.order));

    // Fetch technologies and category for each project
    const projectsWithTech = await Promise.all(
      allProjects.map(async (project) => {
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
          .where(eq(projectTechnologies.projectId, project.id));

        let category = null;
        if (project.categoryId) {
          const [cat] = await db
            .select()
            .from(categories)
            .where(eq(categories.id, project.categoryId))
            .limit(1);
          category = cat || null;
        }

        return {
          ...project,
          technologies: techs,
          category,
        };
      })
    );

    return NextResponse.json(projectsWithTech);
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data projects' },
      { status: 500 }
    );
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { title, description, imageUrl, demoUrl, technologyIds, categoryId } = body;

    if (!title || !description || !imageUrl || !demoUrl) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Get the highest order value
    const maxOrderResult = await db
      .select({ order: projects.order })
      .from(projects)
      .orderBy(desc(projects.order))
      .limit(1);

    const newOrder = maxOrderResult.length > 0 ? (maxOrderResult[0].order || 0) + 1 : 1;

    const [newProject] = await db
      .insert(projects)
      .values({
        title,
        description,
        imageUrl,
        demoUrl,
        categoryId: categoryId || null,
        order: newOrder,
      })
      .returning();

    // Insert project technologies
    if (technologyIds && technologyIds.length > 0) {
      await db.insert(projectTechnologies).values(
        technologyIds.map((techId: number) => ({
          projectId: newProject.id,
          technologyId: techId,
        }))
      );
    }

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat project' },
      { status: 500 }
    );
  }
}
