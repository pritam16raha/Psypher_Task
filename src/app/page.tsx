// src/app/page.tsx
import Header from "@/components/Header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Welcome to the Event Showcase
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Please log in or sign up to view and access exclusive events based on your membership tier.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/sign-in" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700">
                Login
            </Link>
            <Link href="/sign-up" className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300">
                Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}