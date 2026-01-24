import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CFO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { LazyYouTube } from '@/components/LazyYouTube'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage } from '@/lib/images'

const ogImage = getOGImageUrl('cfo')
const imageAlt = getImage('cfo').alt
const imageCredit = getImage('cfo')

export const metadata: Metadata = {
  title: 'What is a Fractional CFO? | Guide',
  description: 'What is a fractional CFO? A part-time finance leader for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cfo, fractional cfo meaning, fractional cfo definition, part time cfo, fractional finance officer, fractional chief financial officer, what does a fractional cfo do',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cfo',
  },
  openGraph: {
    title: 'What is a Fractional CFO? | Complete Guide',
    description: 'Understand fractional CFO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Financial Officer.',
    url: 'https://fractional.quest/fractional-cfo',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CFO? | Complete Guide',
    description: 'Understand fractional CFO meaning, responsibilities, and costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CFO', href: '/fractional-cfo' },
]

export default function FractionalCfoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CFO? | Part-Time Chief Financial Officer Guide"
        description="Complete guide to fractional CFO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Financial Officer does."
        url="https://fractional.quest/fractional-cfo"
        dateModified={new Date('2026-01-07')}
      />
      <FAQPageSchema faqs={CFO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/fractional-cfo-jobs-uk-desktop.webp"
          alt={`What is a Fractional CFO - ${imageAlt}`}
          title="Fractional CFO - Part-Time Finance Leadership"
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
                Role Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                What is a <strong>Fractional CFO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CFO</strong> is a part-time Chief Financial Officer who provides strategic financial leadership to companies on a flexible basis. Learn about <strong>fractional CFO meaning</strong>, responsibilities, and costs.
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

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4">Fractional CFO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CFO</strong> (Fractional Chief Financial Officer) is an experienced finance executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic financial leadership without the cost of a full-time hire.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">

            <h2 className="text-3xl font-black text-gray-900 mb-6">Understanding the Fractional CFO Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional CFO meaning</strong> centres on flexible, senior-level financial leadership. Unlike traditional full-time CFOs earning £130,000-£220,000 annually, a <strong>fractional Chief Financial Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            <p>
              This model emerged from the startup and scale-up ecosystem where companies need CFO-level expertise for fundraising, financial planning, and investor relations but cannot justify the cost of a full-time finance executive.
            </p>

            {/* Video */}
            <div className="my-10 not-prose">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What Does a Fractional CFO Do?</h3>
              <LazyYouTube
                videoId="vFTB5pWJY4A"
                title="What is a Fractional CFO? Role Explained"
              />
              <p className="text-gray-500 text-sm mt-3">Video: Understanding the fractional CFO role and responsibilities</p>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Key Responsibilities and Deliverables</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Financial Strategy', desc: 'Developing financial plans aligned with business goals', icon: '📊' },
                { title: 'Fundraising', desc: 'Leading Series A-C rounds and investor relations', icon: '💰' },
                { title: 'Cash Management', desc: 'Optimising working capital and runway planning', icon: '🏦' },
                { title: 'FP&A', desc: 'Budgeting, forecasting, and variance analysis', icon: '📈' },
                { title: 'Board Reporting', desc: 'Investor-grade financial presentations', icon: '📋' },
                { title: 'Compliance', desc: 'Regulatory compliance and audit readiness', icon: '✅' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Part-Time vs Full-Time: How They Compare</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CFO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time CFO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£40,000-£100,000</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£130,000-£250,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td>
                    <td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td>
                    <td className="px-6 py-4 text-sm text-gray-600">5 days/week</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Fundraising Experience</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Multiple rounds across companies</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Single company focus</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Pre-Series B, specific projects</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Series C+, complex financials</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When Does Your Business Need One?</h2>

            <ul className="space-y-3">
              <li><strong>Fundraising:</strong> Preparing for and executing Series A-C rounds</li>
              <li><strong>Investor readiness:</strong> Need professional financial reporting</li>
              <li><strong>Cash crisis:</strong> Runway planning and cost optimisation needed</li>
              <li><strong>Scale preparation:</strong> Financial systems for rapid growth</li>
              <li><strong>Exit planning:</strong> Preparing for M&A or IPO</li>
              <li><strong>Finance team gap:</strong> Interim senior leadership needed</li>
            </ul>

            <div className="bg-emerald-50 p-6 border border-emerald-200 rounded-lg my-8 not-prose">
              <p className="text-emerald-800 font-medium mb-3">Ready to hire a part-time finance leader?</p>
              <Link href="/hire-fractional-cfo" className="inline-flex items-center text-emerald-700 font-bold hover:text-emerald-900">
                Complete Guide: How to Hire a Fractional CFO →
              </Link>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Cost and Pricing UK</h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Pricing Breakdown</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,000-£5,600/month (£36,000-£67,000/year)</li>
                <li><strong>2 days/week:</strong> £6,000-£11,200/month (£72,000-£134,000/year)</li>
                <li><strong>3 days/week:</strong> £9,000-£16,800/month (£108,000-£202,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CFO: £160,000-£280,000+ (salary + benefits + equity)</p>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Types of Finance Leadership Engagement</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'VC-Backed CFO', desc: 'Fundraising and investor relations', rate: '£1,100-£1,400/day' },
                { title: 'PE Portfolio CFO', desc: 'Value creation and exit planning', rate: '£1,200-£1,500/day' },
                { title: 'Scale-up CFO', desc: 'Growth finance and cash management', rate: '£900-£1,200/day' },
                { title: 'Turnaround CFO', desc: 'Restructuring and crisis management', rate: '£1,000-£1,300/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-emerald-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Qualifications & Professional Bodies</h2>

            <p>
              Most part-time finance directors hold professional accounting qualifications from recognized bodies. Key professional organizations include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.icaew.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">ICAEW</h4>
                    <p className="text-sm text-gray-600">Institute of Chartered Accountants in England & Wales</p>
                  </div>
                </div>
              </a>
              <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">ACCA</h4>
                    <p className="text-sm text-gray-600">Association of Chartered Certified Accountants</p>
                  </div>
                </div>
              </a>
              <a href="https://www.cimaglobal.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">CIMA</h4>
                    <p className="text-sm text-gray-600">Chartered Institute of Management Accountants</p>
                  </div>
                </div>
              </a>
              <a href="https://www.frc.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">FRC</h4>
                    <p className="text-sm text-gray-600">Financial Reporting Council - UK regulator</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">External Resources</h2>

            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://www.gov.uk/government/organisations/companies-house" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">🏢</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">Companies House</p>
              </a>
              <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">🏢</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">HMRC</p>
              </a>
              <a href="https://www.glassdoor.co.uk/Salaries/cfo-salary-SRCH_KO0,3.htm" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">Glassdoor Salaries</p>
              </a>
              <a href="https://www.bvca.co.uk" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">💼</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">BVCA</p>
              </a>
            </div>

          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Day Rate Calculator
            </h2>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQ items={CFO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Related Resources</span>
            <h2 className="text-2xl font-black text-gray-900">Explore More Resources</h2>
          </div>

          {/* Primary Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/hire-fractional-cfo" className="bg-white p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">How to Hire a Fractional CFO</h3>
              <p className="text-gray-600 text-sm">Complete guide to the hiring process, interview questions, and contract templates</p>
            </Link>
            <Link href="/fractional-cfo-jobs-uk" className="bg-white p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">Fractional CFO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse 200+ live fractional CFO and Finance Director roles across the UK</p>
            </Link>
            <Link href="/fractional-cfo-salary" className="bg-white p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">Fractional CFO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK day rates, annual earnings, and IR35 considerations for finance leaders</p>
            </Link>
          </div>

          {/* Secondary Links - More internal pages */}
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/fractional-cfo-services" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">⚙️</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">CFO Services</h4>
              <p className="text-gray-500 text-xs">What CFOs deliver</p>
            </Link>
            <Link href="/part-time-cfo-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">🕐</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">Part-Time CFO Jobs</h4>
              <p className="text-gray-500 text-xs">2-3 days per week</p>
            </Link>
            <Link href="/interim-cfo-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">⏳</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">Interim CFO Jobs</h4>
              <p className="text-gray-500 text-xs">Contract CFO roles</p>
            </Link>
            <Link href="/fractional-jobs-london" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">🏙️</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">London Jobs</h4>
              <p className="text-gray-500 text-xs">London-based roles</p>
            </Link>
          </div>

          {/* Cross-role links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Other Fractional Executive Roles:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fractional-cto" className="text-sm text-emerald-700 hover:underline">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-emerald-700 hover:underline">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-emerald-700 hover:underline">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-emerald-700 hover:underline">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-emerald-700 hover:underline">Fractional CISO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cpo" className="text-sm text-emerald-700 hover:underline">Fractional CPO</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse pre-vetted finance leaders or post your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cfo-jobs-uk"
              className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Browse Fractional CFOs
            </Link>
            <Link
              href="/hire-fractional-cfo"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Hiring Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest Finance Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time finance opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Finance"
            title="Latest Finance Jobs"
            accentColor="emerald"
            jobsPerPage={6}
          />
        </div>
      </section>

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
