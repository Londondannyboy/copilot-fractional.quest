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
  title: 'Virtual COO Services | Remote Operations Leadership for US Businesses',
  description: 'Virtual COO services for US companies. Remote operations leadership, process optimization, team building. $1,200-$2,500/day. Work with experienced COOs nationwide.',
  keywords: 'virtual coo, virtual coo services, virtual chief operating officer, remote coo, outsourced coo, coo as a service, virtual coo usa, virtual coo for startups, fractional coo, part time coo',
  alternates: { canonical: 'https://fractional.quest/virtual-coo' },
  openGraph: {
    title: 'Virtual COO Services | Remote Operations Leadership',
    description: 'Get experienced COO leadership remotely. Virtual COO services: operations strategy, process optimization, scaling for US businesses.',
    url: 'https://fractional.quest/virtual-coo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual COO Services | Remote Operations Leadership',
    description: 'Get experienced COO leadership remotely. Virtual COO services for US businesses.',
  },
}

const tocItems = [
  { id: 'what-is-virtual-coo', title: 'What is a Virtual COO?' },
  { id: 'services', title: 'Services Offered' },
  { id: 'pricing', title: 'Pricing & Engagement' },
  { id: 'virtual-vs-fractional', title: 'Virtual vs Fractional COO' },
  { id: 'when-to-hire', title: 'When to Hire' },
  { id: 'jobs', title: 'COO Opportunities' },
  { id: 'faq', title: 'FAQ' },
]

const VIRTUAL_COO_FAQS = [
  { question: "What is a virtual COO?", answer: "A virtual COO is an experienced Chief Operating Officer who provides strategic operations leadership remotely. They work with your company on a part-time basis, handling operational strategy, process improvement, and team management without the full-time cost." },
  { question: "How much do virtual COO services cost?", answer: "Virtual COO day rates in the US typically range from $1,200-$2,500 depending on experience and complexity. Monthly retainers for 1-2 days per week range from $4,800-$10,000. This is 50-70% less than a full-time COO." },
  { question: "What's the difference between a virtual COO and fractional COO?", answer: "Virtual COO and fractional COO are the same role. 'Virtual' emphasizes remote work capability, while 'fractional' emphasizes part-time commitment. Both provide strategic operations leadership without full-time cost." },
  { question: "What services does a virtual COO provide?", answer: "Virtual COOs provide: operations strategy, process design and optimization, team structure and hiring, vendor management, KPI implementation, project management, quality assurance, and operational scaling." },
  { question: "When should a company hire a virtual COO?", answer: "Companies need a virtual COO when: scaling operations, founder is overwhelmed with day-to-day, processes are breaking, customer satisfaction declining, team growing rapidly, or preparing for investment/acquisition." },
  { question: "Can a virtual COO manage teams?", answer: "Yes, virtual COOs can manage teams remotely. They typically oversee department heads, run operational reviews, and establish accountability structures. The engagement depth depends on your needs." },
  { question: "What qualifications should a virtual COO have?", answer: "Look for: 15+ years operations experience, previous COO/VP Operations roles, scaling experience, strong process orientation, change management skills, and industry-relevant experience." },
  { question: "How does a virtual COO work with the CEO?", answer: "The virtual COO acts as the CEO's operational partner - taking ownership of execution while the CEO focuses on strategy, fundraising, and external relationships. Clear communication and defined responsibilities are essential." },
]

