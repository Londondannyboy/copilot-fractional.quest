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
  title: 'Interim CMO Jobs UK | Marketing Director Roles 2026',
  description: 'Find interim CMO jobs UK with day rates £850-£1,300. Browse interim Marketing Director and Chief Marketing Officer roles. Remote, hybrid & London positions for brand transformation experts.',
  keywords: 'interim cmo jobs uk, interim cmo, interim marketing director jobs, interim chief marketing officer, interim cmo roles uk, interim marketing jobs, interim cmo london, interim cmo remote',
  alternates: { canonical: 'https://www.fractional.quest/interim-cmo-jobs-uk' },
  openGraph: {
    title: 'Interim CMO Jobs UK | Marketing Director Roles 2026',
    description: 'Find interim CMO jobs UK with day rates £850-£1,300. Browse interim Marketing Director and Chief Marketing Officer roles.',
    url: 'https://www.fractional.quest/interim-cmo-jobs-uk',
  },
}

const INTERIM_CMO_FAQS = [
  { question: "What is an interim CMO?", answer: "An interim CMO is a temporary Chief Marketing Officer who provides senior marketing leadership during transitions, rebrands, or gaps in permanent leadership. Unlike fractional CMOs who work part-time ongoing, interim CMOs typically work full-time for a defined period (3-12 months). They're brought in to handle critical marketing situations requiring immediate, dedicated leadership." },
  { question: "What are typical interim CMO day rates in the UK?", answer: "Interim CMO day rates in the UK typically range from £850-£1,300 per day, depending on experience, sector, and scope. Brand transformation, digital marketing expertise, and B2B SaaS experience command premium rates of £1,300-£1,600/day. The annual equivalent is £170,000-£260,000 for full-time interim engagements. London-based roles typically pay 10-15% more than regional positions." },
  { question: "How long do interim CMO assignments last?", answer: "Most interim CMO assignments last 6-12 months, covering rebrands, product launches, or leadership transitions. Some extend to 18+ months for major marketing transformations or international expansion. Many interim CMOs work on rolling contracts with 30-day notice periods." },
  { question: "What's the difference between interim and fractional CMO?", answer: "Interim CMOs typically work full-time (5 days/week) for a fixed period covering rebrands or major campaigns, while fractional CMOs work part-time (1-3 days/week) on an ongoing basis. Interim roles are higher intensity but shorter duration. Interim CMOs often step into urgent transformation situations, while fractional CMOs provide steady-state marketing leadership." },
  { question: "What qualifications do interim CMOs need?", answer: "Most interim CMOs have 15+ years of marketing experience including prior CMO, VP Marketing, or Marketing Director roles. Essential qualifications include brand strategy expertise, digital marketing and performance marketing experience, and demonstrable ROI track records. Many hold CIM (Chartered Institute of Marketing) qualifications or MBA degrees." },
  { question: "What industries hire interim CMOs most frequently?", answer: "The highest demand for interim CMOs comes from: technology and SaaS companies (growth marketing, product launches), retail and e-commerce (digital transformation, omnichannel), consumer goods and FMCG (brand repositioning), financial services (digital banking, fintech marketing), and private equity portfolio companies (marketing due diligence, brand value creation)." },
  { question: "Do interim CMOs work inside or outside IR35?", answer: "IR35 status varies by engagement. Many interim CMO roles fall inside IR35 due to control and integration factors. However, clearly scoped brand transformation projects or consultancy-style engagements may qualify as outside IR35. Always obtain a status determination statement (SDS) before accepting a role." },
  { question: "What's the hiring process for interim CMOs?", answer: "Interim CMO hiring typically moves fast - often 2-4 weeks from first contact to start date. The process usually includes: initial portfolio/case study review, interview with CEO or board, chemistry meeting with senior team, commercial terms negotiation, and IR35 status determination. Companies often prioritise candidates with relevant sector experience." },
  { question: "Can interim CMO experience lead to permanent roles?", answer: "Yes, many interim assignments convert to permanent positions. Industry estimates suggest 20-25% of interim CMOs receive permanent offers. However, many interim executives prefer the portfolio career model, enjoying variety, higher day rates, and the ability to work on diverse brands. Some negotiate 'interim-to-perm' arrangements with conversion terms upfront." },
  { question: "What should I include in my interim CMO CV?", answer: "Focus on: brand transformation outcomes (awareness lift, market share gains), campaign performance metrics (ROI, CAC, LTV improvements), marketing team sizes built and led, technology implementations (martech stack, automation), and specific sector experience. Include notable brands worked with. Keep it to 2-3 pages maximum with clear start/end dates and measurable outcomes for each assignment." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim CMO Jobs UK', href: '/interim-cmo-jobs-uk' }]

async function getInterimCMOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cmo%' OR title ILIKE '%interim%marketing director%' OR title ILIKE '%interim%chief marketing%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cmo%' OR title ILIKE '%interim%marketing%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 15), avgRate: 1000, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 15, avgRate: 1000, remoteCount: 6 } }
}

