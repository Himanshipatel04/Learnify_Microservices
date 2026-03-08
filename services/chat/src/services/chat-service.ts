import OpenAI from 'openai';
import { CONFIG } from "../config";

const openai = new OpenAI({ apiKey: CONFIG.openai.apiKey })
const gemini = new OpenAI({ apiKey: CONFIG.gemini.apiKey, baseURL: CONFIG.gemini.baseUrl })

export const fetchResponse = async (messages: any[]) => {
    try {
        const completion = await gemini.chat.completions.create({
            model: CONFIG.gemini.model,
            messages
        })
        console.log(completion);
        return {
            content: completion.choices[0].message.content,
            provider: 'Gemini'
        }
    }
    catch (error: any) {
        console.log("GEMINI Failed - Using OPENAI")
        try {
            const completion = await openai.chat.completions.create({
                model: CONFIG.openai.model,
                messages,
            });
            return {
                content: completion.choices[0].message.content,
                provider: 'OpenAI'
            };
        } catch (error: any) {
            throw new Error("All AI providers are currently exhausted.");
        }
    }
}