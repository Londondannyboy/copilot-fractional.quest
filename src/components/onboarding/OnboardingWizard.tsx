'use client'

import { CopilotChat, ComponentsMap } from '@copilotkit/react-ui'
import { useCoAgent, useCoAgentStateRender } from '@copilotkit/react-core'
import { OnboardingProgress } from './OnboardingProgress'
import { ProfilePreview } from './ProfilePreview'
import { VoiceInput } from '@/components/voice-input'
import { UserButton } from '@neondatabase/auth/react/ui'

// Agent state type - matches Pydantic AI AppState.onboarding
interface OnboardingState {
  current_step: number
  is_complete: boolean
  trinity: string | null
  employment_status: string | null
  professional_vertical: string | null
  location: string | null
  role_preference: string | null
  experience_level: string | null
  profile_nodes: Array<{ label: string; type: string; confirmed: boolean }>
}

interface AgentState {
  onboarding: OnboardingState
}

// GIF component for rendering Klipy GIFs in chat messages
function GifMessage({ src, alt }: { src?: string; alt?: string; children?: React.ReactNode }) {
  if (!src) return null
  return (
    <div className="my-3 flex justify-center">
      <img
        src={src}
        alt={alt || 'GIF'}
        className="rounded-xl max-w-[240px] max-h-[180px] object-cover shadow-lg"
        loading="lazy"
      />
    </div>
  )
}

// Custom markdown tag renderers for CopilotChat
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gifMarkdownRenderer: ComponentsMap<any> = {
  gif: GifMessage,
}

interface ProfileItem {
  id: number
  item_type: string
  value: string
  metadata?: Record<string, unknown>
  confirmed?: boolean
}

interface OnboardingWizardProps {
  userId: string
  userName: string
  profileItems: ProfileItem[]
  currentStep: number
  onVoiceMessage: (text: string, role?: "user" | "assistant") => void
}

// Real Klipy GIF URLs for different onboarding moments (verified working)
const ONBOARDING_GIFS = {
  welcome: 'https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/9a/fb/DZ2Ib2g1.gif',
  step_complete: 'https://static.klipy.com/ii/50d7c955398dfd7e3c8ba5281154280f/79/6d/dl3FgmslCLcFr3bHDBtQ.gif',
  almost_there: 'https://static.klipy.com/ii/ce286d05b8e1a47cd4f32b0e1b6dec0e/b1/02/K4ZWIqVO.gif',
  celebration: 'https://static.klipy.com/ii/935d7ab9d8c6202580a668421940ec81/d2/27/iQ5M3MEP.gif',
  encouragement: 'https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/29/ef/ttocqdWS.gif',
}

