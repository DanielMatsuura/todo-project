import { Request, NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

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
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: err.message || "Unauthorized",
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message || "Error",
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "Internal Server Error",
  });
};
