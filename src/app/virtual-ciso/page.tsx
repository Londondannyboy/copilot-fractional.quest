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
  title: 'Virtual CISO Services | Remote Security Leadership for US Businesses',
  description: 'Virtual CISO services for US companies. Remote cybersecurity leadership, compliance, risk management. $1,500-$3,000/day. Work with experienced CISOs nationwide.',
  keywords: 'virtual ciso, virtual ciso services, virtual chief information security officer, remote ciso, outsourced ciso, ciso as a service, virtual ciso usa, virtual ciso for startups, fractional ciso, part time ciso',
  alternates: { canonical: 'https://fractional.quest/virtual-ciso' },
  openGraph: {
    title: 'Virtual CISO Services | Remote Security Leadership',
    description: 'Get experienced CISO leadership remotely. Virtual CISO services: security strategy, compliance, risk management for US businesses.',
    url: 'https://fractional.quest/virtual-ciso',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual CISO Services | Remote Security Leadership',
    description: 'Get experienced CISO leadership remotely. Virtual CISO services for US businesses.',
  },
}

const tocItems = [
  { id: 'what-is-virtual-ciso', title: 'What is a Virtual CISO?' },
  { id: 'services', title: 'Services Offered' },
  { id: 'pricing', title: 'Pricing & Engagement' },
  { id: 'virtual-vs-fractional', title: 'Virtual vs Fractional CISO' },
  { id: 'when-to-hire', title: 'When to Hire' },
  { id: 'jobs', title: 'CISO Opportunities' },
  { id: 'faq', title: 'FAQ' },
]

const VIRTUAL_CISO_FAQS = [
  { question: "What is a virtual CISO?", answer: "A virtual CISO (vCISO) is an experienced Chief Information Security Officer who provides strategic cybersecurity leadership remotely on a part-time basis. They deliver the same expertise as an in-house CISO - security strategy, compliance, risk management - without the full-time cost." },
  { question: "How much do virtual CISO services cost?", answer: "Virtual CISO day rates in the US typically range from $1,500-$3,000 depending on experience and certifications. Monthly retainers for 1-2 days per week range from $6,000-$12,000. This is 50-70% less than a full-time CISO with salary, benefits, and equity." },
  { question: "What's the difference between a virtual CISO and fractional CISO?", answer: "Virtual CISO and fractional CISO are the same role. 'Virtual' (vCISO) emphasizes remote work capability, while 'fractional' emphasizes part-time commitment. Both provide strategic security leadership without full-time cost." },
  { question: "What services does a virtual CISO provide?", answer: "Virtual CISOs provide: security strategy and roadmap, risk assessment and management, compliance (SOC 2, ISO 27001, HIPAA, PCI-DSS), security architecture review, incident response planning, vendor security assessment, and security awareness training." },
  { question: "When should a company hire a virtual CISO?", answer: "Companies need a virtual CISO when: pursuing enterprise customers who require security certifications, preparing for SOC 2 or ISO 27001 compliance, after a security incident, handling sensitive data, or seeking cyber insurance." },
  { question: "Can a virtual CISO help with SOC 2 compliance?", answer: "Absolutely - SOC 2 compliance is a core virtual CISO service. They help define scope, implement controls, prepare documentation, manage auditor relationships, and maintain ongoing compliance. Most companies achieve SOC 2 Type I in 3-6 months with a vCISO." },
  { question: "What qualifications should a virtual CISO have?", answer: "Look for: CISSP, CISM, or CISA certifications, 15+ years security experience, previous CISO/VP Security roles, compliance experience (SOC 2, ISO 27001), incident response background, and industry-relevant experience." },
  { question: "How does a virtual CISO work with our IT team?", answer: "The virtual CISO provides strategic direction and oversight while your IT team handles implementation. They define security policies, review configurations, conduct risk assessments, and ensure compliance - working collaboratively with IT rather than replacing them." },
]

