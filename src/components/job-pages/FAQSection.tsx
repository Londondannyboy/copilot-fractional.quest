"use client";

import { Section, SectionHeading } from "@/components/ui";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  location: string;
}

export function FAQSection({ faqs, location }: FAQSectionProps) {
  // Generate FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Section background="muted">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionHeading subtitle={`Common questions about fractional jobs ${location}`}>
        Fractional Jobs {location}: FAQs
      </SectionHeading>

      <div className="max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="card p-5 cursor-pointer group"
          >
            <summary className="font-medium text-gray-900 list-none flex justify-between items-center">
              <span>{faq.question}</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
