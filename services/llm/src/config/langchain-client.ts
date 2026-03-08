// src/langchain-client.ts
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Ollama } from "@langchain/community/llms/ollama";
import { Document } from "@langchain/core/documents";
import { getVectorStore } from "./vectorstore";

export const llm = new Ollama({
  model: process.env.OLLAMA_MODEL || "llama3",
});

export const embeddings = new OllamaEmbeddings({
  model: process.env.OLLAMA_MODEL || "llama3",
});

export async function storeProjectEmbedding(project: any) {
  const vectorStore = await getVectorStore();

  const text = `
    Title: ${project.title}
    Abstract: ${project.abstract}
    Description: ${project.description}
    Domain: ${project.domain}
  `;

  const doc = new Document({ pageContent: text, metadata: { projectId: project.id } });

  await vectorStore.addDocuments([doc]);

  console.log("Embedding stored for project:", project.id);
}

export async function answerQuestion(question: string) {
  const vectorStore = await getVectorStore();

  const docs = await vectorStore.similaritySearch(question, 3);
  const context = docs.map(d => d.pageContent).join("\n\n");

  const prompt = `
  You are Learnify AI. Use the context below to answer.

  CONTEXT:
  ${context}

  QUESTION:
  ${question}
  `;

  const answer = await llm.invoke(prompt);
  return answer;
}
