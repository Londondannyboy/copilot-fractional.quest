import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { manchesterSEO } from "@/lib/seo-content/manchester";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('manchester')
const imageAlt = getImage('manchester').alt

// SEO Metadata
export const metadata: Metadata = {
  title: manchesterSEO.meta.title,
  description: manchesterSEO.meta.description,
  keywords: manchesterSEO.meta.keywords,
  alternates: {
    canonical: "https://fractional.quest/manchester",
  },
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

export default async function ManchesterJobsPage() {
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: manchesterSEO.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Content */}
      <IntelligentJobPageClient
        location="manchester"
        locationDisplay="Manchester"
        initialJobs={jobs}
        stats={stats}
        seoContent={manchesterSEO}
        imageCategory="manchester"
      />
    </>
  );
}
