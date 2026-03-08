// src/index.ts
import dotenv from "dotenv";
import { startConsumer } from "./src/config/kafka-consumer.js";

dotenv.config();



console.log("🚀 LLM Microservice starting...");
startConsumer();
