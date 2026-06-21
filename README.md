# ReelGen AI

AI-powered video generation SaaS platform. Create videos from text prompts, scripts, images, and audio.

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui components
- **Backend:** FastAPI (Python)
- **Database:** MongoDB Atlas
- **Auth:** Email/Password + Google OAuth + JWT
- **Storage:** Cloudinary-ready architecture

## Project Structure

```
reelgen-ai/
├── frontend/          # React SPA
│   └── src/
│       ├── components/  # UI & layout components
│       ├── contexts/    # Auth & Theme providers
│       ├── pages/       # Route pages
│       ├── utils/       # API client
│       └── lib/         # Utilities (cn)
├── backend/           # FastAPI server
│   └── app/
│       ├── config/      # Settings & DB connection
│       ├── models/      # Pydantic schemas
│       ├── routes/      # API endpoints
│       ├── services/    # Business logic & AI module placeholders
│       └── utils/       # Auth helpers
└── README.md
```

## Features

- Landing page with hero, features, how-it-works, pricing
- Email/password + Google OAuth authentication
- Dashboard with project management
- Create Video form (Topic/Script/Image+Script/Audio+Image modes)
- My Videos gallery with CRUD operations
- Account settings & profile management
- Dark mode support, fully responsive
- Placeholder API routes for future AI modules

## Prerequisites

- Node.js 20+
- Python 3.11+
- MongoDB Atlas account (or local MongoDB)

## Local Development

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

Open http://localhost:5173

## Environment Variables

### Backend (.env)

| Variable | Description | Required |
|---|---|---|
| `MONGODB_URL` | MongoDB connection string | Yes |
| `MONGODB_DB_NAME` | Database name | Yes |
| `JWT_SECRET_KEY` | Secret for JWT tokens | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | For Google login |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | For Google login |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | For file uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key | For file uploads |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | For file uploads |
| `FRONTEND_URL` | Frontend origin for CORS | Yes |

### Frontend (.env)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL (default: http://localhost:8000) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID |

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Projects
- `POST /api/projects/` - Create project
- `GET /api/projects/` - List user's projects
- `GET /api/projects/{id}` - Get project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update profile

### AI Modules (Placeholder)
- `POST /api/ai/generate-script`
- `POST /api/ai/plan-scenes`
- `POST /api/ai/generate-character`
- `POST /api/ai/clone-voice`
- `POST /api/ai/generate-video`
- `POST /api/ai/generate-captions`
- `POST /api/ai/generate-hashtags`
- `POST /api/ai/generate-thumbnail`

## Deployment

### Frontend (Vercel)

1. Connect your repo to Vercel
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables

### Backend (Render)

1. Connect your repo to Render
2. Set root directory to `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

## Future AI Modules

The architecture is designed for these upcoming modules:
- Script Generation (LLM-based)
- Scene Planning
- Character Consistency Engine
- Voice Cloning
- Video Generation
- Caption Generation
- Hashtag Generation
- Thumbnail Generation
