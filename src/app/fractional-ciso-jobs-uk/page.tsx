import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ, CISO_FAQS } from '@/components/seo/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleNews } from '@/components/RoleNews'
import { ServerJobGrid } from '@/components/ServerJobGrid'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { JobListingSchema } from '@/components/seo/JobPostingSchema'
import { getRoleBreadcrumbs } from '@/lib/seo-config'
import { WebPageSchema, LastUpdatedBadge } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CISO Jobs UK | Part-Time Security Leadership Roles 2025',
  description: 'Fractional CISO jobs UK for experienced security leaders. Part-time CISO and fractional security director jobs paying £900-£1,500/day. Browse fractional CISO UK roles and cybersecurity leadership positions.',
  keywords: 'fractional ciso jobs uk, fractional ciso uk, fractional security officer, part time ciso, fractional security jobs, ciso salary uk, fractional head of security',
  alternates: { canonical: 'https://fractional.quest/fractional-ciso-jobs-uk' },
  openGraph: {
    title: 'Fractional CISO Jobs UK | Part-Time Security Leadership Roles',
    description: 'Fractional CISO jobs UK & fractional security director positions paying £900-£1,500/day.',
    url: 'https://fractional.quest/fractional-ciso-jobs-uk',
  },
}

async function getSecurityStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, avgRateResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Security' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS BIGINT)) as avg FROM jobs WHERE is_active = true AND role_category = 'Security' AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Security' AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return { total: parseInt((totalResult[0] as any)?.count || '0'), avgRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '1200')), remoteCount: parseInt((remoteResult[0] as any)?.count || '0') }
  } catch { return { total: 15, avgRate: 1200, remoteCount: 6 } }
}

