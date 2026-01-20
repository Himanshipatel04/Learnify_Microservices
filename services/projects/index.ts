import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import { requestLogger } from "./src/utils/requestLogger";
import "./src/grpc/grpc.server";
import { projectRouter } from "./src/router/project.router";
import { successResponse } from "./src/responses/success.response";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/", projectRouter);

app.get("/", (req: Request, res: Response) => {
  successResponse(res, null, "Project service is running");
});

app.listen(process.env.PORT, async () => {
  console.log(`Project app is running on port ${process.env.PORT}`);
});
