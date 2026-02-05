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
  title: 'Virtual CTO Services UK | Remote Technology Leadership 2026',
  description: 'Virtual CTO services: Remote technology leadership for £800-£1,500/day. Technical strategy, architecture, team building. Same as fractional CTO. Compare providers.',
  keywords: 'virtual cto, virtual cto services, virtual cto uk, virtual chief technology officer, remote cto, outsourced cto, cto as a service, virtual cto for startups, fractional cto, part time cto',
  alternates: { canonical: 'https://fractional.quest/virtual-cto' },
  openGraph: {
    title: 'Virtual CTO Services UK | Remote Technology Leadership',
    description: 'Virtual CTO services: Remote tech leadership £800-£1,500/day. Technical strategy, architecture, team building.',
    url: 'https://fractional.quest/virtual-cto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual CTO Services UK | Remote Technology Leadership',
    description: 'Virtual CTO services: Remote tech leadership £800-£1,500/day. Compare UK providers.',
  },
}

const tocItems = [
  { id: 'what-is-virtual-cto', title: 'What is a Virtual CTO?' },
  { id: 'services', title: 'Services Offered' },
  { id: 'pricing', title: 'Pricing & Engagement' },
  { id: 'virtual-vs-fractional', title: 'Virtual vs Fractional CTO' },
  { id: 'when-to-hire', title: 'When to Hire' },
  { id: 'jobs', title: 'CTO Opportunities' },
  { id: 'faq', title: 'FAQ' },
]

const VIRTUAL_CTO_FAQS = [
  { question: "What is a virtual CTO?", answer: "A virtual CTO is an experienced Chief Technology Officer who provides strategic technology leadership remotely. They work with your company on a part-time basis, delivering technical strategy, architecture guidance, and engineering leadership without the full-time cost." },
  { question: "How much do virtual CTO services cost?", answer: "Virtual CTO day rates in the US typically range from $1,500-$3,000 depending on experience and specialization. Monthly retainers for 1-2 days per week range from $6,000-$12,000. This is 50-70% less than a full-time CTO with salary, benefits, and equity." },
  { question: "What's the difference between a virtual CTO and fractional CTO?", answer: "Virtual CTO and fractional CTO are the same role. 'Virtual' emphasizes remote work capability, while 'fractional' emphasizes part-time commitment. Both provide strategic technology leadership without full-time cost." },
  { question: "What services does a virtual CTO provide?", answer: "Virtual CTOs provide: technical strategy and roadmap, architecture design and review, engineering team leadership, vendor evaluation and selection, technical due diligence, security and compliance guidance, and technology stack decisions." },
  { question: "When should a startup hire a virtual CTO?", answer: "Startups need a virtual CTO when: building initial product with non-technical founders, scaling engineering team, preparing for technical due diligence, making major architecture decisions, or transitioning from agency to in-house development." },
  { question: "Can a virtual CTO manage developers?", answer: "Yes, virtual CTOs can manage engineering teams remotely. They typically handle 1:1s, sprint planning, code reviews, and technical mentorship. The engagement model depends on how much hands-on management versus strategic guidance you need." },
  { question: "What qualifications should a virtual CTO have?", answer: "Look for: 15+ years engineering experience, previous CTO/VP Engineering roles, hands-on architecture experience, startup scaling experience, strong communication skills, and relevant technology stack expertise." },
  { question: "Can a virtual CTO help with fundraising?", answer: "Yes - virtual CTOs support fundraising by: preparing technical due diligence materials, articulating technology strategy to investors, building product roadmaps, and sometimes participating in investor meetings to demonstrate technical credibility." },
]

