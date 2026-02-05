import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'

const PROCUREMENT_FAQS = [
  { question: "What is a fractional Procurement Director?", answer: "A fractional Procurement Director is a part-time procurement leader who works with companies on a flexible basis, typically 1-3 days per week. They provide strategic sourcing leadership, supplier management, and cost optimisation without the commitment of a full-time hire." },
  { question: "What does a fractional Procurement Director do?", answer: "Fractional Procurement Directors develop sourcing strategies, manage key supplier relationships, negotiate contracts, implement procurement systems, lead category management initiatives, and drive cost savings across the supply chain. They act as your procurement leader, not just an advisor." },
  { question: "When should I hire a fractional Procurement Director?", answer: "Consider a fractional Procurement Director when: you need senior procurement expertise but can't justify a full-time hire, you're transforming your procurement function, you need to professionalise supplier management, you're preparing for acquisition or investment, or you need interim cover while recruiting." },
  { question: "How much does a fractional Procurement Director cost?", answer: "Fractional Procurement Directors typically charge £800-£1,200 per day in the UK. Working 2 days per week, this equates to £6,400-£9,600 per month, compared to £120,000-£180,000+ total cost for a full-time Procurement Director with benefits." },
  { question: "What's the difference between a fractional Procurement Director and a procurement consultant?", answer: "Procurement consultants advise on specific projects or provide recommendations. Fractional Procurement Directors take ownership - they lead your team, run sourcing events, negotiate contracts, manage suppliers, and are accountable for procurement outcomes. They're embedded in your organisation." },
]

