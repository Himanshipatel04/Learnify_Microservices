import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import "./src/grpc/grpc.server";
import { requestLogger } from "./src/utils/requestLogger";
import { successResponse } from "./src/responses/success.response";
import { blogsRouter } from "./src/routes/blogs.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
    successResponse(res, null, "Content service is running");
});

app.use("/blogs", blogsRouter);

app.listen(process.env.PORT, async () => {
    console.log(`Project app is running on port ${process.env.PORT}`);
});
