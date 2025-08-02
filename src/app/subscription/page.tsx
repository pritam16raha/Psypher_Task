import EventList from "@/components/EventList";
import UpgradeTier from "@/components/UpgradeTier";
import { supabase } from "@/lib/supabase";
import { Tier } from "@/types";
import type { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const tierHierarchy: Tier[] = ["free", "silver", "gold", "platinum"];

async function SubscriptionView({ user }: { user: User }) {
  let { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (!profile) {
    const { data: newProfile } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        tier: "free",
      })
      .select("tier")
      .single();
    profile = newProfile;
  }

  const userTier = (profile?.tier as Tier) || "free";
  const userTierIndex = tierHierarchy.indexOf(userTier);
  const accessibleTiers = tierHierarchy.slice(0, userTierIndex + 1);
  const { data: events } = await supabase.from("events").select("*");

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Your Events
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          You are a <span className="font-bold capitalize">{userTier}</span>{" "}
          user. Events for your tier and below are shown.
        </p>
      </div>
      <UpgradeTier />
      <EventList events={events || []} accessibleTiers={accessibleTiers} />
    </>
  );
}

export default async function SubscriptionPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
    return <div>You must be signed in to view this page.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-20">
        <SubscriptionView user={user} />
      </main>
    </div>
  );
}
