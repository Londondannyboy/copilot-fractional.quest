// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cooJobsSEO } from "@/lib/seo-content/coo-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('coo')
const imageAlt = getImage('coo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cooJobsSEO.meta.title,
  description: cooJobsSEO.meta.description,
  keywords: cooJobsSEO.meta.keywords,
  openGraph: {
    title: cooJobsSEO.meta.title,
    description: cooJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-coo",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cooJobsSEO.meta.title,
    description: cooJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-coo",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCOOPage() {
  // Server-side data fetch - "coo" filters by role type
  const { jobs, stats } = await getJobsPageData("coo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cooJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cooJobsSEO.meta.title,
    description: cooJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-coo",
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
        location="coo"
        locationDisplay="Fractional COO"
        initialJobs={jobs}
        stats={stats}
        seoContent={cooJobsSEO}
        imageCategory="coo"
        roleFilter="COO"
        accentColor="purple"
      />
    </>
  );
}
