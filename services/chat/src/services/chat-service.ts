import { GeminiProvider } from "../providers/gemini.provider"
import { GroqProvider } from "../providers/groq.provider"
import { OpenAIProvider } from "../providers/openai.provider"

const providers = [
    new GroqProvider(),
    new OpenAIProvider(),
    new GeminiProvider(),
]

export const fetchResponse = async (messages: any[]) => {

    for (const provider of providers) {
        try {
            const content = await provider.generate(messages)

            return {
                provider: provider.name,
                content
            }

        } catch (err) {
            console.log(provider.name + " failed", err)
        }
    }

    throw new Error("All AI providers failed")
}