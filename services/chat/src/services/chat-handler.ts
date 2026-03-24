import { errorResponse } from "../responses/error.response";
import { successResponse } from "../responses/success.response";
import { fetchResponse } from "./chat-service";

export const chatHandler = async (req: any, res: any) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return errorResponse(res, null, "Invalid messages array provided", 400);
    }
    const messagesWithContext = [
        { role: 'system', content: process.env.PLATFORM_CONTEXT },
        ...messages
    ]
    try {
        const aiData = await fetchResponse(messagesWithContext);

        return successResponse(res, {
            content: aiData.content,
            provider: aiData.provider
        }, "AI response generated successfully")
    }
    catch (error) {
        return errorResponse(res, error, error.message || "An unexpected error occurred", 503)
    }
}