const SERVICES = [
  { title: 'Security Strategy', description: 'Develop comprehensive security roadmap aligned with business objectives and risk tolerance', icon: '🎯' },
  { title: 'Compliance', description: 'Achieve and maintain SOC 2, ISO 27001, HIPAA, PCI-DSS, and other compliance frameworks', icon: '✅' },
  { title: 'Risk Management', description: 'Identify, assess, and mitigate cybersecurity risks across the organization', icon: '⚠️' },
  { title: 'Incident Response', description: 'Develop and test incident response plans, lead response during security events', icon: '🚨' },
  { title: 'Vendor Security', description: 'Assess third-party security, manage vendor questionnaires, review contracts', icon: '🔍' },
  { title: 'Security Awareness', description: 'Implement training programs and build security-conscious culture', icon: '🎓' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Advisory', days: '4-8 hours/month', price: '$3,000-$5,000/mo', description: 'Policy review, risk oversight, compliance guidance', best: 'Early-stage, low-risk data' },
  { name: 'Part-Time CISO', days: '1-2 days/week', price: '$6,000-$12,000/mo', description: 'Active compliance programs, security implementation', best: 'SOC 2 journey, enterprise sales' },
  { name: 'Intensive', days: '3-4 days/week', price: '$15,000-$25,000/mo', description: 'Major compliance initiative or incident response', best: 'Rapid SOC 2, security overhaul' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Virtual CISO', href: '/virtual-ciso' },
]

export default function VirtualCISOPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Virtual CISO Services | Remote Security Leadership"
        description="Get experienced CISO leadership remotely. Virtual CISO services for US businesses."
        url="https://fractional.quest/virtual-ciso"
        dateModified={new Date('2026-01-30')}
      />
      <FAQPageSchema faqs={VIRTUAL_CISO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80"
          alt="Virtual CISO Services - Remote Security Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 via-rose-800/90 to-orange-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Remote Security Leadership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Virtual CISO Services
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Get <strong>experienced CISO leadership</strong> without the full-time commitment. A <strong>virtual CISO</strong> (vCISO) provides security strategy, compliance guidance, and risk management - working remotely with your team on a flexible basis.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-ciso-jobs-uk" className="px-6 py-3 bg-white text-red-900 font-bold rounded-lg hover:bg-red-50 transition-colors">
                  Find a Virtual CISO
                </Link>
                <Link href="/fractional-ciso" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  What is a Fractional CISO?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-red-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-red-200">$1,500-$3,000</div>
              <div className="text-red-300/70 text-sm">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-black text-red-200">1-3 days</div>
              <div className="text-red-300/70 text-sm">Per Week</div>
            </div>
            <div>
              <div className="text-3xl font-black text-red-200">50-70%</div>
              <div className="text-red-300/70 text-sm">Cost Savings vs FT</div>
            </div>
            <div>
              <div className="text-3xl font-black text-red-200">CISSP</div>
              <div className="text-red-300/70 text-sm">Typically Certified</div>
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
            {/* What is a Virtual CISO */}
            <section id="what-is-virtual-ciso" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Virtual CISO?</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  A <strong>virtual CISO</strong> (also called <strong>vCISO</strong> or <strong>virtual chief information security officer</strong>) is an experienced cybersecurity executive who provides strategic security leadership to organizations on a remote, part-time basis.
                </p>
                <p>
                  Virtual CISOs are essential for companies that handle sensitive data, pursue enterprise customers requiring security certifications (SOC 2, ISO 27001), or need to mature their security posture without the $250,000-$400,000+ cost of a full-time CISO.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Benefits of a Virtual CISO</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Compliance Ready:</strong> Achieve SOC 2, ISO 27001, HIPAA certification</li>
                    <li><strong>Enterprise Sales:</strong> Pass security questionnaires and vendor assessments</li>
                    <li><strong>Risk Reduction:</strong> Proactive security vs reactive firefighting</li>
                    <li><strong>Expert Guidance:</strong> Access senior security talent on-demand</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id="services" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CISO Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {SERVICES.map((service) => (
                  <div key={service.title} className="p-6 border rounded-xl hover:border-red-300 hover:shadow-lg transition-all">
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CISO Pricing & Engagement Models</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ENGAGEMENT_MODELS.map((model) => (
                  <div key={model.name} className="bg-gray-50 p-6 rounded-xl border hover:border-red-400 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                    <div className="text-2xl font-black text-red-700 mb-1">{model.days}</div>
                    <div className="text-red-700 font-semibold mb-4">{model.price}</div>
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
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CISO vs Fractional CISO</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  <strong>Virtual CISO (vCISO)</strong> and <strong>fractional CISO</strong> are the same role:
                </p>
                <ul>
                  <li><strong>Virtual CISO</strong> emphasizes remote security leadership and is the most common industry term</li>
                  <li><strong>Fractional CISO</strong> emphasizes part-time, shared resource model</li>
                </ul>
                <p>
                  The term &quot;vCISO&quot; has become standard in the cybersecurity industry. Both refer to experienced security leaders working with multiple organizations on a part-time basis.
                </p>
              </div>
            </section>

            {/* When to Hire */}
            <section id="when-to-hire" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">When to Hire a Virtual CISO</h2>
              <div className="prose prose-lg max-w-none">
                <p>Consider hiring a virtual CISO when:</p>
                <ul>
                  <li><strong>Enterprise Sales:</strong> Customers require SOC 2, ISO 27001, or security questionnaires</li>
                  <li><strong>Compliance:</strong> Need to achieve HIPAA, PCI-DSS, or industry certifications</li>
                  <li><strong>After Incident:</strong> Recovering from breach or security event</li>
                  <li><strong>Sensitive Data:</strong> Handle PII, PHI, financial, or other regulated data</li>
                  <li><strong>Cyber Insurance:</strong> Need to qualify for or reduce insurance premiums</li>
                  <li><strong>Board Requirements:</strong> Investors or board require security oversight</li>
                </ul>
              </div>
            </section>

            {/* Jobs Section */}
            <section id="jobs" className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CISO Opportunities</h2>
              <EmbeddedJobBoard defaultDepartment="Technology" title="" accentColor="red" jobsPerPage={6} />
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Virtual CISO FAQ</h2>
              <FAQ items={VIRTUAL_CISO_FAQS} title="" />
            </section>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} title="On This Page" accentColor="red" />

              {/* Related Pages */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Related Pages</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/fractional-ciso" className="text-sm text-red-700 hover:text-red-900 flex items-center gap-2">
                      <span className="text-red-500">→</span> What is a Fractional CISO?
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-ciso-services" className="text-sm text-red-700 hover:text-red-900 flex items-center gap-2">
                      <span className="text-red-500">→</span> Fractional CISO Services UK
                    </Link>
                  </li>
                  <li>
                    <Link href="/fractional-ciso-jobs-uk" className="text-sm text-red-700 hover:text-red-900 flex items-center gap-2">
                      <span className="text-red-500">→</span> CISO Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/hire-fractional-ciso" className="text-sm text-red-700 hover:text-red-900 flex items-center gap-2">
                      <span className="text-red-500">→</span> How to Hire a CISO
                    </Link>
                  </li>
                  <li>
                    <Link href="/virtual-cto" className="text-sm text-red-700 hover:text-red-900 flex items-center gap-2">
                      <span className="text-red-500">→</span> Virtual CTO Services
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready for Virtual CISO Services?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect with experienced virtual CISOs who can transform your security posture. Achieve compliance, reduce risk, win enterprise deals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-ciso-jobs-uk" className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-colors">
              Find Virtual CISOs
            </Link>
            <Link href="/fractional-ciso" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">
              What is a Fractional CISO?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
