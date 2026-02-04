'use client'

import { authClient } from '@/lib/auth/client'
import { PersonalizedGreeting, LiveMarketChart, LiveJobGrid, ActiveFilters, DocumentSection } from '@/components/mdx/LiveComponents'

export default function IntelligentCFOPage() {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const firstName = user?.name?.split(' ')[0]

  return (
    <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-16">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    INTELLIGENT DOCUMENT
                  </span>
                  <span className="bg-emerald-500/30 text-emerald-100 text-xs px-3 py-1 rounded-full">
                    MDX + CopilotKit Demo
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Fractional CFO Jobs UK
                </h1>
                <p className="text-xl text-white/80 max-w-2xl">
                  This page <strong>thinks</strong>. Ask the assistant to filter jobs,
                  highlight sections, or change the focus. The content updates in real-time.
                </p>
              </div>
            </section>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
              {/* Personalized Greeting - uses real user data */}
              <PersonalizedGreeting
                userName={firstName}
                userRole="CFO"
                userLocation={undefined} // Could pull from profile
              />

              {/* Active Filters - Shows when conversation changes filters */}
              <ActiveFilters />

              {/* Salary Section - Can be highlighted via conversation */}
              <DocumentSection id="salary" title="Market Rates">
                <p className="text-gray-600 mb-6">
                  Current day rates for fractional finance executives in the UK market.
                  Say <span className="font-medium text-emerald-700">"focus on salary"</span> to highlight this section.
                </p>
                <LiveMarketChart type="bar" />
              </DocumentSection>

              {/* Jobs Section - Filters update via conversation */}
              <DocumentSection id="jobs" title="Available Opportunities">
                <p className="text-gray-600 mb-6">
                  Live job listings from our database. Try saying{' '}
                  <span className="font-medium text-emerald-700">"show me remote jobs"</span> or{' '}
                  <span className="font-medium text-emerald-700">"filter to Manchester"</span>.
                </p>
                <LiveJobGrid limit={6} />
              </DocumentSection>

              {/* Market Section */}
              <DocumentSection id="market" title="Market Insights">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-3">Why Fractional CFOs?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      The UK fractional executive market has grown 340% since 2020.
                      Companies increasingly prefer flexible finance leadership that
                      scales with their needs, particularly in:
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500">+</span>
                        Series A-C funded startups
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500">+</span>
                        PE-backed portfolio companies
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500">+</span>
                        SMEs preparing for exit
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-3">2026 Trends</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Remote Work</span>
                          <span className="font-medium text-emerald-700">78%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">AI/Automation Skills</span>
                          <span className="font-medium text-emerald-700">65%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '65%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">ESG Reporting</span>
                          <span className="font-medium text-emerald-700">52%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '52%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DocumentSection>


              {/* How It Works */}
              <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How This Page Works
                </h2>
                <p className="text-gray-600 mb-6">
                  This is a demonstration of <strong>Intelligent Documents</strong> - where
                  MDX content and CopilotKit are unified. The page isn't just displaying
                  static content; it's listening to your conversation and updating accordingly.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl mb-2">1</div>
                    <h4 className="font-semibold text-gray-900 mb-1">You Speak</h4>
                    <p className="text-sm text-gray-600">
                      Ask the assistant to filter, highlight, or change the view
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl mb-2">2</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Agent Acts</h4>
                    <p className="text-sm text-gray-600">
                      CopilotKit actions update the document's shared state
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl mb-2">3</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Page Updates</h4>
                    <p className="text-sm text-gray-600">
                      Components re-render with new filters, highlights, data
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Try these commands:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      "Show me remote jobs only"
                    </code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      "Filter to Manchester"
                    </code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      "Focus on the salary section"
                    </code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      "Show me CTO jobs"
                    </code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      "Clear all filters"
                    </code>
                  </div>
                </div>
              </section>
            </div>
          </main>
    )
}
