// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { ceoJobsSEO } from "@/lib/seo-content/ceo-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('ceo')
const imageAlt = getImage('ceo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: ceoJobsSEO.meta.title,
  description: ceoJobsSEO.meta.description,
  keywords: ceoJobsSEO.meta.keywords,
  openGraph: {
    title: ceoJobsSEO.meta.title,
    description: ceoJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-ceo",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: ceoJobsSEO.meta.title,
    description: ceoJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-ceo",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCEOPage() {
  // Server-side data fetch - "ceo" filters by role type
  const { jobs, stats } = await getJobsPageData("ceo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: ceoJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ceoJobsSEO.meta.title,
    description: ceoJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-ceo",
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
        location="ceo"
        locationDisplay="Fractional CEO"
        initialJobs={jobs}
        stats={stats}
        seoContent={ceoJobsSEO}
        imageCategory="ceo"
        roleFilter="CEO"
        accentColor="amber"
      />
    </>
  );
}
