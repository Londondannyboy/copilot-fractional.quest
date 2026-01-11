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
  title: 'Interim COO Jobs UK 2025 | Interim Operations Director Roles',
  description: 'Interim COO jobs UK for experienced operations leaders. Find interim Chief Operating Officer, interim Operations Director roles. Day rates £900-£1,300. Updated daily.',
  keywords: 'interim coo jobs uk, interim coo, interim operations director jobs, interim chief operating officer, interim coo roles uk, interim operations jobs',
  alternates: { canonical: 'https://fractional.quest/interim-coo-jobs-uk' },
  openGraph: {
    title: 'Interim COO Jobs UK | Operations Director Roles',
    description: 'Find interim COO and Operations Director jobs across the UK. Day rates £900-£1,300.',
    url: 'https://fractional.quest/interim-coo-jobs-uk',
  },
}

const INTERIM_COO_FAQS = [
  { question: "What is an interim COO?", answer: "An interim COO is a temporary Chief Operating Officer who provides senior operations leadership during transitions, transformations, or turnarounds. Unlike fractional COOs who work part-time ongoing, interim COOs typically work full-time for a defined period (3-12 months)." },
  { question: "What are typical interim COO day rates in the UK?", answer: "Interim COO day rates in the UK typically range from £900-£1,300 per day, depending on experience, sector, and complexity. Turnaround and transformation expertise commands premium rates." },
  { question: "How long do interim COO assignments last?", answer: "Most interim COO assignments last 6-12 months, covering operational transformations, integrations, or leadership transitions. Complex turnarounds may extend longer." },
  { question: "What's the difference between interim and fractional COO?", answer: "Interim COOs typically work full-time for a fixed period, while fractional COOs work part-time (1-3 days/week) on an ongoing basis. Interim roles suit intensive operational transformations." },
  { question: "What qualifications do interim COOs need?", answer: "Most interim COOs have 15+ years of operations experience including prior COO/Operations Director roles. Lean/Six Sigma expertise, transformation experience, and sector knowledge are highly valued." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim COO Jobs UK', href: '/interim-coo-jobs-uk' }]

async function getInterimCOOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%coo%' OR title ILIKE '%interim%operations director%' OR title ILIKE '%interim%chief operating%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%coo%' OR title ILIKE '%interim%operations%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 15), avgRate: 1050, remoteCount: Number(remoteCount?.count || 4) }
  } catch { return { total: 15, avgRate: 1050, remoteCount: 4 } }
}

async function getInterimCOOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%coo%' OR title ILIKE '%interim%operations director%' OR title ILIKE '%interim%chief operating%' OR (title ILIKE '%interim%' AND role_category = 'Operations')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Operations') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%cto%' OR title ILIKE '%fractional%coo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCOOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCOOStats(), getFeaturedCompanies(), getInterimCOOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim COO Jobs UK | Operations Director Roles 2025" description="Find interim COO and Operations Director jobs across the UK." url="https://fractional.quest/interim-coo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_COO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-coo-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80" alt="Interim COO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-gray-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Operations Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim COO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim COO</strong> and <strong>interim Operations Director</strong> roles across the UK. Premium interim operations leadership positions with day rates from £900-£1,300.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors">Browse Interim COO Jobs</a>
                <Link href="/fractional-coo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional COO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-slate-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim COO Roles</div></div><div><div className="text-3xl font-black text-slate-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-slate-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-slate-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-slate-50 border-y border-slate-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim COO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim COO & Operations Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim operations roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Operations" ctaLink="/fractional-jobs-uk?department=Operations" ctaText="View All Operations Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim COO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim COO Day Rate Calculator</h2></div><RoleCalculator role="coo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim COOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-slate-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim COO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim COO</strong> market in the UK has grown as companies navigate operational challenges, from supply chain disruption to digital transformation. Experienced operations leaders are in demand for turnarounds, integrations, and scale-up challenges.</p><p>Unlike <Link href="/fractional-coo-jobs-uk" className="text-slate-600 hover:underline">fractional COO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months, ideal for intensive operational transformations.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim COOs</h3><ul className="space-y-2 text-gray-600"><li><strong>Operational turnarounds</strong> - Performance improvement, cost reduction</li><li><strong>M&A integration</strong> - Post-merger operational integration</li><li><strong>Scale-up challenges</strong> - Building operations for growth</li><li><strong>Digital transformation</strong> - Modernizing operations and processes</li><li><strong>Leadership gaps</strong> - Covering departures during recruitment</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-coo-jobs-uk" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional COO Jobs</h4><p className="text-sm text-gray-600">Part-time COO roles</p></Link><Link href="/fractional-coo-salary" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">COO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-coo" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional COO?</h4><p className="text-sm text-gray-600">Understanding the model</p></Link><Link href="/hire-fractional-coo" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a COO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim COOs</h2></div><IR35Calculator defaultDayRate={1050} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim COO Jobs UK</h2></div><FAQ items={INTERIM_COO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="coo" />
    </div>
  )
}
