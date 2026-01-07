import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET /api/messages - List messages for a user
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const unreadOnly = request.nextUrl.searchParams.get('unreadOnly') === 'true';
  const withUserId = request.nextUrl.searchParams.get('withUserId'); // For conversation view

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  try {
    let messages;

    if (withUserId) {
      // Get conversation with specific user
      messages = await sql`
        SELECT
          m.*,
          ut.display_name as sender_name,
          ut.company as sender_company,
          ut.title as sender_title,
          ut.type as sender_type,
          ut.avatar_url as sender_avatar
        FROM messages m
        LEFT JOIN user_types ut ON m.from_user_id = ut.user_id
        WHERE (m.from_user_id = ${userId} AND m.to_user_id = ${withUserId})
           OR (m.from_user_id = ${withUserId} AND m.to_user_id = ${userId})
        ORDER BY m.created_at ASC
      `;

      // Mark messages as read
      await sql`
        UPDATE messages
        SET read_at = NOW()
        WHERE to_user_id = ${userId}
          AND from_user_id = ${withUserId}
          AND read_at IS NULL
      `;
    } else if (unreadOnly) {
      // Get unread messages count and preview
      messages = await sql`
        SELECT
          m.*,
          ut.display_name as sender_name,
          ut.company as sender_company,
          ut.title as sender_title,
          ut.type as sender_type,
          ut.avatar_url as sender_avatar
        FROM messages m
        LEFT JOIN user_types ut ON m.from_user_id = ut.user_id
        WHERE m.to_user_id = ${userId} AND m.read_at IS NULL
        ORDER BY m.created_at DESC
      `;
    } else {
      // Get all messages (inbox view - latest per conversation)
      messages = await sql`
        WITH ranked_messages AS (
          SELECT
            m.*,
            ut.display_name as sender_name,
            ut.company as sender_company,
            ut.title as sender_title,
            ut.type as sender_type,
            ut.avatar_url as sender_avatar,
            ROW_NUMBER() OVER (
              PARTITION BY
                CASE WHEN m.from_user_id = ${userId} THEN m.to_user_id ELSE m.from_user_id END
              ORDER BY m.created_at DESC
            ) as rn
          FROM messages m
          LEFT JOIN user_types ut ON m.from_user_id = ut.user_id
          WHERE m.from_user_id = ${userId} OR m.to_user_id = ${userId}
        )
        SELECT * FROM ranked_messages WHERE rn = 1
        ORDER BY created_at DESC
      `;
    }

    // Get unread count
    const unreadCount = await sql`
      SELECT COUNT(*) as count
      FROM messages
      WHERE to_user_id = ${userId} AND read_at IS NULL
    `;

    return NextResponse.json({
      messages,
      unreadCount: parseInt(unreadCount[0]?.count || '0', 10)
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST /api/messages - Send a message
export async function POST(request: NextRequest) {
  try {
    const { fromUserId, toUserId, content } = await request.json();

    if (!fromUserId || !toUserId || !content) {
      return NextResponse.json({ error: 'fromUserId, toUserId, and content required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO messages (from_user_id, to_user_id, content)
      VALUES (${fromUserId}, ${toUserId}, ${content})
      RETURNING *
    `;

    return NextResponse.json({ message: result[0], sent: true });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

// PATCH /api/messages - Mark messages as read
export async function PATCH(request: NextRequest) {
  try {
    const { userId, messageIds } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    let result;
    if (messageIds && messageIds.length > 0) {
      // Mark specific messages as read
      result = await sql`
        UPDATE messages
        SET read_at = NOW()
        WHERE id = ANY(${messageIds}::int[])
          AND to_user_id = ${userId}
          AND read_at IS NULL
        RETURNING id
      `;
    } else {
      // Mark all as read
      result = await sql`
        UPDATE messages
        SET read_at = NOW()
        WHERE to_user_id = ${userId}
          AND read_at IS NULL
        RETURNING id
      `;
    }

    return NextResponse.json({ markedRead: result.length });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json({ error: 'Failed to mark messages as read' }, { status: 500 });
  }
}
