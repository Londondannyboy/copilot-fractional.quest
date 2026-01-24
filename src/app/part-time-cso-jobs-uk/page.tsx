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
  title: 'Part-Time CSO Jobs UK',
  description: 'Part-time CSO and Strategy Director jobs UK. Find Chief Strategy Officer and Strategy Director roles. 1-3 days/week, £900-£1,300/day.',
  keywords: 'part time cso jobs uk, part time cso, part time strategy director, fractional cso',
  alternates: { canonical: 'https://fractional.quest/part-time-cso-jobs-uk' },
  openGraph: {
    title: 'Part-Time CSO Jobs UK | Fractional Strategy Director Roles',
    description: 'Find part-time CSO and Strategy Director jobs across the UK. 1-3 days per week.',
    url: 'https://fractional.quest/part-time-cso-jobs-uk',
  },
}

const PART_TIME_CSO_FAQS = [
  { question: "What is a part-time CSO?", answer: "A part-time CSO (also called fractional CSO or fractional Strategy Director) is a Chief Strategy Officer who works with companies 1-3 days per week on an ongoing basis. This model provides senior strategy leadership without the full-time commitment or cost." },
  { question: "What are typical part-time CSO day rates in the UK?", answer: "Part-time CSO day rates in the UK typically range from £900-£1,300 per day. For a 2-day per week engagement, annual costs are £90,000-£130,000 - significantly less than a full-time CSO package." },
  { question: "What does a part-time CSO actually do?", answer: "A part-time CSO develops and oversees corporate strategy, identifies growth opportunities, leads strategic planning cycles, evaluates M&A targets, and ensures alignment between business units and long-term objectives. They bring board-level strategic thinking without the full-time overhead." },
  { question: "Who hires part-time CSOs?", answer: "SMEs, scale-ups, PE-backed portfolio companies, and businesses undergoing transformation commonly hire part-time CSOs. They get experienced strategy leadership at a fraction of full-time cost - ideal for companies needing strategic direction during growth or pivots." },
  { question: "How is a part-time CSO different from a management consultant?", answer: "Unlike consultants who deliver reports and leave, a part-time CSO provides ongoing strategic leadership, typically 1-3 days per week. They attend board meetings, own the strategy function, and are accountable for execution - not just recommendations." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Part-Time Jobs', href: '/fractional-jobs-uk' }, { label: 'Part-Time CSO Jobs UK', href: '/part-time-cso-jobs-uk' }]

async function getPartTimeCSOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cso%' OR title ILIKE '%part%time%strategy director%' OR title ILIKE '%fractional%cso%' OR title ILIKE '%fractional%strategy director%' OR title ILIKE '%part%time%chief strategy%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cso%' OR title ILIKE '%fractional%cso%' OR title ILIKE '%part%time%strategy director%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 10), avgRate: 1100, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 10, avgRate: 1100, remoteCount: 5 } }
}

async function getPartTimeCSOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cso%' OR title ILIKE '%part%time%strategy director%' OR title ILIKE '%fractional%cso%' OR title ILIKE '%fractional%strategy director%' OR title ILIKE '%part%time%chief strategy%' OR (role_category = 'Operations' AND title ILIKE '%strategy%' AND title NOT ILIKE '%interim%')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (role_category = 'Operations' OR title ILIKE '%strategy%') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%coo%' OR title ILIKE '%part%time%ceo%' OR title ILIKE '%fractional%cso%' OR title ILIKE '%interim%strategy%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function PartTimeCSOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getPartTimeCSOStats(), getFeaturedCompanies(), getPartTimeCSOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Part-Time CSO Jobs UK | Fractional Strategy Director Roles 2026" description="Find part-time CSO and Strategy Director jobs across the UK." url="https://fractional.quest/part-time-cso-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={PART_TIME_CSO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/part-time-cso-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" alt="Part-Time CSO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/95 via-emerald-500/90 to-cyan-500/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Part-Time Strategy Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Part-Time CSO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>part-time CSO</strong> and <strong>fractional Strategy Director</strong> roles across the UK. Portfolio strategy leadership positions, 1-3 days per week, day rates from £900-£1,300.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition-colors">Browse Part-Time CSO Jobs</a>
                <Link href="/fractional-coo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional COO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-teal-400">{stats.total}+</div><div className="text-gray-400 text-sm">Part-Time CSO Roles</div></div><div><div className="text-3xl font-black text-teal-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-teal-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-teal-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-teal-50 border-y border-teal-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Part-Time CSO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CSO & Fractional Strategy Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live part-time strategy roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Operations" ctaLink="/fractional-coo-jobs-uk" ctaText="View All Strategy Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Part-Time CSO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Part-Time CSO Day Rate Calculator</h2></div><RoleCalculator role="coo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Part-Time CSOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-teal-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Part-Time CSO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>part-time CSO</strong> model (also known as fractional CSO or fractional Strategy Director) has become increasingly popular as companies recognise they need senior strategy leadership without the full-time cost. This creates opportunities for experienced strategy professionals to build portfolio careers.</p><p>Unlike management consultants who deliver recommendations and leave, part-time CSOs provide ongoing strategic leadership typically 1-3 days per week. Many <Link href="/fractional-coo-jobs-uk" className="text-teal-600 hover:underline">fractional strategy leaders</Link> work with multiple clients simultaneously, bringing cross-industry insights to each engagement.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Who Hires Part-Time CSOs?</h3><ul className="space-y-2 text-gray-600"><li><strong>Scale-ups</strong> - Companies needing strategic direction for growth</li><li><strong>PE-backed businesses</strong> - Portfolio companies requiring value creation plans</li><li><strong>SMEs</strong> - Businesses needing board-level strategy expertise</li><li><strong>Companies in transition</strong> - M&A, pivots, market expansion</li><li><strong>Family businesses</strong> - Professional strategy for generational transitions</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-coo-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional COO Jobs</h4><p className="text-sm text-gray-600">All fractional operations roles</p></Link><Link href="/part-time-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Part-Time CEO Jobs</h4><p className="text-sm text-gray-600">Executive leadership roles</p></Link><Link href="/fractional-coo-salary" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Strategy Leader Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/hire-fractional-coo" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a Strategy Leader</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Part-Time CSOs</h2></div><IR35Calculator defaultDayRate={1100} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Part-Time CSO Jobs UK</h2></div><FAQ items={PART_TIME_CSO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Part-Time Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Part-Time Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="coo" />
    </div>
  )
}
