import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { aboutContent } from '@/lib/db/schema';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [content] = await db.select().from(aboutContent).limit(1);

    if (!content) {
      return NextResponse.json(
        { error: 'About content tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Get about error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data about' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { title, subtitle, paragraphs } = body;

    if (!title || !subtitle || !paragraphs) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    const [existing] = await db.select().from(aboutContent).limit(1);

    let updated;
    if (existing) {
      [updated] = await db
        .update(aboutContent)
        .set({
          title,
          subtitle,
          paragraphs,
          updatedAt: new Date(),
        })
        .returning();
    } else {
      [updated] = await db
        .insert(aboutContent)
        .values({
          title,
          subtitle,
          paragraphs,
        })
        .returning();
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Update about error:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate about' },
      { status: 500 }
    );
  }
}
