import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../responses/error.response";

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("Error in Gateway:", err);

    const statusCode = err.statusCode || 500;

    return errorResponse(res, err.message || "Internal Server Error", statusCode);
}
