import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const parseAssignmentFormData = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.questionConfigs) {
      req.body.questionConfigs = JSON.parse(req.body.questionConfigs);
    }

    next();
  } catch (error) {
    console.log("Error parsing questionConfigs:", error);
    next(new AppError("Invalid questionConfigs format", 400, "INVALID_INPUT"));
  }
};
