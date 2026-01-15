import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  if (!process.env.NEON_AUTH_BASE_URL) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const neonAuth = await import('@neondatabase/neon-js/auth/next') as any;
    const authApiHandler = neonAuth.authApiHandler || neonAuth.default?.authApiHandler;
    if (!authApiHandler) {
      return NextResponse.json({ error: 'Auth handler not found' }, { status: 503 });
    }
    const handlers = authApiHandler();
    return handlers.GET(request, context);
  } catch {
    return NextResponse.json({ error: 'Auth module error' }, { status: 503 });
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  if (!process.env.NEON_AUTH_BASE_URL) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const neonAuth = await import('@neondatabase/neon-js/auth/next') as any;
    const authApiHandler = neonAuth.authApiHandler || neonAuth.default?.authApiHandler;
    if (!authApiHandler) {
      return NextResponse.json({ error: 'Auth handler not found' }, { status: 503 });
    }
    const handlers = authApiHandler();
    return handlers.POST(request, context);
  } catch {
    return NextResponse.json({ error: 'Auth module error' }, { status: 503 });
  }
}
