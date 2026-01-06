import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { londonSEO } from "@/lib/seo-content/london";

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
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Page Content */}
      <JobPageClient
        location="london"
        locationDisplay="London"
        initialJobs={jobs}
        stats={stats}
        seoContent={londonSEO}
      />
    </>
  );
}
