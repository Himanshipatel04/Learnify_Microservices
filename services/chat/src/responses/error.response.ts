import type { Response } from "express";

export const errorResponse = (
  res: Response,
  error: any,
  message: string = "An error occurred",
  statusCode: number = 500,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
