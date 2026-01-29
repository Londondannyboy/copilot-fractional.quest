// International Fractional CFO Jobs Page
// Serves US, AU, NZ markets with locale-specific content

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { getOGImageUrl, getImage } from "@/lib/images";
import { type Locale, localeConfig, isValidLocale } from "@/i18n/config";

// Import locale-specific SEO content
import { cfoJobsUsSEO } from "@/lib/seo-content/cfo-jobs-us";
import { cfoJobsAuSEO } from "@/lib/seo-content/cfo-jobs-au";
import { cfoJobsNzSEO } from "@/lib/seo-content/cfo-jobs-nz";

const seoContentByLocale = {
  us: cfoJobsUsSEO,
  au: cfoJobsAuSEO,
  nz: cfoJobsNzSEO,
} as const;

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Generate static paths for all non-UK locales
export function generateStaticParams() {
  return [
    { locale: 'us' },
    { locale: 'au' },
    { locale: 'nz' },
  ];
}

// Generate metadata based on locale
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale) || locale === 'uk') {
    return {};
  }

  const seoContent = seoContentByLocale[locale as keyof typeof seoContentByLocale];
  const config = localeConfig[locale as Locale];
  const ogImage = getOGImageUrl('cfo');
  const imageAlt = getImage('cfo').alt;

  return {
    title: seoContent.meta.title,
    description: seoContent.meta.description,
    keywords: seoContent.meta.keywords,
    openGraph: {
      title: seoContent.meta.title,
      description: seoContent.meta.description,
      type: "website",
      url: `https://fractional.quest/${locale}/fractional-cfo-jobs`,
      locale: config.language.replace('-', '_'),
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoContent.meta.title,
      description: seoContent.meta.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/${locale}/fractional-cfo-jobs`,
      languages: {
        'en-GB': '/fractional-cfo-jobs-uk',
        'en-US': '/us/fractional-cfo-jobs',
        'en-AU': '/au/fractional-cfo-jobs',
        'en-NZ': '/nz/fractional-cfo-jobs',
      },
    },
  };
}

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCFOJobsPage({ params }: PageProps) {
  const { locale } = await params;

  // Validate locale - only allow us, au, nz
  if (!isValidLocale(locale) || locale === 'uk') {
    notFound();
  }

  const seoContent = seoContentByLocale[locale as keyof typeof seoContentByLocale];
  const config = localeConfig[locale as Locale];

  // Server-side data fetch - filter by country
  // TODO: Update getJobsPageData to accept country filter
  const { jobs, stats } = await getJobsPageData("cfo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: seoContent.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoContent.meta.title,
    description: seoContent.meta.description,
    url: `https://fractional.quest/${locale}/fractional-cfo-jobs`,
    inLanguage: config.language,
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoContent.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // hreflang tags for international SEO
  const hreflangTags = [
    { lang: 'en-GB', href: 'https://fractional.quest/fractional-cfo-jobs-uk' },
    { lang: 'en-US', href: 'https://fractional.quest/us/fractional-cfo-jobs' },
    { lang: 'en-AU', href: 'https://fractional.quest/au/fractional-cfo-jobs' },
    { lang: 'en-NZ', href: 'https://fractional.quest/nz/fractional-cfo-jobs' },
    { lang: 'x-default', href: 'https://fractional.quest/fractional-cfo-jobs-uk' },
  ];

  return (
    <>
      {/* hreflang tags for international SEO */}
      {hreflangTags.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Content */}
      <IntelligentJobPageClient
        location="cfo"
        locationDisplay={`Fractional CFO ${config.name}`}
        initialJobs={jobs}
        stats={stats}
        seoContent={seoContent}
        imageCategory="cfo"
        roleFilter="CFO"
        accentColor="emerald"
        locale={locale as Locale}
      />
    </>
  );
}
