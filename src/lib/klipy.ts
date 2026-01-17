/**
 * Klipy GIF API Integration
 * https://docs.klipy.com/getting-started
 *
 * Used for adding fun, contextual GIFs to the onboarding experience
 */

const KLIPY_API_KEY = process.env.KLIPY_API_KEY || 'oLfcpGph74E06iAtKC1P5PQuXgj3j7hLhdoNAt3crKWsrw93z7RbC9f7myrRiJWS'
const KLIPY_BASE_URL = 'https://api.klipy.com/v1'

export interface KlipyGif {
  id: string
  url: string
  preview_url: string
  title: string
  width: number
  height: number
}

export interface KlipySearchResponse {
  results: KlipyGif[]
  next?: string
}

/**
 * Search for GIFs using Klipy API
 * @param query - Search term (e.g., "welcome", "celebration", "high five")
 * @param limit - Number of results to return (default: 1)
 */
export async function searchGifs(query: string, limit: number = 1): Promise<KlipyGif[]> {
  try {
    const response = await fetch(
      `${KLIPY_BASE_URL}/gifs/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${KLIPY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
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

/**
 * Get a random GIF URL for a specific onboarding context
 * Maps onboarding steps to appropriate GIF search terms
 */
export async function getOnboardingGif(context: OnboardingGifContext): Promise<string | null> {
  const searchTerms: Record<OnboardingGifContext, string[]> = {
    welcome: ['welcome', 'hello wave', 'friendly greeting'],
    goals_complete: ['thumbs up', 'nice job', 'great work'],
    status_complete: ['progress', 'keep going', 'you got this'],
    domain_complete: ['professional', 'expert mode', 'specialist'],
    location_complete: ['location pin', 'map', 'destination'],
    profile_complete: ['celebration', 'party', 'congratulations', 'success dance'],
    encouragement: ['you can do it', 'motivation', 'cheering'],
  }

  const terms = searchTerms[context] || ['thumbs up']
  const randomTerm = terms[Math.floor(Math.random() * terms.length)]

  const gifs = await searchGifs(randomTerm, 5)
  if (gifs.length === 0) return null

  // Return a random GIF from results for variety
  const randomGif = gifs[Math.floor(Math.random() * gifs.length)]
  return randomGif.preview_url || randomGif.url
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
 * Preset GIF URLs for common scenarios (fallback if API fails)
 * These are popular, safe-for-work GIFs from Klipy's trending
 */
export const FALLBACK_GIFS: Record<OnboardingGifContext, string> = {
  welcome: 'https://media.klipy.com/gifs/wave-hello.gif',
  goals_complete: 'https://media.klipy.com/gifs/thumbs-up.gif',
  status_complete: 'https://media.klipy.com/gifs/progress.gif',
  domain_complete: 'https://media.klipy.com/gifs/expert.gif',
  location_complete: 'https://media.klipy.com/gifs/map-pin.gif',
  profile_complete: 'https://media.klipy.com/gifs/celebration.gif',
  encouragement: 'https://media.klipy.com/gifs/you-got-this.gif',
}
