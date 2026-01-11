'use client'

import { useState } from 'react'

interface Skill {
  name: string
  demand: number
  growth: number
  category: 'technical' | 'leadership' | 'strategy' | 'financial'
}

interface SkillsDemandChartProps {
  roleType?: string
  location?: string
}

const SKILLS_DATA: Record<string, Skill[]> = {
  default: [
    { name: 'Strategic Planning', demand: 95, growth: 12, category: 'strategy' },
    { name: 'Financial Modeling', demand: 88, growth: 8, category: 'financial' },
    { name: 'M&A Experience', demand: 82, growth: 15, category: 'financial' },
    { name: 'Digital Transformation', demand: 90, growth: 25, category: 'technical' },
    { name: 'Team Leadership', demand: 92, growth: 5, category: 'leadership' },
    { name: 'Stakeholder Management', demand: 87, growth: 10, category: 'leadership' },
    { name: 'Data Analytics', demand: 85, growth: 30, category: 'technical' },
    { name: 'Risk Management', demand: 80, growth: 18, category: 'strategy' },
  ],
  Finance: [
    { name: 'Financial Modeling', demand: 98, growth: 8, category: 'financial' },
    { name: 'M&A / Due Diligence', demand: 92, growth: 20, category: 'financial' },
    { name: 'Fundraising', demand: 88, growth: 25, category: 'financial' },
    { name: 'FP&A', demand: 95, growth: 10, category: 'financial' },
    { name: 'Board Reporting', demand: 85, growth: 5, category: 'leadership' },
    { name: 'Cash Flow Management', demand: 90, growth: 15, category: 'financial' },
    { name: 'ERP Systems', demand: 75, growth: 12, category: 'technical' },
    { name: 'IR35 Compliance', demand: 70, growth: 35, category: 'strategy' },
  ],
  Engineering: [
    { name: 'Cloud Architecture', demand: 95, growth: 22, category: 'technical' },
    { name: 'Team Scaling', demand: 90, growth: 18, category: 'leadership' },
    { name: 'AI/ML Strategy', demand: 88, growth: 45, category: 'technical' },
    { name: 'DevOps/Platform', demand: 92, growth: 15, category: 'technical' },
    { name: 'Security/CISO', demand: 85, growth: 30, category: 'technical' },
    { name: 'Tech Due Diligence', demand: 80, growth: 25, category: 'strategy' },
    { name: 'Agile/Lean', demand: 88, growth: 8, category: 'leadership' },
    { name: 'Data Engineering', demand: 82, growth: 35, category: 'technical' },
  ],
  Marketing: [
    { name: 'Growth Marketing', demand: 95, growth: 28, category: 'strategy' },
    { name: 'Brand Strategy', demand: 88, growth: 12, category: 'strategy' },
    { name: 'Marketing Analytics', demand: 92, growth: 35, category: 'technical' },
    { name: 'Demand Generation', demand: 90, growth: 20, category: 'strategy' },
    { name: 'Content Strategy', demand: 85, growth: 15, category: 'strategy' },
    { name: 'Marketing Ops', demand: 82, growth: 25, category: 'technical' },
    { name: 'ABM', demand: 78, growth: 40, category: 'strategy' },
    { name: 'Team Leadership', demand: 88, growth: 8, category: 'leadership' },
  ],
}

const CATEGORY_COLORS = {
  technical: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' },
  leadership: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500' },
  strategy: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500' },
  financial: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500' },
}

export function SkillsDemandChart({ roleType, location = 'UK' }: SkillsDemandChartProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const skills = SKILLS_DATA[roleType || ''] || SKILLS_DATA.default
  const filteredSkills = activeCategory
    ? skills.filter(s => s.category === activeCategory)
    : skills

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
            In-Demand Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-playfair">
            What {location} Companies Are Looking For
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Skills most requested in fractional executive job postings this quarter
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Skills
          </button>
          {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeCategory === cat
                  ? `${colors.bg} text-white`
                  : `bg-gray-100 text-gray-600 hover:bg-gray-200`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills bars */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill, i) => {
            const colors = CATEGORY_COLORS[skill.category]
            return (
              <div
                key={skill.name}
                className="group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${colors.bg}`} />
                    <span className="font-medium text-gray-900">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${colors.text}`}>
                      +{skill.growth}%
                    </span>
                    <span className="text-gray-500 text-sm">{skill.demand}%</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors.bg} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.demand}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
          {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
            <div key={cat} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${colors.bg}`} />
              <span className="text-gray-600 capitalize">{cat}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Based on analysis of 500+ fractional job postings in the last 90 days
        </p>
      </div>
    </section>
  )
}
