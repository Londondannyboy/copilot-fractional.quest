import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema, FAQPageSchema, FAQ, FAQItem } from '@/components/seo'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleContentHub } from '@/components/RoleContentHub'
import { TableOfContents } from '@/components/TableOfContents'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('salary')
const imageAlt = getImage('salary').alt
const heroImage = getHeroImageUrl('cfo', 1920, 800)
const imageCredit = getImage('cfo')

export const metadata: Metadata = {
  title: 'Fractional CFO Salary UK 2026 | Day Rates, Annual Earnings & Compensation Guide',
  description: 'Fractional CFO salary UK: day rates £700-£1,400. Compare costs by experience, location, specialisation. Calculate potential earnings with our salary calculator.',
  keywords: 'fractional cfo salary, fractional cfo salary uk, fractional cfo day rate, fractional cfo cost, cfo salary uk, part time cfo salary, fractional cfo rates, fractional finance salary, cfo compensation, cfo earnings',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cfo-salary',
  },
  openGraph: {
    title: 'Fractional CFO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CFO salary UK: Day rates £700-£1,400. Complete guide to fractional CFO costs, earnings by experience level and location.',
    url: 'https://fractional.quest/fractional-cfo-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CFO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CFO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CFO salary UK: Day rates £700-£1,400. Complete guide to fractional CFO costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CFO', href: '/fractional-cfo' },
  { label: 'Salary Guide', href: '/fractional-cfo-salary' },
]

// Table of Contents items for SEO
const tocItems = [
  { id: 'overview', title: 'Salary Overview' },
  { id: 'experience-level', title: 'Salary by Experience Level' },
  { id: 'location', title: 'Salary by Location' },
  { id: 'specialisation', title: 'Salary by Specialisation' },
  { id: 'factors', title: 'Factors Affecting Salary' },
  { id: 'vs-fulltime', title: 'Fractional vs Full-Time' },
  { id: 'calculator', title: 'Salary Calculator' },
  { id: 'ir35', title: 'IR35 Impact' },
  { id: 'faq', title: 'FAQ' },
]

