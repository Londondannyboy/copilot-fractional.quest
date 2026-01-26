// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cdoJobsUkSEO } from "@/lib/seo-content/cdo-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cdo')
const imageAlt = getImage('cdo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cdoJobsUkSEO.meta.title,
  description: cdoJobsUkSEO.meta.description,
  keywords: cdoJobsUkSEO.meta.keywords,
  openGraph: {
    title: cdoJobsUkSEO.meta.title,
    description: cdoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cdo-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cdoJobsUkSEO.meta.title,
    description: cdoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cdo-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCDOJobsUKPage() {
  // Server-side data fetch - "cdo" filters by role type
  const { jobs, stats } = await getJobsPageData("cdo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cdoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cdoJobsUkSEO.meta.title,
    description: cdoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cdo-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cdoJobsUkSEO.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Preload hero image for faster LCP - WebP format */}
      <link
        rel="preload"
        href="/images/hero/fractional-cdo-jobs-uk-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        href="/images/hero/fractional-cdo-jobs-uk-desktop.webp"
        as="image"
        type="image/webp"
        media="(min-width: 769px)"
      />

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

      {/* Page Content - Using IntelligentDocument pattern for reactive updates */}
      <IntelligentJobPageClient
        location="cdo"
        locationDisplay="Fractional CDO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={cdoJobsUkSEO}
        imageCategory="cdo"
        roleFilter="CDO"
        accentColor="blue"
      />
    </>
  );
}
