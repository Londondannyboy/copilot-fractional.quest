"use client";

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description?: string;
  url?: string;
  postedDate?: string;
  roleType?: string;
}

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function JobCard({ job, variant = "default", className = "" }: JobCardProps) {
  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${className}`}>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
            {job.location}
          </span>
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              View
            </a>
          )}
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className={`card card-hover p-6 ${className}`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
          {job.roleType && (
            <span className="text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full font-medium">
              {job.roleType}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <span>📍</span> {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1">
              <span>💰</span> {job.salary}
            </span>
          )}
        </div>

        {job.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {job.description}
          </p>
        )}

        <div className="flex gap-2">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Apply Now
            </a>
          )}
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Save
          </button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{job.title}</h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {job.location}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{job.company}</p>
      {job.salary && (
        <p className="text-sm font-medium text-[var(--color-primary)]">{job.salary}</p>
      )}
      {job.url && (
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-[var(--color-primary)] hover:underline"
        >
          View Details →
        </a>
      )}
    </div>
  );
}
