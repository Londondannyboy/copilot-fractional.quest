"use client";

import { motion } from "framer-motion";

interface ListicleFiltersProps {
  feeFilter: string | null;
  setFeeFilter: (filter: string | null) => void;
  timeFilter: string | null;
  setTimeFilter: (filter: string | null) => void;
}

const feeOptions = [
  { value: "low", label: "10-20%", description: "Best value" },
  { value: "mid", label: "20-30%", description: "Mid-range" },
  { value: "high", label: "30%+", description: "Premium" },
];

const timeOptions = [
  { value: "fast", label: "<6 weeks", description: "Fastest" },
  { value: "medium", label: "6-12 weeks", description: "Standard" },
  { value: "slow", label: "12+ weeks", description: "Thorough" },
];

export function ListicleFilters({
  feeFilter,
  setFeeFilter,
  timeFilter,
  setTimeFilter,
}: ListicleFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Fee Filters */}
      <div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
          Fee Range
        </span>
        <div className="flex flex-wrap gap-2">
          {feeOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setFeeFilter(feeFilter === option.value ? null : option.value)
              }
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                feeFilter === option.value
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Filters */}
      <div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
          Placement Time
        </span>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setTimeFilter(timeFilter === option.value ? null : option.value)
              }
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                timeFilter === option.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
