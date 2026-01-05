"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";

// Inner component using voice hook
function VoiceButton({ onMessage }: { onMessage: (text: string) => void }) {
  const { connect, disconnect, status, messages, error } = useVoice();
  const [isPending, setIsPending] = useState(false);
  const lastSentMsgId = useRef<string | null>(null);

  // Debug logging
  useEffect(() => {
    console.log("🔊 Voice status:", status.value, error);
  }, [status, error]);

  // Forward ONLY new user messages to CopilotKit (avoid duplicates)
  useEffect(() => {
    const userMsgs = messages.filter(
      (m: any) => m.type === "user_message" && m.message?.content
    );
    if (userMsgs.length > 0) {
      const lastMsg = userMsgs[userMsgs.length - 1] as any;
      const msgId = lastMsg?.id || `${userMsgs.length}-${lastMsg?.message?.content}`;

      // Only send if this is a new message we haven't sent before
      if (lastMsg?.message?.content && msgId !== lastSentMsgId.current) {
        console.log("🎤 Forwarding to CopilotKit:", lastMsg.message.content);
        lastSentMsgId.current = msgId;
        onMessage(lastMsg.message.content);
      }
    }
  }, [messages, onMessage]);

  const handleToggle = useCallback(async () => {
    if (status.value === "connected") {
      disconnect();
    } else {
      setIsPending(true);
      try {
        console.log("🎤 Fetching Hume token...");
        const res = await fetch("/api/hume-token");
        const { accessToken } = await res.json();
        console.log("🎤 Got token, connecting with configId...");
        await connect({
          auth: { type: "accessToken", value: accessToken },
          configId: "acb5575c-e22f-44c0-a9c8-b03305d1ea92"  // CLM using simple-clm.vercel.app
        });
        console.log("🎤 Connect call completed");
      } catch (e) {
        console.error("Voice connect error:", e);
      } finally {
        setIsPending(false);
      }
    }
  }, [connect, disconnect, status.value]);

  const isConnected = status.value === "connected";

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
        isConnected
          ? "bg-red-500 hover:bg-red-600 animate-pulse"
          : isPending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
      title={isConnected ? "Stop listening" : "Start voice input"}
    >
      {isPending ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isConnected ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10h6v4H9z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          )}
        </svg>
      )}
    </button>
  );
}

// Exported component with VoiceProvider
export function VoiceInput({ onMessage }: { onMessage: (text: string) => void }) {
  return (
    <VoiceProvider
      onError={(err) => console.error("🔴 Hume Error:", err)}
      onOpen={() => console.log("🟢 Hume connected")}
      onClose={(e) => console.log("🟡 Hume closed:", e)}
    >
      <VoiceButton onMessage={onMessage} />
    </VoiceProvider>
  );
}
