'use client'

// React hooks available if needed for future enhancements
import { CopilotSidebar, CopilotChat } from '@copilotkit/react-ui'
import { useCopilotChatSuggestions } from '@copilotkit/react-ui'
import '@copilotkit/react-ui/styles.css'
import { CopilotProvider } from '@/components/CopilotProvider'
import { authClient } from '@/lib/auth/client'

import { IntelligentDocument } from '@/components/mdx/IntelligentDocument'
import {
  PersonalizedGreeting,
  LiveMarketChart,
  LiveJobGrid,
  ActiveFilters,
  DocumentSection,
} from '@/components/mdx/LiveComponents'

/**
 * INTELLIGENT DOCUMENT DEMO
 *
 * This page demonstrates the Medium article's vision:
 * "The document thinks" - CopilotKit is embedded IN the content,
 * not just a sidebar. The page itself responds to conversation.
 *
 * Key insight: We define useCopilotAction hooks that modify PAGE STATE,
 * and the agent's instructions tell it to prefer these actions over
 * its standard tools when on this page.
 */

// Inline chat component for in-content conversation
function InlineDocumentChat() {
  // Add suggested prompts
  useCopilotChatSuggestions({
    instructions: "Suggest 3 ways to explore this CFO jobs page",
    maxSuggestions: 3,
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <span>💬</span> Ask About This Page
        </h3>
      </div>
      <div className="h-[300px]">
        <CopilotChat
          labels={{
            initial: "Ask me anything about CFO jobs, salaries, or the market. I can filter the page content for you!",
          }}
          className="h-full"
        />
      </div>
    </div>
  )
}

// Outer component that provides CopilotKit context
export default function IntelligentCFOPage() {
  return (
    <CopilotProvider>
      <IntelligentCFOPageInner />
    </CopilotProvider>
  )
}

// Inner component with CopilotKit hooks
function IntelligentCFOPageInner() {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const firstName = user?.name?.split(' ')[0]

  // Instructions that tell the agent to use PAGE ACTIONS not its standard tools
  const pageInstructions = `
## INTELLIGENT DOCUMENT MODE - CFO Jobs Page

You are helping the user explore an INTELLIGENT DOCUMENT about Fractional CFO jobs.

CRITICAL: This page has special actions that UPDATE THE PAGE CONTENT directly:

1. **update_document_filters** - Use this to filter jobs/data shown on the page
   - location: "London", "Manchester", "Remote", etc.
   - role: "Finance", "Engineering", "Marketing" (changes job category)
   - remote: true/false (show only remote jobs)
   - minRate, maxRate: day rate filters

2. **highlight_section** - Use this to visually focus on a section
   - section: "salary", "jobs", "market", "skills"

3. **clear_highlights** - Remove all highlights

WHEN USER ASKS ABOUT JOBS OR FILTERING:
- Use update_document_filters to change what the PAGE shows
- Do NOT use search_jobs (that shows results in sidebar only)
- The page content will update in real-time

EXAMPLES:
- "Show me remote jobs" → call update_document_filters with remote=true
- "Filter to London" → call update_document_filters with location="London"
- "Show CTO jobs" → call update_document_filters with role="Engineering"
- "Focus on salary" → call highlight_section with section="salary"

${user ? `User: ${firstName} (${user.email})` : 'User: Not logged in'}
`

  return (
    <CopilotSidebar
        defaultOpen={false}
        clickOutsideToClose={true}
        instructions={pageInstructions}
        labels={{
          title: "Document Assistant",
          initial: "I can help you explore this page. The content updates based on our conversation!\n\nTry the inline chat below, or ask me here.",
        }}
      >
        <IntelligentDocument
          pageContext="Fractional CFO Jobs in the UK - A living document about CFO opportunities"
          initialFilters={{ role: 'Finance', location: '' }}
        >
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
                  Say <span className="font-medium text-emerald-600">"focus on salary"</span> to highlight this section.
                </p>
                <LiveMarketChart type="bar" />
              </DocumentSection>

              {/* Jobs Section - Filters update via conversation */}
              <DocumentSection id="jobs" title="Available Opportunities">
                <p className="text-gray-600 mb-6">
                  Live job listings from our database. Try saying{' '}
                  <span className="font-medium text-emerald-600">"show me remote jobs"</span> or{' '}
                  <span className="font-medium text-emerald-600">"filter to Manchester"</span>.
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
                          <span className="font-medium text-emerald-600">78%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">AI/Automation Skills</span>
                          <span className="font-medium text-emerald-600">65%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '65%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">ESG Reporting</span>
                          <span className="font-medium text-emerald-600">52%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '52%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DocumentSection>

              {/* INLINE CHAT - The key to "document thinks" */}
              <section className="mt-8 mb-12">
                <InlineDocumentChat />
              </section>

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
        </IntelligentDocument>
      </CopilotSidebar>
  )
}
