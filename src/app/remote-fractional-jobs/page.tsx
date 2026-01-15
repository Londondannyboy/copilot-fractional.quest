// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { remoteSEO } from "@/lib/seo-content/remote";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('remote')
const imageAlt = getImage('remote').alt

// SEO Metadata
export const metadata: Metadata = {
  title: remoteSEO.meta.title,
  description: remoteSEO.meta.description,
  keywords: remoteSEO.meta.keywords,
  openGraph: {
    title: remoteSEO.meta.title,
    description: remoteSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/remote-fractional-jobs",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: remoteSEO.meta.title,
    description: remoteSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/remote-fractional-jobs",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function RemoteFractionalJobsPage() {
  // Server-side data fetch - remote jobs
  const { jobs, stats } = await getJobsPageData("remote");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: remoteSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: remoteSEO.meta.title,
    description: remoteSEO.meta.description,
    url: "https://fractional.quest/remote-fractional-jobs",
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
        location="remote"
        locationDisplay="Remote"
        initialJobs={jobs}
        stats={stats}
        seoContent={remoteSEO}
        imageCategory="remote"
      />
    </>
  );
}
