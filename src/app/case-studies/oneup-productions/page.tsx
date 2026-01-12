import { Metadata } from 'next'
import Link from 'next/link'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'

export const metadata: Metadata = {
  title: 'OneUp Productions Case Study | Fractional GTM Leadership Success',
  description: 'How fractional GTM leadership helped OneUp Productions expand into 3 new international markets. Real metrics, real results from a gaming & esports company.',
  keywords: ['fractional gtm', 'fractional cmo gaming', 'go to market strategy', 'esports marketing', 'market expansion case study'],
  openGraph: {
    title: 'OneUp Productions Case Study | Fractional GTM Leadership',
    description: 'How fractional GTM leadership helped OneUp Productions expand into 3 new international markets.',
    url: 'https://fractional.quest/case-studies/oneup-productions',
    type: 'article',
  },
}

export default function OneUpCaseStudyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
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
            <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-3xl font-bold">
              1U
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-playfair">OneUp Productions</h1>
              <p className="text-xl text-white/80">Gaming & Esports Production Company</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">3</div>
              <div className="text-sm text-white/80">New Markets Entered</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">2-3</div>
              <div className="text-sm text-white/80">Days Per Week</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">GTM</div>
              <div className="text-sm text-white/80">Strategy Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Badge */}
      <section className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
              Fractional GTM Lead
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              Market Expansion
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
              Gaming Industry
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
              OneUp Productions, a growing gaming and esports production company based in the UK,
              faced a critical juncture. They had established a strong domestic presence but lacked
              the internal expertise and bandwidth to pursue international expansion opportunities.
            </p>
            <p>
              The leadership team recognized they needed senior go-to-market expertise but couldn&apos;t
              justify the cost of a full-time CMO or GTM Director. They needed someone who could hit
              the ground running with proven playbooks for market entry, while being flexible enough
              to work alongside their existing team.
            </p>

            <h2>The Solution: Fractional GTM Leadership</h2>
            <p>
              OneUp engaged a Fractional GTM Lead to develop and execute their international expansion
              strategy. Working 2-3 days per week, the fractional executive brought:
            </p>
            <ul>
              <li><strong>Market Research & Analysis:</strong> Identified three target markets with strong esports ecosystems and growth potential</li>
              <li><strong>Go-to-Market Strategy:</strong> Developed comprehensive market entry plans including partnerships, pricing, and positioning</li>
              <li><strong>Partnership Development:</strong> Established relationships with local gaming organizations and event producers</li>
              <li><strong>Team Mentorship:</strong> Upskilled the internal team on international expansion best practices</li>
            </ul>

            <h2>The Results</h2>
            <p>
              Within 12 months of engagement, OneUp Productions had successfully:
            </p>
            <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
                <div className="text-gray-700 font-medium">New Markets Entered</div>
                <div className="text-sm text-gray-500 mt-2">Germany, France, Nordic region</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5</div>
                <div className="text-gray-700 font-medium">Strategic Partnerships</div>
                <div className="text-sm text-gray-500 mt-2">With major esports orgs</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">40%</div>
                <div className="text-gray-700 font-medium">Revenue Growth</div>
                <div className="text-sm text-gray-500 mt-2">Year-over-year increase</div>
              </div>
            </div>

            <h2>Why Fractional Worked</h2>
            <p>
              The fractional model was ideal for OneUp Productions because:
            </p>
            <ul>
              <li><strong>Cost Efficiency:</strong> They accessed senior GTM expertise at 30-40% of the cost of a full-time hire</li>
              <li><strong>Immediate Impact:</strong> The fractional lead brought proven international expansion playbooks</li>
              <li><strong>Flexibility:</strong> They scaled involvement up or down based on project phases</li>
              <li><strong>Knowledge Transfer:</strong> The internal team gained skills for future expansion</li>
            </ul>

            <blockquote className="bg-gray-50 border-l-4 border-blue-500 pl-6 py-4 my-8 not-prose">
              <p className="text-lg italic text-gray-700">
                &ldquo;As a growing gaming company, we needed GTM expertise but couldn&apos;t justify a full-time hire.
                The fractional model gave us exactly what we needed - senior leadership at a pace and budget that worked for us.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-gray-500">— CEO, OneUp Productions</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-playfair">Ready for Your Own Success Story?</h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you need fractional GTM leadership or another executive role, we can help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fractional-jobs-uk"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Browse Fractional Roles
            </Link>
            <Link
              href="/book-call"
              className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors border border-blue-500"
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
              <p className="text-gray-600">40% campaign ROI increase through digital marketing transformation</p>
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
