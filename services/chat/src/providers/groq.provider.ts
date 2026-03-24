import OpenAI from "openai"
import { CONFIG } from "../config"

export class GroqProvider {
    name = "Groq"

    private client = new OpenAI({
        apiKey: CONFIG.groq.apiKey,
        baseURL: CONFIG.groq.baseUrl
    })

    async generate(messages: any[]) {
        const res = await this.client.chat.completions.create({
            model: CONFIG.groq.model,
            messages,
            max_tokens: 75, 
        })

        return res.choices[0].message.content || ""
    }
}