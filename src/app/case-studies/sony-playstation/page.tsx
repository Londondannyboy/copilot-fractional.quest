import { Metadata } from 'next'
import Link from 'next/link'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'

export const metadata: Metadata = {
  title: 'Sony PlayStation Case Study | Fractional CMO Enterprise Success',
  description: 'How fractional CMO leadership delivered 40% campaign ROI increase for Sony PlayStation Europe. Enterprise digital marketing transformation case study.',
  keywords: ['fractional cmo enterprise', 'sony playstation marketing', 'digital marketing transformation', 'enterprise marketing case study'],
  openGraph: {
    title: 'Sony PlayStation Case Study | Fractional CMO Enterprise Success',
    description: 'How fractional CMO leadership delivered 40% campaign ROI increase for Sony PlayStation Europe.',
    url: 'https://fractional.quest/case-studies/sony-playstation',
    type: 'article',
  },
}

export default function SonyCaseStudyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-20">
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
            <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center text-2xl font-bold">
              SONY
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-playfair">Sony PlayStation</h1>
              <p className="text-xl text-white/80">Gaming & Entertainment - Europe</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">40%</div>
              <div className="text-sm text-white/80">Campaign ROI Increase</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm text-white/80">Month Engagement</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm text-white/80">Team Members Mentored</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Badge */}
      <section className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
              Fractional CMO
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              Digital Marketing
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
              Enterprise
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
              Sony PlayStation&apos;s European marketing team was preparing for a major product launch cycle.
              While the team had strong execution capabilities, they needed senior strategic leadership
              to guide their digital transformation and optimize campaign performance across multiple
              European markets.
            </p>
            <p>
              The regional team required:
            </p>
            <ul>
              <li>Strategic guidance on digital channel optimization</li>
              <li>Campaign performance analysis and improvement recommendations</li>
              <li>Team mentorship and capability building</li>
              <li>Cross-market coordination for consistent messaging</li>
            </ul>

            <h2>The Solution: Fractional CMO Leadership</h2>
            <p>
              Sony engaged a Fractional CMO to provide strategic marketing leadership over a 6-month
              period. The engagement focused on:
            </p>
            <ul>
              <li><strong>Digital Strategy Overhaul:</strong> Comprehensive audit and optimization of digital marketing channels</li>
              <li><strong>Campaign Optimization:</strong> Data-driven approach to improving campaign ROI across paid, owned, and earned media</li>
              <li><strong>Team Development:</strong> Mentored 12 team members on modern marketing practices and analytics</li>
              <li><strong>Process Improvement:</strong> Implemented new workflows for campaign planning and execution</li>
            </ul>

            <h2>The Results</h2>
            <p>
              The fractional CMO engagement delivered measurable impact:
            </p>
            <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">40%</div>
                <div className="text-gray-700 font-medium">ROI Increase</div>
                <div className="text-sm text-gray-500 mt-2">On digital campaigns</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">12</div>
                <div className="text-gray-700 font-medium">Team Members</div>
                <div className="text-sm text-gray-500 mt-2">Upskilled and mentored</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">5</div>
                <div className="text-gray-700 font-medium">Markets</div>
                <div className="text-sm text-gray-500 mt-2">Campaign coordination</div>
              </div>
            </div>

            <h2>Why Fractional Worked for Enterprise</h2>
            <p>
              Even for a global enterprise like Sony, the fractional model provided unique value:
            </p>
            <ul>
              <li><strong>Fresh Perspective:</strong> External expertise brought new ideas without internal politics</li>
              <li><strong>Rapid Deployment:</strong> No lengthy hiring process - started delivering value immediately</li>
              <li><strong>Defined Scope:</strong> Clear objectives with measurable outcomes</li>
              <li><strong>Knowledge Transfer:</strong> Left the team with improved capabilities after engagement</li>
            </ul>

            <blockquote className="bg-gray-50 border-l-4 border-gray-500 pl-6 py-4 my-8 not-prose">
              <p className="text-lg italic text-gray-700">
                &ldquo;Working with Dan as our Fractional CMO was transformative. He brought enterprise-level
                strategic thinking while being flexible enough to adapt to our regional needs.
                The team&apos;s capabilities improved significantly.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-gray-500">— Marketing Director, Sony PlayStation Europe</footer>
            </blockquote>

            <h2>Key Learnings</h2>
            <p>
              This engagement demonstrated that fractional executives can deliver value at any company size.
              The key success factors were:
            </p>
            <ol>
              <li>Clear scope and objectives from the outset</li>
              <li>Strong sponsorship from regional leadership</li>
              <li>Focus on knowledge transfer, not just delivery</li>
              <li>Regular check-ins and course corrections</li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-playfair">Need Enterprise-Level Marketing Leadership?</h2>
          <p className="text-xl text-white/90 mb-8">
            Fractional CMOs bring Fortune 500 experience to your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fractional-cmo-jobs-uk"
              className="px-8 py-4 bg-white text-gray-800 font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Browse CMO Roles
            </Link>
            <Link
              href="/hire-fractional-cmo"
              className="px-8 py-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-colors border border-gray-600"
            >
              Hire a Fractional CMO
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
            <Link href="/case-studies/ck-delta" className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold">
                  CKD
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">CK Delta</h3>
                  <p className="text-sm text-gray-500">Fractional CRO</p>
                </div>
              </div>
              <p className="text-gray-600">£2M ARR milestone achieved with fractional revenue operations</p>
            </Link>
          </div>
        </div>
      </section>

      <ExpertProfile />
      <ExpertProfileSchema />
    </main>
  )
}
