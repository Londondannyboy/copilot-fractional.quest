'use client'

import { useState, useEffect } from 'react'

// Real Klipy GIF URLs (verified working)
const ONBOARDING_GIFS = {
  welcome: 'https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/9a/fb/DZ2Ib2g1.gif',
  step_complete: 'https://static.klipy.com/ii/50d7c955398dfd7e3c8ba5281154280f/79/6d/dl3FgmslCLcFr3bHDBtQ.gif',
  almost_there: 'https://static.klipy.com/ii/ce286d05b8e1a47cd4f32b0e1b6dec0e/b1/02/K4ZWIqVO.gif',
  celebration: 'https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/d2/27/iQ5M3MEP.gif',
  encouragement: 'https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/29/ef/ttocqdWS.gif',
}

// Simulated "Pydantic-confirmed" state (would come from agent via useCoAgent in real app)
interface OnboardingState {
  current_step: number
  is_complete: boolean
  profile_nodes: Array<{ label: string; type: string; confirmed: boolean }>
}

// Simulated chat messages for each step
const STEP_MESSAGES = [
  {
    step: 1,
    title: 'Welcome',
    gif: ONBOARDING_GIFS.welcome,
    message: "Hey there! 👋 Great to meet you. I'm here to help you find amazing fractional opportunities.\n\nFirst up - what brings you to Fractional Quest today?",
    options: ['Job Search', 'Career Coaching', 'Lifestyle Change', 'Just Curious'],
  },
  {
    step: 2,
    title: 'Employment Status',
    gif: ONBOARDING_GIFS.step_complete,
    message: "Awesome choice! 🎯\n\nNow, what's your current work situation?",
    options: ['Currently Employed', 'Between Roles', 'Freelancing', 'Founder'],
  },
  {
    step: 3,
    title: 'Professional Domain',
    gif: ONBOARDING_GIFS.encouragement,
    message: "You're doing great! 💪\n\nWhat's your professional area of expertise?",
    options: ['Technology', 'Finance', 'Marketing', 'Operations', 'HR/People', 'Product'],
  },
  {
    step: 4,
    title: 'Location',
    gif: ONBOARDING_GIFS.almost_there,
    message: "Almost there! 🏁\n\nWhere are you based, and what's your preferred work style?",
    options: ['London', 'Manchester', 'Remote UK', 'Hybrid'],
  },
  {
    step: 5,
    title: 'Target Role',
    gif: ONBOARDING_GIFS.step_complete,
    message: "Last step! 🚀\n\nWhat role are you targeting?",
    options: ['CTO', 'CFO', 'CMO', 'COO', 'CHRO', 'CPO'],
  },
  {
    step: 6,
    title: 'Complete!',
    gif: ONBOARDING_GIFS.celebration,
    message: "🎉 Amazing! Your profile is all set!\n\nBased on what you've told me, I can now find you the perfect fractional opportunities. Ready to see what's out there?",
    options: ['Show me jobs!', 'View my profile'],
  },
]

// Node type colors for the graph
const NODE_COLORS: Record<string, string> = {
  goal: 'bg-amber-500',
  status: 'bg-blue-500',
  domain: 'bg-purple-500',
  location: 'bg-green-500',
  role: 'bg-red-500',
}

// Map step index to node type
const STEP_NODE_TYPES = ['goal', 'status', 'domain', 'location', 'role', 'complete']

