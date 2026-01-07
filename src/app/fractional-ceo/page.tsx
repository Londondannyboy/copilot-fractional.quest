import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CEO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'

export const metadata: Metadata = {
  title: 'What is a Fractional CEO? | Part-Time Chief Executive Officer Guide 2025',
  description: 'What is a fractional CEO? A part-time Chief Executive Officer who provides strategic executive leadership to multiple companies. Learn about fractional CEO meaning, responsibilities, costs, and when to hire one.',
  keywords: 'what is a fractional ceo, fractional ceo meaning, fractional ceo definition, part time ceo, interim ceo, fractional chief executive, what does a fractional ceo do',
  alternates: { canonical: 'https://fractional.quest/fractional-ceo' },
  openGraph: {
    title: 'What is a Fractional CEO? | Complete Guide',
    description: 'Understand fractional CEO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Executive Officer.',
    url: 'https://fractional.quest/fractional-ceo',
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CEO', href: '/fractional-ceo' },
]

export default function FractionalCeoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="What is a Fractional CEO? | Part-Time Chief Executive Officer Guide" description="Complete guide to fractional CEO meaning, responsibilities, costs, and when to hire one." url="https://fractional.quest/fractional-ceo" dateModified={new Date('2025-01-07')} />
      <FAQPageSchema faqs={CEO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80" alt="What is a Fractional CEO - Part-time Chief Executive" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 via-amber-500/80 to-orange-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Role Guide</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">What is a <strong>Fractional CEO</strong>?</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">A <strong>fractional CEO</strong> is a part-time Chief Executive Officer who provides strategic executive leadership to companies on a flexible basis. Learn about <strong>fractional CEO meaning</strong>, responsibilities, and costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-400 mb-4">Fractional CEO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">A <strong className="font-semibold">Fractional CEO</strong> (Fractional Chief Executive Officer) is an experienced executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic leadership and operational oversight without the cost of a full-time hire.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional CEO? Understanding the Role</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>fractional CEO meaning</strong> centres on flexible, senior executive leadership. Unlike traditional full-time CEOs or interim CEOs on fixed contracts, a <strong>fractional Chief Executive</strong> works with multiple companies simultaneously, bringing diverse experience and fresh perspectives to each engagement.</p>
            <p>This model is particularly valuable for founder-led companies that need experienced executive guidance, portfolio companies requiring operational leadership, or businesses in transition seeking temporary C-suite expertise.</p>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">What Does a Fractional CEO Do?</h2>
            <p>A <strong>fractional CEO</strong> performs strategic and operational leadership functions on a part-time basis:</p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Strategic Leadership', desc: 'Setting company direction, vision, and strategic priorities', icon: '🎯' },
                { title: 'Board Management', desc: 'Managing board relations, investor communications, and governance', icon: '📋' },
                { title: 'Executive Team', desc: 'Building, mentoring, and leading the senior leadership team', icon: '👥' },
                { title: 'Operational Oversight', desc: 'Ensuring efficient operations and business performance', icon: '⚙️' },
                { title: 'Stakeholder Relations', desc: 'Managing relationships with investors, partners, and key customers', icon: '🤝' },
                { title: 'Transition Management', desc: 'Guiding companies through M&A, turnarounds, or founder transitions', icon: '🔄' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CEO vs Interim CEO</h2>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CEO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Interim CEO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td><td className="px-6 py-4 text-sm text-gray-600">1-3 days/week, ongoing</td><td className="px-6 py-4 text-sm text-gray-600">Full-time, fixed term (3-12 months)</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Typical Cost</td><td className="px-6 py-4 text-sm text-gray-600">£60,000-£150,000/year</td><td className="px-6 py-4 text-sm text-gray-600">£200,000-£400,000/year</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Client Count</td><td className="px-6 py-4 text-sm text-gray-600">2-4 clients simultaneously</td><td className="px-6 py-4 text-sm text-gray-600">One client exclusively</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td><td className="px-6 py-4 text-sm text-gray-600">Scale up/down as needed</td><td className="px-6 py-4 text-sm text-gray-600">Fixed contract duration</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td><td className="px-6 py-4 text-sm text-gray-600">Founder support, portfolio companies</td><td className="px-6 py-4 text-sm text-gray-600">Turnarounds, CEO search periods</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When Do You Need a Fractional CEO?</h2>
            <ul className="space-y-3">
              <li><strong>Founder growth:</strong> When a founder needs experienced executive mentorship alongside their own leadership</li>
              <li><strong>Portfolio oversight:</strong> PE/VC firms needing operational leadership across portfolio companies</li>
              <li><strong>Transition support:</strong> During leadership transitions or succession planning</li>
              <li><strong>Board requirement:</strong> When boards want executive oversight without full-time cost</li>
              <li><strong>Scale preparation:</strong> Preparing company systems and processes for growth</li>
              <li><strong>Specific initiatives:</strong> Exit preparation, fundraising, or market expansion</li>
            </ul>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CEO Cost UK</h2>
            <p><strong>Fractional CEO</strong> costs in the UK typically range from £1,000-£2,000 per day:</p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Fractional CEO Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £4,000-£8,000/month (£48,000-£96,000/year)</li>
                <li><strong>2 days/week:</strong> £8,000-£16,000/month (£96,000-£192,000/year)</li>
                <li><strong>3 days/week:</strong> £12,000-£24,000/month (£144,000-£288,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CEO total cost: £250,000-£500,000+ (salary + benefits + equity)</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CEO Cost Calculator</h2>
          </div>
          <RoleCalculator role="ceo" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions About Fractional CEOs</h2>
          </div>
          <FAQ items={CEO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/fractional-ceo-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 mb-2">Fractional CEO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CEO and executive roles</p>
            </Link>
            <Link href="/fractional-jobs-uk?department=Executive" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors group">
              <span className="text-2xl mb-3 block">🔍</span>
              <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 mb-2">All Executive Jobs</h3>
              <p className="text-gray-600 text-sm">Search all fractional executive positions</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Work with a Fractional CEO?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CEO candidates or post your requirements to find the perfect match.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-ceo-jobs-uk" className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">Browse Fractional CEOs</Link>
            <Link href="/fractional-jobs-uk?department=Executive" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">All Executive Jobs</Link>
          </div>
        </div>
      </section>

      <RoleContentHub currentRole="ceo" />
    </div>
  )
}
