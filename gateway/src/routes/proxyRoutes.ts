import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { services } from "../config/services";
import { errorResponse } from "../responses/error.response";

const router = express.Router();

function createProxy(target: string, serviceName: string) {
  return createProxyMiddleware({
    target,
    pathRewrite: {},
    changeOrigin: true,
    on: {
      error: (err, req, res: any) => {
        res.writeHead(503, {
          'Content-Type': 'application/json',
        });
        return errorResponse(res, "", `${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)} service is unavailable`, 503);
      },
    },
  });
}

router.use("/admin", createProxy(services.admin, "admin"));
router.use("/users", createProxy(services.user, "users"));
router.use("/projects", createProxy(services.project, "projects"));
router.use("/content", createProxy(services.content, "content"));

router.use((req, res) => {
  return errorResponse(res, "", "Route not found in API Gateway", 404);
});

export default router;
