import { Router } from "express";
import { getAllProjectsExpress } from "../handlers/projects.express.handler";

export const projectRouter = Router();

projectRouter.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to the project route!" });
});

projectRouter.get("/all", getAllProjectsExpress)