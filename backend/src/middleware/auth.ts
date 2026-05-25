import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import { errorResponse } from '../utils/apiResponse';
import { AppError } from '../utils/AppError';

interface JwtPayload {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (_error) {
    return next(new AppError('Invalid token', 401, 'INVALID_TOKEN'));
  }
};
