// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { chroJobsUkSEO } from "@/lib/seo-content/chro-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('chro')
const imageAlt = getImage('chro').alt

// SEO Metadata
export const metadata: Metadata = {
  title: chroJobsUkSEO.meta.title,
  description: chroJobsUkSEO.meta.description,
  keywords: chroJobsUkSEO.meta.keywords,
  openGraph: {
    title: chroJobsUkSEO.meta.title,
    description: chroJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-chro-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: chroJobsUkSEO.meta.title,
    description: chroJobsUkSEO.meta.description,
    images: [ogImage],
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCHROJobsUKPage() {
  // Server-side data fetch - "chro" filters by role type
  const { jobs, stats } = await getJobsPageData("chro");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: chroJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: chroJobsUkSEO.meta.title,
    description: chroJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-chro-jobs-uk",
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
        location="chro"
        locationDisplay="CHRO"
        initialJobs={jobs}
        stats={stats}
        seoContent={chroJobsUkSEO}
        imageCategory="chro"
        // Personalized sections for logged-in users
        enablePersonalizedSections={true}
        targetRole="CHRO"
        userDayRate={1000}
      />
    </>
  );
}
