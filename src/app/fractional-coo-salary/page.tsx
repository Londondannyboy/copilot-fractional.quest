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
const heroImage = getHeroImageUrl('coo', 1920, 800)
const imageCredit = getImage('coo')

export const metadata: Metadata = {
  title: 'Fractional COO Salary UK 2026 | Day Rates, Annual Earnings & Compensation Guide',
  description: 'Fractional COO salary UK: day rates £600-£1,200. Compare costs by experience, specialisation, location. Calculate potential earnings with our salary calculator.',
  keywords: 'fractional coo salary, fractional coo salary uk, fractional coo day rate, fractional coo cost, coo salary uk, part time coo salary, fractional coo rates, fractional operations salary, operations director salary, coo compensation',
  alternates: {
    canonical: 'https://fractional.quest/fractional-coo-salary',
  },
  openGraph: {
    title: 'Fractional COO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional COO salary UK: Day rates £600-£1,200. Complete guide to fractional COO costs, earnings by experience level and location.',
    url: 'https://fractional.quest/fractional-coo-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional COO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional COO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional COO salary UK: Day rates £600-£1,200. Complete guide to fractional COO costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional COO', href: '/fractional-coo' },
  { label: 'Salary Guide', href: '/fractional-coo-salary' },
]

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
  { id: 'jobs', title: 'COO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const authorityLinks = [
  { name: 'CMI', url: 'https://www.managers.org.uk', description: 'Chartered Management Institute' },
  { name: 'IoD', url: 'https://www.iod.com', description: 'Institute of Directors' },
  { name: 'APM', url: 'https://www.apm.org.uk', description: 'Association for Project Management' },
  { name: 'CIPS', url: 'https://www.cips.org', description: 'Chartered Institute of Procurement & Supply' },
  { name: 'ONS Earnings Data', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', description: 'Official UK earnings statistics' },
]

const faqItems: FAQItem[] = [
  { question: 'What is the average fractional COO salary in the UK?', answer: 'The average fractional COO earns around £900 per day in the UK. Working 2-3 days per week, this translates to annual earnings of £94,000-£140,000. Entry-level fractional COOs start at £550-£750/day, while PE/M&A specialists command £1,100-£1,400/day.' },
  { question: 'How does fractional COO salary compare to full-time?', answer: 'Fractional COOs earn higher daily rates than full-time equivalents. A full-time COO earning £150,000 salary works out to roughly £577/day, while fractional COOs charge £600-£1,200/day. However, fractional COOs must cover their own benefits, pension, and manage multiple clients to achieve similar annual earnings.' },
  { question: 'What factors affect fractional COO day rates?', answer: 'Key factors include: (1) Scaling experience - growing companies 20→200+ employees, (2) Industry specialisation - e-commerce, SaaS, manufacturing, (3) M&A expertise - integration and carve-out experience, (4) Process certifications - Six Sigma, Lean qualifications, (5) Location - London rates 15% higher, (6) Team size - managing 50+ people increases rates.' },
  { question: 'Do fractional COOs get equity compensation?', answer: 'Some fractional COOs receive equity grants (typically 0.25-0.75%) as part of their compensation, especially for longer engagements with startups. This is less common than for full-time COOs who typically receive 0.5-2% equity. Equity is usually offered in exchange for a reduced day rate.' },
  { question: 'How much can I earn as a fractional COO working 3 clients?', answer: 'A fractional COO working 3 clients at 1.5 days per week each (4.5 days total) at an average rate of £900/day could earn around £210,000 annually. However, this requires excellent time management and clear boundaries. Most fractional COOs work with 2-3 clients simultaneously.' },
  { question: 'What is the difference between inside and outside IR35 for fractional COOs?', answer: 'IR35 status significantly impacts take-home pay. Outside IR35, a fractional COO on £900/day might take home approximately £630/day after corporation tax and dividends. Inside IR35, the same rate yields around £500/day after PAYE deductions. Many fractional COOs factor IR35 status into their rate negotiations.' },
  { question: 'Are fractional COO rates negotiable?', answer: 'Yes, rates are negotiable based on several factors: engagement length (longer contracts may offer 5-10% discount), days per week (volume discounts for 3+ days), payment terms (upfront payment may warrant discount), and equity trade-offs. Most fractional COOs have a minimum day rate but flexibility above that.' },
  { question: 'How do London fractional COO salaries compare to other UK cities?', answer: 'London fractional COOs typically earn 10-15% more than the UK average. London rates range from £800-£1,200/day, while Manchester and Birmingham average £650-£1,000/day. Remote-first fractional COOs often charge UK-average rates regardless of their location.' },
  { question: 'What qualifications increase fractional COO earning potential?', answer: 'CMI Chartered Manager status, Six Sigma Black Belt, Lean certifications, and project management qualifications (PRINCE2, PMP) can add 5-10% to rates. More impactful is demonstrable track record: successful scaling experience, M&A integrations, and operational transformations.' },
  { question: 'What industries pay the highest fractional COO rates?', answer: 'Private equity portfolio companies and PE-backed businesses pay premium rates (£1,000-£1,400/day) for fractional COOs with M&A integration experience. E-commerce and SaaS companies also pay above-average rates (£850-£1,100/day) for COOs with scaling expertise.' },
]

export default function FractionalCooSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional COO Salary UK 2026 | Day Rates & Compensation Guide"
        description="Complete guide to fractional COO salary UK. Day rates, annual equivalents, and factors affecting compensation."
        url="https://fractional.quest/fractional-coo-salary"
        dateModified={new Date('2026-01-31')}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`${imageAlt} - Fractional COO Salary UK Compensation Guide`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/90 via-gray-600/80 to-zinc-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Salary Guide 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                <strong>Fractional COO Salary</strong> UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Complete guide to <strong>fractional COO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.
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
              <div className="text-3xl font-bold text-slate-400">£600-£1,200</div>
              <div className="text-sm text-gray-400">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-400">£900</div>
              <div className="text-sm text-gray-400">Average Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-400">£60k-£145k</div>
              <div className="text-sm text-gray-400">Annual Equivalent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-400">2-3 days</div>
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

              <h2 id="overview" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">Fractional COO Salary UK Overview</h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                <strong>Fractional COO salary</strong> in the UK typically ranges from £600-£1,200 per day, with the average sitting around £900/day. This translates to annual earnings of £60,000-£145,000 depending on days worked per week and number of clients.
              </p>

              {/* Authority context box */}
              <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-6 not-prose">
                <p className="text-sm text-gray-700">
                  <strong>UK Market Context:</strong> According to{' '}
                  <a href="https://www.hirechore.com/startups/fractional-coo-101" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline font-medium">HireChore</a>{' '}
                  (Aug 2025), full-time COO salaries range from £160,000-£320,000 annually, making fractional COOs at £60,000-£145,000/year a cost-effective alternative for growing businesses.
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Working 2-3 days per week across multiple clients, fractional COOs can achieve annual earnings of £94,000-£210,000. The most successful fractional COOs specialise in specific domains like scale-up operations, e-commerce logistics, or PE-backed business integration, commanding day rates of £1,000-£1,400.
              </p>

            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={tocItems} accentColor="slate" />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/fractional-coo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>📋</span> What is a Fractional COO?
                    </Link>
                    <Link href="/fractional-coo-cost" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>💵</span> COO Cost Guide
                    </Link>
                    <Link href="/hire-fractional-coo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>🎯</span> How to Hire a COO
                    </Link>
                    <Link href="/fractional-coo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>💼</span> COO Jobs UK
                    </Link>
                    <Link href="/fractional-operations-manager" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>⚙️</span> Operations Manager
                    </Link>
                  </div>
                </div>

                {/* Authority Links */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-800 flex items-center gap-2">
                          <span className="text-slate-400">→</span> {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 p-6 rounded-xl text-white">
                  <p className="font-bold mb-2">Find a Fractional COO</p>
                  <p className="text-sm text-gray-300 mb-4">Browse pre-vetted operations leaders</p>
                  <Link href="/fractional-coo-jobs-uk" className="block text-center bg-slate-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-400 transition-colors text-sm">
                    View COO Jobs
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Salary by Experience Level */}
      <section id="experience-level" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Experience</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional COO Salary by Experience Level</h2>
            <p className="text-xl text-gray-600">How experience and track record impact day rates and annual earnings.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-slate-700 text-white">
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
                  <td className="px-6 py-4 text-sm text-gray-600">£550-£750</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£57,000-£78,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">8-12 years ops, first fractional role</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£750-£950</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£78,000-£99,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">12-15 years, multiple fractional engagements</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£950-£1,200</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£99,000-£125,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">15+ years, proven scale-up experience</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Specialist (PE/M&A)</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-semibold">£1,100-£1,400</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-semibold">£114,000-£145,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Integration expertise, PE portfolio</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-lg mt-8">
            <h4 className="font-bold text-gray-900 mb-2">Scaling Premium</h4>
            <p className="text-gray-700">COOs with demonstrable scaling experience (20→200+ employees, £1M→£20M revenue) typically command 15-25% higher rates than peers with similar years of experience but less quantifiable results.</p>
          </div>
        </div>
      </section>

      {/* Hourly Rates */}
      <section id="hourly-rates" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Hourly</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional COO Hourly Rates UK</h2>
            <p className="text-xl text-gray-600">For ad-hoc consultations and project-based work.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-slate-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Level / Specialisation</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Hourly Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Standard Consultation</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£95-£125/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Process reviews, ad-hoc advice</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior COO (15+ years)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£125-£175/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Strategic planning, board presentations</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Supply Chain Specialist</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-semibold">£125-£200/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Logistics audits, procurement strategy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">M&A Integration</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-semibold">£150-£225/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Due diligence, integration planning</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">When to Use Hourly Rates</h4>
            <p className="text-gray-600 text-sm">Hourly billing suits operational due diligence, process audits, or specific strategic decisions. For ongoing operations leadership, monthly retainers typically offer better value.</p>
          </div>
        </div>
      </section>

      {/* Monthly Retainers */}
      <section id="monthly-retainers" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Retainers</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional COO Monthly Retainer Pricing</h2>
            <p className="text-xl text-gray-600">Ongoing operations leadership on a predictable budget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-slate-600 font-bold text-sm mb-2">STARTER</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£2,500-£4,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 1 day per week (4 days/month)</li>
                <li>• Operations strategy oversight</li>
                <li>• Process improvement guidance</li>
                <li>• Team structure advice</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Seed stage, small ops team</span>
              </div>
            </div>

            <div className="bg-white p-6 border-2 border-slate-500 rounded-lg relative shadow-md">
              <div className="absolute -top-3 right-4 bg-slate-500 text-white text-xs font-bold px-2 py-1 rounded">POPULAR</div>
              <div className="text-slate-600 font-bold text-sm mb-2">GROWTH</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£5,000-£8,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 2 days per week (8 days/month)</li>
                <li>• Active operations leadership</li>
                <li>• Process implementation</li>
                <li>• Team hiring & training</li>
                <li>• Board-level reporting</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Series A-B, scaling teams</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-slate-600 font-bold text-sm mb-2">ENTERPRISE</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£10,000-£15,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 3+ days per week</li>
                <li>• Full COO responsibilities</li>
                <li>• Multi-site operations</li>
                <li>• M&A integration</li>
                <li>• PE portfolio work</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: PE-backed, acquisitions</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Cost Comparison:</strong> A fractional COO at £6,500/month (£78,000/year) provides senior operations leadership at <strong>50-65% less</strong> than a full-time COO total cost of £180,000-£280,000 (salary + benefits + bonus + recruitment). Source:{' '}
              <a href="https://www.hirechore.com/startups/fractional-coo-101" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline">HireChore</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Salary by Location */}
      <section id="location" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Location</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional COO Salary by Location</h2>
            <p className="text-xl text-gray-600">Regional variations in fractional COO day rates across the UK.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-slate-700 text-white">
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
                  <td className="px-6 py-4 text-sm text-gray-600">£800-£1,200</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">+10-15%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PE-backed, scale-ups, multi-site</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Manchester</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£650-£1,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">E-commerce, logistics, manufacturing</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Birmingham</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£600-£950</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Manufacturing, automotive, retail</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Bristol</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£650-£1,000</td>
                  <td className="px-6 py-4 text-sm text-green-600">+5%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Aerospace, defence, professional services</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Leeds/Yorkshire</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£600-£950</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Financial services, healthcare</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Remote UK</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£550-£900</td>
                  <td className="px-6 py-4 text-sm text-red-600">-5-10%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Competitive rates, wider talent pool</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">London Premium Explained</h4>
              <p className="text-gray-600 text-sm">London rates are 10-15% higher due to concentration of PE-backed companies, multi-site operations, and complex supply chains requiring hands-on leadership.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">Manufacturing Hubs</h4>
              <p className="text-gray-600 text-sm">Manchester, Birmingham, and Yorkshire offer strong demand for COOs with manufacturing, logistics, and supply chain expertise, often matching London rates for specialists.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Salary by Specialisation */}
      <section id="specialisation" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Specialisation</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional COO Salary by Specialisation</h2>
            <p className="text-xl text-gray-600">How operational expertise and domain specialisation impact earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              { title: 'Scale-up COO', desc: 'Rapid growth, team scaling, process design', rate: '£900-£1,200/day', demand: 'Very High' },
              { title: 'E-commerce COO', desc: 'Supply chain, fulfilment, logistics', rate: '£850-£1,100/day', demand: 'High' },
              { title: 'M&A Integration COO', desc: 'Post-acquisition integration, carve-outs', rate: '£1,000-£1,400/day', demand: 'High' },
              { title: 'SaaS COO', desc: 'Customer success, recurring revenue ops', rate: '£850-£1,150/day', demand: 'Growing' },
              { title: 'Manufacturing COO', desc: 'Lean operations, quality, efficiency', rate: '£750-£1,050/day', demand: 'Steady' },
              { title: 'Professional Services COO', desc: 'Resource planning, utilisation, delivery', rate: '£800-£1,100/day', demand: 'Growing' },
            ].map((type, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{type.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-semibold">{type.rate}</span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">{type.demand} Demand</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Way Comparison Table */}
      <section id="comparison" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional vs Interim vs Full-Time COO</h2>
            <p className="text-xl text-gray-600">Understanding the salary and engagement differences.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">Fractional COO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-indigo-700">Interim COO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time COO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Day Rate</td>
                  <td className="px-4 py-4 text-sm text-slate-700 font-semibold">£600-£1,200</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£900-£1,400</td>
                  <td className="px-4 py-4 text-sm text-gray-600">N/A (salaried)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-4 py-4 text-sm text-slate-700 font-semibold">£2,500-£15,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£16,000-£25,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£10,000-£16,000+</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                  <td className="px-4 py-4 text-sm text-slate-700 font-semibold">£30,000-£180,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£64,000-£100,000 (4-6mo)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£180,000-£320,000+</td>
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
                  <td className="px-4 py-4 text-sm text-gray-600">3-12 months typical</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Permanent</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Equity</td>
                  <td className="px-4 py-4 text-sm text-gray-600">0-0.75% (rare)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">0% typically</td>
                  <td className="px-4 py-4 text-sm text-gray-600">0.5-2% typical</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                  <td className="px-4 py-4 text-sm text-slate-800 font-medium">SMEs, startups, scale-ups</td>
                  <td className="px-4 py-4 text-sm text-indigo-800 font-medium">Crisis, M&A, turnaround</td>
                  <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises, £30M+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Savings Summary:</strong> A fractional COO at 2 days/week costs £62,000-£125,000/year vs £180,000-£320,000+ for a full-time COO (including salary, NI, pension, benefits, bonus, and recruitment fees). That&apos;s <strong>50-70% savings</strong> while maintaining senior operations leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Factors Affecting Salary */}
      <section id="factors" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Factors</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Factors Affecting Fractional COO Salary</h2>
            <p className="text-xl text-gray-600">Key variables that determine your earning potential as a fractional COO.</p>
          </div>

          <div className="space-y-6">
            {[
              { factor: 'Scaling Track Record', impact: '+15-25%', desc: 'Experience growing companies from 20→200+ employees and revenue scaling' },
              { factor: 'M&A Expertise', impact: '+15-20%', desc: 'Post-acquisition integration, carve-outs, and operational due diligence' },
              { factor: 'Industry Specialisation', impact: '+10-15%', desc: 'Deep expertise in e-commerce, SaaS, manufacturing, or professional services' },
              { factor: 'Process Certifications', impact: '+5-10%', desc: 'Six Sigma Black Belt, Lean certification, CMI Chartered Manager' },
              { factor: 'Team Size Managed', impact: '+10-15%', desc: 'Experience managing 50+ person teams, multi-site operations' },
              { factor: 'Engagement Length', impact: '-5-10%', desc: 'Longer contracts (12+ months) may warrant volume discounts for certainty' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className={`text-lg font-bold ${item.impact.startsWith('+') ? 'text-green-600' : 'text-slate-600'}`}>
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

      {/* Qualifications Section */}
      <section id="qualifications" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Qualifications</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Professional Bodies & Certifications</h2>
            <p className="text-xl text-gray-600">Key qualifications that impact fractional COO earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <a href="https://www.managers.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-slate-700">CMI Chartered Manager</h4>
                  <p className="text-sm text-gray-600">Chartered Management Institute</p>
                  <p className="text-xs text-slate-600 mt-1">+5-10% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://www.sixsigmaonline.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-slate-700">Six Sigma Black Belt</h4>
                  <p className="text-sm text-gray-600">Process Improvement Certification</p>
                  <p className="text-xs text-slate-600 mt-1">+5-10% for ops roles</p>
                </div>
              </div>
            </a>
            <a href="https://www.cips.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-slate-700">CIPS Level 6</h4>
                  <p className="text-sm text-gray-600">Procurement & Supply Chain</p>
                  <p className="text-xs text-slate-600 mt-1">+5-10% for supply chain roles</p>
                </div>
              </div>
            </a>
            <a href="https://www.iod.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-slate-700">IoD Member</h4>
                  <p className="text-sm text-gray-600">Institute of Directors</p>
                  <p className="text-xs text-gray-500 mt-1">Network & credibility valued</p>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Track Record Matters More</h4>
            <p className="text-gray-600 text-sm">While certifications add credibility, demonstrable results matter more. COOs with proven scaling experience (20→200 employees, successful integrations, operational transformations) command 15-25% premiums regardless of formal qualifications.</p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Fractional COO Salary Calculator
            </h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional COO</p>
          </div>
          <RoleCalculator role="coo" />
        </div>
      </section>

      {/* IR35 Section */}
      <section id="ir35" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              IR35 Impact on Fractional COO Salary
            </h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={900} />
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest COO Jobs</h2>
            <p className="text-xl text-gray-500">Find your next fractional COO opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Operations"
            title="Latest COO Jobs"
            accentColor="slate"
            jobsPerPage={6}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about fractional COO salary and compensation.</p>
          </div>
          <FAQ items={faqItems} title="" skipSchema={true} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Related Resources</h2>
            <p className="text-gray-600">Explore more fractional COO guides and resources</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">COO Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-coo" className="text-gray-600 hover:text-slate-700 transition-colors">What is a Fractional COO?</Link></li>
                <li><Link href="/hire-fractional-coo" className="text-gray-600 hover:text-slate-700 transition-colors">How to Hire a Fractional COO</Link></li>
                <li><Link href="/fractional-operations-manager" className="text-gray-600 hover:text-slate-700 transition-colors">Fractional Operations Manager</Link></li>
                <li><Link href="/fractional-coo-jobs-uk" className="text-gray-600 hover:text-slate-700 transition-colors">COO Jobs UK</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Other Salary Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cfo-salary" className="text-gray-600 hover:text-slate-700 transition-colors">Fractional CFO Salary</Link></li>
                <li><Link href="/fractional-cmo-salary" className="text-gray-600 hover:text-slate-700 transition-colors">Fractional CMO Salary</Link></li>
                <li><Link href="/fractional-cto-salary" className="text-gray-600 hover:text-slate-700 transition-colors">Fractional CTO Salary</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
              <ul className="space-y-2">
                {authorityLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-slate-700 transition-colors flex items-center gap-1">
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
            Find Fractional COO Opportunities
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse UK fractional COO roles and compare compensation packages.
          </p>
          <Link
            href="/fractional-coo-jobs-uk"
            className="px-8 py-4 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-400 transition-colors inline-block"
          >
            Browse COO Jobs
          </Link>
        </div>
      </section>

      <RoleContentHub currentRole="coo" />
    </div>
  )
}
