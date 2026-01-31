import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema, FAQPageSchema, FAQItem } from '@/components/seo'
import { RoleCalculator } from '@/components/RoleCalculator'
import { RoleContentHub } from '@/components/RoleContentHub'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { FAQ } from '@/components/seo/FAQ'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('salary')
const imageAlt = getImage('salary').alt
const heroImage = getHeroImageUrl('cfo', 1920, 800)
const imageCredit = getImage('cfo')

export const metadata: Metadata = {
  title: 'Fractional CFO Cost UK 2026 | Pricing Guide, Day Rates & Monthly Retainers',
  description: 'Fractional CFO cost UK: Day rates £700-£1,200, monthly retainers £2,000-£15,000. Compare costs vs full-time CFO. Save 50-70% on finance leadership.',
  keywords: 'fractional cfo cost, fractional cfo cost uk, fractional cfo pricing, fractional cfo rates, how much does a fractional cfo cost, fractional cfo fees, fractional cfo retainer, outsourced cfo cost, part time cfo cost',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cfo-cost',
  },
  openGraph: {
    title: 'Fractional CFO Cost UK 2026 | Complete Pricing Guide',
    description: 'Fractional CFO cost UK: Day rates £700-£1,200. Monthly retainers £2,000-£15,000. Complete guide to pricing and ROI.',
    url: 'https://fractional.quest/fractional-cfo-cost',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CFO Cost UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CFO Cost UK 2026 | Complete Pricing Guide',
    description: 'Fractional CFO cost UK: Day rates £700-£1,200. Monthly retainers £2,000-£15,000.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CFO', href: '/fractional-cfo' },
  { label: 'Cost Guide', href: '/fractional-cfo-cost' },
]

const tocItems = [
  { id: 'overview', title: 'Cost Overview' },
  { id: 'day-rates', title: 'Day Rates' },
  { id: 'monthly-retainers', title: 'Monthly Retainers' },
  { id: 'project-fees', title: 'Project-Based Pricing' },
  { id: 'hourly-rates', title: 'Hourly Rates' },
  { id: 'comparison', title: 'Fractional vs Interim vs Full-Time' },
  { id: 'factors', title: 'What Affects Pricing' },
  { id: 'roi', title: 'ROI & Value' },
  { id: 'calculator', title: 'Cost Calculator' },
  { id: 'jobs', title: 'Find a CFO' },
  { id: 'faq', title: 'FAQ' },
]

const authorityLinks = [
  { name: 'ICAEW', url: 'https://www.icaew.com', description: 'Institute of Chartered Accountants' },
  { name: 'ACCA', url: 'https://www.accaglobal.com', description: 'Association of Chartered Certified Accountants' },
  { name: 'CIMA', url: 'https://www.cimaglobal.com', description: 'Chartered Institute of Management Accountants' },
  { name: 'FRC', url: 'https://www.frc.org.uk', description: 'Financial Reporting Council' },
  { name: 'BVCA', url: 'https://www.bvca.co.uk', description: 'British Venture Capital Association' },
]

const faqItems: FAQItem[] = [
  { question: 'How much does a fractional CFO cost in the UK?', answer: 'A fractional CFO in the UK typically costs £700-£1,200 per day, or £2,000-£15,000 per month on retainer. According to Fast Growth Consulting and C-Suite Recruit (Jan 2026), the average engagement is 1-2 days per week, costing £3,000-£8,000 monthly. This is 50-70% less than hiring a full-time CFO.' },
  { question: 'What is the monthly cost of a fractional CFO?', answer: 'Monthly fractional CFO costs in the UK: Starter tier (1 day/week) £2,500-£4,000, Growth tier (2 days/week) £5,000-£8,000, Enterprise tier (3+ days/week) £10,000-£15,000. These rates include strategic finance leadership, board reporting, and investor relations support.' },
  { question: 'Is a fractional CFO cheaper than hiring full-time?', answer: 'Yes, significantly. A full-time CFO costs £200,000-£350,000+ annually (salary, NI, pension, benefits, equity, recruitment fees). A fractional CFO at 2 days/week costs £60,000-£96,000/year - a 50-70% saving while still getting senior finance leadership.' },
  { question: 'What is included in fractional CFO fees?', answer: 'Fractional CFO fees typically include: financial strategy and planning, cash flow management, board reporting and investor relations, fundraising support, financial modelling and forecasting, finance team oversight, and systems/process improvement. Most CFOs work on monthly retainers for ongoing engagements.' },
  { question: 'How do fractional CFO day rates compare to interim CFOs?', answer: 'Fractional CFOs charge £700-£1,200/day for 1-3 days/week ongoing. Interim CFOs charge £1,000-£1,500/day for full-time temporary coverage (typically 3-9 months). Fractional is more cost-effective for ongoing strategic support; interim is better for crisis or gap-fill situations.' },
  { question: 'What factors affect fractional CFO pricing?', answer: 'Key pricing factors: (1) CFO experience and qualifications (ACA/ACCA adds 10-15%), (2) Engagement complexity (fundraising, M&A command premiums), (3) Company stage (Series B+ pay more), (4) Location (London rates 15-20% higher), (5) Time commitment (more days often means volume discounts).' },
  { question: 'Can I hire a fractional CFO for a specific project?', answer: 'Yes. Project-based fractional CFO fees range from £3,000-£30,000 depending on scope. Common projects: fundraising preparation (£10,000-£25,000), due diligence support (£5,000-£15,000), financial model build (£3,000-£8,000), system implementation (£5,000-£20,000).' },
  { question: 'When does it make sense to pay for a fractional CFO?', answer: 'A fractional CFO makes sense when: you need senior finance leadership but not full-time, preparing for fundraising or exit, outgrowing founder-led finance, implementing financial systems, needing board-level reporting, or bridging gap while hiring full-time CFO. Most companies start at £3M-£10M revenue.' },
]

