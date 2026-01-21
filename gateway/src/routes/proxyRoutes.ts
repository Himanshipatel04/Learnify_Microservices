import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { services } from "../config/services";
import { errorResponse } from "../responses/error.response";

const router = express.Router();

function createProxy(target: string, serviceName: string) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    // Use event emitter syntax
    on: {
      error: (err, req, res: any) => {
        if (!res.headersSent) {
          return errorResponse(
            res,
            503,
            `${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)} service is unavailable`
          );
        }
      },
    },
  });
}

router.use("/admin", createProxy(services.admin, "admin"));
router.use("/users", createProxy(services.user, "users"));
router.use("/projects", createProxy(services.project, "projects"));
router.use("/content", createProxy(services.content, "content"));

router.use((req, res) => {
  return errorResponse(res, 404, "Route not found in API Gateway");
});

export default router;
