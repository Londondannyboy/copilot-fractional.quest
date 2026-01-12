'use client'

import { useState, useEffect } from 'react'
import { authClient } from '@/lib/auth/client'

interface ProfileItem {
  item_type: string
  value: string
  confirmed: boolean
}

interface ProfileCardProps {
  className?: string
}

// Category colors and icons
const CATEGORY_CONFIG: Record<string, { icon: string; color: string; bgColor: string }> = {
  location: { icon: '📍', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  role_preference: { icon: '🎯', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  skill: { icon: '⚡', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  company: { icon: '🏢', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  interest: { icon: '💡', color: 'text-pink-700', bgColor: 'bg-pink-100' },
}

export function ProfileCard({ className = '' }: ProfileCardProps) {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const [profileItems, setProfileItems] = useState<ProfileItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    async function fetchProfile() {
      try {
        const response = await fetch(`/api/user-profile?userId=${user?.id}`)
        if (response.ok) {
          const data = await response.json()
          setProfileItems(data.items || [])
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user?.id])

  // Group items by type
  const grouped = profileItems.reduce((acc, item) => {
    if (!acc[item.item_type]) acc[item.item_type] = []
    acc[item.item_type].push(item)
    return acc
  }, {} as Record<string, ProfileItem[]>)

  const firstName = user?.name?.split(' ')[0] || 'You'

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 ${className}`}>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3">
          <div className="h-4 bg-white/30 rounded w-32 animate-pulse" />
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const hasProfile = profileItems.length > 0

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <span>✨</span> {firstName}&apos;s Profile
        </h3>
      </div>

      {/* Content */}
      <div className="p-4">
        {hasProfile ? (
          <div className="space-y-4">
            {/* Location */}
            {grouped.location && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  <span>{CATEGORY_CONFIG.location.icon}</span>
                  <span>Location</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grouped.location.map((item, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_CONFIG.location.bgColor} ${CATEGORY_CONFIG.location.color}`}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Target Role */}
            {grouped.role_preference && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  <span>{CATEGORY_CONFIG.role_preference.icon}</span>
                  <span>Target Role</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grouped.role_preference.map((item, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_CONFIG.role_preference.bgColor} ${CATEGORY_CONFIG.role_preference.color}`}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Companies */}
            {grouped.company && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  <span>{CATEGORY_CONFIG.company.icon}</span>
                  <span>Companies</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grouped.company.map((item, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_CONFIG.company.bgColor} ${CATEGORY_CONFIG.company.color} ${item.confirmed ? 'ring-1 ring-emerald-400' : ''}`}
                    >
                      {item.value}
                      {item.confirmed && <span className="ml-1">✓</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {grouped.skill && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  <span>{CATEGORY_CONFIG.skill.icon}</span>
                  <span>Skills</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grouped.skill.map((item, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_CONFIG.skill.bgColor} ${CATEGORY_CONFIG.skill.color}`}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm mb-2">
              Your profile is empty
            </p>
            <p className="text-xs text-gray-400">
              Chat with the AI to build your profile!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-indigo-50 border-t border-indigo-100">
        <p className="text-xs text-indigo-600">
          {hasProfile ? `${profileItems.length} items saved` : 'Ask me about roles you like!'}
        </p>
      </div>
    </div>
  )
}

export default ProfileCard
