import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ, CHRO_FAQS } from '@/components/seo/FAQ'
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
  title: 'Fractional CHRO Jobs UK | Part-Time HR Director & People Leadership Roles 2025',
  description: 'Fractional CHRO jobs UK for experienced HR leaders. Part-time CHRO and fractional HR director jobs paying £600-£1,100/day. Browse fractional CHRO UK roles and HR leadership positions.',
  keywords: 'fractional chro jobs uk, fractional chro uk, fractional hr director, part time chro, fractional hr jobs, chro salary uk, fractional people officer',
  alternates: {
    canonical: 'https://fractional.quest/fractional-chro-jobs-uk',
  },
  openGraph: {
    title: 'Fractional CHRO Jobs UK | Part-Time HR Leadership Roles',
    description: 'Fractional CHRO jobs UK & fractional HR director positions paying £600-£1,100/day.',
    url: 'https://fractional.quest/fractional-chro-jobs-uk',
  },
}

async function getHRStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, avgRateResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'HR' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS BIGINT)) as avg FROM jobs WHERE is_active = true AND role_category = 'HR' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'HR' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%') AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      avgRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '850')),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 25, avgRate: 850, remoteCount: 10 }
  }
}

async function getHRJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, country, city, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date, hours_per_week, salary_min, salary_max, salary_currency, description_snippet
      FROM jobs WHERE is_active = true AND role_category = 'HR' AND title NOT ILIKE '%interim%'
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%')
      ORDER BY posted_date DESC NULLS LAST LIMIT 20
    `
    return jobs as any[]
  } catch {
    return []
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true
        AND role_category = 'HR'
        AND company_name IS NOT NULL
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%')
      ORDER BY company_name
      LIMIT 30
    `
    return companies.map((c: any) => c.company_name)
  } catch {
    return []
  }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date
      FROM jobs WHERE is_active = true AND role_category IS NOT NULL AND role_category != 'HR' AND title NOT ILIKE '%interim%'
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
      ORDER BY posted_date DESC NULLS LAST LIMIT 15
    `
    return jobs
  } catch {
    return []
  }
}

export default async function FractionalChroJobsUkPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getHRStats(), getFeaturedCompanies(), getHRJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CHRO Jobs UK | Part-Time HR Leadership" description="Fractional CHRO jobs UK and fractional HR director positions." url="https://fractional.quest/fractional-chro-jobs-uk" dateModified={lastUpdatedDate} itemCount={stats.total} />
      <FAQPageSchema faqs={CHRO_FAQS} />
      <JobListingSchema jobs={jobs} pageUrl="https://fractional.quest/fractional-chro-jobs-uk" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80" alt="Fractional CHRO UK - Part-time HR Director jobs" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/85 via-violet-500/70 to-fuchsia-500/50" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={getRoleBreadcrumbs('chro', 'jobs')} className="mb-8" />
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Fractional HR Jobs</span>
                <LastUpdatedBadge date={lastUpdatedDate} className="text-white/70" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"><strong>Fractional CHRO Jobs UK</strong> & Part-Time HR Director Roles</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8"><strong>Fractional CHRO UK</strong> and <strong>part-time HR director</strong> roles for experienced people leaders. Browse <strong>fractional HR jobs</strong> with rates of £600-£1,100/day.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#jobs" className="px-8 py-4 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">Browse Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-white">{stats.total}+</div><div className="text-sm text-gray-400">Live Roles</div></div>
            <div><div className="text-3xl font-bold text-white">£{stats.avgRate}</div><div className="text-sm text-gray-400">Avg Day Rate</div></div>
            <div><div className="text-3xl font-bold text-white">{stats.remoteCount}</div><div className="text-sm text-gray-400">Remote Roles</div></div>
            <div><div className="text-3xl font-bold text-white">2-3 days</div><div className="text-sm text-gray-400">Avg Engagement</div></div>
          </div>
        </div>
      </section>

      {/* Hot Jobs */}
      {jobs.length > 0 && (
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest CHRO Jobs" maxJobs={12} viewAllHref="#jobs" viewAllText="See all jobs" />
          </div>
        </section>
      )}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CHRO Jobs UK & Part-Time HR Roles</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live fractional CHRO and HR director jobs</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="HR" ctaLink="/fractional-jobs-uk?department=HR" ctaText={`View All ${stats.total}+ Fractional HR Jobs`} maxJobs={9} showViewAll={true} />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">CHRO Salary UK</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">CHRO Salary UK Calculator - Fractional HR Rates</h2>
          </div>
          <RoleCalculator role="chro" />
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Fractional CHROs</h2>
              <p className="text-gray-600 mt-2">These UK companies are actively looking for fractional CHRO and HR director talent</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-purple-500 transition-colors cursor-default">
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
            <h2 className="text-3xl font-black text-gray-900 mb-6">Why Fractional CHRO Jobs Are Growing in the UK</h2>
            <p>The demand for <Link href="/fractional-chro" className="text-purple-600 hover:underline">fractional CHRO</Link> and <strong>part-time HR director</strong> roles has surged as UK companies recognise the need for senior people leadership during scaling phases. From building culture to implementing performance management systems, fractional HR leaders bring the expertise needed without full-time costs. According to <a href="https://www.cipd.org/uk/knowledge/reports/people-profession-report/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">CIPD research</a>, the demand for flexible HR leadership has increased 40% since 2021.</p>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">What Does a Fractional CHRO Do?</h3>
            <ul>
              <li><strong>People Strategy:</strong> Developing HR strategies aligned with business growth</li>
              <li><strong>Talent Acquisition:</strong> Building recruitment processes and employer branding</li>
              <li><strong>Culture Development:</strong> Creating and maintaining company culture at scale</li>
              <li><strong>Performance Management:</strong> Implementing review cycles and feedback systems</li>
              <li><strong>Compliance:</strong> Ensuring <a href="https://www.gov.uk/browse/employing-people" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">UK employment law</a> compliance and HR policies</li>
            </ul>
            <p className="mt-6">Understanding <Link href="/fractional-chro-salary" className="text-purple-600 hover:underline">fractional CHRO salary rates</Link> is essential when evaluating opportunities. Day rates typically range from £600-£1,100 depending on experience and sector. If you're looking to <Link href="/hire-fractional-chro" className="text-purple-600 hover:underline">hire a fractional CHRO</Link>, we have a complete guide to the process.</p>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">UK Resources for HR Leaders</h3>
            <ul>
              <li><a href="https://www.cipd.org/uk/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">CIPD</a> — Chartered Institute of Personnel and Development</li>
              <li><a href="https://www.acas.org.uk/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">ACAS</a> — Advisory, Conciliation and Arbitration Service</li>
              <li><a href="https://www.gov.uk/browse/employing-people" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">GOV.UK Employment</a> — Official UK employment guidance</li>
            </ul>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional HR Jobs by Location</h3>
            <p>Find fractional CHRO and HR director jobs across the UK:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mt-4">
              <Link href="/fractional-jobs-london" className="text-purple-600 hover:underline text-sm">London</Link>
              <Link href="/fractional-jobs-uk?location=Manchester" className="text-purple-600 hover:underline text-sm">Manchester</Link>
              <Link href="/fractional-jobs-uk?location=Birmingham" className="text-purple-600 hover:underline text-sm">Birmingham</Link>
              <Link href="/fractional-jobs-uk?location=Edinburgh" className="text-purple-600 hover:underline text-sm">Edinburgh</Link>
              <Link href="/fractional-jobs-uk?location=Bristol" className="text-purple-600 hover:underline text-sm">Bristol</Link>
              <Link href="/fractional-jobs-uk?location=Leeds" className="text-purple-600 hover:underline text-sm">Leeds</Link>
              <Link href="/fractional-jobs-uk?location=Glasgow" className="text-purple-600 hover:underline text-sm">Glasgow</Link>
              <Link href="/fractional-jobs-uk?remote=true" className="text-purple-600 hover:underline text-sm">Remote UK</Link>
            </div>
          </article>
        </div>
      </section>

      {/* IR35 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK IR35 Calculator for Fractional CHRO Jobs</h2>
          </div>
          <IR35Calculator defaultDayRate={850} />
        </div>
      </section>

      {/* HR News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="HR" title="Latest UK Fractional HR Jobs & CHRO News" limit={3} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CHRO UK & Part-Time HR Jobs</h2>
            <p className="text-gray-600 mt-4">Answers about <strong>fractional CHRO jobs</strong>, <strong>fractional HR director jobs</strong>, and <strong>CHRO salary UK</strong> rates</p>
          </div>
          <FAQ items={CHRO_FAQS} title="" />
        </div>
      </section>

      {/* E-E-A-T: Expert Profile */}
      <ExpertProfile />
      <ExpertProfileSchema />

      {/* E-E-A-T: Case Study */}
      <CaseStudy />
      <CaseStudySchema />

      {/* Related Jobs */}
      {(relatedJobs as any[]).length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Other C-Suite Opportunities</h2>
            <HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Related Executive Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Fractional CHRO Jobs UK</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Create your profile and get matched with UK companies seeking fractional HR leadership.</p>
          <Link href="/handler/sign-up" className="px-10 py-5 bg-purple-500 text-white font-bold uppercase tracking-wider hover:bg-purple-400 transition-colors inline-block">Browse Fractional CHRO Jobs</Link>
        </div>
      </section>

      <RoleContentHub currentRole="chro" />
    </div>
  )
}
