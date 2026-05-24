import { ZodError } from "zod";

import { errorResponse } from "../utils/apiResponse";

export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
  // zod validation errors
  if (err instanceof ZodError) {
    return errorResponse(
      res,
      400,
      "VALIDATION_ERROR",
      err.issues[0].message,

      err.issues.map((e) => ({
        path: e.path,
        message: e.message,
      }))
    );
  }

  // custom app errors
  if (err.status && err.code) {
    return errorResponse(res, err.status, err.code, err.message);
  }

  // unknown errors
  return errorResponse(
    res,
    500,
    "INTERNAL_ERROR",
    "An unexpected error occurred"
  );
};
