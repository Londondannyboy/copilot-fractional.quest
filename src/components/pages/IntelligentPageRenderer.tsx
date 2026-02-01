"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { PageData, Section, FAQ } from "@/lib/pages";
import { HotJobs } from "@/components/HotJobs";
import { JobsSidebar } from "@/components/JobsSidebar";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import { RoleCalculator } from "@/components/RoleCalculator";
import { TrustSignals } from "@/components/TrustSignals";
import AuthorityLinksPanel from "@/components/mdx/AuthorityLinksPanel";
import InternalLinksGrid from "@/components/mdx/InternalLinksGrid";
import { getImage, getHeroImageUrl, ImageCategory } from "@/lib/images";

// Lazy load CopilotKit - doesn't block initial render
const CopilotKitWrapper = dynamic(
  () => import("@/components/job-pages/CopilotKitWrapper"),
  { ssr: false, loading: () => null }
);

// ===========================================
// Auto-Linking System - Internal & External
// ===========================================

// Internal links to other pages on the site - COMPREHENSIVE
const INTERNAL_LINK_MAP: Record<string, { url: string; title: string }> = {
  // C-Suite fractional roles
  "fractional CFO": { url: "/fractional-cfo-jobs-uk", title: "Fractional CFO Jobs UK" },
  "fractional CTO": { url: "/fractional-cto-jobs-uk", title: "Fractional CTO Jobs UK" },
  "fractional CMO": { url: "/fractional-cmo-jobs-uk", title: "Fractional CMO Jobs UK" },
  "fractional COO": { url: "/fractional-coo-jobs-uk", title: "Fractional COO Jobs UK" },
  "fractional CEO": { url: "/fractional-ceo-jobs-uk", title: "Fractional CEO Jobs UK" },
  "fractional CHRO": { url: "/fractional-chro-jobs-uk", title: "Fractional CHRO Jobs UK" },
  "fractional CISO": { url: "/fractional-ciso-jobs-uk", title: "Fractional CISO Jobs UK" },
  "fractional CPO": { url: "/fractional-cpo-jobs-uk", title: "Fractional CPO Jobs UK" },
  "fractional CRO": { url: "/fractional-cro-jobs-uk", title: "Fractional CRO Jobs UK" },
  "fractional CDO": { url: "/fractional-cdo-jobs-uk", title: "Fractional CDO Jobs UK" },
  // Full titles
  "Chief Financial Officer": { url: "/fractional-cfo-jobs-uk", title: "Fractional CFO Jobs" },
  "Chief Technology Officer": { url: "/fractional-cto-jobs-uk", title: "Fractional CTO Jobs" },
  "Chief Marketing Officer": { url: "/fractional-cmo-jobs-uk", title: "Fractional CMO Jobs" },
  "Chief Operating Officer": { url: "/fractional-coo-jobs-uk", title: "Fractional COO Jobs" },
  "Chief Data Officer": { url: "/fractional-cdo-jobs-uk", title: "Fractional CDO Jobs" },
  "Chief Executive Officer": { url: "/fractional-ceo-jobs-uk", title: "Fractional CEO Jobs" },
  "Chief Information Security Officer": { url: "/fractional-ciso-jobs-uk", title: "Fractional CISO Jobs" },
  "Chief Human Resources Officer": { url: "/fractional-chro-jobs-uk", title: "Fractional CHRO Jobs" },
  "Chief Product Officer": { url: "/fractional-cpo-jobs-uk", title: "Fractional CPO Jobs" },
  "Chief Revenue Officer": { url: "/fractional-cro-jobs-uk", title: "Fractional CRO Jobs" },
  // Interim roles
  "interim CFO": { url: "/interim-cfo-jobs-uk", title: "Interim CFO Jobs UK" },
  "interim CTO": { url: "/interim-cto-jobs-uk", title: "Interim CTO Jobs UK" },
  "interim CMO": { url: "/interim-cmo-jobs-uk", title: "Interim CMO Jobs UK" },
  "interim COO": { url: "/interim-coo-jobs-uk", title: "Interim COO Jobs UK" },
  "interim CEO": { url: "/interim-ceo-jobs-uk", title: "Interim CEO Jobs UK" },
  "interim CHRO": { url: "/interim-chro-jobs-uk", title: "Interim CHRO Jobs UK" },
  "interim management": { url: "/interim-jobs-uk", title: "Interim Jobs UK" },
  // Part-time roles
  "part-time CFO": { url: "/part-time-cfo-jobs-uk", title: "Part-Time CFO Jobs" },
  "part-time CTO": { url: "/part-time-cto-jobs-uk", title: "Part-Time CTO Jobs" },
  "part-time CMO": { url: "/part-time-cmo-jobs-uk", title: "Part-Time CMO Jobs" },
  // Virtual/Advisory
  "virtual CFO": { url: "/virtual-cfo", title: "Virtual CFO Services" },
  "virtual CTO": { url: "/virtual-cto", title: "Virtual CTO Services" },
  "advisory board": { url: "/advisory-jobs-uk", title: "Advisory Jobs UK" },
  // Other roles
  "Finance Director": { url: "/fractional-finance-director-jobs-uk", title: "Fractional Finance Director Jobs" },
  "General Counsel": { url: "/fractional-general-counsel-jobs-uk", title: "Fractional General Counsel Jobs" },
  "Managing Director": { url: "/fractional-managing-director-jobs-uk", title: "Fractional MD Jobs" },
  "Chief AI Officer": { url: "/fractional-chief-ai-officer-jobs-uk", title: "Fractional CAIO Jobs" },
  // Topics & Concepts
  "day rate": { url: "/fractional-executive-day-rates", title: "Fractional Executive Day Rates" },
  "day rates": { url: "/fractional-executive-day-rates", title: "Fractional Executive Day Rates" },
  "executive search": { url: "/executive-search-firms", title: "Executive Search Firms" },
  "fractional executive": { url: "/fractional-jobs-uk", title: "Fractional Jobs UK" },
  "fractional executives": { url: "/fractional-jobs-uk", title: "Fractional Jobs UK" },
  "C-suite": { url: "/fractional-jobs-uk", title: "C-Suite Fractional Jobs" },
  "startup": { url: "/fractional-jobs-uk", title: "Startup Fractional Jobs" },
  "scale-up": { url: "/fractional-jobs-uk", title: "Scale-up Fractional Jobs" },
  "SME": { url: "/fractional-jobs-uk", title: "SME Fractional Jobs" },
  // Locations
  "London": { url: "/fractional-jobs-london", title: "Fractional Jobs London" },
  "Manchester": { url: "/manchester", title: "Fractional Jobs Manchester" },
  "remote": { url: "/remote-fractional-jobs", title: "Remote Fractional Jobs" },
};

