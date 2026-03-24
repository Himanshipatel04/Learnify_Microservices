// services/chatService.ts

import { baseUrl } from "../config/config";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatApiResponse {
  success: boolean;
  message: string;
  data: {
    content: string;
    provider: string;
  };
}

export async function sendMessage(
  messages: ChatMessage[],
): Promise<ChatApiResponse> {
  console.log("here");
  const response = await fetch(`${baseUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
