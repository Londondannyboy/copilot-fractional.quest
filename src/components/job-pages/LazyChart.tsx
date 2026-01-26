"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading skeleton for the chart
function ChartSkeleton() {
  return (
    <div className="h-72 sm:h-80 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading chart...</div>
    </div>
  );
}

// Dynamically import Recharts to reduce initial bundle
const RechartsBarChart = dynamic(
  () => import('recharts').then((mod) => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } = mod;

    // Return a component that uses these
    return function DayRateChart({ rates }: { rates: Array<{ role: string; range: string; typical: string }> }) {
      const chartData = rates.map(rate => ({
        name: rate.role,
        min: parseInt(rate.range.match(/£([\d,]+)/)?.[1]?.replace(',', '') || '0'),
        typical: parseInt(rate.typical.replace(/[£,]/g, '')),
        max: parseInt(rate.range.match(/£[\d,]+ - £([\d,]+)/)?.[1]?.replace(',', '') || '0'),
      }));

      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `£${v}`}
              domain={[0, 'dataMax + 200']}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 12, fontWeight: 500 }}
              width={70}
            />
            <Tooltip
              formatter={(value) => value !== undefined ? [`£${Number(value).toLocaleString()}/day`, ''] : ['', '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="typical" fill="#059669" radius={[0, 4, 4, 0]} name="Typical Rate">
              {rates.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#059669' : '#10b981'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    };
  }),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

interface LazyChartProps {
  rates: Array<{ role: string; range: string; typical: string }>;
}

export function LazyDayRateChart({ rates }: LazyChartProps) {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <RechartsBarChart rates={rates} />
    </Suspense>
  );
}
