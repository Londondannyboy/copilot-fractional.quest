/**
 * Klipy GIF API Integration
 * https://docs.klipy.com/getting-started
 *
 * Used for adding fun, contextual GIFs to the onboarding experience
 */

const KLIPY_API_KEY = process.env.KLIPY_API_KEY || 'oLfcpGph74E06iAtKC1P5PQuXgj3j7hLhdoNAt3crKWsrw93z7RbC9f7myrRiJWS'
const KLIPY_BASE_URL = 'https://api.klipy.com/v2'

export interface KlipyMediaFormat {
  url: string
  dims: [number, number]
  size: number
}

export interface KlipyGif {
  id: string
  title: string
  url: string
  media_formats: {
    gif: KlipyMediaFormat
    tinygif: KlipyMediaFormat
    mediumgif: KlipyMediaFormat
    nanogif: KlipyMediaFormat
    preview: KlipyMediaFormat
  }
}

export interface KlipySearchResponse {
  results: KlipyGif[]
  next?: string
}

/**
 * Search for GIFs using Klipy API v2
 * @param query - Search term (e.g., "welcome", "celebration", "high five")
 * @param limit - Number of results to return (default: 1)
 */
export async function searchGifs(query: string, limit: number = 1): Promise<KlipyGif[]> {
  try {
    const response = await fetch(
      `${KLIPY_BASE_URL}/search?q=${encodeURIComponent(query)}&key=${KLIPY_API_KEY}&limit=${limit}`
    )

    if (!response.ok) {
      console.error(`Klipy API error: ${response.status}`)
      return []
    }

    const data: KlipySearchResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Klipy fetch error:', error)
    return []
  }
}

export type OnboardingGifContext =
  | 'welcome'
  | 'goals_complete'
  | 'status_complete'
  | 'domain_complete'
  | 'location_complete'
  | 'profile_complete'
  | 'encouragement'

/**
 * Real Klipy GIF URLs for onboarding (verified working)
 */
export const ONBOARDING_GIFS: Record<OnboardingGifContext, string> = {
  welcome: 'https://static.klipy.com/ii/935d7ab9d8c6202680a668421940ec81/9a/fb/DZ2Ib2g1.gif',
  goals_complete: 'https://static.klipy.com/ii/50d7c955398dfd7e3c8ba5281154280f/79/6d/dl3FgmslCLcFr3bHDBtQ.gif',
  status_complete: 'https://static.klipy.com/ii/50d7c955398dfd7e3c8ba5281154280f/79/6d/dl3FgmslCLcFr3bHDBtQ.gif',
  domain_complete: 'https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/29/ef/ttocqdWS.gif',
  location_complete: 'https://static.klipy.com/ii/ce286d05b8e1a47cd4f32b0e1b6dec0e/b1/02/K4ZWIqVO.gif',
  profile_complete: 'https://static.klipy.com/ii/935d7ab9d8c6202680a668421940ec81/d2/27/iQ5M3MEP.gif',
  encouragement: 'https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/29/ef/ttocqdWS.gif',
}

/**
 * Get a random GIF URL for a specific onboarding context
 * Uses pre-fetched URLs for reliability, falls back to API search
 */
export async function getOnboardingGif(context: OnboardingGifContext): Promise<string> {
  // Return pre-fetched URL for reliability
  const presetUrl = ONBOARDING_GIFS[context]
  if (presetUrl) return presetUrl

  // Fallback: search dynamically
  const searchTerms: Record<OnboardingGifContext, string> = {
    welcome: 'wave hello',
    goals_complete: 'thumbs up',
    status_complete: 'thumbs up',
    domain_complete: 'you can do it',
    location_complete: 'almost there',
    profile_complete: 'celebration',
    encouragement: 'you can do it',
  }

  const gifs = await searchGifs(searchTerms[context] || 'thumbs up', 3)
  if (gifs.length === 0) return ONBOARDING_GIFS.goals_complete

  const randomGif = gifs[Math.floor(Math.random() * gifs.length)]
  return randomGif.media_formats?.tinygif?.url || randomGif.url
}
