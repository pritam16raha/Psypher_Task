// src/components/Header.tsx
"use client";

import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Event Showcase</h1>
      {/* The redirect is now handled globally */}
      <UserButton /> 
    </header>
  );
}