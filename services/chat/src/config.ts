import "dotenv/config"

export const CONFIG = {
    port: process.env.PORT || 10000,
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4o'
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY || '',
        model: 'gemini-2.0-flash',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    },
     groq: {
        apiKey: process.env.GROQ_API_KEY || '',
        model: 'llama-3.3-70b-versatile',
        baseUrl: 'https://api.groq.com/openai/v1'
    },
    rateLimit: {
        window: 60 * 1000,
        max: 10
    }
}

if (!CONFIG.gemini.apiKey || !CONFIG.openai.apiKey){
    console.warn("Warning: One or more API keys are missing in .env!")
}