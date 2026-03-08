import express from "express";
import "dotenv/config";
import { requestLogger } from "./src/utils/requestLogger";
import proxyRoutes from "./src/routes/proxyRoutes";
import { globalErrorHandler } from "./src/middlewares/errorHandler";
import { successResponse } from "./src/responses/success.response";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  return successResponse(res, null, "Welcome to the API Gateway", 200);
});

app.get("/health", (req, res) => {
  return successResponse(res, null, "Gateway is healthy", 200);
});

app.use("/", proxyRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
