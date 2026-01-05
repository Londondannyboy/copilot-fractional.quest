"use client";

import { AgentState } from "@/lib/types";

export function JobsCard({
  state,
}: {
  state: AgentState;
}) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {state?.search_query ? `Jobs: "${state.search_query}"` : "Fractional Jobs"}
      </h2>

      {!state?.jobs?.length ? (
        <p className="text-gray-500 text-sm">
          Ask me to search for jobs! Try "Find CFO jobs" or "Show me London roles"
        </p>
      ) : (
        <ul className="space-y-3">
          {(state?.jobs || []).map((job, i) => (
            <li key={i} className="border-l-4 border-indigo-500 pl-3 py-1">
              <p className="font-medium text-gray-800 text-sm">{job.title}</p>
              <p className="text-gray-600 text-xs">{job.company}</p>
              <p className="text-gray-400 text-xs">{job.location}</p>
            </li>
          ))}
        </ul>
      )}

      <p className="text-gray-400 text-xs mt-4">
        {state?.jobs?.length || 0} jobs loaded
      </p>
    </div>
  );
}