async function getSecurityJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, country, city, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week, salary_min, salary_max, salary_currency, description_snippet FROM jobs WHERE is_active = true AND role_category = 'Security' AND title NOT ILIKE '%interim%' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name FROM jobs
      WHERE is_active = true AND role_category = 'Security' AND company_name IS NOT NULL
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%')
      ORDER BY company_name LIMIT 30
    `
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND role_category IS NOT NULL AND role_category != 'Security' AND title NOT ILIKE '%interim%' AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function FractionalCisoJobsUkPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getSecurityStats(), getFeaturedCompanies(), getSecurityJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CISO Jobs UK | Part-Time Security Leadership" description="Fractional CISO jobs UK and fractional security director positions." url="https://fractional.quest/fractional-ciso-jobs-uk" dateModified={lastUpdatedDate} itemCount={stats.total} />
      <FAQPageSchema faqs={CISO_FAQS} />
      <JobListingSchema jobs={jobs} pageUrl="https://fractional.quest/fractional-ciso-jobs-uk" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80" alt="Fractional CISO UK - Part-time Security Director jobs" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/85 via-rose-500/70 to-orange-500/50" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={getRoleBreadcrumbs('ciso', 'jobs')} className="mb-8" />
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Fractional Security Jobs</span>
                <LastUpdatedBadge date={lastUpdatedDate} className="text-white/70" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"><strong>Fractional CISO Jobs UK</strong> & Part-Time Security Roles</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8"><strong>Fractional CISO UK</strong> and <strong>part-time security director</strong> roles for experienced cybersecurity leaders. Browse <strong>fractional security jobs</strong> with rates of £900-£1,500/day.</p>
              <Link href="#jobs" className="px-8 py-4 bg-white text-red-700 font-bold rounded-lg hover:bg-gray-100 transition-colors inline-block">Browse Jobs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-white">{stats.total}+</div><div className="text-sm text-gray-400">Live Roles</div></div>
            <div><div className="text-3xl font-bold text-white">£{stats.avgRate}</div><div className="text-sm text-gray-400">Avg Day Rate</div></div>
            <div><div className="text-3xl font-bold text-white">{stats.remoteCount}</div><div className="text-sm text-gray-400">Remote Roles</div></div>
            <div><div className="text-3xl font-bold text-white">2-3 days</div><div className="text-sm text-gray-400">Avg Engagement</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest CISO Jobs" maxJobs={12} viewAllHref="#jobs" viewAllText="See all jobs" />
          </div>
        </section>
      )}

      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CISO Jobs UK & Security Roles</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live fractional CISO and security jobs</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Security" ctaLink="/fractional-jobs-uk?department=Security" ctaText={`View All ${stats.total}+ Fractional Security Jobs`} maxJobs={9} showViewAll={true} />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">CISO Salary UK</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">CISO Salary UK Calculator - Fractional Security Rates</h2>
          </div>
          <RoleCalculator role="ciso" />
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Fractional CISOs</h2>
              <p className="text-gray-600 mt-2">These UK companies are actively looking for fractional CISO and security leadership talent</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-red-500 transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Why Fractional CISO Roles Are Critical</h2>
            <p>The <Link href="/fractional-ciso" className="text-red-600 hover:underline">fractional CISO</Link> model enables companies to access senior cybersecurity leadership without the full-time cost. With increasing cyber threats and regulatory requirements like <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">GDPR</a>, SOC 2, and ISO 27001, organisations need expert security guidance during critical phases. The <a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">NCSC</a> provides guidance on building cyber resilience.</p>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Typical Fractional CISO Responsibilities</h3>
            <ul>
              <li><strong>Security Strategy:</strong> Developing comprehensive cybersecurity roadmaps</li>
              <li><strong>Risk Assessment:</strong> Identifying and mitigating security vulnerabilities</li>
              <li><strong>Compliance:</strong> Achieving SOC 2, ISO 27001, GDPR compliance</li>
              <li><strong>Incident Response:</strong> Building and testing security incident procedures</li>
              <li><strong>Team Building:</strong> Hiring and mentoring security teams</li>
            </ul>
            <p className="mt-6">Review <Link href="/fractional-ciso-salary" className="text-red-600 hover:underline">fractional CISO salary benchmarks</Link> for current market rates. Day rates typically range from £900-£1,500 depending on certifications and compliance experience. Our <Link href="/hire-fractional-ciso" className="text-red-600 hover:underline">guide to hiring a fractional CISO</Link> covers vetting and evaluation.</p>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">UK Resources for Security Leaders</h3>
            <ul>
              <li><a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">NCSC</a> — UK National Cyber Security Centre</li>
              <li><a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">ICO</a> — Information Commissioner's Office</li>
              <li><a href="https://www.isaca.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">ISACA</a> — CISM and security certifications</li>
              <li><a href="https://www.isc2.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">ISC2</a> — CISSP certifications</li>
            </ul>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional Security Jobs by Location</h3>
            <p>Find fractional CISO and security director jobs across the UK:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mt-4">
              <Link href="/fractional-jobs-london" className="text-red-600 hover:underline text-sm">London</Link>
              <Link href="/fractional-jobs-uk?location=Manchester" className="text-red-600 hover:underline text-sm">Manchester</Link>
              <Link href="/fractional-jobs-uk?location=Birmingham" className="text-red-600 hover:underline text-sm">Birmingham</Link>
              <Link href="/fractional-jobs-uk?location=Edinburgh" className="text-red-600 hover:underline text-sm">Edinburgh</Link>
              <Link href="/fractional-jobs-uk?location=Bristol" className="text-red-600 hover:underline text-sm">Bristol</Link>
              <Link href="/fractional-jobs-uk?location=Leeds" className="text-red-600 hover:underline text-sm">Leeds</Link>
              <Link href="/fractional-jobs-uk?location=Cambridge" className="text-red-600 hover:underline text-sm">Cambridge</Link>
              <Link href="/fractional-jobs-uk?remote=true" className="text-red-600 hover:underline text-sm">Remote UK</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">UK IR35 Calculator for Fractional CISO Jobs</h2>
          <IR35Calculator defaultDayRate={1200} />
        </div>
      </section>

      {/* Security News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="Security" title="Latest UK Fractional Security & CISO News" limit={3} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CISO UK & Part-Time Security Jobs</h2>
            <p className="text-gray-600 mt-4">Answers about <strong>fractional CISO jobs</strong>, <strong>fractional security director jobs</strong>, and <strong>CISO salary UK</strong> rates</p>
          </div>
          <FAQ items={CISO_FAQS} title="" />
        </div>
      </section>

      {/* E-E-A-T: Expert Profile */}
      <ExpertProfile />
      <ExpertProfileSchema />

      {/* E-E-A-T: Case Study */}
      <CaseStudy />
      <CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Other C-Suite Opportunities</h2>
            <HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Related Executive Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" />
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Fractional CISO Jobs UK</h2>
          <p className="text-xl text-gray-300 mb-10">Create your profile and get matched with companies seeking fractional security leadership.</p>
          <Link href="/handler/sign-up" className="px-10 py-5 bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-400 transition-colors inline-block">Browse Fractional CISO Jobs</Link>
        </div>
      </section>

      <RoleContentHub currentRole="ciso" />
    </div>
  )
}
