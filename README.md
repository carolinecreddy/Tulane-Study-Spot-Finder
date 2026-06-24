# Tulane Study Spot Finder (Capstone Edition)

Live Site: [paste deployed site link here]

The Tulane Study Spot Finder is an interactive, full-stack web application designed for students to find and share optimal study locations across Tulane University's campus. Whether searching for silent reading rooms, collaborative whiteboard spaces, plentiful charging ports, or spots near food and coffee, this app helps students find study environments matched to their exact preferences.

## 🌟 Key Features

*   **Interactive Campus Map**: An interactive vector map of the Tulane Uptown campus, featuring clickable landmark pins that open details for locations (Gibson Lawn, Newcomb Quad, McAlister Place, Howie-T, LBC, Reily, and more).
*   **Intelligent Preferences Filter**: Filter study spaces in real time by noise level (Silent, Quiet, Moderate, Collaborative), outlet density, Wi-Fi quality, hours of operation, or via text search.
*   **Overnight-Aware Open Status**: Automatically calculates whether any study spot is currently open or closed based on its schedule, handling late-night and overnight boundaries gracefully.
*   **Gemini AI Review Summaries**: Integrates Google’s Gemini 3.5 Flash model server-side to synthesize student reviews, providing a clean 3-bullet summary of student feedback with one click.
*   **Safe OTP Student Authentication**: Features a safe email-based One-Time Password (OTP) verification flow to register or sign in securely without requiring traditional passwords.
*   **Student Spot Suggestions**: Allows logged-in students to suggest new campus study spaces, complete with descriptive metrics and building locations.
*   **Flexible Offline-First Fallback**: Fully functional locally with browser storage persistence when no database connection is configured, enabling easy evaluation.

---

## 🛠️ Tech Stack

*   **Frontend**: React (v19), Vite (v6), Tailwind CSS (v4), Motion/React (Animations), Lucide React (Icons).
*   **Backend**: Node.js, Express, tsx type-stripping, esbuild bundling.
*   **Database & Auth**: Supabase (PostgreSQL, email OTP verification).
*   **AI Models**: `@google/genai` SDK (Gemini 3.5 Flash).

---

## 🚀 Basic Setup & Local Running

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Configure environment variables**:
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY="your-google-gemini-api-key"
    VITE_SUPABASE_URL="https://your-project-id.supabase.co"
    VITE_SUPABASE_ANON_KEY="your-supabase-anonymous-key"
    ```
3.  **Run in development mode**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` to preview.
4.  **Build and Start in production**:
    ```bash
    npm run build
    npm run start
    ```

---

## ⚙️ Developer Setup & Supabase Setup

### Database Schema Setup
To configure Supabase PostgreSQL tables, run the following SQL statements in your Supabase SQL Editor:

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

### Environment Variable Configurations
*   **`GEMINI_API_KEY`**: Server-only secret key to enable AI reviews summarization features.
*   **`VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`**: Public client variables used to connect to your Supabase project. If left empty, the application runs in local demo fallback mode using browser storage.

---

## 🏛️ Built-In Tulane Study Spot Catalog

1.  **Howard-Tilton Memorial Library (Howie-T) - Floor 1 Lobby**: Bustling, conversational, adjacent to PJ's Coffee.
2.  **Howard-Tilton Memorial Library (Howie-T) - Floor 5 Silent Room**: Completely silent with scenic oak views.
3.  **Lavin-Bernick Center (LBC) - Mezzanine Deck**: Spacious student lounge desks in the active student center.
4.  **A.B. Freeman School of Business - Study Lounge**: Modern study lounge with whiteboards and integrated power docks.
5.  **Stern Hall - PJ's Coffee Seating**: Shaded outdoor PJ's seating with moderate noise levels.
6.  **Newcomb Hall - 3rd Floor Lounge**: Historic quiet seating area with high-backed velvet chairs.
7.  **The Commons - 3rd Floor Quiet Study Deck**: Peaceful study deck overlooking McAlister walkway.
8.  **Greenbaum Residence Hall - Courtyard Pavilion**: Shaded outdoor brick courtyard pavilion with birdsong vibes.
9.  **Richardson Memorial Hall Atrium (Architecture)**: High-ceiling atrium, creative drafting tables, daylight-focused.
10. **Jones Hall Special Collections Library**: Historic archival study reading room, brass desk lamps, silent focus.
11. **Reily Student Recreation Center Social Lounge**: High-backed stools and tables past the lobby, wellness bar adjacent.
12. **Weinmann Hall Quiet Study Cubicles (Law School)**: Private secluded study carrels, highly academic atmosphere.
13. **LBC Ground Floor Study Pods**: Private noise-cancelling study pods, perfect for team collaboration.
