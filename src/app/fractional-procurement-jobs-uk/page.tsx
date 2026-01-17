// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { procurementJobsUkSEO } from "@/lib/seo-content/procurement-jobs-uk";

// SEO Metadata
export const metadata: Metadata = {
  title: procurementJobsUkSEO.meta.title,
  description: procurementJobsUkSEO.meta.description,
  keywords: procurementJobsUkSEO.meta.keywords,
  openGraph: {
    title: procurementJobsUkSEO.meta.title,
    description: procurementJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-procurement-jobs-uk",
    images: [{ url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80", width: 1200, height: 630, alt: "Fractional Procurement Jobs UK" }],
  },
  twitter: {
    card: "summary_large_image",
    title: procurementJobsUkSEO.meta.title,
    description: procurementJobsUkSEO.meta.description,
    images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"],
  },
  alternates: {
    canonical: "/fractional-procurement-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalProcurementJobsUKPage() {
  // Server-side data fetch - "operations" filters by role type (closest to procurement)
  const { jobs, stats } = await getJobsPageData("operations");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: procurementJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: procurementJobsUkSEO.meta.title,
    description: procurementJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-procurement-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  return (
    <>
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
        location="procurement"
        locationDisplay="Fractional Procurement UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={procurementJobsUkSEO}
        imageCategory="operations"
        roleFilter="Procurement"
        accentColor="purple"
      />
    </>
  );
}
