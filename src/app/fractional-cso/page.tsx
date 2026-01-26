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
  { id: 'jobs', title: 'CSO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const CSO_FAQS = [
  { question: "What is a fractional CSO?", answer: "A fractional CSO (Chief Strategy Officer or Chief Sales Officer) is a part-time executive who provides strategic leadership to companies on a flexible basis. They work 1-3 days per week, providing the same strategic expertise as a full-time CSO at a fraction of the cost." },
  { question: "What does a fractional CSO do?", answer: "A fractional CSO develops corporate strategy, identifies growth opportunities, leads strategic planning processes, evaluates M&A opportunities, and ensures business units align with overall company objectives. They also manage strategic partnerships and market expansion initiatives." },
  { question: "How much does a fractional CSO cost?", answer: "Fractional CSO day rates in the UK typically range from £850-£1,300. A 2-day per week engagement costs approximately £6,800-£10,400 per month, which is 40-60% less than a full-time CSO salary plus benefits and equity." },
  { question: "When should I hire a fractional CSO?", answer: "Consider a fractional CSO when: entering new markets, preparing for fundraising or exit, developing multi-year strategic plans, evaluating M&A targets, restructuring business units, or needing board-level strategic expertise without full-time overhead." },
  { question: "What's the difference between CSO and COO?", answer: "The CSO focuses on strategic direction, market positioning, and long-term planning. The COO focuses on day-to-day operations, process efficiency, and execution. CSOs ask 'what should we do?' while COOs ask 'how do we do it efficiently?'" },
]

const ogImage = getOGImageUrl('cso')
const imageAlt = getImage('cso').alt
const imageCredit = getImage('cso')

export const metadata: Metadata = {
  title: 'What is a Fractional CSO? | Guide',
  description: 'What is a fractional CSO? A part-time Chief Strategy Officer for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cso, fractional cso meaning, fractional cso definition, part time cso, fractional chief strategy officer, fractional strategy director, what does a fractional cso do',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cso',
  },
  openGraph: {
    title: 'What is a Fractional CSO? | Complete Guide',
    description: 'Understand fractional CSO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Strategy Officer.',
    url: 'https://fractional.quest/fractional-cso',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CSO? | Complete Guide',
    description: 'Understand fractional CSO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Strategy Officer.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CSO', href: '/fractional-cso' },
]

