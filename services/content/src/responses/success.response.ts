import type { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message: string = "Request successful",
  statusCode: number = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
