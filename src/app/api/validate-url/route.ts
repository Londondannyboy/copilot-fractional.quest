import { NextRequest, NextResponse } from 'next/server';

// GET /api/validate-url?url=... - Validate a company URL exists
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ valid: false, error: 'URL required' }, { status: 400 });
  }

  try {
    // Parse and validate URL format
    const urlObj = new URL(url);

    // Block certain domains that aren't companies
    const blockedDomains = ['localhost', '127.0.0.1', 'example.com', 'test.com'];
    if (blockedDomains.some(d => urlObj.hostname.includes(d))) {
      return NextResponse.json({ valid: false, error: 'Invalid domain' });
    }

    // Try a HEAD request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(urlObj.href, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FractionalQuest/1.0)',
        },
      });
      clearTimeout(timeoutId);

      // Accept 2xx and 3xx status codes as valid
      if (res.ok || (res.status >= 300 && res.status < 400)) {
        return NextResponse.json({
          valid: true,
          url: urlObj.href,
          hostname: urlObj.hostname,
        });
      }

      // Try GET if HEAD fails (some servers don't support HEAD)
      if (res.status === 405) {
        const getRes = await fetch(urlObj.href, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; FractionalQuest/1.0)',
          },
        });
        if (getRes.ok) {
          return NextResponse.json({
            valid: true,
            url: urlObj.href,
            hostname: urlObj.hostname,
          });
        }
      }

      return NextResponse.json({
        valid: false,
        error: `Website returned status ${res.status}`,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      // AbortError means timeout
      if ((fetchError as Error).name === 'AbortError') {
        return NextResponse.json({
          valid: false,
          error: 'Website took too long to respond',
        });
      }

      // Other fetch errors (DNS, connection refused, etc.)
      return NextResponse.json({
        valid: false,
        error: 'Could not connect to website',
      });
    }
  } catch {
    return NextResponse.json({
      valid: false,
      error: 'Invalid URL format',
    });
  }
}
