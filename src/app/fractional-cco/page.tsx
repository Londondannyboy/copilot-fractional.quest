import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage } from '@/lib/images'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'

const tocItems = [
  { id: 'understanding', title: 'Understanding the Role' },
  { id: 'responsibilities', title: 'Key Responsibilities' },
  { id: 'comparison', title: 'Part-Time vs Full-Time' },
  { id: 'when-needed', title: 'When You Need One' },
  { id: 'cost-pricing', title: 'Cost & Pricing UK' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'uk-market', title: 'UK Market Overview' },
  { id: 'how-to-hire', title: 'How to Hire' },
  { id: 'resources', title: 'External Resources' },
  { id: 'calculator', title: 'Day Rate Calculator' },
  { id: 'jobs', title: 'CCO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const CCO_FAQS = [
  { question: "What is a fractional CCO?", answer: "A fractional CCO (Chief Customer Officer) is a part-time customer executive who provides strategic customer leadership to companies on a flexible basis. They work 1-3 days per week, providing the same customer success expertise as a full-time CCO at a fraction of the cost." },
  { question: "What does a fractional CCO do?", answer: "A fractional CCO develops customer success strategies, reduces churn, improves net revenue retention (NRR), builds and coaches CS teams, implements customer health scoring, and ensures the company delivers exceptional customer experiences throughout the entire customer lifecycle." },
  { question: "How much does a fractional CCO cost?", answer: "Fractional CCO day rates in the UK typically range from £800-£1,200. A 2-day per week engagement costs approximately £6,400-£9,600 per month, which is 40-60% less than a full-time CCO salary plus benefits and equity." },
  { question: "When should I hire a fractional CCO?", answer: "Consider a fractional CCO when: experiencing high churn, building first CS team, preparing for fundraising (need strong NRR metrics), implementing customer health scoring, scaling from reactive support to proactive success, or needing board-level customer expertise." },
  { question: "What's the difference between CCO and VP Customer Success?", answer: "The CCO focuses on end-to-end customer strategy, cross-functional alignment, and board-level accountability for NRR and retention. The VP CS typically manages the CS team and post-sales execution. CCOs have broader scope including CX, support, and customer advocacy." },
]

const ogImage = getOGImageUrl('sales')
const imageAlt = getImage('sales').alt
const imageCredit = getImage('sales')

export const metadata: Metadata = {
  title: 'What is a Fractional CCO? | Guide',
  description: 'What is a fractional CCO? A part-time Chief Customer Officer for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cco, fractional cco meaning, fractional cco definition, part time cco, fractional chief customer officer, fractional customer success, what does a fractional cco do',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cco',
  },
  openGraph: {
    title: 'What is a Fractional CCO? | Complete Guide',
    description: 'Understand fractional CCO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Customer Officer.',
    url: 'https://fractional.quest/fractional-cco',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CCO? | Complete Guide',
    description: 'Understand fractional CCO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Customer Officer.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CCO', href: '/fractional-cco' },
]

