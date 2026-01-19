import type { Request, Response } from "express";
import { getAllProjects } from "../controllers/project.controller";
import { successResponse } from "../responses/success.response";
import { errorResponse } from "../responses/error.response";

export const getAllProjectsExpress = async (req: Request, res: Response) => {
    try {
        const result = await getAllProjects();
        return successResponse(res, result, "Projects fetched successfully");
    } catch (err) {
        return errorResponse(res, err, "Failed to fetch projects");
    }
};
