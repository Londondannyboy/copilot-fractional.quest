import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { mdJobsUkSEO } from "@/lib/seo-content/md-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('default')
const imageAlt = getImage('default').alt

export const metadata: Metadata = {
  title: mdJobsUkSEO.meta.title,
  description: mdJobsUkSEO.meta.description,
  keywords: mdJobsUkSEO.meta.keywords,
  openGraph: {
    title: mdJobsUkSEO.meta.title,
    description: mdJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-managing-director-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  alternates: { canonical: "/fractional-managing-director-jobs-uk" },
};

export const revalidate = 3600;

export default async function FractionalMDJobsUKPage() {
  const { jobs, stats } = await getJobsPageData("executive");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: mdJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mdJobsUkSEO.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <IntelligentJobPageClient
        location="md"
        locationDisplay="Fractional Managing Director UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={mdJobsUkSEO}
        imageCategory="default"
        roleFilter="Managing Director"
        accentColor="gray"
      />
    </>
  );
}
