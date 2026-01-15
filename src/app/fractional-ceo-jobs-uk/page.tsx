// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { ceoJobsUkSEO } from "@/lib/seo-content/ceo-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('ceo')
const imageAlt = getImage('ceo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: ceoJobsUkSEO.meta.title,
  description: ceoJobsUkSEO.meta.description,
  keywords: ceoJobsUkSEO.meta.keywords,
  openGraph: {
    title: ceoJobsUkSEO.meta.title,
    description: ceoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-ceo-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: ceoJobsUkSEO.meta.title,
    description: ceoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-ceo-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCEOJobsUKPage() {
  // Server-side data fetch - "ceo" filters by role type
  const { jobs, stats } = await getJobsPageData("ceo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: ceoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ceoJobsUkSEO.meta.title,
    description: ceoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-ceo-jobs-uk",
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
        location="ceo"
        locationDisplay="CEO"
        initialJobs={jobs}
        stats={stats}
        seoContent={ceoJobsUkSEO}
        imageCategory="ceo"
        // Personalized sections for logged-in users
        enablePersonalizedSections={true}
        targetRole="CEO"
        userDayRate={1000}
      />
    </>
  );
}
