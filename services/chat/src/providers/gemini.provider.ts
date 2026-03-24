import OpenAI from "openai"
import { CONFIG } from "../config"

export class GeminiProvider {
  name = "Gemini"

  private client = new OpenAI({
    apiKey: CONFIG.gemini.apiKey,
    baseURL: CONFIG.gemini.baseUrl
  })

  async generate(messages: any[]) {
    const res = await this.client.chat.completions.create({
      model: CONFIG.gemini.model,
      messages
    })

    return res.choices[0].message.content || ""
  }
}