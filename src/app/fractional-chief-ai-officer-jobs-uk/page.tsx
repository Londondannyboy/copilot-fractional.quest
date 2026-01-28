// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { caioJobsUkSEO } from "@/lib/seo-content/caio-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('tech')
const imageAlt = getImage('tech').alt

// SEO Metadata
export const metadata: Metadata = {
  title: caioJobsUkSEO.meta.title,
  description: caioJobsUkSEO.meta.description,
  keywords: caioJobsUkSEO.meta.keywords,
  openGraph: {
    title: caioJobsUkSEO.meta.title,
    description: caioJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-chief-ai-officer-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: caioJobsUkSEO.meta.title,
    description: caioJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-chief-ai-officer-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCAIOJobsUKPage() {
  // Server-side data fetch - "engineering" filters by role type (AI roles are in Engineering category)
  const { jobs, stats } = await getJobsPageData("engineering");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: caioJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: caioJobsUkSEO.meta.title,
    description: caioJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-chief-ai-officer-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: caioJobsUkSEO.faqs.map((faq) => ({
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

      {/* Page Content - Using IntelligentDocument pattern for reactive updates */}
      <IntelligentJobPageClient
        location="caio"
        locationDisplay="Fractional Chief AI Officer UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={caioJobsUkSEO}
        imageCategory="tech"
        roleFilter="AI"
        accentColor="purple"
      />
    </>
  );
}
