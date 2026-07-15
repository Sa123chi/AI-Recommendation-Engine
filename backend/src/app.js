import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { errorHandler, AppError } from './middleware/error.js';
import { query } from './config/db.js';

const app = express();

// 1. Helmet for Security Headers
app.use(helmet());

// 2. CORS configuration
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// 3. Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Rate Limiter for API calls
app.use('/api', rateLimiter);

// 5. Health Check Endpoint
app.get('/api/health', async (req, res, next) => {
  try {
    const dbCheck = await query('SELECT 1 + 1 AS result');
    if (!dbCheck || dbCheck.rows[0].result !== 2) {
      throw new Error('Database connection verify failed');
    }

    res.status(200).json({
      status: 'success',
      message: 'Server is healthy and running',
      timestamp: new Date().toISOString(),
      env: config.nodeEnv,
      database: 'connected'
    });
  } catch (error) {
    next(new AppError(`Unhealthy database connection: ${error.message}`, 500));
  }
});

// Mock recommendation endpoint for initial run validation
app.get('/api/recommendations', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      { id: 1, name: 'Antigravity AI Agent', score: 0.99, category: 'AI Tools' },
      { id: 2, name: 'Vite Bundler Plugin', score: 0.94, category: 'Build Systems' },
      { id: 3, name: 'Tailwind CSS Starter Kit', score: 0.88, category: 'CSS Frameworks' }
    ]
  });
});

// 6. Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found on this server`, 404));
});

// 7. Centralized Error Handler
app.use(errorHandler);

export default app;
