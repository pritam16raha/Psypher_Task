"use client";

import { updateUserTier } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tier } from "@/types";
import { useState } from "react";

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
      console.error("Upgrade error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white border rounded-xl mb-12 shadow-sm max-w-md mx-auto flex flex-col gap-4"
    >
      <h3 className="text-lg font-bold text-center">Simulate Tier Upgrade</h3>

      <div>
        <Label htmlFor="tier" className="mb-2">
          Select Your Tier
        </Label>
        <Select name="tier" defaultValue="free" disabled={isSubmitting}>
          <SelectTrigger id="tier" className="w-full">
            <SelectValue placeholder="Select a tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="platinum">Platinum</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Upgrading..." : "Upgrade"}
      </Button>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </form>
  );
}
