import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'

export const metadata: Metadata = {
  title: 'Virtual CFO Services UK | Remote Finance Leadership 2026',
  description: 'Virtual CFO services: Remote finance leadership for £700-£1,400/day. Financial strategy, fundraising, cash flow management. Same as fractional CFO. Compare providers.',
  keywords: 'virtual cfo, virtual cfo services, virtual cfo uk, virtual chief financial officer, remote cfo, outsourced cfo, cfo as a service, virtual cfo for startups, fractional cfo, part time cfo',
  alternates: { canonical: 'https://fractional.quest/virtual-cfo' },
  openGraph: {
    title: 'Virtual CFO Services UK | Remote Finance Leadership',
    description: 'Virtual CFO services: Remote finance leadership £700-£1,400/day. Strategy, fundraising, reporting.',
    url: 'https://fractional.quest/virtual-cfo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual CFO Services UK | Remote Finance Leadership',
    description: 'Virtual CFO services: Remote finance leadership £700-£1,400/day. Compare UK providers.',
  },
}

const tocItems = [
  { id: 'what-is-virtual-cfo', title: 'What is a Virtual CFO?' },
  { id: 'services', title: 'Services Offered' },
  { id: 'pricing', title: 'Pricing & Engagement' },
  { id: 'virtual-vs-fractional', title: 'Virtual vs Fractional CFO' },
  { id: 'when-to-hire', title: 'When to Hire' },
  { id: 'jobs', title: 'CFO Opportunities' },
  { id: 'faq', title: 'FAQ' },
]

const VIRTUAL_CFO_FAQS = [
  { question: "What is a virtual CFO?", answer: "A virtual CFO is an experienced Chief Financial Officer who provides strategic finance leadership remotely. They work with your company on a part-time or project basis, delivering the same expertise as an in-house CFO without the full-time cost. Virtual CFOs leverage technology to collaborate effectively from anywhere." },
  { question: "How much do virtual CFO services cost?", answer: "Virtual CFO day rates in the US typically range from $1,200-$2,500 depending on experience and complexity. Monthly retainers for 1-2 days per week range from $4,800-$10,000. This is 50-70% less than a full-time CFO with salary, benefits, and equity." },
  { question: "What's the difference between a virtual CFO and fractional CFO?", answer: "Virtual CFO and fractional CFO are essentially the same role. 'Virtual' emphasizes the remote-first nature of the engagement, while 'fractional' emphasizes the part-time commitment. Both provide strategic finance leadership without full-time cost. The terms are often used interchangeably." },
  { question: "What services does a virtual CFO provide?", answer: "Virtual CFOs provide: financial strategy and planning, cash flow management, fundraising support (models, decks, investor relations), board reporting, KPI dashboards, budgeting and forecasting, M&A support, financial systems implementation, and team leadership." },
  { question: "When should a startup hire a virtual CFO?", answer: "Startups typically need a virtual CFO when: preparing for Series A or later funding rounds, post-investment to meet reporting requirements, revenue exceeds $2-5M and complexity increases, preparing for M&A (acquisition or exit), or when the founder can no longer manage finances alone." },
  { question: "How does a virtual CFO work with my existing accountant?", answer: "Your accountant handles compliance (tax returns, annual filings). Your virtual CFO focuses on strategic finance - they use accounting data to build forecasts, investor reports, and strategic insights. Virtual CFOs often help select and manage accounting partners." },
  { question: "Can a virtual CFO help with fundraising?", answer: "Absolutely - fundraising support is a core virtual CFO service. They build financial models, prepare data rooms, create investor decks, coordinate due diligence, negotiate term sheets, and manage investor relations throughout the process." },
  { question: "What qualifications should a virtual CFO have?", answer: "Look for: CPA or MBA credentials, 15+ years finance experience, previous CFO/VP Finance roles, startup or growth company experience, fundraising track record, and strong references. Industry-specific experience is valuable but not always essential." },
]

