# Tulane Study Spot Finder (Capstone Edition)

Discover, explore, and share the absolute best study locations across Tulane University's campus. This interactive, full-stack web application is designed specifically for students to find study spaces suited to their exact needs—whether looking for silent reading, collaborative whiteboard rooms, plentiful charging ports, or nearby fuel (like PJ's Coffee!).

## 🌟 Key Features

*   **Interactive Campus SVG Map**: Explore a hand-crafted, beautifully accurate vector map of the Tulane campus, complete with landmarks (Gibson Lawn, Newcomb Quad, McAlister Place, Stern, Howie-T, LBC, Reily, and Law School). Select building markers or pinpoints to open location profiles instantly!
*   **Intelligent Multi-Criteria Filters**: Filter spots on-the-fly by specific metrics:
    *   **Quietness Levels** (Silent, Quiet, Moderate, Collaborative)
    *   **Power Outlets Closeness** (None, Few, Plentiful)
    *   **Eduroam Wi-Fi Quality** (Poor, Good, Excellent)
    *   **Hours of Operation** (Open Late, Food Nearby)
    *   **Custom Text Search** (Quick matching of tags, names, or landmarks)
*   **Overnight-Aware Hours (Real-Time Open Status)**: Calculates whether any study spot is currently open or closed based on its standard Tulane schedule (handling overnight boundaries gracefully, e.g., `7:30 AM - 2:00 AM`).
*   **Gemini AI Summarization Endpoint**: Tap into Google’s advanced Gemini 3.5 Flash model directly from our Express backend router. With a single click, it synthesizes all real, anonymous student reviews for any spot, rendering a 3-bullet core pulse overview.
*   **Dual-Persistence Sync (Supabase PostgreSQL + Sandbox Local Storage)**: 
    *   **Supabase Active**: Synchronizes student reports, user sessions, and favorites in real-time with durable cloud-hosted tables.
    *   **Sandbox Fallback**: If keys are missing, the application runs fully offline in "Guest Sandbox Mode" utilizing `localStorage` persistence, ensuring a flawless evaluation experience.
*   **Safe OTP Student Authentication**: Eliminates insecure passwords. Students register or sign in securely by requesting a 6-digit one-time code sent directly to their email.
*   **Suggest a New Spot**: Empower the community! Signed-in students can submit new spots (with custom metrics and building landmarks) that sync directly with the campus directory.

---

## 🛠️ Tech Stack

*   **Frontend**: React (v19), Vite (v6), Tailwind CSS (v4), Motion/React (Animations), Lucide React (Icons).
*   **Backend**: Node.js, Express, tsx type-stripping, esbuild bundling.
*   **Database & Auth**: Supabase (PostgreSQL, Auth with email OTP verification).
*   **Artificial Intelligence**: `@google/genai` TypeScript SDK (model: `gemini-3.5-flash`).

---

## 📦 Database Schema Setup

To configure Supabase PostgreSQL tables, execute the following schemas in your Supabase SQL Editor:

```sql
-- 1. Create student reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id text NOT NULL,
  user_email text NOT NULL,
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  quiet_level text NOT NULL,
  outlets text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create student favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  spot_id text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, spot_id)
);

-- 3. Create spot suggestions table
CREATE TABLE IF NOT EXISTS suggested_spots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  building text NOT NULL,
  description text NOT NULL,
  quiet_level text NOT NULL,
  outlets text NOT NULL,
  wifi_quality text NOT NULL,
  open_late boolean DEFAULT false NOT NULL,
  food_nearby boolean DEFAULT false NOT NULL,
  user_email text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

---

## ⚙️ Environment Variables Config

Create a `.env` file (or set via system settings) with the following values:

```env
# Gemini AI (Required for live consolidations)
GEMINI_API_KEY="your-google-gemini-api-key"

# Supabase Credentials (Optional - Falls back to Guest Sandbox automatically if empty)
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anonymous-key"
```

---

## 🚀 Running the App Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Run the full-stack app in development
```bash
npm run dev
```
The Express development server compiles dynamically with `tsx` and serves Vite asset pipelines. Open `http://localhost:3000` to preview.

### 3. Build for Production
```bash
npm run build
```
This generates the optimized static build of the React app inside `dist/` and bundles `server.ts` into a self-contained Node file `dist/server.cjs` using esbuild.

### 4. Start Production Server
```bash
npm run start
```
Runs standalone on host `0.0.0.0` and port `3000`.

---

## 🏛️ Tulane Study Spot Catalog

1.  **Howard-Tilton Memorial Library (Howie-T) - Floor 1 Lobby**: Bustling, conversational, right next to PJ's coffee.
2.  **Howard-Tilton Memorial Library (Howie-T) - Floor 5 Silent Room**: Completely silent, scenic oak views, best for deep cram sessions.
3.  **Lavin-Bernick Center (LBC) - Mezzanine Deck**: Spacious student lounge desks, active student life central.
4.  **A.B. Freeman School of Business - Study Lounge**: Ultra-modern study lounge with whiteboards, embedded power docks.
5.  **Stern Hall - PJ's Coffee Seating**: Energized PJ's study hub, great outdoor tables, moderate noise level.
6.  **Newcomb Hall - 3rd Floor Lounge**: Historic quiet seating area with high-backed velvet chairs.
7.  **The Commons - 3rd Floor quiet study deck**: Peaceful deck overlooking McAlister walkway.
8.  **Greenbaum Residence Hall - Courtyard Pavilion**: Outdoor pavilion, shaded brick arches, calm birdsong vibes.
9.  **Richardson Memorial Hall Atrium (School of Architecture)**: High ceiling atrium, creative drafting tables, daylight-focused.
10. **Jones Hall Special Collections Library**: Historic archival study reading room, brass desk lamps, silent study focus.
11. **Reily Student Recreation Center Social Lounge**: High-backed stools and tables past the lobby, wellness bar adjacent.
12. **Weinmann Hall Quiet Study Cubicles (Law School)**: Private secluded study carrels, highly academically focused.
13. **LBC Ground Floor study pods**: Private circular noise-cancelling pods, perfect for collaborative team setups.
