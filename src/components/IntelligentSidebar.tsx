"use client";

import { useMemo } from "react";
import { JobsSidebar } from "@/components/JobsSidebar";
import { TrustSignals } from "@/components/TrustSignals";

// ===========================================
// Types
// ===========================================

type Locale = "uk" | "us" | "au" | "nz";
type EngagementType = "fractional" | "interim" | "part-time" | "advisory" | "contract" | "permanent";
type PageType = "jobs" | "role_definition" | "salary" | "hire_guide" | "career_guide" | "recruitment" | "location" | "industry" | "comparison" | "listicle" | "other";

export interface SidebarContext {
  slug: string;
  role?: string; // CFO, CTO, CMO, etc.
  engagementType?: EngagementType;
  locale?: Locale;
  pageType?: PageType;
  accentColor?: string;
  // Custom overrides
  hideJobs?: boolean;
  hideTrust?: boolean;
  hideCalculator?: boolean;
  customCTA?: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

// ===========================================
// Role-Specific Data
// ===========================================

interface RoleData {
  title: string;
  shortTitle: string;
  dayRates: { uk: string; us: string; au: string; nz: string };
  demand: { percentage: number; trend: string };
  placementWeeks: string;
  savingsPercent: string;
  relatedRoles: string[];
  industries: string[];
  skills: string[];
  color: string;
}

const ROLE_DATA: Record<string, RoleData> = {
  CFO: {
    title: "Chief Financial Officer",
    shortTitle: "CFO",
    dayRates: { uk: "£1,000-1,500", us: "$1,200-2,000", au: "A$1,400-2,200", nz: "NZ$1,200-1,800" },
    demand: { percentage: 82, trend: "+23% YoY" },
    placementWeeks: "4-6",
    savingsPercent: "50-70%",
    relatedRoles: ["FD", "COO", "CEO"],
    industries: ["Tech", "SaaS", "PE-backed", "Manufacturing"],
    skills: ["Financial Strategy", "M&A", "Fundraising", "Cash Flow"],
    color: "emerald",
  },
  CTO: {
    title: "Chief Technology Officer",
    shortTitle: "CTO",
    dayRates: { uk: "£1,200-1,800", us: "$1,500-2,500", au: "A$1,600-2,400", nz: "NZ$1,400-2,000" },
    demand: { percentage: 88, trend: "+31% YoY" },
    placementWeeks: "6-8",
    savingsPercent: "40-60%",
    relatedRoles: ["CIO", "CISO", "VP Engineering"],
    industries: ["SaaS", "FinTech", "HealthTech", "AI/ML"],
    skills: ["Architecture", "Team Building", "Tech Strategy", "DevOps"],
    color: "blue",
  },
  CMO: {
    title: "Chief Marketing Officer",
    shortTitle: "CMO",
    dayRates: { uk: "£900-1,400", us: "$1,100-1,800", au: "A$1,200-1,900", nz: "NZ$1,000-1,600" },
    demand: { percentage: 75, trend: "+18% YoY" },
    placementWeeks: "4-6",
    savingsPercent: "50-65%",
    relatedRoles: ["CDO", "CRO", "VP Marketing"],
    industries: ["B2B SaaS", "eCommerce", "Consumer", "FinTech"],
    skills: ["Brand Strategy", "Growth", "Digital Marketing", "Analytics"],
    color: "purple",
  },
  COO: {
    title: "Chief Operating Officer",
    shortTitle: "COO",
    dayRates: { uk: "£1,100-1,600", us: "$1,300-2,200", au: "A$1,500-2,200", nz: "NZ$1,200-1,800" },
    demand: { percentage: 70, trend: "+15% YoY" },
    placementWeeks: "6-8",
    savingsPercent: "45-60%",
    relatedRoles: ["CFO", "CEO", "VP Operations"],
    industries: ["Manufacturing", "Logistics", "Scale-ups", "Services"],
    skills: ["Process Optimization", "Scaling", "Team Leadership", "Strategy"],
    color: "amber",
  },
  CEO: {
    title: "Chief Executive Officer",
    shortTitle: "CEO",
    dayRates: { uk: "£1,500-2,500", us: "$2,000-3,500", au: "A$2,000-3,000", nz: "NZ$1,800-2,500" },
    demand: { percentage: 45, trend: "+8% YoY" },
    placementWeeks: "8-12",
    savingsPercent: "40-55%",
    relatedRoles: ["COO", "Chairman", "MD"],
    industries: ["Turnaround", "PE Portfolio", "Scale-ups", "Transition"],
    skills: ["Strategy", "Board Relations", "Fundraising", "Leadership"],
    color: "slate",
  },
  CHRO: {
    title: "Chief Human Resources Officer",
    shortTitle: "CHRO",
    dayRates: { uk: "£800-1,200", us: "$1,000-1,600", au: "A$1,100-1,700", nz: "NZ$900-1,400" },
    demand: { percentage: 72, trend: "+20% YoY" },
    placementWeeks: "4-6",
    savingsPercent: "55-70%",
    relatedRoles: ["HR Director", "CPO", "VP People"],
    industries: ["Tech", "Scale-ups", "Manufacturing", "Services"],
    skills: ["Talent Strategy", "Culture", "Employment Law", "M&A HR"],
    color: "rose",
  },
  CISO: {
    title: "Chief Information Security Officer",
    shortTitle: "CISO",
    dayRates: { uk: "£1,200-1,800", us: "$1,500-2,500", au: "A$1,600-2,400", nz: "NZ$1,400-2,000" },
    demand: { percentage: 90, trend: "+42% YoY" },
    placementWeeks: "4-8",
    savingsPercent: "50-65%",
    relatedRoles: ["CTO", "CIO", "VP Security"],
    industries: ["FinTech", "HealthTech", "Banking", "Enterprise"],
    skills: ["Risk Management", "Compliance", "Incident Response", "Architecture"],
    color: "red",
  },
  CIO: {
    title: "Chief Information Officer",
    shortTitle: "CIO",
    dayRates: { uk: "£1,000-1,500", us: "$1,300-2,000", au: "A$1,400-2,100", nz: "NZ$1,200-1,700" },
    demand: { percentage: 68, trend: "+12% YoY" },
    placementWeeks: "6-10",
    savingsPercent: "45-60%",
    relatedRoles: ["CTO", "CISO", "IT Director"],
    industries: ["Enterprise", "Healthcare", "Financial Services", "Retail"],
    skills: ["IT Strategy", "Vendor Management", "Digital Transformation", "Infrastructure"],
    color: "cyan",
  },
  CPO: {
    title: "Chief Product Officer",
    shortTitle: "CPO",
    dayRates: { uk: "£1,000-1,500", us: "$1,200-2,000", au: "A$1,300-2,000", nz: "NZ$1,100-1,700" },
    demand: { percentage: 78, trend: "+25% YoY" },
    placementWeeks: "4-6",
    savingsPercent: "50-65%",
    relatedRoles: ["CTO", "CMO", "VP Product"],
    industries: ["SaaS", "Consumer Tech", "FinTech", "Marketplace"],
    skills: ["Product Strategy", "User Research", "Roadmap", "Analytics"],
    color: "violet",
  },
  CRO: {
    title: "Chief Revenue Officer",
    shortTitle: "CRO",
    dayRates: { uk: "£1,100-1,600", us: "$1,400-2,200", au: "A$1,500-2,200", nz: "NZ$1,200-1,800" },
    demand: { percentage: 80, trend: "+28% YoY" },
    placementWeeks: "4-6",
    savingsPercent: "45-60%",
    relatedRoles: ["CMO", "VP Sales", "CSO"],
    industries: ["B2B SaaS", "Tech", "Professional Services", "FinTech"],
    skills: ["Sales Strategy", "Pipeline", "GTM", "Revenue Operations"],
    color: "orange",
  },
  FD: {
    title: "Finance Director",
    shortTitle: "FD",
    dayRates: { uk: "£700-1,100", us: "$900-1,400", au: "A$1,000-1,500", nz: "NZ$800-1,300" },
    demand: { percentage: 85, trend: "+19% YoY" },
    placementWeeks: "3-5",
    savingsPercent: "55-70%",
    relatedRoles: ["CFO", "FC", "Controller"],
    industries: ["SME", "Manufacturing", "Services", "Retail"],
    skills: ["Financial Control", "Budgeting", "Reporting", "Cash Management"],
    color: "teal",
  },
  CDO: {
    title: "Chief Data Officer",
    shortTitle: "CDO",
    dayRates: { uk: "£1,100-1,600", us: "$1,400-2,200", au: "A$1,400-2,100", nz: "NZ$1,200-1,800" },
    demand: { percentage: 85, trend: "+35% YoY" },
    placementWeeks: "4-6",
    savingsPercent: "50-65%",
    relatedRoles: ["CTO", "CIO", "VP Data"],
    industries: ["FinTech", "Retail", "Healthcare", "Tech"],
    skills: ["Data Strategy", "Analytics", "AI/ML", "Governance"],
    color: "indigo",
  },
};

// Default data for unknown roles
const DEFAULT_ROLE_DATA: RoleData = {
  title: "Executive",
  shortTitle: "Exec",
  dayRates: { uk: "£800-1,400", us: "$1,000-1,800", au: "A$1,100-1,900", nz: "NZ$900-1,500" },
  demand: { percentage: 70, trend: "+15% YoY" },
  placementWeeks: "4-8",
  savingsPercent: "50-65%",
  relatedRoles: ["CFO", "COO", "CTO"],
  industries: ["Tech", "Scale-ups", "Services"],
  skills: ["Strategy", "Leadership", "Operations"],
  color: "slate",
};

// ===========================================
// URL Helpers
// ===========================================

function localizeUrl(ukUrl: string, locale: Locale): string {
  if (locale === "uk") return ukUrl;
  let path = ukUrl.startsWith("/") ? ukUrl.slice(1) : ukUrl;
  if (path.endsWith("-uk")) {
    path = path.slice(0, -3);
  }
  return `/${locale}/${path}`;
}

function getRoleJobsUrl(role: string, engagementType: EngagementType, locale: Locale): string {
  const engagementPrefix = engagementType === "fractional" ? "fractional" : engagementType;
  const roleLower = role.toLowerCase();
  const ukUrl = `/${engagementPrefix}-${roleLower}-jobs-uk`;
  return localizeUrl(ukUrl, locale);
}

function extractRoleFromSlug(slug: string): string | undefined {
  const roles = ["cfo", "cto", "cmo", "coo", "ceo", "chro", "ciso", "cio", "cpo", "cro", "fd", "cdo", "caio", "gc", "md"];
  const slugLower = slug.toLowerCase();
  for (const role of roles) {
    if (slugLower.includes(role)) {
      return role.toUpperCase();
    }
  }
  return undefined;
}

function extractEngagementFromSlug(slug: string): EngagementType {
  if (slug.includes("interim")) return "interim";
  if (slug.includes("part-time")) return "part-time";
  if (slug.includes("advisory")) return "advisory";
  if (slug.includes("contract")) return "contract";
  return "fractional";
}

function detectLocaleFromSlug(slug: string): Locale {
  if (slug.startsWith("us-")) return "us";
  if (slug.startsWith("au-")) return "au";
  if (slug.startsWith("nz-")) return "nz";
  return "uk";
}

// ===========================================
// Sidebar Widgets
// ===========================================

function MarketSnapshotWidget({ roleData, locale }: { roleData: RoleData; locale: Locale }) {
  const dayRate = roleData.dayRates[locale];
  const colorClasses: Record<string, string> = {
    emerald: "from-emerald-400 to-emerald-600",
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    amber: "from-amber-400 to-amber-600",
    slate: "from-slate-400 to-slate-600",
    rose: "from-rose-400 to-rose-600",
    red: "from-red-400 to-red-600",
    cyan: "from-cyan-400 to-cyan-600",
    violet: "from-violet-400 to-violet-600",
    orange: "from-orange-400 to-orange-600",
    teal: "from-teal-400 to-teal-600",
    indigo: "from-indigo-400 to-indigo-600",
  };
  const gradient = colorClasses[roleData.color] || colorClasses.emerald;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
        <span>📊</span> {roleData.shortTitle} Market Snapshot
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Demand Index</span>
            <span className="text-emerald-600 font-semibold">{roleData.demand.trend}</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000`}
              style={{ width: `${roleData.demand.percentage}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Day Rate</span>
            <span className="text-gray-900 font-semibold">{dayRate}</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Avg Placement</span>
            <span className="text-amber-600 font-semibold">{roleData.placementWeeks} weeks</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-2/5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyFractionalWidget({ roleData }: { roleData: RoleData }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <h3 className="font-bold text-gray-900 text-sm mb-3">Why Fractional {roleData.shortTitle}?</h3>
      <div className="space-y-2.5 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</span>
          <span className="text-gray-700">{roleData.savingsPercent} cost savings</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</span>
          <span className="text-gray-700">No long-term commitment</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</span>
          <span className="text-gray-700">Senior expertise on demand</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</span>
          <span className="text-gray-700">Flexible 1-3 days/week</span>
        </div>
      </div>
    </div>
  );
}

function RelatedRolesWidget({ roleData, locale, engagementType }: { roleData: RoleData; locale: Locale; engagementType: EngagementType }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
        <span>🔗</span> Related Roles
      </h3>
      <nav className="space-y-2 text-sm">
        {roleData.relatedRoles.map((role) => (
          <a
            key={role}
            href={getRoleJobsUrl(role, engagementType, locale)}
            className="block text-gray-600 hover:text-emerald-700 transition-colors"
          >
            {engagementType === "fractional" ? "Fractional" : engagementType.charAt(0).toUpperCase() + engagementType.slice(1)} {role} Jobs →
          </a>
        ))}
      </nav>
    </div>
  );
}

