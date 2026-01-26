import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CIO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage } from '@/lib/images'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'

// Table of Contents items
const tocItems = [
  { id: 'understanding', title: 'Understanding the Role' },
  { id: 'cio-vs-cto', title: 'CIO vs CTO' },
  { id: 'responsibilities', title: 'Key Responsibilities' },
  { id: 'comparison', title: 'Part-Time vs Full-Time' },
  { id: 'when-needed', title: 'When You Need One' },
  { id: 'cost-pricing', title: 'Cost & Pricing UK' },
  { id: 'types', title: 'Types of Engagement' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'resources', title: 'External Resources' },
  { id: 'calculator', title: 'Day Rate Calculator' },
  { id: 'jobs', title: 'CIO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const ogImage = getOGImageUrl('cio')
const imageAlt = getImage('cio').alt
const imageCredit = getImage('cio')

export const metadata: Metadata = {
  title: 'What is a Fractional CIO? | Guide',
  description: 'What is a fractional CIO? A part-time IT leader for digital transformation, infrastructure, and business systems. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cio, fractional cio meaning, fractional cio definition, part time cio, fractional chief information officer, fractional it director, what does a fractional cio do, cio vs cto',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cio',
  },
  openGraph: {
    title: 'What is a Fractional CIO? | Complete Guide',
    description: 'Understand fractional CIO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Information Officer.',
    url: 'https://fractional.quest/fractional-cio',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CIO? | Complete Guide',
    description: 'Understand fractional CIO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Information Officer.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CIO', href: '/fractional-cio' },
]

export default function FractionalCioPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CIO? | Part-Time Chief Information Officer Guide"
        description="Complete guide to fractional CIO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Information Officer does."
        url="https://fractional.quest/fractional-cio"
        dateModified={new Date('2026-01-26')}
      />
      <FAQPageSchema faqs={CIO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/fractional-cio-jobs-uk-desktop.webp"
          alt={`What is a Fractional CIO - ${imageAlt}`}
          title="Fractional CIO - Part-Time IT Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-indigo-500/80 to-violet-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                What is a <strong>Fractional CIO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CIO</strong> is a part-time Chief Information Officer who provides strategic IT leadership, digital transformation, and technology infrastructure expertise on a flexible basis. Learn about <strong>fractional CIO meaning</strong>, responsibilities, and costs.
              </p>
            </div>
          </div>
        </div>
        {/* Photo Credit */}
        <div className="absolute bottom-2 right-2 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors">
            Photo: {imageCredit.credit}
          </a>
        </div>
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4">Fractional CIO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CIO</strong> (Fractional Chief Information Officer) is an experienced IT executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic IT leadership, digital transformation guidance, and technology infrastructure expertise without the cost of a full-time hire.
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

            <h2 id="understanding" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">What is a Fractional CIO? Understanding the Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional CIO meaning</strong> centres on flexible, senior-level IT leadership. Unlike traditional full-time CIOs earning £140,000-£220,000 annually, a <strong>fractional Chief Information Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            {/* Authority context box */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> As the <a href="https://www.bbc.co.uk/news/articles/c5yv6n536vno" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline font-medium">BBC reports on the evolving UK job market (Jan 2026)</a>, companies are increasingly embracing flexible executive arrangements. Fractional CIOs represent a key part of this shift, part of the broader <a href="https://en.wikipedia.org/wiki/Fractional_work" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">fractional work</a> trend transforming executive recruitment.
              </p>
            </div>

            <p>
              The fractional CIO model is ideal for organisations undergoing digital transformation, implementing enterprise systems, or needing senior IT leadership without the full-time cost. A <strong>fractional CIO</strong> brings the same strategic thinking, vendor management, and technology infrastructure expertise as a full-time CIO, but on a fractional basis.
            </p>

            <h2 id="cio-vs-cto" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">CIO vs CTO: What&apos;s the Difference?</h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-purple-700 mb-3">Chief Information Officer (CIO)</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>Internal focus:</strong> IT operations & infrastructure</li>
                    <li>• <strong>Systems:</strong> ERP, CRM, business applications</li>
                    <li>• <strong>Goal:</strong> Business efficiency through technology</li>
                    <li>• <strong>Teams:</strong> IT operations, helpdesk, security</li>
                    <li>• <strong>Vendors:</strong> Microsoft, SAP, Oracle, ServiceNow</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-700 mb-3">Chief Technology Officer (CTO)</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>External focus:</strong> Product technology</li>
                    <li>• <strong>Systems:</strong> Product code, APIs, platforms</li>
                    <li>• <strong>Goal:</strong> Build technology products</li>
                    <li>• <strong>Teams:</strong> Engineering, DevOps, architecture</li>
                    <li>• <strong>Stack:</strong> Cloud, languages, frameworks</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 pt-4 border-t">
                <strong>Note:</strong> In smaller companies, these roles often overlap. A fractional CIO/CTO hybrid may handle both internal IT and product technology.
              </p>
            </div>

            <h2 id="responsibilities" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Key Responsibilities and Deliverables</h2>

            <p>
              A <strong>fractional CIO</strong> performs the same functions as a full-time Chief Information Officer, but on a part-time basis. Their responsibilities typically include:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'IT Strategy', desc: 'Aligning technology investments with business objectives', icon: '🎯' },
                { title: 'Digital Transformation', desc: 'Leading cloud migration, automation, and modernisation', icon: '🚀' },
                { title: 'Enterprise Systems', desc: 'ERP, CRM, and business application implementation', icon: '🏢' },
                { title: 'Vendor Management', desc: 'Negotiating contracts and managing technology partners', icon: '🤝' },
                { title: 'IT Operations', desc: 'Ensuring reliability, uptime, and service delivery', icon: '⚙️' },
                { title: 'Security & Compliance', desc: 'Data protection, GDPR, and cybersecurity governance', icon: '🔒' },
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
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CIO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time CIO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£45,000-£110,000</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£140,000-£280,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td>
                    <td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td>
                    <td className="px-6 py-4 text-sm text-gray-600">5 days/week</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Experience Breadth</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Multiple industries, vendors, transformations</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Deep single-company focus</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Scale up/down with projects</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fixed commitment</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Hiring Speed</td>
                    <td className="px-6 py-4 text-sm text-gray-600">2-4 weeks</td>
                    <td className="px-6 py-4 text-sm text-gray-600">3-6 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-sm text-gray-600">SMEs, transformation projects, interim needs</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Large enterprises, complex IT estates</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="when-needed" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">When Does Your Business Need One?</h2>

            <ul className="space-y-3">
              <li><strong>Digital transformation:</strong> Moving to cloud, automating processes, modernising systems</li>
              <li><strong>ERP implementation:</strong> SAP, Oracle, Microsoft Dynamics, NetSuite projects</li>
              <li><strong>IT cost optimisation:</strong> Reducing vendor costs, renegotiating contracts</li>
              <li><strong>Cybersecurity upgrade:</strong> Improving security posture, achieving certifications</li>
              <li><strong>M&A activity:</strong> IT due diligence, system integration post-acquisition</li>
              <li><strong>IT leadership gap:</strong> Between CIO departures or during growth phases</li>
            </ul>

            <div className="bg-purple-50 p-6 border border-purple-200 rounded-lg my-8 not-prose">
              <p className="text-purple-800 font-medium mb-3">Ready to hire a fractional CIO?</p>
              <Link href="/hire-fractional-cio" className="inline-flex items-center text-purple-700 font-bold hover:text-purple-900">
                Complete Guide: How to Hire a Fractional CIO →
              </Link>
            </div>

            <h2 id="cost-pricing" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Cost and Pricing UK</h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Pricing Breakdown</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,600-£5,600/month (£43,000-£67,000/year)</li>
                <li><strong>2 days/week:</strong> £7,200-£11,200/month (£86,000-£134,000/year)</li>
                <li><strong>3 days/week:</strong> £10,800-£16,800/month (£130,000-£202,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CIO total cost: £180,000-£350,000+ (salary + benefits + equity)</p>
            </div>

            <h2 id="types" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Types of IT Leadership Engagement</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Transformation CIO', desc: 'Leading digital transformation and cloud migration', rate: '£1,100-£1,500/day' },
                { title: 'ERP Implementation CIO', desc: 'SAP, Oracle, Microsoft Dynamics projects', rate: '£1,200-£1,600/day' },
                { title: 'IT Operations CIO', desc: 'Optimising IT delivery and reducing costs', rate: '£900-£1,300/day' },
                { title: 'Security-focused CIO', desc: 'Cybersecurity, compliance, risk management', rate: '£1,100-£1,500/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-purple-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Professional Bodies & Certifications</h2>

            <p>
              Many <strong>part-time IT directors</strong> hold certifications from recognized technology and governance bodies. Key organizations include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.bcs.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700">BCS</h4>
                    <p className="text-sm text-gray-600">British Computer Society - Chartered Institute for IT</p>
                  </div>
                </div>
              </a>
              <a href="https://www.isaca.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700">ISACA</h4>
                    <p className="text-sm text-gray-600">CGEIT, CISM certifications for IT governance</p>
                  </div>
                </div>
              </a>
              <a href="https://www.axelos.com/certifications/itil-service-management" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700">ITIL</h4>
                    <p className="text-sm text-gray-600">IT service management framework</p>
                  </div>
                </div>
              </a>
              <a href="https://www.cio.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700">CIO.com</h4>
                    <p className="text-sm text-gray-600">CIO community and resources</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 id="resources" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">External Resources</h2>

            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://www.gartner.com/en/information-technology" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-purple-700">Gartner IT</p>
              </a>
              <a href="https://www.forrester.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-all group text-center">
                <span className="text-xl">📈</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-purple-700">Forrester</p>
              </a>
              <a href="https://www.gov.uk/government/organisations/government-digital-service" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-all group text-center">
                <span className="text-xl">🏢</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-purple-700">GDS</p>
              </a>
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-all group text-center">
                <span className="text-xl">⚖️</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-purple-700">ICO (GDPR)</p>
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
                  <Link href="/hire-fractional-cio" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                    <span>📋</span> How to Hire a CIO
                  </Link>
                  <Link href="/fractional-cio-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                    <span>💰</span> Salary & Day Rates
                  </Link>
                  <Link href="/fractional-cio-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                    <span>💼</span> CIO Jobs UK
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <p className="font-bold text-gray-900 mb-2">Looking for a CIO?</p>
                <p className="text-sm text-gray-600 mb-4">Browse pre-vetted IT leaders</p>
                <Link href="/fractional-cio-jobs-uk" className="block text-center bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-400 transition-colors text-sm">
                  View CIO Jobs
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
          <RoleCalculator role="cio" />
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
          <FAQ items={CIO_FAQS} title="" />
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
            <Link href="/hire-fractional-cio" className="bg-white p-6 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">How to Hire a Fractional CIO</h3>
              <p className="text-gray-600 text-sm">Complete guide to the hiring process, technical assessment, and contract terms</p>
            </Link>
            <Link href="/fractional-cio-jobs-uk" className="bg-white p-6 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Fractional CIO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CIO and IT leadership roles</p>
            </Link>
            <Link href="/fractional-cio-salary" className="bg-white p-6 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Fractional CIO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK day rates, annual earnings, and IR35 considerations</p>
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/part-time-cio-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors group">
              <span className="text-xl mb-2 block">🕐</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">Part-Time CIO Jobs</h4>
              <p className="text-gray-500 text-xs">2-3 days per week</p>
            </Link>
            <Link href="/interim-cio-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors group">
              <span className="text-xl mb-2 block">⏳</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">Interim CIO Jobs</h4>
              <p className="text-gray-500 text-xs">Contract IT roles</p>
            </Link>
            <Link href="/fractional-cto" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors group">
              <span className="text-xl mb-2 block">💻</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">Fractional CTO</h4>
              <p className="text-gray-500 text-xs">Product & engineering</p>
            </Link>
            <Link href="/fractional-jobs-london" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors group">
              <span className="text-xl mb-2 block">🏙️</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">London IT Jobs</h4>
              <p className="text-gray-500 text-xs">London-based roles</p>
            </Link>
          </div>

          {/* Cross-role links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Other Fractional Executive Roles:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fractional-cfo" className="text-sm text-purple-700 hover:underline">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-purple-700 hover:underline">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-purple-700 hover:underline">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-purple-700 hover:underline">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-purple-700 hover:underline">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-purple-700 hover:underline">Fractional CISO</Link>
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
            Browse pre-vetted IT leaders or post your requirements to find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cio-jobs-uk"
              className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors"
            >
              Browse Fractional CIOs
            </Link>
            <Link
              href="/hire-fractional-cio"
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest IT Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time IT opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="IT"
            title="Latest IT Jobs"
            accentColor="purple"
            jobsPerPage={6}
          />
        </div>
      </section>

      <RoleContentHub currentRole="cio" />
    </div>
  )
}
