# Rover Dog Walk Tracker (MVP) 🐾

A full-stack application designed for professional dog walkers to navigate safely. This tool allows walkers to track routes in real-time, discover dog-friendly spots, and receive safety alerts tailored to the specific characteristics of the pet they are walking.

## 🔗 Live Links

- [Backend API](https://rover-dog-walk-tracker-production.up.railway.app/)
- **Database:** Hosted on Neon (PostgreSQL)

## 🚀 Tech Stack

- **Frontend:** React (TypeScript) + Vite
- **Backend:** Django + Django REST Framework (DRF)
- **Database:** PostgreSQL (Hosted on NeonDB)
- **Maps API:** Google Maps JavaScript API
- **State Management:** React Hooks / Context API

## 📋 Core Features (MVP)

- **Pet-Centric Walk Sessions:** Select a pet and start a walk. The app pulls the pet's unique characteristics.
- **Dog-Friendly Discovery:** Create and pin new dog-friendly locations (cafes, parks, pipi cans).
- **Interactive Map:** View the live route on a Google Maps interface.
- **Dog Profiles:** Select and manage specific pets for each walk session.

## 🏗️ Project Structure

```text
rover-dog-walk-tracker/
├── backend/                # Django REST API
│   ├── config/             # Settings & WSGI/ASGI (Railway)
│   ├── core/               # Models: Pets, Places, Walks, Alerts
│   ├── manage.py           # Django CLI
│   ├── requirements.txt    # Python dependencies
│   └── Procfile            # Railway deployment config
├── frontend/               # React Native / Expo App
│   ├── app/                # Expo Router (Tabs & Layouts)
│   │   └── components/     # Atomic Design (Atoms, Molecules, Organisms)
│   ├── src/                # Shared Logic
│   │   ├── hooks/          # Custom React hooks (usePet, useLocation)
│   │   ├── services/       # API Integration
│   │   └── theme/          # UI Styling
│   └── tests/              # Jest/Library tests
└── .env                    # Environment variables (API Keys, DB URLs)
```

## 🛠️ Local Development

### Prerequisites

- Node.js & npm

- Python 3.x (if running backend locally)

- Expo Go app on your mobile device

### Setup

1. Clone the repo

2. Frontend Setup:

    ```quote
    cd frontend
    npm install
    npx expo start
    ```

3. Backend Setup (Optional - Live API is used by default):

    ```quote
    cd backend
    source .venv/bin/activate
    pip install -r requirements.txt
    python manage.py runserver
    ```

## 🛤️ Development Flow

1. Database Design: Defined schema for Pets, Places, and dynamic Alerts on Neon.

2. User Stories: Mapped out the "Pet-Safe" walking experience.

3. Backend Implementation: Built DRF endpoints for real-time location and place creation.

4. Frontend Architecture: Implemented Atomic Design and custom hooks for clean state management.

---
