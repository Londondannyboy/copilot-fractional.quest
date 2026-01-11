'use client'

import { useState } from 'react'

interface RoleData {
  name: string
  shortName: string
  avgDayRate: number
  demandGrowth: number
  avgEngagement: string
  topSkills: string[]
  industries: string[]
  color: string
}

const ROLES: RoleData[] = [
  {
    name: 'Chief Financial Officer',
    shortName: 'CFO',
    avgDayRate: 1200,
    demandGrowth: 18,
    avgEngagement: '2-3 days/week',
    topSkills: ['Financial Modeling', 'M&A', 'Fundraising', 'FP&A'],
    industries: ['Fintech', 'SaaS', 'E-commerce', 'Healthcare'],
    color: 'emerald',
  },
  {
    name: 'Chief Technology Officer',
    shortName: 'CTO',
    avgDayRate: 1100,
    demandGrowth: 25,
    avgEngagement: '2-4 days/week',
    topSkills: ['Cloud Architecture', 'Team Scaling', 'AI/ML', 'DevOps'],
    industries: ['SaaS', 'Fintech', 'Marketplaces', 'AI/ML'],
    color: 'blue',
  },
  {
    name: 'Chief Marketing Officer',
    shortName: 'CMO',
    avgDayRate: 1000,
    demandGrowth: 22,
    avgEngagement: '2-3 days/week',
    topSkills: ['Growth Marketing', 'Brand Strategy', 'Demand Gen', 'Analytics'],
    industries: ['D2C', 'SaaS', 'E-commerce', 'Consumer'],
    color: 'amber',
  },
  {
    name: 'Chief Operating Officer',
    shortName: 'COO',
    avgDayRate: 1050,
    demandGrowth: 15,
    avgEngagement: '3-4 days/week',
    topSkills: ['Operations', 'Process Design', 'Scaling', 'EOS/Integrator'],
    industries: ['Scale-ups', 'Manufacturing', 'Services', 'Logistics'],
    color: 'purple',
  },
  {
    name: 'Chief Information Security Officer',
    shortName: 'CISO',
    avgDayRate: 1300,
    demandGrowth: 35,
    avgEngagement: '1-2 days/week',
    topSkills: ['Security Strategy', 'Compliance', 'Risk Assessment', 'Incident Response'],
    industries: ['Fintech', 'Healthcare', 'Financial Services', 'SaaS'],
    color: 'red',
  },
  {
    name: 'Chief People Officer',
    shortName: 'CHRO',
    avgDayRate: 950,
    demandGrowth: 20,
    avgEngagement: '2-3 days/week',
    topSkills: ['Talent Strategy', 'Culture', 'Compensation', 'L&D'],
    industries: ['Scale-ups', 'Tech', 'Professional Services', 'Retail'],
    color: 'pink',
  },
]

const COLOR_CLASSES: Record<string, { bg: string; light: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  blue: { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  amber: { bg: 'bg-amber-600', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  purple: { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  red: { bg: 'bg-red-600', light: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  pink: { bg: 'bg-pink-600', light: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
}

export function RoleComparisonTool() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['CFO', 'CTO'])

  const toggleRole = (shortName: string) => {
    if (selectedRoles.includes(shortName)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter(r => r !== shortName))
      }
    } else if (selectedRoles.length < 3) {
      setSelectedRoles([...selectedRoles, shortName])
    }
  }

  const selectedData = ROLES.filter(r => selectedRoles.includes(r.shortName))
  const maxRate = Math.max(...ROLES.map(r => r.avgDayRate))

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Interactive Comparison
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-playfair">
            Compare Fractional Roles
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Select up to 3 roles to compare day rates, demand, and key requirements
          </p>
        </div>

        {/* Role selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {ROLES.map((role) => {
            const colors = COLOR_CLASSES[role.color]
            const isSelected = selectedRoles.includes(role.shortName)
            return (
              <button
                key={role.shortName}
                onClick={() => toggleRole(role.shortName)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                  isSelected
                    ? `${colors.bg} text-white shadow-lg`
                    : `${colors.light} ${colors.text} ${colors.border} border hover:shadow-md`
                }`}
              >
                {role.shortName}
              </button>
            )
          })}
        </div>

        {/* Comparison cards */}
        <div className={`grid gap-6 ${
          selectedData.length === 1 ? 'max-w-md mx-auto' :
          selectedData.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
          'md:grid-cols-3'
        }`}>
          {selectedData.map((role) => {
            const colors = COLOR_CLASSES[role.color]
            return (
              <div
                key={role.shortName}
                className={`bg-white rounded-2xl shadow-lg border-2 ${colors.border} overflow-hidden`}
              >
                {/* Header */}
                <div className={`${colors.bg} text-white p-6`}>
                  <div className="text-4xl font-bold mb-1">{role.shortName}</div>
                  <div className="text-white/80 text-sm">{role.name}</div>
                </div>

                {/* Stats */}
                <div className="p-6 space-y-6">
                  {/* Day Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Avg Day Rate</span>
                      <span className="text-2xl font-bold text-gray-900">£{role.avgDayRate.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors.bg} rounded-full`}
                        style={{ width: `${(role.avgDayRate / maxRate) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Demand Growth */}
                  <div className="flex items-center justify-between py-3 border-y border-gray-100">
                    <span className="text-gray-600 text-sm">Demand Growth</span>
                    <span className={`font-bold ${colors.text}`}>+{role.demandGrowth}% YoY</span>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Typical Engagement</span>
                    <span className="font-medium text-gray-900">{role.avgEngagement}</span>
                  </div>

                  {/* Top Skills */}
                  <div>
                    <div className="text-gray-600 text-sm mb-2">Top Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {role.topSkills.map((skill) => (
                        <span
                          key={skill}
                          className={`${colors.light} ${colors.text} text-xs font-medium px-2 py-1 rounded-full`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <div className="text-gray-600 text-sm mb-2">Hot Industries</div>
                    <div className="text-gray-900 text-sm">
                      {role.industries.join(' • ')}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <a
                    href={`/fractional-${role.shortName.toLowerCase()}-jobs-uk`}
                    className={`block w-full ${colors.bg} text-white text-center font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity`}
                  >
                    View {role.shortName} Jobs →
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          💡 Tip: Click role buttons above to compare different fractional executive positions
        </p>
      </div>
    </section>
  )
}
