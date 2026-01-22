"use client";

import dynamic from "next/dynamic";

// Core interactive components
import { RoleCalculator } from "@/components/RoleCalculator";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import { HotJobs } from "@/components/HotJobs";

// Charts (lazy loaded for performance)
const JobsBarChart = dynamic(
  () => import("@/components/charts").then((mod) => mod.JobsBarChart),
  { ssr: false }
);
const SalaryAreaChart = dynamic(
  () => import("@/components/charts").then((mod) => mod.SalaryAreaChart),
  { ssr: false }
);
const MarketDashboard = dynamic(
  () => import("@/components/charts").then((mod) => mod.MarketDashboard),
  { ssr: false }
);

// ForceGraph3D removed for performance

// New personalized components for MDX demo
const PersonalizedHero = dynamic(
  () => import("@/components/mdx/PersonalizedHero"),
  { ssr: false }
);
const SalaryBenchmarkChart = dynamic(
  () => import("@/components/mdx/SalaryBenchmarkChart"),
  { ssr: false }
);
const CareerTimeline = dynamic(
  () => import("@/components/mdx/CareerTimeline"),
  { ssr: false }
);
const MarketOverview = dynamic(
  () => import("@/components/mdx/MarketOverview"),
  { ssr: false }
);
const CopilotMainPanel = dynamic(
  () => import("@/components/mdx/CopilotMainPanel"),
  { ssr: false }
);

// New AI-rendered components for CopilotKit
const JobMatchScore = dynamic(
  () => import("@/components/mdx/JobMatchScore"),
  { ssr: false }
);
const CompanyInsights = dynamic(
  () => import("@/components/mdx/CompanyInsights"),
  { ssr: false }
);
const SkillGapAnalysis = dynamic(
  () => import("@/components/mdx/SkillGapAnalysis"),
  { ssr: false }
);
const MarketTrends = dynamic(
  () => import("@/components/mdx/MarketTrends"),
  { ssr: false }
);
const InterviewPrep = dynamic(
  () => import("@/components/mdx/InterviewPrep"),
  { ssr: false }
);
const NetworkConnections = dynamic(
  () => import("@/components/mdx/NetworkConnections"),
  { ssr: false }
);

// SEO-focused components
const AuthorityLinksPanel = dynamic(
  () => import("@/components/mdx/AuthorityLinksPanel"),
  { ssr: false }
);
const StatisticsPanel = dynamic(
  () => import("@/components/mdx/StatisticsPanel"),
  { ssr: false }
);
const InternalLinksGrid = dynamic(
  () => import("@/components/mdx/InternalLinksGrid"),
  { ssr: false }
);
const SEOContentSection = dynamic(
  () => import("@/components/mdx/SEOContentSection"),
  { ssr: false }
);

// MDX component registry - all components available in MDX content
export const mdxComponents = {
  // Interactive job components
  RoleCalculator,
  EmbeddedJobBoard,
  HotJobs,

  // Charts & visualizations
  JobsBarChart,
  SalaryAreaChart,
  MarketDashboard,

  // Personalized MDX components
  PersonalizedHero,
  SalaryBenchmarkChart,
  CareerTimeline,
  MarketOverview,
  CopilotMainPanel,

  // AI-rendered components (CopilotKit can compose these)
  JobMatchScore,
  CompanyInsights,
  SkillGapAnalysis,
  MarketTrends,
  InterviewPrep,
  NetworkConnections,

  // SEO-focused components
  AuthorityLinksPanel,
  StatisticsPanel,
  InternalLinksGrid,
  SEOContentSection,

  // HTML element overrides for MDX styling
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-medium text-gray-700 mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-600 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-emerald-600 hover:text-emerald-700 underline" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
};

export type MDXComponents = typeof mdxComponents;
