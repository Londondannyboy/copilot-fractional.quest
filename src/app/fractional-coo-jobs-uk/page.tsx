// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { cooJobsUkSEO } from "@/lib/seo-content/coo-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('coo')
const imageAlt = getImage('coo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cooJobsUkSEO.meta.title,
  description: cooJobsUkSEO.meta.description,
  keywords: cooJobsUkSEO.meta.keywords,
  openGraph: {
    title: cooJobsUkSEO.meta.title,
    description: cooJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-coo-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cooJobsUkSEO.meta.title,
    description: cooJobsUkSEO.meta.description,
    images: [ogImage],
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCOOJobsUKPage() {
  // Server-side data fetch - "coo" filters by role type
  const { jobs, stats } = await getJobsPageData("coo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cooJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cooJobsUkSEO.meta.title,
    description: cooJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-coo-jobs-uk",
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
        location="coo"
        locationDisplay="COO"
        initialJobs={jobs}
        stats={stats}
        seoContent={cooJobsUkSEO}
        imageCategory="coo"
        // Personalized sections for logged-in users
        enablePersonalizedSections={true}
        targetRole="COO"
        userDayRate={1000}
      />
    </>
  );
}
