import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/seo/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { ServerJobGrid } from '@/components/ServerJobGrid'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { JobListingSchema } from '@/components/seo/JobPostingSchema'
import { WebPageSchema, LastUpdatedBadge } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Interim CFO Jobs UK',
  description: 'Interim CFO jobs UK for finance leaders. Find interim Chief Financial Officer and Finance Director roles. £900-£1,500/day.',
  keywords: 'interim cfo jobs uk, interim cfo, interim finance director jobs, interim fd jobs, interim chief financial officer, interim cfo roles uk, interim finance jobs',
  alternates: { canonical: 'https://fractional.quest/interim-cfo-jobs-uk' },
  openGraph: {
    title: 'Interim CFO Jobs UK | Finance Director Roles',
    description: 'Find interim CFO and Finance Director jobs across the UK. Day rates £900-£1,500.',
    url: 'https://fractional.quest/interim-cfo-jobs-uk',
  },
}

const INTERIM_CFO_FAQS = [
  {
    question: "What is an interim CFO?",
    answer: "An interim CFO is a temporary Chief Financial Officer who provides senior finance leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CFOs who work part-time ongoing, interim CFOs typically work full-time for a defined period (3-12 months)."
  },
  {
    question: "What are typical interim CFO day rates in the UK?",
    answer: "Interim CFO day rates in the UK typically range from £900-£1,500 per day, depending on experience, sector, and complexity. PE-backed companies and complex situations command premium rates. Annual equivalent is £180,000-£300,000 for full-time interim engagements."
  },
  {
    question: "How long do interim CFO assignments last?",
    answer: "Most interim CFO assignments last 6-12 months, though they can range from 3 months (crisis situations) to 18+ months (complex transformations). Many interim CFOs work on a rolling contract basis with notice periods."
  },
  {
    question: "What's the difference between interim and fractional CFO?",
    answer: "Interim CFOs typically work full-time for a fixed period (covering a gap or transformation), while fractional CFOs work part-time (1-3 days/week) on an ongoing basis. Interim roles are usually higher intensity but shorter duration."
  },
  {
    question: "What qualifications do interim CFOs need?",
    answer: "Most interim CFOs are qualified accountants (ACA, ACCA, CIMA) with 15+ years of experience including prior CFO/FD roles. PE transaction experience, sector expertise, and a track record of successful interim assignments are highly valued."
  },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Interim Jobs', href: '/fractional-jobs-uk' },
  { label: 'Interim CFO Jobs UK', href: '/interim-cfo-jobs-uk' },
]

async function getInterimCFOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`
      SELECT COUNT(*) as count FROM jobs
      WHERE is_active = true
        AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%finance director%' OR title ILIKE '%interim%fd%' OR title ILIKE '%interim%chief financial%')
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%England%')
    `
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`
      SELECT COUNT(*) as count FROM jobs
      WHERE is_active = true
        AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%finance director%' OR title ILIKE '%interim%fd%')
        AND (is_remote = true OR workplace_type ILIKE '%remote%')
        AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
    `
    return { total: total || 25, avgRate: 1200, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 25, avgRate: 1200, remoteCount: 5 } }
}

