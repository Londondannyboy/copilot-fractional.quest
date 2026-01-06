import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ZEP_API_KEY = process.env.ZEP_API_KEY || '';
const HUME_API_KEY = process.env.HUME_API_KEY || '';

// Webhook event types from Hume
interface HumeWebhookEvent {
  event_name: 'chat_started' | 'chat_ended' | 'tool_call';
  chat_id: string;
  chat_group_id: string;
  config_id: string;
  custom_session_id?: string;
  timestamp: number;
  // chat_started specific
  resumed?: boolean;
  // chat_ended specific
  duration_seconds?: number;
  end_reason?: 'USER_ENDED' | 'USER_TIMEOUT' | 'MAX_DURATION_TIMEOUT' | 'INACTIVITY_TIMEOUT' | 'ERROR';
  // For accessing messages
  messages?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
  // tool_call specific
  tool_call_id?: string;
  tool_name?: string;
  parameters?: string;
  response_required?: boolean;
}

// Validate HMAC signature from Hume
function validateSignature(payload: string, signature: string, timestamp: string): boolean {
  if (!HUME_API_KEY || !signature || !timestamp) {
    console.warn('[Webhook] Missing API key, signature, or timestamp');
    return false;
  }

  const message = `${payload}.${timestamp}`;
  const expectedSig = crypto
    .createHmac('sha256', HUME_API_KEY)
    .update(message)
    .digest('hex');

  const signatureBuffer = Buffer.from(signature, 'utf8');
  const expectedSigBuffer = Buffer.from(expectedSig, 'utf8');

  if (signatureBuffer.length !== expectedSigBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, expectedSigBuffer);
}

// Validate timestamp to prevent replay attacks (within 3 minutes)
function validateTimestamp(timestamp: string): boolean {
  const timestampInt = parseInt(timestamp, 10);
  if (isNaN(timestampInt)) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  const WINDOW = 180; // 3 minutes

  return currentTime - timestampInt <= WINDOW;
}

// Store conversation to Zep for memory extraction
async function storeConversationToZep(
  sessionId: string,
  userId: string,
  messages: Array<{ role: string; content: string }>
): Promise<void> {
  if (!ZEP_API_KEY || !userId) {
    console.log('[Webhook] Skipping Zep storage - no API key or user ID');
    return;
  }

  try {
    // Ensure user exists
    await fetch('https://api.getzep.com/api/v2/users', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${ZEP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });

    // Create/get thread for this session
    await fetch('https://api.getzep.com/api/v2/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${ZEP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        user_id: userId,
        metadata: { source: 'hume_voice' },
      }),
    });

    // Store each message
    for (const msg of messages) {
      await fetch(`https://api.getzep.com/api/v2/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Api-Key ${ZEP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role_type: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        }),
      });
    }

    console.log(`[Webhook] Stored ${messages.length} messages to Zep for user ${userId}`);
  } catch (error) {
    console.error('[Webhook] Error storing to Zep:', error);
  }
}

// Parse custom session ID to extract user info
// Format: "firstName|fractional_userId|location:London,jobs:25"
interface PageContext {
  location?: string;
  totalJobs?: number;
}

function parseSessionId(customSessionId: string): { firstName: string; userId: string; pageContext: PageContext | null } {
  const parts = customSessionId.split('|');
  const firstName = parts[0] || '';
  const sessionPart = parts[1] || '';
  const userId = sessionPart.replace('fractional_', '').replace('fractional_anon_', '');

  let pageContext: PageContext | null = null;
  if (parts[2]) {
    pageContext = {};
    parts[2].split(',').forEach((p: string) => {
      const [key, val] = p.split(':');
      if (key === 'location') pageContext!.location = val;
      if (key === 'jobs') pageContext!.totalJobs = parseInt(val, 10);
    });
  }

  return { firstName, userId, pageContext };
}

export async function POST(req: NextRequest) {
  try {
    // Get raw body for signature validation
    const rawBody = await req.text();
    const signature = req.headers.get('x-hume-ai-webhook-signature') || '';
    const timestamp = req.headers.get('x-hume-ai-webhook-timestamp') || '';

    // Validate signature (skip in development if no key)
    if (HUME_API_KEY && !validateSignature(rawBody, signature, timestamp)) {
      console.error('[Webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Validate timestamp
    if (timestamp && !validateTimestamp(timestamp)) {
      console.error('[Webhook] Timestamp too old');
      return NextResponse.json({ error: 'Request too old' }, { status: 401 });
    }

    // Parse the event
    const event: HumeWebhookEvent = JSON.parse(rawBody);
    const { firstName, userId, pageContext } = parseSessionId(event.custom_session_id || '');

    console.log(`[Webhook] Received ${event.event_name} for chat ${event.chat_id}`);
    console.log(`[Webhook] User: ${firstName || 'anonymous'}, ID: ${userId || 'none'}`);

    switch (event.event_name) {
      case 'chat_started':
        console.log(`[Webhook] Chat started - resumed: ${event.resumed}`);
        // Could initialize session tracking here
        // For now, just log
        if (pageContext) {
          console.log(`[Webhook] Page context: ${JSON.stringify(pageContext)}`);
        }
        break;

      case 'chat_ended':
        console.log(`[Webhook] Chat ended - duration: ${event.duration_seconds}s, reason: ${event.end_reason}`);

        // Store conversation to Zep if we have messages and user ID
        if (event.messages && event.messages.length > 0 && userId) {
          await storeConversationToZep(
            event.chat_id,
            userId,
            event.messages.map(m => ({ role: m.role, content: m.content }))
          );
        } else {
          console.log('[Webhook] No messages or user ID to store');
        }
        break;

      case 'tool_call':
        console.log(`[Webhook] Tool call: ${event.tool_name}`);
        console.log(`[Webhook] Parameters: ${event.parameters}`);
        console.log(`[Webhook] Response required: ${event.response_required}`);

        // Note: Since our CLM handles tools via Pydantic AI, we don't need to
        // respond via Control Plane API. This is just for logging/analytics.
        // If you wanted server-side tool execution separate from CLM, you would:
        // 1. Execute the tool here
        // 2. Send response via Hume Control Plane API
        break;

      default:
        console.warn(`[Webhook] Unknown event type: ${(event as any).event_name}`);
    }

    return NextResponse.json({
      status: 'success',
      event: event.event_name,
      chat_id: event.chat_id,
    });

  } catch (error: any) {
    console.error('[Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// Also handle GET for webhook URL verification (some services do this)
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'hume-webhook' });
}
