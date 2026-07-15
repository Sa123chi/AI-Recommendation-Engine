import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'data/database.db',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  isDev: (process.env.NODE_ENV || 'development') === 'development',
};

// Simple validations
if (isNaN(config.port)) {
  console.warn('⚠️ PORT is not a number, defaulting to 5000');
  config.port = 5000;
}

if (isNaN(config.rateLimitWindowMs)) {
  config.rateLimitWindowMs = 900000;
}

if (isNaN(config.rateLimitMax)) {
  config.rateLimitMax = 100;
}
