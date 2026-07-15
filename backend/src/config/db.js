import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { config } from './env.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the db directory exists
const dbPath = path.resolve(__dirname, '../../', config.databaseUrl);
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath, {
  verbose: config.isDev ? (message) => console.log(`[SQL] ${message}`) : null
});

// Configure SQLite pragmas for performance and standard behavior
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('foreign_keys = ON');

/**
 * PostgreSQL-compatible query utility wrapper.
 * This translates Postgres '$1, $2' parameters to SQLite '?' parameters
 * and returns results in a structure matching 'node-postgres' ({ rows, rowCount }).
 *
 * @param {string} text - SQL statement (can use $1, $2 Postgres placeholders)
 * @param {any[]} [params] - Query parameters
 * @returns {Promise<{ rows: any[], rowCount: number, lastInsertId?: number|string }>}
 */
export async function query(text, params = []) {
  // Convert $1, $2... to ? for SQLite compatibility
  const sqliteSql = text.replace(/\$\d+/g, '?');

  try {
    const stmt = db.prepare(sqliteSql);
    const isReader = stmt.reader;

    if (isReader) {
      const rows = stmt.all(params);
      return {
        rows,
        rowCount: rows.length
      };
    } else {
      const result = stmt.run(params);
      return {
        rows: [],
        rowCount: result.changes,
        lastInsertId: result.lastInsertRowid
      };
    }
  } catch (error) {
    console.error('Database query error:', { sql: text, params, error: error.message });
    throw error;
  }
}

export default db;