export const metadata: Metadata = {
  title: 'What is a Fractional Procurement Director? | Guide',
  description: 'What is a fractional Procurement Director? A part-time procurement leader for strategic sourcing and supply chain management. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional procurement director, fractional procurement meaning, fractional procurement definition, part time procurement director, fractional head of procurement, fractional supply chain director',
  alternates: { canonical: 'https://fractional.quest/fractional-procurement' },
  openGraph: {
    title: 'What is a Fractional Procurement Director? | Complete Guide',
    description: 'Understand fractional procurement meaning, responsibilities, and costs. Learn when to hire a part-time Procurement Director.',
    url: 'https://fractional.quest/fractional-procurement',
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional Procurement Director', href: '/fractional-procurement' },
]

export default function FractionalProcurementPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="What is a Fractional Procurement Director? | Part-Time Procurement Leadership Guide" description="Complete guide to fractional procurement meaning, responsibilities, costs, and when to hire one." url="https://fractional.quest/fractional-procurement" dateModified={new Date('2026-01-17')} />
      <FAQPageSchema faqs={PROCUREMENT_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" alt="What is a Fractional Procurement Director - Supply Chain Leadership" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 via-cyan-500/80 to-emerald-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Role Guide</span>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">What is a <strong>Fractional Procurement Director</strong>?</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">A <strong>fractional Procurement Director</strong> is a part-time procurement leader who provides strategic sourcing and supply chain leadership to companies on a flexible basis. Learn about <strong>fractional procurement meaning</strong>, responsibilities, and costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal-400 mb-4">Fractional Procurement Director Definition</h2>
            <p className="text-2xl font-light leading-relaxed">A <strong className="font-semibold">Fractional Procurement Director</strong> is an experienced procurement executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic sourcing leadership and supply chain expertise without the cost of a full-time hire.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is Fractional Procurement? Understanding the Role</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>fractional procurement meaning</strong> centres on flexible, senior-level procurement leadership. Unlike traditional full-time Procurement Directors earning £100,000-£160,000 annually, a <strong>fractional Procurement Director</strong> works with multiple companies simultaneously, bringing diverse industry experience and best practices to each engagement.</p>
            <p>This model is especially valuable for mid-market companies transforming their procurement function, businesses professionalising supplier relationships, or organisations needing strategic sourcing expertise without full-time executive overhead.</p>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">What Does a Fractional Procurement Director Do?</h2>
            <p>A <strong>fractional Procurement Director</strong> performs the same functions as a full-time procurement leader, but on a part-time basis:</p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Strategic Sourcing', desc: 'Category strategy development, supplier market analysis, and sourcing execution', icon: '🎯' },
                { title: 'Supplier Management', desc: 'Key supplier relationships, performance management, and supplier development', icon: '🤝' },
                { title: 'Contract Negotiation', desc: 'Commercial negotiations, contract drafting, and terms optimisation', icon: '📋' },
                { title: 'Cost Optimisation', desc: 'Spend analysis, savings identification, and value delivery tracking', icon: '💰' },
                { title: 'Team Development', desc: 'Procurement team building, training, and capability development', icon: '👥' },
                { title: 'Digital Transformation', desc: 'P2P system implementation, e-procurement, and process automation', icon: '💻' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional Procurement Director vs Procurement Consultant</h2>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional Procurement Director</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Procurement Consultant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Accountability</td><td className="px-6 py-4 text-sm text-gray-600">Owns procurement outcomes</td><td className="px-6 py-4 text-sm text-gray-600">Advises on projects</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Team Leadership</td><td className="px-6 py-4 text-sm text-gray-600">Manages procurement team</td><td className="px-6 py-4 text-sm text-gray-600">External to team</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Supplier Relationships</td><td className="px-6 py-4 text-sm text-gray-600">Owns key supplier relationships</td><td className="px-6 py-4 text-sm text-gray-600">Project-based involvement</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Contract Negotiation</td><td className="px-6 py-4 text-sm text-gray-600">Leads negotiations directly</td><td className="px-6 py-4 text-sm text-gray-600">Supports or advises</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td><td className="px-6 py-4 text-sm text-gray-600">Ongoing leadership, transformation</td><td className="px-6 py-4 text-sm text-gray-600">Specific projects, audits</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When Do You Need a Fractional Procurement Director?</h2>
            <ul className="space-y-3">
              <li><strong>Procurement transformation:</strong> Professionalising procurement from reactive to strategic</li>
              <li><strong>Cost reduction pressure:</strong> Need to deliver significant savings quickly</li>
              <li><strong>Supply chain risk:</strong> Building resilience and dual-sourcing strategies</li>
              <li><strong>M&A activity:</strong> Due diligence on supplier contracts and procurement integration</li>
              <li><strong>System implementation:</strong> P2P or e-procurement platform deployment</li>
              <li><strong>Interim cover:</strong> Bridging gap while recruiting permanent Head of Procurement</li>
            </ul>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional Procurement Director Cost UK</h2>
            <p><strong>Fractional Procurement Director</strong> costs in the UK typically range from £800-£1,200 per day:</p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Fractional Procurement Director Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,200-£4,800/month (£38,000-£58,000/year)</li>
                <li><strong>2 days/week:</strong> £6,400-£9,600/month (£77,000-£115,000/year)</li>
                <li><strong>3 days/week:</strong> £9,600-£14,400/month (£115,000-£173,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time Procurement Director total cost: £140,000-£220,000+ (salary + benefits + bonus)</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional Procurement Director Cost Calculator</h2>
          </div>
          <RoleCalculator role="procurement" />
        </div>
      </section>

      {/* Job Board Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Opportunities</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Current Fractional Procurement Jobs</h2>
          </div>
          <EmbeddedJobBoard defaultDepartment="Operations" title="" accentColor="teal" jobsPerPage={6} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions About Fractional Procurement</h2>
          </div>
          <FAQ items={PROCUREMENT_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Link href="/fractional-procurement-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">Fractional Procurement Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional procurement roles</p>
            </Link>
            <Link href="/fractional-procurement-services" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-2xl mb-3 block">🎯</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">Fractional Procurement Services</h3>
              <p className="text-gray-600 text-sm">Our procurement leadership services</p>
            </Link>
            <Link href="/hire-fractional-procurement" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">How to Hire a Fractional Procurement Director</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide and evaluation</p>
            </Link>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">External Resources for Procurement Professionals</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.cips.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-lg">📚</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">CIPS</h4>
                <p className="text-gray-500 text-xs">Chartered Institute of Procurement & Supply</p>
              </div>
            </a>
            <a href="https://www.procurementleaders.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-lg">🌐</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">Procurement Leaders</h4>
                <p className="text-gray-500 text-xs">Global procurement community</p>
              </div>
            </a>
            <a href="https://www.makeuk.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-lg">🏭</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">Make UK</h4>
                <p className="text-gray-500 text-xs">Manufacturing and supply chain body</p>
              </div>
            </a>
            <a href="https://rfp.quest" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-lg">📋</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">RFP Platform</h4>
                <p className="text-gray-500 text-xs">AI-powered RFP and tender management</p>
              </div>
            </a>
            <a href="https://rfp.quest/rfp-software" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-lg">💻</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">RFP Software</h4>
                <p className="text-gray-500 text-xs">Proposal management tools for UK businesses</p>
              </div>
            </a>
            <Link href="/fractional-jobs-uk?department=Operations" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-lg">🔍</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">All Operations Jobs</h4>
                <p className="text-gray-500 text-xs">Search all fractional operations positions</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* E-E-A-T: Expert Profile */}
      <ExpertProfile />
      <ExpertProfileSchema />

      {/* E-E-A-T: Case Study */}
      <CaseStudy />
      <CaseStudySchema />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Work with a Fractional Procurement Director?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional Procurement Directors or post your requirements to find the perfect match.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-procurement-jobs-uk" className="px-8 py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-400 transition-colors">Browse Fractional Procurement Directors</Link>
            <Link href="/fractional-jobs-london" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">London Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
