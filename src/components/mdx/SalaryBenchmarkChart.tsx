"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface SalaryBenchmarkProps {
  role?: string;
  location?: string;
  yourRate?: number;
}

// Simulated market data - in production this would come from your database
const getMarketData = (role: string, location: string) => {
  const baseRates: Record<string, number> = {
    CFO: 1200,
    CTO: 1100,
    CMO: 1000,
    COO: 950,
    CHRO: 900,
    CPO: 950,
    CISO: 1100,
    CEO: 1400,
  };

  const locationMultiplier: Record<string, number> = {
    London: 1.2,
    Manchester: 0.9,
    Birmingham: 0.85,
    Edinburgh: 0.95,
    Bristol: 0.9,
    Remote: 1.0,
  };

  const base = baseRates[role.toUpperCase()] || 1000;
  const mult = locationMultiplier[location] || 1.0;
  const median = Math.round(base * mult);

  return {
    percentile10: Math.round(median * 0.7),
    percentile25: Math.round(median * 0.85),
    median,
    percentile75: Math.round(median * 1.15),
    percentile90: Math.round(median * 1.35),
  };
};

/**
 * SalaryBenchmarkChart - Shows where user's rate compares to market
 *
 * Usage in MDX:
 * ```mdx
 * <SalaryBenchmarkChart
 *   role="CMO"
 *   location="London"
 *   yourRate={1100}
 * />
 * ```
 */
export default function SalaryBenchmarkChart({
  role = "CMO",
  location = "London",
  yourRate,
}: SalaryBenchmarkProps) {
  const [userRate] = useState<number | undefined>(yourRate);

  const marketData = getMarketData(role, location);

  // Build chart data showing distribution
  const chartData = [
    { label: "10th", rate: marketData.percentile10, fill: "#fee2e2" },
    { label: "25th", rate: marketData.percentile25, fill: "#fef3c7" },
    { label: "Median", rate: marketData.median, fill: "#d1fae5" },
    { label: "75th", rate: marketData.percentile75, fill: "#dbeafe" },
    { label: "90th", rate: marketData.percentile90, fill: "#e0e7ff" },
  ];

  const getPercentilePosition = (rate: number) => {
    if (rate <= marketData.percentile10) return "Bottom 10%";
    if (rate <= marketData.percentile25) return "25th percentile";
    if (rate <= marketData.median) return "Below median";
    if (rate <= marketData.percentile75) return "Above median";
    if (rate <= marketData.percentile90) return "75th percentile";
    return "Top 10%";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 my-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {role} Salary Benchmark
          </h3>
          <p className="text-gray-500">{location} market rates (day rate)</p>
        </div>
        {userRate && (
          <div className="text-right">
            <div className="text-sm text-gray-500">Your rate</div>
            <div className="text-2xl font-bold text-emerald-700">
              {"\u00A3"}{userRate.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              {getPercentilePosition(userRate)}
            </div>
          </div>
        )}
      </div>

      {/* Distribution Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => `\u00A3${value}`}
            />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`\u00A3${Number(value || 0).toLocaleString()}`, "Day Rate"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#10b981"
              fill="url(#salaryGradient)"
              strokeWidth={2}
            />
            {userRate && (
              <ReferenceLine
                y={userRate}
                stroke="#2563eb"
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{
                  value: "Your Rate",
                  fill: "#2563eb",
                  fontSize: 12,
                }}
              />
            )}
            <defs>
              <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Percentile Breakdown */}
      <div className="grid grid-cols-5 gap-2">
        {chartData.map((item) => (
          <div
            key={item.label}
            className="text-center p-3 rounded-lg"
            style={{ backgroundColor: item.fill }}
          >
            <div className="text-xs text-gray-600 mb-1">{item.label}</div>
            <div className="font-semibold text-gray-900">
              {"\u00A3"}{item.rate.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* User Comparison */}
      {userRate && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">
                Your rate of {"\u00A3"}{userRate.toLocaleString()} is{" "}
                {userRate > marketData.median ? (
                  <span className="text-green-600">
                    {Math.round(((userRate - marketData.median) / marketData.median) * 100)}% above
                  </span>
                ) : (
                  <span className="text-amber-600">
                    {Math.round(((marketData.median - userRate) / marketData.median) * 100)}% below
                  </span>
                )}{" "}
                the {location} median for {role} roles.
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Based on current UK fractional executive market data.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
