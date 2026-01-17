'use client'

import { CopilotChat, ComponentsMap } from '@copilotkit/react-ui'
import { useCoAgent, useCoAgentStateRender, useCopilotChat } from '@copilotkit/react-core'
import { OnboardingProgress } from './OnboardingProgress'
import { ProfilePreview } from './ProfilePreview'
import { VoiceInput } from '@/components/voice-input'
import { UserButton } from '@neondatabase/auth/react/ui'
import { Role, TextMessage } from '@copilotkit/runtime-client-gql'

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
  welcome: 'https://static.klipy.com/ii/935d7ab9d8c6202680a668421940ec81/9a/fb/DZ2Ib2g1.gif',
  step_complete: 'https://static.klipy.com/ii/50d7c955398dfd7e3c8ba5281154280f/79/6d/dl3FgmslCLcFr3bHDBtQ.gif',
  almost_there: 'https://static.klipy.com/ii/ce286d05b8e1a47cd4f32b0e1b6dec0e/b1/02/K4ZWIqVO.gif',
  celebration: 'https://static.klipy.com/ii/935d7ab9d8c6202680a668421940ec81/d2/27/iQ5M3MEP.gif',
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

Final step! Get their target role and experience level in their professional area.

YOUR TASK:
1. Ask what fractional executive role they're targeting (Fractional CTO, Fractional CFO, Fractional CMO, Fractional COO, etc.)
2. Ask about their years of experience IN THAT SPECIFIC ROLE/DOMAIN (e.g., "How many years of finance leadership experience do you have?" or "How many years of tech leadership experience?")
3. Optionally ask about day rate expectations

IMPORTANT: When asking about experience, be SPECIFIC about the domain. Don't just say "years of experience" - say "years of [their professional vertical] leadership experience"

Say something like:
"Last step! What fractional role are you targeting? And how many years of leadership experience do you have in that field?"

