export class AppError extends Error {
  status: number;

  code: string;

  constructor(message: string, statusCode: number, code = 'INTERNAL_ERROR') {
    super(message);
    this.status = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
