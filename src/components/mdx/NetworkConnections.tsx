'use client'

interface Connection {
  name: string
  role: string
  company?: string
  relevance: 'high' | 'medium' | 'low'
  mutualConnections?: number
  note?: string
}

interface NetworkConnectionsProps {
  title?: string
  targetRole?: string
  connections?: Connection[]
  suggestedActions?: string[]
}

/**
 * NetworkConnections - Shows relevant professional connections
 *
 * Agent can render via compose_mdx_response:
 * ```mdx
 * <NetworkConnections
 *   title="Your CTO Network"
 *   targetRole="Fractional CTO"
 *   connections={[
 *     { name: "Sarah Chen", role: "CTO", company: "TechCorp", relevance: "high", mutualConnections: 12 }
 *   ]}
 *   suggestedActions={["Request intro via James", "Attend next CTO meetup"]}
 * />
 * ```
 */
export default function NetworkConnections({
  title = 'Network Connections',
  targetRole,
  connections = [],
  suggestedActions = [],
}: NetworkConnectionsProps) {
  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'high': return 'ring-emerald-500 bg-emerald-50'
      case 'medium': return 'ring-amber-500 bg-amber-50'
      default: return 'ring-gray-300 bg-gray-50'
    }
  }

  const getRelevanceBadge = (relevance: string) => {
    switch (relevance) {
      case 'high': return { text: 'Key Contact', color: 'bg-emerald-100 text-emerald-700' }
      case 'medium': return { text: 'Relevant', color: 'bg-amber-100 text-amber-700' }
      default: return { text: 'Potential', color: 'bg-gray-100 text-gray-600' }
    }
  }

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-lg">{title}</h3>
            {targetRole && (
              <p className="text-cyan-100 text-sm mt-1">
                Connections relevant for {targetRole} roles
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔗</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200 bg-gray-50">
        <div className="px-4 py-3 text-center">
          <p className="text-2xl font-bold text-gray-900">{connections.length}</p>
          <p className="text-xs text-gray-500">Connections</p>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {connections.filter(c => c.relevance === 'high').length}
          </p>
          <p className="text-xs text-gray-500">Key Contacts</p>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {connections.reduce((sum, c) => sum + (c.mutualConnections || 0), 0)}
          </p>
          <p className="text-xs text-gray-500">Mutual</p>
        </div>
      </div>

      {/* Connections List */}
      {connections.length > 0 && (
        <div className="divide-y divide-gray-100">
          {connections.map((conn, idx) => {
            const badge = getRelevanceBadge(conn.relevance)
            return (
              <div key={idx} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full ring-2 ${getRelevanceColor(conn.relevance)} flex items-center justify-center`}>
                    <span className="text-sm font-bold text-gray-700">
                      {getInitials(conn.name)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">{conn.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conn.role}{conn.company ? ` at ${conn.company}` : ''}
                    </p>
                    {conn.mutualConnections && (
                      <p className="text-xs text-gray-400 mt-1">
                        {conn.mutualConnections} mutual connections
                      </p>
                    )}
                  </div>

                  {/* Action */}
                  <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                    Connect
                  </button>
                </div>

                {conn.note && (
                  <p className="mt-2 ml-16 text-sm text-gray-500 italic">
                    "{conn.note}"
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Suggested Actions */}
      {suggestedActions.length > 0 && (
        <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
          <p className="text-xs font-medium text-blue-800 uppercase tracking-wider mb-2">
            Suggested Actions
          </p>
          <ul className="space-y-1">
            {suggestedActions.map((action, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-blue-500">→</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          Expand Network
        </button>
        <button className="px-4 py-2 border border-gray-300 hover:border-blue-300 rounded-lg text-sm font-medium text-gray-700 transition-colors">
          Export List
        </button>
      </div>
    </div>
  )
}
