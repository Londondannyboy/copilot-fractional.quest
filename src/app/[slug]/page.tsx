import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPageBySlug, getAllPageSlugs, getPageTypeLabel } from '@/lib/pages'
import { PageWithCopilot } from '@/components/pages/PageWithCopilot'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '../../../mdx-components'

// Generate related internal links based on page slug and type
function getRelatedLinks(slug: string, pageType: string): { name: string; url: string }[] {
  const links: { name: string; url: string }[] = []

  // Extract the role identifier from the slug (e.g., "cfo" from "fractional-cfo-salary")
  const rolePatterns = [
    'cfo', 'cto', 'cmo', 'coo', 'ceo', 'chro', 'ciso', 'cpo', 'cro', 'cio', 'cso',
    'cko', 'cqo', 'cvo', 'cbdo', 'cino', 'ctso', 'csco', 'cgo', 'cxo',
    'cbo-chief-business-officer', 'cbo-chief-brand-officer',
    'cco-chief-commercial-officer', 'cco-chief-compliance-officer', 'cco-chief-customer-officer',
    'cco-chief-content-officer', 'cco-chief-creative-officer', 'cco-chief-communications-officer',
    'cdo-chief-digital-officer', 'cdo-chief-data-officer', 'cdo-chief-diversity-officer', 'cdo-chief-design-officer',
    'cio-chief-information-officer', 'cio-chief-investment-officer',
    'clo-chief-legal-officer', 'clo-chief-learning-officer',
    'cao-chief-administrative-officer', 'cao-chief-analytics-officer',
    'cpo-chief-people-officer', 'cpo-chief-privacy-officer', 'cpo-chief-process-officer',
    'cro-chief-risk-officer', 'cro-chief-research-officer', 'cro-chief-reputation-officer', 'cro-chief-restructuring-officer',
    'cso-chief-security-officer', 'cso-chief-sustainability-officer', 'cso-chief-strategy-officer',
    'cso-chief-scientific-officer', 'cso-chief-services-officer', 'cso-chief-solutions-officer',
    'head-of-legal',
  ]

  let matchedRole = ''
  for (const role of rolePatterns) {
    if (slug.includes(role)) {
      matchedRole = role
      break
    }
  }

  // Add hub link
  links.push({ name: 'UK Fractional Jobs', url: '/fractional-jobs-uk' })

  if (matchedRole) {
    const roleName = matchedRole.split('-').map(w => w.toUpperCase()).join(' ').replace('CHIEF ', 'C').substring(0, 20)

    // Add sibling page types for this role
    if (!slug.includes('-salary') && !slug.includes('salary-')) {
      links.push({ name: `${roleName} Salary Guide`, url: `/fractional-${matchedRole}-salary` })
    }
    if (!slug.startsWith('hire-')) {
      links.push({ name: `Hire ${roleName}`, url: `/hire-fractional-${matchedRole}` })
    }
    if (!slug.includes('-services')) {
      links.push({ name: `${roleName} Services`, url: `/fractional-${matchedRole}-services` })
    }
    if (!slug.startsWith('fractional-') || slug.includes('salary') || slug.includes('services') || slug.includes('jobs')) {
      links.push({ name: `What is a Fractional ${roleName}?`, url: `/fractional-${matchedRole}` })
    }
    if (!slug.includes('-jobs-uk')) {
      links.push({ name: `${roleName} Jobs UK`, url: `/fractional-${matchedRole}-jobs-uk` })
    }
  }

  // Add general links based on page type
  if (pageType === 'comparison') {
    links.push({ name: 'Fractional vs Consultant', url: '/fractional-vs-consulting' })
  }

  // Always add a few cross-role links
  const mainRoles = ['cfo', 'cto', 'cmo', 'coo', 'ceo']
  for (const role of mainRoles) {
    if (!slug.includes(role) && links.length < 8) {
      links.push({ name: `Fractional ${role.toUpperCase()} Jobs UK`, url: `/fractional-${role}-jobs-uk` })
    }
  }

  // Deduplicate and remove self-links
  const selfUrl = `/${slug}`
  return links
    .filter((link, idx, arr) => link.url !== selfUrl && arr.findIndex(l => l.url === link.url) === idx)
    .slice(0, 8)
}

// Background images for related resource cards
const RELATED_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop',
]

// ===========================================
// Caching Configuration
// ===========================================

// Revalidate pages every hour for ISR (Incremental Static Regeneration)
// This dramatically improves TTFB for database-served pages
export const revalidate = 3600

// ===========================================
// Static Generation
// ===========================================