const SERVICES = [
  { title: 'Financial Strategy', description: 'Develop financial roadmap, budgeting, forecasting, and scenario planning aligned with your growth goals', icon: '📊' },
  { title: 'Fundraising Support', description: 'Financial models, pitch decks, due diligence prep, investor relations, and term sheet negotiation', icon: '💰' },
  { title: 'Cash Flow Management', description: 'Working capital optimization, runway extension, cash forecasting, and treasury management', icon: '💵' },
  { title: 'Board & Investor Reporting', description: 'Monthly board packs, investor updates, KPI dashboards, and financial narratives', icon: '📈' },
  { title: 'Financial Systems', description: 'Implement and optimize accounting systems, FP&A tools, and reporting infrastructure', icon: '⚙️' },
  { title: 'Team Building', description: 'Hire finance talent, develop processes, and build scalable finance operations', icon: '👥' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Advisory', days: '4-8 hours/month', price: '$2,000-$4,000/mo', description: 'Board meetings, strategic guidance, investor liaison', best: 'Post-seed with bookkeeper' },
  { name: 'Part-Time CFO', days: '1-2 days/week', price: '$4,800-$10,000/mo', description: 'Active leadership, fundraising, systems implementation', best: 'Series A/B, scaling' },
  { name: 'Intensive', days: '3-4 days/week', price: '$12,000-$20,000/mo', description: 'Deep involvement for critical projects', best: 'Active fundraise, M&A' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Virtual CFO', href: '/virtual-cfo' },
]

export default function VirtualCFOPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Virtual CFO Services | Remote Finance Leadership"
        description="Get experienced CFO leadership remotely. Virtual CFO services for US businesses."
        url="https://fractional.quest/virtual-cfo"
        dateModified={new Date('2026-01-30')}
      />
      <FAQPageSchema faqs={VIRTUAL_CFO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
          alt="Virtual CFO Services - Remote Finance Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-teal-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Remote Finance Leadership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Virtual CFO Services
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Get <strong>experienced CFO leadership</strong> without the full-time commitment. A <strong>virtual CFO</strong> provides strategic financial guidance, fundraising support, and board-level reporting - working remotely with your team on a flexible basis.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cfo-jobs-uk" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                  Find a Virtual CFO
                </Link>
                <Link href="/fractional-cfo-services" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  UK CFO Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-emerald-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-emerald-200">$1,200-$2,500</div>
              <div className="text-emerald-300/70 text-sm">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-200">1-3 days</div>
              <div className="text-emerald-300/70 text-sm">Per Week</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-200">50-70%</div>
              <div className="text-emerald-300/70 text-sm">Cost Savings vs FT</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-200">Remote</div>
              <div className="text-emerald-300/70 text-sm">Work Anywhere</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile TOC */}
      <TableOfContentsMobile items={tocItems} />

      {/* Main Content with Sidebar TOC */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <main>
            {/* What is a Virtual CFO */}
            <section id="what-is-virtual-cfo" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Virtual CFO?</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  A <strong>virtual CFO</strong> (also called a <strong>virtual chief financial officer</strong>) is an experienced finance executive who provides strategic CFO-level guidance to companies on a remote, part-time basis. Unlike traditional CFOs who work on-site full-time, virtual CFOs leverage technology to collaborate effectively from anywhere.
                </p>
                <p>
                  Virtual CFOs are particularly popular with startups, scale-ups, and SMBs that need sophisticated financial leadership but aren&apos;t ready for a $300,000+ full-time CFO hire. They bring the same expertise - fundraising, board reporting, financial strategy - at a fraction of the cost.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Benefits of a Virtual CFO</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Cost Effective:</strong> 50-70% less than full-time CFO with benefits and equity</li>
                    <li><strong>Flexible:</strong> Scale up or down based on business needs</li>
                    <li><strong>Experienced:</strong> Access senior talent that wouldn&apos;t join full-time</li>
                    <li><strong>Immediate Impact:</strong> No learning curve - hit the ground running</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id="services" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CFO Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {SERVICES.map((service) => (
                  <div key={service.title} className="p-6 border rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CFO Pricing & Engagement Models</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ENGAGEMENT_MODELS.map((model) => (
                  <div key={model.name} className="bg-gray-50 p-6 rounded-xl border hover:border-emerald-400 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                    <div className="text-2xl font-black text-emerald-700 mb-1">{model.days}</div>
                    <div className="text-emerald-700 font-semibold mb-4">{model.price}</div>
                    <p className="text-gray-600 mb-4">{model.description}</p>
                    <div className="pt-4 border-t">
                      <span className="text-xs font-bold uppercase text-gray-500">Best for:</span>
                      <p className="text-gray-700 font-medium">{model.best}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Virtual vs Fractional */}
            <section id="virtual-vs-fractional" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CFO vs Fractional CFO</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  <strong>Virtual CFO</strong> and <strong>fractional CFO</strong> are essentially the same role with different emphasis:
                </p>
                <ul>
                  <li><strong>Virtual CFO</strong> emphasizes the remote-first, technology-enabled nature of the work</li>
                  <li><strong>Fractional CFO</strong> emphasizes the part-time, shared-resource model</li>
                </ul>
                <p>
                  Both terms describe an experienced CFO who works with multiple companies on a part-time basis, providing strategic finance leadership without the full-time commitment. The terms are used interchangeably in the market.
                </p>
                <div className="bg-gray-100 rounded-lg p-6 my-6">
                  <h4 className="font-bold text-gray-900 mb-3">Related Terms</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Outsourced CFO</strong> - Same concept, agency model</div>
                    <div><strong>CFO as a Service</strong> - Productized CFO offering</div>
                    <div><strong>Part-time CFO</strong> - Emphasis on time commitment</div>
                    <div><strong>Interim CFO</strong> - Full-time, temporary (different)</div>
                  </div>
                </div>
              </div>
            </section>

            {/* When to Hire */}
            <section id="when-to-hire" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">When to Hire a Virtual CFO</h2>
              <div className="prose prose-lg max-w-none">
                <p>Consider hiring a virtual CFO when:</p>
                <ul>
                  <li><strong>Fundraising:</strong> Preparing for Series A, B, or growth equity rounds</li>
                  <li><strong>Post-Investment:</strong> Investors require board packs and financial reporting</li>
                  <li><strong>Scaling:</strong> Revenue exceeds $2-5M and complexity increases</li>
                  <li><strong>M&A:</strong> Preparing for acquisition or considering acquisitions</li>
                  <li><strong>Systems:</strong> Need to professionalize finance operations and tools</li>
                  <li><strong>Bridge:</strong> Need CFO coverage while recruiting full-time</li>
                </ul>
              </div>
            </section>

            {/* Jobs Section */}
            <section id="jobs" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CFO Opportunities</h2>
              <EmbeddedJobBoard defaultDepartment="Finance" title="" accentColor="emerald" jobsPerPage={6} />
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CFO FAQ</h2>
              <FAQ items={VIRTUAL_CFO_FAQS} title="" />
            </section>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} title="On This Page" accentColor="emerald" />

              {/* Related Pages */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Related Pages</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/fractional-cfo-services" className="text-sm text-emerald-700 hover:text-emerald-900 flex items-center gap-2">
                      <span className="text-emerald-500">→</span> Fractional CFO Services UK
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-cfo" className="text-sm text-emerald-700 hover:text-emerald-900 flex items-center gap-2">
                      <span className="text-emerald-500">→</span> What is a Fractional CFO?
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-cfo-jobs-uk" className="text-sm text-emerald-700 hover:text-emerald-900 flex items-center gap-2">
                      <span className="text-emerald-500">→</span> CFO Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/hire-fractional-cfo" className="text-sm text-emerald-700 hover:text-emerald-900 flex items-center gap-2">
                      <span className="text-emerald-500">→</span> How to Hire a CFO
                    </Link>
                  </li>
                  <li>
                    <Link href="/virtual-cto" className="text-sm text-emerald-700 hover:text-emerald-900 flex items-center gap-2">
                      <span className="text-emerald-500">→</span> Virtual CTO Services
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready for Virtual CFO Services?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect with experienced virtual CFOs who can transform your finance function. Remote-first, flexible engagement, immediate impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-cfo-jobs-uk" className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-400 transition-colors">
              Find Virtual CFOs
            </Link>
            <Link href="/fractional-cfo-services" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">
              UK CFO Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