export default function FractionalCsoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CSO? | Part-Time Chief Strategy Officer Guide"
        description="Complete guide to fractional CSO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Strategy Officer does."
        url="https://fractional.quest/fractional-cso"
        dateModified={new Date('2026-01-26')}
      />
      <FAQPageSchema faqs={CSO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
          alt={`What is a Fractional CSO - ${imageAlt}`}
          title="Fractional CSO - Part-Time Strategy Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/90 via-slate-500/80 to-gray-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                What is a <strong>Fractional CSO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CSO</strong> is a part-time Chief Strategy Officer who provides strategic leadership to companies on a flexible basis. Learn about <strong>fractional CSO meaning</strong>, responsibilities, and costs.
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
          <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Fractional CSO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CSO</strong> (Fractional Chief Strategy Officer) is an experienced strategy executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic leadership and corporate development expertise without the cost of a full-time hire.
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

            <h2 id="understanding" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">What is a Fractional CSO? Understanding the Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional CSO meaning</strong> centres on flexible, senior-level strategic leadership. Unlike traditional full-time CSOs earning £180,000-£300,000 annually, a <strong>fractional Chief Strategy Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> Strategic leadership demand has grown as companies face market uncertainty and need senior expertise for transformation initiatives, M&A activity, and market expansion without committing to permanent executive hires.
              </p>
            </div>

            <p>
              This model emerged from private equity and consulting, where companies need CSO-level expertise for specific strategic initiatives but cannot justify a full-time executive. The <strong>fractional CSO</strong> brings the same strategic thinking, market analysis, and corporate development expertise as a full-time CSO, but on a fractional basis.
            </p>

            <h2 id="responsibilities" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Key Responsibilities and Deliverables</h2>

            <p>
              A <strong>fractional CSO</strong> performs the same functions as a full-time Chief Strategy Officer, but on a part-time basis. Their responsibilities typically include:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Corporate Strategy', desc: 'Developing multi-year strategic plans and competitive positioning', icon: '🎯' },
                { title: 'Market Analysis', desc: 'Identifying market opportunities, competitive threats, and industry trends', icon: '📊' },
                { title: 'M&A Advisory', desc: 'Evaluating acquisition targets, due diligence, integration planning', icon: '🤝' },
                { title: 'Strategic Planning', desc: 'Facilitating board retreats, OKR development, and strategic alignment', icon: '📋' },
                { title: 'Partnership Development', desc: 'Identifying and negotiating strategic partnerships and alliances', icon: '🌐' },
                { title: 'Board Reporting', desc: 'Presenting strategic updates, market analysis, and recommendations', icon: '📈' },
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
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CSO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time CSO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£60,000-£130,000</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£180,000-£350,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td>
                    <td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td>
                    <td className="px-6 py-4 text-sm text-gray-600">5 days/week</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Industry Breadth</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Multiple sectors, diverse experience</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Deep single-industry focus</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Scale up/down easily</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fixed commitment</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-sm text-gray-600">SMEs, PE portfolio, specific initiatives</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Large enterprises, complex orgs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="when-needed" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">When Does Your Business Need One?</h2>

            <ul className="space-y-3">
              <li><strong>Market expansion:</strong> Entering new markets or geographies</li>
              <li><strong>M&A activity:</strong> Evaluating acquisitions or preparing for sale</li>
              <li><strong>Strategic planning:</strong> Developing multi-year corporate strategy</li>
              <li><strong>PE portfolio:</strong> Private equity-backed companies needing strategic expertise</li>
              <li><strong>Transformation:</strong> Major business model or market pivot</li>
              <li><strong>Board-level gap:</strong> Need for senior strategic voice without full-time hire</li>
            </ul>

            <h2 id="cost-pricing" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Cost and Pricing UK</h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Pricing Breakdown</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,400-£5,200/month (£40,800-£62,400/year)</li>
                <li><strong>2 days/week:</strong> £6,800-£10,400/month (£81,600-£124,800/year)</li>
                <li><strong>3 days/week:</strong> £10,200-£15,600/month (£122,400-£187,200/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CSO total cost: £250,000-£450,000+ (salary + benefits + equity)</p>
            </div>

            <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Professional Bodies & Certifications</h2>

            <p>
              Many <strong>fractional Chief Strategy Officers</strong> hold certifications from recognized business and strategy bodies:
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.iod.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">IoD</h4>
                    <p className="text-sm text-gray-600">Institute of Directors</p>
                  </div>
                </div>
              </a>
              <a href="https://www.managers.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">CMI</h4>
                    <p className="text-sm text-gray-600">Chartered Management Institute</p>
                  </div>
                </div>
              </a>
              <a href="https://www.strategicmanagement.net" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">SMS</h4>
                    <p className="text-sm text-gray-600">Strategic Management Society</p>
                  </div>
                </div>
              </a>
              <a href="https://www.cbi.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">CBI</h4>
                    <p className="text-sm text-gray-600">Confederation of British Industry</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 id="resources" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">External Resources</h2>

            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://www.mckinsey.com/capabilities/strategy-and-corporate-finance" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">McKinsey Strategy</p>
              </a>
              <a href="https://hbr.org/topic/subject/strategy" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-300 transition-all group text-center">
                <span className="text-xl">📚</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">HBR Strategy</p>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-300 transition-all group text-center">
                <span className="text-xl">💼</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">LinkedIn</p>
              </a>
              <a href="https://www.bcg.com/capabilities/corporate-strategy" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-300 transition-all group text-center">
                <span className="text-xl">🎯</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">BCG Strategy</p>
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
                  <Link href="/fractional-cso-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                    <span>💼</span> CSO Jobs UK
                  </Link>
                  <Link href="/fractional-coo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                    <span>⚙️</span> Fractional COO Guide
                  </Link>
                  <Link href="/fractional-ceo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                    <span>👔</span> Fractional CEO Guide
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="font-bold text-gray-900 mb-2">Looking for a CSO?</p>
                <p className="text-sm text-gray-600 mb-4">Browse pre-vetted strategy leaders</p>
                <Link href="/fractional-cso-jobs-uk" className="block text-center bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors text-sm">
                  View CSO Jobs
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
          <RoleCalculator role="cso" />
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
          <FAQ items={CSO_FAQS} title="" />
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
            <Link href="/fractional-cso-jobs-uk" className="bg-white p-6 rounded-lg border-2 border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-slate-700 mb-2">Fractional CSO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CSO and strategy leadership roles</p>
            </Link>
            <Link href="/fractional-coo" className="bg-white p-6 rounded-lg border-2 border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">⚙️</span>
              <h3 className="font-bold text-gray-900 group-hover:text-slate-700 mb-2">Fractional COO Guide</h3>
              <p className="text-gray-600 text-sm">Learn about fractional operations leadership</p>
            </Link>
            <Link href="/fractional-ceo" className="bg-white p-6 rounded-lg border-2 border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">👔</span>
              <h3 className="font-bold text-gray-900 group-hover:text-slate-700 mb-2">Fractional CEO Guide</h3>
              <p className="text-gray-600 text-sm">Understand fractional CEO leadership</p>
            </Link>
          </div>

          {/* Cross-role links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Other Fractional Executive Roles:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fractional-cfo" className="text-sm text-slate-700 hover:underline">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-slate-700 hover:underline">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-slate-700 hover:underline">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-slate-700 hover:underline">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-slate-700 hover:underline">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-slate-700 hover:underline">Fractional CISO</Link>
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
            Browse pre-vetted strategy leaders or post your requirements to find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cso-jobs-uk"
              className="px-8 py-4 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-400 transition-colors"
            >
              Browse Fractional CSOs
            </Link>
            <Link
              href="/fractional-jobs-uk"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              All Fractional Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest Strategy Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time strategy opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Strategy"
            title="Latest Strategy Jobs"
            accentColor="purple"
            jobsPerPage={6}
          />
        </div>
      </section>

      <RoleContentHub currentRole="cso" />
    </div>
  )
}
