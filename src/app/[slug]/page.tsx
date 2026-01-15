import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPageSlugs, getPageTypeLabel } from '@/lib/pages'
import { PageWithCopilot } from '@/components/pages/PageWithCopilot'

// ===========================================
// Static Generation
// ===========================================

// Slugs that have dedicated static routes - exclude from dynamic generation
// Only add slugs here if they have a static /src/app/[slug]/page.tsx folder
const STATIC_ROUTE_SLUGS = [
  // Main job pages
  'fractional-jobs-london',
  'fractional-jobs-uk',
  'remote-fractional-jobs',
  // Role-specific job pages
  'fractional-cfo-jobs-uk',
  'fractional-cto-jobs-uk',
  'fractional-cmo-jobs-uk',
  'fractional-coo-jobs-uk',
  'fractional-chro-jobs-uk',
  'fractional-ciso-jobs-uk',
  'fractional-cpo-jobs-uk',
  'fractional-ceo-jobs-uk',
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
  // Salary guide pages
  'fractional-cfo-salary',
  'fractional-cto-salary',
  'fractional-cmo-salary',
  'fractional-coo-salary',
  'fractional-chro-salary',
  'fractional-ciso-salary',
  'fractional-cpo-salary',
  'fractional-ceo-salary',
  // Services pages
  'fractional-cfo-services',
  'fractional-cto-services',
  'fractional-cmo-services',
  'fractional-coo-services',
  'fractional-chro-services',
  'fractional-ciso-services',
  'fractional-cpo-services',
  'fractional-ceo-services',
  // Hire pages
  'hire-fractional-cfo',
  'hire-fractional-cto',
  'hire-fractional-cmo',
  'hire-fractional-coo',
  'hire-fractional-chro',
  'hire-fractional-ciso',
  'hire-fractional-cpo',
  'hire-fractional-ceo',
  // Interim job pages
  'interim-cfo-jobs-uk',
  'interim-cto-jobs-uk',
  'interim-cmo-jobs-uk',
  'interim-coo-jobs-uk',
  'interim-chro-jobs-uk',
  'interim-ciso-jobs-uk',
  'interim-cpo-jobs-uk',
  'interim-ceo-jobs-uk',
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
  // Guide pages
  'fractional-recruitment-agency',
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

  return {
    title: page.title,
    description: page.meta_description || undefined,
    keywords: page.keywords || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      type: 'article',
      locale: 'en_GB',
      siteName: 'Fractional Quest',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description || undefined,
    },
    alternates: {
      canonical: page.canonical_url || `https://fractional.quest/${slug}`,
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
              <a href="/jobs" className="hover:text-gray-700">{getPageTypeLabel(page.page_type)}</a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {page.hero_title || page.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Page Content with CopilotKit Sidebar */}
      <PageWithCopilot page={page} />
    </>
  )
}