// External authority links - primary sources
const EXTERNAL_LINK_MAP: Record<string, { url: string; title: string }> = {
  // Professional Bodies
  "Gartner": { url: "https://www.gartner.com/en/information-technology/glossary/chief-data-officer", title: "Gartner CDO Definition" },
  "ICAEW": { url: "https://www.icaew.com/", title: "Institute of Chartered Accountants" },
  "ACCA": { url: "https://www.accaglobal.com/", title: "Association of Chartered Certified Accountants" },
  "CIMA": { url: "https://www.cimaglobal.com/", title: "Chartered Institute of Management Accountants" },
  "CIPD": { url: "https://www.cipd.org/", title: "Chartered Institute of Personnel and Development" },
  "CIM": { url: "https://www.cim.co.uk/", title: "Chartered Institute of Marketing" },
  "CMI": { url: "https://www.managers.org.uk/", title: "Chartered Management Institute" },
  "IoD": { url: "https://www.iod.com/", title: "Institute of Directors" },
  "BCS": { url: "https://www.bcs.org/", title: "British Computer Society" },
  // Regulations
  "GDPR": { url: "https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/", title: "ICO GDPR Guide" },
  "AI Act": { url: "https://artificialintelligenceact.eu/", title: "EU AI Act" },
  "FCA": { url: "https://www.fca.org.uk/", title: "Financial Conduct Authority" },
  // Research/Analysts
  "Splunk": { url: "https://www.splunk.com/en_us/blog/leadership.html", title: "Splunk Leadership Insights" },
  "McKinsey": { url: "https://www.mckinsey.com/", title: "McKinsey & Company" },
  "Deloitte": { url: "https://www2.deloitte.com/uk/en.html", title: "Deloitte UK" },
  "PwC": { url: "https://www.pwc.co.uk/", title: "PwC UK" },
  "KPMG": { url: "https://kpmg.com/uk/en/home.html", title: "KPMG UK" },
  "EY": { url: "https://www.ey.com/en_uk", title: "Ernst & Young UK" },
  // Technology
  "Tech Nation": { url: "https://technation.io/", title: "Tech Nation" },
  // Security
  "NCSC": { url: "https://www.ncsc.gov.uk/", title: "National Cyber Security Centre" },
  "ISACA": { url: "https://www.isaca.org/", title: "ISACA" },
};

// Process MDX content to add auto-links (first occurrence only)
function addAutoLinks(content: string, currentSlug?: string): string {
  if (!content) return content;

  let processedContent = content;
  const linkedTerms = new Set<string>();

  // Add internal links (skip if linking to current page)
  for (const [term, link] of Object.entries(INTERNAL_LINK_MAP)) {
    if (linkedTerms.has(term.toLowerCase())) continue;
    if (currentSlug && link.url.includes(currentSlug)) continue;

    // Case-insensitive match, first occurrence only
    const regex = new RegExp(`\\b(${term})\\b(?![^\\[]*\\])(?![^<]*>)`, 'i');
    if (regex.test(processedContent)) {
      processedContent = processedContent.replace(regex, `[$1](${link.url} "${link.title}")`);
      linkedTerms.add(term.toLowerCase());
    }
  }

  // Add external authority links
  for (const [term, link] of Object.entries(EXTERNAL_LINK_MAP)) {
    if (linkedTerms.has(term.toLowerCase())) continue;

    const regex = new RegExp(`\\b(${term})\\b(?![^\\[]*\\])(?![^<]*>)`, 'i');
    if (regex.test(processedContent)) {
      processedContent = processedContent.replace(regex, `[$1](${link.url} "${link.title}")`);
      linkedTerms.add(term.toLowerCase());
    }
  }

  return processedContent;
}

