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
  title: 'Interim CSO Jobs UK',
  description: 'Interim CSO and Strategy Director jobs UK. Find interim Chief Strategy Officer and Strategy Director roles. £900-£1,400/day.',
  keywords: 'interim cso jobs uk, interim cso, interim strategy director, interim chief strategy officer',
  alternates: { canonical: 'https://fractional.quest/interim-cso-jobs-uk' },
  openGraph: {
    title: 'Interim CSO Jobs UK | Strategy Director Roles',
    description: 'Find interim CSO and Strategy Director jobs across the UK. Day rates £900-£1,400.',
    url: 'https://fractional.quest/interim-cso-jobs-uk',
  },
}

const INTERIM_CSO_FAQS = [
  { question: "What is an interim CSO?", answer: "An interim CSO is a temporary Chief Strategy Officer who provides senior strategy leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CSOs who work part-time ongoing, interim CSOs typically work full-time for a defined period (6-12 months) to drive strategic initiatives." },
  { question: "What are typical interim CSO day rates in the UK?", answer: "Interim CSO day rates in the UK typically range from £900-£1,400 per day, depending on company size, sector, and complexity. M&A strategy, corporate restructuring, and PE-backed transformation expertise command premium rates." },
  { question: "How long do interim CSO assignments last?", answer: "Most interim CSO assignments last 6-12 months, covering strategic transformations, M&A integration, market entry planning, or business turnaround situations. Complex restructuring engagements may extend to 18 months." },
  { question: "What's the difference between interim and fractional CSO?", answer: "Interim CSOs typically work full-time for a fixed period, while fractional CSOs work part-time (1-3 days/week) on an ongoing basis. Interim roles suit major strategic transformations, M&A activity, or organisational restructuring." },
  { question: "What qualifications do interim CSOs need?", answer: "Most interim CSOs have 15+ years of strategy experience including prior CSO, Strategy Director, or senior consulting roles. MBA qualifications, M&A experience, and sector-specific expertise (PE, corporate strategy, digital transformation) are highly valued." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim CSO Jobs UK', href: '/interim-cso-jobs-uk' }]

async function getInterimCSOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cso%' OR title ILIKE '%interim%strategy director%' OR title ILIKE '%interim%chief strategy%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cso%' OR title ILIKE '%interim%strategy director%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 8), avgRate: 1150, remoteCount: Number(remoteCount?.count || 4) }
  } catch { return { total: 8, avgRate: 1150, remoteCount: 4 } }
}

async function getInterimCSOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cso%' OR title ILIKE '%interim%strategy director%' OR title ILIKE '%interim%chief strategy%' OR (title ILIKE '%interim%' AND role_category = 'Operations')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
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
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%coo%' OR title ILIKE '%interim%ceo%' OR title ILIKE '%fractional%cso%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCSOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCSOStats(), getFeaturedCompanies(), getInterimCSOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CSO Jobs UK | Strategy Director Roles 2026" description="Find interim CSO and Strategy Director jobs across the UK." url="https://fractional.quest/interim-cso-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CSO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-cso-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" alt="Interim CSO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-500/90 to-violet-500/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Strategy Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CSO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CSO</strong> and <strong>interim Strategy Director</strong> roles across the UK. Premium interim strategy leadership positions with day rates from £900-£1,400.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors">Browse Interim CSO Jobs</a>
                <Link href="/fractional-coo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional COO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-blue-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CSO Roles</div></div><div><div className="text-3xl font-black text-blue-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-blue-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-blue-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-blue-50 border-y border-blue-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CSO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CSO & Strategy Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim strategy roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Operations" ctaLink="/fractional-coo-jobs-uk" ctaText="View All Strategy Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CSO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CSO Day Rate Calculator</h2></div><RoleCalculator role="coo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CSOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-blue-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CSO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CSO</strong> market in the UK has grown significantly as companies navigate market disruption, M&A activity, and the need for experienced strategy leadership. Interim CSOs provide immediate expertise during critical strategic inflection points.</p><p>Unlike <Link href="/fractional-coo-jobs-uk" className="text-blue-600 hover:underline">fractional COO roles</Link>, interim CSO positions are typically full-time assignments lasting 6-12 months, ideal for strategic transformations, market entry planning, or post-merger integration.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CSOs</h3><ul className="space-y-2 text-gray-600"><li><strong>Strategic transformation</strong> - Pivoting business models or entering new markets</li><li><strong>M&A integration</strong> - Post-merger strategic alignment and value creation</li><li><strong>PE portfolio value creation</strong> - Driving growth strategy for private equity-backed businesses</li><li><strong>Corporate restructuring</strong> - Refocusing strategy during turnaround situations</li><li><strong>Leadership gaps</strong> - Covering departures during senior recruitment</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-coo-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional COO Jobs</h4><p className="text-sm text-gray-600">Part-time operations roles</p></Link><Link href="/interim-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CEO Jobs</h4><p className="text-sm text-gray-600">Interim chief executive roles</p></Link><Link href="/fractional-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CEO Jobs</h4><p className="text-sm text-gray-600">Part-time CEO positions</p></Link><Link href="/fractional-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">All Fractional Jobs UK</h4><p className="text-sm text-gray-600">Browse all roles</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CSOs</h2></div><IR35Calculator defaultDayRate={1150} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CSO Jobs UK</h2></div><FAQ items={INTERIM_CSO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="coo" />
    </div>
  )
}
