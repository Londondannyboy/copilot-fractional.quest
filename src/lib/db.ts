import { neon, NeonQueryFunction } from '@neondatabase/serverless'

// Cached SQL client instance
let sqlClient: NeonQueryFunction<false, false> | null = null

// Get SQL client with connection caching
export const createDbQuery = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required')
  }

  // Reuse existing client to avoid cold start on every request
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL, {
      fetchOptions: {
        cache: 'no-store', // Ensure fresh data
      },
    })
  }

  return sqlClient
}

// Retry wrapper for handling Neon cold starts
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      // Check if it's a connection/timeout error worth retrying
      const errorMessage = lastError.message?.toLowerCase() || ''
      const isRetryable =
        errorMessage.includes('timeout') ||
        errorMessage.includes('connection') ||
        errorMessage.includes('econnreset') ||
        errorMessage.includes('fetch failed') ||
        errorMessage.includes('socket hang up')

      if (!isRetryable || attempt === maxRetries - 1) {
        throw lastError
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = initialDelayMs * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

// Helper for resilient queries - use this for page data fetching
export async function resilientQuery<T>(
  queryFn: () => Promise<T>
): Promise<T> {
  return withRetry(queryFn, 3, 1000)
}
