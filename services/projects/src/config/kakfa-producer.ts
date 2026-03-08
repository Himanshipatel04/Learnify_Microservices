import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "projects-service",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
}

export async function sendNewContentMessage(contentId: string, type: string, text: string) {
  await producer.send({
    topic: "new-content",
    messages: [
      { value: JSON.stringify({ contentId, type, text }) }
    ]
  });
}
