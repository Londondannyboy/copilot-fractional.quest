"use client";

import { useState } from "react";

interface Milestone {
  year: number;
  title: string;
  description: string;
  icon?: string;
  status?: "completed" | "current" | "future";
}

interface CareerTimelineProps {
  currentRole?: string;
  targetRole?: string;
  milestones?: Milestone[];
  userName?: string;
}

const defaultMilestones: Milestone[] = [
  {
    year: 2024,
    title: "Senior Marketing Leader",
    description: "Full-time role, building expertise",
    icon: "🎯",
    status: "completed",
  },
  {
    year: 2025,
    title: "First Fractional Role",
    description: "1-2 clients, establish credentials",
    icon: "🚀",
    status: "current",
  },
  {
    year: 2026,
    title: "Portfolio Fractional",
    description: "3-4 clients, stable income",
    icon: "📈",
    status: "future",
  },
  {
    year: 2027,
    title: "Thought Leader",
    description: "Speaking, writing, advisory board",
    icon: "🏆",
    status: "future",
  },
  {
    year: 2028,
    title: "Fractional Firm Founder",
    description: "Build team, scale practice",
    icon: "🏢",
    status: "future",
  },
];

/**
 * CareerTimeline - Visual career progression timeline
 *
 * Usage in MDX:
 * ```mdx
 * <CareerTimeline
 *   currentRole="Marketing Director"
 *   targetRole="Fractional CMO"
 *   milestones={[
 *     { year: 2025, title: "First Client", description: "Launch fractional practice" }
 *   ]}
 * />
 * ```
 */
export default function CareerTimeline({
  currentRole,
  targetRole,
  milestones = defaultMilestones,
  userName,
}: CareerTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 my-8 shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full mb-4">
          <span className="text-emerald-400 text-sm font-medium">
            {userName ? `${userName}'s Career Path` : "Your Career Path"}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {currentRole && targetRole
            ? `From ${currentRole} to ${targetRole}`
            : "Your Fractional Journey"}
        </h3>
        <p className="text-gray-400">
          A roadmap to building your portfolio career
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700 -translate-x-1/2" />

        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={milestone.year}
                className="relative flex items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left Side */}
                <div
                  className={`w-1/2 pr-8 ${isLeft ? "text-right" : "invisible"}`}
                >
                  {isLeft && (
                    <div
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        milestone.status === "completed"
                          ? "bg-emerald-500/10 border border-emerald-500/30"
                          : milestone.status === "current"
                          ? "bg-blue-500/10 border border-blue-500/30"
                          : "bg-gray-800/50 border border-gray-700"
                      } ${isHovered ? "scale-105 shadow-lg" : ""}`}
                    >
                      <div className="text-sm text-gray-400 mb-1">
                        {milestone.year}
                      </div>
                      <div className="font-semibold text-white mb-1">
                        {milestone.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {milestone.description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                      milestone.status === "completed"
                        ? "bg-emerald-500"
                        : milestone.status === "current"
                        ? "bg-blue-500 ring-4 ring-blue-500/30"
                        : "bg-gray-700"
                    } ${isHovered ? "scale-125" : ""}`}
                  >
                    {milestone.icon || "📌"}
                  </div>
                </div>

                {/* Right Side */}
                <div
                  className={`w-1/2 pl-8 ${!isLeft ? "text-left" : "invisible"}`}
                >
                  {!isLeft && (
                    <div
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        milestone.status === "completed"
                          ? "bg-emerald-500/10 border border-emerald-500/30"
                          : milestone.status === "current"
                          ? "bg-blue-500/10 border border-blue-500/30"
                          : "bg-gray-800/50 border border-gray-700"
                      } ${isHovered ? "scale-105 shadow-lg" : ""}`}
                    >
                      <div className="text-sm text-gray-400 mb-1">
                        {milestone.year}
                      </div>
                      <div className="font-semibold text-white mb-1">
                        {milestone.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {milestone.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-sm text-gray-400">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-600" />
          <span className="text-sm text-gray-400">Future</span>
        </div>
      </div>
    </div>
  );
}