async function getInterimCFOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date
      FROM jobs WHERE is_active = true
        AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%finance director%' OR title ILIKE '%interim%fd%' OR title ILIKE '%interim%chief financial%' OR (title ILIKE '%interim%' AND role_category = 'Finance'))
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Edinburgh%')
      ORDER BY posted_date DESC NULLS LAST LIMIT 20
    `
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name FROM jobs
      WHERE is_active = true
        AND (title ILIKE '%interim%' AND role_category = 'Finance')
        AND company_name IS NOT NULL
        AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
      ORDER BY company_name LIMIT 20
    `
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date
      FROM jobs WHERE is_active = true
        AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%cmo%' OR title ILIKE '%interim%coo%' OR title ILIKE '%fractional%cfo%')
        AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
      ORDER BY posted_date DESC NULLS LAST LIMIT 15
    `
    return jobs
  } catch { return [] }
}

export default async function InterimCFOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([
    getInterimCFOStats(), getFeaturedCompanies(), getInterimCFOJobs(), getRelatedJobs()
  ])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Interim CFO Jobs UK | Interim Finance Director Roles 2026"
        description="Find interim CFO and Finance Director jobs across the UK. Premium interim finance leadership roles."
        url="https://fractional.quest/interim-cfo-jobs-uk"
        dateModified={lastUpdatedDate}
      />
      <FAQPageSchema faqs={INTERIM_CFO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-cfo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
          alt="Interim CFO Jobs UK - Finance Director Roles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-teal-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Interim Finance Leadership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Interim CFO Jobs UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Find <strong>interim CFO</strong> and <strong>interim Finance Director</strong> roles across the UK.
                Premium interim finance leadership positions with day rates from £900-£1,500.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                  Browse Interim CFO Jobs
                </a>
                <Link href="/fractional-cfo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  Fractional CFO Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-emerald-400">{stats.total}+</div>
              <div className="text-gray-400 text-sm">Interim CFO Roles</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">£{stats.avgRate}</div>
              <div className="text-gray-400 text-sm">Avg Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">{stats.remoteCount}</div>
              <div className="text-gray-400 text-sm">Remote/Hybrid</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">
                <LastUpdatedBadge date={lastUpdatedDate} />
              </div>
              <div className="text-gray-400 text-sm">Last Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Jobs Ticker */}
      {jobs.length > 0 && (
        <section className="bg-emerald-50 border-y border-emerald-100 py-4 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <HotJobsLines
              jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))}
              title="Latest Interim CFO Jobs"
              maxJobs={10}
            />
          </div>
        </section>
      )}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CFO & Finance Director Jobs UK</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live interim finance roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Finance" ctaLink="/fractional-jobs-uk?department=Finance" ctaText="View All Finance Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CFO Rates</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CFO Day Rate Calculator</h2>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CFOs</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-emerald-500 transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CFO Market</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>interim CFO</strong> market in the UK has grown significantly as companies recognise the value of experienced finance leadership during periods of change. Whether covering a permanent CFO departure, leading a transformation, or preparing for M&A activity, interim CFOs provide critical expertise when it's needed most.
            </p>
            <p>
              Unlike <Link href="/fractional-cfo-jobs-uk" className="text-emerald-600 hover:underline">fractional CFO roles</Link> which involve ongoing part-time engagement, interim CFO positions are typically full-time assignments lasting 6-12 months. This makes them ideal for executives who prefer intensive, project-based work with clear start and end points.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CFOs</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Leadership gaps</strong> - Covering departures while recruiting permanent replacements</li>
              <li><strong>Transformations</strong> - Finance system implementations, process improvements</li>
              <li><strong>M&A activity</strong> - Pre-deal preparation, post-merger integration</li>
              <li><strong>PE transactions</strong> - Portfolio company transformations, exit preparation</li>
              <li><strong>Crisis management</strong> - Turnarounds, restructuring, cash management</li>
              <li><strong>IPO preparation</strong> - Getting finance function ready for public markets</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors">
                <h4 className="font-bold text-gray-900">Fractional CFO Jobs</h4>
                <p className="text-sm text-gray-600">Part-time CFO roles for portfolio careers</p>
              </Link>
              <Link href="/fractional-cfo-salary" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors">
                <h4 className="font-bold text-gray-900">CFO Salary Guide</h4>
                <p className="text-sm text-gray-600">Day rates and compensation benchmarks</p>
              </Link>
              <Link href="/fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors">
                <h4 className="font-bold text-gray-900">What is a Fractional CFO?</h4>
                <p className="text-sm text-gray-600">Understanding the fractional model</p>
              </Link>
              <Link href="/hire-fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors">
                <h4 className="font-bold text-gray-900">Hire a CFO</h4>
                <p className="text-sm text-gray-600">Guide to hiring fractional finance leaders</p>
              </Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">External Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors">
                <h4 className="font-bold text-gray-900">ICAEW</h4>
                <p className="text-sm text-gray-600">Institute of Chartered Accountants</p>
              </a>
              <a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors">
                <h4 className="font-bold text-gray-900">ACCA</h4>
                <p className="text-sm text-gray-600">Global Accounting Body</p>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CFOs</h2>
            <p className="text-gray-600 mt-2">Understand your take-home pay inside vs outside IR35</p>
          </div>
          <IR35Calculator defaultDayRate={1200} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CFO Jobs UK</h2>
          </div>
          <FAQ items={INTERIM_CFO_FAQS} title="" />
        </div>
      </section>

      {/* E-E-A-T Components */}
      <ExpertProfile />
      <ExpertProfileSchema />
      <CaseStudy />
      <CaseStudySchema />

      {/* Related Jobs */}
      {(relatedJobs as any[]).length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2>
            <HotJobsLines
              jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))}
              title="Other Interim Roles"
              maxJobs={15}
              viewAllHref="/fractional-jobs-uk"
              viewAllText="View all UK jobs"
            />
          </div>
        </section>
      )}

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
