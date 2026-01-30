import { MetadataRoute } from 'next'
import { getAllPublishedPages } from '@/lib/pages'
import { neon } from '@neondatabase/serverless'

// Slugs that redirect to other URLs (from next.config.ts)
// These should NOT appear in the sitemap - only the destination URLs should
const REDIRECT_SOURCE_SLUGS = [
  // Location aliases
  'london',
  'fractional-jobs-manchester',
  'fractional-jobs-birmingham',
  'fractional-jobs-edinburgh',
  'fractional-jobs-bristol',
  // Short URLs that redirect (note: part-time-cfo, interim-cfo, cfo, cmo, cto, coo now have dedicated pages)
  // Removed: 'part-time-cmo', 'interim-cmo', 'interim-cto' - now have real content pages
  'fractional-ciso-jobs',
  'fractional-hr',
  'fractional-cfo-meaning',
  'fractional-ciso-meaning',
  'interim-coo',
  'fractional-jobs',
  'guide',
  // fractional-jobs-au and fractional-jobs-us now redirect to real international pages
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

// Pages that should not be indexed
const NOINDEX_SLUGS = [
  'dashboard',
  'profile',
  'mdx-demo',
  'fractional-jobs-london-mdx',
  'intelligent-cfo',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fractional.quest'

  // Get all published pages from database
  const dbPages = await getAllPublishedPages()

  // ============================================
  // STATIC PAGES - Defined in /src/app folders
  // ============================================

  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Main job listing pages (highest priority)
  const jobListingPages: MetadataRoute.Sitemap = [
    'fractional-jobs-uk',
    'fractional-jobs-london',
    'remote-fractional-jobs',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95,
  }))

  // International pages (US, AU, NZ)
  const internationalLocales = ['us', 'au', 'nz']
  const internationalRoles = ['cfo', 'cto', 'cmo', 'coo', 'ceo', 'chro', 'cpo', 'ciso']

  const internationalJobPages: MetadataRoute.Sitemap = internationalLocales.flatMap(locale =>
    internationalRoles.map(role => ({
      url: `${baseUrl}/${locale}/fractional-${role}-jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    }))
  )

  // International main job pages
  const internationalMainPages: MetadataRoute.Sitemap = internationalLocales.map(locale => ({
    url: `${baseUrl}/${locale}/fractional-jobs`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Role-specific job pages (high priority)
  const roleJobPages: MetadataRoute.Sitemap = [
    'fractional-cfo-jobs-uk',
    'fractional-cto-jobs-uk',
    'fractional-cmo-jobs-uk',
    'fractional-coo-jobs-uk',
    'fractional-chro-jobs-uk',
    'fractional-ciso-jobs-uk',
    'fractional-cpo-jobs-uk',
    'fractional-ceo-jobs-uk',
    'fractional-cro-jobs-uk',
    'fractional-cio-jobs-uk',
    'fractional-cso-jobs-uk',
    'fractional-cco-jobs-uk',
    'fractional-procurement-jobs-uk',
    // New roles (Jan 2026)
    'fractional-chief-ai-officer-jobs-uk',
    'fractional-finance-director-jobs-uk',
    'fractional-general-counsel-jobs-uk',
    'fractional-managing-director-jobs-uk',
    // GTM, SDR, Growth
    'fractional-gtm-jobs-uk',
    'fractional-sdr-jobs-uk',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Location pages
  const locationPages: MetadataRoute.Sitemap = [
    'manchester',
    'birmingham',
    'edinburgh',
    'bristol',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Role definition pages
  const roleDefinitionPages: MetadataRoute.Sitemap = [
    'fractional-cfo',
    'fractional-cto',
    'fractional-cmo',
    'fractional-coo',
    'fractional-chro',
    'fractional-ciso',
    'fractional-cpo',
    'fractional-ceo',
    // GTM, SDR, Growth, General Counsel
    'fractional-gtm',
    'fractional-sdr',
    'fractional-growth',
    'fractional-general-counsel',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Salary guide pages
  const salaryPages: MetadataRoute.Sitemap = [
    'fractional-cfo-salary',
    'fractional-cto-salary',
    'fractional-cmo-salary',
    'fractional-coo-salary',
    'fractional-chro-salary',
    'fractional-ciso-salary',
    'fractional-cpo-salary',
    'fractional-ceo-salary',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Services/Hire pages
  const hirePages: MetadataRoute.Sitemap = [
    'hire-fractional-cfo',
    'hire-fractional-cto',
    'hire-fractional-cmo',
    'hire-fractional-coo',
    'hire-fractional-chro',
    'hire-fractional-ciso',
    'hire-fractional-cpo',
    'hire-fractional-ceo',
    'fractional-cfo-services',
    'fractional-cto-services',
    'fractional-cmo-services',
    'fractional-coo-services',
    'fractional-chro-services',
    'fractional-ciso-services',
    'fractional-cpo-services',
    'fractional-ceo-services',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Interim job pages
  const interimPages: MetadataRoute.Sitemap = [
    'interim-cfo-jobs-uk',
    'interim-cto-jobs-uk',
    'interim-cmo-jobs-uk',
    'interim-coo-jobs-uk',
    'interim-chro-jobs-uk',
    'interim-ciso-jobs-uk',
    'interim-cpo-jobs-uk',
    'interim-ceo-jobs-uk',
    'interim-cio-jobs-uk',
    'interim-cso-jobs-uk',
    'interim-executive',
    'interim-marketing-director',
    // GTM, SDR, Growth, General Counsel
    'interim-gtm-jobs-uk',
    'interim-growth-jobs-uk',
    'interim-general-counsel-jobs-uk',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // Part-time job pages
  const partTimePages: MetadataRoute.Sitemap = [
    'part-time-cfo-jobs-uk',
    'part-time-cto-jobs-uk',
    'part-time-cmo-jobs-uk',
    'part-time-coo-jobs-uk',
    'part-time-chro-jobs-uk',
    'part-time-ciso-jobs-uk',
    'part-time-cpo-jobs-uk',
    'part-time-ceo-jobs-uk',
    'part-time-cio-jobs-uk',
    'part-time-cso-jobs-uk',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // Advisory job pages
  const advisoryPages: MetadataRoute.Sitemap = [
    'advisory-cfo-jobs-uk',
    'advisory-cto-jobs-uk',
    'advisory-cmo-jobs-uk',
    'advisory-coo-jobs-uk',
    'advisory-chro-jobs-uk',
    'advisory-ciso-jobs-uk',
    'advisory-cpo-jobs-uk',
    'advisory-ceo-jobs-uk',
    'advisory-cio-jobs-uk',
    'advisory-cso-jobs-uk',
    'advisory-cco-jobs-uk',
    'advisory-cro-jobs-uk',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // Case studies
  const caseStudyPages: MetadataRoute.Sitemap = [
    'case-studies',
    'case-studies/oneup-productions',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Calculator/Tool pages
  const toolPages: MetadataRoute.Sitemap = [
    'calculators',
    'calculators/company-savings',
    'calculators/portfolio-builder',
    'calculators/rate-finder',
    'book-call',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = [
    'fractional-recruitment-agency',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ============================================
  // DYNAMIC PAGES - From database
  // ============================================

  // Collect all static slugs to avoid duplicates
  const staticSlugs = new Set([
    '',
    ...jobListingPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...roleJobPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...locationPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...roleDefinitionPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...salaryPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...hirePages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...interimPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...partTimePages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...advisoryPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...caseStudyPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...toolPages.map(p => p.url.replace(`${baseUrl}/`, '')),
    ...guidePages.map(p => p.url.replace(`${baseUrl}/`, '')),
  ])

  // Dynamic pages from database (excluding redirects, noindex, and already-listed static pages)
  const dynamicPages: MetadataRoute.Sitemap = dbPages
    .filter((page) =>
      !REDIRECT_SOURCE_SLUGS.includes(page.slug) &&
      !NOINDEX_SLUGS.includes(page.slug) &&
      !staticSlugs.has(page.slug)
    )
    .map((page) => {
      // Determine priority based on page type
      let priority = 0.7
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly'

      switch (page.page_type) {
        case 'job_listing':
        case 'jobs_uk':
          priority = 0.85
          changeFrequency = 'daily'
          break
        case 'service':
        case 'hire_guide':
          priority = 0.8
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
        case 'policy':
        case 'tool':
          priority = 0.65
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

  // ============================================
  // INDIVIDUAL JOB & NEWS PAGES - From database
  // ============================================

  let jobDetailPages: MetadataRoute.Sitemap = []
  let newsArticlePages: MetadataRoute.Sitemap = []

  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Fetch individual job pages with slugs
    const jobs = await sql`
      SELECT slug, posted_date, imported_at
      FROM jobs
      WHERE is_active = true AND slug IS NOT NULL AND slug != ''
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 500
    `

    // Helper to safely parse dates
    const safeDate = (dateVal: unknown): Date => {
      if (!dateVal) return new Date()
      try {
        const d = new Date(dateVal as string)
        return isNaN(d.getTime()) ? new Date() : d
      } catch {
        return new Date()
      }
    }

    jobDetailPages = jobs.map((job) => ({
      url: `${baseUrl}/fractional-job/${job.slug}`,
      lastModified: safeDate(job.posted_date || job.imported_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Fetch individual news article pages with slugs
    const articles = await sql`
      SELECT slug, published_date, imported_at
      FROM news_articles
      WHERE status = 'published' AND slug IS NOT NULL AND slug != ''
      ORDER BY imported_at DESC
      LIMIT 200
    `

    newsArticlePages = articles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: safeDate(article.published_date || article.imported_at),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

    console.log(`[Sitemap] Added ${jobDetailPages.length} job pages, ${newsArticlePages.length} news pages`)
  } catch (error) {
    console.error('[Sitemap] Error fetching job/news pages:', error)
    // Continue without them
  }

  // News index page
  const newsIndexPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Combine all pages
  return [
    ...homepage,
    ...jobListingPages,
    ...internationalMainPages,
    ...internationalJobPages,
    ...roleJobPages,
    ...locationPages,
    ...roleDefinitionPages,
    ...salaryPages,
    ...hirePages,
    ...interimPages,
    ...partTimePages,
    ...advisoryPages,
    ...caseStudyPages,
    ...toolPages,
    ...guidePages,
    ...dynamicPages,
    ...newsIndexPage,
    ...jobDetailPages,
    ...newsArticlePages,
  ]
}
