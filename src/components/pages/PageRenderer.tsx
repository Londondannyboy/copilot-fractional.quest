'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { PageData, Section, FAQ, ExternalLink } from '@/lib/pages'
import { RoleCalculator } from '@/components/RoleCalculator'
import { LazyYouTube } from '@/components/LazyYouTube'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'

// ===========================================
// Main Page Renderer
// ===========================================

interface PageRendererProps {
  page: PageData
}

export function PageRenderer({ page }: PageRendererProps) {
  return (
    <div data-accent={page.accent_color || 'blue'}>
      {/* Hero Section */}
      <HeroSection page={page} />

      {/* Content Sections */}
      {page.sections?.map((section, index) => (
        <SectionRenderer key={index} section={section} index={index} />
      ))}

      {/* FAQ Section */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection faqs={page.faqs} />
      )}

      {/* External Links */}
      {page.external_links && page.external_links.length > 0 && (
        <ExternalLinksSection links={page.external_links} />
      )}

      {/* Related Pages */}
      {page.related_pages && page.related_pages.length > 0 && (
        <RelatedPagesSection slugs={page.related_pages} />
      )}

      {/* Job Board CTA */}
      {page.job_board_enabled && (
        <JobBoardCTA page={page} />
      )}
    </div>
  )
}

// ===========================================
// Hero Section
// ===========================================

function HeroSection({ page }: { page: PageData }) {
  return (
    <section className="hero-section py-16 md:py-24">
      <div className="section-container relative z-10">
        {/* Badge */}
        {page.hero_badge && (
          <div className="hero-badge mb-6">
            {page.hero_badge}
          </div>
        )}

        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
          {page.hero_title || page.title}
        </h1>

        {/* Subtitle */}
        {page.hero_subtitle && (
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            {page.hero_subtitle}
          </p>
        )}

        {/* Quick Stats - if available in first section */}
        {page.sections?.[0]?.type === 'market_stats' && (
          <QuickStats stats={page.sections[0].stats as Array<{ label: string; value: string; context?: string }>} />
        )}
      </div>
    </section>
  )
}

