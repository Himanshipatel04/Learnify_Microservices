// hooks/useChat.ts
import { useState, useCallback, useRef } from "react";
import { sendMessage, type ChatMessage } from "../services/chatService";


export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  provider?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const simulateStreaming = useCallback(
    (assistantId: string, fullContent: string, provider: string) => {
      const words = fullContent.split(" ");
      let wordIndex = 0;

      streamIntervalRef.current = setInterval(() => {
        wordIndex++;
        const currentContent = words.slice(0, wordIndex).join(" ");
        const isLast = wordIndex >= words.length;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: currentContent, isStreaming: !isLast, provider: isLast ? provider : undefined }
              : msg
          )
        );

        if (isLast && streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
          setIsLoading(false);
        }
      }, 40);
    },
    []
  );

  const sendUserMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;
      setError(null);

      const userMessage: Message = { id: `user-${Date.now()}`, role: "user", content: content.trim() };
      const assistantId = `assistant-${Date.now()}`;
      const assistantPlaceholder: Message = { id: assistantId, role: "assistant", content: "", isStreaming: true };

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setIsLoading(true);

      const history: ChatMessage[] = [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: content.trim() },
      ];

      try {
        const response = await sendMessage(history);
        if (!response.success) throw new Error(response.message || "Unknown error");
        simulateStreaming(assistantId, response.data.content, response.data.provider);
      } catch (err) {
        setIsLoading(false);
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    },
    [messages, isLoading, simulateStreaming]
  );

  const clearChat = useCallback(() => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, sendUserMessage, clearChat };
}