// src/vectorstore.ts
import { MongoClient } from "mongodb";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";

export async function getVectorStore() {
  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();

  const db = client.db("learnify");
  const collection = db.collection("project_embeddings");

  const embeddings = new OllamaEmbeddings({
    model: process.env.OLLAMA_MODEL || "llama3",
  });

  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection,
    indexName: "project_index",
    textKey: "text",
    embeddingKey: "embedding",
  });

  return vectorStore;
}
