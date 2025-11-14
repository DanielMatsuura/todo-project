import { Request, NextFunction, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err.name === "InvalidRequestError" ||
    err.name === "UnauthorizedError" ||
    err.code === "invalid_token" ||
    err.code === "credentials_required"
  ) {
    return res.status(401).json({
      message: err.message || "Unauthorized",
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message || "Error",
    });
  }

  return res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};
