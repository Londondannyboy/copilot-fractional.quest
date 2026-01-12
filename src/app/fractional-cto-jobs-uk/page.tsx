// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
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
        location="cto"
        locationDisplay="CTO"
        initialJobs={jobs}
        stats={stats}
        seoContent={ctoJobsUkSEO}
        imageCategory="cto"
        // Personalized sections for logged-in users
        enablePersonalizedSections={true}
        targetRole="CTO"
        userDayRate={1000}
      />
    </>
  );
}
