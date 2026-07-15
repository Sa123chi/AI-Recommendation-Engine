-- SQLite / PostgreSQL compatible schema initialization

-- 1. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- Postgres equivalent: SERIAL PRIMARY KEY
  name VARCHAR(255) NOT NULL,
  description TEXT,
  score REAL NOT NULL CHECK(score >= 0.0 AND score <= 1.0),
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast retrieval based on category
CREATE INDEX IF NOT EXISTS idx_recommendations_category ON recommendations(category);

-- Insert seed data if tables are empty
INSERT INTO recommendations (name, description, score, category)
SELECT 'Smart Finance Planner', 'Automate financial advising and planning.', 0.95, 'Finance'
WHERE NOT EXISTS (SELECT 1 FROM recommendations LIMIT 1);

INSERT INTO recommendations (name, description, score, category)
SELECT 'AI Health Coach', 'Virtual health assistant and calorie calculator.', 0.89, 'Healthcare'
WHERE NOT EXISTS (SELECT 1 FROM recommendations WHERE name = 'AI Health Coach');

INSERT INTO recommendations (name, description, score, category)
SELECT 'DevOps Automation Hub', 'Seamlessly deploy microservices to Kubernetes.', 0.97, 'DevOps'
WHERE NOT EXISTS (SELECT 1 FROM recommendations WHERE name = 'DevOps Automation Hub');
