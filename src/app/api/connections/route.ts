import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET /api/connections - List connections for a user
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const status = request.nextUrl.searchParams.get('status') || 'all';

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  try {
    let connections;

    if (status === 'all') {
      // Get all connections (sent and received)
      connections = await sql`
        SELECT
          c.*,
          ut_from.display_name as from_name,
          ut_from.company as from_company,
          ut_from.title as from_title,
          ut_from.type as from_type,
          ut_from.avatar_url as from_avatar,
          ut_to.display_name as to_name,
          ut_to.company as to_company,
          ut_to.title as to_title,
          ut_to.type as to_type,
          ut_to.avatar_url as to_avatar
        FROM connections c
        LEFT JOIN user_types ut_from ON c.from_user_id = ut_from.user_id
        LEFT JOIN user_types ut_to ON c.to_user_id = ut_to.user_id
        WHERE c.from_user_id = ${userId} OR c.to_user_id = ${userId}
        ORDER BY c.created_at DESC
      `;
    } else {
      // Filter by status
      connections = await sql`
        SELECT
          c.*,
          ut_from.display_name as from_name,
          ut_from.company as from_company,
          ut_from.title as from_title,
          ut_from.type as from_type,
          ut_to.display_name as to_name,
          ut_to.company as to_company,
          ut_to.title as to_title,
          ut_to.type as to_type
        FROM connections c
        LEFT JOIN user_types ut_from ON c.from_user_id = ut_from.user_id
        LEFT JOIN user_types ut_to ON c.to_user_id = ut_to.user_id
        WHERE (c.from_user_id = ${userId} OR c.to_user_id = ${userId})
          AND c.status = ${status}
        ORDER BY c.created_at DESC
      `;
    }

    return NextResponse.json({ connections });
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 });
  }
}

// POST /api/connections - Send a connection request
export async function POST(request: NextRequest) {
  try {
    const { fromUserId, toUserId, message } = await request.json();

    if (!fromUserId || !toUserId) {
      return NextResponse.json({ error: 'fromUserId and toUserId required' }, { status: 400 });
    }

    // Create the connection request
    const result = await sql`
      INSERT INTO connections (from_user_id, to_user_id, message, status)
      VALUES (${fromUserId}, ${toUserId}, ${message || null}, 'pending')
      ON CONFLICT (from_user_id, to_user_id) DO UPDATE SET
        message = EXCLUDED.message,
        updated_at = NOW()
      RETURNING *
    `;

    return NextResponse.json({ connection: result[0], created: true });
  } catch (error) {
    console.error('Error creating connection:', error);
    return NextResponse.json({ error: 'Failed to create connection' }, { status: 500 });
  }
}

// PATCH /api/connections - Accept or reject a connection
export async function PATCH(request: NextRequest) {
  try {
    const { connectionId, status } = await request.json();

    if (!connectionId || !['accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'connectionId and valid status (accepted/rejected) required' }, { status: 400 });
    }

    const result = await sql`
      UPDATE connections
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${connectionId}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }

    return NextResponse.json({ connection: result[0], updated: true });
  } catch (error) {
    console.error('Error updating connection:', error);
    return NextResponse.json({ error: 'Failed to update connection' }, { status: 500 });
  }
}
