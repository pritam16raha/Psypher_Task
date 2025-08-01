// src/app/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Tier } from "@/types";
import { supabase } from "@/lib/supabase"; // Import supabase client

export async function updateUserTier(newTier: Tier) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to upgrade your tier.");
  }

  try {
    // Update the 'tier' in YOUR Supabase 'profiles' table
    const { error } = await supabase
      .from('profiles')
      .update({ tier: newTier })
      .eq('id', userId);

    if (error) throw error;

  } catch (err) {
    console.error("Error updating user tier:", err);
    throw new Error("Failed to update tier.");
  }

  revalidatePath("/");
}