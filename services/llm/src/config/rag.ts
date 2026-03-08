import { OllamaEmbeddings, Ollama } from "@langchain/ollama";
import { getVectorStore } from "./vectorstore";

export async function askLLM(query: string) {
  const vectorStore = await getVectorStore();

  const results = await vectorStore.similaritySearch(query, 5);

  const context = results.map(r => r.pageContent).join("\n");

  const llm = new Ollama({
    model: process.env.OLLAMA_MODEL || "llama3"
  });

  const response = await llm.invoke(
    `Use this context:\n${context}\n\nUser question: ${query}`
  );

  return response;
}