export default function FractionalCcoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CCO? | Part-Time Chief Customer Officer Guide"
        description="Complete guide to fractional CCO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Customer Officer does."
        url="https://fractional.quest/fractional-cco"
        dateModified={new Date('2026-01-26')}
      />
      <FAQPageSchema faqs={CCO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=1920&q=80"
          alt={`What is a Fractional CCO - ${imageAlt}`}
          title="Fractional CCO - Part-Time Customer Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 via-teal-500/80 to-cyan-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                What is a <strong>Fractional CCO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CCO</strong> is a part-time Chief Customer Officer who provides strategic customer leadership to companies on a flexible basis. Learn about <strong>fractional CCO meaning</strong>, responsibilities, and costs.
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

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal-400 mb-4">Fractional CCO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CCO</strong> (Fractional Chief Customer Officer) is an experienced customer executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic customer success leadership, retention strategy, and CX transformation without the cost of a full-time hire.
            </p>
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

            <h2 id="understanding" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">What is a Fractional CCO? Understanding the Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional CCO meaning</strong> centres on flexible, senior-level customer leadership. Unlike traditional full-time CCOs earning £150,000-£250,000 annually, a <strong>fractional Chief Customer Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> As SaaS companies focus on net revenue retention (NRR) as a key growth metric, demand for customer leadership has surged. CCOs are increasingly crucial for companies seeking to demonstrate strong retention metrics to investors and acquirers.
              </p>
            </div>

            <p>
              This model emerged from the SaaS ecosystem where companies need CCO-level expertise to reduce churn and improve NRR but cannot justify a full-time executive. The <strong>fractional CCO</strong> brings the same strategic thinking, customer success frameworks, and retention expertise as a full-time CCO, but on a fractional basis.
            </p>

            <h2 id="responsibilities" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Key Responsibilities and Deliverables</h2>

            <p>
              A <strong>fractional CCO</strong> performs the same functions as a full-time Chief Customer Officer, but on a part-time basis. Their responsibilities typically include:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Customer Success Strategy', desc: 'Developing CS frameworks, customer journeys, and success playbooks', icon: '🎯' },
                { title: 'Retention & NRR', desc: 'Reducing churn, improving net revenue retention, expansion strategy', icon: '📈' },
                { title: 'Team Building', desc: 'Hiring, coaching, and developing customer success teams', icon: '👥' },
                { title: 'Customer Health Scoring', desc: 'Implementing predictive health metrics and early warning systems', icon: '⚙️' },
                { title: 'Voice of Customer', desc: 'NPS, CSAT programs, customer advisory boards, feedback loops', icon: '📣' },
                { title: 'Board Reporting', desc: 'NRR metrics, churn analysis, customer cohort insights', icon: '📊' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 id="comparison" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Part-Time vs Full-Time: How They Compare</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CCO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time CCO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£50,000-£115,000</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£150,000-£300,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td>
                    <td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td>
                    <td className="px-6 py-4 text-sm text-gray-600">5 days/week</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">SaaS Breadth</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Multiple companies, diverse experience</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Deep single-company focus</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Scale up/down easily</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fixed commitment</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Series A-C SaaS, growing CS</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Large SaaS, complex orgs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="when-needed" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">When Does Your Business Need One?</h2>

            <ul className="space-y-3">
              <li><strong>High churn:</strong> Losing customers and need systematic retention strategy</li>
              <li><strong>Building CS team:</strong> First hires for customer success function</li>
              <li><strong>Pre-fundraise:</strong> Need strong NRR metrics for investors</li>
              <li><strong>Health scoring:</strong> Implementing predictive customer analytics</li>
              <li><strong>Reactive to proactive:</strong> Moving from support to success model</li>
              <li><strong>Board-level gap:</strong> Need customer voice at executive level</li>
            </ul>

            <h2 id="cost-pricing" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Cost and Pricing UK</h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Pricing Breakdown</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,200-£4,800/month (£38,400-£57,600/year)</li>
                <li><strong>2 days/week:</strong> £6,400-£9,600/month (£76,800-£115,200/year)</li>
                <li><strong>3 days/week:</strong> £9,600-£14,400/month (£115,200-£172,800/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CCO total cost: £200,000-£350,000+ (salary + benefits + equity)</p>
            </div>

            <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Professional Bodies & Certifications</h2>

            <p>
              Many <strong>fractional Chief Customer Officers</strong> hold certifications from recognized customer success and CX bodies:
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.gainsight.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-teal-700">Gainsight</h4>
                    <p className="text-sm text-gray-600">Customer Success Platform & Certifications</p>
                  </div>
                </div>
              </a>
              <a href="https://successcoaching.co" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-teal-700">Success Coaching</h4>
                    <p className="text-sm text-gray-600">Customer Success Certifications</p>
                  </div>
                </div>
              </a>
              <a href="https://cxpa.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-teal-700">CXPA</h4>
                    <p className="text-sm text-gray-600">Customer Experience Professionals Association</p>
                  </div>
                </div>
              </a>
              <a href="https://www.tsia.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-teal-700">TSIA</h4>
                    <p className="text-sm text-gray-600">Technology Services Industry Association</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 id="resources" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">External Resources</h2>

            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://www.gainsight.com/pulse" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-teal-700">Pulse CS</p>
              </a>
              <a href="https://www.customersuccesscollective.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-300 transition-all group text-center">
                <span className="text-xl">👥</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-teal-700">CS Collective</p>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-300 transition-all group text-center">
                <span className="text-xl">💼</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-teal-700">LinkedIn</p>
              </a>
              <a href="https://www.totango.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-300 transition-all group text-center">
                <span className="text-xl">🎯</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-teal-700">Totango</p>
              </a>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={tocItems} />

              {/* Quick Links */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                <div className="space-y-3">
                  <Link href="/hire-fractional-cco" className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-700 transition-colors">
                    <span>📋</span> How to Hire a CCO
                  </Link>
                  <Link href="/fractional-cco-services" className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-700 transition-colors">
                    <span>⚙️</span> CCO Services
                  </Link>
                  <Link href="/fractional-cco-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-700 transition-colors">
                    <span>💼</span> CCO Jobs UK
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
                <p className="font-bold text-gray-900 mb-2">Looking for a CCO?</p>
                <p className="text-sm text-gray-600 mb-4">Browse pre-vetted customer leaders</p>
                <Link href="/fractional-cco-jobs-uk" className="block text-center bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-400 transition-colors text-sm">
                  View CCO Jobs
                </Link>
              </div>
            </div>
          </aside>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Day Rate Calculator
            </h2>
          </div>
          <RoleCalculator role="cco" />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQ items={CCO_FAQS} title="" />
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
            <Link href="/hire-fractional-cco" className="bg-white p-6 rounded-lg border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">How to Hire a Fractional CCO</h3>
              <p className="text-gray-600 text-sm">Complete guide to the hiring process, evaluation criteria, and contract terms</p>
            </Link>
            <Link href="/fractional-cco-jobs-uk" className="bg-white p-6 rounded-lg border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">Fractional CCO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CCO and customer leadership roles</p>
            </Link>
            <Link href="/fractional-cco-services" className="bg-white p-6 rounded-lg border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">⚙️</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">Fractional CCO Services</h3>
              <p className="text-gray-600 text-sm">What fractional CCO services include and pricing</p>
            </Link>
          </div>

          {/* Cross-role links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Other Fractional Executive Roles:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fractional-cfo" className="text-sm text-teal-700 hover:underline">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-teal-700 hover:underline">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-teal-700 hover:underline">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-teal-700 hover:underline">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-teal-700 hover:underline">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cro" className="text-sm text-teal-700 hover:underline">Fractional CRO</Link>
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
            Browse pre-vetted customer leaders or post your requirements to find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cco-jobs-uk"
              className="px-8 py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-400 transition-colors"
            >
              Browse Fractional CCOs
            </Link>
            <Link
              href="/hire-fractional-cco"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Hiring Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest Customer Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time customer opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Customer Success"
            title="Latest Customer Jobs"
            accentColor="teal"
            jobsPerPage={6}
          />
        </div>
      </section>

      <RoleContentHub currentRole="cco" />
    </div>
  )
}
