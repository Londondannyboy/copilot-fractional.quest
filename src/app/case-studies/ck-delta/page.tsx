import { Metadata } from 'next'
import Link from 'next/link'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'

export const metadata: Metadata = {
  title: 'CK Delta Case Study | Fractional CRO Startup Success',
  description: 'How fractional CRO leadership helped CK Delta achieve £2M ARR and prepare for Series A. Revenue operations case study for high-growth startups.',
  keywords: ['fractional cro', 'startup revenue operations', 'series a preparation', 'saas revenue growth', 'fractional sales leadership'],
  openGraph: {
    title: 'CK Delta Case Study | Fractional CRO Startup Success',
    description: 'How fractional CRO leadership helped CK Delta achieve £2M ARR and prepare for Series A.',
    url: 'https://fractional.quest/case-studies/ck-delta',
    type: 'article',
  },
}

export default function CKDeltaCaseStudyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Case Studies
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
              CKD
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-playfair">CK Delta</h1>
              <p className="text-xl text-white/80">Data & Analytics Startup</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">£2M</div>
              <div className="text-sm text-white/80">ARR Achieved</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">3x</div>
              <div className="text-sm text-white/80">Pipeline Growth</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">60%</div>
              <div className="text-sm text-white/80">Win Rate Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Badge */}
      <section className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">
              Fractional CRO
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
              Revenue Operations
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              Series A Prep
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>The Challenge</h2>
            <p>
              CK Delta, a fast-growing data analytics company, had achieved strong product-market fit
              and was generating revenue. However, their sales process was founder-led and lacked the
              structure needed to scale predictably. With Series A fundraising on the horizon, they
              needed to demonstrate a scalable revenue engine.
            </p>
            <p>
              Key challenges included:
            </p>
            <ul>
              <li>No formal sales process or methodology</li>
              <li>Limited pipeline visibility and forecasting</li>
              <li>CRM usage was inconsistent</li>
              <li>Founder spending 60%+ of time on sales instead of product</li>
            </ul>

            <h2>The Solution: Fractional CRO</h2>
            <p>
              CK Delta engaged a Fractional CRO working 2 days per week to build their revenue
              operations infrastructure. The engagement focused on:
            </p>
            <ul>
              <li><strong>Sales Process Design:</strong> Implemented a structured sales methodology appropriate for their deal size and sales cycle</li>
              <li><strong>CRM Implementation:</strong> Configured HubSpot with proper pipeline stages, automation, and reporting</li>
              <li><strong>Revenue Forecasting:</strong> Built forecasting models that gave leadership and investors confidence in projections</li>
              <li><strong>Team Hiring:</strong> Defined roles and helped hire the first two AEs</li>
            </ul>

            <h2>The Results</h2>
            <p>
              Within 9 months, CK Delta transformed their revenue operations:
            </p>
            <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-emerald-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">£2M</div>
                <div className="text-gray-700 font-medium">ARR Milestone</div>
                <div className="text-sm text-gray-500 mt-2">Ahead of schedule</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">3x</div>
                <div className="text-gray-700 font-medium">Pipeline Growth</div>
                <div className="text-sm text-gray-500 mt-2">Qualified opportunities</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">60%</div>
                <div className="text-gray-700 font-medium">Win Rate</div>
                <div className="text-sm text-gray-500 mt-2">Up from 35%</div>
              </div>
            </div>

            <h2>Series A Readiness</h2>
            <p>
              Beyond the immediate revenue impact, the fractional CRO engagement prepared CK Delta
              for their Series A fundraise:
            </p>
            <ul>
              <li><strong>Investor-Ready Metrics:</strong> Clean data on CAC, LTV, sales cycle, and win rates</li>
              <li><strong>Scalable Playbook:</strong> Documented sales process that new hires could follow</li>
              <li><strong>Forecasting Confidence:</strong> Accurate projections that built investor trust</li>
              <li><strong>Founder Time:</strong> Founder time on sales reduced from 60% to 15%</li>
            </ul>

            <blockquote className="bg-gray-50 border-l-4 border-emerald-500 pl-6 py-4 my-8 not-prose">
              <p className="text-lg italic text-gray-700">
                &ldquo;The fractional CRO model was perfect for our stage. We got the revenue operations
                foundation we needed for Series A without the overhead of a full-time executive.
                Dan helped us hit our ARR targets ahead of schedule.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-gray-500">— Founder, CK Delta</footer>
            </blockquote>

            <h2>Why Fractional CRO for Startups</h2>
            <p>
              Early-stage startups often can&apos;t justify (or afford) a full-time CRO. The fractional
              model delivers:
            </p>
            <ul>
              <li><strong>Right-Sized Investment:</strong> Get CRO expertise at startup budget</li>
              <li><strong>Foundation Building:</strong> Systems and processes that scale</li>
              <li><strong>Faster Time to Value:</strong> No learning curve - immediate impact</li>
              <li><strong>Flexibility:</strong> Scale up as you grow, or hand off to a full-time hire</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-playfair">Ready to Scale Your Revenue Operations?</h2>
          <p className="text-xl text-white/90 mb-8">
            Fractional CROs help startups build scalable revenue engines.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fractional-jobs-uk"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Browse Revenue Roles
            </Link>
            <Link
              href="/book-call"
              className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors border border-emerald-500"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/case-studies/oneup-productions" className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                  1U
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">OneUp Productions</h3>
                  <p className="text-sm text-gray-500">Fractional GTM Lead</p>
                </div>
              </div>
              <p className="text-gray-600">3 new markets entered through strategic GTM leadership</p>
            </Link>
            <Link href="/case-studies/sony-playstation" className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-white font-bold">
                  SONY
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sony PlayStation</h3>
                  <p className="text-sm text-gray-500">Fractional CMO</p>
                </div>
              </div>
              <p className="text-gray-600">40% campaign ROI increase through digital transformation</p>
            </Link>
          </div>
        </div>
      </section>

      <ExpertProfile />
      <ExpertProfileSchema />
    </main>
  )
}
