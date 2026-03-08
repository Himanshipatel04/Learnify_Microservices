import type { Request, Response } from "express";
import { fetchAllProjects } from "../services/project.service";
import { successResponse } from "../responses/success.response";
import { errorResponse } from "../responses/error.response";

export const getAllProjects = async () => {
    const projects = await fetchAllProjects();
    return { projects };
};