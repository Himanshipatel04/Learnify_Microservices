import type { Request, Response, NextFunction } from "express";
import { getAllBlogs } from "../../controllers/blogs.controller";
import { successResponse } from "../../responses/success.response";
import { errorResponse } from "../../responses/error.response";

export const getAllBlogsExpress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await getAllBlogs();
        return successResponse(res, { data: blogs }, "Fetched all blogs successfully", 200);
    } catch (error) {
        return errorResponse(res, { error }, "Failed to fetch blogs", 500);
    }
}