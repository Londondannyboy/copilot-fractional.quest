// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cfoJobsUkSEO } from "@/lib/seo-content/cfo-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cfo')
const imageAlt = getImage('cfo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cfoJobsUkSEO.meta.title,
  description: cfoJobsUkSEO.meta.description,
  keywords: cfoJobsUkSEO.meta.keywords,
  openGraph: {
    title: cfoJobsUkSEO.meta.title,
    description: cfoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cfo-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cfoJobsUkSEO.meta.title,
    description: cfoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cfo-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCFOJobsUKPage() {
  // Server-side data fetch - "cfo" filters by role type
  const { jobs, stats } = await getJobsPageData("cfo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cfoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cfoJobsUkSEO.meta.title,
    description: cfoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cfo-jobs-uk",
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
        href="/images/hero/cfo-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        href="/images/hero/cfo-desktop.webp"
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
        location="cfo"
        locationDisplay="Fractional CFO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={cfoJobsUkSEO}
        imageCategory="cfo"
        roleFilter="CFO"
        accentColor="emerald"
      />
    </>
  );
}
