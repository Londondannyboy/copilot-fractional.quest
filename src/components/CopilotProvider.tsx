'use client';

import { CopilotKit } from '@copilotkit/react-core';

interface CopilotProviderProps {
  children: React.ReactNode;
}

// Reusable CopilotKit provider for pages that need AI chat
// Import this and wrap your page content to enable CopilotKit features
export function CopilotProvider({ children }: CopilotProviderProps) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="my_agent">
      {children}
    </CopilotKit>
  );
}
