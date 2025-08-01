export type Tier = "free" | "silver" | "gold" | "platinum";

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: Tier;
};