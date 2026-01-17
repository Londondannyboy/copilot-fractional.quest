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
  title: 'How to Hire a Fractional Procurement Director UK | Hiring Guide',
  description: 'Complete guide to hiring a fractional Procurement Director in the UK. What to look for, interview questions, costs, and red flags. Expert hiring advice.',
  keywords: 'hire fractional procurement director, hire part time procurement director, fractional procurement director uk, hiring procurement director, fractional head of procurement recruitment',
  alternates: { canonical: 'https://fractional.quest/hire-fractional-procurement' },
  openGraph: {
    title: 'How to Hire a Fractional Procurement Director UK | Complete Guide',
    description: 'Expert guide to finding and hiring the right fractional Procurement Director for your organisation.',
    url: 'https://fractional.quest/hire-fractional-procurement',
  },
}

const HIRE_FAQS = [
  { question: "What should I look for in a fractional Procurement Director?", answer: "Key qualities include: MCIPS qualification or equivalent, 10-15+ years procurement experience, proven track record of savings delivery, industry-relevant experience, strong negotiation skills, and experience managing procurement teams. Look for someone who can demonstrate measurable outcomes from previous roles." },
  { question: "How long does it take to hire a fractional Procurement Director?", answer: "Typically 2-4 weeks from initial brief to start date. The process includes: defining requirements (1 week), candidate search and screening (1-2 weeks), interviews (1 week), and contracting (a few days). For urgent needs, we can often accelerate this to under 2 weeks." },
  { question: "What's the typical contract structure?", answer: "Most fractional procurement engagements are retained arrangements with a minimum commitment of 3-6 months. Typical terms include: fixed days per week (1-3), monthly invoicing, 30-day notice period after initial term, and clear deliverables/KPIs. Some arrangements include performance-linked bonuses tied to savings delivery." },
  { question: "How do I evaluate procurement candidates?", answer: "Focus on: specific savings examples with quantified results, category expertise relevant to your spend, references from similar-sized organisations, approach to supplier relationship management, and how they'd handle your top 3 procurement challenges. Ask for a procurement audit proposal to assess their analytical approach." },
  { question: "Should I choose industry-specific experience?", answer: "Industry experience helps but isn't always essential. Category expertise (e.g., IT, facilities, raw materials) often matters more. A Procurement Director from retail can transform manufacturing procurement if they have relevant category experience. Focus on transferable skills and strategic thinking ability." },
]

const HIRING_STEPS = [
  { step: 1, title: 'Define Requirements', description: 'Clarify what you need: key categories to address, savings targets, team situation, and days per week required', duration: '1 week' },
  { step: 2, title: 'Candidate Search', description: 'We identify qualified Procurement Directors with relevant experience, MCIPS credentials, and proven track records', duration: '1-2 weeks' },
  { step: 3, title: 'Initial Interviews', description: 'Screen candidates for strategic fit, category expertise, and cultural alignment with your organisation', duration: '1 week' },
  { step: 4, title: 'Deep-Dive Assessment', description: 'Request a procurement audit proposal, check references, and assess specific savings opportunities', duration: '3-5 days' },
  { step: 5, title: 'Contract & Onboard', description: 'Finalise terms, set KPIs, and begin with supplier landscape review and quick-win identification', duration: '3-5 days' },
]

const EVALUATION_CRITERIA = [
  { criteria: 'MCIPS Qualification', weight: 'High', why: 'Professional recognition and ongoing CPD commitment' },
  { criteria: 'Savings Track Record', weight: 'Critical', why: 'Quantified savings from previous roles demonstrates capability' },
  { criteria: 'Category Expertise', weight: 'High', why: 'Relevant category experience accelerates impact' },
  { criteria: 'Team Leadership', weight: 'Medium', why: 'Important if you have a procurement team to manage' },
  { criteria: 'System Experience', weight: 'Medium', why: 'P2P and e-sourcing tool experience if transformation planned' },
  { criteria: 'Industry Experience', weight: 'Medium', why: 'Helpful but not essential - transferable skills matter more' },
]

