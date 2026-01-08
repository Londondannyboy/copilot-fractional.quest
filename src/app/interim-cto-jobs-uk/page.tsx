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
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Interim CTO Jobs UK 2025 | Interim Technology Director Roles',
  description: 'Interim CTO jobs UK for experienced technology leaders. Find interim Chief Technology Officer, interim IT Director and interim Tech Director roles. Day rates £900-£1,400. Updated daily.',
  keywords: 'interim cto jobs uk, interim cto, interim technology director jobs, interim it director jobs, interim chief technology officer, interim cto roles uk, interim tech jobs',
  alternates: { canonical: 'https://fractional.quest/interim-cto-jobs-uk' },
  openGraph: {
    title: 'Interim CTO Jobs UK | Technology Director Roles',
    description: 'Find interim CTO and Technology Director jobs across the UK. Day rates £900-£1,400.',
    url: 'https://fractional.quest/interim-cto-jobs-uk',
  },
}

const INTERIM_CTO_FAQS = [
  { question: "What is an interim CTO?", answer: "An interim CTO is a temporary Chief Technology Officer who provides senior technology leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CTOs who work part-time ongoing, interim CTOs typically work full-time for a defined period (3-12 months)." },
  { question: "What are typical interim CTO day rates in the UK?", answer: "Interim CTO day rates in the UK typically range from £900-£1,400 per day, depending on experience, sector, and complexity. Fintech and complex transformation roles command premium rates. Annual equivalent is £180,000-£280,000 for full-time interim engagements." },
  { question: "How long do interim CTO assignments last?", answer: "Most interim CTO assignments last 6-12 months, though they can range from 3 months (specific projects) to 18+ months (major transformations). Many interim CTOs work on rolling contracts." },
  { question: "What's the difference between interim and fractional CTO?", answer: "Interim CTOs typically work full-time for a fixed period (covering a gap or transformation), while fractional CTOs work part-time (1-3 days/week) on an ongoing basis. Interim roles are usually higher intensity but shorter duration." },
  { question: "What qualifications do interim CTOs need?", answer: "Most interim CTOs have 15+ years of technology experience including prior CTO/IT Director roles. Cloud architecture expertise, digital transformation experience, and a track record of successful delivery are highly valued." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Interim Jobs', href: '/fractional-jobs-uk' },
  { label: 'Interim CTO Jobs UK', href: '/interim-cto-jobs-uk' },
]

async function getInterimCTOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%technology director%' OR title ILIKE '%interim%it director%' OR title ILIKE '%interim%chief technology%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%technology%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 20, avgRate: 1100, remoteCount: Number(remoteCount?.count || 8) }
  } catch { return { total: 20, avgRate: 1100, remoteCount: 8 } }
}

async function getInterimCTOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%technology director%' OR title ILIKE '%interim%it director%' OR title ILIKE '%interim%chief technology%' OR (title ILIKE '%interim%' AND role_category = 'Engineering')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Engineering') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%cmo%' OR title ILIKE '%fractional%cto%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function InterimCTOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCTOStats(), getFeaturedCompanies(), getInterimCTOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CTO Jobs UK | Technology Director Roles 2025" description="Find interim CTO and Technology Director jobs across the UK." url="https://fractional.quest/interim-cto-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CTO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-cto-jobs-uk" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="Interim CTO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-cyan-800/90 to-blue-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Technology Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CTO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CTO</strong> and <strong>interim Technology Director</strong> roles across the UK. Premium interim tech leadership positions with day rates from £900-£1,400.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-cyan-900 font-bold rounded-lg hover:bg-cyan-50 transition-colors">Browse Interim CTO Jobs</a>
                <Link href="/fractional-cto-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CTO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-cyan-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CTO Roles</div></div>
            <div><div className="text-3xl font-black text-cyan-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-cyan-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-cyan-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-cyan-50 border-y border-cyan-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CTO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CTO & Technology Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live interim tech roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Engineering" ctaLink="/fractional-jobs-uk?department=Engineering" ctaText="View All Tech Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CTO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CTO Day Rate Calculator</h2></div><RoleCalculator role="cto" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CTOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-cyan-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CTO Market</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CTO</strong> market in the UK continues to grow as digital transformation accelerates across all sectors. Companies need experienced technology leaders to drive cloud migrations, modernize legacy systems, and build high-performing engineering teams.</p>
            <p>Unlike <Link href="/fractional-cto-jobs-uk" className="text-cyan-600 hover:underline">fractional CTO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months. This makes them ideal for major transformations, M&A technology integration, or bridging gaps between permanent hires.</p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CTOs</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Digital transformations</strong> - Cloud migrations, platform modernization</li>
              <li><strong>Scale-up challenges</strong> - Building engineering teams, establishing processes</li>
              <li><strong>M&A integration</strong> - Technology due diligence and integration</li>
              <li><strong>Leadership gaps</strong> - Covering departures during recruitment</li>
              <li><strong>Product launches</strong> - Critical technology delivery phases</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CTO Jobs</h4><p className="text-sm text-gray-600">Part-time CTO roles for portfolio careers</p></Link>
              <Link href="/fractional-cto-salary" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">CTO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CTO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CTO</h4><p className="text-sm text-gray-600">Guide to hiring tech leaders</p></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CTOs</h2></div><IR35Calculator defaultDayRate={1100} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CTO Jobs UK</h2></div><FAQ items={INTERIM_CTO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cto" />
    </div>
  )
}
