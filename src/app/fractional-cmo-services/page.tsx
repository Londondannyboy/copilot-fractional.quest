import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'

export const metadata: Metadata = {
  title: 'Fractional CMO Services UK | Part-Time Marketing Leadership',
  description: 'Fractional CMO services for UK businesses. Marketing leadership 1-3 days/week. Brand strategy, demand generation from £850/day. London, Manchester, Birmingham.',
  keywords: 'fractional cmo services, fractional cmo uk, part time cmo services, fractional marketing director, outsourced cmo services, cmo as a service, fractional chief marketing officer',
  alternates: { canonical: 'https://fractional.quest/fractional-cmo-services' },
  openGraph: {
    title: 'Fractional CMO Services UK | Part-Time Marketing Leadership',
    description: 'Get experienced CMO leadership without full-time commitment. Brand strategy, demand generation, marketing transformation.',
    url: 'https://fractional.quest/fractional-cmo-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CMO services?", answer: "Fractional CMO services typically include: marketing strategy development, brand positioning and messaging, demand generation and pipeline growth, marketing team leadership, agency and vendor management, marketing technology stack optimisation, and board-level marketing reporting." },
  { question: "How do fractional CMO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CMO joins leadership meetings, directs marketing strategy, manages teams and agencies, and drives measurable marketing outcomes. Engagements typically start with a strategic assessment and 90-day plan." },
  { question: "What's the difference between fractional CMO and marketing agency?", answer: "Agencies execute campaigns and produce content. Fractional CMOs provide strategic leadership - they set direction, manage agencies, hire teams, and are accountable for overall marketing performance. Think of them as your marketing leader who directs agency work." },
  { question: "How much do fractional CMO services cost?", answer: "Fractional CMO day rates in the UK range from £850-£1,300. A typical 2-day per week engagement costs £6,800-£10,400 per month (£81,600-£124,800 annually). This is 40-60% less than a full-time CMO with benefits and equity." },
  { question: "When should a company use fractional CMO services?", answer: "Ideal situations: scaling marketing beyond founder-led efforts, repositioning brand for growth, building demand generation engine, preparing for fundraising, professionalising marketing operations, or bridging gap while hiring full-time CMO." },
  { question: "Where are your fractional CMOs based?", answer: "Our fractional CMOs are based across the UK, with strong presence in London (our largest market), Manchester, Birmingham, Edinburgh, Bristol, and Leeds. Most work hybrid arrangements combining remote work with on-site client days." },
]

const SERVICES = [
  { title: 'Marketing Strategy', description: 'Develop go-to-market strategy, positioning, and marketing roadmap aligned with business goals', icon: '🎯' },
  { title: 'Brand & Positioning', description: 'Define brand strategy, messaging framework, and competitive differentiation', icon: '✨' },
  { title: 'Demand Generation', description: 'Build pipeline through digital marketing, content, events, and outbound programmes', icon: '📈' },
  { title: 'Team & Agency Management', description: 'Hire marketing talent, manage agencies, and build high-performing marketing function', icon: '👥' },
  { title: 'Marketing Technology', description: 'Select and implement martech stack - CRM, automation, analytics, attribution', icon: '🔧' },
  { title: 'Marketing Operations', description: 'Establish processes, reporting frameworks, and marketing-sales alignment', icon: '⚙️' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Strategic Advisor', days: '1 day/week', price: '£3,400-£5,200/month', description: 'Strategy oversight, monthly planning, agency direction', best: 'Early-stage, strong marketing team' },
  { name: 'Part-Time CMO', days: '2 days/week', price: '£6,800-£10,400/month', description: 'Active leadership, team management, campaign oversight', best: 'Scale-ups, demand gen focus' },
  { name: 'Intensive CMO', days: '3 days/week', price: '£10,200-£15,600/month', description: 'Deep involvement, rebrand, major launches', best: 'Transformations, rapid growth' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CMO Services', href: '/fractional-cmo-services' }]

export default function FractionalCMOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CMO Services UK | Part-Time Marketing Leadership" description="Get experienced CMO leadership without full-time commitment." url="https://fractional.quest/fractional-cmo-services" dateModified={new Date('2026-01-17')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80" alt="Fractional CMO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-800/90 to-pink-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Marketing Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CMO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CMO leadership</strong> without the full-time commitment. Build your brand, drive demand generation, and scale marketing with a senior marketing leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Find a Fractional CMO</Link>
                <Link href="/fractional-jobs-london" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">London CMO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-200">£850-£1,300</div><div className="text-amber-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-amber-200">1-3 days</div><div className="text-amber-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-amber-200">40-60%</div><div className="text-amber-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-amber-200">90 days</div><div className="text-amber-300/70 text-sm">Typical First Review</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CMO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-amber-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your marketing maturity and growth goals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-amber-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-amber-700 mb-1">{model.days}</div>
                <div className="text-amber-600 font-semibold mb-4">{model.price}</div>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="pt-4 border-t">
                  <span className="text-xs font-bold uppercase text-gray-500">Best for:</span>
                  <p className="text-gray-700 font-medium">{model.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Opportunities</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Current Fractional CMO Jobs</h2>
          </div>
          <EmbeddedJobBoard defaultDepartment="Marketing" title="" accentColor="amber" jobsPerPage={6} />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CMO Services</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CMO</strong> provides senior marketing leadership without the cost and commitment of a full-time hire. This model is particularly effective for companies that need strategic marketing expertise but are not yet ready for a full-time C-suite marketing leader.</p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CMO Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Founder-led marketing</strong> - When founders need to hand off marketing leadership</li>
              <li><strong>Agency dependency</strong> - When you need someone to direct agency work strategically</li>
              <li><strong>Brand evolution</strong> - Repositioning, rebrand, or entering new markets</li>
              <li><strong>Demand generation</strong> - Building pipeline and marketing-sourced revenue</li>
              <li><strong>Pre-fundraise</strong> - Professionalising marketing before Series A/B</li>
              <li><strong>Marketing leadership gap</strong> - Covering departure while hiring permanent CMO</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">UK Locations We Serve</h3>
            <p>Our fractional CMOs operate across the UK, with particular strength in:</p>
            <div className="grid md:grid-cols-3 gap-4 not-prose my-6">
              <Link href="/fractional-jobs-london" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">London</h4>
                <p className="text-sm text-gray-600">Our largest market - tech, VC-backed, B2B SaaS</p>
              </Link>
              <Link href="/manchester" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">Manchester</h4>
                <p className="text-sm text-gray-600">Growing digital marketing hub</p>
              </Link>
              <Link href="/birmingham" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">Birmingham</h4>
                <p className="text-sm text-gray-600">Professional services, manufacturing</p>
              </Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CMO vs Marketing Agency</h3>
            <div className="not-prose overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Aspect</th>
                    <th className="text-left py-3 px-4">Fractional CMO</th>
                    <th className="text-left py-3 px-4">Marketing Agency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-3 px-4 font-semibold">Accountability</td><td className="py-3 px-4">Owns marketing outcomes</td><td className="py-3 px-4">Delivers campaign outputs</td></tr>
                  <tr className="border-b"><td className="py-3 px-4 font-semibold">Strategy</td><td className="py-3 px-4">Sets overall direction</td><td className="py-3 px-4">Executes brief</td></tr>
                  <tr><td className="py-3 px-4 font-semibold">Team Leadership</td><td className="py-3 px-4">Manages internal team & agencies</td><td className="py-3 px-4">External resource</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">Find Fractional CMOs</h4>
                <p className="text-sm text-gray-600">Browse available fractional CMOs</p>
              </Link>
              <Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">How to Hire</h4>
                <p className="text-sm text-gray-600">Guide to hiring a fractional CMO</p>
              </Link>
              <Link href="/fractional-cmo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">CMO Salary Guide</h4>
                <p className="text-sm text-gray-600">Day rates and benchmarks</p>
              </Link>
              <Link href="/fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">What is a Fractional CMO?</h4>
                <p className="text-sm text-gray-600">Understanding the role</p>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* External Authority Links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Professional Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📚</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">CIM</h4>
                <p className="text-gray-500 text-xs">Chartered Institute of Marketing</p>
              </div>
            </a>
            <a href="https://dma.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📊</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">DMA</h4>
                <p className="text-gray-500 text-xs">Data & Marketing Association</p>
              </div>
            </a>
            <a href="https://www.marketingweek.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📰</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">Marketing Week</h4>
                <p className="text-gray-500 text-xs">UK marketing news and insights</p>
              </div>
            </a>
            <a href="https://ipa.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">🏆</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">IPA</h4>
                <p className="text-gray-500 text-xs">Institute of Practitioners in Advertising</p>
              </div>
            </a>
            <a href="https://www.warc.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📈</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">WARC</h4>
                <p className="text-gray-500 text-xs">Marketing effectiveness research</p>
              </div>
            </a>
            <a href="https://b2bmarketing.net/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">🎯</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">B2B Marketing</h4>
                <p className="text-gray-500 text-xs">B2B marketing community and awards</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-amber-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CMO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Get Started with Fractional CMO Services?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Connect with experienced fractional CMOs who can transform your marketing. London, Manchester, Birmingham and across the UK.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-cmo-jobs-uk" className="px-8 py-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-400 transition-colors">Find Fractional CMOs</Link>
            <Link href="/fractional-jobs-london" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">London CMO Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