const SERVICES = [
  { title: 'Operations Strategy', description: 'Design operational roadmap, define KPIs, and align operations with business goals', icon: '🎯' },
  { title: 'Process Optimization', description: 'Streamline workflows, eliminate bottlenecks, and implement operational best practices', icon: '⚙️' },
  { title: 'Team Structure', description: 'Design org structure, define roles, and build high-performing operational teams', icon: '👥' },
  { title: 'Vendor Management', description: 'Evaluate, negotiate, and manage key vendor relationships and contracts', icon: '🤝' },
  { title: 'Scaling Operations', description: 'Build systems and processes that scale with growth', icon: '📈' },
  { title: 'Quality & Compliance', description: 'Establish quality standards, compliance frameworks, and operational controls', icon: '✅' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Advisory', days: '4-8 hours/month', price: '$2,500-$4,000/mo', description: 'Strategic guidance, operational reviews, process audits', best: 'Established processes, periodic review' },
  { name: 'Part-Time COO', days: '1-2 days/week', price: '$4,800-$10,000/mo', description: 'Active leadership, process implementation, team management', best: 'Scaling operations' },
  { name: 'Intensive', days: '3-4 days/week', price: '$12,000-$20,000/mo', description: 'Deep involvement for operational transformation', best: 'Rapid growth, turnaround' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Virtual COO', href: '/virtual-coo' },
]

export default function VirtualCOOPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Virtual COO Services | Remote Operations Leadership"
        description="Get experienced COO leadership remotely. Virtual COO services for US businesses."
        url="https://fractional.quest/virtual-coo"
        dateModified={new Date('2026-01-30')}
      />
      <FAQPageSchema faqs={VIRTUAL_COO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
          alt="Virtual COO Services - Remote Operations Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-gray-800/90 to-zinc-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Remote Operations Leadership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Virtual COO Services
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Get <strong>experienced COO leadership</strong> without the full-time commitment. A <strong>virtual COO</strong> provides operational strategy, process optimization, and team leadership - working remotely with your company on a flexible basis.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-coo-jobs-uk" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors">
                  Find a Virtual COO
                </Link>
                <Link href="/fractional-coo" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  What is a Fractional COO?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-slate-200">$1,200-$2,500</div>
              <div className="text-slate-300/70 text-sm">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-200">1-3 days</div>
              <div className="text-slate-300/70 text-sm">Per Week</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-200">50-70%</div>
              <div className="text-slate-300/70 text-sm">Cost Savings vs FT</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-200">Remote</div>
              <div className="text-slate-300/70 text-sm">Work Anywhere</div>
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
            {/* What is a Virtual COO */}
            <section id="what-is-virtual-coo" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Virtual COO?</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  A <strong>virtual COO</strong> (also called a <strong>virtual chief operating officer</strong>) is an experienced operations executive who provides strategic COO-level leadership to companies on a remote, part-time basis. They handle the day-to-day operational complexity so founders and CEOs can focus on growth.
                </p>
                <p>
                  Virtual COOs are valuable for companies experiencing rapid growth, operational challenges, or needing to professionalize their operations without the $200,000-$350,000+ cost of a full-time COO.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Benefits of a Virtual COO</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Operational Excellence:</strong> Implement best practices and scalable processes</li>
                    <li><strong>Founder Time:</strong> Free up leadership to focus on strategy and growth</li>
                    <li><strong>Team Productivity:</strong> Build accountability and operational discipline</li>
                    <li><strong>Scale Ready:</strong> Create systems that grow with the business</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id="services" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual COO Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {SERVICES.map((service) => (
                  <div key={service.title} className="p-6 border rounded-xl hover:border-slate-300 hover:shadow-lg transition-all">
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual COO Pricing & Engagement Models</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ENGAGEMENT_MODELS.map((model) => (
                  <div key={model.name} className="bg-gray-50 p-6 rounded-xl border hover:border-slate-400 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                    <div className="text-2xl font-black text-slate-700 mb-1">{model.days}</div>
                    <div className="text-slate-700 font-semibold mb-4">{model.price}</div>
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
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual COO vs Fractional COO</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  <strong>Virtual COO</strong> and <strong>fractional COO</strong> describe the same role:
                </p>
                <ul>
                  <li><strong>Virtual COO</strong> emphasizes remote-first operations and distributed management</li>
                  <li><strong>Fractional COO</strong> emphasizes the part-time, shared resource model</li>
                </ul>
                <p>
                  Both provide experienced operations leadership without full-time cost. The choice of term often reflects the company&apos;s culture - remote-first companies tend to prefer &quot;virtual.&quot;
                </p>
              </div>
            </section>

            {/* When to Hire */}
            <section id="when-to-hire" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">When to Hire a Virtual COO</h2>
              <div className="prose prose-lg max-w-none">
                <p>Consider hiring a virtual COO when:</p>
                <ul>
                  <li><strong>Founder Overload:</strong> CEO spending too much time on operations</li>
                  <li><strong>Scaling Pains:</strong> Growth is straining existing processes</li>
                  <li><strong>Quality Issues:</strong> Customer satisfaction or delivery declining</li>
                  <li><strong>Team Growth:</strong> Rapidly hiring and need operational structure</li>
                  <li><strong>Investment Ready:</strong> Professionalizing ahead of fundraising</li>
                  <li><strong>Transformation:</strong> Need operational turnaround or restructuring</li>
                </ul>
              </div>
            </section>

            {/* Jobs Section */}
            <section id="jobs" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual COO Opportunities</h2>
              <EmbeddedJobBoard defaultDepartment="Operations" title="" accentColor="slate" jobsPerPage={6} />
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual COO FAQ</h2>
              <FAQ items={VIRTUAL_COO_FAQS} title="" />
            </section>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} title="On This Page" accentColor="slate" />

              {/* Related Pages */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Related Pages</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/fractional-coo" className="text-sm text-slate-700 hover:text-slate-900 flex items-center gap-2">
                      <span className="text-slate-500">→</span> What is a Fractional COO?
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-coo-services" className="text-sm text-slate-700 hover:text-slate-900 flex items-center gap-2">
                      <span className="text-slate-500">→</span> Fractional COO Services UK
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-coo-jobs-uk" className="text-sm text-slate-700 hover:text-slate-900 flex items-center gap-2">
                      <span className="text-slate-500">→</span> COO Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/hire-fractional-coo" className="text-sm text-slate-700 hover:text-slate-900 flex items-center gap-2">
                      <span className="text-slate-500">→</span> How to Hire a COO
                    </Link>
                  </li>
                  <li>
                    <Link href="/virtual-cfo" className="text-sm text-slate-700 hover:text-slate-900 flex items-center gap-2">
                      <span className="text-slate-500">→</span> Virtual CFO Services
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready for Virtual COO Services?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect with experienced virtual COOs who can transform your operations. Remote-first, flexible engagement, immediate impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-coo-jobs-uk" className="px-8 py-4 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-400 transition-colors">
              Find Virtual COOs
            </Link>
            <Link href="/fractional-coo" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">
              What is a Fractional COO?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