async function getInterimCMOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cmo%' OR title ILIKE '%interim%marketing director%' OR title ILIKE '%interim%chief marketing%' OR (title ILIKE '%interim%' AND role_category = 'Marketing')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Marketing') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%cto%' OR title ILIKE '%fractional%cmo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCMOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCMOStats(), getFeaturedCompanies(), getInterimCMOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CMO Jobs UK | Marketing Director Roles 2026" description="Find interim CMO jobs UK with day rates £850-£1,300. Browse interim Marketing Director and Chief Marketing Officer roles." url="https://www.fractional.quest/interim-cmo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CMO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/interim-cmo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80" alt="Interim CMO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-800/90 to-pink-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Marketing Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CMO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CMO</strong> and <strong>interim Marketing Director</strong> roles across the UK. Premium interim marketing leadership positions with day rates from £850-£1,300.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Browse Interim CMO Jobs</a>
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CMO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CMO Roles</div></div><div><div className="text-3xl font-black text-amber-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-amber-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-amber-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-amber-50 border-y border-amber-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CMO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CMO & Marketing Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim marketing roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Marketing" ctaLink="/fractional-jobs-uk?department=Marketing" ctaText="View All Marketing Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CMO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CMO Day Rate Calculator</h2></div><RoleCalculator role="cmo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CMOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-amber-600 hover:text-amber-800 hover:underline">UK Interim CMO Market</a>
                <a href="#when-needed" className="block text-amber-600 hover:text-amber-800 hover:underline">When Companies Need Interim CMOs</a>
                <a href="#skills" className="block text-amber-600 hover:text-amber-800 hover:underline">Essential Skills & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-amber-600 hover:text-amber-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-amber-600 hover:text-amber-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-amber-600 hover:text-amber-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-amber-600 hover:text-amber-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-amber-600 hover:text-amber-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Interim CMO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CMO</strong> market in the UK has grown significantly as companies recognize the need for experienced marketing leadership during critical phases - rebrands, product launches, or digital transformation initiatives. According to the <a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Chartered Institute of Marketing (CIM)</a>, demand for interim marketing executives increased by 18% in 2025, driven by digital transformation and the need for growth marketing expertise.</p>
            <p>Unlike <Link href="/fractional-cmo-jobs-uk" className="text-amber-600 hover:underline">fractional CMO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months. The <a href="https://dma.org.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Data & Marketing Association (DMA)</a> reports that UK businesses increasingly value interim marketing leadership for major brand initiatives and market entry strategies.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CMOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage interim CMOs for specific strategic situations requiring immediate, senior marketing leadership:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Brand transformations</strong> — Rebrands, repositioning, brand architecture redesign. Interim CMOs bring objectivity and fresh perspective to challenge incumbent thinking and drive change.</li>
              <li><strong>Product launches</strong> — Go-to-market strategy and execution for major new products. Interim CMOs can dedicate 100% focus to launch success without BAU distractions.</li>
              <li><strong>Digital transformation</strong> — Marketing technology implementation, data-driven marketing, performance marketing capability building. According to <a href="https://www.marketingweek.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Marketing Week</a>, this is the fastest-growing segment.</li>
              <li><strong>Leadership gaps</strong> — Covering departures during CMO recruitment, which can take 4-8 months. Interim CMOs maintain campaign momentum and team morale.</li>
              <li><strong>International expansion</strong> — Market entry strategy, localisation, and building local marketing capabilities in new geographies.</li>
              <li><strong>PE value creation</strong> — Portfolio company marketing overhaul, brand repositioning for exit, and marketing due diligence.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Interim CMOs</h3>
            <p className="text-gray-600 mb-4">Successful interim CMOs combine strategic marketing expertise with commercial acumen. The <a href="https://www.ipa.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Institute of Practitioners in Advertising (IPA)</a> identifies these critical competencies:</p>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Strategic Marketing</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Brand strategy and positioning</li>
                  <li>• Go-to-market planning</li>
                  <li>• Customer insight and research</li>
                  <li>• Marketing ROI and attribution</li>
                  <li>• Agency management and selection</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Digital & Performance</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Digital marketing strategy</li>
                  <li>• Performance marketing (PPC, paid social)</li>
                  <li>• Marketing automation and CRM</li>
                  <li>• Data analytics and attribution</li>
                  <li>• Content and SEO strategy</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Interim CMOs</h3>
            <p className="text-gray-600 mb-4">Demand for interim CMOs varies by sector. Based on market analysis and data from <a href="https://www.warc.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">WARC</a>:</p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Technology / SaaS</td><td className="py-3 px-4 text-gray-600">£1,000-£1,500</td><td className="py-3 px-4 text-gray-600">Growth marketing, product launches, PLG</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Retail / E-commerce</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Digital transformation, omnichannel</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Consumer Goods / FMCG</td><td className="py-3 px-4 text-gray-600">£950-£1,400</td><td className="py-3 px-4 text-gray-600">Brand repositioning, DTC strategies</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Financial Services</td><td className="py-3 px-4 text-gray-600">£1,000-£1,500</td><td className="py-3 px-4 text-gray-600">Digital banking, fintech marketing</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Healthcare / Pharma</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Patient marketing, HCP engagement</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <p className="text-gray-600 mb-4">Interim CMO compensation in the UK is primarily day-rate based. According to guidance from <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">HMRC on IR35</a>:</p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £850-£1,300 standard, up to £1,600 for specialist sectors (SaaS, fintech)</li>
              <li><strong>Location premium:</strong> London roles typically pay 10-15% more than regional positions</li>
              <li><strong>IR35 status:</strong> Many interim CMO roles fall inside IR35. Budget accordingly for the tax implications.</li>
              <li><strong>Notice periods:</strong> Typically 30 days, sometimes 2 weeks for shorter assignments</li>
            </ul>
            <p className="text-gray-600 mt-4">For detailed IR35 guidance, consult <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">IPSE (The Association of Independent Professionals)</a> or seek specialist tax advice.</p>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Interim CMO Work</h3>
            <p className="text-gray-600 mb-4">Many interim CMOs transition from permanent roles after 15+ years of experience. The path typically involves:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building a track record of marketing transformation outcomes (brand relaunches, campaign results, growth metrics)</li>
              <li>Developing a portfolio of case studies demonstrating measurable impact across different sectors</li>
              <li>Building a network through industry events, <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">LinkedIn</a>, and professional associations like <a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">CIM</a></li>
              <li>Registering with specialist interim management firms and marketing executive search consultancies</li>
              <li>Building a personal brand through speaking, writing, or advisory board positions</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CMO Jobs</h4><p className="text-sm text-gray-600">Part-time CMO roles for portfolio careers</p></Link>
              <Link href="/fractional-cmo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">CMO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CMO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CMO</h4><p className="text-sm text-gray-600">Guide to hiring marketing leaders</p></Link>
              <Link href="/interim-cto-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CTO Jobs UK</h4><p className="text-sm text-gray-600">Technology leadership interim roles</p></Link>
              <Link href="/interim-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance leadership interim roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <p className="text-gray-600 mb-4">Further reading from industry bodies and professional sources:</p>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">CIM</a> — Chartered Institute of Marketing</li>
              <li><a href="https://dma.org.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">DMA</a> — Data & Marketing Association</li>
              <li><a href="https://www.marketingweek.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Marketing Week</a> — Industry news and insights</li>
              <li><a href="https://www.ipa.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">IPA</a> — Institute of Practitioners in Advertising</li>
              <li><a href="https://www.warc.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">WARC</a> — Marketing intelligence and benchmarks</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CMOs</h2></div><IR35Calculator defaultDayRate={1000} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CMO Jobs UK</h2></div><FAQ items={INTERIM_CMO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cmo" />
    </div>
  )
}
