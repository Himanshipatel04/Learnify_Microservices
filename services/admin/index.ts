import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import { requestLogger } from "./src/utils/requestLogger";
import { adminRouter } from "./src/routes/admin.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/", adminRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Admin Service is up and running!");
});

app.listen(process.env.PORT, async () => {
  console.log(`Admin app is running on port ${process.env.PORT}`);
});
