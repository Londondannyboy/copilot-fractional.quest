// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
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
        location="cmo"
        locationDisplay="CMO"
        initialJobs={jobs}
        stats={stats}
        seoContent={cmoJobsUkSEO}
        imageCategory="cmo"
      />
    </>
  );
}
