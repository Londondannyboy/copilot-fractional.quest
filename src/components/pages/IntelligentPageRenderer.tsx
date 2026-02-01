"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { PageData, Section, FAQ } from "@/lib/pages";
import { HotJobs } from "@/components/HotJobs";
import { JobsSidebar } from "@/components/JobsSidebar";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import { RoleCalculator } from "@/components/RoleCalculator";
import { TrustSignals } from "@/components/TrustSignals";
import AuthorityLinksPanel from "@/components/mdx/AuthorityLinksPanel";
import InternalLinksGrid from "@/components/mdx/InternalLinksGrid";
import { getImage, getHeroImageUrl, ImageCategory } from "@/lib/images";

// Lazy load CopilotKit to reduce initial bundle
const CopilotPopup = dynamic(
  () => import("@copilotkit/react-ui").then((mod) => mod.CopilotPopup),
  { ssr: false }
);
const CopilotKit = dynamic(
  () => import("@copilotkit/react-core").then((mod) => mod.CopilotKit),
  { ssr: false }
);

// ===========================================
// Types
// ===========================================

interface IntelligentPageRendererProps {
  page: PageData;
}

// Extract role from slug (e.g., fractional-cfo-jobs-uk -> cfo)
function extractRoleFromSlug(slug?: string): "cfo" | "cto" | "cmo" | "coo" | "ceo" | "chro" | "cpo" | "ciso" | "cro" | "cco" {
  if (!slug) return "cfo";
  const roleMatch = slug.match(/-(cfo|cto|cmo|coo|ceo|chro|cpo|ciso|cro|cco|cdo)-/i);
  if (roleMatch) {
    const role = roleMatch[1].toLowerCase();
    // Map CDO to CFO for calculator (CDO not in calculator)
    if (role === "cdo") return "cfo";
    return role as "cfo" | "cto" | "cmo" | "coo" | "ceo" | "chro" | "cpo" | "ciso" | "cro" | "cco";
  }
  return "cfo";
}

// ===========================================
// Hero Section - Rich hero with stats overlay
// ===========================================

function IntelligentHero({ page }: { page: PageData }) {
  const imageCategory = (page.image_category || "finance") as ImageCategory;
  const image = getImage(imageCategory);
  const heroUrl = getHeroImageUrl(imageCategory, 1920, 800);

  // Extract stats from first section if it's a stats_bar type
  const statsSection = page.sections?.find((s) => s.type === "stats_bar");
  const stats = statsSection?.stats as Array<{ value: string; label: string }> | undefined;

  return (
    <section className="relative text-white py-12 sm:py-16 px-4 sm:px-6 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroUrl}
          alt={`${page.hero_title} - ${image.alt}`}
          title={page.hero_title || page.title}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/70 to-gray-900/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 opacity-80">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-2">→</span>
          <span>{page.hero_title || page.title}</span>
        </nav>

        {/* Badge */}
        {page.hero_badge && (
          <span className="inline-block bg-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {page.hero_badge}
          </span>
        )}

        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance font-playfair text-white">
            {page.hero_title || page.title}
          </h1>
          {page.hero_subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-8">
              {page.hero_subtitle}
            </p>
          )}
        </div>

        {/* Stats overlay */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:gap-6 mt-6 sm:mt-8">
            {stats.slice(0, 4).map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4">
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs sm:text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo credit */}
      <div className="absolute bottom-2 right-2 z-10">
        <a
          href={image.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/50 hover:text-white/70"
        >
          Photo: {image.credit}
        </a>
      </div>
    </section>
  );
}

// ===========================================
// Definition Box - For AI Overview snippets
// ===========================================

function DefinitionBox({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-6 my-6">
      <h3 className="font-bold text-emerald-900 text-lg mb-2">{title}</h3>
      <p className="text-emerald-800 leading-relaxed">{content}</p>
    </div>
  );
}

// ===========================================
// Section Renderers
// ===========================================

function ProseSection({ section }: { section: Section }) {
  const title = section.title as string | undefined;
  const content = section.content as string | undefined;

  return (
    <div className="prose prose-lg max-w-none">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      )}
      <div
        className="text-gray-700 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    </div>
  );
}

