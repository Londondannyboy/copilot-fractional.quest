// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { londonSEO } from "@/lib/seo-content/london";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('london')
const imageAlt = getImage('london').alt

// SEO Metadata
export const metadata: Metadata = {
  title: londonSEO.meta.title,
  description: londonSEO.meta.description,
  keywords: londonSEO.meta.keywords,
  openGraph: {
    title: londonSEO.meta.title,
    description: londonSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-london",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: londonSEO.meta.title,
    description: londonSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-london",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsLondonPage() {
  // Server-side data fetch
  const { jobs, stats } = await getJobsPageData("london");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: londonSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: londonSEO.meta.title,
    description: londonSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-london",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  return (
    <>
      {/* Preload hero image for faster LCP - WebP format */}
      {/* Note: Unsplash preconnect is now in layout.tsx for all pages */}
      <link
        rel="preload"
        href="/images/hero/fractional-jobs-london-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        href="/images/hero/fractional-jobs-london-desktop.webp"
        as="image"
        type="image/webp"
        media="(min-width: 769px)"
        fetchPriority="high"
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
        location="london"
        locationDisplay="London"
        initialJobs={jobs}
        stats={stats}
        seoContent={londonSEO}
        imageCategory="london"
        accentColor="emerald"
      />
    </>
  );
}
