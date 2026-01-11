// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { birminghamSEO } from "@/lib/seo-content/birmingham";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('uk')
const imageAlt = getImage('uk').alt

// SEO Metadata
export const metadata: Metadata = {
  title: birminghamSEO.meta.title,
  description: birminghamSEO.meta.description,
  keywords: birminghamSEO.meta.keywords,
  openGraph: {
    title: birminghamSEO.meta.title,
    description: birminghamSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/birmingham",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: birminghamSEO.meta.title,
    description: birminghamSEO.meta.description,
    images: [ogImage],
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function BirminghamPage() {
  // Server-side data fetch
  const { jobs, stats } = await getJobsPageData("birmingham");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: birminghamSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: birminghamSEO.meta.title,
    description: birminghamSEO.meta.description,
    url: "https://fractional.quest/birmingham",
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
        location="birmingham"
        locationDisplay="Birmingham"
        initialJobs={jobs}
        stats={stats}
        seoContent={birminghamSEO}
        imageCategory="uk"
      />
    </>
  );
}
