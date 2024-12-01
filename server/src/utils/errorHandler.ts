import { type Response } from 'express';
/**
 * Handles errors and sends a proper JSON response.
 * @param err - The error to handle
 * @param res - The Express response object
 * @param statusCode - The error status code to send in the response
 */
export const errorHandler = (
  err: unknown,
  res: Response,
  statusCode: number = 500,
) => {
  if (err instanceof Error) {
    return res.status(statusCode).json({ message: err.message });
  } else {
    res.status(statusCode).json({ message: 'An unknown error occurred' });
  }
};
