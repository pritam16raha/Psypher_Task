# ✨ Event Showcase

A tier-based event display app built with Next.js 14, Supabase, Clerk.dev, Drizzle ORM, and Tailwind CSS. Users can authenticate, view events based on their tier, and simulate upgrades to higher tiers to unlock more exclusive events.

---

## 🚀 Features

- 🔐 **Authentication** via Clerk.dev
- 🗃️ **Role-based Event Filtering** using Supabase RLS
- 📦 **PostgreSQL** + Drizzle ORM for database management
- 💄 **Tailwind CSS** for a responsive UI
- 🔄 **Tier Upgrade Simulation** (free → platinum)
- 📊 Clean, minimal frontend with event card displays

---

## 🧱 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Auth:** Clerk.dev
- **DB:** Supabase (PostgreSQL)
- **ORM:** Drizzle
- **UI:** Tailwind CSS
- **RLS:** Supabase Row Level Security policies

---

## 📂 Folder Structure

/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── ...
├── components/
│ ├── EventCard.tsx
│ └── TierSelector.tsx
├── db/
│ ├── schema.ts
│ └── drizzle.config.ts
├── lib/
│ └── supabase.ts
├── public/
│ └── data/events.json
└── README.md

yaml
Copy
Edit

---

## 🛠️ Setup Instructions

### 1. 📦 Install dependencies

```bash
pnpm install
# or
npm install
2. 🔐 Configure environment variables
Create a .env file at the root with the following:

copy the content of .env.example into the .env

3. 🧬 Database Setup
Create the schema in Supabase:

profiles table (with id, email, tier)

events table (with id, title, description, tier, etc.)

tier ENUM type (free, silver, gold, platinum)

Seed initial data manually or use provided SQL.

4. 🔐 Enable RLS and Policies
Enable RLS on both tables and apply this policy for the events table:

sql
Copy
Edit
CREATE POLICY "Show Event Based on Tier"
ON public.events
AS PERMISSIVE
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = auth.uid()::text
    AND (
      (profiles.tier = 'platinum' AND events.tier IN ('free', 'silver', 'gold', 'platinum')) OR
      (profiles.tier = 'gold' AND events.tier IN ('free', 'silver', 'gold')) OR
      (profiles.tier = 'silver' AND events.tier IN ('free', 'silver')) OR
      (profiles.tier = 'free' AND events.tier = 'free')
    )
  )
);
▶️ Running the App
Dev Server:
bash
Copy
Edit
pnpm dev
# or
npm run dev
Open browser at http://localhost:3000

RLS requires the authenticated user to exist in the profiles table with a valid tier.

📄 License
MIT — free to use, modify and share.

5. Supabase Account Details:
email: 16pritamraha@gmail.com
password: Pritam@551175

Organization_name: Assignments
Project_name: psypher-events

#from the SQL Editor I have added all the demo data and RLS policies.