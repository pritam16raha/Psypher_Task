import { Event, Tier } from "@/types";
import EventCard from "./EventCard";

interface EventListProps {
  events: Event[];
  accessibleTiers: Tier[];
}

export default function EventList({ events, accessibleTiers }: EventListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => {
        const isLocked = !accessibleTiers.includes(event.tier);
        return <EventCard key={event.id} event={event} isLocked={isLocked} />;
      })}
    </div>
  );
}