function TableSection({ section }: { section: Section }) {
  const title = section.title as string | undefined;
  const headers = (section.headers as string[]) || [];
  const rows = (section.rows as string[][]) || [];

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((h: string, i: number) => (
                <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: string[], i: number) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {row.map((cell: string, j: number) => (
                  <td key={j} className="px-4 py-3 text-sm text-gray-700 border-b">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Intro Section - heading with prose content
function IntroSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const content = section.content as string | undefined;

  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-6">
      {heading && (
        <h2 className="text-xl font-bold text-emerald-900 mb-3">{heading}</h2>
      )}
      {content && (
        <p className="text-emerald-800 leading-relaxed">{content}</p>
      )}
    </div>
  );
}

// Role Types Section - cards with rates
function RoleTypesSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const items = (section.items as Array<{ title: string; rate: string; description: string }>) || [];

  return (
    <div className="my-8">
      {heading && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <span className="text-emerald-600 font-semibold text-sm whitespace-nowrap ml-2">{item.rate}</span>
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Responsibilities Section - bulleted list
function ResponsibilitiesSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const items = (section.items as unknown as string[]) || [];

  return (
    <div className="my-8">
      {heading && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{heading}</h2>
      )}
      <ul className="grid sm:grid-cols-2 gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-700">
            <span className="text-emerald-500 mt-1">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// When to Hire Section - signal/detail cards
function WhenToHireSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const signals = (section.signals as Array<{ signal: string; detail: string }>) || [];

  return (
    <div className="my-8">
      {heading && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>
      )}
      <div className="space-y-4">
        {signals.map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h3 className="font-bold text-gray-900 mb-1">{item.signal}</h3>
            <p className="text-gray-600 text-sm">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionRenderer({ section }: { section: Section }) {
  const title = (section.title as string) || (section.heading as string) || "";
  const content = (section.content as string) || "";

  switch (section.type) {
    case "stats_bar":
      return null; // Rendered in hero
    case "definition_box":
      return (
        <DefinitionBox
          title={title || "Definition"}
          content={content}
        />
      );
    case "intro":
      return <IntroSection section={section} />;
    case "role_types":
      return <RoleTypesSection section={section} />;
    case "responsibilities":
      return <ResponsibilitiesSection section={section} />;
    case "when_to_hire":
      return <WhenToHireSection section={section} />;
    case "prose":
      return <ProseSection section={section} />;
    case "table":
      return <TableSection section={section} />;
    default:
      if (content) {
        return <ProseSection section={section} />;
      }
      return null;
  }
}

// ===========================================
// FAQ Section
// ===========================================

function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <span className="text-emerald-500 text-xl">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


// ===========================================
// Main Component
// ===========================================

export function IntelligentPageRenderer({ page }: IntelligentPageRendererProps) {
  const accentColor = (page.accent_color || "emerald") as "emerald" | "blue" | "amber" | "purple" | "red" | "indigo";
  const accentColorValue =
    accentColor === "emerald" ? "#059669" :
    accentColor === "blue" ? "#2563eb" :
    accentColor === "amber" ? "#d97706" :
    accentColor === "purple" ? "#7c3aed" :
    accentColor === "red" ? "#dc2626" : "#4f46e5";

  // Determine location from slug or page_type
  const location = page.slug?.includes("london") ? "london" :
    page.slug?.includes("edinburgh") ? "edinburgh" :
    page.slug?.includes("manchester") ? "manchester" :
    page.slug?.includes("bristol") ? "bristol" : "uk";

  return (
    <main
      className="min-h-screen bg-white"
      style={{ "--copilot-kit-primary-color": accentColorValue } as React.CSSProperties}
    >
      {/* Hero Section */}
      <IntelligentHero page={page} />

      {/* Main Content - Two Column Layout */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hot Jobs - Featured jobs at top */}
              <HotJobs
                location={location}
                title={`Hot ${page.hero_title?.split(" ")[0] || ""} Jobs`}
                maxJobs={6}
              />

              {/* Job Board */}
              {page.job_board_enabled && (
                <EmbeddedJobBoard
                  defaultDepartment={page.job_board_department || undefined}
                  defaultLocation={page.job_board_location || undefined}
                  title={page.job_board_title || "Latest Fractional Jobs"}
                  accentColor={accentColor}
                  jobsPerPage={6}
                />
              )}

              {/* Content Sections */}
              {page.sections?.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}

              {/* Role Calculator */}
              <div className="my-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculate Your Day Rate</h2>
                <RoleCalculator role={extractRoleFromSlug(page.slug)} />
              </div>

              {/* FAQs */}
              {page.faqs && page.faqs.length > 0 && (
                <FAQSection faqs={page.faqs} />
              )}

              {/* Authority Links Panel */}
              {page.external_links && page.external_links.length > 0 && (
                <AuthorityLinksPanel
                  links={page.external_links.map(link => ({
                    name: link.label || link.domain || "Resource",
                    url: link.url,
                    context: link.domain || "Industry resource"
                  }))}
                />
              )}

              {/* Internal Links Grid - Related Pages */}
              <InternalLinksGrid
                title="Related Pages"
                links={[
                  { name: "CFO Jobs UK", url: "/fractional-cfo-jobs-uk", description: "Find fractional CFO roles", category: "jobs" as const },
                  { name: "CTO Jobs UK", url: "/fractional-cto-jobs-uk", description: "Find fractional CTO roles", category: "jobs" as const },
                  { name: "CMO Jobs UK", url: "/fractional-cmo-jobs-uk", description: "Find fractional CMO roles", category: "jobs" as const },
                  { name: "All UK Jobs", url: "/fractional-jobs-uk", description: "Browse all fractional jobs", category: "jobs" as const },
                ]}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Jobs Sidebar */}
                <JobsSidebar
                  location={location}
                />

                {/* Trust Signals */}
                <TrustSignals />

                {/* CTA Box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h3 className="font-bold text-emerald-900 mb-2">Looking to Hire?</h3>
                  <p className="text-emerald-800 text-sm mb-4">
                    Connect with vetted fractional executives today.
                  </p>
                  <a
                    href="/contact"
                    className="block w-full text-center bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    Post a Role
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CopilotKit AI Assistant */}
      <CopilotKit runtimeUrl="/api/copilot">
        <CopilotPopup
          labels={{
            title: "Fractional Quest AI",
            initial: `Hi! I can help you find ${page.hero_title || "fractional executive"} roles. What would you like to know?`,
          }}
        />
      </CopilotKit>
    </main>
  );
}
