import { Router } from "express";
import { getAllProjectsExpress } from "../handlers/projects.express.handler";
import { successResponse } from "../responses/success.response";

export const projectRouter = Router();

projectRouter.get("/all", getAllProjectsExpress)