import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET /api/people - List all people (recruiters, coaches, candidates)
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');

  try {
    let people;

    if (type) {
      people = await sql`
        SELECT user_id, type, display_name, company, title, verified, bio, avatar_url
        FROM user_types
        WHERE type = ${type}
        ORDER BY verified DESC, display_name ASC
      `;
    } else {
      people = await sql`
        SELECT user_id, type, display_name, company, title, verified, bio, avatar_url
        FROM user_types
        ORDER BY
          CASE type
            WHEN 'recruiter' THEN 1
            WHEN 'coach' THEN 2
            WHEN 'admin' THEN 3
            ELSE 4
          END,
          verified DESC,
          display_name ASC
      `;
    }

    return NextResponse.json({ people });
  } catch (error) {
    console.error('Error fetching people:', error);
    return NextResponse.json({ error: 'Failed to fetch people' }, { status: 500 });
  }
}
