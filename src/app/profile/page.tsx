'use client';

import { UserButton, RedirectToSignIn, SignedIn, SignedOut, AccountSettingsCards } from '@neondatabase/neon-js/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import { useEffect, useState } from 'react';

type SavedJob = {
  id: number;
  title: string;
  company: string;
  location: string;
  saved_at: string;
};

type ZepFact = {
  fact: string;
  created_at?: string;
};

export default function ProfilePage() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [zepFacts, setZepFacts] = useState<ZepFact[]>([]);
  const [zepLoading, setZepLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      // Fetch saved jobs
      fetch(`/api/saved-jobs?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setSavedJobs(data.jobs || []);
          setJobsLoading(false);
        })
        .catch(() => setJobsLoading(false));

      // Fetch Zep memory facts
      fetch(`/api/zep-context?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setZepFacts(data.facts || []);
          setZepLoading(false);
        })
        .catch(() => setZepLoading(false));
    } else {
      setJobsLoading(false);
      setZepLoading(false);
    }
  }, [user?.id]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Signed Out - Redirect to sign in */}
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>

        {/* Signed In State */}
        <SignedIn>
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <UserButton />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome, {user?.name || user?.email || 'User'}
                  </h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  ← Back to Chat
                </a>
                <button
                  onClick={() => authClient.signOut()}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings - Edit profile, change name, etc */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <AccountSettingsCards />
          </div>

          {/* Zep Memory - What AI remembers about you */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your AI Memory</h2>
                <p className="text-gray-500 text-sm mt-1">What the voice assistant remembers from your conversations</p>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                Powered by Zep
              </span>
            </div>

            {zepLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              </div>
            ) : zepFacts.length > 0 ? (
              <div className="space-y-3">
                {zepFacts.map((fact, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl group hover:bg-purple-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-purple-500 mt-0.5">🧠</span>
                      <div>
                        <p className="text-gray-800">{fact.fact}</p>
                        {fact.created_at && (
                          <p className="text-xs text-gray-400 mt-1">
                            Learned {new Date(fact.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                        title="Confirm this is correct"
                      >
                        ✓ Correct
                      </button>
                      <button
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                        title="This isn't right"
                      >
                        ✗ Wrong
                      </button>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Memory is automatically updated from your voice conversations
                </p>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <span className="text-4xl mb-4 block">🧠</span>
                <p className="text-gray-500 mb-2">No memories yet</p>
                <p className="text-gray-400 text-sm">
                  Start a voice conversation and I&apos;ll remember your preferences
                </p>
              </div>
            )}
          </div>

          {/* Saved Jobs */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Jobs</h2>

            {jobsLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : savedJobs.length > 0 ? (
              <div className="space-y-4">
                {savedJobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                    <p className="text-xs text-gray-400 mt-2">Saved {new Date(job.saved_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No saved jobs yet</p>
                <a href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Start exploring jobs →
                </a>
              </div>
            )}
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
