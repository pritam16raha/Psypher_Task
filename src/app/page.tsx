// src/app/page.tsx
import Link from "next/link";
import { Laptop, Server, Database, ShieldCheck } from "lucide-react";

const techStack = [
  { name: "Next.js 14", icon: Laptop },
  { name: "Supabase", icon: Database },
  { name: "Tailwind CSS", icon: Server },
  { name: "Clerk.dev", icon: ShieldCheck },
];

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center">
      <main className="container mx-auto px-6 py-32 md:py-40 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter text-gray-900 drop-shadow-sm">
          Welcome to the{" "}
          <span className="text-indigo-600 underline decoration-indigo-400 decoration-4">
            Event Showcase
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
          Discover exclusive, tier-based events tailored to your membership level.
          Log in or sign up to unlock your curated experiences.
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-6">
          <Link
            href="/sign-in"
            className="rounded-full bg-indigo-600 px-8 py-3 text-white text-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full border-2 border-indigo-600 px-8 py-3 text-indigo-600 text-lg font-semibold hover:bg-indigo-50 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Tech Stack Section */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Built With Modern Technologies
          </h2>
          <ul className="flex flex-wrap justify-center gap-10">
            {techStack.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="flex flex-col items-center gap-2 w-28 text-gray-700 hover:text-indigo-600 transition cursor-default"
                aria-label={name}
              >
                <Icon className="w-10 h-10" />
                <span className="text-sm font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Optional subtle footer note */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 select-none">
        &copy; {new Date().getFullYear()} Psypher Event Showcase — Crafted with care 💫
      </footer>
    </div>
  );
}
