import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Brain, Cpu, ShieldCheck, Zap, Sparkles, Activity } from 'lucide-react';

function Home() {
  const [health, setHealth] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [healthRes, recsRes] = await Promise.all([
          axios.get('/api/health'),
          axios.get('/api/recommendations'),
        ]);
        setHealth(healthRes.data);
        setRecommendations(recsRes.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch data from API. Is the backend server running?');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-mesh flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-800/80 glass-panel sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
              Smart Recommend <span className="text-sky-500 font-extrabold">AI</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${
                error
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  : loading
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>
                {error ? 'API Offline' : loading ? 'Checking Status...' : 'Systems Active'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Personalization Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent"
          >
            Predictive Intelligence,
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent text-glow">
              Engineered for Production
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed"
          >
            A high-performance workspace boilerplate leveraging SQLite, React, Vite, and Express.
            Engineered with CORS, security headers, request limiters, and clean ESLint rules.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400 w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Bulletproof Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Helmet HTTP security headers, CORS constraints, and request rate-limiting enabled at
              application core.
            </p>
          </div>
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400 w-fit mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Relational Data Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Synchronous, ultra-fast SQLite core with write-ahead-logging and a
              PostgreSQL-compatible repository api.
            </p>
          </div>
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 w-fit mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Vite-Optimized HMR</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Lightning-fast dev compiling alongside Tailwind CSS, ESLint plugins, and workspace
              task orchestration.
            </p>
          </div>
        </div>

        {/* Live Status and Recommendations Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Status */}
          <div className="glass-panel p-8 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center justify-between">
              <span>Database Server Status</span>
              {!loading && !error && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              )}
            </h2>
            {loading ? (
              <div className="space-y-4">
                <div className="h-6 bg-slate-800/50 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-800/50 rounded animate-pulse w-1/2"></div>
              </div>
            ) : error ? (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
                {error}
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-slate-400">API Host Status</span>
                  <span className="text-emerald-400 font-mono font-bold">{health.message}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-slate-400">Database Driver</span>
                  <span className="text-slate-200 font-mono">SQLite (WAL Mode)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-slate-400">Environment Node</span>
                  <span className="text-slate-200 font-mono capitalize">{health.env}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Server Time</span>
                  <span className="text-slate-200 font-mono">
                    {new Date(health.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Seed Recommendations list */}
          <div className="glass-panel p-8 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Database Seeding Results</h2>
            {loading ? (
              <div className="space-y-4">
                <div className="h-10 bg-slate-800/50 rounded animate-pulse"></div>
                <div className="h-10 bg-slate-800/50 rounded animate-pulse"></div>
                <div className="h-10 bg-slate-800/50 rounded animate-pulse"></div>
              </div>
            ) : error ? (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
                Please launch both servers using `npm run dev` inside workspace root.
              </div>
            ) : (
              <div className="space-y-3.5">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm">{rec.name}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{rec.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Score</span>
                      <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 text-xs font-bold rounded-lg border border-sky-500/20">
                        {rec.score.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-slate-500 text-xs">
        <p>
          &copy; {new Date().getFullYear()} Smart Recommend AI. Architected with Antigravity AI.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
