import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
  meta?: ApiResponse['meta']
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

export const sendError = (
  res: Response,
  error: string | any,
  statusCode = 500,
  message = 'An error occurred'
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: typeof error === 'string' ? error : error?.message || error,
  });
};
