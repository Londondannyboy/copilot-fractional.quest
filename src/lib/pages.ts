import { neon } from '@neondatabase/serverless'
import { unstable_cache } from 'next/cache'

// Create SQL client
function createSql(): ReturnType<typeof neon> {
  if (!process.env.DATABASE_URL) {
    const placeholder = (() => {
      throw new Error('DATABASE_URL not configured')
    }) as unknown as ReturnType<typeof neon>
    return placeholder
  }
  return neon(process.env.DATABASE_URL)
}

export const sql = createSql()

// ===========================================
// TypeScript Interfaces
// ===========================================

export interface PageData {
  id: number
  slug: string
  page_type: string

  // SEO
  title: string
  meta_description: string | null
  keywords: string[] | null
  canonical_url: string | null

  // Hero
  hero_title: string | null
  hero_subtitle: string | null
  hero_badge: string | null
  image_category: string | null

  // Content
  sections: Section[]

  // Job Board Config
  job_board_enabled: boolean
  job_board_department: string | null
  job_board_location: string | null
  job_board_title: string | null
  accent_color: string

  // Links
  internal_links: InternalLink[]
  external_links: ExternalLink[]
  related_pages: string[] | null

  // FAQ
  faqs: FAQ[]

  // Stats
  stats: Record<string, unknown>

  // MDX Content (optional - if present, rendered with MDXRemote instead of PageRenderer)
  mdx_content: string | null

  // Meta
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Section {
  type: string
  heading?: string
  content?: string
  items?: Record<string, unknown>[]
  stats?: Record<string, unknown>[]
  steps?: Record<string, unknown>[]
  signals?: Record<string, unknown>[]
  mustHaves?: Record<string, unknown>[]
  niceToHaves?: Record<string, unknown>[]
  mistakes?: Record<string, unknown>[]
  [key: string]: unknown
}

export interface InternalLink {
  url: string
  label: string
  description?: string
}

export interface ExternalLink {
  url: string
  label: string
  domain: string
}

export interface FAQ {
  question: string
  answer: string
}

// ===========================================
// Query Functions
// ===========================================

// Internal function for actual database query
async function fetchPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const pages = await sql`
      SELECT *
      FROM pages
      WHERE slug = ${slug} AND is_published = true
      LIMIT 1
    ` as PageData[]

    return pages[0] || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

// Cached version - revalidates every hour (3600 seconds)
// This dramatically improves TTFB for database-served pages
export const getPageBySlug = unstable_cache(
  fetchPageBySlug,
  ['page-by-slug'],
  { revalidate: 3600, tags: ['pages'] }
)

export async function getAllPublishedPages(): Promise<PageData[]> {
  try {
    const pages = await sql`
      SELECT slug, title, page_type, meta_description, accent_color, hero_badge
      FROM pages
      WHERE is_published = true
      ORDER BY updated_at DESC
    `
    return pages as PageData[]
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export async function getPagesByType(pageType: string): Promise<PageData[]> {
  try {
    const pages = await sql`
      SELECT slug, title, page_type, meta_description, accent_color, hero_badge, hero_title
      FROM pages
      WHERE page_type = ${pageType} AND is_published = true
      ORDER BY title
    `
    return pages as PageData[]
  } catch (error) {
    console.error('Error fetching pages by type:', error)
    return []
  }
}

export async function getRelatedPages(slugs: string[]): Promise<PageData[]> {
  if (!slugs || slugs.length === 0) return []

  try {
    const pages = await sql`
      SELECT slug, title, page_type, meta_description, accent_color, hero_badge
      FROM pages
      WHERE slug = ANY(${slugs}) AND is_published = true
    `
    return pages as PageData[]
  } catch (error) {
    console.error('Error fetching related pages:', error)
    return []
  }
}

export async function searchPages(query: string, limit = 10): Promise<PageData[]> {
  try {
    const pages = await sql`
      SELECT slug, title, page_type, meta_description, accent_color, hero_badge
      FROM pages
      WHERE is_published = true
        AND (
          title ILIKE ${'%' + query + '%'}
          OR meta_description ILIKE ${'%' + query + '%'}
          OR hero_title ILIKE ${'%' + query + '%'}
        )
      ORDER BY
        CASE WHEN title ILIKE ${query + '%'} THEN 0 ELSE 1 END,
        title
      LIMIT ${limit}
    `
    return pages as PageData[]
  } catch (error) {
    console.error('Error searching pages:', error)
    return []
  }
}

// Get all slugs for static generation
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const pages = await sql`
      SELECT slug FROM pages WHERE is_published = true
    ` as { slug: string }[]
    return pages.map((p) => p.slug)
  } catch (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
}

// ===========================================
// Helper Functions
// ===========================================

export function getAccentColorClass(color: string): string {
  const colors: Record<string, string> = {
    emerald: 'emerald',
    blue: 'blue',
    purple: 'purple',
    amber: 'amber',
    pink: 'pink',
    teal: 'teal',
    orange: 'orange',
    red: 'red',
    indigo: 'indigo',
    slate: 'slate',
    violet: 'violet',
    cyan: 'cyan',
    rose: 'rose',
  }
  return colors[color] || 'blue'
}

export function getPageTypeLabel(pageType: string): string {
  const labels: Record<string, string> = {
    jobs_uk: 'UK Jobs',
    location: 'Location Guide',
    industry: 'Industry Guide',
    role_definition: 'Role Guide',
    salary: 'Salary Guide',
    hire_guide: 'Hiring Guide',
    career_guide: 'Career Guide',
    comparison: 'Comparison',
    guide: 'Guide',
    specialist: 'Specialist',
  }
  return labels[pageType] || 'Guide'
}
