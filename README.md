# Smart Recommend AI

Smart Recommend AI is a production-ready, full-stack application built with a modern React frontend and a Node.js + Express backend.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, React Router, Axios, Lucide React
- **Backend**: Node.js, Express, Helmet, CORS, Rate Limiting
- **Database**: SQLite (architectured for PostgreSQL compatibility)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup & Installation
1. Install all dependencies for both frontend and backend using npm workspaces:
   ```bash
   npm install
   ```

2. Configure environment variables in `backend/.env` (a default `.env` is initialized from `.env.example`).

3. Start the application in development mode:
   ```bash
   npm run dev
   ```
   This command starts both the frontend development server and the backend Express server concurrently.

### Project Structure
- `frontend/`: React application configured with Vite, Tailwind CSS, ESLint, and Prettier.
- `backend/`: Express.js server configured with SQLite, Helmet security headers, CORS protection, rate limiting, ESLint, and Prettier.
