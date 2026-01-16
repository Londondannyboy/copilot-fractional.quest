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
}

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

export function ProfilePreview({ items, userName }: ProfilePreviewProps) {
  if (items.length === 0) {
    return (
      <div className="p-6">
        <h3 className="text-white/60 text-sm font-medium mb-3">Your Profile</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">👤</div>
          <p className="text-white/40 text-sm">
            Answer the questions to build your profile
          </p>
        </div>
      </div>
    )
  }

  // Group items by type for display
  const groupedItems = items.reduce((acc, item) => {
    const type = item.item_type
    if (!acc[type]) acc[type] = []
    acc[type].push(item)
    return acc
  }, {} as Record<string, ProfileItem[]>)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">
          {userName ? `${userName}'s Profile` : "Your Profile"}
        </h3>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-3">
        {Object.entries(groupedItems).map(([type, typeItems]) => {
          const config = ITEM_CONFIG[type] || { icon: "📌", label: type, color: "text-gray-400" }

          return (
            <div key={type} className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{config.icon}</span>
                <span className="text-xs text-white/50 uppercase tracking-wider">
                  {config.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {typeItems.map((item) => (
                  <span
                    key={item.id}
                    className={`
                      text-sm px-2 py-1 rounded-md bg-white/10
                      ${config.color}
                      ${item.confirmed ? 'border border-current/30' : ''}
                    `}
                  >
                    {item.value}
                    {item.confirmed && (
                      <span className="ml-1 text-xs opacity-60">✓</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Fun encouragement */}
      <div className="mt-4 text-center">
        <p className="text-white/30 text-xs">
          {items.length < 3
            ? "Keep going! Your profile is taking shape."
            : items.length < 5
              ? "Looking good! Almost ready to find matches."
              : "🔥 Awesome profile! Ready for job matching."
          }
        </p>
      </div>
    </div>
  )
}
