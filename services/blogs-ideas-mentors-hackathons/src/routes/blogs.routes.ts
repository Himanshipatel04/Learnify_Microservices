import { Router } from "express";
import { getAllBlogsExpress } from "../handlers/blogs/blogs.express.handler";
import { successResponse } from "../responses/success.response";

export const blogsRouter = Router();

blogsRouter.get("/", (req, res) => {
    successResponse(res, null, "Blogs Service is up and running!", 200);
});

blogsRouter.get("/all", getAllBlogsExpress)