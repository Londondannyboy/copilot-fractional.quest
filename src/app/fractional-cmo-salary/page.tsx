import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema, FAQPageSchema, FAQ, FAQItem } from '@/components/seo'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleContentHub } from '@/components/RoleContentHub'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('salary')
const imageAlt = getImage('salary').alt
const heroImage = getHeroImageUrl('cmo', 1920, 800)
const imageCredit = getImage('cmo')

export const metadata: Metadata = {
  title: 'Fractional CMO Salary UK 2026 | Day Rates, Annual Earnings & Compensation Guide',
  description: 'Fractional CMO salary UK: day rates £700-£1,400. Compare costs by experience, location, specialisation. Calculate potential earnings with our salary calculator.',
  keywords: 'fractional cmo salary, fractional cmo salary uk, fractional cmo day rate, fractional cmo cost, cmo salary uk, part time cmo salary, fractional cmo rates, fractional marketing salary, cmo compensation, marketing director salary',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cmo-salary',
  },
  openGraph: {
    title: 'Fractional CMO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CMO salary UK: Day rates £700-£1,400. Complete guide to fractional CMO costs, earnings by experience level and location.',
    url: 'https://fractional.quest/fractional-cmo-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CMO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CMO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CMO salary UK: Day rates £700-£1,400. Complete guide to fractional CMO costs and compensation.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CMO', href: '/fractional-cmo' },
  { label: 'Salary Guide', href: '/fractional-cmo-salary' },
]

