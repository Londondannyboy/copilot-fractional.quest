// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { chroJobsSEO } from "@/lib/seo-content/chro-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('chro')
const imageAlt = getImage('chro').alt

// SEO Metadata
export const metadata: Metadata = {
  title: chroJobsSEO.meta.title,
  description: chroJobsSEO.meta.description,
  keywords: chroJobsSEO.meta.keywords,
  openGraph: {
    title: chroJobsSEO.meta.title,
    description: chroJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-chro",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: chroJobsSEO.meta.title,
    description: chroJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-chro",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCHROPage() {
  // Server-side data fetch - "chro" filters by role type
  const { jobs, stats } = await getJobsPageData("chro");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: chroJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: chroJobsSEO.meta.title,
    description: chroJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-chro",
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
        location="chro"
        locationDisplay="Fractional CHRO"
        initialJobs={jobs}
        stats={stats}
        seoContent={chroJobsSEO}
        imageCategory="chro"
        roleFilter="CHRO"
        accentColor="purple"
      />
    </>
  );
}