Save each piece of information using save_user_preference with item_type="role_preference" and item_type="experience_level".
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
  // Handle profile item edit
  const handleEditItem = async (item: ProfileItem, newValue: string) => {
    try {
      const response = await fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          itemType: item.item_type,
          value: newValue,
          metadata: item.metadata,
        }),
      })
      if (!response.ok) throw new Error('Failed to update')
      // Trigger page refresh to get updated items
      window.location.reload()
    } catch (e) {
      console.error('Edit failed:', e)
      throw e
    }
  }

  // Handle profile item delete
  const handleDeleteItem = async (item: ProfileItem) => {
    try {
      const response = await fetch(`/api/user-profile?id=${item.id}&userId=${userId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete')
      // Trigger page refresh to get updated items
      window.location.reload()
    } catch (e) {
      console.error('Delete failed:', e)
      throw e
    }
  }

  // CopilotChat hook for sending messages programmatically
  const { appendMessage } = useCopilotChat()

  // Handle quick option button click
  const handleQuickOption = (option: string) => {
    appendMessage(new TextMessage({
      role: Role.User,
      content: option,
    }))
  }

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

  // Step descriptions for guidance
  const STEP_INFO = [
    { title: "Your Goals", description: "What brings you to Fractional Quest?", hint: "Job search, career coaching, lifestyle change, or just exploring" },
    { title: "Current Status", description: "What's your employment situation?", hint: "Employed, between roles, freelancing, or founder" },
    { title: "Your Domain", description: "What's your professional expertise?", hint: "Technology, Finance, Marketing, Operations, HR, Product" },
    { title: "Location", description: "Where are you based?", hint: "London, Manchester, Remote UK, or other" },
    { title: "Target Role", description: "What role are you targeting?", hint: "Fractional CTO, CFO, CMO, COO + years of experience" },
  ]

  const currentStepInfo = STEP_INFO[currentStep - 1] || STEP_INFO[0]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top Header Bar - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg">Fractional Quest</span>
            <span className="hidden sm:inline text-white/40 text-sm">Profile Builder</span>
          </div>

          {/* Center - Progress indicator */}
          <div className="hidden md:flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step < currentStep
                      ? 'bg-emerald-500 text-white'
                      : step === currentStep
                        ? 'bg-white text-gray-900'
                        : 'bg-white/10 text-white/40'
                  }`}
                >
                  {step < currentStep ? '✓' : step}
                </div>
                {step < 5 && (
                  <div className={`w-8 h-0.5 ${step < currentStep ? 'bg-emerald-500' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Right - User */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-white text-sm">{userName}</span>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content - Below fixed header */}
      <div className="pt-16 flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Instructions & Voice */}
        <div className="flex-1 flex flex-col">
          {/* Step Header Card */}
          <div className="p-6 border-b border-white/10">
            <div className="max-w-2xl mx-auto">
              {/* Step Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  STEP {currentStep} OF 5
                </span>
                {currentStep > 1 && (
                  <span className="text-emerald-400 text-sm">
                    {currentStep - 1} completed
                  </span>
                )}
              </div>

              {/* Current Step Info */}
              <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                {currentStepInfo.title}
              </h1>
              <p className="text-white/70 text-lg mb-3">
                {currentStepInfo.description}
              </p>
              <p className="text-white/40 text-sm">
                💡 Options: {currentStepInfo.hint}
              </p>
            </div>
          </div>

          {/* Voice Input Section - Prominent */}
          <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">Talk or Type</h3>
                    <p className="text-white/50 text-sm">Click the mic to speak, or type below</p>
                  </div>
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
                </div>

                {/* Quick Action Buttons based on step */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentStep === 1 && ['Job Search', 'Career Coaching', 'Lifestyle Change', 'Just Curious'].map(opt => (
                    <button key={opt} onClick={() => handleQuickOption(opt)} className="px-4 py-2 bg-white/10 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                      {opt}
                    </button>
                  ))}
                  {currentStep === 2 && ['Currently Employed', 'Between Roles', 'Freelancing', 'Founder'].map(opt => (
                    <button key={opt} onClick={() => handleQuickOption(opt)} className="px-4 py-2 bg-white/10 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                      {opt}
                    </button>
                  ))}
                  {currentStep === 3 && ['Technology', 'Finance', 'Marketing', 'Operations', 'HR/People', 'Product'].map(opt => (
                    <button key={opt} onClick={() => handleQuickOption(opt)} className="px-4 py-2 bg-white/10 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                      {opt}
                    </button>
                  ))}
                  {currentStep === 4 && ['London', 'Manchester', 'Birmingham', 'Remote UK', 'Other'].map(opt => (
                    <button key={opt} onClick={() => handleQuickOption(opt)} className="px-4 py-2 bg-white/10 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                      {opt}
                    </button>
                  ))}
                  {currentStep === 5 && ['Fractional CTO', 'Fractional CFO', 'Fractional CMO', 'Fractional COO'].map(opt => (
                    <button key={opt} onClick={() => handleQuickOption(opt)} className="px-4 py-2 bg-white/10 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                      {opt}
                    </button>
                  ))}
                </div>

                <p className="text-white/30 text-xs text-center">
                  Or type something custom - I'll understand!
                </p>
              </div>
            </div>
          </div>

          {/* CopilotChat - Conversation Panel */}
          <div className="flex-1 overflow-hidden border-t border-white/10">
            <CopilotChat
              instructions={instructions}
              labels={{
                title: "Your Fractional Journey",
                initial: initialMessage,
                placeholder: `Type your ${currentStepInfo.title.toLowerCase()} or ask a question...`,
              }}
              markdownTagRenderers={gifMarkdownRenderer}
              className="h-full"
            />
          </div>
        </div>

        {/* Right Panel - Profile Dashboard */}
        <aside className="hidden lg:block w-96 bg-gray-900 border-l border-white/10 overflow-y-auto">
          {/* Profile Header */}
          <div className="p-6 border-b border-white/10 bg-gray-800">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white font-bold text-lg">Your Profile</h2>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                Building...
              </span>
            </div>
            <p className="text-white/50 text-sm">
              We're building your profile to find perfect matches. You can edit anything below.
            </p>
          </div>

          {/* Progress Section */}
          <div className="p-4 border-b border-white/10">
            <OnboardingProgress currentStep={currentStep} />
          </div>

          {/* Profile Items */}
          <div className="p-4">
            <ProfilePreview
              items={profileItems}
              userName={userName}
              currentStep={currentStep}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          </div>

          {/* Help Section */}
          <div className="p-4 border-t border-white/10">
            <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
              <h4 className="text-indigo-400 font-medium text-sm mb-2">💡 Tips</h4>
              <ul className="text-white/60 text-xs space-y-1">
                <li>• Click any item above to edit it</li>
                <li>• Use voice or text - both work great</li>
                <li>• Your answers help us find better matches</li>
                <li>• You can always update later from your dashboard</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10 p-4 z-40">
        <div className="flex items-center justify-between">
          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step < currentStep ? 'bg-emerald-500' : step === currentStep ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-white/60 text-sm">Step {currentStep}/5</span>
          </div>

          {/* Voice button */}
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
        </div>
      </div>
    </div>
  )
}