export default function FractionalCFOCostPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CFO Cost UK 2026 | Pricing Guide"
        description="Complete guide to fractional CFO costs in the UK. Day rates, monthly retainers, and comparison with full-time CFO costs."
        url="https://fractional.quest/fractional-cfo-cost"
        dateModified={new Date('2026-01-31')}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`Fractional CFO Cost UK - ${imageAlt}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-teal-500/80 to-green-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Pricing Guide 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                <strong>Fractional CFO Cost</strong> UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Complete guide to <strong>fractional CFO cost</strong> in the UK. Day rates, monthly retainers, project fees, and how to maximise ROI on finance leadership.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors">
            Photo: {imageCredit.credit}
          </a>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400">£700-£1,200</div>
              <div className="text-sm text-gray-400">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">£2k-£15k</div>
              <div className="text-sm text-gray-400">Monthly Retainer</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">50-70%</div>
              <div className="text-sm text-gray-400">Savings vs Full-Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">1-3 days</div>
              <div className="text-sm text-gray-400">Typical Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Table of Contents */}
      <div className="lg:hidden max-w-4xl mx-auto px-6 py-8">
        <TableOfContentsMobile items={tocItems} />
      </div>

      {/* Main Content with Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Column */}
            <article className="prose prose-lg prose-gray max-w-none">

              <h2 id="overview" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">Fractional CFO Cost Overview</h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                <strong>Fractional CFO cost</strong> in the UK typically ranges from £700-£1,200 per day, or £2,000-£15,000 per month on retainer. Most businesses engage a fractional CFO for 1-3 days per week, providing senior finance leadership at 50-70% less than a full-time hire.
              </p>

              {/* Authority context box */}
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 not-prose">
                <p className="text-sm text-gray-700">
                  <strong>UK Market Context:</strong> According to{' '}
                  <a href="https://fastgrowthconsulting.com/fractional-cfo-costs-in-the-uk-what-startups-should-expect/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-medium">Fast Growth Consulting</a>{' '}
                  and{' '}
                  <a href="https://www.csuiterecruit.co.uk/how-much-is-a-uk-fractional-cfo-a-comprehensive-pricing-guide/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">C-Suite Recruit</a>{' '}
                  (Jan 2026), fractional CFO day rates range from £700-£1,200, with monthly retainers of £2,000-£10,000. Senior specialists and fundraise-focused CFOs command the top end.
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The &quot;founder misconception gap&quot; is common: many assume a fractional CFO is just a few hours of advice monthly. In reality, a fractional CFO is often the first proper finance leader a business has ever had, requiring hands-on work to build financial clarity, systems, and reporting before strategic value can be delivered.
              </p>

            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={tocItems} />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/fractional-cfo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>📋</span> What is a Fractional CFO?
                    </Link>
                    <Link href="/fractional-cfo-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>💵</span> CFO Salary Guide
                    </Link>
                    <Link href="/hire-fractional-cfo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>🎯</span> How to Hire a CFO
                    </Link>
                    <Link href="/fractional-cfo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>💼</span> CFO Jobs UK
                    </Link>
                    <Link href="/fractional-cfo-services" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>⚙️</span> CFO Services
                    </Link>
                  </div>
                </div>

                {/* Authority Links */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
                          <span className="text-emerald-400">→</span> {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 p-6 rounded-xl text-white">
                  <p className="font-bold mb-2">Find a Fractional CFO</p>
                  <p className="text-sm text-gray-300 mb-4">Browse pre-vetted finance leaders</p>
                  <Link href="/fractional-cfo-jobs-uk" className="block text-center bg-emerald-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-emerald-400 transition-colors text-sm">
                    View CFO Jobs
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Day Rates */}
      <section id="day-rates" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Day Rates</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO Day Rates UK</h2>
            <p className="text-xl text-gray-600">What you&apos;ll pay per day based on experience and specialisation.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">CFO Level</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Day Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Monthly (2 days/week)</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Early-Career Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£850</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£5,600-£6,800</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Seed stage, basic reporting</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-Level Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£850-£1,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£6,800-£8,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Series A, investor relations</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,200</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£8,000-£9,600</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Series B+, complex operations</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">PE/VC Specialist</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£1,200-£1,500</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£9,600-£12,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">M&A, exit prep, IPO</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Source:</strong> Day rate data validated against{' '}
              <a href="https://fastgrowthconsulting.com/fractional-cfo-costs-in-the-uk-what-startups-should-expect/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Fast Growth Consulting</a>,{' '}
              <a href="https://www.hirecfo.com/cost_of_hiring_a_fractional_cfo/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">HireCFO</a>, and{' '}
              <a href="https://www.csuiterecruit.co.uk/how-much-is-a-uk-fractional-cfo-a-comprehensive-pricing-guide/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">C-Suite Recruit</a>{' '}
              (Jan 2026).
            </p>
          </div>
        </div>
      </section>

      {/* Monthly Retainers */}
      <section id="monthly-retainers" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Retainers</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO Monthly Retainer Pricing</h2>
            <p className="text-xl text-gray-600">Predictable monthly costs for ongoing finance leadership.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-emerald-600 font-bold text-sm mb-2">STARTER</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£2,500-£4,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 1 day per week (4 days/month)</li>
                <li>• Monthly financial reporting</li>
                <li>• Cash flow oversight</li>
                <li>• Board pack preparation</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Seed/early-stage, £1-3M revenue</span>
              </div>
            </div>

            <div className="bg-white p-6 border-2 border-emerald-500 rounded-lg relative shadow-md">
              <div className="absolute -top-3 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">POPULAR</div>
              <div className="text-emerald-600 font-bold text-sm mb-2">GROWTH</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£5,000-£8,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 2 days per week (8 days/month)</li>
                <li>• Fundraising support</li>
                <li>• Investor relations</li>
                <li>• Financial modelling</li>
                <li>• Finance team oversight</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Series A-B, £3-15M revenue</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-emerald-600 font-bold text-sm mb-2">ENTERPRISE</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£10,000-£15,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 3+ days per week</li>
                <li>• Full CFO responsibilities</li>
                <li>• M&A / exit preparation</li>
                <li>• Board-level leadership</li>
                <li>• Team management</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: PE-backed, £15M+ or pre-exit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project-Based Pricing */}
      <section id="project-fees" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Projects</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Project-Based Fractional CFO Fees</h2>
            <p className="text-xl text-gray-600">Fixed-price engagements for specific deliverables.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Project Type</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Typical Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Deliverables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Financial Model Build</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£3,000-£8,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2-4 weeks</td>
                  <td className="px-6 py-4 text-sm text-gray-600">3-statement model, scenarios, dashboard</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Due Diligence Support</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£5,000-£15,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">4-8 weeks</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Data room, Q&A, investor meetings</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Fundraising Preparation</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£10,000-£25,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">8-12 weeks</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Deck, model, data room, investor intros</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Systems Implementation</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£5,000-£20,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">4-12 weeks</td>
                  <td className="px-6 py-4 text-sm text-gray-600">ERP/accounting system, reporting setup</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">M&A Exit Preparation</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£15,000-£30,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">3-6 months</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Clean-up, vendor DD, deal support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hourly Rates */}
      <section id="hourly-rates" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Hourly</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO Hourly Rates UK</h2>
            <p className="text-xl text-gray-600">For ad-hoc consultations and short-term advisory.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Level / Specialisation</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Hourly Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Standard Consultation</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£100-£150/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Quick financial reviews, ad-hoc advice</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior CFO (15+ years)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£150-£200/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Strategic planning, board prep</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Fundraising Specialist</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£175-£250/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Investor meetings, pitch prep</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">M&A / Exit Expert</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£200-£300/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Transaction advisory, due diligence</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">When to Use Hourly vs Retainer</h4>
            <p className="text-gray-600 text-sm">Hourly billing suits occasional needs like board meeting prep, investor calls, or specific questions. For ongoing strategic support (weekly reporting, cash flow management, team oversight), monthly retainers offer better value and predictable costs.</p>
          </div>
        </div>
      </section>

      {/* 3-Way Comparison Table */}
      <section id="comparison" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional vs Interim vs Full-Time CFO Cost</h2>
            <p className="text-xl text-gray-600">How the costs compare across different CFO engagement types.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Cost Factor</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-emerald-700">Fractional CFO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-blue-700">Interim CFO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time CFO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Day Rate</td>
                  <td className="px-4 py-4 text-sm text-emerald-700 font-semibold">£700-£1,200</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£1,000-£1,500</td>
                  <td className="px-4 py-4 text-sm text-gray-600">N/A (salaried)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-4 py-4 text-sm text-emerald-700 font-semibold">£2,500-£15,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£18,000-£30,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£12,000-£22,000+</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                  <td className="px-4 py-4 text-sm text-emerald-700 font-semibold">£30,000-£180,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£72,000-£120,000 (4-6mo)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£200,000-£350,000+</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Time Commitment</td>
                  <td className="px-4 py-4 text-sm text-gray-600">1-3 days/week</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full-time (temp)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full-time (perm)</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Duration</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Ongoing (6+ months)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">3-9 months typical</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Permanent</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Recruitment Fee</td>
                  <td className="px-4 py-4 text-sm text-emerald-700 font-semibold">None</td>
                  <td className="px-4 py-4 text-sm text-gray-600">None or minimal</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£30,000-£50,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Benefits & Pension</td>
                  <td className="px-4 py-4 text-sm text-emerald-700 font-semibold">None</td>
                  <td className="px-4 py-4 text-sm text-gray-600">None</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£15,000-£30,000/year</td>
                </tr>
                <tr className="bg-emerald-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                  <td className="px-4 py-4 text-sm text-emerald-800 font-medium">SMEs, startups, scale-ups</td>
                  <td className="px-4 py-4 text-sm text-blue-800 font-medium">Gap cover, crisis, M&A</td>
                  <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises, £50M+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Cost Savings:</strong> A fractional CFO at 2 days/week costs £60,000-£96,000/year vs £200,000-£350,000+ for a full-time CFO (salary + NI + pension + benefits + equity + recruitment). That&apos;s <strong>50-70% savings</strong> while maintaining senior finance leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Factors Affecting Pricing */}
      <section id="factors" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Pricing Factors</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">What Affects Fractional CFO Pricing</h2>
            <p className="text-xl text-gray-600">Key variables that determine what you&apos;ll pay.</p>
          </div>

          <div className="space-y-6">
            {[
              { factor: 'CFO Experience & Qualifications', impact: '+10-15%', desc: 'ACA/ACCA qualified, Big 4 background, or 15+ years experience command premium rates' },
              { factor: 'Fundraising or M&A Focus', impact: '+15-25%', desc: 'CFOs with successful fundraising track records or M&A experience charge more' },
              { factor: 'Company Stage & Complexity', impact: '+15-20%', desc: 'Series B+ companies, multi-entity structures, or PE-backed require senior CFOs' },
              { factor: 'Location (London Premium)', impact: '+15-20%', desc: 'London-based engagements typically cost more; remote-first arrangements may save' },
              { factor: 'Industry Specialisation', impact: '+10-20%', desc: 'SaaS, FinTech, and healthcare specialists in high demand' },
              { factor: 'Engagement Length', impact: '-5-10%', desc: 'Longer contracts (12+ months) may warrant volume discounts on day rates' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className={`text-lg font-bold ${item.impact.startsWith('+') ? 'text-green-600' : 'text-amber-600'}`}>
                    {item.impact}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.factor}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section id="roi" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Value</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO ROI: Is It Worth the Cost?</h2>
            <p className="text-xl text-gray-600">How fractional CFOs deliver value beyond their fees.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl font-black text-emerald-600 mb-2">2-5x</div>
              <h4 className="font-bold text-gray-900 mb-2">Typical ROI</h4>
              <p className="text-gray-600 text-sm">Most companies see 2-5x return on fractional CFO investment through cash flow improvement, better pricing, reduced costs, and avoiding costly mistakes.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl font-black text-emerald-600 mb-2">15-30%</div>
              <h4 className="font-bold text-gray-900 mb-2">Cash Flow Improvement</h4>
              <p className="text-gray-600 text-sm">Better working capital management, payment terms optimisation, and cash forecasting typically improve cash position by 15-30%.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl font-black text-emerald-600 mb-2">10-20%</div>
              <h4 className="font-bold text-gray-900 mb-2">Better Fundraising Terms</h4>
              <p className="text-gray-600 text-sm">CFO-prepared fundraises typically achieve 10-20% better valuations through professional financials, models, and investor relations.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl font-black text-emerald-600 mb-2">5-15%</div>
              <h4 className="font-bold text-gray-900 mb-2">Cost Reduction</h4>
              <p className="text-gray-600 text-sm">Identifying redundant costs, renegotiating contracts, and optimising vendor relationships typically saves 5-15% of operating expenses.</p>
            </div>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">When Fractional CFO Cost Makes Sense</h4>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• <strong>Revenue £1-20M:</strong> Need senior finance leadership but can&apos;t justify full-time CFO cost</li>
              <li>• <strong>Fundraising:</strong> Preparing for Series A-C, need investor-ready financials</li>
              <li>• <strong>Growth phase:</strong> Outgrowing founder-led finance, need systems and processes</li>
              <li>• <strong>Exit preparation:</strong> Getting financials ready for M&A or sale</li>
              <li>• <strong>Bridge hire:</strong> Need immediate CFO coverage while recruiting full-time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Qualifications</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Professional Bodies & Rate Premiums</h2>
            <p className="text-xl text-gray-600">Qualifications that justify higher fractional CFO costs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <a href="https://www.icaew.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">ICAEW (ACA)</h4>
                  <p className="text-sm text-gray-600">Institute of Chartered Accountants in England and Wales</p>
                  <p className="text-xs text-emerald-600 mt-1">+10-15% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">ACCA</h4>
                  <p className="text-sm text-gray-600">Association of Chartered Certified Accountants</p>
                  <p className="text-xs text-emerald-600 mt-1">+10-15% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://www.cimaglobal.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">CIMA</h4>
                  <p className="text-sm text-gray-600">Chartered Institute of Management Accountants</p>
                  <p className="text-xs text-emerald-600 mt-1">+10-15% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://www.bvca.co.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">BVCA</h4>
                  <p className="text-sm text-gray-600">British Private Equity & Venture Capital Association</p>
                  <p className="text-xs text-emerald-600 mt-1">PE/VC experience valued</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CFO Cost Calculator</h2>
            <p className="text-gray-600 mt-2">Estimate your potential costs based on engagement level</p>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Find a CFO</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Fractional CFO Opportunities</h2>
            <p className="text-xl text-gray-500">Connect with experienced fractional CFOs</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Finance"
            title="Latest CFO Jobs"
            accentColor="green"
            jobsPerPage={6}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO Cost FAQ</h2>
            <p className="text-xl text-gray-600">Common questions about fractional CFO pricing and costs.</p>
          </div>
          <FAQ items={faqItems} title="" skipSchema={true} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Related Resources</h2>
            <p className="text-gray-600">Explore more fractional CFO guides and resources</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CFO Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cfo" className="text-gray-600 hover:text-emerald-700 transition-colors">What is a Fractional CFO?</Link></li>
                <li><Link href="/fractional-cfo-salary" className="text-gray-600 hover:text-emerald-700 transition-colors">Fractional CFO Salary Guide</Link></li>
                <li><Link href="/hire-fractional-cfo" className="text-gray-600 hover:text-emerald-700 transition-colors">How to Hire a Fractional CFO</Link></li>
                <li><Link href="/fractional-cfo-services" className="text-gray-600 hover:text-emerald-700 transition-colors">CFO Services</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Other Cost Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cmo-cost" className="text-gray-600 hover:text-emerald-700 transition-colors">Fractional CMO Cost</Link></li>
                <li><Link href="/fractional-cto-cost" className="text-gray-600 hover:text-emerald-700 transition-colors">Fractional CTO Cost</Link></li>
                <li><Link href="/fractional-coo-cost" className="text-gray-600 hover:text-emerald-700 transition-colors">Fractional COO Cost</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
              <ul className="space-y-2">
                {authorityLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                      {link.name} <span className="text-gray-400 text-xs">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Find a Fractional CFO?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse UK fractional CFO opportunities and compare costs.
          </p>
          <Link href="/fractional-cfo-jobs-uk" className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors inline-block">
            Browse CFO Jobs
          </Link>
        </div>
      </section>

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