export default function TestOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'assistant' | 'user'; content: string; gif?: string; confirmed?: boolean }>>([])
  const [isVoiceMode, setIsVoiceMode] = useState(false)

  // Simulated Pydantic-confirmed profile nodes (grows as user confirms)
  const [profileNodes, setProfileNodes] = useState<Array<{ label: string; type: string; confirmed: boolean }>>([])

  const currentMessage = STEP_MESSAGES[currentStep]

  const handleSelection = (option: string) => {
    // Add user's selection to chat
    setChatHistory(prev => [
      ...prev,
      { role: 'user', content: option },
    ])

    // Add "Pydantic-confirmed" node to the graph
    const nodeType = STEP_NODE_TYPES[currentStep] || 'goal'
    setProfileNodes(prev => [
      ...prev,
      { label: option, type: nodeType, confirmed: true }
    ])

    // Move to next step after a short delay (simulating agent processing)
    setTimeout(() => {
      if (currentStep < STEP_MESSAGES.length - 1) {
        const nextStep = currentStep + 1
        setCurrentStep(nextStep)

        // Add assistant's next message with confirmation badge
        const nextMessage = STEP_MESSAGES[nextStep]
        setChatHistory(prev => [
          ...prev,
          { role: 'assistant', content: nextMessage.message, gif: nextMessage.gif, confirmed: true },
        ])
      }
    }, 500)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setChatHistory([])
    setProfileNodes([])
  }

  // Initialize first message
  useEffect(() => {
    if (chatHistory.length === 0 && currentMessage) {
      setChatHistory([{ role: 'assistant', content: currentMessage.message, gif: currentMessage.gif }])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-900 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Fractional Quest</h1>
            <p className="text-sm text-white/60">Onboarding Demo with Klipy GIFs</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Voice Mode Toggle */}
            <button
              onClick={() => setIsVoiceMode(!isVoiceMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${
                isVoiceMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {isVoiceMode ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Voice On
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Voice Off
                </>
              )}
            </button>
            <span className="text-sm text-white/60">
              Step {Math.min(currentStep + 1, 5)} of 5
            </span>
            <button
              onClick={resetDemo}
              className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              Reset Demo
            </button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-gray-900 px-6 py-3 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full transition-all ${
                  step <= currentStep
                    ? 'bg-emerald-500'
                    : step === currentStep + 1
                      ? 'bg-white/40'
                      : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-2xl px-5 py-4 ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                {/* GIF */}
                {msg.gif && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={msg.gif}
                      alt="Onboarding GIF"
                      className="rounded-xl max-w-[200px] max-h-[150px] object-cover shadow-lg"
                    />
                  </div>
                )}
                {/* Message text */}
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Options */}
        {currentMessage && currentStep < STEP_MESSAGES.length && (
          <div className="mt-8">
            <p className="text-sm text-white/60 mb-3">Choose an option:</p>
            <div className="flex flex-wrap gap-3">
              {currentMessage.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelection(option)}
                  className="bg-gray-800 hover:bg-gray-700 border border-white/20 hover:border-emerald-500 px-4 py-2.5 rounded-xl transition-all text-sm font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pydantic-Confirmed Profile Graph */}
        {profileNodes.length > 0 && (
          <div className="mt-10 p-6 bg-gray-900 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pydantic-Confirmed Profile Graph</h3>
              <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                Synced with Agent State
              </span>
            </div>

            {/* Visual Graph Representation */}
            <div className="relative">
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {profileNodes.map((_, idx) => {
                  if (idx === 0) return null
                  const prevX = 60 + (idx - 1) * 120
                  const currX = 60 + idx * 120
                  return (
                    <line
                      key={idx}
                      x1={prevX}
                      y1={40}
                      x2={currX}
                      y2={40}
                      stroke="rgba(16, 185, 129, 0.5)"
                      strokeWidth={2}
                      strokeDasharray="4"
                    />
                  )
                })}
              </svg>

              {/* Nodes */}
              <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2" style={{ zIndex: 1, position: 'relative' }}>
                {profileNodes.map((node, idx) => (
                  <div key={idx} className="flex flex-col items-center min-w-[100px]">
                    {/* Node circle */}
                    <div
                      className={`w-12 h-12 rounded-full ${NODE_COLORS[node.type] || 'bg-gray-500'} flex items-center justify-center shadow-lg ring-2 ring-white/20`}
                    >
                      {node.confirmed && (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {/* Node label */}
                    <span className="text-xs text-white/80 mt-2 text-center max-w-[90px] truncate">
                      {node.label}
                    </span>
                    {/* Type badge */}
                    <span className={`text-[10px] ${NODE_COLORS[node.type]?.replace('bg-', 'text-').replace('-500', '-400') || 'text-gray-400'} mt-1 capitalize`}>
                      {node.type}
                    </span>
                  </div>
                ))}

                {/* Placeholder for next step */}
                {currentStep < STEP_MESSAGES.length - 1 && (
                  <div className="flex flex-col items-center min-w-[100px] opacity-40">
                    <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
                      <span className="text-white/50 text-xl">?</span>
                    </div>
                    <span className="text-xs text-white/40 mt-2">Next step...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* GIF showcase */}
        <div className="mt-10 p-6 bg-gray-900 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Klipy GIFs Used in This Demo</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(ONBOARDING_GIFS).map(([name, url]) => (
              <div key={name} className="text-center">
                <img
                  src={url}
                  alt={name}
                  className="rounded-lg w-full h-24 object-cover mb-2"
                />
                <p className="text-xs text-white/60 capitalize">{name.replace('_', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
