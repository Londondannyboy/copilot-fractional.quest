'use client'

import { CopilotChat } from '@copilotkit/react-ui'
import { OnboardingProgress } from './OnboardingProgress'
import { ProfilePreview } from './ProfilePreview'
import { VoiceInput } from '@/components/voice-input'

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

Be warm and friendly. Say something like:
"Hey ${userName}! 👋 Great to meet you. I'm here to help you find amazing fractional opportunities.

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

Acknowledge their previous answer warmly, then ask:
"Perfect! And what's your current work situation?"

Then trigger the confirm_employment_status HITL.
`,
    3: `
## STEP 3: Professional Vertical

${userName} is making great progress! Now find out their professional domain.

YOUR TASK: Call the confirm_professional_vertical HITL tool with options like:
Technology, Finance, Marketing, Operations, HR/People, Sales, Product, General Management

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
  const isComplete = currentStep > 5

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
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h1 className="text-white text-xl font-semibold">
              {isComplete ? "Find Your Next Role" : "Welcome to Fractional Quest"}
            </h1>
            <p className="text-white/60 text-sm mt-0.5">
              {isComplete
                ? "Your profile is complete - let's find opportunities"
                : `Building your profile - Step ${currentStep} of 5`
              }
            </p>
          </div>

          {/* Voice button */}
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs hidden sm:block">
              Or use voice
            </span>
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
        </header>

        {/* CopilotChat - Main Panel */}
        <div className="flex-1 overflow-hidden">
          <CopilotChat
            instructions={instructions}
            labels={{
              title: "Your Fractional Journey",
              initial: initialMessage,
              placeholder: "Type your answer or use voice...",
            }}
            className="h-full"
          />
        </div>
      </div>

      {/* Progress Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden lg:flex lg:flex-col w-80 bg-gray-900 border-l border-white/10">
        <OnboardingProgress currentStep={currentStep} />
        <div className="flex-1 overflow-y-auto border-t border-white/10">
          <ProfilePreview items={profileItems} userName={userName} />
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
