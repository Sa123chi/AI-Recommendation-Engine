/**
 * Apply database/schema.sql and optionally database/sample_data.sql
 * Usage:
 *   DATABASE_URL=postgres://... node database/migrate.js
 *   DATABASE_URL=postgres://... node database/migrate.js --seed
 */
require('dotenv').config({ path: require('path').join(__dirname, '../backend/.env') });
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function runSqlFile(client, filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  console.log(`[migrate] Running ${path.basename(filePath)}...`);
  await client.query(sql);
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('[migrate] DATABASE_URL is required');
    process.exit(1);
  }

  const seed = process.argv.includes('--seed');
<<<<<<< HEAD
  const useSsl = databaseUrl.includes('sslmode=require')
    || databaseUrl.includes('neon.tech')
    || databaseUrl.includes('supabase.co')
    || databaseUrl.includes('rds.amazonaws.com')
    || process.env.DATABASE_SSL === 'true';
  const client = new Client({
    connectionString: databaseUrl,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
=======
  const client = new Client({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('sslmode=require') || process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
>>>>>>> ef26ba408c4a7aafb41261530aadfb558352f89b
  });

  await client.connect();
  try {
    await runSqlFile(client, path.join(__dirname, 'schema.sql'));
    if (seed) {
      await runSqlFile(client, path.join(__dirname, 'sample_data.sql'));
    }
    console.log('[migrate] Done.');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('[migrate] Failed:', err.message);
  process.exit(1);
});
