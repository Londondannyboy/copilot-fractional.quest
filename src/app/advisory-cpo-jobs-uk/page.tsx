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
  title: 'Advisory CPO Jobs UK | Product Leadership Advisory Roles 2026',
  description: 'Find advisory CPO jobs UK with day rates £650-£950. Browse advisory Chief Product Officer and Product Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory cpo jobs uk, advisory cpo, advisory product director jobs, advisory chief product officer, advisory cpo roles uk, advisory product jobs, advisory cpo london, advisory cpo remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-cpo-jobs-uk' },
  openGraph: {
    title: 'Advisory CPO Jobs UK | Product Leadership Advisory Roles 2026',
    description: 'Find advisory CPO jobs UK with day rates £650-£950. Browse advisory Chief Product Officer and Product Director roles.',
    url: 'https://www.fractional.quest/advisory-cpo-jobs-uk',
  },
}

const ADVISORY_CPO_FAQS = [
  { question: "What is an advisory CPO?", answer: "An advisory CPO is a senior product professional who provides strategic product leadership guidance on a consultative basis. Unlike interim CPOs who take on full operational responsibility, advisory CPOs offer high-level counsel on specific challenges such as product strategy, product-market fit, roadmap prioritisation, or product team development. They typically work fewer hours but bring deep expertise to critical product decisions." },
  { question: "What are typical advisory CPO day rates in the UK?", answer: "Advisory CPO day rates in the UK typically range from £650-£950 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like product-led growth or B2B SaaS can command rates of £950-£1,200/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CPO engagement work?", answer: "Advisory CPO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CPO might review product strategy, attend board meetings, mentor product leaders, assess product-market fit, or provide guidance on roadmap prioritisation. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory and fractional CPO?", answer: "Advisory CPOs provide strategic counsel without operational responsibility, typically working 1-4 days per month on high-level guidance. Fractional CPOs take on part-time operational leadership (1-3 days per week), managing product teams and delivery. Advisory roles suit companies with capable product teams needing strategic oversight; fractional roles suit those needing hands-on leadership." },
  { question: "What qualifications do advisory CPOs need?", answer: "Most advisory CPOs have 12+ years of product experience including prior CPO, VP Product, or Product Director roles. Essential qualifications include experience with product strategy, product-market fit assessment, roadmap development, and board-level communication. Many have sector-specific expertise in B2B SaaS, marketplaces, or consumer products." },
  { question: "What industries hire advisory CPOs most frequently?", answer: "The highest demand for advisory CPOs comes from: venture-backed startups and scale-ups (product strategy, PMF), private equity portfolio companies (product due diligence), established businesses launching new products, and boards seeking independent product oversight." },
  { question: "Do advisory CPO roles fall inside or outside IR35?", answer: "Advisory CPO roles often fall outside IR35 due to their consultative nature, lack of day-to-day control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CPOs?", answer: "Advisory CPO hiring focuses on expertise fit and chemistry. The process typically includes: initial discussion with CEO/founders about product challenges, assessment of relevant experience and approach, discussion of working relationship dynamics, and agreement on scope and deliverables. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CPO work lead to other opportunities?", answer: "Yes, advisory CPO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (product advisory board), equity opportunities, and referrals. The advisory model is excellent for building a portfolio of product relationships." },
  { question: "What should I include in my advisory CPO profile?", answer: "Focus on: successful product launches and outcomes, product-market fit achievements, team building and mentoring experience, board-level communication skills, and sector expertise. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CPO Jobs UK', href: '/advisory-cpo-jobs-uk' },
]

async function getAdvisoryCPOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cpo%' OR title ILIKE '%advisory%product director%' OR title ILIKE '%advisory%chief product%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cpo%' OR title ILIKE '%advisory%product%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 12, avgRate: 800, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 12, avgRate: 800, remoteCount: 5 } }
}

async function getAdvisoryCPOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cpo%' OR title ILIKE '%advisory%product director%' OR title ILIKE '%advisory%chief product%' OR (title ILIKE '%advisory%' AND role_category = 'Product')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Product') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cto%' OR title ILIKE '%advisory%cmo%' OR title ILIKE '%fractional%cpo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCPOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCPOStats(), getFeaturedCompanies(), getAdvisoryCPOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CPO Jobs UK | Product Leadership Advisory Roles 2026" description="Find advisory CPO jobs UK with day rates £650-£950. Browse advisory Chief Product Officer and Product Director roles." url="https://www.fractional.quest/advisory-cpo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CPO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-cpo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1920&q=80" alt="Advisory CPO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 via-indigo-800/90 to-blue-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Product Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CPO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CPO</strong> and <strong>advisory Product Director</strong> roles across the UK. Premium advisory product leadership positions with day rates from £650-£950.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors">Browse Advisory CPO Jobs</a>
                <Link href="/fractional-cpo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CPO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-indigo-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CPO Roles</div></div>
            <div><div className="text-3xl font-black text-indigo-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-indigo-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-indigo-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-indigo-50 border-y border-indigo-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CPO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CPO & Product Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory product roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Product" ctaLink="/fractional-jobs-uk?department=Product" ctaText="View All Product Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CPO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CPO Day Rate Calculator</h2></div><RoleCalculator role="cpo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CPOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-indigo-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CPO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CPO</strong> market in the UK is growing as product-led companies seek strategic product expertise without full-time commitments. According to <a href="https://www.mindtheproduct.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Mind the Product</a>, demand for advisory product roles has increased as companies focus on product-led growth and need experienced guidance.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CPOs</h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Product strategy</strong> — Defining product vision, strategy, and roadmap priorities.</li>
              <li><strong>Product-market fit</strong> — Assessing and achieving product-market fit.</li>
              <li><strong>Board-level oversight</strong> — Providing independent product perspective to boards.</li>
              <li><strong>Team development</strong> — Mentoring product leaders and building capability.</li>
              <li><strong>Due diligence</strong> — Product assessment for M&A or investment.</li>
              <li><strong>Product transformation</strong> — Guiding shifts to product-led growth models.</li>
            </ul>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cpo-jobs-uk" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CPO Jobs</h4><p className="text-sm text-gray-600">Part-time CPO roles</p></Link>
              <Link href="/fractional-cpo-salary" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">CPO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link>
              <Link href="/interim-cpo-jobs-uk" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CPO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim product roles</p></Link>
              <Link href="/advisory-cto-jobs-uk" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CTO Jobs UK</h4><p className="text-sm text-gray-600">Technology advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.mindtheproduct.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Mind the Product</a> — Product management community</li>
              <li><a href="https://www.productschool.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Product School</a> — Product education and certification</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CPOs</h2></div><IR35Calculator defaultDayRate={800} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CPO Jobs UK</h2></div><FAQ items={ADVISORY_CPO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cpo" />
    </div>
  )
}