const SERVICES = [
  { title: 'Technical Strategy', description: 'Define technology vision, roadmap, and make/buy/partner decisions aligned with business goals', icon: '🎯' },
  { title: 'Architecture Design', description: 'Design scalable systems, evaluate technology choices, and establish technical standards', icon: '🏗️' },
  { title: 'Team Building', description: 'Hire engineering talent, establish processes, and build high-performing tech teams', icon: '👥' },
  { title: 'Engineering Leadership', description: 'Lead development teams, conduct code reviews, and drive engineering excellence', icon: '⚡' },
  { title: 'Vendor Management', description: 'Evaluate and manage technology vendors, agencies, and offshore teams', icon: '🤝' },
  { title: 'Security & Compliance', description: 'Establish security practices, compliance frameworks, and risk management', icon: '🔒' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Advisory', days: '4-8 hours/month', price: '$3,000-$5,000/mo', description: 'Strategic guidance, architecture reviews, hiring support', best: 'Non-technical founders' },
  { name: 'Part-Time CTO', days: '1-2 days/week', price: '$6,000-$12,000/mo', description: 'Active leadership, team management, hands-on development', best: 'Seed to Series A' },
  { name: 'Intensive', days: '3-4 days/week', price: '$15,000-$24,000/mo', description: 'Deep involvement for critical builds or transitions', best: 'Product launch, major pivot' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Virtual CTO', href: '/virtual-cto' },
]

export default function VirtualCTOPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Virtual CTO Services | Remote Technology Leadership"
        description="Get experienced CTO leadership remotely. Virtual CTO services for US businesses."
        url="https://fractional.quest/virtual-cto"
        dateModified={new Date('2026-01-30')}
      />
      <FAQPageSchema faqs={VIRTUAL_CTO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
          alt="Virtual CTO Services - Remote Technology Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-blue-800/90 to-indigo-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Remote Tech Leadership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Virtual CTO Services
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Get <strong>experienced CTO leadership</strong> without the full-time commitment. A <strong>virtual CTO</strong> provides technical strategy, architecture guidance, and engineering leadership - working remotely with your team on a flexible basis.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cto-jobs-uk" className="px-6 py-3 bg-white text-cyan-900 font-bold rounded-lg hover:bg-cyan-50 transition-colors">
                  Find a Virtual CTO
                </Link>
                <Link href="/fractional-cto" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  What is a Fractional CTO?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-cyan-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-cyan-200">$1,500-$3,000</div>
              <div className="text-cyan-300/70 text-sm">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-black text-cyan-200">1-3 days</div>
              <div className="text-cyan-300/70 text-sm">Per Week</div>
            </div>
            <div>
              <div className="text-3xl font-black text-cyan-200">50-70%</div>
              <div className="text-cyan-300/70 text-sm">Cost Savings vs FT</div>
            </div>
            <div>
              <div className="text-3xl font-black text-cyan-200">Remote</div>
              <div className="text-cyan-300/70 text-sm">Work Anywhere</div>
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
            {/* What is a Virtual CTO */}
            <section id="what-is-virtual-cto" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Virtual CTO?</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  A <strong>virtual CTO</strong> (also called a <strong>virtual chief technology officer</strong>) is an experienced technology executive who provides strategic tech leadership to companies on a remote, part-time basis. They bring CTO-level expertise without the $250,000-$400,000+ cost of a full-time hire.
                </p>
                <p>
                  Virtual CTOs are especially valuable for non-technical founders building tech products, startups scaling their engineering teams, and companies needing technical due diligence for fundraising or M&A.
                </p>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Benefits of a Virtual CTO</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Technical Credibility:</strong> Bring experienced tech leadership to investor meetings</li>
                    <li><strong>Strategic Guidance:</strong> Make better build vs buy decisions</li>
                    <li><strong>Team Development:</strong> Hire better engineers, build better processes</li>
                    <li><strong>Risk Reduction:</strong> Avoid costly architecture mistakes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id="services" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CTO Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {SERVICES.map((service) => (
                  <div key={service.title} className="p-6 border rounded-xl hover:border-cyan-300 hover:shadow-lg transition-all">
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CTO Pricing & Engagement Models</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ENGAGEMENT_MODELS.map((model) => (
                  <div key={model.name} className="bg-gray-50 p-6 rounded-xl border hover:border-cyan-400 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                    <div className="text-2xl font-black text-cyan-700 mb-1">{model.days}</div>
                    <div className="text-cyan-700 font-semibold mb-4">{model.price}</div>
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
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CTO vs Fractional CTO</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  <strong>Virtual CTO</strong> and <strong>fractional CTO</strong> refer to the same role:
                </p>
                <ul>
                  <li><strong>Virtual CTO</strong> emphasizes remote work and distributed collaboration</li>
                  <li><strong>Fractional CTO</strong> emphasizes the part-time, shared commitment</li>
                </ul>
                <p>
                  Both provide experienced technology leadership without full-time cost. The terms are interchangeable - use whichever resonates with your audience.
                </p>
              </div>
            </section>

            {/* When to Hire */}
            <section id="when-to-hire" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">When to Hire a Virtual CTO</h2>
              <div className="prose prose-lg max-w-none">
                <p>Consider hiring a virtual CTO when:</p>
                <ul>
                  <li><strong>Non-Technical Founder:</strong> Need technical leadership to build product</li>
                  <li><strong>Scaling:</strong> Growing from 5 to 20+ engineers, need structure</li>
                  <li><strong>Architecture:</strong> Making major technology decisions</li>
                  <li><strong>Fundraising:</strong> Need CTO credibility for investor due diligence</li>
                  <li><strong>Transition:</strong> Moving from agency to in-house development</li>
                  <li><strong>Interim:</strong> Bridging gap while recruiting full-time CTO</li>
                </ul>
              </div>
            </section>

            {/* Jobs Section */}
            <section id="jobs" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CTO Opportunities</h2>
              <EmbeddedJobBoard defaultDepartment="Technology" title="" accentColor="cyan" jobsPerPage={6} />
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CTO FAQ</h2>
              <FAQ items={VIRTUAL_CTO_FAQS} title="" />
            </section>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} title="On This Page" accentColor="cyan" />

              {/* Related Pages */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Related Pages</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/fractional-cto" className="text-sm text-cyan-700 hover:text-cyan-900 flex items-center gap-2">
                      <span className="text-cyan-500">→</span> What is a Fractional CTO?
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-cto-services" className="text-sm text-cyan-700 hover:text-cyan-900 flex items-center gap-2">
                      <span className="text-cyan-500">→</span> Fractional CTO Services UK
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-cto-jobs-uk" className="text-sm text-cyan-700 hover:text-cyan-900 flex items-center gap-2">
                      <span className="text-cyan-500">→</span> CTO Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/hire-fractional-cto" className="text-sm text-cyan-700 hover:text-cyan-900 flex items-center gap-2">
                      <span className="text-cyan-500">→</span> How to Hire a CTO
                    </Link>
                  </li>
                  <li>
                    <Link href="/virtual-cfo" className="text-sm text-cyan-700 hover:text-cyan-900 flex items-center gap-2">
                      <span className="text-cyan-500">→</span> Virtual CFO Services
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready for Virtual CTO Services?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect with experienced virtual CTOs who can transform your technology function. Remote-first, flexible engagement, immediate impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-cto-jobs-uk" className="px-8 py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-400 transition-colors">
              Find Virtual CTOs
            </Link>
            <Link href="/fractional-cto" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">
              What is a Fractional CTO?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
