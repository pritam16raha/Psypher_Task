// src/components/UpgradeTier.tsx
"use client";

import { useState } from "react";
import { Tier } from "@/types";
import { updateUserTier } from "@/app/actions";

export default function UpgradeTier() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const newTier = formData.get("tier") as Tier;

    try {
      await updateUserTier(newTier);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-xl mb-12 shadow-sm max-w-md mx-auto">
      <h3 className="text-lg font-bold text-center mb-4">Simulate Tier Upgrade</h3>
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
        <select
          name="tier"
          defaultValue="gold"
          className="p-2 border rounded-md"
        >
          <option value="free">Free</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
        </select>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Upgrading..." : "Upgrade"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}