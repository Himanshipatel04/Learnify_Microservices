import type { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  console.log(`[REQ] ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const color =
      status >= 500 ? "\x1b[31m" : 
      status >= 400 ? "\x1b[33m" : 
      status >= 300 ? "\x1b[36m" : 
      "\x1b[32m";                 

    console.log(
      `[RES] ${req.method} ${req.originalUrl} ${color} - [${status}]\x1b[0m - ${duration}ms`
    );
  });

  next();
};
