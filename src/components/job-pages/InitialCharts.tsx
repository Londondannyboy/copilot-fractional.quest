"use client";

import { JobsPieChart, SalaryAreaChart } from "@/components/charts";
import { JobStats } from "@/lib/jobs";

interface InitialChartsProps {
  stats: JobStats;
  location: string;
}

export function InitialCharts({ stats, location }: InitialChartsProps) {
  // Add colors to role breakdown for pie chart
  const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];
  const pieData = stats.roleBreakdown.map((item, i) => ({
    ...item,
    fill: colors[i % colors.length],
  }));

  return (
    <section className="section-sm bg-gray-50">
      <div className="container-content">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Role distribution */}
          <div className="card p-6">
            <JobsPieChart
              data={pieData}
              title={`Roles in ${location}`}
              subtitle={`${stats.total} active positions`}
            />
          </div>

          {/* Salary ranges */}
          <div className="card p-6">
            <SalaryAreaChart
              data={stats.salaryRanges}
              title="Day Rates by Role"
              subtitle={`${location} market rates (£/day)`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