function IndustriesWidget({ roleData }: { roleData: RoleData }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
        <span>🏢</span> Top Industries
      </h3>
      <div className="flex flex-wrap gap-2">
        {roleData.industries.map((industry) => (
          <span
            key={industry}
            className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
          >
            {industry}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillsWidget({ roleData }: { roleData: RoleData }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
        <span>💡</span> Key Skills
      </h3>
      <div className="space-y-2">
        {roleData.skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-sm text-gray-700">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTAWidget({ context, roleData }: { context: SidebarContext; roleData: RoleData }) {
  const cta = context.customCTA || {
    title: "Looking to Hire?",
    description: `Connect with vetted fractional ${roleData.shortTitle}s today.`,
    buttonText: "Post a Role",
    buttonHref: "/contact",
  };

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
      <h3 className="font-bold text-emerald-900 mb-2">{cta.title}</h3>
      <p className="text-emerald-800 text-sm mb-4">{cta.description}</p>
      <a
        href={cta.buttonHref}
        className="block w-full text-center bg-emerald-600 text-white py-2.5 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
      >
        {cta.buttonText}
      </a>
    </div>
  );
}

function NewsletterWidget() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5">
      <h3 className="font-bold text-indigo-900 text-sm mb-2 flex items-center gap-2">
        <span>📧</span> Stay Updated
      </h3>
      <p className="text-indigo-700 text-xs mb-3">
        Get the latest fractional exec opportunities and market insights.
      </p>
      <a
        href="/newsletter"
        className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
      >
        Subscribe Free
      </a>
    </div>
  );
}

function AIAssistantWidget({ roleData }: { roleData: RoleData }) {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
          <span className="text-xl">✨</span>
        </div>
        <h3 className="font-bold text-violet-900 text-sm">AI {roleData.shortTitle} Advisor</h3>
      </div>
      <p className="text-violet-700 text-xs mb-3">
        Get personalized recommendations based on your requirements.
      </p>
      <a
        href="#ai-assistant"
        className="block w-full text-center bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors font-medium text-sm"
      >
        Ask AI Assistant
      </a>
    </div>
  );
}

function QuickNavWidget() {
  const defaultSections = [
    { id: "jobs", label: "Latest Jobs" },
    { id: "rates", label: "Day Rates" },
    { id: "compare", label: "Compare Options" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
        <span>📍</span> On This Page
      </h3>
      <nav className="space-y-2 text-sm">
        {defaultSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-gray-600 hover:text-emerald-700 transition-colors"
          >
            → {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function SalaryRangeWidget({ roleData, locale }: { roleData: RoleData; locale: Locale }) {
  const dayRate = roleData.dayRates[locale];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
        <span>💰</span> {roleData.shortTitle} Day Rates
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-emerald-600">{dayRate}</span>
          <span className="text-xs text-gray-500">per day</span>
        </div>
        <div className="h-3 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 rounded-full relative">
          <div className="absolute -top-1 left-1/4 w-2 h-5 bg-white border-2 border-emerald-600 rounded-full" />
          <div className="absolute -top-1 right-1/4 w-2 h-5 bg-white border-2 border-emerald-600 rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Junior</span>
          <span>Mid</span>
          <span>Senior</span>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Based on {new Date().getFullYear()} market data for {locale.toUpperCase()} {roleData.shortTitle} roles.
        </p>
      </div>
    </div>
  );
}

// ===========================================
// Main Component
// ===========================================

export function IntelligentSidebar({ context }: { context: SidebarContext }) {
  // Derive context from slug if not provided
  const role = useMemo(() => context.role || extractRoleFromSlug(context.slug), [context.role, context.slug]);
  const engagementType = useMemo(() => context.engagementType || extractEngagementFromSlug(context.slug), [context.engagementType, context.slug]);
  const locale = useMemo(() => context.locale || detectLocaleFromSlug(context.slug), [context.locale, context.slug]);

  // Get role-specific data
  const roleData = useMemo(() => {
    if (role && ROLE_DATA[role]) {
      return ROLE_DATA[role];
    }
    return DEFAULT_ROLE_DATA;
  }, [role]);

  // Page type can be used for conditional widget display in the future
  // const pageType = context.pageType || "other";

  return (
    <div className="space-y-5">
      {/* Jobs Sidebar - usually first */}
      {!context.hideJobs && (
        <JobsSidebar location={locale === "uk" ? "uk" : locale} />
      )}

      {/* Trust Signals */}
      {!context.hideTrust && <TrustSignals variant="sidebar" />}

      {/* Market Snapshot - shows demand, rates, placement time */}
      <MarketSnapshotWidget roleData={roleData} locale={locale} />

      {/* Salary/Rate Widget */}
      <SalaryRangeWidget roleData={roleData} locale={locale} />

      {/* Quick Nav */}
      <QuickNavWidget />

      {/* CTA */}
      <CTAWidget context={context} roleData={roleData} />

      {/* Newsletter */}
      <NewsletterWidget />

      {/* Why Fractional */}
      <WhyFractionalWidget roleData={roleData} />

      {/* Related Roles */}
      <RelatedRolesWidget roleData={roleData} locale={locale} engagementType={engagementType} />

      {/* Industries */}
      <IndustriesWidget roleData={roleData} />

      {/* Skills */}
      <SkillsWidget roleData={roleData} />

      {/* AI Assistant */}
      <AIAssistantWidget roleData={roleData} />
    </div>
  );
}

// Export for use in other components
export { ROLE_DATA, type RoleData };
