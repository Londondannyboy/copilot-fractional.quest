'use client'

import { useState, useMemo } from 'react'

interface SavingsCalculatorProps {
  location?: string
}

export function SavingsCalculator({ location = 'London' }: SavingsCalculatorProps) {
  // Start with more accessible defaults - £80k salary is common entry point
  const [fullTimeSalary, setFullTimeSalary] = useState(80000)
  const [daysPerWeek, setDaysPerWeek] = useState(2)
  const [dayRate, setDayRate] = useState(850)

  const calculations = useMemo(() => {
    // Full-time costs
    const employerNI = fullTimeSalary * 0.138 // 13.8% employer NI
    const pensionContribution = fullTimeSalary * 0.05 // 5% pension
    const benefits = fullTimeSalary * 0.1 // ~10% for benefits, equipment, etc.
    const recruitmentCost = fullTimeSalary * 0.25 // 25% recruitment fee (one-time, amortized over 3 years)
    const totalFullTimeCost = fullTimeSalary + employerNI + pensionContribution + benefits + (recruitmentCost / 3)

    // Fractional costs
    const weeksPerYear = 48 // Accounting for holidays
    const fractionalAnnualCost = dayRate * daysPerWeek * weeksPerYear

    // Savings
    const annualSavings = totalFullTimeCost - fractionalAnnualCost
    const savingsPercent = ((annualSavings / totalFullTimeCost) * 100).toFixed(0)

    return {
      totalFullTimeCost: Math.round(totalFullTimeCost),
      fractionalAnnualCost: Math.round(fractionalAnnualCost),
      annualSavings: Math.round(annualSavings),
      savingsPercent,
      employerNI: Math.round(employerNI),
      pensionContribution: Math.round(pensionContribution),
      benefits: Math.round(benefits),
    }
  }, [fullTimeSalary, daysPerWeek, dayRate])

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
            Cost Comparison
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 font-playfair">
            Fractional vs Full-Time Savings Calculator
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            See how much your {location} business could save with fractional executive talent
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* Inputs */}
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Adjust Your Scenario</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="savings-ft-salary" className="block text-sm font-medium text-gray-700 mb-2">
                    Full-Time Executive Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                    <input
                      id="savings-ft-salary"
                      type="range"
                      min="40000"
                      max="250000"
                      step="5000"
                      value={fullTimeSalary}
                      onChange={(e) => setFullTimeSalary(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      aria-label="Full-time executive salary slider"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1">
                      <span>£40k</span>
                      <span className="font-semibold text-emerald-700">£{(fullTimeSalary / 1000).toFixed(0)}k/year</span>
                      <span>£250k</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fractional Days Per Week
                  </label>
                  <div className="grid grid-cols-4 gap-1 sm:gap-2">
                    {[1, 2, 3, 4].map((days) => (
                      <button
                        key={days}
                        onClick={() => setDaysPerWeek(days)}
                        className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                          daysPerWeek === days
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {days}d
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="savings-day-rate" className="block text-sm font-medium text-gray-700 mb-2">
                    Fractional Day Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                    <input
                      id="savings-day-rate"
                      type="range"
                      min="500"
                      max="1500"
                      step="50"
                      value={dayRate}
                      onChange={(e) => setDayRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      aria-label="Fractional day rate slider"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1">
                      <span>£500</span>
                      <span className="font-semibold text-emerald-700">£{dayRate}/day</span>
                      <span>£1,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Your Potential Savings</h3>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Full-Time Total Cost</div>
                  <div className="text-2xl font-bold text-gray-900">
                    £{calculations.totalFullTimeCost.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/year</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Includes salary + NI + pension + benefits + recruitment
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Fractional Cost ({daysPerWeek}d/week)</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    £{calculations.fractionalAnnualCost.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/year</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    £{dayRate} × {daysPerWeek} days × 48 weeks
                  </div>
                </div>

                <div className="bg-emerald-600 rounded-xl p-4 text-white">
                  <div className="text-sm text-emerald-100 mb-1">Annual Savings</div>
                  <div className="text-3xl font-bold">
                    £{calculations.annualSavings.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-white/20 px-2 py-1 rounded text-sm font-semibold">
                      {calculations.savingsPercent}% saved
                    </span>
                    <span className="text-emerald-100 text-sm">vs full-time hire</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">💡</span>
                  <div className="text-sm text-amber-800">
                    <strong>Plus:</strong> Fractional executives bring multi-company experience,
                    start immediately, and scale up/down as needed.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Calculations are estimates. Actual costs vary based on specific arrangements and IR35 status.
        </p>
      </div>
    </section>
  )
}