// Step-specific agent instructions
function getStepInstructions(step: number, userName: string): string {
  const stepPrompts: Record<number, string> = {
    1: `
## STEP 1: Understanding Their Goals

${userName} just arrived! Make them feel welcome and find out why they're here.

YOUR TASK: Call the confirm_trinity HITL tool with these options:
- Job Search: "I'm looking for fractional executive roles"
- Career Coaching: "I want guidance on my career path"
- Lifestyle Change: "I'm seeking more flexibility"
- Just Curious: "I'm exploring what's out there"

### HOW TO USE GIFS
You can include GIFs in your messages to make them more engaging! Use this format:
<gif src="URL_HERE" alt="description" />

Example GIF URLs you can use:
- Welcome: ${ONBOARDING_GIFS.welcome}
- Thumbs up: ${ONBOARDING_GIFS.step_complete}
- You got this: ${ONBOARDING_GIFS.encouragement}

Be warm and friendly. Start with a GIF! Say something like:
"<gif src="${ONBOARDING_GIFS.welcome}" alt="welcome wave" />

Hey ${userName}! Great to meet you. I'm here to help you find amazing fractional opportunities.

First up - what brings you to Fractional Quest today?"

Then trigger the confirm_trinity HITL.
`,
    2: `
## STEP 2: Current Employment Status

Great, ${userName} has told us their goals! Now find out their current situation.

YOUR TASK: Call the confirm_employment_status HITL tool with these options:
- Currently Employed: Working full-time/part-time now
- Between Roles: Recently left or transitioning
- Freelancing: Already doing contract/consulting work
- Founder: Running their own business

Include a celebratory GIF after they complete step 1:
<gif src="${ONBOARDING_GIFS.step_complete}" alt="thumbs up" />

Acknowledge their previous answer warmly, then ask:
"Perfect! And what's your current work situation?"

Then trigger the confirm_employment_status HITL.
`,
    3: `
## STEP 3: Professional Vertical

${userName} is making great progress! Now find out their professional domain.

YOUR TASK: Call the confirm_professional_vertical HITL tool with options like:
Technology, Finance, Marketing, Operations, HR/People, Sales, Product, General Management

You can include an encouraging GIF:
<gif src="${ONBOARDING_GIFS.encouragement}" alt="you got this" />

Acknowledge their status, then ask:
"What's your professional area of expertise?"

Then trigger the confirm_professional_vertical HITL.
`,
    4: `
## STEP 4: Location & Work Preferences

Almost there! Find out where ${userName} is based and their work style preference.

YOUR TASK:
1. Call confirm_location HITL to get their base location (London, Manchester, Remote, etc.)
2. Ask about their preferred work arrangement (remote/hybrid/onsite)

Include an "almost there" GIF:
<gif src="${ONBOARDING_GIFS.almost_there}" alt="almost there" />

Say something like:
"Brilliant! Where are you based, and what's your preferred work style?"
`,
    5: `
## STEP 5: Experience & Expectations

Final step! Get their target role, experience level, and salary expectations.

YOUR TASK:
1. Ask what role they're targeting (CTO, CFO, CMO, COO, etc.)
2. Ask about their experience level (C-Suite, VP, Director, Senior Manager)
3. Ask about day rate expectations (you can use save_user_preference for each)

Say something like:
"Last step! What role are you targeting, and what's your experience level?"

Save each piece of information using save_user_preference.
`,
    6: `
## ONBOARDING COMPLETE! 🎉

Include a big celebration GIF:
<gif src="${ONBOARDING_GIFS.celebration}" alt="celebration" />

${userName} has completed their profile! Celebrate this moment.

YOUR TASK:
1. Congratulate them warmly
2. Summarize what you learned about them
3. Offer to find matching jobs

Say something like:
"🎉 Amazing, ${userName}! Your profile is all set!

Based on what you've told me, I can now find you the perfect fractional opportunities. Ready to see what's out there?"

Then offer to search for jobs matching their profile.
`,
  }

  return stepPrompts[step] || stepPrompts[1]
}

