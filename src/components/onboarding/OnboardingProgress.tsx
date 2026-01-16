'use client'

interface OnboardingProgressProps {
  currentStep: number
  totalSteps?: number
}

const STEPS = [
  { num: 1, title: "Your Goals", icon: "🎯", description: "Why are you here?" },
  { num: 2, title: "Current Status", icon: "📋", description: "Your situation" },
  { num: 3, title: "Your Domain", icon: "💼", description: "Professional area" },
  { num: 4, title: "Location", icon: "📍", description: "Where you work" },
  { num: 5, title: "Experience", icon: "⭐", description: "Skills & expectations" },
]

export function OnboardingProgress({ currentStep, totalSteps = 5 }: OnboardingProgressProps) {
  const progressPercent = Math.min((currentStep / totalSteps) * 100, 100)
  const isComplete = currentStep > totalSteps

  return (
    <div className="p-6 bg-gray-900/50 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white font-semibold text-lg mb-1">
          {isComplete ? "Profile Complete!" : "Building Your Profile"}
        </h2>
        <p className="text-white/60 text-sm">
          {isComplete
            ? "You're all set to find great opportunities"
            : `Step ${currentStep} of ${totalSteps}`
          }
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step list */}
      <div className="space-y-3">
        {STEPS.map((step) => {
          const isCompleted = step.num < currentStep
          const isCurrent = step.num === currentStep
          const isPending = step.num > currentStep

          return (
            <div
              key={step.num}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${isCurrent ? 'bg-white/10 border border-white/20' : ''}
                ${isCompleted ? 'opacity-80' : ''}
                ${isPending ? 'opacity-40' : ''}
              `}
            >
              {/* Step indicator */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg
                  transition-all duration-300
                  ${isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isCurrent
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-800 text-white/40'
                  }
                `}
              >
                {isCompleted ? '✓' : step.icon}
              </div>

              {/* Step info */}
              <div className="flex-1 min-w-0">
                <p
                  className={`
                    font-medium text-sm truncate
                    ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-white' : 'text-white/40'}
                  `}
                >
                  {step.title}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {step.description}
                </p>
              </div>

              {/* Status badge */}
              {isCurrent && (
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full animate-pulse">
                  Now
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Encouragement message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
        <p className="text-sm text-emerald-300">
          {isComplete
            ? "🎉 Amazing! Let's find your perfect role."
            : currentStep <= 2
              ? "💪 Great start! Just a few more questions."
              : "🚀 Almost there! You're doing great."
          }
        </p>
      </div>
    </div>
  )
}
