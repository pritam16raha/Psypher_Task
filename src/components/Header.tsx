"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const isOnSubscriptionPage = pathname === "/subscription";
  const navLabel = isOnSubscriptionPage ? "Home" : "Subscription";
  const navHref = isOnSubscriptionPage ? "/" : "/subscription";

  return (
    <header
      className={cn(
        "relative z-10 w-full shadow",
        "bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 relative">
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
          {isSignedIn && (
            <Link
              href={navHref}
              className="text-white font-semibold text-sm px-4 py-2 rounded-md border border-white/30 bg-white/10 hover:bg-white/20 transition"
            >
              {navLabel}
            </Link>
          )}

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

      <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-yellow-300/80 via-amber-400/80 to-purple-400/60 blur-sm opacity-60 pointer-events-none" />
    </header>
  );
}
