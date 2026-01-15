import { MetadataRoute } from 'next'
import { getAllPublishedPages } from '@/lib/pages'

// Slugs that redirect to other URLs (from next.config.ts)
// These should NOT appear in the sitemap - only the destination URLs should
const REDIRECT_SOURCE_SLUGS = [
  // Location aliases
  'london',
  'fractional-jobs-manchester',
  'fractional-jobs-birmingham',
  'fractional-jobs-edinburgh',
  'fractional-jobs-bristol',
  // Short URLs that redirect
  'part-time-cfo',
  'part-time-cmo',
  'fractional-ciso-jobs',
  'fractional-hr',
  'interim-executive',
  'fractional-cfo-meaning',
  'fractional-ciso-meaning',
  'interim-cfo',
  'interim-cmo',
  'interim-cto',
  'interim-coo',
  'cfo',
  'cmo',
  'cto',
  'coo',
  'fractional-jobs',
  'guide',
  'fractional-jobs-au',
  'fractional-jobs-us',
  'fractional-hr-salary',
  'fractional-hr-roles',
  'fractional-hr-director',
  'fractional-hr-jobs-uk',
  'what-is-a-fractional-cto',
  'what-is-a-fractional-ceo-guide',
  'what-is-fractional',
  'fractional-cfo-near-me',
  'fractional-cto-hourly-rate',
  'fractional-coo-meaning',
  'fractional-executive',
  'fractional-executive-guide',
  'fractional-roles',
  'fractional-services',
  'fractional-agency',
  'fractional-data',
  'fractional-consulting',
  'fractional-marketing',
  'fractional-operations-director',
  'fractional-operations-jobs',
  'interim-jobs-uk',
  'remote-fractional-jobs-guide',
  'jobs',
  'articles',
  'top-fractional-recruitment-agencies',
  'top-fractional-recruitment-agencies-best-fractional-recruitment-agency-fractional-recruiter',
  'fractional-property-ownership-uk',
  'fractional-client-services-services',
  'fractional-jobs-articles',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fractional.quest'

  // Get all published pages from database
  const pages = await getAllPublishedPages()

  // Static pages (only include real pages, not redirects)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Note: /jobs redirects to /fractional-jobs-uk, so use destination URL
    {
      url: `${baseUrl}/fractional-jobs-uk`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book-call`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Guide pages
    {
      url: `${baseUrl}/fractional-recruitment-agency`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic pages from database (excluding redirect sources)
  const dynamicPages: MetadataRoute.Sitemap = pages
    .filter((page) => !REDIRECT_SOURCE_SLUGS.includes(page.slug))
    .map((page) => {
    // Determine priority based on page type
    let priority = 0.8
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly'

    switch (page.page_type) {
      case 'job_listing':
      case 'jobs_uk':
        priority = 0.9
        changeFrequency = 'daily'
        break
      case 'service':
      case 'hire_guide':
        priority = 0.85
        changeFrequency = 'weekly'
        break
      case 'location':
        priority = 0.8
        changeFrequency = 'weekly'
        break
      case 'guide':
      case 'career_guide':
      case 'salary':
        priority = 0.75
        changeFrequency = 'monthly'
        break
      case 'comparison':
      case 'specialist':
      case 'industry':
        priority = 0.7
        changeFrequency = 'monthly'
        break
      default:
        priority = 0.6
        changeFrequency = 'monthly'
    }

    return {
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
      changeFrequency,
      priority,
    }
  })

  return [...staticPages, ...dynamicPages]
}
