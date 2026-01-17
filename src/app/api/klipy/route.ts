import { NextRequest, NextResponse } from 'next/server'
import { searchGifs, getOnboardingGif, type OnboardingGifContext } from '@/lib/klipy'

/**
 * GET /api/klipy?q=celebration
 * GET /api/klipy?context=profile_complete
 *
 * Returns a GIF URL for the given query or onboarding context
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const context = searchParams.get('context') as OnboardingGifContext | null

  try {
    if (context) {
      // Get contextual onboarding GIF
      const gifUrl = await getOnboardingGif(context)
      if (gifUrl) {
        return NextResponse.json({ url: gifUrl })
      }
      return NextResponse.json({ error: 'No GIF found' }, { status: 404 })
    }

    if (query) {
      // Search for GIFs by query
      const gifs = await searchGifs(query, 5)
      if (gifs.length > 0) {
        // Return random GIF from results
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)]
        return NextResponse.json({
          url: randomGif.preview_url || randomGif.url,
          title: randomGif.title,
        })
      }
      return NextResponse.json({ error: 'No GIFs found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Missing query (q) or context parameter' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Klipy API route error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GIF' },
      { status: 500 }
    )
  }
}
