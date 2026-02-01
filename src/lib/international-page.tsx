// Shared logic for international pages (US, AU, NZ)
// Each reads from Neon pages table with locale-prefixed slugs
// Now uses IntelligentPageRenderer for consistent visual quality

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/pages'
import { IntelligentPageRenderer } from '@/components/pages/IntelligentPageRenderer'
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

  // hreflang tags for SEO
  const hreflangTags = [
    { lang: 'en-GB', href: `https://fractional.quest/${slug}-uk` },
    { lang: 'en-US', href: `https://fractional.quest/us/${slug}` },
    { lang: 'en-AU', href: `https://fractional.quest/au/${slug}` },
    { lang: 'en-NZ', href: `https://fractional.quest/nz/${slug}` },
    { lang: 'x-default', href: `https://fractional.quest/${slug}-uk` },
  ]

  // Use IntelligentPageRenderer for consistent visual quality across all locales
  // This gives international pages the same icons, gradients, auto-linking,
  // structured data, and enhanced sections as UK pages
  return (
    <>
      {/* hreflang tags for international SEO */}
      {hreflangTags.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* Full IntelligentPageRenderer with all enhancements */}
      <IntelligentPageRenderer page={page} />
    </>
  )
}
