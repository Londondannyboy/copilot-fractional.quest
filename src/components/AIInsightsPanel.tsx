'use client'

import { useState } from 'react'
import { useCopilotChat } from '@copilotkit/react-core'
import { Role, TextMessage } from '@copilotkit/runtime-client-gql'

interface AIInsightsPanelProps {
  location?: string
  roleType?: string
  initialPrompts?: string[]
}

const DEFAULT_PROMPTS = [
  "What's the market like right now?",
  "Show me salary trends",
  "Compare day rates by role",
  "What skills are most in demand?",
]

export function AIInsightsPanel({
  location = 'UK',
  roleType,
  initialPrompts = DEFAULT_PROMPTS,
}: AIInsightsPanelProps) {
  const [isAsking, setIsAsking] = useState(false)
  const [lastQuestion, setLastQuestion] = useState<string | null>(null)
  const { appendMessage } = useCopilotChat()

  const handleAsk = async (question: string) => {
    setIsAsking(true)
    setLastQuestion(question)

    // Construct contextual question
    const contextualQuestion = roleType
      ? `For ${roleType} roles in ${location}: ${question}`
      : `For fractional executive roles in ${location}: ${question}`

    await appendMessage(new TextMessage({ content: contextualQuestion, role: Role.User }))

    // The response will appear in the CopilotKit sidebar with charts/graphs
    setTimeout(() => setIsAsking(false), 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">AI-Powered Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-playfair">
            Ask Our AI About the {location} Market
          </h2>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Get instant insights, charts, and data about fractional executive opportunities.
            Click a question or ask your own in the chat.
          </p>
        </div>

        {/* Quick question buttons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {initialPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAsk(prompt)}
              disabled={isAsking}
              className={`group relative p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all text-left ${
                isAsking && lastQuestion === prompt ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {i === 0 ? '📊' : i === 1 ? '💰' : i === 2 ? '📈' : '🎯'}
                </span>
                <div>
                  <span className="font-medium text-white group-hover:text-white/90">
                    {prompt}
                  </span>
                  {isAsking && lastQuestion === prompt && (
                    <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating insights...
                    </div>
                  )}
                </div>
              </div>
              <svg className="absolute top-4 right-4 w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          ))}
        </div>

        {/* Visual stats preview */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <div className="text-2xl font-bold">+47%</div>
                <div className="text-indigo-300 text-sm">Market Growth YoY</div>
              </div>
            </div>
            <div className="h-16 flex items-end gap-1">
              {[30, 45, 35, 55, 40, 60, 50, 70, 65, 80, 75, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t opacity-80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <div className="text-2xl font-bold">£1,150</div>
                <div className="text-indigo-300 text-sm">Avg Day Rate</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { role: 'CFO', rate: 1200, pct: 100 },
                { role: 'CTO', rate: 1100, pct: 92 },
                { role: 'CMO', rate: 1000, pct: 83 },
                { role: 'COO', rate: 1050, pct: 88 },
              ].map((item) => (
                <div key={item.role} className="flex items-center gap-2">
                  <span className="text-xs text-indigo-300 w-8">{item.role}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/70">£{item.rate}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <div className="text-2xl font-bold">3,200+</div>
                <div className="text-indigo-300 text-sm">Active Roles</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Finance', pct: 28 },
                { label: 'Tech', pct: 32 },
                { label: 'Marketing', pct: 18 },
                { label: 'Ops', pct: 22 },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-1">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        strokeDasharray={`${item.pct * 1.25} 125`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                      {item.pct}%
                    </span>
                  </div>
                  <span className="text-xs text-indigo-300">{item.label}</span>
                </div>
              ))}
            </div>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <p className="text-center text-indigo-300 text-sm mt-8">
          💡 Click any question above to get detailed AI-generated insights with interactive charts in the sidebar
        </p>
      </div>
    </section>
  )
}
