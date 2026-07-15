import { config } from '../config/env.js';

/**
 * Custom operational error class
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Express error-handling middleware
 */
export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  const response = {
    status,
    message: err.message || 'Internal Server Error'
  };

  // Include stack trace only in development
  if (config.isDev) {
    response.stack = err.stack;
  }

  // Log server errors (500) with stack traces
  if (statusCode === 500) {
    console.error(`[CRITICAL] Server Error: ${err.message}`, err.stack);
  } else {
    console.warn(`[WARN] Client Error (${statusCode}): ${err.message}`);
  }

  res.status(statusCode).json(response);
}
