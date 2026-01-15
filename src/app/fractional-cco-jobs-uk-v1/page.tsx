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

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CCO Jobs UK 2025 | Chief Commercial Officer Roles',
  description: 'Fractional CCO jobs UK: part-time CCO roles paying £900-£1,400/day. Browse commercial leadership positions across London and UK.',
  keywords: 'fractional cco jobs uk, fractional cco, fractional chief commercial officer, part time commercial director, fractional commercial director jobs',
  alternates: { canonical: 'https://fractional.quest/fractional-cco-jobs-uk' },
  openGraph: {
    title: 'Fractional CCO Jobs UK | Chief Commercial Officer Roles',
    description: 'Find fractional CCO and Commercial Director jobs across the UK. Day rates £900-£1,400.',
    url: 'https://fractional.quest/fractional-cco-jobs-uk',
  },
}

const FRACTIONAL_CCO_FAQS = [
  { question: "What is a fractional CCO?", answer: "A fractional CCO (Chief Commercial Officer) is a senior commercial leader who works with companies part-time, typically 1-3 days per week. They oversee commercial strategy, revenue growth, sales, and business development without the full-time commitment or cost." },
  { question: "What are typical fractional CCO day rates in the UK?", answer: "Fractional CCO day rates in the UK typically range from £900-£1,400 per day. For a 2-day per week engagement, annual costs are £90,000-£140,000 - significantly less than a full-time CCO package which can exceed £200,000." },
  { question: "What does a fractional CCO do?", answer: "A fractional CCO typically: develops commercial strategy, oversees sales and business development teams, manages key client relationships, drives revenue growth initiatives, optimises pricing and go-to-market strategies, and builds partnerships and channel relationships." },
  { question: "What's the difference between a CCO and CMO?", answer: "A CCO focuses on commercial outcomes - revenue, sales, business development, and partnerships. A CMO focuses on marketing - brand, demand generation, and communications. Some companies combine these roles, while others have both a CCO (revenue) and CMO (brand)." },
  { question: "Who hires fractional CCOs?", answer: "B2B companies, SaaS businesses, scale-ups, and PE portfolio companies commonly hire fractional CCOs. They need commercial leadership to drive revenue growth but may not need or afford a full-time C-suite commercial leader." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Fractional Jobs', href: '/fractional-jobs-uk' }, { label: 'Fractional CCO Jobs UK', href: '/fractional-cco-jobs-uk' }]

async function getFractionalCCOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%fractional%cco%' OR title ILIKE '%fractional%commercial%' OR title ILIKE '%part%time%commercial director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%fractional%cco%' OR title ILIKE '%fractional%commercial%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 15), avgRate: 1100, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 15, avgRate: 1100, remoteCount: 6 } }
}

async function getFractionalCCOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%fractional%cco%' OR title ILIKE '%fractional%commercial%' OR title ILIKE '%part%time%commercial%' OR title ILIKE '%commercial director%' OR title ILIKE '%chief commercial%' OR (role_category = 'Sales' AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%'))) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND role_category = 'Sales' AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%fractional%cmo%' OR title ILIKE '%fractional%cro%' OR title ILIKE '%fractional%sales%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function FractionalCCOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getFractionalCCOStats(), getFeaturedCompanies(), getFractionalCCOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CCO Jobs UK | Chief Commercial Officer Roles 2025" description="Find fractional CCO and Commercial Director jobs across the UK." url="https://fractional.quest/fractional-cco-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={FRACTIONAL_CCO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/fractional-cco-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80" alt="Fractional CCO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-cyan-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Commercial Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CCO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>fractional CCO</strong> and <strong>part-time Commercial Director</strong> roles across the UK. Portfolio commercial leadership positions, 1-3 days per week, day rates from £900-£1,400.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors">Browse CCO Jobs</a>
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">CMO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-blue-400">{stats.total}+</div><div className="text-gray-400 text-sm">Fractional CCO Roles</div></div><div><div className="text-3xl font-black text-blue-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-blue-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-blue-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-blue-50 border-y border-blue-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Fractional CCO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CCO & Commercial Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live commercial roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Sales" ctaLink="/fractional-jobs-uk" ctaText="View All Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Fractional CCO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CCO Day Rate Calculator</h2></div><RoleCalculator role="cmo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Fractional CCOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-blue-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Fractional CCO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>fractional CCO</strong> model has grown as B2B companies and scale-ups recognise they need senior commercial leadership to drive revenue growth, but may not need or afford a full-time Chief Commercial Officer.</p><p>A fractional CCO typically oversees the commercial function including sales, business development, partnerships, and revenue strategy. They differ from <Link href="/fractional-cmo-jobs-uk" className="text-blue-600 hover:underline">fractional CMOs</Link> who focus on marketing and brand.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Does a Fractional CCO Do?</h3><ul className="space-y-2 text-gray-600"><li><strong>Commercial strategy</strong> - Revenue planning, market expansion, pricing</li><li><strong>Sales leadership</strong> - Building and managing sales teams</li><li><strong>Business development</strong> - Key account management, new business</li><li><strong>Partnerships</strong> - Channel strategy, strategic alliances</li><li><strong>Revenue operations</strong> - Sales processes, CRM, forecasting</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CMO Jobs</h4><p className="text-sm text-gray-600">Marketing leadership roles</p></Link><Link href="/fractional-coo-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional COO Jobs</h4><p className="text-sm text-gray-600">Operations leadership roles</p></Link><Link href="/fractional-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CEO Jobs</h4><p className="text-sm text-gray-600">Executive leadership roles</p></Link><Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Hire Commercial Leaders</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Fractional CCOs</h2></div><IR35Calculator defaultDayRate={1100} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CCO Jobs UK</h2></div><FAQ items={FRACTIONAL_CCO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Commercial & Revenue Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Revenue Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}
    </div>
  )
}
