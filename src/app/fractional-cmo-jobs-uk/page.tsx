// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cmoJobsUkSEO } from "@/lib/seo-content/cmo-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cmo')
const imageAlt = getImage('cmo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cmoJobsUkSEO.meta.title,
  description: cmoJobsUkSEO.meta.description,
  keywords: cmoJobsUkSEO.meta.keywords,
  openGraph: {
    title: cmoJobsUkSEO.meta.title,
    description: cmoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cmo-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cmoJobsUkSEO.meta.title,
    description: cmoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cmo-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCMOJobsUKPage() {
  // Server-side data fetch - "cmo" filters by role type
  const { jobs, stats } = await getJobsPageData("cmo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cmoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cmoJobsUkSEO.meta.title,
    description: cmoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cmo-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cmoJobsUkSEO.faqs.map((faq) => ({
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
        href="/images/hero/cmo-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        href="/images/hero/cmo-desktop.webp"
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
        location="cmo"
        locationDisplay="Fractional CMO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={cmoJobsUkSEO}
        imageCategory="cmo"
        roleFilter="CMO"
        accentColor="amber"
      />
    </>
  );
}