function QuickStats({ stats }: { stats?: Array<{ label: string; value: string; context?: string }> }) {
  if (!stats || stats.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {stats.slice(0, 4).map((stat, i) => (
        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// ===========================================
// Section Renderer - Routes to specific components
// ===========================================

function SectionRenderer({ section, index }: { section: Section; index: number }) {
  const isEven = index % 2 === 0

  // Skip market_stats in first position (shown in hero)
  if (section.type === 'market_stats' && index === 0) return null

  const content = getSectionContent(section)

  return (
    <section className={`content-section ${!isEven ? 'bg-gray-50' : ''}`}>
      <div className="section-container">
        {section.heading && (
          <div className="section-header">
            <div className="section-eyebrow">{getSectionEyebrow(section.type)}</div>
            <h2 className="section-title">{section.heading}</h2>
          </div>
        )}
        {content}
      </div>
    </section>
  )
}

function getSectionEyebrow(type: string): string {
  const eyebrows: Record<string, string> = {
    intro: 'Overview',
    role_types: 'Opportunities',
    market_stats: 'Market Data',
    qualifications: 'Requirements',
    market_trends: 'Trends',
    responsibilities: 'What You\'ll Do',
    comparison: 'Comparison',
    services: 'Services',
    when_to_hire: 'When to Hire',
    costs: 'Investment',
    how_to_hire: 'How to Hire',
    areas: 'Locations',
    sectors: 'Industries',
    by_stage: 'By Stage',
    common_roles: 'Popular Roles',
    engagement_types: 'Engagement Types',
    what_to_look_for: 'Selection Criteria',
    hiring_process: 'Process',
    rate_table: 'Rate Guide',
    role_breakdown: 'Role Analysis',
    working_patterns: 'Working Patterns',
    getting_started: 'Getting Started',
    why_saas: 'Why',
    why_pe: 'Why PE',
    why_fintech: 'Why FinTech',
    why_healthtech: 'Why HealthTech',
    roles: 'Roles',
    subsectors: 'Sub-Sectors',
    core_benefits: 'Key Benefits',
    by_situation: 'By Situation',
    roi: 'Return on Investment',
    deliverables: 'Deliverables',
    unique_aspects: 'What Makes It Unique',
    considerations: 'Considerations',
    vp_vs_cto: 'Role Comparison',
    cro_vs_others: 'Role Comparison',
    how_it_works: 'How It Works',
    benefits: 'Benefits',
    transition_steps: 'Transition Steps',
    common_mistakes: 'Avoid These Mistakes',
    timeline: 'Timeline',
    saas_expertise: 'Expertise Required',
    what_fractional_cto_provides: 'What You Get',
    engagement_model: 'Engagement Model',
    warning_signs: 'Warning Signs',
    profile_optimization: 'Profile Tips',
    content_strategy: 'Content Strategy',
    key_terms: 'Key Terms',
    equity: 'Equity',
    manufacturing_expertise: 'Expertise',
    ecommerce_expertise: 'Expertise',
    b2b_expertise: 'Expertise',
    ai_expertise: 'Expertise',
    fundraising_services: 'Services',
    by_round: 'By Round',
    value_add: 'Value Added',
    comparison_table: 'Comparison',
    when_interim: 'When Interim',
    when_fractional: 'When Fractional',
    when_consultant: 'When Consultant',
    prerequisites: 'Prerequisites',
    ideal_portfolio: 'Portfolio Design',
    time_management: 'Time Management',
    client_selection: 'Client Selection',
    remote_landscape: 'Remote Work',
    best_roles_remote: 'Best Remote Roles',
    making_remote_work: 'Making It Work',
    rate_considerations: 'Rate Considerations',
    location_factor: 'Location Factors',
    sector_premiums: 'Sector Premiums',
    annual_earnings: 'Earning Potential',
  }
  return eyebrows[type] || 'Insights'
}

function getSectionContent(section: Section): React.ReactNode {
  switch (section.type) {
    case 'intro':
    case 'market_trends':
    case 'qualifications':
    case 'working_patterns':
    case 'vp_vs_cto':
    case 'cro_vs_others':
    case 'unique_aspects':
    case 'considerations':
    case 'timeline':
    case 'roi':
    case 'rate_considerations':
      return <ProseContent content={section.content} />

    // New section types from content migration
    case 'stats_bar':
      return <StatsBar items={section.items as unknown as StatsBarItem[]} />

    case 'geographic_sectors':
      return <GeographicSectors items={section.items as unknown as GeographicSectorItem[]} />

    case 'emerging_roles':
      return <EmergingRolesGrid items={section.items as unknown as EmergingRoleItem[]} />

    case 'case_study':
      return <CaseStudySection section={section as unknown as CaseStudyData} />

    case 'industry_stats':
      return <IndustryStatsGrid items={section.items as unknown as IndustryStat[]} />

    case 'rate_tiers':
      return <RateTiersSection tiers={section.tiers as unknown as RateTier[]} />

    case 'ir35_info':
      return <IR35InfoSection section={section as unknown as IR35Data} />

    case 'location_rates':
      return <LocationRatesGrid items={section.items as unknown as LocationRateItem[]} />

    case 'specializations':
      return <SpecializationsGrid items={section.items as unknown as SpecializationItem[]} />

    case 'calculator':
      return <CalculatorSection example={section.example as unknown as CalculatorExample} />

    case 'role_types':
    case 'roles':
    case 'common_roles':
      return <RoleCardsGrid items={section.items as unknown as RoleItem[]} />

    case 'role_cards':
      return <RoleCardsWithLinks items={section.items as unknown as RoleCardWithLinkItem[]} />

    case 'market_stats':
      return <StatsGrid stats={section.stats as unknown as StatItem[]} />

    case 'responsibilities':
    case 'deliverables':
      return <CheckList items={section.items as unknown as string[]} />

    case 'comparison':
    case 'comparison_table':
      return <ComparisonTable items={section.items as unknown as ComparisonItem[]} />

    case 'services':
      return <ServicesGrid items={section.items as unknown as ServiceItem[]} />

    case 'when_to_hire':
    case 'warning_signs':
      return <SignalsList signals={section.signals as unknown as SignalItem[]} />

    case 'costs':
      return <CostsSection content={section.content} rateTable={section.rateTable as unknown as RateTableItem[]} />

    case 'how_to_hire':
    case 'hiring_process':
    case 'transition_steps':
    case 'getting_started':
      return <StepsList steps={section.steps as unknown as StepItem[]} />

    case 'areas':
      return <AreasGrid items={section.items as unknown as AreaItem[]} />

    case 'sectors':
    case 'subsectors':
      return <SectorsGrid items={section.items as unknown as SectorItem[]} />

    case 'by_stage':
      return <StagesGrid items={section.items as unknown as StageItem[]} />

    case 'what_to_look_for':
      return <CriteriaSection mustHaves={section.mustHaves as unknown as CriteriaItem[]} niceToHaves={section.niceToHaves as unknown as CriteriaItem[]} />

    case 'engagement_types':
      return <EngagementTypes items={section.items as unknown as EngagementItem[]} />

    case 'common_mistakes':
      return <MistakesList mistakes={section.mistakes as unknown as MistakeItem[]} items={section.items as unknown as MistakeItem[]} />

    case 'core_benefits':
      return <BenefitsGrid items={section.items as unknown as BenefitItem[]} />

    case 'by_situation':
      return <SituationsList items={section.items as unknown as SituationItem[]} />

    case 'why_saas':
    case 'why_pe':
    case 'why_fintech':
    case 'why_healthtech':
      return <ReasonsList items={section.items as unknown as ReasonItem[]} />

    case 'saas_expertise':
    case 'manufacturing_expertise':
    case 'ecommerce_expertise':
    case 'b2b_expertise':
    case 'ai_expertise':
      return <ExpertiseGrid items={section.items as unknown as ExpertiseItem[]} />

    case 'fundraising_services':
      return <ServicesGrid items={section.items as unknown as ServiceItem[]} />

    case 'by_round':
      return <RoundsList items={section.items as unknown as RoundItem[]} />

    case 'value_add':
      return <ValueAddSection stats={section.stats as unknown as ValueStat[]} />

    case 'how_it_works':
      return <HowItWorksGrid items={section.items as unknown as HowItWorksItem[]} />

    case 'benefits':
      return <BenefitsSplit forCompanies={section.forCompanies as unknown as BenefitItem[]} forExecutives={section.forExecutives as unknown as BenefitItem[]} />

    case 'prerequisites':
      return <PrerequisitesList items={section.items as unknown as PrerequisiteItem[]} />

    case 'profile_optimization':
    case 'key_terms':
      return <TipsGrid items={section.items as unknown as TipItem[]} />

    case 'content_strategy':
      return <ContentStrategyGrid items={section.items as unknown as ContentItem[]} />

    case 'ideal_portfolio':
    case 'time_management':
    case 'client_selection':
      return <TipsGrid items={section.items as unknown as TipItem[]} />

    case 'remote_landscape':
      return <RemoteStats stats={section.stats as unknown as RemoteStat[]} />

    case 'best_roles_remote':
      return <RemoteRolesGrid items={section.items as unknown as RemoteRoleItem[]} />

    case 'making_remote_work':
      return <TipsList tips={section.tips as unknown as TipListItem[]} />

    case 'rate_table':
      return <RateTableSection items={section.items as unknown as RateTableItem[]} />

    case 'role_breakdown':
      return <RoleBreakdownGrid items={section.items as unknown as RoleBreakdownItem[]} />

    case 'location_factor':
      return <LocationFactorGrid items={section.items as unknown as LocationFactorItem[]} />

    case 'sector_premiums':
      return <SectorPremiumsGrid items={section.items as unknown as SectorPremiumItem[]} />

    case 'annual_earnings':
      return <EarningsSection content={section.content} examples={section.examples as unknown as EarningExample[]} />

    case 'when_interim':
    case 'when_fractional':
    case 'when_consultant':
      return <ScenariosList scenarios={section.scenarios as unknown as ScenarioItem[]} />

    case 'engagement_model':
      return (
        <>
          {section.content && <ProseContent content={section.content} />}
          {section.typical_activities && <ActivitiesGrid items={section.typical_activities as unknown as ActivityItem[]} />}
        </>
      )

    // ===========================================
    // Interactive Components
    // ===========================================

    case 'role_calculator':
      return <RoleCalculatorSection role={section.role as string} />

    case 'video':
      return <VideoSection videoId={section.videoId as string} title={section.title as string} caption={section.caption as string} />

    case 'job_board':
      return (
        <JobBoardSection
          department={section.department as string}
          location={section.location as string}
          title={section.title as string}
          accentColor={section.accentColor as string}
          jobsPerPage={section.jobsPerPage as number}
        />
      )

    case 'definition_box':
      return <DefinitionBox label={section.label as string} content={section.content as string} />

    case 'related_resources':
      return <RelatedResourcesGrid items={section.items as unknown as RelatedResourceItem[]} />

    case 'cta_section':
      return (
        <CTASection
          title={section.title as string}
          subtitle={section.subtitle as string}
          primaryLink={section.primaryLink as unknown as CTALink}
          secondaryLink={section.secondaryLink as unknown as CTALink}
        />
      )

    case 'prose_grid':
      return <ProseGridSection items={section.items as unknown as ProseGridItem[]} />

    case 'qualifications_links':
      return <QualificationsLinks items={section.items as unknown as QualificationLink[]} intro={section.intro as string} />

    default:
      // Generic content fallback
      if (section.content) {
        return <ProseContent content={section.content} />
      }
      if (section.items && Array.isArray(section.items)) {
        return <GenericItemsList items={section.items} />
      }
      return null
  }
}

// ===========================================
// Section Component Types
// ===========================================

interface RoleItem {
  title: string
  rate: string
  description: string
}

interface RoleCardWithLinkItem {
  href: string
  icon: string
  title: string
  description?: string
  rate?: string
}

interface StatItem {
  label: string
  value: string
  context?: string
}

interface ComparisonItem {
  aspect: string
  [key: string]: string
}

interface ServiceItem {
  service: string
  description: string
  frequency?: string
  impact?: string
}

interface SignalItem {
  signal: string
  detail: string
  urgency?: string
}

interface RateTableItem {
  level: string
  dayRate: string
  typical: string
}

interface StepItem {
  step: string
  detail: string
}

interface AreaItem {
  area: string
  focus: string
  roles: string
  rates?: string
}

interface SectorItem {
  sector: string
  description: string
  focus?: string
}

interface StageItem {
  stage: string
  typical_roles?: string
  focus: string
  typical_commitment?: string
  needs?: string
}

interface CriteriaItem {
  criteria: string
  detail: string
}

interface EngagementItem {
  type: string
  description: string
  best_for: string
  duration?: string
  focus?: string
}

interface MistakeItem {
  mistake: string
  consequence?: string
  impact?: string
  fix?: string
}

interface BenefitItem {
  benefit: string
  detail: string
  stat?: string
}

interface SituationItem {
  situation: string
  key_benefit: string
}

interface ReasonItem {
  reason: string
  detail: string
}

interface ExpertiseItem {
  area: string
  detail?: string
  specifics?: string
}

interface RoundItem {
  round: string
  cfo_role: string
  time: string
  focus: string
}

interface ValueStat {
  improvement: string
  detail: string
}

interface HowItWorksItem {
  aspect: string
  detail: string
}

interface PrerequisiteItem {
  prereq: string
  detail: string
  importance: string
}

interface TipItem {
  term?: string
  element?: string
  tip?: string
  recommendation?: string
  criterion?: string
  detail: string
  advice?: string
}

interface ContentItem {
  content_type: string
  frequency: string
  focus: string
}

interface RemoteStat {
  stat: string
  detail: string
}

interface RemoteRoleItem {
  role: string
  remote_fit: string
  notes: string
}

interface TipListItem {
  tip: string
  detail: string
}

interface RoleBreakdownItem {
  role: string
  demand: string
  rate: string
  sectors: string
}

interface LocationFactorItem {
  location: string
  factor: string
  notes: string
}

interface SectorPremiumItem {
  sector: string
  premium: string
  reason: string
}

interface EarningExample {
  scenario: string
  rate: string
  days: string
  annual: string
}

interface ScenarioItem {
  scenario: string
  detail: string
}

interface ActivityItem {
  activity: string
  examples: string
}

// New interfaces for migrated content
interface StatsBarItem {
  value: string
  label: string
}

interface GeographicSectorItem {
  name: string
  description: string
}

interface EmergingRoleItem {
  title: string
  rate: string
  badge?: string
}

interface CaseStudyData {
  type: string
  title?: string
  company: string
  challenge: string
  solution: string
  results: string[]
  quote?: string
}

interface IndustryStat {
  stat: string
  description: string
}

interface RateTier {
  level: string
  rate: string
}

interface IR35Data {
  type: string
  title?: string
  inside_rate?: string
  outside_rate?: string
  note: string
}

interface LocationRateItem {
  location: string
  rate: string
  share?: string
  note?: string
}

interface SpecializationItem {
  title: string
  rate: string
  badge?: string
  description?: string
}

interface CalculatorExample {
  day_rate: string
  days_per_week: string
  clients: string
  annual: string
}

// ===========================================
// Section Components
// ===========================================

function ProseContent({ content }: { content?: string }) {
  if (!content) return null
  return (
    <div className="prose-content max-w-3xl">
      <p>{content}</p>
    </div>
  )
}

function RoleCardsGrid({ items }: { items?: RoleItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="role-card">
          <div className="role-card-header">
            <h3 className="role-title">{item.title}</h3>
            <span className="role-rate">{item.rate}</span>
          </div>
          <p className="role-description">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

const iconMap: Record<string, string> = {
  currency: '💰',
  chart: '📊',
  code: '💻',
  gear: '⚙️',
  shield: '🛡️',
  people: '👥',
  briefcase: '💼',
  target: '🎯',
  rocket: '🚀',
  building: '🏢',
  globe: '🌍',
  lightbulb: '💡',
  handshake: '🤝',
  scale: '⚖️',
  megaphone: '📣',
  search: '🔍',
}

function RoleCardsWithLinks({ items }: { items?: RoleCardWithLinkItem[] }) {
  if (!items) return null
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-accent hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">{iconMap[item.icon] || '📋'}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-accent mb-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              )}
              {item.rate && (
                <span className="inline-block mt-2 text-sm font-medium text-accent">{item.rate}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function StatsGrid({ stats }: { stats?: StatItem[] }) {
  if (!stats) return null
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
          {stat.context && <div className="text-xs text-gray-400 mt-1">{stat.context}</div>}
        </div>
      ))}
    </div>
  )
}

function CheckList({ items }: { items?: string[] }) {
  if (!items) return null
  return (
    <ul className="check-list max-w-2xl">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

function ComparisonTable({ items }: { items?: ComparisonItem[] }) {
  if (!items || items.length === 0) return null

  const keys = Object.keys(items[0]).filter(k => k !== 'aspect' && k !== 'winner')

  return (
    <div className="overflow-x-auto">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Aspect</th>
            {keys.map(key => (
              <th key={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="font-medium">{item.aspect}</td>
              {keys.map(key => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ServicesGrid({ items }: { items?: ServiceItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card card-accent">
          <h3 className="font-semibold text-lg mb-2">{item.service}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          {item.frequency && (
            <span className="inline-block mt-3 text-xs font-medium text-accent bg-accent-light px-2 py-1 rounded">
              {item.frequency}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function SignalsList({ signals }: { signals?: SignalItem[] }) {
  if (!signals) return null
  return (
    <div className="space-y-4">
      {signals.map((signal, i) => (
        <div key={i} className="card card-accent">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold">{i + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{signal.signal}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{signal.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CostsSection({ content, rateTable }: { content?: string; rateTable?: RateTableItem[] }) {
  return (
    <div className="space-y-8">
      {content && <ProseContent content={content} />}
      {rateTable && rateTable.length > 0 && (
        <div className="overflow-x-auto">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Day Rate</th>
                <th>Typical Clients</th>
              </tr>
            </thead>
            <tbody>
              {rateTable.map((row, i) => (
                <tr key={i}>
                  <td className="font-medium">{row.level}</td>
                  <td className="text-accent font-semibold">{row.dayRate}</td>
                  <td className="text-gray-600">{row.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function StepsList({ steps }: { steps?: StepItem[] }) {
  if (!steps) return null
  return (
    <ol className="steps-list">
      {steps.map((step, i) => (
        <li key={i}>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{step.step}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function AreasGrid({ items }: { items?: AreaItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold text-lg mb-3">{item.area}</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Focus:</span> <span className="text-gray-700">{item.focus}</span></p>
            <p><span className="text-gray-500">Roles:</span> <span className="text-gray-700">{item.roles}</span></p>
            {item.rates && <p><span className="text-gray-500">Rates:</span> <span className="text-accent font-medium">{item.rates}</span></p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function SectorsGrid({ items }: { items?: SectorItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card card-accent">
          <h3 className="font-semibold text-lg mb-2">{item.sector}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

function StagesGrid({ items }: { items?: StageItem[] }) {
  if (!items) return null
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <span className="inline-block px-3 py-1 bg-accent-light text-accent font-semibold text-sm rounded-full">
                {item.stage}
              </span>
            </div>
            <div className="md:w-3/4 space-y-2">
              {item.typical_roles && (
                <p className="text-sm"><span className="text-gray-500">Typical Roles:</span> <span className="font-medium">{item.typical_roles}</span></p>
              )}
              <p className="text-sm"><span className="text-gray-500">Focus:</span> <span className="text-gray-700">{item.focus}</span></p>
              {item.typical_commitment && (
                <p className="text-sm"><span className="text-gray-500">Commitment:</span> <span className="text-gray-700">{item.typical_commitment}</span></p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CriteriaSection({ mustHaves, niceToHaves }: { mustHaves?: CriteriaItem[]; niceToHaves?: CriteriaItem[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {mustHaves && (
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
            Must-Haves
          </h3>
          <div className="space-y-3">
            {mustHaves.map((item, i) => (
              <div key={i} className="pl-8">
                <h4 className="font-medium text-gray-900">{item.criteria}</h4>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {niceToHaves && (
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">+</span>
            Nice-to-Haves
          </h3>
          <div className="space-y-3">
            {niceToHaves.map((item, i) => (
              <div key={i} className="pl-8">
                <h4 className="font-medium text-gray-900">{item.criteria}</h4>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function EngagementTypes({ items }: { items?: EngagementItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold text-lg mb-2">{item.type}</h3>
          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
          <p className="text-sm"><span className="text-gray-500">Best for:</span> <span className="text-accent font-medium">{item.best_for}</span></p>
        </div>
      ))}
    </div>
  )
}

function MistakesList({ mistakes, items }: { mistakes?: MistakeItem[]; items?: MistakeItem[] }) {
  const data = mistakes || items
  if (!data) return null
  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <div key={i} className="card border-l-4 border-red-400">
          <div className="flex items-start gap-4">
            <span className="text-red-500 text-xl">⚠</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.mistake}</h3>
              <p className="text-gray-600 text-sm">{item.consequence || item.impact || item.fix}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BenefitsGrid({ items }: { items?: BenefitItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold text-lg mb-2">{item.benefit}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.detail}</p>
          {item.stat && <p className="text-accent font-semibold text-sm">{item.stat}</p>}
        </div>
      ))}
    </div>
  )
}

function SituationsList({ items }: { items?: SituationItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card card-accent">
          <h3 className="font-semibold mb-2">{item.situation}</h3>
          <p className="text-gray-600 text-sm">{item.key_benefit}</p>
        </div>
      ))}
    </div>
  )
}

function ReasonsList({ items }: { items?: ReasonItem[] }) {
  if (!items) return null
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card card-accent">
          <h3 className="font-semibold text-gray-900 mb-1">{item.reason}</h3>
          <p className="text-gray-600 text-sm">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

function ExpertiseGrid({ items }: { items?: ExpertiseItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold text-lg mb-2 text-accent">{item.area}</h3>
          <p className="text-gray-600 text-sm">{item.detail || item.specifics}</p>
        </div>
      ))}
    </div>
  )
}

function RoundsList({ items }: { items?: RoundItem[] }) {
  if (!items) return null
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <span className="px-3 py-1 bg-accent-light text-accent font-semibold rounded-full text-sm">{item.round}</span>
            <span className="text-sm text-gray-500">{item.time}</span>
          </div>
          <p className="text-gray-700 mb-2">{item.cfo_role}</p>
          <p className="text-sm text-gray-500">Focus: <span className="text-gray-700">{item.focus}</span></p>
        </div>
      ))}
    </div>
  )
}

function ValueAddSection({ stats }: { stats?: ValueStat[] }) {
  if (!stats) return null
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {stats.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold text-accent mb-2">{item.improvement}</h3>
          <p className="text-gray-600 text-sm">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

function HowItWorksGrid({ items }: { items?: HowItWorksItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold mb-2">{item.aspect}</h3>
          <p className="text-gray-600 text-sm">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

function BenefitsSplit({ forCompanies, forExecutives }: { forCompanies?: BenefitItem[]; forExecutives?: BenefitItem[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {forCompanies && (
        <div>
          <h3 className="font-semibold text-lg mb-4">For Companies</h3>
          <div className="space-y-3">
            {forCompanies.map((item, i) => (
              <div key={i} className="card">
                <h4 className="font-medium">{item.benefit}</h4>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {forExecutives && (
        <div>
          <h3 className="font-semibold text-lg mb-4">For Executives</h3>
          <div className="space-y-3">
            {forExecutives.map((item, i) => (
              <div key={i} className="card">
                <h4 className="font-medium">{item.benefit}</h4>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PrerequisitesList({ items }: { items?: PrerequisiteItem[] }) {
  if (!items) return null
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{item.prereq}</h3>
            <span className={`text-xs px-2 py-1 rounded ${
              item.importance === 'Essential' ? 'bg-red-100 text-red-700' :
              item.importance === 'Very Important' ? 'bg-amber-100 text-amber-700' :
              'bg-blue-100 text-blue-700'
            }`}>{item.importance}</span>
          </div>
          <p className="text-gray-600 text-sm">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

function TipsGrid({ items }: { items?: TipItem[] }) {
  if (!items) return null
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold mb-2">{item.term || item.element || item.tip || item.criterion}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.detail || item.advice || item.recommendation}</p>
          {item.tip && <p className="text-xs text-accent">💡 {item.tip}</p>}
        </div>
      ))}
    </div>
  )
}

function ContentStrategyGrid({ items }: { items?: ContentItem[] }) {
  if (!items) return null
  return (
    <div className="overflow-x-auto">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Content Type</th>
            <th>Frequency</th>
            <th>Focus</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="font-medium">{item.content_type}</td>
              <td>{item.frequency}</td>
              <td className="text-gray-600">{item.focus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RemoteStats({ stats }: { stats?: RemoteStat[] }) {
  if (!stats) return null
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-value">{stat.stat}</div>
          <div className="stat-label">{stat.detail}</div>
        </div>
      ))}
    </div>
  )
}

function RemoteRolesGrid({ items }: { items?: RemoteRoleItem[] }) {
  if (!items) return null
  return (
    <div className="overflow-x-auto">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Remote Fit</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="font-medium">{item.role}</td>
              <td>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.remote_fit === 'Excellent' ? 'bg-green-100 text-green-700' :
                  item.remote_fit === 'Very Good' ? 'bg-blue-100 text-blue-700' :
                  item.remote_fit === 'Good' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>{item.remote_fit}</span>
              </td>
              <td className="text-gray-600 text-sm">{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TipsList({ tips }: { tips?: TipListItem[] }) {
  if (!tips) return null
  return (
    <div className="space-y-4">
      {tips.map((tip, i) => (
        <div key={i} className="card card-accent">
          <h3 className="font-semibold mb-1">{tip.tip}</h3>
          <p className="text-gray-600 text-sm">{tip.detail}</p>
        </div>
      ))}
    </div>
  )
}

function RateTableSection({ items }: { items?: RateTableItem[] }) {
  if (!items) return null
  return (
    <div className="overflow-x-auto">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Day Rate Range</th>
            <th>Median</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="font-medium">{(item as unknown as Record<string, string>).role}</td>
              <td className="text-accent font-semibold">{(item as unknown as Record<string, string>).range}</td>
              <td>{(item as unknown as Record<string, string>).median}</td>
              <td className="text-gray-600 text-sm">{(item as unknown as Record<string, string>).notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RoleBreakdownGrid({ items }: { items?: RoleBreakdownItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{item.role}</h3>
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              item.demand === 'Very High' ? 'bg-green-100 text-green-700' :
              item.demand === 'High' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            }`}>{item.demand}</span>
          </div>
          <p className="text-accent font-semibold mb-1">{item.rate}</p>
          <p className="text-gray-600 text-sm">{item.sectors}</p>
        </div>
      ))}
    </div>
  )
}

function LocationFactorGrid({ items }: { items?: LocationFactorItem[] }) {
  if (!items) return null
  return (
    <div className="overflow-x-auto">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Rate Factor</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="font-medium">{item.location}</td>
              <td className="text-accent font-semibold">{item.factor}</td>
              <td className="text-gray-600 text-sm">{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectorPremiumsGrid({ items }: { items?: SectorPremiumItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <div key={i} className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{item.sector}</h3>
            <span className="text-accent font-semibold">{item.premium}</span>
          </div>
          <p className="text-gray-600 text-sm">{item.reason}</p>
        </div>
      ))}
    </div>
  )
}

function EarningsSection({ content, examples }: { content?: string; examples?: EarningExample[] }) {
  return (
    <div className="space-y-8">
      {content && <ProseContent content={content} />}
      {examples && (
        <div className="card-grid">
          {examples.map((ex, i) => (
            <div key={i} className="stat-card">
              <div className="text-sm text-gray-500 mb-2">{ex.scenario}</div>
              <div className="stat-value">{ex.annual}</div>
              <div className="text-xs text-gray-400 mt-2">{ex.rate} × {ex.days}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ScenariosList({ scenarios }: { scenarios?: ScenarioItem[] }) {
  if (!scenarios) return null
  return (
    <div className="space-y-4">
      {scenarios.map((item, i) => (
        <div key={i} className="card card-accent">
          <h3 className="font-semibold mb-1">{item.scenario}</h3>
          <p className="text-gray-600 text-sm">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

function ActivitiesGrid({ items }: { items?: ActivityItem[] }) {
  if (!items) return null
  return (
    <div className="card-grid mt-6">
      {items.map((item, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold text-accent mb-1">{item.activity}</h3>
          <p className="text-gray-600 text-sm">{item.examples}</p>
        </div>
      ))}
    </div>
  )
}

function GenericItemsList({ items }: { items: Record<string, unknown>[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="card">
          {Object.entries(item).map(([key, value]) => (
            <p key={key} className="text-sm">
              <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
              <span className="text-gray-700">{String(value)}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

// ===========================================
// FAQ Section
// ===========================================

function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="content-section bg-gray-50">
      <div className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">FAQs</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question w-full text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.question}
                <span className="text-xl">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===========================================
// External Links Section
// ===========================================

function ExternalLinksSection({ links }: { links: ExternalLink[] }) {
  return (
    <section className="content-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">Resources</div>
          <h2 className="section-title">Useful Links</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="link-card-icon">🔗</div>
              <div className="link-card-content">
                <div className="link-card-title">{link.label}</div>
                <div className="link-card-domain">{link.domain}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===========================================
// Related Pages Section
// ===========================================

function RelatedPagesSection({ slugs }: { slugs: string[] }) {
  // In a real app, you'd fetch these pages
  // For now, just show links
  return (
    <section className="content-section bg-gray-50">
      <div className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">Related</div>
          <h2 className="section-title">You Might Also Like</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {slugs.map((slug, i) => (
            <Link
              key={i}
              href={`/${slug}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-accent hover:text-accent transition-colors text-sm font-medium"
            >
              {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===========================================
// Job Board CTA
// ===========================================

function JobBoardCTA({ page }: { page: PageData }) {
  return (
    <section className="cta-section">
      <div className="section-container">
        <h2 className="cta-title">
          Browse {page.job_board_title || 'Fractional'} Jobs
        </h2>
        <p className="cta-subtitle">
          Find your next fractional opportunity. Updated daily with new roles.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/jobs" className="btn btn-primary">
            View All Jobs
          </Link>
          <Link href="/" className="btn btn-ghost">
            Talk to Frac
          </Link>
        </div>
      </div>
    </section>
  )
}

// ===========================================
// New Components for Migrated Content
// ===========================================

function StatsBar({ items }: { items?: StatsBarItem[] }) {
  if (!items) return null
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
          <div className="text-2xl font-bold text-accent">{item.value}</div>
          <div className="text-sm text-gray-500">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function GeographicSectors({ items }: { items?: GeographicSectorItem[] }) {
  if (!items) return null
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="card card-accent">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

function EmergingRolesGrid({ items }: { items?: EmergingRoleItem[] }) {
  if (!items) return null
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div key={i} className="card relative">
          {item.badge && (
            <span className="absolute -top-2 -right-2 px-2 py-1 bg-accent text-white text-xs font-medium rounded-full">
              {item.badge}
            </span>
          )}
          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
          <p className="text-accent font-semibold">{item.rate}</p>
        </div>
      ))}
    </div>
  )
}

function CaseStudySection({ section }: { section: CaseStudyData }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">📊</div>
        <div>
          <h3 className="font-semibold text-xl text-gray-900">{section.company}</h3>
          {section.title && <p className="text-gray-500 text-sm">{section.title}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase">Challenge</span>
          <p className="text-gray-700">{section.challenge}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase">Solution</span>
          <p className="text-gray-700">{section.solution}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase">Results</span>
          <ul className="mt-2 space-y-1">
            {section.results.map((result, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <span className="text-accent">✓</span> {result}
              </li>
            ))}
          </ul>
        </div>
        {section.quote && (
          <blockquote className="border-l-4 border-accent pl-4 italic text-gray-600 mt-4">
            "{section.quote}"
          </blockquote>
        )}
      </div>
    </div>
  )
}

function IndustryStatsGrid({ items }: { items?: IndustryStat[] }) {
  if (!items) return null
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div key={i} className="stat-card">
          <div className="stat-value">{item.stat}</div>
          <div className="stat-label">{item.description}</div>
        </div>
      ))}
    </div>
  )
}

function RateTiersSection({ tiers }: { tiers?: RateTier[] }) {
  if (!tiers) return null
  return (
    <div className="space-y-3">
      {tiers.map((tier, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <span className="font-medium text-gray-900">{tier.level}</span>
          <span className="text-accent font-semibold">{tier.rate}</span>
        </div>
      ))}
    </div>
  )
}

function IR35InfoSection({ section }: { section: IR35Data }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">⚠️</span>
        <h3 className="font-semibold text-lg text-gray-900">{section.title || 'IR35 Considerations'}</h3>
      </div>
      {section.inside_rate && section.outside_rate && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Inside IR35</div>
            <div className="font-semibold text-gray-900">{section.inside_rate}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Outside IR35</div>
            <div className="font-semibold text-accent">{section.outside_rate}</div>
          </div>
        </div>
      )}
      <p className="text-gray-700 text-sm">{section.note}</p>
    </div>
  )
}

function LocationRatesGrid({ items }: { items?: LocationRateItem[] }) {
  if (!items) return null
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div key={i} className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{item.location}</h3>
            <span className="text-accent font-semibold">{item.rate}</span>
          </div>
          {item.share && <p className="text-sm text-gray-500">{item.share}</p>}
          {item.note && <p className="text-sm text-gray-500">{item.note}</p>}
        </div>
      ))}
    </div>
  )
}

function SpecializationsGrid({ items }: { items?: SpecializationItem[] }) {
  if (!items) return null
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <div key={i} className="card relative">
          {item.badge && (
            <span className="absolute -top-2 -right-2 px-2 py-1 bg-accent text-white text-xs font-medium rounded-full">
              {item.badge}
            </span>
          )}
          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
          <p className="text-accent font-semibold mb-2">{item.rate}</p>
          {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
        </div>
      ))}
    </div>
  )
}

function CalculatorSection({ example }: { example?: CalculatorExample }) {
  if (!example) return null
  return (
    <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8">
      <h3 className="font-semibold text-lg text-gray-900 mb-6">Earnings Calculator Example</h3>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Day Rate</div>
          <div className="font-semibold text-gray-900">{example.day_rate}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Days/Week</div>
          <div className="font-semibold text-gray-900">{example.days_per_week}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Clients</div>
          <div className="font-semibold text-gray-900">{example.clients}</div>
        </div>
        <div className="bg-accent rounded-lg p-4 text-center">
          <div className="text-sm text-white/80 mb-1">Annual</div>
          <div className="font-bold text-xl text-white">{example.annual}</div>
        </div>
      </div>
    </div>
  )
}

// ===========================================
// Interactive Component Types
// ===========================================

interface RelatedResourceItem {
  icon: string
  title: string
  description: string
  href: string
}

interface CTALink {
  label: string
  href: string
}

interface ProseGridItem {
  icon: string
  title: string
  description: string
}

interface QualificationLink {
  name: string
  abbr: string
  url: string
}

// ===========================================
// Interactive Component Sections
// ===========================================

function RoleCalculatorSection({ role }: { role?: string }) {
  if (!role) return null
  return (
    <div className="max-w-4xl mx-auto">
      <RoleCalculator role={role} />
    </div>
  )
}

function VideoSection({ videoId, title, caption }: { videoId?: string; title?: string; caption?: string }) {
  if (!videoId) return null
  return (
    <div className="max-w-3xl mx-auto">
      {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
      <LazyYouTube videoId={videoId} title={title || 'Video'} />
      {caption && <p className="text-gray-500 text-sm mt-3">{caption}</p>}
    </div>
  )
}

function JobBoardSection({
  department,
  location,
  title,
  accentColor,
  jobsPerPage = 6,
}: {
  department?: string
  location?: string
  title?: string
  accentColor?: string
  jobsPerPage?: number
}) {
  return (
    <div className="max-w-6xl mx-auto">
      <EmbeddedJobBoard
        defaultDepartment={department}
        defaultLocation={location}
        title={title || 'Latest Jobs'}
        accentColor={accentColor || 'emerald'}
        jobsPerPage={jobsPerPage}
      />
    </div>
  )
}

function DefinitionBox({ label, content }: { label?: string; content?: string }) {
  if (!content) return null
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-8">
          {label && (
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
              {label}
            </h2>
          )}
          <p className="text-2xl font-light leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}

function RelatedResourcesGrid({ items }: { items?: RelatedResourceItem[] }) {
  if (!items) return null
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="bg-white p-6 rounded-lg border border-gray-200 hover:border-accent transition-colors group"
        >
          <span className="text-2xl mb-3 block">{item.icon}</span>
          <h3 className="font-bold text-gray-900 group-hover:text-accent mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </Link>
      ))}
    </div>
  )
}

function CTASection({
  title,
  subtitle,
  primaryLink,
  secondaryLink,
}: {
  title?: string
  subtitle?: string
  primaryLink?: CTALink
  secondaryLink?: CTALink
}) {
  if (!title) return null
  return (
    <div className="bg-gray-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6">{title}</h2>
        {subtitle && (
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{subtitle}</p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {primaryLink && (
            <Link
              href={primaryLink.href}
              className="px-8 py-4 bg-accent text-black font-bold rounded-lg hover:opacity-90 transition-colors"
            >
              {primaryLink.label}
            </Link>
          )}
          {secondaryLink && (
            <Link
              href={secondaryLink.href}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              {secondaryLink.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function ProseGridSection({ items }: { items?: ProseGridItem[] }) {
  if (!items) return null
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <div key={i} className="bg-gray-50 p-6 rounded-lg">
          <span className="text-2xl mb-2 block">{item.icon}</span>
          <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

function QualificationsLinks({ items, intro }: { items?: QualificationLink[]; intro?: string }) {
  if (!items) return null
  return (
    <div className="prose prose-lg max-w-none">
      {intro && <p>{intro}</p>}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <strong>{item.abbr}</strong> -{' '}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
