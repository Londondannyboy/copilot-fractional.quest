// Shared logic for international pages (US, AU, NZ)
// Each reads from Neon pages table with locale-prefixed slugs

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/pages'
import { PageWithCopilot } from '@/components/pages/PageWithCopilot'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '../../mdx-components'
import { localeConfig, type Locale } from '@/i18n/config'

interface InternationalPageProps {
  locale: Locale
  slug: string
}

export async function generateInternationalMetadata(
  locale: Locale,
  slug: string
): Promise<Metadata> {
  const dbSlug = `${locale}-${slug}`
  const page = await getPageBySlug(dbSlug)

  if (!page) {
    return {}
  }

  const config = localeConfig[locale]
  const baseUrl = 'https://fractional.quest'
  const pageUrl = `${baseUrl}/${locale}/${slug}`

  return {
    title: page.title,
    description: page.meta_description || undefined,
    keywords: page.keywords || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      type: 'website',
      url: pageUrl,
      locale: config.language.replace('-', '_'),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description || undefined,
    },
    alternates: {
      canonical: page.canonical_url || pageUrl,
      languages: {
        'en-GB': `/${slug}-uk`,
        'en-US': `/us/${slug}`,
        'en-AU': `/au/${slug}`,
        'en-NZ': `/nz/${slug}`,
      },
    },
  }
}

export async function InternationalPageContent({ locale, slug }: InternationalPageProps) {
  // Look for page with locale-prefixed slug in database
  const dbSlug = `${locale}-${slug}`
  const page = await getPageBySlug(dbSlug)

  if (!page || !page.is_published) {
    notFound()
  }

  const config = localeConfig[locale]

  // hreflang tags
  const hreflangTags = [
    { lang: 'en-GB', href: `https://fractional.quest/${slug}-uk` },
    { lang: 'en-US', href: `https://fractional.quest/us/${slug}` },
    { lang: 'en-AU', href: `https://fractional.quest/au/${slug}` },
    { lang: 'en-NZ', href: `https://fractional.quest/nz/${slug}` },
    { lang: 'x-default', href: `https://fractional.quest/${slug}-uk` },
  ]

  // If page has MDX content, render with MDXRemote
  if (page.mdx_content) {
    return (
      <>
        {hreflangTags.map(({ lang, href }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={href} />
        ))}

        <PageWithCopilot
          pageContext={`${page.title} - ${config.name}`}
          initialContent={page.mdx_content}
        >
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                {page.hero_badge && (
                  <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full mb-6">
                    {page.hero_badge}
                  </span>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  {page.hero_title || page.title}
                </h1>
                {page.hero_subtitle && (
                  <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    {page.hero_subtitle}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <main className="bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-table:border prose-th:bg-gray-50 prose-th:p-3 prose-td:p-3 prose-td:border">
                <MDXRemote
                  source={page.mdx_content}
                  components={mdxComponents}
                />
              </article>
            </div>
          </main>

          {/* CTA Section */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Find Your Next Role?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Browse the latest fractional and interim executive opportunities in {config.name}.
              </p>
              <a
                href={`/${locale}/fractional-jobs`}
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                View All Jobs
              </a>
            </div>
          </section>
        </PageWithCopilot>
      </>
    )
  }

  // Otherwise render with structured page data
  return (
    <>
      {hreflangTags.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      <PageWithCopilot
        pageContext={`${page.title} - ${config.name}`}
        initialContent={page.hero_subtitle || ''}
      >
        <div>
          {/* Hero section */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              {page.hero_badge && (
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full mb-4">
                  {page.hero_badge}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {page.hero_title || page.title}
              </h1>
              {page.hero_subtitle && (
                <p className="text-xl text-gray-300">{page.hero_subtitle}</p>
              )}
            </div>
          </section>

          {/* Sections */}
          <div className="max-w-4xl mx-auto py-12 px-4">
            {page.sections?.map((section, idx) => (
              <section key={idx} className="mb-12">
                {section.heading && (
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                )}
                {section.content && (
                  <div
                    className="prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </section>
            ))}
          </div>
        </div>
      </PageWithCopilot>
    </>
  )
}
