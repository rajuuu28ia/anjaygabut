import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { technologies } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const allTechnologies = await db
      .select()
      .from(technologies)
      .orderBy(asc(technologies.name));

    return NextResponse.json(allTechnologies);
  } catch (error) {
    console.error('Get technologies error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data technologies' },
      { status: 500 }
    );
  }
}
