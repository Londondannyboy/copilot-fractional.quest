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
  title: 'Interim CEO Jobs UK',
  description: 'Interim CEO jobs UK for executive leaders. Find interim Chief Executive and Managing Director roles. £1,200-£2,000/day.',
  keywords: 'interim ceo jobs uk, interim ceo, interim chief executive jobs, interim managing director, interim ceo roles uk',
  alternates: { canonical: 'https://fractional.quest/interim-ceo-jobs-uk' },
  openGraph: {
    title: 'Interim CEO Jobs UK | Chief Executive Roles',
    description: 'Find interim CEO and Chief Executive jobs across the UK. Day rates £1,200-£2,000.',
    url: 'https://fractional.quest/interim-ceo-jobs-uk',
  },
}

const INTERIM_CEO_FAQS = [
  { question: "What is an interim CEO?", answer: "An interim CEO is a temporary Chief Executive Officer who provides senior leadership during transitions, turnarounds, or gaps in permanent leadership. Unlike fractional CEOs who work part-time ongoing, interim CEOs typically work full-time for a defined period (6-18 months)." },
  { question: "What are typical interim CEO day rates in the UK?", answer: "Interim CEO day rates in the UK typically range from £1,200-£2,000 per day, depending on company size, sector, and complexity. Turnaround and PE-backed situations command premium rates." },
  { question: "How long do interim CEO assignments last?", answer: "Most interim CEO assignments last 6-18 months, covering turnarounds, M&A transitions, or leadership gaps. Complex situations may extend longer." },
  { question: "What's the difference between interim and fractional CEO?", answer: "Interim CEOs typically work full-time for a fixed period, while fractional CEOs work part-time (1-3 days/week) on an ongoing basis. Interim roles suit intensive transformations or crisis management." },
  { question: "What qualifications do interim CEOs need?", answer: "Most interim CEOs have 20+ years of experience including prior CEO/MD roles. Turnaround expertise, board experience, and sector knowledge are highly valued. Many have PE or VC-backed company experience." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim CEO Jobs UK', href: '/interim-ceo-jobs-uk' }]

async function getInterimCEOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%ceo%' OR title ILIKE '%interim%chief executive%' OR title ILIKE '%interim%managing director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%ceo%' OR title ILIKE '%interim%chief executive%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 12), avgRate: 1500, remoteCount: Number(remoteCount?.count || 3) }
  } catch { return { total: 12, avgRate: 1500, remoteCount: 3 } }
}

async function getInterimCEOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%ceo%' OR title ILIKE '%interim%chief executive%' OR title ILIKE '%interim%managing director%' OR (title ILIKE '%interim%' AND role_category = 'Executive')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Executive') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%coo%' OR title ILIKE '%fractional%ceo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCEOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCEOStats(), getFeaturedCompanies(), getInterimCEOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CEO Jobs UK | Chief Executive Roles 2025" description="Find interim CEO and Chief Executive jobs across the UK." url="https://fractional.quest/interim-ceo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CEO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-ceo-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=80" alt="Interim CEO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/95 via-amber-500/90 to-orange-500/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Executive Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CEO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CEO</strong> and <strong>interim Chief Executive</strong> roles across the UK. Premium interim executive leadership positions with day rates from £1,200-£2,000.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Browse Interim CEO Jobs</a>
                <Link href="/fractional-ceo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CEO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CEO Roles</div></div><div><div className="text-3xl font-black text-amber-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-amber-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-amber-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-amber-50 border-y border-amber-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CEO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CEO & Chief Executive Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim executive roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Executive" ctaLink="/fractional-ceo-jobs-uk" ctaText="View All CEO Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CEO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CEO Day Rate Calculator</h2></div><RoleCalculator role="ceo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CEOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CEO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CEO</strong> market in the UK serves companies navigating critical transitions - turnarounds, M&A, founder exits, or rapid scaling. Experienced interim chief executives bring immediate impact without long-term commitment.</p><p>Unlike <Link href="/fractional-ceo-jobs-uk" className="text-amber-600 hover:underline">fractional CEO roles</Link>, interim positions are typically full-time assignments lasting 6-18 months, ideal for intensive leadership during transformation.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CEOs</h3><ul className="space-y-2 text-gray-600"><li><strong>Turnarounds</strong> - Crisis management and business recovery</li><li><strong>M&A transitions</strong> - Pre/post-acquisition leadership</li><li><strong>Founder exits</strong> - Bridge to permanent appointment</li><li><strong>PE portfolio companies</strong> - Value creation initiatives</li><li><strong>Rapid scaling</strong> - Growth-stage leadership</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CEO Jobs</h4><p className="text-sm text-gray-600">Part-time CEO roles</p></Link><Link href="/fractional-ceo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">CEO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-ceo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CEO?</h4><p className="text-sm text-gray-600">Understanding the model</p></Link><Link href="/hire-fractional-ceo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CEO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CEOs</h2></div><IR35Calculator defaultDayRate={1500} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CEO Jobs UK</h2></div><FAQ items={INTERIM_CEO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="ceo" />
    </div>
  )
}