// Strip MDX component tags that ReactMarkdown can't render
function stripMdxComponents(content: string): string {
  if (!content) return content;

  // Remove common MDX component tags (these are rendered by the template)
  const componentPatterns = [
    /<EmbeddedJobBoard[^>]*\/>/g,
    /<SalaryBenchmarkChart[^>]*\/>/g,
    /<RoleCalculator[^>]*\/>/g,
    /<HotJobs[^>]*\/>/g,
    /<TableOfContents[^>]*\/>/g,
    /<AuthorityLinksPanel[^>]*\/>/g,
    /<InternalLinksGrid[^>]*\/>/g,
    /<CopilotKit[^>]*\/>/g,
    /<TrustSignals[^>]*\/>/g,
    /<[A-Z][a-zA-Z]*\s+[^>]*\/>/g, // Generic self-closing component tags
    /<[A-Z][a-zA-Z]*\s*\/>/g, // Simple self-closing tags
  ];

  let cleaned = content;
  for (const pattern of componentPatterns) {
    cleaned = cleaned.replace(pattern, '');
  }

  // Clean up multiple blank lines left behind
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

// Add paragraph breaks for better readability (insert visual breaks between major sections)
function addTextBreathing(content: string): string {
  if (!content) return content;

  // Split by double newlines (paragraphs)
  const paragraphs = content.split(/\n\n+/);

  // If content has many paragraphs, insert horizontal rules for visual breaks
  if (paragraphs.length > 6) {
    const result: string[] = [];
    let paragraphsSinceBreak = 0;

    paragraphs.forEach((p, i) => {
      result.push(p);
      paragraphsSinceBreak++;

      // Check if next paragraph is a heading (natural break point)
      const nextIsHeading = paragraphs[i + 1]?.startsWith('#');

      // Insert a visual break:
      // - After every 5 regular paragraphs, OR
      // - Before a heading (but only if we've had content since last break)
      if (i < paragraphs.length - 1) {
        if (nextIsHeading && paragraphsSinceBreak >= 2) {
          result.push('\n---\n'); // Horizontal rule before heading
          paragraphsSinceBreak = 0;
        } else if (paragraphsSinceBreak >= 5 && !p.startsWith('#') && !nextIsHeading) {
          result.push('\n---\n'); // Visual break after long content
          paragraphsSinceBreak = 0;
        }
      }
    });
    return result.join('\n\n');
  }

  return content;
}

// Salary data for chart
const ROLE_SALARY_DATA: Record<string, { min: number; avg: number; max: number }> = {
  cfo: { min: 800, avg: 1100, max: 1500 },
  cto: { min: 900, avg: 1200, max: 1600 },
  cmo: { min: 750, avg: 1000, max: 1400 },
  coo: { min: 800, avg: 1050, max: 1400 },
  ceo: { min: 1000, avg: 1400, max: 2000 },
  chro: { min: 700, avg: 950, max: 1300 },
  cpo: { min: 850, avg: 1100, max: 1450 },
  ciso: { min: 900, avg: 1200, max: 1550 },
  cdo: { min: 900, avg: 1150, max: 1450 },
};

// Simple salary visualization component (sidebar version)
function SalaryRangeChart({ role }: { role: string }) {
  const data = ROLE_SALARY_DATA[role.toLowerCase()] || ROLE_SALARY_DATA.cfo;
  const maxValue = 2000;

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">UK Day Rate Range</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Minimum</span>
            <span className="font-semibold text-gray-900">£{data.min}/day</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-400 rounded-full transition-all"
              style={{ width: `${(data.min / maxValue) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Average</span>
            <span className="font-semibold text-emerald-700">£{data.avg}/day</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${(data.avg / maxValue) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Maximum</span>
            <span className="font-semibold text-blue-700">£{data.max}/day</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(data.max / maxValue) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">Based on UK market data for fractional executives</p>
    </div>
  );
}

// Cost Savings Visualization
function CostSavingsChart({ role }: { role: string }) {
  const data = ROLE_SALARY_DATA[role.toLowerCase()] || ROLE_SALARY_DATA.cfo;
  const fractionalCost = data.avg * 8 * 12; // 8 days/month for 12 months
  const fullTimeCost = data.avg * 5 * 52; // Full salary estimate (5 days/week)
  const savings = fullTimeCost - fractionalCost;
  const savingsPercent = Math.round((savings / fullTimeCost) * 100);

  return (
    <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl p-6 my-8 border border-purple-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">💰</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Cost Comparison</h3>
          <p className="text-purple-700 text-sm">Fractional vs Full-Time Executive</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Full-time bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Full-Time Executive</span>
            <span className="font-bold text-gray-900">£{Math.round(fullTimeCost / 1000)}k/year</span>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-lg" style={{ width: "100%" }} />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              Salary + Benefits + Overhead
            </div>
          </div>
        </div>

        {/* Fractional bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Fractional Executive</span>
            <span className="font-bold text-emerald-700">£{Math.round(fractionalCost / 1000)}k/year</span>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg"
              style={{ width: `${(fractionalCost / fullTimeCost) * 100}%` }}
            />
            <div className="absolute inset-0 flex items-center px-4 text-emerald-700 font-bold text-sm">
              1-2 days/week average
            </div>
          </div>
        </div>

        {/* Savings highlight */}
        <div className="bg-white rounded-xl p-4 border-2 border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Your Potential Savings</p>
              <p className="text-3xl font-bold text-emerald-600">£{Math.round(savings / 1000)}k+</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-white font-bold text-xl">{savingsPercent}%</div>
                <div className="text-white text-xs opacity-80">saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skills/Expertise Donut Chart
function SkillsBreakdownChart() {
  const skills = [
    { name: "Strategy", percent: 30, color: "from-blue-500 to-indigo-500" },
    { name: "Operations", percent: 25, color: "from-emerald-500 to-teal-500" },
    { name: "Leadership", percent: 20, color: "from-purple-500 to-violet-500" },
    { name: "Governance", percent: 15, color: "from-amber-500 to-orange-500" },
    { name: "Technology", percent: 10, color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 my-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">📊</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Time Allocation</h3>
          <p className="text-gray-600 text-sm">How fractional executives spend their time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{skill.name}</span>
                <span className="font-bold text-gray-900">{skill.percent}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-500`}
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Large market comparison chart (main content version)
function MarketComparisonChart({ currentRole }: { currentRole: string }) {
  const roles = ['cfo', 'cto', 'cmo', 'coo', 'cdo', 'ciso'];
  const maxValue = 1600;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">UK Fractional Executive Day Rates</h2>
      <p className="text-gray-600 mb-6">Compare day rates across C-suite roles</p>

      <div className="space-y-4">
        {roles.map((role) => {
          const data = ROLE_SALARY_DATA[role] || ROLE_SALARY_DATA.cfo;
          const isCurrentRole = role.toLowerCase() === currentRole.toLowerCase();

          return (
            <div key={role} className={`p-4 rounded-xl transition-all ${isCurrentRole ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold uppercase ${isCurrentRole ? 'text-emerald-700' : 'text-gray-700'}`}>
                  {role.toUpperCase()}
                  {isCurrentRole && <span className="ml-2 text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">This Role</span>}
                </span>
                <span className="text-sm text-gray-600">
                  £{data.min} - £{data.max}/day
                </span>
              </div>
              <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
                {/* Min to Max range bar */}
                <div
                  className={`absolute h-full rounded-lg ${isCurrentRole ? 'bg-emerald-200' : 'bg-blue-100'}`}
                  style={{
                    left: `${(data.min / maxValue) * 100}%`,
                    width: `${((data.max - data.min) / maxValue) * 100}%`
                  }}
                />
                {/* Average marker */}
                <div
                  className={`absolute top-0 bottom-0 w-1 ${isCurrentRole ? 'bg-emerald-600' : 'bg-blue-600'}`}
                  style={{ left: `${(data.avg / maxValue) * 100}%` }}
                />
                {/* Average label */}
                <div
                  className="absolute -top-6 transform -translate-x-1/2 text-xs font-semibold"
                  style={{ left: `${(data.avg / maxValue) * 100}%` }}
                >
                  <span className={isCurrentRole ? 'text-emerald-700' : 'text-blue-700'}>£{data.avg}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 bg-blue-100 rounded" />
            <span>Rate Range</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-blue-600 rounded" />
            <span>Average</span>
          </div>
        </div>
        <span>Source: UK Market Data 2025</span>
      </div>
    </div>
  );
}

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
// Definition Box - Premium AI Overview snippet
// ===========================================

function DefinitionBox({ title, content }: { title: string; content: string }) {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 rounded-2xl p-6 my-8 overflow-hidden border border-indigo-100 shadow-sm">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-30 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-violet-200 rounded-full opacity-30 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-xl">📖</span>
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-lg">{title}</h3>
            <p className="text-xs text-indigo-600">Quick Definition</p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-indigo-100">
          <p className="text-indigo-800 leading-relaxed">{content}</p>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
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

// Intro Section - premium callout with icon and gradient
function IntroSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const content = section.content as string | undefined;

  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 overflow-hidden border border-emerald-100">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-30 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-teal-200 rounded-full opacity-30 blur-2xl" />

      <div className="relative flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">💡</span>
          </div>
        </div>

        <div>
          {heading && (
            <h2 className="text-xl font-bold text-emerald-900 mb-2">{heading}</h2>
          )}
          {content && (
            <p className="text-emerald-800 leading-relaxed">{content}</p>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
    </div>
  );
}

// Role type icons and colors based on engagement type
const ROLE_TYPE_STYLES: Record<string, { icon: string; gradient: string; bgLight: string }> = {
  fractional: { icon: "⏰", gradient: "from-emerald-500 to-teal-500", bgLight: "from-emerald-50 to-teal-50" },
  interim: { icon: "📆", gradient: "from-blue-500 to-indigo-500", bgLight: "from-blue-50 to-indigo-50" },
  advisory: { icon: "💼", gradient: "from-purple-500 to-violet-500", bgLight: "from-purple-50 to-violet-50" },
  "part-time": { icon: "🕐", gradient: "from-amber-500 to-orange-500", bgLight: "from-amber-50 to-orange-50" },
  contract: { icon: "📝", gradient: "from-cyan-500 to-blue-500", bgLight: "from-cyan-50 to-blue-50" },
  strategic: { icon: "🎯", gradient: "from-rose-500 to-pink-500", bgLight: "from-rose-50 to-pink-50" },
  default: { icon: "👔", gradient: "from-gray-500 to-slate-500", bgLight: "from-gray-50 to-slate-50" }
};

function getRoleTypeStyle(title: string) {
  const lower = title.toLowerCase();
  for (const [keyword, style] of Object.entries(ROLE_TYPE_STYLES)) {
    if (keyword !== "default" && lower.includes(keyword)) return style;
  }
  return ROLE_TYPE_STYLES.default;
}

// Role Types Section - visual cards with icons and gradients
function RoleTypesSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const items = (section.items as Array<{ title: string; rate: string; description: string }>) || [];

  return (
    <div className="my-10">
      {heading && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">💼</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((item, i) => {
          const style = getRoleTypeStyle(item.title);
          return (
            <div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${style.bgLight} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-md`}>
                      <span className="text-2xl">{style.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>

                {/* Rate badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${style.gradient} text-white font-semibold text-sm shadow-md`}>
                  <span className="text-xs opacity-80">From</span>
                  <span>{item.rate}</span>
                </div>
              </div>

              {/* Corner decoration */}
              <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${style.gradient} opacity-10`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Responsibilities icons based on common keywords
const RESPONSIBILITY_ICONS: Record<string, string> = {
  strategy: "🎯",
  data: "📊",
  analytics: "📈",
  governance: "🛡️",
  team: "👥",
  leadership: "👔",
  budget: "💰",
  finance: "💵",
  technology: "💻",
  innovation: "💡",
  compliance: "✅",
  risk: "⚠️",
  growth: "📈",
  marketing: "📣",
  sales: "🤝",
  operations: "⚙️",
  security: "🔒",
  default: "→"
};

function getResponsibilityIcon(text: string): string {
  const lower = text.toLowerCase();
  for (const [keyword, icon] of Object.entries(RESPONSIBILITY_ICONS)) {
    if (lower.includes(keyword)) return icon;
  }
  return RESPONSIBILITY_ICONS.default;
}

// Responsibilities Section - visual cards with icons
function ResponsibilitiesSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const items = (section.items as unknown as string[]) || [];

  return (
    <div className="my-10">
      {heading && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">📋</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                <span className="text-lg">{getResponsibilityIcon(item)}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed pt-1">{item}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}

// When to Hire icons based on signal keywords
const SIGNAL_ICONS: Record<string, { icon: string; gradient: string }> = {
  growth: { icon: "📈", gradient: "from-emerald-500 to-teal-500" },
  scale: { icon: "🚀", gradient: "from-blue-500 to-indigo-500" },
  transition: { icon: "🔄", gradient: "from-purple-500 to-pink-500" },
  leadership: { icon: "👔", gradient: "from-amber-500 to-orange-500" },
  crisis: { icon: "⚡", gradient: "from-red-500 to-rose-500" },
  transformation: { icon: "✨", gradient: "from-indigo-500 to-purple-500" },
  strategy: { icon: "🎯", gradient: "from-cyan-500 to-blue-500" },
  interim: { icon: "⏱️", gradient: "from-gray-500 to-slate-600" },
  ipo: { icon: "🏦", gradient: "from-emerald-600 to-green-500" },
  funding: { icon: "💰", gradient: "from-yellow-500 to-amber-500" },
  data: { icon: "📊", gradient: "from-blue-600 to-cyan-500" },
  technology: { icon: "💻", gradient: "from-violet-500 to-purple-500" },
  default: { icon: "💡", gradient: "from-emerald-500 to-teal-500" }
};

function getSignalStyle(text: string): { icon: string; gradient: string } {
  const lower = text.toLowerCase();
  for (const [keyword, style] of Object.entries(SIGNAL_ICONS)) {
    if (keyword !== "default" && lower.includes(keyword)) return style;
  }
  return SIGNAL_ICONS.default;
}

// When to Hire Section - visual signal cards with icons
function WhenToHireSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const signals = (section.signals as Array<{ signal: string; detail: string }>) || [];

  return (
    <div className="my-10">
      {heading && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🎯</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {signals.map((item, i) => {
          const style = getSignalStyle(item.signal);
          return (
            <div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Gradient top bar */}
              <div className={`h-2 bg-gradient-to-r ${style.gradient}`} />

              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon circle */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{style.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                      {item.signal}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>

                {/* Number indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                  {i + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Benefits icons based on common keywords
const BENEFIT_ICONS: Record<string, { icon: string; gradient: string }> = {
  cost: { icon: "💰", gradient: "from-emerald-500 to-teal-500" },
  save: { icon: "💵", gradient: "from-green-500 to-emerald-500" },
  flexible: { icon: "🔄", gradient: "from-blue-500 to-indigo-500" },
  expertise: { icon: "🎓", gradient: "from-purple-500 to-violet-500" },
  experience: { icon: "⭐", gradient: "from-amber-500 to-orange-500" },
  strategic: { icon: "🎯", gradient: "from-red-500 to-rose-500" },
  scale: { icon: "📈", gradient: "from-cyan-500 to-blue-500" },
  risk: { icon: "🛡️", gradient: "from-slate-500 to-gray-600" },
  speed: { icon: "⚡", gradient: "from-yellow-500 to-amber-500" },
  access: { icon: "🔑", gradient: "from-indigo-500 to-purple-500" },
  network: { icon: "🌐", gradient: "from-teal-500 to-cyan-500" },
  focus: { icon: "🔍", gradient: "from-pink-500 to-rose-500" },
  default: { icon: "✨", gradient: "from-emerald-500 to-teal-500" }
};

function getBenefitStyle(text: string) {
  const lower = text.toLowerCase();
  for (const [keyword, style] of Object.entries(BENEFIT_ICONS)) {
    if (keyword !== "default" && lower.includes(keyword)) return style;
  }
  return BENEFIT_ICONS.default;
}

// Benefits Section - premium visual grid with icons
function BenefitsSection({ section }: { section: Section }) {
  const heading = (section.heading as string) || (section.title as string);
  const items = (section.items as Array<{ title: string; description: string }>) || [];

  return (
    <div className="my-10">
      {heading && (
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => {
          const style = getBenefitStyle(item.title);
          return (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />

              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{style.icon}</span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>

              {/* Number badge */}
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                {i + 1}
              </div>
            </div>
          );
        })}
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
    case "benefits":
      return <BenefitsSection section={section} />;
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
// FAQ Section - Premium visual design
// ===========================================

function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-12 my-10 -mx-4 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-2xl">
      {/* Background gradient with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-200 rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <span className="text-3xl">❓</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-emerald-700 text-sm mt-1">Everything you need to know</p>
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl shadow-sm transition-all duration-300 ${
                openIndex === i ? "shadow-lg ring-2 ring-emerald-200" : "hover:shadow-md"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === i
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                      : "bg-emerald-100 text-emerald-600"
                  }`}>
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <span className={`font-semibold transition-colors ${
                    openIndex === i ? "text-emerald-700" : "text-gray-900"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  openIndex === i
                    ? "bg-emerald-500 text-white rotate-180"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <div className="pl-14">
                    <div className="h-px bg-gradient-to-r from-emerald-200 via-teal-200 to-transparent mb-4" />
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-emerald-600 text-sm">
            <span className="text-lg">💬</span>
            <span>Have more questions? Contact us</span>
          </div>
        </div>
      </div>
    </section>
  );
}


// ===========================================
// Key Takeaways Box - Featured Snippet Potential
// ===========================================

function KeyTakeawaysBox({ role, dayRateMin, dayRateMax }: { role: string; dayRateMin: number; dayRateMax: number }) {
  const roleUpper = role.toUpperCase();
  const takeaways = [
    `Fractional ${roleUpper}s work 1-3 days per week, providing senior expertise without full-time costs`,
    `UK day rates range from £${dayRateMin} to £${dayRateMax}, depending on experience and sector`,
    `Typical engagements save 50-70% compared to full-time executive hires`,
    `Ideal for startups, scale-ups, and SMEs needing strategic leadership`,
    `No employment overhead: no pension, NI, benefits, or notice periods`,
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-200 my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-xl">💡</span>
        </div>
        <h2 className="text-xl font-bold text-amber-900">Key Takeaways</h2>
      </div>
      <ul className="space-y-3">
        {takeaways.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-amber-900">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===========================================
// Reading Time & Freshness Indicator
// ===========================================

function ReadingTimeBar({ content, updatedAt }: { content: string; updatedAt?: string }) {
  // Calculate reading time (average 200 words per minute)
  const wordCount = content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Format date
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <span>📖</span>
        <span>{readingTime} min read</span>
      </div>
      <div className="flex items-center gap-2">
        <span>📅</span>
        <span>Updated {formattedDate}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>📝</span>
        <span>{wordCount.toLocaleString()} words</span>
      </div>
    </div>
  );
}

// ===========================================
// BreadcrumbList Schema
// ===========================================

function BreadcrumbSchema({ page }: { page: PageData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fractional.quest"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Fractional Jobs UK",
        "item": "https://fractional.quest/fractional-jobs-uk"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.hero_title || page.title,
        "item": `https://fractional.quest/${page.slug}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ===========================================
// Quick Stats Callout
// ===========================================

function QuickStatsCallout({ role }: { role: string }) {
  const data = ROLE_SALARY_DATA[role.toLowerCase()] || ROLE_SALARY_DATA.cfo;

  const stats = [
    { value: `£${data.min}-${data.max}`, label: "Day Rate", icon: "💷" },
    { value: "1-3", label: "Days/Week", icon: "📅" },
    { value: "50-70%", label: "Cost Savings", icon: "💰" },
    { value: "500+", label: "UK Placements", icon: "🎯" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 text-center hover:shadow-md transition-shadow">
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// ===========================================
// Mini Jump Links for Mobile
// ===========================================

function JumpLinksBar() {
  const links = [
    { label: "Jobs", anchor: "#jobs" },
    { label: "Rates", anchor: "#rates" },
    { label: "FAQs", anchor: "#faqs" },
    { label: "Compare", anchor: "#compare" },
  ];

  return (
    <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 -mx-4 px-4 py-2 mb-6 lg:hidden">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-xs text-gray-400 flex-shrink-0">Jump to:</span>
        <div className="flex gap-2">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.anchor}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-full transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===========================================
// FAQPage Schema for SEO
// ===========================================

function FAQSchema({ faqs, pageUrl }: { faqs: FAQ[]; pageUrl: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ===========================================
// Related Roles Section - Auto-generated
// ===========================================

const RELATED_ROLES: Record<string, Array<{ role: string; url: string; description: string }>> = {
  cdo: [
    { role: "Fractional CTO", url: "/fractional-cto-jobs-uk", description: "Technology leadership for data infrastructure" },
    { role: "Fractional CISO", url: "/fractional-ciso-jobs-uk", description: "Data security and compliance expertise" },
    { role: "Fractional CFO", url: "/fractional-cfo-jobs-uk", description: "Financial data and reporting insights" },
    { role: "Chief AI Officer", url: "/fractional-chief-ai-officer-jobs-uk", description: "AI/ML strategy and implementation" },
  ],
  cfo: [
    { role: "Fractional COO", url: "/fractional-coo-jobs-uk", description: "Operations aligned with financial goals" },
    { role: "Finance Director", url: "/fractional-finance-director-jobs-uk", description: "Day-to-day financial management" },
    { role: "Fractional CEO", url: "/fractional-ceo-jobs-uk", description: "Strategic leadership and governance" },
    { role: "Fractional CDO", url: "/fractional-cdo-jobs-uk", description: "Data-driven financial insights" },
  ],
  cto: [
    { role: "Fractional CISO", url: "/fractional-ciso-jobs-uk", description: "Security alongside technology" },
    { role: "Fractional CPO", url: "/fractional-cpo-jobs-uk", description: "Product and technology alignment" },
    { role: "Fractional CDO", url: "/fractional-cdo-jobs-uk", description: "Data architecture and strategy" },
    { role: "Chief AI Officer", url: "/fractional-chief-ai-officer-jobs-uk", description: "AI/ML technology implementation" },
  ],
  cmo: [
    { role: "Fractional CRO", url: "/fractional-cro-jobs-uk", description: "Revenue growth strategies" },
    { role: "Fractional CDO", url: "/fractional-cdo-jobs-uk", description: "Marketing data and analytics" },
    { role: "Fractional CPO", url: "/fractional-cpo-jobs-uk", description: "Product-market fit alignment" },
    { role: "Fractional CEO", url: "/fractional-ceo-jobs-uk", description: "Strategic brand leadership" },
  ],
  coo: [
    { role: "Fractional CFO", url: "/fractional-cfo-jobs-uk", description: "Financial operations alignment" },
    { role: "Fractional CHRO", url: "/fractional-chro-jobs-uk", description: "People operations and HR" },
    { role: "Fractional CTO", url: "/fractional-cto-jobs-uk", description: "Technology operations" },
    { role: "Fractional CEO", url: "/fractional-ceo-jobs-uk", description: "Executive operations leadership" },
  ],
  default: [
    { role: "Fractional CFO", url: "/fractional-cfo-jobs-uk", description: "Financial strategy and oversight" },
    { role: "Fractional CTO", url: "/fractional-cto-jobs-uk", description: "Technology leadership" },
    { role: "Fractional CMO", url: "/fractional-cmo-jobs-uk", description: "Marketing and growth" },
    { role: "Fractional COO", url: "/fractional-coo-jobs-uk", description: "Operations excellence" },
  ],
};

function RelatedRolesSection({ currentRole }: { currentRole: string }) {
  const roles = RELATED_ROLES[currentRole.toLowerCase()] || RELATED_ROLES.default;

  return (
    <div className="my-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl">🔗</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Related Executive Roles</h2>
          <p className="text-gray-600 text-sm">Complementary leadership for your organisation</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <a
            key={i}
            href={role.url}
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
              <span className="text-xl">👔</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{role.role}</h3>
              <p className="text-gray-600 text-sm">{role.description}</p>
            </div>
            <span className="text-indigo-400 group-hover:text-indigo-600 transition-colors">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ===========================================
// Engagement Type Comparison Table
// ===========================================

function EngagementComparisonTable() {
  return (
    <div className="my-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl">⚖️</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fractional vs Interim vs Full-Time</h2>
          <p className="text-gray-600 text-sm">Choose the right engagement model</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 px-4 text-left font-bold text-gray-900">Aspect</th>
              <th className="py-3 px-4 text-center font-bold text-emerald-700 bg-emerald-50 rounded-t-lg">Fractional</th>
              <th className="py-3 px-4 text-center font-bold text-blue-700">Interim</th>
              <th className="py-3 px-4 text-center font-bold text-gray-700">Full-Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Time Commitment</td>
              <td className="py-3 px-4 text-center bg-emerald-50/50">1-3 days/week</td>
              <td className="py-3 px-4 text-center">4-5 days/week</td>
              <td className="py-3 px-4 text-center">5 days/week</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Duration</td>
              <td className="py-3 px-4 text-center bg-emerald-50/50">Ongoing/flexible</td>
              <td className="py-3 px-4 text-center">3-12 months</td>
              <td className="py-3 px-4 text-center">Permanent</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Annual Cost</td>
              <td className="py-3 px-4 text-center bg-emerald-50/50 font-semibold text-emerald-700">£50-150k</td>
              <td className="py-3 px-4 text-center">£150-300k</td>
              <td className="py-3 px-4 text-center">£200-400k+</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Best For</td>
              <td className="py-3 px-4 text-center bg-emerald-50/50">SMEs, startups, scale-ups</td>
              <td className="py-3 px-4 text-center">Crisis, transitions</td>
              <td className="py-3 px-4 text-center">Large enterprises</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-gray-700">Flexibility</td>
              <td className="py-3 px-4 text-center bg-emerald-50/50">
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <span>★★★</span> High
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="inline-flex items-center gap-1 text-blue-600">
                  <span>★★☆</span> Medium
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="inline-flex items-center gap-1 text-gray-600">
                  <span>★☆☆</span> Low
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Costs are indicative UK market rates. Actual costs vary by role, experience, and sector.
      </p>
    </div>
  );
}

// ===========================================
// Social Proof / Testimonials Section
// ===========================================

// Industry stats about fractional work - with real sources
const INDUSTRY_INSIGHTS = [
  {
    stat: "78%",
    insight: "of executives who moved to fractional work report higher job satisfaction",
    source: "Harvard Business Review",
    sourceUrl: "https://hbr.org/2023/02/the-rise-of-the-fractional-executive",
    icon: "😊",
  },
  {
    stat: "50-70%",
    insight: "cost savings compared to full-time executive hires for SMEs",
    source: "Forbes",
    sourceUrl: "https://www.forbes.com/sites/forbesbusinesscouncil/2023/01/fractional-executives/",
    icon: "💰",
  },
  {
    stat: "3x",
    insight: "growth in fractional executive demand since 2020",
    source: "LinkedIn Economic Graph",
    sourceUrl: "https://economicgraph.linkedin.com/",
    icon: "📈",
  },
];

function IndustryInsightsSection() {
  return (
    <div className="my-12">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl">📊</span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">The Fractional Executive Trend</h2>
          <p className="text-gray-600 text-sm">Industry data on the rise of fractional leadership</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {INDUSTRY_INSIGHTS.map((item, i) => (
          <div key={i} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">{item.stat}</div>
            <p className="text-gray-700 text-sm mb-4">{item.insight}</p>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              Source: {item.source} ↗
            </a>
          </div>
        ))}
      </div>

      {/* Platform stats - honest */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span>🇬🇧</span>
          <span>UK-focused platform</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🔄</span>
          <span>Jobs updated daily</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🆓</span>
          <span>Free for job seekers</span>
        </div>
      </div>
    </div>
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

  // Build CopilotKit instructions from page content
  const copilotInstructions = `You are helping users explore ${page.hero_title || page.title}.
${page.meta_description || ""}
Help users find relevant jobs, understand day rates, and learn about fractional executive careers.`;

  return (
    <CopilotKitWrapper
      title={`${page.hero_title?.split(" ")[0] || "Fractional"} AI`}
      instructions={copilotInstructions}
      initialMessage={`Hi! I can help you explore ${page.hero_title?.split(" ")[0] || "fractional"} opportunities. Ask me about jobs, day rates, or career advice!`}
      accentColor={accentColorValue}
    >
      <main
        className="min-h-screen bg-white overflow-x-hidden"
        style={{ "--copilot-kit-primary-color": accentColorValue } as React.CSSProperties}
      >
        {/* Schema Markup */}
        <BreadcrumbSchema page={page} />

        {/* Hero Section */}
        <IntelligentHero page={page} />

      {/* Main Content - Two Column Layout */}
      <section className="py-8 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8 overflow-x-hidden">
              {/* Mobile Jump Links */}
              <JumpLinksBar />

              {/* Reading Time & Freshness */}
              <ReadingTimeBar
                content={page.mdx_content || ''}
                updatedAt={page.updated_at || undefined}
              />

              {/* Quick Stats at a Glance */}
              <QuickStatsCallout role={extractRoleFromSlug(page.slug)} />

              {/* Key Takeaways - Featured Snippet Target */}
              <KeyTakeawaysBox
                role={extractRoleFromSlug(page.slug)}
                dayRateMin={ROLE_SALARY_DATA[extractRoleFromSlug(page.slug)]?.min || 800}
                dayRateMax={ROLE_SALARY_DATA[extractRoleFromSlug(page.slug)]?.max || 1500}
              />

              {/* Hot Jobs - Featured jobs at top, filtered by department if available */}
              <div id="jobs">
                <HotJobs
                  location={location}
                  department={page.job_board_department || undefined}
                  title={`Hot ${page.hero_title?.split(" ")[0] || ""} Jobs`}
                  maxJobs={6}
                />
              </div>

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

              {/* Cost Savings Visualization - between sections and MDX */}
              <div id="rates">
                <CostSavingsChart role={extractRoleFromSlug(page.slug)} />
              </div>

              {/* Skills Breakdown Chart */}
              <SkillsBreakdownChart />

              {/* MDX Long-form Content - Enhanced Visual Styling with Auto-Linking */}
              {page.mdx_content && (() => {
                // Process content: strip MDX components, add auto-links and improve text flow
                const processedContent = addTextBreathing(
                  addAutoLinks(
                    stripMdxComponents(page.mdx_content || ''),
                    page.slug || ''
                  )
                );
                return (
                <article className="max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-8">
                          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">{children}</thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-emerald-200">{children}</th>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">{children}</td>
                      ),
                      tr: ({ children }) => (
                        <tr className="even:bg-gray-50 hover:bg-emerald-50/50 transition-colors">{children}</tr>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="relative border-l-4 border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 py-4 px-6 my-8 not-italic text-emerald-800 rounded-r-xl shadow-sm">
                          <div className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-sm">💬</span>
                          </div>
                          {children}
                        </blockquote>
                      ),
                      h2: ({ children }) => {
                        const text = String(children);
                        // Choose icon based on heading content
                        let icon = "📌";
                        const lower = text.toLowerCase();
                        if (lower.includes("responsibilit")) icon = "📋";
                        else if (lower.includes("skill")) icon = "🎯";
                        else if (lower.includes("when") || lower.includes("hire")) icon = "⏰";
                        else if (lower.includes("cost") || lower.includes("rate")) icon = "💰";
                        else if (lower.includes("benefit")) icon = "✨";
                        else if (lower.includes("vs") || lower.includes("comparison")) icon = "⚖️";
                        else if (lower.includes("source") || lower.includes("authority")) icon = "📚";

                        return (
                          <div className="flex items-center gap-3 mt-12 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                              <span className="text-lg">{icon}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{children}</h2>
                          </div>
                        );
                      },
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 pl-2 border-l-3 border-emerald-400">{children}</h3>
                      ),
                      ul: ({ children }) => (
                        <div className="grid gap-3 my-6">{children}</div>
                      ),
                      ol: ({ children }) => (
                        <div className="space-y-3 my-6">{children}</div>
                      ),
                      li: ({ children }) => {
                        const text = String(children);
                        // Auto-detect icon based on content keywords
                        let icon = "→";
                        const lower = text.toLowerCase();
                        if (lower.includes("data") || lower.includes("analytics")) icon = "📊";
                        else if (lower.includes("strateg")) icon = "🎯";
                        else if (lower.includes("govern") || lower.includes("compliance")) icon = "🛡️";
                        else if (lower.includes("regulat") || lower.includes("gdpr")) icon = "⚖️";
                        else if (lower.includes("architec") || lower.includes("platform")) icon = "🏗️";
                        else if (lower.includes("ai") || lower.includes("ml") || lower.includes("machine")) icon = "🤖";
                        else if (lower.includes("leader") || lower.includes("team")) icon = "👥";
                        else if (lower.includes("vision") || lower.includes("align")) icon = "🔭";
                        else if (lower.includes("technic") || lower.includes("tool")) icon = "💻";
                        else if (lower.includes("business") || lower.includes("revenue")) icon = "💼";
                        else if (lower.includes("communi") || lower.includes("stakeholder")) icon = "🗣️";
                        else if (lower.includes("quality") || lower.includes("trust")) icon = "✅";
                        else if (lower.includes("scale") || lower.includes("grow")) icon = "📈";
                        else if (lower.includes("monetis") || lower.includes("value")) icon = "💰";

                        return (
                          <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group">
                            <div className="w-9 h-9 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-emerald-100 group-hover:to-teal-50 transition-colors">
                              <span className="text-base">{icon}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed pt-1 text-sm">{children}</p>
                          </div>
                        );
                      },
                      p: ({ children }) => (
                        <p className="text-gray-700 leading-relaxed my-5 text-base sm:text-lg">{children}</p>
                      ),
                      hr: () => (
                        <div className="my-10 flex items-center justify-center gap-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                          <span className="text-gray-300">✦</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        </div>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-emerald-800 bg-emerald-50 px-1 rounded">{children}</strong>
                      ),
                      a: ({ href, children }) => {
                        const isExternal = href?.startsWith('http');
                        return (
                          <a
                            href={href}
                            className={`${isExternal ? 'text-blue-700 hover:text-blue-900' : 'text-emerald-700 hover:text-emerald-900'} underline decoration-2 decoration-dotted hover:decoration-solid transition-all`}
                            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {children}
                            {isExternal && <span className="text-xs ml-0.5 opacity-60">↗</span>}
                          </a>
                        );
                      },
                      em: ({ children }) => (
                        <em className="text-gray-600 italic">{children}</em>
                      ),
                    }}
                  >
                    {processedContent}
                  </ReactMarkdown>
                </article>
                );
              })()}

              {/* Market Comparison Chart */}
              <MarketComparisonChart currentRole={extractRoleFromSlug(page.slug)} />

              {/* Engagement Comparison Table - Fractional vs Interim vs Full-Time */}
              <div id="compare">
                <EngagementComparisonTable />
              </div>

              {/* Role Calculator */}
              <div className="my-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculate Your Day Rate</h2>
                <RoleCalculator role={extractRoleFromSlug(page.slug)} />
              </div>

              {/* Related Executive Roles */}
              <RelatedRolesSection currentRole={extractRoleFromSlug(page.slug)} />

              {/* FAQs with Schema */}
              {page.faqs && page.faqs.length > 0 && (
                <div id="faqs">
                  <FAQSchema faqs={page.faqs} pageUrl={`https://fractional.quest/${page.slug}`} />
                  <FAQSection faqs={page.faqs} />
                </div>
              )}

              {/* Authority Links Panel */}
              {page.external_links && page.external_links.length > 0 && (
                <AuthorityLinksPanel
                  links={page.external_links.map(link => ({
                    name: link.title || link.label || link.domain || "Resource",
                    url: link.url,
                    context: link.description || link.domain || "Industry resource"
                  }))}
                />
              )}

              {/* Internal Links Grid - Related Pages */}
              {page.internal_links && page.internal_links.length > 0 ? (
                <InternalLinksGrid
                  title="Related Pages"
                  links={page.internal_links.map(link => ({
                    name: link.title || link.label || "Related Page",
                    url: link.href || link.url || "/",
                    description: link.description,
                    category: "jobs" as const
                  }))}
                />
              ) : (
                <InternalLinksGrid
                  title="Related Pages"
                  links={[
                    { name: "CFO Jobs UK", url: "/fractional-cfo-jobs-uk", description: "Find fractional CFO roles", category: "jobs" as const },
                    { name: "CTO Jobs UK", url: "/fractional-cto-jobs-uk", description: "Find fractional CTO roles", category: "jobs" as const },
                    { name: "CMO Jobs UK", url: "/fractional-cmo-jobs-uk", description: "Find fractional CMO roles", category: "jobs" as const },
                    { name: "All UK Jobs", url: "/fractional-jobs-uk", description: "Browse all fractional jobs", category: "jobs" as const },
                  ]}
                />
              )}

              {/* Industry Insights - Authentic with sources */}
              <IndustryInsightsSection />
            </div>

            {/* Sidebar - Full height with sticky content */}
            <div className="lg:col-span-1 relative">
              <div className="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
                {/* Jobs Sidebar */}
                <JobsSidebar
                  location={location}
                />

                {/* Trust Signals */}
                <TrustSignals variant="sidebar" />

                {/* Salary Range Chart */}
                <SalaryRangeChart role={extractRoleFromSlug(page.slug)} />

                {/* Quick Navigation */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                    <span>📍</span> On This Page
                  </h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#jobs" className="block text-gray-600 hover:text-emerald-700 transition-colors">→ Latest Jobs</a>
                    <a href="#rates" className="block text-gray-600 hover:text-emerald-700 transition-colors">→ Day Rates</a>
                    <a href="#compare" className="block text-gray-600 hover:text-emerald-700 transition-colors">→ Compare Options</a>
                    <a href="#faqs" className="block text-gray-600 hover:text-emerald-700 transition-colors">→ FAQs</a>
                  </nav>
                </div>

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

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5">
                  <h3 className="font-bold text-indigo-900 text-sm mb-2 flex items-center gap-2">
                    <span>📧</span> Stay Updated
                  </h3>
                  <p className="text-indigo-700 text-xs mb-3">
                    Get the latest fractional exec opportunities and insights.
                  </p>
                  <a
                    href="/newsletter"
                    className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                  >
                    Subscribe Free
                  </a>
                </div>

                {/* Quick Stats Reminder */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Why Fractional?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-gray-700">50-70% cost savings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-gray-700">No long-term commitment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-gray-700">Senior expertise on demand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-gray-700">Flexible 1-3 days/week</span>
                    </div>
                  </div>
                </div>

                {/* Related Pages Links */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                    <span>🔗</span> Explore More
                  </h3>
                  <nav className="space-y-2 text-sm">
                    <a href="/fractional-cfo-jobs-uk" className="block text-gray-600 hover:text-emerald-700 transition-colors">Fractional CFO Jobs →</a>
                    <a href="/fractional-cto-jobs-uk" className="block text-gray-600 hover:text-emerald-700 transition-colors">Fractional CTO Jobs →</a>
                    <a href="/fractional-cmo-jobs-uk" className="block text-gray-600 hover:text-emerald-700 transition-colors">Fractional CMO Jobs →</a>
                    <a href="/fractional-jobs-uk" className="block text-gray-600 hover:text-emerald-700 transition-colors">All Fractional Jobs →</a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
    </CopilotKitWrapper>
  );
}
