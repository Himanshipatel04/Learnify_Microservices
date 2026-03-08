import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
    port: process.env.PORT || 10000,
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4o'
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY || '',
        model: 'gemini-1.5-flash',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    },
    rateLimit: {
        window: 60 * 1000,
        max: 5
    }
}

if (!CONFIG.gemini.apiKey || !CONFIG.openai.apiKey){
    console.warn("Warning: One or more API keys are missing in .env!")
}