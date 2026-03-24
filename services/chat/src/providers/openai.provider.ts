import OpenAI from "openai"
import { CONFIG } from "../config"


export class OpenAIProvider {
  name = "OpenAI"

  private client = new OpenAI({
    apiKey: CONFIG.openai.apiKey
  })

  async generate(messages: any[]) {
    const res = await this.client.chat.completions.create({
      model: CONFIG.openai.model,
      messages
    })

    return res.choices[0].message.content || ""
  }
}