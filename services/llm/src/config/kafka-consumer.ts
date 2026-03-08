import { Kafka } from "kafkajs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getVectorStore } from "./vectorstore";

export async function startConsumer() {
  const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "llm", requestTimeout: 30000 });
  const consumer = kafka.consumer({ groupId: "rag-group" });

  await consumer.connect();
  
 await consumer.subscribe({ topic: "projects", fromBeginning: true });

  const vectorStore = await getVectorStore();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const text = message.value?.toString();
      if (!text) return;

      const docs = await splitter.createDocuments([text]);
      await vectorStore.addDocuments(docs);

      console.log("Embedded + stored");
    }
  });
}
