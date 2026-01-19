import { Router } from "express";
import { getAllBlogs, getAllHackathons, getAllIdeas, getAllProjects } from "../controllers/all.controller";
import { successResponse } from "../responses/success.response";

export const adminRouter = Router();

adminRouter.get("/health", async (req, res) => {
  successResponse(res, null, "Admin Service is healthy");
});

adminRouter.get("/get-projects", getAllProjects);

adminRouter.get("/get-ideas", getAllIdeas);

adminRouter.get("/get-blogs", getAllBlogs);

adminRouter.get("/get-hackathons", getAllHackathons)