export function OnboardingWizard({
  userId,
  userName,
  profileItems,
  currentStep,
  onVoiceMessage,
}: OnboardingWizardProps) {
  // Sync with Pydantic AI agent state via CopilotKit
  const { state: agentState } = useCoAgent<AgentState>({
    name: "my_agent",
    initialState: {
      onboarding: {
        current_step: currentStep,
        is_complete: currentStep > 5,
        trinity: null,
        employment_status: null,
        professional_vertical: null,
        location: null,
        role_preference: null,
        experience_level: null,
        profile_nodes: [],
      }
    }
  })

  // Render agent's onboarding progress in the chat (Generative UI)
  useCoAgentStateRender<AgentState>({
    name: "my_agent",
    render: ({ state }) => {
      if (!state?.onboarding?.profile_nodes?.length) return null
      return (
        <div className="my-3 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <p className="text-xs text-emerald-400 mb-2 font-medium">Profile Updated</p>
          <div className="flex flex-wrap gap-2">
            {state.onboarding.profile_nodes.map((node, i) => (
              <span
                key={i}
                className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs"
              >
                {node.confirmed ? '✓ ' : ''}{node.label}
              </span>
            ))}
          </div>
        </div>
      )
    },
  })

  // Use agent state if available, fallback to props
  const effectiveStep = agentState?.onboarding?.current_step || currentStep
  const isComplete = effectiveStep > 5

  // Build agent instructions for current step
  const instructions = `
## ONBOARDING WIZARD MODE

You are guiding ${userName} through a 5-step profile setup. Current step: ${currentStep} of 5.

### CRITICAL BEHAVIOR:
1. Be warm, friendly, and encouraging
2. Ask ONE question at a time
3. Use the HITL tools - they render beautiful UI in the chat
4. Acknowledge each answer before moving to the next question
5. Keep responses SHORT and conversational
6. Use emojis sparingly but effectively

### CURRENT STEP INSTRUCTIONS:
${getStepInstructions(currentStep, userName)}

### PROFILE SO FAR:
${profileItems.length > 0
  ? profileItems.map(i => `- ${i.item_type}: ${i.value}`).join('\n')
  : 'No items yet - this is a fresh start!'
}

### REMEMBER:
- This is a CONVERSATION, not a form
- Make it fun and engaging
- Progress happens when you call the HITL tools
- After each HITL response, naturally transition to the next step
`

  const initialMessage = isComplete
    ? `Welcome back, ${userName}! 🎉 Your profile is all set. Ready to find some amazing opportunities?`
    : currentStep === 1
      ? `Hey ${userName}! 👋 Welcome to Fractional Quest!\n\nI'm here to help you find incredible fractional executive opportunities. Let's get to know each other in just 5 quick steps.\n\nFirst up - what brings you here today?`
      : `Let's continue building your profile, ${userName}! We're on step ${currentStep} of 5.`

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-950">
      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with auth */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-gray-900">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg">Fractional Quest</span>
            {isComplete && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                <span>✓</span> Profile Complete
              </span>
            )}
          </div>

          {/* Center - Step indicator (mobile) */}
          <div className="sm:hidden">
            {!isComplete && (
              <span className="text-white/60 text-sm">
                Step {currentStep}/5
              </span>
            )}
          </div>

          {/* Right - User info + Voice */}
          <div className="flex items-center gap-2 sm:gap-4">
            <VoiceInput
              onMessage={onVoiceMessage}
              firstName={userName}
              userId={userId}
              pageContext={{
                pageType: 'home',
                pageH1: 'Onboarding Wizard',
                pageUrl: '/',
              }}
            />
            <span className="hidden sm:block text-white text-sm">{userName}</span>
            <UserButton />
          </div>
        </header>

        {/* Welcome banner - only on step 1 */}
        {currentStep === 1 && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              Welcome, {userName}! 👋
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Let's build your profile in 5 quick steps so we can find you perfect opportunities.
            </p>
          </div>
        )}

        {/* Progress banner - steps 2-5 */}
        {currentStep > 1 && currentStep <= 5 && (
          <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Building your profile</p>
              <p className="text-white/60 text-sm">Step {currentStep} of 5</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-2 rounded-full transition-all ${
                    step < currentStep
                      ? 'bg-emerald-500'
                      : step === currentStep
                        ? 'bg-white'
                        : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completion banner */}
        {isComplete && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                  <span>🎉</span> Profile Complete!
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  You're all set. Ask me to find jobs matching your profile.
                </p>
              </div>
              <a
                href="/dashboard"
                className="hidden sm:block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                View Dashboard →
              </a>
            </div>
          </div>
        )}

        {/* CopilotChat - Main Panel */}
        <div className="flex-1 overflow-hidden">
          <CopilotChat
            instructions={instructions}
            labels={{
              title: "Your Fractional Journey",
              initial: initialMessage,
              placeholder: "Type your answer or use voice...",
            }}
            markdownTagRenderers={gifMarkdownRenderer}
            className="h-full"
          />
        </div>
      </div>

      {/* Progress Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden lg:flex lg:flex-col w-80 bg-gray-900 border-l border-white/10">
        <OnboardingProgress currentStep={currentStep} />
        <div className="flex-1 overflow-y-auto border-t border-white/10">
          <ProfilePreview items={profileItems} userName={userName} currentStep={currentStep} />
        </div>
      </aside>

      {/* Mobile Progress Bar - Visible only on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all
                  ${step < currentStep
                    ? 'bg-emerald-500'
                    : step === currentStep
                      ? 'bg-white'
                      : 'bg-white/20'
                  }
                `}
              />
            ))}
          </div>
          <span className="text-white/60 text-sm">
            {isComplete ? "Complete!" : `Step ${currentStep} of 5`}
          </span>

          {/* Mini profile preview */}
          <div className="flex-1 flex justify-end gap-1 overflow-hidden">
            {profileItems.slice(-3).map((item) => (
              <span
                key={item.id}
                className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded truncate max-w-20"
              >
                {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
