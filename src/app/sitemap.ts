import { MetadataRoute } from 'next'
import { getAllPublishedPages } from '@/lib/pages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fractional.quest'

  // Get all published pages from database
  const pages = await getAllPublishedPages()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic pages from database
  const dynamicPages: MetadataRoute.Sitemap = pages.map((page) => {
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
