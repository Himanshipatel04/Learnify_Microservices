// src/ollamaClient.ts
import fetch from "node-fetch";

export async function generateEmbedding(text: string) {
  const res = await fetch("http://localhost:11434/api/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "nomic-embed-text", prompt: text }),
  });
  const data = await res.json();
  return data.embedding;
}

export async function generateText(prompt: string) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "llama3", prompt }),
  });
  const data = await res.json();
  return data.response;
}
