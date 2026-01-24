// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cioJobsUkSEO } from "@/lib/seo-content/cio-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('tech')
const imageAlt = getImage('tech').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cioJobsUkSEO.meta.title,
  description: cioJobsUkSEO.meta.description,
  keywords: cioJobsUkSEO.meta.keywords,
  openGraph: {
    title: cioJobsUkSEO.meta.title,
    description: cioJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cio-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cioJobsUkSEO.meta.title,
    description: cioJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cio-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCIOJobsUKPage() {
  // Server-side data fetch - "cio" filters by role type
  const { jobs, stats } = await getJobsPageData("cio");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cioJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cioJobsUkSEO.meta.title,
    description: cioJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cio-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  return (
    <>
      {/* Preload hero image for faster LCP - use CTO WebP as closest match */}
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
        location="cio"
        locationDisplay="Fractional CIO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={cioJobsUkSEO}
        imageCategory="tech"
        roleFilter="CIO"
        accentColor="blue"
      />
    </>
  );
}
