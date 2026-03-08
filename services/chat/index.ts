import express from 'express';
import cors from "cors";
import ratelimit from "express-rate-limit";
import { CONFIG } from './src/config';
import { errorResponse } from './src/responses/error.response';
import { chatHandler } from './src/services/chat-handler';
import { successResponse } from './src/responses/success.response';

const app = express();
app.use(cors());
app.use(express.json());

const limiter = ratelimit({
    windowMs: CONFIG.rateLimit.window,
    max: CONFIG.rateLimit.max,
    handler: (req: Request, res: Response) => {
        return errorResponse(res, null, "Too many requests. Please try again in a minute!", 429)
    }
});

app.post("/api/chat", limiter, chatHandler)

app.get("/", (req: Request, res: Response) => {
    return successResponse(res, null, "Project service is running");
});

app.listen(CONFIG.port, async () => {
    console.log(`Chat app is running on port ${CONFIG.port}`);
});
