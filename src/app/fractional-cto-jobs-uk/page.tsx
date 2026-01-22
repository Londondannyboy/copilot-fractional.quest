// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { ctoJobsUkSEO } from "@/lib/seo-content/cto-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cto')
const imageAlt = getImage('cto').alt

// SEO Metadata
export const metadata: Metadata = {
  title: ctoJobsUkSEO.meta.title,
  description: ctoJobsUkSEO.meta.description,
  keywords: ctoJobsUkSEO.meta.keywords,
  openGraph: {
    title: ctoJobsUkSEO.meta.title,
    description: ctoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cto-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: ctoJobsUkSEO.meta.title,
    description: ctoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cto-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCTOJobsUKPage() {
  // Server-side data fetch - "cto" filters by role type
  const { jobs, stats } = await getJobsPageData("cto");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: ctoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ctoJobsUkSEO.meta.title,
    description: ctoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cto-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  return (
    <>
      {/* Preload hero image for faster LCP - WebP format */}
      <link
        rel="preload"
        href="/images/hero/cto-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        href="/images/hero/cto-desktop.webp"
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

      {/* Page Content - Using IntelligentDocument pattern for reactive updates */}
      <IntelligentJobPageClient
        location="cto"
        locationDisplay="Fractional CTO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={ctoJobsUkSEO}
        imageCategory="cto"
        roleFilter="CTO"
        accentColor="blue"
      />
    </>
  );
}
