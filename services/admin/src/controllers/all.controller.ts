//get all users

// get all mentors

// get all hackathons

// get all admins

import type { Request, Response } from "express";
import { fetchAllProjects } from "../services/project.service";
import { errorResponse } from "../responses/error.response";
import { successResponse } from "../responses/success.response";
import { fetchAllBlogs } from "../services/blogs.service";
import { fetchAllIdeas } from "../services/ideas.service";
import { fetchAllHackathons } from "../services/hackathons.service";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await fetchAllProjects();
    return successResponse(res, projects, "Projects fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err, "Failed to fetch projects", 500);
  }
};

export const getAllIdeas = async (req: Request, res: Response) => {
  try {
    const ideas = await fetchAllIdeas();
    return successResponse(res, ideas, "Ideas fetched successfully!");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err, "Failed to fetch ideas", 500);
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await fetchAllBlogs();
    return successResponse(res, blogs, "Blogs fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err, "Failed to fetch blogs", 500);
  }
};

export const getAllHackathons = async (req: Request, res: Response) => {
  try {
    const hackathons = await fetchAllHackathons();
    return successResponse(res, hackathons, "Hackathons fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res, err, "Failed to fetch hackathons", 500);
  }
}

