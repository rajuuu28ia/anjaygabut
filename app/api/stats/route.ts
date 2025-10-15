import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { siteStats } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [stats] = await db.select().from(siteStats).limit(1);

    if (!stats) {
      return NextResponse.json(
        { error: 'Stats tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data stats' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { yearsExperience, projectsCompleted } = body;

    if (!yearsExperience || !projectsCompleted) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    const [existing] = await db.select().from(siteStats).limit(1);

    let updated;
    if (existing) {
      [updated] = await db
        .update(siteStats)
        .set({
          yearsExperience,
          projectsCompleted,
          updatedAt: new Date(),
        })
        .returning();
    } else {
      [updated] = await db
        .insert(siteStats)
        .values({
          yearsExperience,
          projectsCompleted,
        })
        .returning();
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Update stats error:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate stats' },
      { status: 500 }
    );
  }
}
