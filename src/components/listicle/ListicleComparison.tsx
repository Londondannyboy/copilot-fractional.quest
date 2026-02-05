"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ListicleItem } from "./InteractiveListicle";

interface ListicleComparisonProps {
  items: ListicleItem[];
  onClose: () => void;
}

export function ListicleComparison({ items, onClose }: ListicleComparisonProps) {
  if (items.length === 0) return null;

  const features = [
    { key: "fee", label: "Placement Fee" },
    { key: "placement", label: "Time to Place" },
    { key: "speciality", label: "Speciality" },
    { key: "badge", label: "Best For" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Compare Agencies
              </h3>
              <p className="text-sm text-gray-500">
                Side-by-side comparison of {items.length} selected agencies
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Comparison Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    {items.map((item) => (
                      <th
                        key={item.name}
                        className={`text-left py-3 px-4 ${
                          item.highlight ? "bg-emerald-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              item.highlight ? "bg-emerald-600" : "bg-gray-700"
                            }`}
                          >
                            #{item.rank}
                          </span>
                          <div>
                            <div className="font-bold text-gray-900">
                              {item.name}
                            </div>
                            <div
                              className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                                item.highlight
                                  ? "bg-emerald-600 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {item.badge}
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {features.map((feature) => (
                    <tr key={feature.key}>
                      <td className="py-4 px-4 text-sm font-medium text-gray-500">
                        {feature.label}
                      </td>
                      {items.map((item) => {
                        const value = item[feature.key as keyof ListicleItem];
                        const isLowestFee =
                          feature.key === "fee" &&
                          items.every(
                            (i) =>
                              parseInt(String(item.fee).match(/\d+/)?.[0] || "0") <=
                              parseInt(String(i.fee).match(/\d+/)?.[0] || "0")
                          );
                        const isFastest =
                          feature.key === "placement" &&
                          items.every(
                            (i) =>
                              parseInt(String(item.placement).match(/\d+/)?.[0] || "0") <=
                              parseInt(String(i.placement).match(/\d+/)?.[0] || "0")
                          );

                        return (
                          <td
                            key={`${item.name}-${feature.key}`}
                            className={`py-4 px-4 ${
                              item.highlight ? "bg-emerald-50" : ""
                            }`}
                          >
                            <span
                              className={`${
                                isLowestFee || isFastest
                                  ? "text-emerald-600 font-bold"
                                  : "text-gray-900"
                              }`}
                            >
                              {String(value)}
                              {(isLowestFee || isFastest) && (
                                <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                  Best
                                </span>
                              )}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Description Row */}
                  <tr>
                    <td className="py-4 px-4 text-sm font-medium text-gray-500">
                      Description
                    </td>
                    {items.map((item) => (
                      <td
                        key={`${item.name}-desc`}
                        className={`py-4 px-4 text-sm text-gray-600 ${
                          item.highlight ? "bg-emerald-50" : ""
                        }`}
                      >
                        {item.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">Our Recommendation</h4>
                  <p className="text-emerald-700 text-sm mt-1">
                    {items.find((i) => i.highlight)
                      ? `${items.find((i) => i.highlight)?.name} offers the best value with lower fees and faster placement times.`
                      : `Based on your comparison, consider factors most important to you: cost (fee %) vs speed (placement time) vs specialization.`}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
