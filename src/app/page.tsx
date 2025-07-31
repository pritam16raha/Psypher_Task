// src/app/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import EventList from "@/components/EventList";
import UpgradeTier from "@/components/UpgradeTier";
import { supabase } from "@/lib/supabase";
import { Event, Tier } from "@/types";
import Link from "next/link"; // Import the Link component

const tierHierarchy: Tier[] = ["free", "silver", "gold", "platinum"];

// This is the view for LOGGED-IN users
// This is the view for LOGGED-IN users
async function LoggedInView() {
  const user = await currentUser();
  if (!user) return null; // Should not happen if called correctly, but good practice

  // Fetch the user's profile from YOUR database
  let { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();

  // If no profile exists, create one on the fly (Just-in-Time Provisioning)
  if (!profile) {
    const { data: newProfile, error } = await supabase
      .from('profiles')
      .insert({ id: user.id, email: user.emailAddresses[0]?.emailAddress, tier: 'free' })
      .select('tier')
      .single();

    if (error) {
      console.error("Error creating profile on-the-fly:", error);
      return <div>Error loading profile.</div>;
    }
    profile = newProfile;
  }

  const userTier = profile?.tier as Tier || 'free';
  const userTierIndex = tierHierarchy.indexOf(userTier);
  const accessibleTiers = tierHierarchy.slice(0, userTierIndex + 1);
  const { data: events } = await supabase.from("events").select("*");

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Upcoming Events
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          You are a <span className="font-bold capitalize">{userTier}</span> user. Events for your tier and below are shown.
        </p>
      </div>
      <UpgradeTier />
      <EventList events={events || []} accessibleTiers={accessibleTiers} />
    </>
  );
}

// This is the new view for LOGGED-OUT users
function LoggedOutView() {
  return (
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
  );
}


export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-20">
        {userId ? <LoggedInView /> : <LoggedOutView />}
      </main>
    </div>
  );
}