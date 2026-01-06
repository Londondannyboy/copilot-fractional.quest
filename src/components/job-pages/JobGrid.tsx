"use client";

import { JobCard } from "@/components/ui";
import { Job } from "@/lib/jobs";

interface JobGridProps {
  jobs: Job[];
  title?: string;
  showAll?: boolean;
}

export function JobGrid({ jobs, title = "Latest Opportunities", showAll = false }: JobGridProps) {
  const displayJobs = showAll ? jobs : jobs.slice(0, 6);

  if (jobs.length === 0) {
    return (
      <section className="section">
        <div className="container-content text-center py-12">
          <p className="text-gray-500">No jobs found for this location.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container-content">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          {!showAll && jobs.length > 6 && (
            <span className="text-sm text-gray-500">
              Showing 6 of {jobs.length} jobs
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayJobs.map((job, i) => (
            <JobCard key={job.id || i} job={job} variant="featured" />
          ))}
        </div>

        {!showAll && jobs.length > 6 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg font-medium transition-colors">
              View All {jobs.length} Jobs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
