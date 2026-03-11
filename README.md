# Rover Dog Walk Tracker (MVP) 🐾

A full-stack web application designed for professional dog walkers to track their routes, log pet activities (pee/poop/mood), and discover dog-friendly spots in real-time.

## 🚀 Tech Stack

- **Frontend:** React (TypeScript) + Vite
- **Backend:** Django + Django REST Framework (DRF)
- **Database:** PostgreSQL (Hosted on NeonDB)
- **Maps API:** Google Maps JavaScript API
- **State Management:** React Hooks / Context API

## 📋 Core Features (MVP)

- **Walk Tracking:** Start and end walk sessions with real-time GPS coordinate logging.
- **Activity Logging:** Mark specific locations where a dog peed, pooped, or showed a specific mood.
- **Interactive Map:** View the live route on a Google Maps interface.
- **Dog Profiles:** Select and manage specific pets for each walk session.
- **Route History:** (Post-MVP) Review past walks and statistics.

## 🏗️ Project Structure

```text
rover-dog-walk-tracker/
├── backend/            # Django REST API
│   ├── config/         # Project settings & routing
│   ├── core/           # Dog, Walk, and GPS models/logic
│   └── .venv/          # Python virtual environment
├── frontend/           # React SPA
│   ├── src/            # Components, Hooks, and Services
│   └── public/         # Static assets
└── .gitignore          # Root-level git exclusions
```

## 🛠️ Local Development Setup

### Backend Setup

1. Navigate to the backend folder: cd backend

2. Activate virtual environment: source .venv/bin/activate

3. Install dependencies: pip install -r requirements.txt

4. Run migrations: python manage.py migrate

5. Start server: python manage.py runserver

### Frontend Setup

1. Navigate to the frontend folder: cd frontend

2. Install dependencies: npm install

3. Start development server: npm run dev

## 🛤️ Roadmap (2-Week Sprint)

[ ] Phase 1: Database Schema & API Scaffolding

[ ] Phase 2: Google Maps Integration & Geolocation Tracking

[ ] Phase 3: Event Logging System (Pee/Poop/Mood)

[ ] Phase 4: UI Polishing & Deployment

---
