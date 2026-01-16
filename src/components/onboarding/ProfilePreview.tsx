'use client'

interface ProfileItem {
  id: number
  item_type: string
  value: string
  metadata?: Record<string, unknown>
  confirmed?: boolean
}

interface ProfilePreviewProps {
  items: ProfileItem[]
  userName?: string
  currentStep?: number
}

// Stage 1 required fields in order
const STAGE_1_FIELDS = [
  { type: 'trinity', label: 'Your Goal', icon: '🎯', step: 1 },
  { type: 'employment_status', label: 'Current Status', icon: '📋', step: 2 },
  { type: 'professional_vertical', label: 'Your Domain', icon: '💼', step: 3 },
  { type: 'location', label: 'Location', icon: '📍', step: 4 },
  { type: 'role_preference', label: 'Target Role', icon: '🎯', step: 5 },
]

const ITEM_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  trinity: { icon: "🎯", label: "Goal", color: "text-amber-400" },
  employment_status: { icon: "📋", label: "Status", color: "text-blue-400" },
  professional_vertical: { icon: "💼", label: "Domain", color: "text-purple-400" },
  location: { icon: "📍", label: "Location", color: "text-green-400" },
  role_preference: { icon: "🎯", label: "Target Role", color: "text-pink-400" },
  experience_level: { icon: "⭐", label: "Level", color: "text-yellow-400" },
  skill: { icon: "⚡", label: "Skill", color: "text-cyan-400" },
  company: { icon: "🏢", label: "Company", color: "text-orange-400" },
  work_arrangement: { icon: "🏠", label: "Work Style", color: "text-indigo-400" },
  salary_expectation: { icon: "💰", label: "Day Rate", color: "text-emerald-400" },
}

export function ProfilePreview({ items, userName, currentStep = 1 }: ProfilePreviewProps) {
  // Check what Stage 1 fields are complete
  const completedTypes = new Set(items.map(i => i.item_type))
  const stage1Complete = STAGE_1_FIELDS.slice(0, 3).every(f => completedTypes.has(f.type))

  // Get value for a field type
  const getValue = (type: string) => {
    const item = items.find(i => i.item_type === type)
    if (!item) return null
    // Use metadata label if available (prettier display)
    return (item.metadata?.label as string) || item.value
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">
          {userName ? `${userName}'s Profile` : "Your Profile"}
        </h3>
        {stage1Complete ? (
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full flex items-center gap-1">
            <span>✓</span> Stage 1 Complete
          </span>
        ) : (
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
            Building...
          </span>
        )}
      </div>

      {/* Stage 1 Checklist */}
      <div className="space-y-2 mb-6">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Stage 1 Profile</p>

        {STAGE_1_FIELDS.map((field) => {
          const value = getValue(field.type)
          const isComplete = !!value
          const isCurrent = field.step === currentStep

          return (
            <div
              key={field.type}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all
                ${isComplete
                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                  : isCurrent
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-white/5 border border-transparent'
                }
              `}
            >
              {/* Status indicator */}
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-sm
                ${isComplete
                  ? 'bg-emerald-500 text-white'
                  : isCurrent
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white/40'
                }
              `}>
                {isComplete ? '✓' : field.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isComplete ? 'text-emerald-400' : isCurrent ? 'text-white' : 'text-white/40'}`}>
                  {field.label}
                </p>
                {value ? (
                  <p className="text-white/70 text-sm truncate">{value}</p>
                ) : isCurrent ? (
                  <p className="text-white/40 text-xs">Answering now...</p>
                ) : (
                  <p className="text-white/30 text-xs">Not set</p>
                )}
              </div>

              {/* Edit button for completed items */}
              {isComplete && (
                <button
                  className="text-white/30 hover:text-white/60 text-xs transition-colors"
                  title="Edit coming soon"
                >
                  ✎
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Additional Profile Items */}
      {items.filter(i => !STAGE_1_FIELDS.some(f => f.type === i.item_type)).length > 0 && (
        <div className="border-t border-white/10 pt-4">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Additional Info</p>
          <div className="flex flex-wrap gap-2">
            {items
              .filter(i => !STAGE_1_FIELDS.some(f => f.type === i.item_type))
              .map((item) => {
                const config = ITEM_CONFIG[item.item_type] || { icon: "📌", label: item.item_type, color: "text-gray-400" }
                return (
                  <span
                    key={item.id}
                    className={`text-xs px-2 py-1 rounded-md bg-white/10 ${config.color}`}
                  >
                    {config.icon} {item.value}
                  </span>
                )
              })}
          </div>
        </div>
      )}

      {/* Progress message */}
      <div className="mt-6 p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <p className="text-sm text-white/70">
          {stage1Complete
            ? "🎉 Stage 1 complete! You can now search for matching jobs."
            : currentStep <= 3
              ? `${3 - (currentStep - 1)} more questions to complete Stage 1`
              : "Almost there! Complete your profile for better matches."
          }
        </p>
      </div>
    </div>
  )
}
