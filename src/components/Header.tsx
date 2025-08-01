"use client";

import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils"; // If you have a classnames util, or use normal string concat

export default function Header() {
  return (
    <header
      className={cn(
        "relative z-10 w-full mb-12 shadow",
        "bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 relative">
        {/* Brand with accent icon and subtle glow */}
        <div className="flex items-center gap-2">
          <span className="relative flex items-center">
            <Sparkles className="w-7 h-7 text-amber-300 drop-shadow-glow" />
            <span className="sr-only">Event Showcase logo</span>
          </span>
          <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg animate-fade-in-up">
            Event <span className="text-amber-300">Showcase</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          {/* You could add the user's tier as a badge */}
          {/* <span className="bg-white/[.12] text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow">Gold User</span> */}
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "ring-2 ring-amber-300 transition duration-300",
              },
            }}
            afterSignOutUrl="/sign-in"
          />
        </div>
      </div>
      {/* Champion "ribbon" at the base (optional for more drama) */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-yellow-300/80 via-amber-400/80 to-purple-400/60 blur-sm opacity-60 pointer-events-none" />
    </header>
  );
}
