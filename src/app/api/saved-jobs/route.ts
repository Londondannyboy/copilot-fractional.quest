import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET - fetch saved jobs for a user
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ jobs: [] });
  }

  try {
    const jobs = await sql`
      SELECT sj.id, sj.saved_at, tj.title, tj.company, tj.location
      FROM saved_jobs sj
      JOIN test_jobs tj ON sj.job_id = tj.id
      WHERE sj.user_id = ${userId}
      ORDER BY sj.saved_at DESC
    `;
    return NextResponse.json({ jobs });
  } catch (e: any) {
    // Table might not exist yet
    console.error('Error fetching saved jobs:', e.message);
    return NextResponse.json({ jobs: [] });
  }
}

// POST - save a job for a user
export async function POST(req: NextRequest) {
  const { userId, jobId } = await req.json();

  if (!userId || !jobId) {
    return NextResponse.json({ error: 'Missing userId or jobId' }, { status: 400 });
  }

  try {
    // Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS saved_jobs (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        job_id INTEGER NOT NULL,
        saved_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, job_id)
      )
    `;

    // Insert saved job
    await sql`
      INSERT INTO saved_jobs (user_id, job_id)
      VALUES (${userId}, ${jobId})
      ON CONFLICT (user_id, job_id) DO NOTHING
    `;

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Error saving job:', e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE - unsave a job
export async function DELETE(req: NextRequest) {
  const { userId, jobId } = await req.json();

  if (!userId || !jobId) {
    return NextResponse.json({ error: 'Missing userId or jobId' }, { status: 400 });
  }

  try {
    await sql`
      DELETE FROM saved_jobs
      WHERE user_id = ${userId} AND job_id = ${jobId}
    `;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Error deleting saved job:', e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
