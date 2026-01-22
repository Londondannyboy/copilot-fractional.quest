'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';

// Auth provider only - CopilotKit moved to page-level for performance
// Pages that need AI chat import CopilotProvider separately
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      redirectTo="/"
      social={{ providers: ['google'] }}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