// Slugs that have dedicated static routes - exclude from dynamic generation
// Only add slugs here if they have a static /src/app/[slug]/page.tsx folder
const STATIC_ROUTE_SLUGS = [
  // Main job pages
  // 'fractional-jobs-london', // Migrated to Neon Feb 2026 - backup at _backup_fractional-jobs-london
  'fractional-jobs-uk',
  'remote-fractional-jobs',
  // Role-specific job pages (UK)
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
  'fractional-chief-ai-officer-jobs-uk',
  'fractional-finance-director-jobs-uk',
  'fractional-general-counsel-jobs-uk',
  'fractional-managing-director-jobs-uk',
  // Role hub pages (global)
  'fractional-jobs-cfo',
  'fractional-jobs-cto',
  'fractional-jobs-cmo',
  'fractional-jobs-coo',
  'fractional-jobs-ceo',
  'fractional-jobs-chro',
  'fractional-jobs-cpo',
  'fractional-jobs-ciso',
  'fractional-jobs-cro',
  // Location pages
  'manchester',
  'birmingham',
  'edinburgh',
  'bristol',
  // Role definition pages
  'fractional-cfo',
  'fractional-cto',
  'fractional-cmo',
  'fractional-coo',
  'fractional-chro',
  'fractional-ciso',
  'fractional-cpo',
  'fractional-ceo',
  'fractional-cro',
  'fractional-cco',
  // Salary guide pages
  'fractional-cfo-salary',
  'fractional-cto-salary',
  'fractional-cmo-salary',
  'fractional-coo-salary',
  'fractional-chro-salary',
  'fractional-ciso-salary',
  'fractional-cpo-salary',
  'fractional-ceo-salary',
  'fractional-cro-salary',
  // Services pages
  'fractional-cfo-services',
  'fractional-cto-services',
  'fractional-cmo-services',
  'fractional-coo-services',
  'fractional-chro-services',
  'fractional-ciso-services',
  'fractional-cpo-services',
  'fractional-ceo-services',
  'fractional-cro-services',
  'fractional-cco-services',
  // Cost pages
  'fractional-cfo-cost',
  'fractional-cto-cost',
  'fractional-cmo-cost',
  'fractional-coo-cost',
  // Hire pages
  'hire-fractional-cfo',
  'hire-fractional-cto',
  'hire-fractional-cmo',
  'hire-fractional-coo',
  'hire-fractional-chro',
  'hire-fractional-ciso',
  'hire-fractional-cpo',
  'hire-fractional-ceo',
  'hire-fractional-cro',
  'hire-fractional-cco',
  // Interim job pages
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
  'interim-cco-jobs-uk',
  'interim-cro-jobs-uk',
  'interim-executive',
  'interim-marketing-director',
  // Part-time job pages
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
  'part-time-cco-jobs-uk',
  'part-time-cro-jobs-uk',
  // Part-time guide pages
  'part-time-cfo',
  // Advisory job pages
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
  // Guide pages
  'fractional-recruitment-agency',
  // Procurement pages
  'fractional-procurement',
  'fractional-procurement-jobs-uk',
  'fractional-procurement-services',
  'hire-fractional-procurement',
  // Finance Director pages
  'fractional-finance-director',
]

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  // Filter out slugs that have static routes
  return slugs
    .filter((slug) => !STATIC_ROUTE_SLUGS.includes(slug))
    .map((slug) => ({ slug }))
}

// ===========================================
// Metadata
// ===========================================

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {
      title: 'Page Not Found | Fractional Quest',
    }
  }

  const pageUrl = `https://fractional.quest/${slug}`
  // Use dynamic OG image service
  const ogImage = `https://fractional.quest/api/og?title=${encodeURIComponent(page.hero_title || page.title)}`

  return {
    title: page.title,
    description: page.meta_description || undefined,
    keywords: page.keywords || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      type: 'article',
      url: pageUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      locale: 'en_GB',
      siteName: 'Fractional Quest',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description || undefined,
      images: [ogImage],
    },
    alternates: {
      canonical: page.canonical_url || pageUrl,
    },
  }
}

// ===========================================
// Page Component
// ===========================================

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params

  // Redirect to static route if one exists
  if (STATIC_ROUTE_SLUGS.includes(slug)) {
    notFound() // Let the static route handle it
  }

  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.meta_description,
    author: {
      '@type': 'Organization',
      name: 'Fractional Quest',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fractional Quest',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fractional.quest/logo.png',
      },
    },
    dateModified: page.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fractional.quest/${slug}`,
    },
  }

  // FAQ structured data if FAQs exist
  const faqJsonLd = page.faqs && page.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-gray-700">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/fractional-jobs-uk" className="hover:text-gray-700">{getPageTypeLabel(page.page_type)}</a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {page.hero_title || page.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Page Content */}
      {page.mdx_content ? (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <article className="prose prose-lg max-w-none">
            <MDXRemote source={page.mdx_content} components={mdxComponents} />
          </article>
        </div>
      ) : (
        <PageWithCopilot page={page} />
      )}

      {/* Related Pages - Internal linking for all database pages */}
      {(() => {
        const relatedLinks = getRelatedLinks(slug, page.page_type)
        if (relatedLinks.length === 0) return null
        return (
          <section className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Explore More</span>
                <h2 className="text-2xl font-bold text-gray-900">Related Resources</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    className="block relative rounded-xl overflow-hidden group h-36 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <Image
                      src={RELATED_IMAGES[idx % RELATED_IMAGES.length]}
                      alt={link.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-bold text-white text-sm leading-tight">{link.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })()}
    </>
  )
}
