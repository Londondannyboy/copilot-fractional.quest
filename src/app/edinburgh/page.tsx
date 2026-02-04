// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { edinburghSEO } from "@/lib/seo-content/edinburgh";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('edinburgh')
const imageAlt = getImage('edinburgh').alt

// SEO Metadata
export const metadata: Metadata = {
  title: edinburghSEO.meta.title,
  description: edinburghSEO.meta.description,
  keywords: edinburghSEO.meta.keywords,
  openGraph: {
    title: edinburghSEO.meta.title,
    description: edinburghSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/edinburgh",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: edinburghSEO.meta.title,
    description: edinburghSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/edinburgh",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function EdinburghPage() {
  // Server-side data fetch
  const { jobs, stats } = await getJobsPageData("edinburgh");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: edinburghSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: edinburghSEO.meta.title,
    description: edinburghSEO.meta.description,
    url: "https://fractional.quest/edinburgh",
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
      <IntelligentJobPageClient
        location="edinburgh"
        locationDisplay="Edinburgh"
        initialJobs={jobs}
        stats={stats}
        seoContent={edinburghSEO}
        imageCategory="edinburgh"
      />
    </>
  );
}
