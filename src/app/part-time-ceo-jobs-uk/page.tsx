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
  title: 'Part-Time CEO Jobs UK',
  description: 'Part-time CEO jobs UK for executive leaders. Find Chief Executive and Managing Director roles. 1-3 days/week, £1,200-£2,000/day.',
  keywords: 'part time ceo jobs uk, part time ceo, part time chief executive jobs, fractional ceo jobs, part time managing director',
  alternates: { canonical: 'https://fractional.quest/part-time-ceo-jobs-uk' },
  openGraph: {
    title: 'Part-Time CEO Jobs UK | Fractional Chief Executive Roles',
    description: 'Find part-time CEO and Chief Executive jobs across the UK. 1-3 days per week.',
    url: 'https://fractional.quest/part-time-ceo-jobs-uk',
  },
}

const PART_TIME_CEO_FAQS = [
  { question: "What is a part-time CEO?", answer: "A part-time CEO (also called fractional CEO) is a Chief Executive Officer who works with companies 1-3 days per week on an ongoing basis. This model provides senior executive leadership without the full-time commitment or cost." },
  { question: "What are typical part-time CEO day rates in the UK?", answer: "Part-time CEO day rates in the UK typically range from £1,200-£2,000 per day. For a 2-day per week engagement, annual costs are £120,000-£200,000 - significantly less than a full-time CEO package." },
  { question: "How many days per week do part-time CEOs work?", answer: "Most part-time CEO roles involve 1-3 days per week, with 2 days being common for smaller companies. Many CEOs work with multiple portfolio companies." },
  { question: "What's the difference between part-time and fractional CEO?", answer: "The terms are often used interchangeably. 'Part-time CEO' emphasizes the reduced hours, while 'fractional CEO' emphasizes the shared/portfolio nature. Both refer to senior executives working less than full-time." },
  { question: "Who hires part-time CEOs?", answer: "PE portfolio companies, family businesses, SMEs, and investor-backed startups commonly hire part-time CEOs. They get experienced executive leadership at a fraction of full-time cost." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Part-Time Jobs', href: '/fractional-jobs-uk' }, { label: 'Part-Time CEO Jobs UK', href: '/part-time-ceo-jobs-uk' }]

async function getPartTimeCEOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%ceo%' OR title ILIKE '%part%time%chief executive%' OR title ILIKE '%fractional%ceo%' OR title ILIKE '%fractional%chief executive%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%ceo%' OR title ILIKE '%fractional%ceo%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 15), avgRate: 1500, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 15, avgRate: 1500, remoteCount: 5 } }
}

async function getPartTimeCEOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%ceo%' OR title ILIKE '%part%time%chief executive%' OR title ILIKE '%fractional%ceo%' OR title ILIKE '%fractional%chief executive%' OR (role_category = 'Executive' AND title NOT ILIKE '%interim%')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND role_category = 'Executive' AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cfo%' OR title ILIKE '%part%time%coo%' OR title ILIKE '%fractional%ceo%' OR title ILIKE '%interim%ceo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function PartTimeCEOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getPartTimeCEOStats(), getFeaturedCompanies(), getPartTimeCEOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Part-Time CEO Jobs UK | Fractional Chief Executive Roles 2026" description="Find part-time CEO and Chief Executive jobs across the UK." url="https://fractional.quest/part-time-ceo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={PART_TIME_CEO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/part-time-ceo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=80" alt="Part-Time CEO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/95 via-amber-500/90 to-orange-500/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Part-Time Executive Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Part-Time CEO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>part-time CEO</strong> and <strong>fractional Chief Executive</strong> roles across the UK. Portfolio executive leadership positions, 1-3 days per week, day rates from £1,200-£2,000.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Browse Part-Time CEO Jobs</a>
                <Link href="/interim-ceo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Interim CEO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-400">{stats.total}+</div><div className="text-gray-400 text-sm">Part-Time CEO Roles</div></div><div><div className="text-3xl font-black text-amber-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-amber-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-amber-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-amber-50 border-y border-amber-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Part-Time CEO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CEO & Fractional Executive Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live part-time executive roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Executive" ctaLink="/fractional-ceo-jobs-uk" ctaText="View All CEO Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Part-Time CEO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Part-Time CEO Day Rate Calculator</h2></div><RoleCalculator role="ceo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Part-Time CEOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Part-Time CEO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>part-time CEO</strong> model (also known as fractional CEO) has emerged as PE firms and investors seek experienced executive leadership for portfolio companies without full-time cost. This creates opportunities for seasoned executives to build portfolio careers.</p><p>Unlike <Link href="/interim-ceo-jobs-uk" className="text-amber-600 hover:underline">interim CEO roles</Link> which are full-time for a fixed period, part-time CEO positions offer ongoing engagement typically 1-3 days per week. Many <Link href="/fractional-ceo-jobs-uk" className="text-amber-600 hover:underline">fractional CEOs</Link> work with multiple portfolio companies.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Who Hires Part-Time CEOs?</h3><ul className="space-y-2 text-gray-600"><li><strong>PE portfolio companies</strong> - Leadership for value creation</li><li><strong>Family businesses</strong> - Professionalising management</li><li><strong>Investor-backed startups</strong> - Experienced guidance during growth</li><li><strong>SMEs</strong> - Strategic leadership without full-time cost</li><li><strong>Turnaround situations</strong> - Ongoing oversight during recovery</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CEO Jobs</h4><p className="text-sm text-gray-600">All fractional executive roles</p></Link><Link href="/interim-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CEO Jobs</h4><p className="text-sm text-gray-600">Full-time temporary roles</p></Link><Link href="/fractional-ceo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">CEO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/hire-fractional-ceo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CEO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Part-Time CEOs</h2></div><IR35Calculator defaultDayRate={1500} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Part-Time CEO Jobs UK</h2></div><FAQ items={PART_TIME_CEO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Part-Time Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Part-Time Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="ceo" />
    </div>
  )
}
