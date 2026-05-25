import { Response } from 'express';

export const successResponse = (
  res: Response,
  message: string,
  data?: unknown,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown,
) => {
  return res.status(statusCode).json({
    success: false,

    error: {
      code,
      message,

      ...(details ? { details } : {}),
    },
  });
};
