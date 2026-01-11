// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { manchesterSEO } from "@/lib/seo-content/manchester";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('uk')
const imageAlt = getImage('uk').alt

// SEO Metadata
export const metadata: Metadata = {
  title: manchesterSEO.meta.title,
  description: manchesterSEO.meta.description,
  keywords: manchesterSEO.meta.keywords,
  openGraph: {
    title: manchesterSEO.meta.title,
    description: manchesterSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/manchester",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: manchesterSEO.meta.title,
    description: manchesterSEO.meta.description,
    images: [ogImage],
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function ManchesterPage() {
  // Server-side data fetch
  const { jobs, stats } = await getJobsPageData("manchester");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: manchesterSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: manchesterSEO.meta.title,
    description: manchesterSEO.meta.description,
    url: "https://fractional.quest/manchester",
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
        location="manchester"
        locationDisplay="Manchester"
        initialJobs={jobs}
        stats={stats}
        seoContent={manchesterSEO}
        imageCategory="uk"
      />
    </>
  );
}
