// Ensure dotenv is called at the very top before any other imports
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = require('./app');
const { testConnection } = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log('[db] Attempting to connect to PostgreSQL...');
    await testConnection();
  } catch (err) {
    console.error('[db] Failed to connect to PostgreSQL:', err || err.message);
    console.error('Make sure DATABASE_URL is set correctly in backend/.env');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`[server] Smart Recommend AI API listening on port ${PORT}`);
  });
})();

module.exports = app;