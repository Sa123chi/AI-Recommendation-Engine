import app from './src/app.js';
import { config } from './src/config/env.js';
import db from './src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite database schema synchronously
try {
  console.log('🔄 Bootstrapping SQLite database schema...');
  const schemaPath = path.resolve(__dirname, 'db/schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Execute schema script against better-sqlite3 instance
  db.exec(schemaSql);
  console.log('✅ Database schema initialized successfully.');
} catch (error) {
  console.error('❌ Failed to run SQL schema file:', error);
  process.exit(1);
}

// Start Express Server
const server = app.listen(config.port, () => {
  console.log(`🚀 Express server started in ${config.nodeEnv} mode on http://localhost:${config.port}`);
});

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION: Shutting down server...');
  console.error(err.name || 'Error', err.message || err);
  server.close(() => {
    process.exit(1);
  });
});
