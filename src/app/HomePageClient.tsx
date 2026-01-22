"use client";

// Performance-optimized HomePageClient
// - CopilotKit (~1MB bundle) is only loaded when user is signed in
// - Non-signed-in users see lightweight PublicLanding component
// - This dramatically improves initial page load performance

import dynamic from "next/dynamic";
import { PublicLanding } from "@/components/PublicLanding";
import { authClient } from "@/lib/auth/client";

// Loading component for when CopilotKit is being loaded
function AuthenticatedLoadingState() {
  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <nav className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 shrink-0">
        <div className="text-white font-bold text-lg">Fractional Quest</div>
        <div className="text-gray-400 text-sm">Loading...</div>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your workspace...</p>
        </div>
      </div>
    </div>
  );
}

// Dynamically import CopilotKit content - only loaded when user is signed in
// This prevents the ~1MB CopilotKit bundle from loading for non-signed-in users
const HomePageCopilotContent = dynamic(
  () => import("./HomePageCopilotContent"),
  {
    ssr: false,
    loading: () => <AuthenticatedLoadingState />,
  }
);

export default function HomePageClient() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(' ')[0] || null;

  // Show loading state while checking auth
  if (isSessionLoading) {
    return (
      <div className="h-screen flex flex-col bg-gray-900">
        <nav className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 shrink-0">
          <div className="text-white font-bold text-lg">Fractional Quest</div>
          <div className="text-gray-400 text-sm">...</div>
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  // If not signed in, show the lightweight public landing page
  // This path does NOT load the CopilotKit bundle
  if (!user) {
    return <PublicLanding />;
  }

  // User is signed in - load the full CopilotKit experience
  // The dynamic import ensures CopilotKit is only loaded at this point
  return (
    <HomePageCopilotContent
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
      }}
      firstName={firstName}
    />
  );
}