// Table of Contents items for SEO
const tocItems = [
  { id: 'overview', title: 'Salary Overview' },
  { id: 'experience-level', title: 'Salary by Experience Level' },
  { id: 'hourly-rates', title: 'Hourly Rates' },
  { id: 'monthly-retainers', title: 'Monthly Retainers' },
  { id: 'location', title: 'Salary by Location' },
  { id: 'specialisation', title: 'Salary by Specialisation' },
  { id: 'comparison', title: 'Fractional vs Interim vs Full-Time' },
  { id: 'factors', title: 'Factors Affecting Salary' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'calculator', title: 'Salary Calculator' },
  { id: 'ir35', title: 'IR35 Impact' },
  { id: 'jobs', title: 'CMO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

// External authority links for E-E-A-T (CMO-specific)
const authorityLinks = [
  { name: 'CIM', url: 'https://www.cim.co.uk', description: 'Chartered Institute of Marketing' },
  { name: 'Marketing Week', url: 'https://www.marketingweek.com', description: 'UK Marketing News & Insights' },
  { name: 'IDM', url: 'https://www.theidm.com', description: 'Institute of Data & Marketing' },
  { name: 'IPA', url: 'https://ipa.co.uk', description: 'Institute of Practitioners in Advertising' },
  { name: 'DMA', url: 'https://dma.org.uk', description: 'Data & Marketing Association' },
  { name: 'ONS Earnings Data', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', description: 'Official UK earnings statistics' },
]

const faqItems: FAQItem[] = [
  { question: 'What is the average fractional CMO salary in the UK?', answer: 'The average fractional CMO earns around £950 per day in the UK. Working 2-3 days per week, this translates to annual earnings of £99,000-£148,000. Entry-level fractional CMOs start at £600-£800/day, while specialists with PE/VC-backed scale-up experience command £1,200-£1,500/day.' },
  { question: 'How does fractional CMO salary compare to full-time?', answer: 'Fractional CMOs often earn higher hourly rates than full-time equivalents. A full-time CMO earning £140,000 salary works out to roughly £538/day, while fractional CMOs charge £700-£1,400/day. However, fractional CMOs must cover their own benefits, pension, and manage multiple clients to achieve similar annual earnings.' },
  { question: 'What factors affect fractional CMO day rates?', answer: 'Key factors include: (1) Industry expertise - SaaS and B2B tech specialists earn more, (2) Channel specialisation - PLG, demand gen, and ABM experts command premiums, (3) Track record - proven growth metrics and exits add value, (4) Company stage - Series B+ pay 15-20% more, (5) Location - London rates are 15-20% higher, (6) Qualifications - CIM Chartered Marketer status adds credibility.' },
  { question: 'Do fractional CMOs get equity compensation?', answer: 'Some fractional CMOs receive small equity grants (typically 0.1-0.5%) as part of their compensation package, especially for longer engagements with early-stage startups. This is less common than for full-time CMOs who typically receive 0.3-1% equity. Equity is usually offered in exchange for a reduced day rate.' },
  { question: 'How much can I earn as a fractional CMO working 3 clients?', answer: 'A fractional CMO working 3 clients at 1.5 days per week each (4.5 days total) at an average rate of £950/day could earn around £222,000 annually. However, this requires excellent time management and client relationship skills. Most fractional CMOs work with 2-4 clients simultaneously.' },
  { question: 'What is the difference between inside and outside IR35 for fractional CMOs?', answer: 'IR35 status significantly impacts take-home pay. Outside IR35, a fractional CMO on £950/day might take home approximately £665/day after corporation tax and dividends. Inside IR35, the same rate yields around £520/day after PAYE deductions. Many fractional CMOs factor IR35 status into their rate negotiations.' },
  { question: 'Are fractional CMO rates negotiable?', answer: 'Yes, rates are negotiable based on several factors: engagement length (longer contracts may offer 5-10% discount), days per week (volume discounts for 3+ days), payment terms (upfront payment may warrant discount), and scope complexity. Most fractional CMOs have a minimum day rate but flexibility above that.' },
  { question: 'How do London fractional CMO salaries compare to other UK cities?', answer: 'London fractional CMOs typically earn 15-20% more than the UK average. London rates range from £900-£1,400/day, while Manchester and Birmingham average £700-£1,100/day. Remote-first fractional CMOs often charge UK-average rates regardless of their location.' },
  { question: 'What qualifications increase fractional CMO earning potential?', answer: 'CIM Chartered Marketer status, IDM qualifications, and MBA degrees can add 5-15% to rates. More impactful is demonstrable track record: successful product launches, significant growth metrics (MRR/ARR growth, CAC reduction), and experience with funded startups or PE-backed companies.' },
  { question: 'Should I charge by day rate or monthly retainer?', answer: 'Both models work well. Day rates offer flexibility and are easier to compare to market rates. Monthly retainers provide predictable income and can include a small premium for commitment certainty. Many fractional CMOs start with day rates and transition successful relationships to monthly retainers.' },
]

export default function FractionalCmoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CMO Salary UK 2026 | Day Rates & Compensation Guide"
        description="Complete guide to fractional CMO salary UK. Day rates, annual equivalents, and factors affecting compensation."
        url="https://fractional.quest/fractional-cmo-salary"
        dateModified={new Date('2026-01-31')}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`${imageAlt} - Fractional CMO Salary UK Compensation Guide`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/90 via-orange-600/80 to-yellow-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Salary Guide 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                <strong>Fractional CMO Salary</strong> UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Complete guide to <strong>fractional CMO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-white/60 text-xs">
          Photo by <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">{imageCredit.credit}</a> on Unsplash
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-400">£700-£1,400</div>
              <div className="text-sm text-gray-400">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">£950</div>
              <div className="text-sm text-gray-400">Average Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">£70k-£170k</div>
              <div className="text-sm text-gray-400">Annual Equivalent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">2-3 days</div>
              <div className="text-sm text-gray-400">Typical Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Table of Contents */}
      <div className="lg:hidden max-w-4xl mx-auto px-6 py-8">
        <TableOfContentsMobile items={tocItems} />
      </div>

      {/* Table of Contents & Authority Links */}
      <section className="py-8 bg-white border-b hidden lg:block">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TableOfContents items={tocItems} title="In This Guide" accentColor="amber" />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
              <ul className="space-y-3">
                {authorityLinks.slice(0, 4).map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-amber-600 hover:text-amber-800 flex items-center gap-2">
                      <span className="text-amber-400">→</span> {link.name}
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

            <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional CMO Salary UK Overview</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              <strong>Fractional CMO salary</strong> in the UK typically ranges from £700-£1,400 per day, with the average sitting around £950/day. This translates to annual earnings of £70,000-£170,000 depending on days worked per week and number of clients.
            </p>

            {/* Authority context box */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> According to{' '}
                <a href="https://porterwills.co/thoughts/fractional-cmo-cost-pricing-global-guide-2026" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline font-medium">Porter Wills</a>{' '}
                and{' '}
                <a href="https://www.communicationsedge.co.uk/fractional-cmo-cost" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">Communications Edge</a>{' '}
                (Jan 2026), UK fractional CMO day rates range from £600-£2,500, with London commanding £1,000-£2,500/day and monthly retainers of £6,000-£20,000+.
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Working 2-3 days per week across multiple clients, fractional CMOs can achieve annual earnings of £99,000-£218,000. The most successful fractional CMOs specialise in specific industries like SaaS, B2B tech, or eCommerce, commanding day rates of £1,100-£1,500.
            </p>

          </article>
        </div>
      </section>

      {/* Salary by Experience Level */}
      <section id="experience-level" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Experience</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CMO Salary by Experience Level</h2>
            <p className="text-xl text-gray-600">How experience and track record impact day rates and annual earnings.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-amber-700 text-white">
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
                  <td className="px-6 py-4 text-sm text-gray-600">£600-£800</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£62,000-£83,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">5-8 years marketing, first fractional role</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£800-£1,100</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£83,000-£114,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">8-12 years, multiple fractional engagements</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,100-£1,400</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£114,000-£145,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">12+ years, proven scale-up experience</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Specialist (PE/VC)</td>
                  <td className="px-6 py-4 text-sm text-amber-700 font-semibold">£1,300-£1,600</td>
                  <td className="px-6 py-4 text-sm text-amber-700 font-semibold">£135,000-£166,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PE/VC portfolio, exits, category creation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-lg mt-8">
            <h4 className="font-bold text-gray-900 mb-2">Track Record Premium</h4>
            <p className="text-gray-700">CMOs with demonstrable growth metrics (100%+ YoY growth, significant CAC reduction, successful product launches) typically command 15-25% higher rates than peers with similar experience but less quantifiable results.</p>
          </div>
        </div>
      </section>

      {/* Hourly Rates */}
      <section id="hourly-rates" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Hourly</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CMO Hourly Rates UK</h2>
            <p className="text-xl text-gray-600">For ad-hoc consultations and project-based work.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-amber-700 text-white">
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
                  <td className="px-6 py-4 text-sm text-gray-600">Campaign reviews, ad-hoc strategy advice</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior CMO (15+ years)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£150-£200/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Strategic planning, board presentations</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">B2B/SaaS Specialist</td>
                  <td className="px-6 py-4 text-sm text-amber-700 font-semibold">£175-£250/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PLG strategy, demand gen audits</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">PE/VC Growth Expert</td>
                  <td className="px-6 py-4 text-sm text-amber-700 font-semibold">£200-£300/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Portfolio reviews, exit marketing prep</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">When to Use Hourly Rates</h4>
            <p className="text-gray-600 text-sm">Hourly billing suits short-term advisory, specific deliverables, or occasional strategic input. For ongoing marketing leadership, monthly retainers typically offer better value.</p>
          </div>
        </div>
      </section>

      {/* Monthly Retainers */}
      <section id="monthly-retainers" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Retainers</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CMO Monthly Retainer Pricing</h2>
            <p className="text-xl text-gray-600">Ongoing marketing leadership on a predictable budget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-amber-600 font-bold text-sm mb-2">STARTER</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£3,000-£5,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 1 day per week (4 days/month)</li>
                <li>• Marketing strategy oversight</li>
                <li>• Monthly performance reviews</li>
                <li>• Agency direction</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Early-stage, strong marketing team</span>
              </div>
            </div>

            <div className="bg-white p-6 border-2 border-amber-500 rounded-lg relative shadow-md">
              <div className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">POPULAR</div>
              <div className="text-amber-600 font-bold text-sm mb-2">GROWTH</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£6,000-£10,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 2 days per week (8 days/month)</li>
                <li>• Active campaign leadership</li>
                <li>• Team & agency management</li>
                <li>• Demand gen ownership</li>
                <li>• Board-level reporting</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Scale-ups, Series A-B</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-amber-600 font-bold text-sm mb-2">ENTERPRISE</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£12,000-£20,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 3+ days per week</li>
                <li>• Full CMO responsibilities</li>
                <li>• Team building & hiring</li>
                <li>• Brand transformation</li>
                <li>• PE/VC portfolio work</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: PE-backed, major rebrands</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Cost Comparison:</strong> A fractional CMO at £8,000/month (£96,000/year) provides senior marketing leadership at <strong>50-60% less</strong> than a full-time CMO total cost of £180,000-£300,000 (salary + benefits + equity + recruitment). Source:{' '}
              <a href="https://porterwills.co/thoughts/fractional-cmo-cost-pricing-global-guide-2026" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">Porter Wills</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Salary by Location */}
      <section id="location" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Location</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CMO Salary by Location</h2>
            <p className="text-xl text-gray-600">Regional variations in fractional CMO day rates across the UK.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-amber-700 text-white">
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
                  <td className="px-6 py-4 text-sm text-gray-600">Tech hub, funded startups, agencies</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Manchester</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£1,100</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Growing tech scene, media sector</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Bristol</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£1,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Creative hub, tech startups</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Birmingham</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£1,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">B2B marketing, professional services</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Edinburgh</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£750-£1,100</td>
                  <td className="px-6 py-4 text-sm text-green-600">+5%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Fintech, data, gaming</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Remote UK</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£650-£950</td>
                  <td className="px-6 py-4 text-sm text-red-600">-5-10%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Competitive rates, wider talent pool</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">London Premium Explained</h4>
              <p className="text-gray-600 text-sm">London rates are 15-20% higher due to concentration of funded startups, marketing agencies, and tech companies. Many London-based fractional CMOs serve clients across Europe and North America.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">Remote Working Impact</h4>
              <p className="text-gray-600 text-sm">Post-pandemic, many fractional CMOs work remotely with occasional on-site days. This has narrowed regional pay gaps, though London-headquartered companies still pay premium rates for remote CMOs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Salary by Specialisation */}
      <section id="specialisation" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Specialisation</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CMO Salary by Specialisation</h2>
            <p className="text-xl text-gray-600">How industry expertise and channel specialisation impact earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              { title: 'SaaS/B2B Tech CMO', desc: 'PLG, demand gen, ABM, content marketing', rate: '£1,000-£1,300/day', demand: 'Very High' },
              { title: 'PE Portfolio CMO', desc: 'Value creation, brand repositioning, acquisition marketing', rate: '£1,100-£1,400/day', demand: 'High' },
              { title: 'eCommerce CMO', desc: 'Performance marketing, CRO, retention', rate: '£900-£1,200/day', demand: 'High' },
              { title: 'FinTech CMO', desc: 'Regulatory marketing, trust building, B2B2C', rate: '£1,000-£1,300/day', demand: 'High' },
              { title: 'Consumer Brand CMO', desc: 'Brand building, partnerships, influencer', rate: '£850-£1,150/day', demand: 'Medium' },
              { title: 'HealthTech CMO', desc: 'Regulated marketing, clinical messaging, B2B', rate: '£950-£1,250/day', demand: 'Growing' },
            ].map((type, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{type.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-semibold">{type.rate}</span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">{type.demand} Demand</span>
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
            <h2 className="text-3xl font-black text-gray-900 mb-4">Factors Affecting Fractional CMO Salary</h2>
            <p className="text-xl text-gray-600">Key variables that determine your earning potential as a fractional CMO.</p>
          </div>

          <div className="space-y-6">
            {[
              { factor: 'Industry Specialisation', impact: '+10-20%', desc: 'SaaS, FinTech, and healthcare CMOs command premiums due to specific expertise required' },
              { factor: 'Channel Expertise', impact: '+10-15%', desc: 'PLG, demand gen, and ABM specialists earn higher rates than generalists' },
              { factor: 'Proven Growth Metrics', impact: '+15-25%', desc: 'Demonstrable results (100%+ growth, significant CAC reduction) justify premium rates' },
              { factor: 'Company Stage', impact: '+15-20%', desc: 'Series B+ companies typically pay more than seed stage startups' },
              { factor: 'Exit Experience', impact: '+10-20%', desc: 'Having led marketing through successful exit or IPO commands premium' },
              { factor: 'Engagement Length', impact: '-5-10%', desc: 'Longer contracts (12+ months) may warrant volume discounts for certainty' },
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

      {/* 3-Way Comparison Table */}
      <section id="comparison" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional vs Interim vs Full-Time CMO</h2>
            <p className="text-xl text-gray-600">Understanding the salary and engagement differences.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-amber-700">Fractional CMO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-blue-700">Interim CMO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time CMO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Day Rate</td>
                  <td className="px-4 py-4 text-sm text-amber-700 font-semibold">£700-£1,400</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£900-£1,500</td>
                  <td className="px-4 py-4 text-sm text-gray-600">N/A (salaried)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-4 py-4 text-sm text-amber-700 font-semibold">£3,000-£20,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£16,000-£28,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£10,000-£17,000+</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                  <td className="px-4 py-4 text-sm text-amber-700 font-semibold">£36,000-£240,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£65,000-£110,000 (4-6mo)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£180,000-£300,000+</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Commitment</td>
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
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Primary Focus</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Strategy, growth, scaling</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Gap cover, rebrand, crisis</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full marketing ownership</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                  <td className="px-4 py-4 text-sm text-amber-800 font-medium">SMEs, startups, scale-ups</td>
                  <td className="px-4 py-4 text-sm text-blue-800 font-medium">Vacancy, M&A, rebrand</td>
                  <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises, £50M+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Savings Summary:</strong> A fractional CMO at 2 days/week costs £72,000-£120,000/year vs £180,000-£300,000+ for a full-time CMO (including salary, NI, pension, benefits, equity, and recruitment fees). That&apos;s <strong>50-60% savings</strong> while maintaining senior marketing leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Compensation Structures */}
      <section id="compensation-structures" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Structures</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Structuring Your Fractional CMO Compensation</h2>
            <p className="text-xl text-gray-600">Common payment models and how to choose the right one.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                model: 'Day Rate Retainer',
                desc: 'Fixed days per week at agreed daily rate',
                pros: 'Flexibility, easy to compare market rates, clear time boundaries',
                cons: 'Can feel transactional, less predictable income',
                bestFor: 'New relationships, project-based work'
              },
              {
                model: 'Monthly Retainer',
                desc: 'Set monthly fee for defined scope of work',
                pros: 'Predictable income, feels more strategic, can include small premium',
                cons: 'Scope creep risk, harder to compare rates',
                bestFor: 'Established relationships, ongoing strategic work'
              },
              {
                model: 'Project-Based',
                desc: 'Fixed fee for specific deliverables',
                pros: 'Clear deliverables, value-based pricing opportunity',
                cons: 'Scope changes can be complex, requires good estimation',
                bestFor: 'GTM strategy, brand positioning, specific campaigns'
              },
              {
                model: 'Hybrid + Equity',
                desc: 'Base retainer plus small equity grant (0.1-0.5%)',
                pros: 'Aligned incentives, upside potential, long-term relationship',
                cons: 'Equity may be worthless, complex negotiations',
                bestFor: 'Early-stage startups, long-term engagements'
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">{item.model}</h4>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <div className="space-y-2 text-sm">
                  <div><span className="text-green-600 font-medium">Pros:</span> <span className="text-gray-600">{item.pros}</span></div>
                  <div><span className="text-amber-600 font-medium">Cons:</span> <span className="text-gray-600">{item.cons}</span></div>
                  <div><span className="text-amber-600 font-medium">Best for:</span> <span className="text-gray-600">{item.bestFor}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Fractional CMO Salary Calculator
            </h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CMO</p>
          </div>
          <RoleCalculator role="cmo" />
        </div>
      </section>

      {/* Qualifications Section */}
      <section id="qualifications" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Qualifications</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Professional Bodies & Certifications</h2>
            <p className="text-xl text-gray-600">Key qualifications that impact fractional CMO earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <a href="https://www.cim.co.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-amber-700">CIM (Chartered Marketer)</h4>
                  <p className="text-sm text-gray-600">Chartered Institute of Marketing</p>
                  <p className="text-xs text-amber-600 mt-1">+5-10% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://www.theidm.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-amber-700">IDM</h4>
                  <p className="text-sm text-gray-600">Institute of Data & Marketing</p>
                  <p className="text-xs text-amber-600 mt-1">+5-10% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://ipa.co.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-amber-700">IPA</h4>
                  <p className="text-sm text-gray-600">Institute of Practitioners in Advertising</p>
                  <p className="text-xs text-gray-500 mt-1">Agency background valued</p>
                </div>
              </div>
            </a>
            <a href="https://dma.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-amber-700">DMA</h4>
                  <p className="text-sm text-gray-600">Data & Marketing Association</p>
                  <p className="text-xs text-gray-500 mt-1">Data-driven expertise valued</p>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Track Record Matters More</h4>
            <p className="text-gray-600 text-sm">While certifications add credibility, demonstrable results matter more. CMOs with proven growth metrics (100%+ YoY, significant CAC reduction, successful product launches) command 15-25% premiums regardless of formal qualifications.</p>
          </div>
        </div>
      </section>

      {/* IR35 Section */}
      <section id="ir35" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              IR35 Impact on Fractional CMO Salary
            </h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={950} />
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest CMO Jobs</h2>
            <p className="text-xl text-gray-500">Find your next fractional CMO opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Marketing"
            title="Latest CMO Jobs"
            accentColor="amber"
            jobsPerPage={6}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about fractional CMO salary and compensation.</p>
          </div>
          <FAQ items={faqItems} title="" skipSchema={true} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Related Resources</h2>
            <p className="text-gray-600">Explore more fractional CMO guides and resources</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CMO Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cmo" className="text-gray-600 hover:text-amber-700 transition-colors">What is a Fractional CMO?</Link></li>
                <li><Link href="/hire-fractional-cmo" className="text-gray-600 hover:text-amber-700 transition-colors">How to Hire a Fractional CMO</Link></li>
                <li><Link href="/fractional-cmo-services" className="text-gray-600 hover:text-amber-700 transition-colors">CMO Services</Link></li>
                <li><Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-amber-700 transition-colors">CMO Jobs UK</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Other Salary Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cfo-salary" className="text-gray-600 hover:text-amber-700 transition-colors">Fractional CFO Salary</Link></li>
                <li><Link href="/fractional-cto-salary" className="text-gray-600 hover:text-amber-700 transition-colors">Fractional CTO Salary</Link></li>
                <li><Link href="/fractional-coo-salary" className="text-gray-600 hover:text-amber-700 transition-colors">Fractional COO Salary</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
              <ul className="space-y-2">
                {authorityLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-700 transition-colors flex items-center gap-1">
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Find Fractional CMO Opportunities
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse UK fractional CMO roles and compare compensation packages.
          </p>
          <Link
            href="/fractional-cmo-jobs-uk"
            className="px-8 py-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-400 transition-colors inline-block"
          >
            Browse CMO Jobs
          </Link>
        </div>
      </section>

      <RoleContentHub currentRole="cmo" />
    </div>
  )
}
