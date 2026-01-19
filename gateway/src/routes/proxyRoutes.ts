import express from "express";
import { services } from "../config/services";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/admin",
  createProxyMiddleware({
    target: services.admin,
    changeOrigin: true,
    pathRewrite: { "^/admin": "" },
  })
);

router.use(
  "/user",
  createProxyMiddleware({
    target: services.user,
    changeOrigin: true,
    pathRewrite: { "^/user": "" },
  })
);

router.use("/project", createProxyMiddleware({
  target: services.project,
  changeOrigin: true,
  pathRewrite: { "^/project": "" },
})
);

router.use("/content", createProxyMiddleware({
  target: services.content,
  changeOrigin: true,
  pathRewrite: { "^/content": "" },
})
);

export default router;