// External authority links for E-E-A-T (CFO-specific)
const authorityLinks = [
  { name: 'ICAEW', url: 'https://www.icaew.com', description: 'Institute of Chartered Accountants' },
  { name: 'ACCA', url: 'https://www.accaglobal.com', description: 'Association of Chartered Certified Accountants' },
  { name: 'CIMA', url: 'https://www.cimaglobal.com', description: 'Chartered Institute of Management Accountants' },
  { name: 'FRC', url: 'https://www.frc.org.uk', description: 'Financial Reporting Council' },
  { name: 'HMRC', url: 'https://www.gov.uk/government/organisations/hm-revenue-customs', description: 'Tax guidance' },
  { name: 'ONS Earnings Data', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', description: 'Official UK earnings statistics' },
]

const faqItems: FAQItem[] = [
  { question: 'What is the average fractional CFO salary in the UK?', answer: 'The average fractional CFO earns around £1,050 per day in the UK. Working 2-3 days per week, this translates to annual earnings of £109,000-£164,000. Entry-level fractional CFOs start at £650-£850/day, while specialists with PE/VC experience command £1,300-£1,600/day.' },
  { question: 'How does fractional CFO salary compare to full-time?', answer: 'Fractional CFOs often earn higher hourly rates than full-time equivalents. A full-time CFO earning £150,000 salary works out to roughly £575/day, while fractional CFOs charge £700-£1,400/day. However, fractional CFOs must cover their own benefits, pension, and manage multiple clients to achieve similar annual earnings.' },
  { question: 'What factors affect fractional CFO day rates?', answer: 'Key factors include: (1) Professional qualifications - ACA/ACCA add 10-15%, (2) Fundraising track record - successful rounds command premiums, (3) Industry expertise - SaaS and FinTech specialists earn more, (4) Big 4 background - ex-Deloitte, PwC, EY, KPMG adds value, (5) Company stage - Series B+ pay 15-20% more, (6) Location - London rates are 15-20% higher.' },
  { question: 'Do fractional CFOs get equity compensation?', answer: 'Some fractional CFOs receive small equity grants (typically 0.1-0.5%) as part of their compensation package, especially for longer engagements with startups. This is less common than for full-time CFOs who typically receive 0.5-2% equity. Equity is usually offered in exchange for a reduced day rate.' },
  { question: 'How much can I earn as a fractional CFO working 3 clients?', answer: 'A fractional CFO working 3 clients at 1.5 days per week each (4.5 days total) at an average rate of £1,000/day could earn around £234,000 annually. However, this requires excellent time management and client relationship skills. Most fractional CFOs work with 2-4 clients simultaneously.' },
  { question: 'What is the difference between inside and outside IR35 for fractional CFOs?', answer: 'IR35 status significantly impacts take-home pay. Outside IR35, a fractional CFO on £1,000/day might take home approximately £700/day after corporation tax and dividends. Inside IR35, the same rate yields around £550/day after PAYE deductions. Many fractional CFOs factor IR35 status into their rate negotiations.' },
  { question: 'Are fractional CFO rates negotiable?', answer: 'Yes, rates are negotiable based on several factors: engagement length (longer contracts may offer 5-10% discount), days per week (volume discounts for 3+ days), payment terms (upfront payment may warrant discount), and scope complexity. Most fractional CFOs have a minimum day rate but flexibility above that.' },
  { question: 'How do London fractional CFO salaries compare to other UK cities?', answer: 'London fractional CFOs typically earn 15-20% more than the UK average. London rates range from £900-£1,400/day, while Manchester and Birmingham average £700-£1,100/day. Remote-first fractional CFOs often charge UK-average rates regardless of their location.' },
]

export default function FractionalCfoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CFO Salary UK 2026 | Day Rates & Compensation Guide"
        description="Complete guide to fractional CFO salary UK. Day rates, annual equivalents, and factors affecting compensation."
        url="https://fractional.quest/fractional-cfo-salary"
        dateModified={new Date('2026-01-30')}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`Fractional CFO Salary UK - ${imageAlt}`}
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
                Salary Guide 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                <strong>Fractional CFO Salary</strong> UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Complete guide to <strong>fractional CFO salary UK</strong> rates. Day rates, annual equivalents, and factors affecting compensation.
              </p>
            </div>
          </div>
        </div>
        {/* Photo Credit */}
        <div className="absolute bottom-2 right-2 z-10">
          <a
            href={imageCredit.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 hover:text-white/70 transition-colors"
          >
            Photo: {imageCredit.credit}
          </a>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400">£700-£1,400</div>
              <div className="text-sm text-gray-400">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">£1,050</div>
              <div className="text-sm text-gray-400">Average Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">£70k-£170k</div>
              <div className="text-sm text-gray-400">Annual Equivalent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">2-3 days</div>
              <div className="text-sm text-gray-400">Typical Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents & Authority Links */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TableOfContents items={tocItems} title="In This Guide" accentColor="emerald" />
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
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
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="overview" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">

            <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional CFO Salary UK Overview</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              <strong>Fractional CFO salary</strong> in the UK typically ranges from £700-£1,400 per day, with the average around £1,050/day. CFOs with fundraising experience and PE/VC backgrounds command premium rates. ACA and ACCA qualified candidates typically earn at the higher end.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Working 2-3 days per week across multiple clients, fractional CFOs can achieve annual earnings of £109,000-£218,000. The most successful fractional CFOs specialise in specific industries like SaaS, FinTech, or healthcare, commanding day rates of £1,200-£1,600.
            </p>

          </article>
        </div>
      </section>

      {/* Salary by Experience Level */}
      <section id="experience-level" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Experience</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO Salary by Experience Level</h2>
            <p className="text-xl text-gray-600">How experience and qualifications impact day rates and annual earnings.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Experience Level</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Day Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Annual (2 days/week)</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Typical Background</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Entry-level Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£650-£850</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£68,000-£88,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">5-8 years finance, first fractional role</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£850-£1,100</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£88,000-£114,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">8-12 years, multiple fractional engagements</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,100-£1,400</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£114,000-£145,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">12+ years, Big 4 or FTSE experience</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Specialist (PE/VC)</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£1,300-£1,600</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£135,000-£166,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PE/VC portfolio, M&A, IPO experience</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-lg mt-8">
            <h4 className="font-bold text-gray-900 mb-2">Qualification Premium</h4>
            <p className="text-gray-700">ACA, ACCA, or CIMA qualified fractional CFOs typically command 10-15% higher day rates. Big 4 experience (Deloitte, PwC, EY, KPMG) adds a similar premium, with the combination of both commanding rates at the top of each band.</p>
          </div>
        </div>
      </section>

      {/* Salary by Location */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Location</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO Salary by Location</h2>
            <p className="text-xl text-gray-600">Regional variations in fractional CFO day rates across the UK.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Day Rate Range</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Premium vs UK Avg</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">London</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£900-£1,400</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">+15-20%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">VC/PE hub, tech and finance sectors</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Manchester</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£750-£1,150</td>
                  <td className="px-6 py-4 text-sm text-gray-600">+5%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Growing tech scene, media sector</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Bristol & South West</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£1,100</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Tech hub, aerospace, clean energy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Birmingham</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£1,050</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Manufacturing, professional services</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Edinburgh</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£750-£1,150</td>
                  <td className="px-6 py-4 text-sm text-green-600">+5%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Financial services, fintech</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Remote UK</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£650-£1,000</td>
                  <td className="px-6 py-4 text-sm text-red-600">-5-10%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Competitive rates, wider talent pool</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">London Premium Explained</h4>
              <p className="text-gray-600 text-sm">London rates are 15-20% higher due to concentration of VC/PE-backed companies, higher cost of living, and demand for CFOs with fundraising experience. Many London-based fractional CFOs serve clients UK-wide.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">Remote Working Impact</h4>
              <p className="text-gray-600 text-sm">Post-pandemic, many fractional CFOs work remotely with occasional on-site days. This has narrowed regional pay gaps, though London-headquartered companies still pay premium rates even for remote CFOs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Salary by Specialisation */}
      <section id="specialisation" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Specialisation</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO Salary by Specialisation</h2>
            <p className="text-xl text-gray-600">How industry expertise and specialisation impact earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              { title: 'VC-Backed CFO', desc: 'Fundraising, investor relations, data rooms', rate: '£1,100-£1,400/day', demand: 'High' },
              { title: 'PE Portfolio CFO', desc: 'Value creation, exit planning, M&A support', rate: '£1,200-£1,500/day', demand: 'Very High' },
              { title: 'SaaS/Tech CFO', desc: 'Unit economics, MRR/ARR metrics, growth finance', rate: '£1,000-£1,300/day', demand: 'High' },
              { title: 'Scale-up CFO', desc: 'Growth finance, cash management, team building', rate: '£900-£1,200/day', demand: 'High' },
              { title: 'Turnaround CFO', desc: 'Restructuring, crisis management, cash control', rate: '£1,000-£1,300/day', demand: 'Medium' },
              { title: 'IPO-Ready CFO', desc: 'Public market prep, governance, compliance', rate: '£1,300-£1,600/day', demand: 'Specialist' },
            ].map((type, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{type.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-700 font-semibold">{type.rate}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">{type.demand} Demand</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors Affecting Salary */}
      <section id="factors" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Factors</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Factors Affecting Fractional CFO Salary</h2>
            <p className="text-xl text-gray-600">Key variables that determine your earning potential as a fractional CFO.</p>
          </div>

          <div className="space-y-6">
            {[
              { factor: 'Professional Qualification', impact: '+10-15%', desc: 'ACA/ACCA qualified typically earn more than non-qualified peers' },
              { factor: 'Fundraising Track Record', impact: '+15-25%', desc: 'Multiple successful rounds (Series A-C) command significant premiums' },
              { factor: 'Industry Expertise', impact: '+10-20%', desc: 'SaaS, FinTech, and healthcare specialists in high demand' },
              { factor: 'Big 4 Background', impact: '+10-15%', desc: 'Ex-Deloitte, PwC, EY, KPMG professionals command higher rates' },
              { factor: 'Company Stage', impact: '+15-20%', desc: 'Series B+ companies typically pay more than seed stage' },
              { factor: 'Engagement Length', impact: '-5-10%', desc: 'Longer contracts (12+ months) may warrant volume discounts' },
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

      {/* Fractional vs Full-Time Comparison */}
      <section id="vs-fulltime" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CFO vs Full-Time CFO Salary</h2>
            <p className="text-xl text-gray-600">Understanding the total compensation comparison.</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-6 text-lg">Total Cost Comparison (Employer Perspective)</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-gray-700">Full-time CFO base salary</span>
                <span className="font-semibold">£120,000-£200,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-gray-700">+ Employer NI, pension, benefits</span>
                <span className="font-semibold">+£25,000-£45,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-gray-700">+ Equity (estimated value)</span>
                <span className="font-semibold">+£30,000-£100,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-gray-700">+ Recruitment fees (20-25%)</span>
                <span className="font-semibold">+£25,000-£50,000</span>
              </div>
              <div className="flex justify-between items-center pt-3 text-lg border-t-2 border-gray-300">
                <span className="font-bold text-gray-900">Full-time Total Cost (Year 1)</span>
                <span className="font-bold text-red-600">£200,000-£395,000</span>
              </div>
              <div className="flex justify-between items-center pt-4 bg-emerald-50 p-4 rounded-lg mt-4">
                <span className="font-bold text-gray-900">Fractional CFO (2 days/week)</span>
                <span className="font-bold text-emerald-700">£73,000-£145,000/year</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6">Fractional CFOs typically cost 40-60% less than full-time equivalents while providing senior-level expertise</p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CFO Salary Calculator</h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CFO</p>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* IR35 Section */}
      <section id="ir35" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Impact on Fractional CFO Salary</h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={1050} />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about fractional CFO salary and compensation.</p>
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
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CFO Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cfo" className="text-gray-600 hover:text-emerald-700 transition-colors">What is a Fractional CFO?</Link></li>
                <li><Link href="/hire-fractional-cfo" className="text-gray-600 hover:text-emerald-700 transition-colors">How to Hire a Fractional CFO</Link></li>
                <li><Link href="/fractional-cfo-services" className="text-gray-600 hover:text-emerald-700 transition-colors">CFO Services</Link></li>
                <li><Link href="/fractional-cfo-jobs-uk" className="text-gray-600 hover:text-emerald-700 transition-colors">CFO Jobs UK</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Other Salary Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cmo-salary" className="text-gray-600 hover:text-emerald-700 transition-colors">Fractional CMO Salary</Link></li>
                <li><Link href="/fractional-cto-salary" className="text-gray-600 hover:text-emerald-700 transition-colors">Fractional CTO Salary</Link></li>
                <li><Link href="/fractional-coo-salary" className="text-gray-600 hover:text-emerald-700 transition-colors">Fractional COO Salary</Link></li>
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Find Fractional CFO Opportunities</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse UK fractional CFO roles and compare compensation packages.
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