const RED_FLAGS = [
  { flag: 'No quantified savings', explanation: "If they can't cite specific savings figures from previous roles, question their impact" },
  { flag: 'Pure consulting background', explanation: 'Consultants advise; you need someone who owns outcomes and leads teams' },
  { flag: 'No supplier references', explanation: 'Strong procurement leaders have suppliers who will vouch for their professionalism' },
  { flag: 'Unclear on your categories', explanation: "If they can't quickly identify key opportunities in your spend, they may lack strategic thinking" },
  { flag: 'Overcommitted to other clients', explanation: 'More than 3-4 clients suggests stretched attention and availability issues' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Hire', href: '/fractional-jobs-uk' }, { label: 'Hire Fractional Procurement Director', href: '/hire-fractional-procurement' }]

export default function HireFractionalProcurementPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="How to Hire a Fractional Procurement Director UK | Complete Guide" description="Expert guide to finding and hiring the right fractional Procurement Director." url="https://fractional.quest/hire-fractional-procurement" dateModified={new Date('2026-01-17')} />
      <FAQPageSchema faqs={HIRE_FAQS} />

      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" alt="Hire a Fractional Procurement Director" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/90 to-cyan-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Hiring Guide</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">How to Hire a Fractional Procurement Director</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Complete guide to finding, evaluating, and hiring the right <strong>fractional Procurement Director</strong> for your organisation. What to look for, questions to ask, and red flags to avoid.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-procurement-jobs-uk" className="px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition-colors">Browse Procurement Directors</Link>
                <Link href="/fractional-procurement-services" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Our Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">The Hiring Process</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Typical timeline: 2-4 weeks from brief to start</p>
          </div>
          <div className="space-y-6">
            {HIRING_STEPS.map((step) => (
              <div key={step.step} className="flex gap-6 items-start p-6 border rounded-xl hover:border-teal-300 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-black text-xl">{step.step}</div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <span className="text-sm text-teal-600 font-semibold">{step.duration}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Evaluation</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What to Look For</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Criteria</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Importance</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {EVALUATION_CRITERIA.map((item) => (
                  <tr key={item.criteria} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.criteria}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.weight === 'Critical' ? 'bg-red-100 text-red-700' :
                        item.weight === 'High' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{item.weight}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Warning Signs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Red Flags to Watch For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RED_FLAGS.map((item) => (
              <div key={item.flag} className="p-6 border border-red-200 rounded-xl bg-red-50/50">
                <div className="text-red-500 text-2xl mb-3">⚠️</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.flag}</h3>
                <p className="text-gray-600 text-sm">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Candidates</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Available Fractional Procurement Directors</h2>
          </div>
          <EmbeddedJobBoard defaultDepartment="Operations" title="" accentColor="teal" jobsPerPage={6} />
        </div>
      </section>

      {/* Interview Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Key Interview Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "What's the largest procurement savings you've delivered and how?", why: "Tests quantifiable impact and strategic approach" },
              { q: "How would you approach our top 3 spend categories?", why: "Assesses strategic thinking and category knowledge" },
              { q: "Describe a difficult supplier negotiation and how you handled it", why: "Reveals negotiation style and relationship skills" },
              { q: "How do you balance cost savings with supplier relationships?", why: "Shows understanding of long-term value vs short-term gains" },
              { q: "What procurement systems have you implemented?", why: "Assesses digital transformation capability" },
              { q: "How do you prioritise when everything seems urgent?", why: "Tests practical experience managing competing demands" },
            ].map((item, i) => (
              <div key={i} className="p-6 border rounded-xl hover:border-teal-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">&quot;{item.q}&quot;</h4>
                <p className="text-gray-600 text-sm"><strong>Why ask:</strong> {item.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/fractional-procurement-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">Procurement Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse available roles</p>
            </Link>
            <Link href="/fractional-procurement" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-2xl mb-3 block">📖</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">What is Fractional Procurement?</h3>
              <p className="text-gray-600 text-sm">Understand the role</p>
            </Link>
            <Link href="/fractional-procurement-services" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-2xl mb-3 block">🎯</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">Our Services</h3>
              <p className="text-gray-600 text-sm">What we deliver</p>
            </Link>
            <Link href="/fractional-jobs-london" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
              <span className="text-2xl mb-3 block">🏙️</span>
              <h3 className="font-bold text-gray-900 group-hover:text-teal-700 mb-2">London Jobs</h3>
              <p className="text-gray-600 text-sm">Top UK market</p>
            </Link>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">External Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="https://www.cips.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
                <span className="text-lg">📚</span>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">CIPS</h4>
                  <p className="text-gray-500 text-xs">Verify MCIPS qualifications</p>
                </div>
              </a>
              <a href="https://www.procurementleaders.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group">
                <span className="text-lg">🌐</span>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 text-sm">Procurement Leaders</h4>
                  <p className="text-gray-500 text-xs">Industry benchmarks and insights</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Hiring Questions</h2></div><FAQ items={HIRE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Hire a Fractional Procurement Director?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">We help you find the right procurement leader for your organisation. Pre-vetted, MCIPS-qualified candidates with proven track records.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-procurement-jobs-uk" className="px-8 py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-400 transition-colors">Browse Candidates</Link>
            <Link href="/book-call" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">Book a Call</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
