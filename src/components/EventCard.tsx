// src/components/EventCard.tsx
import { Event, Tier } from "@/types";
import Image from "next/image";
import { Lock } from "lucide-react"; // A nice lock icon

const tierColors: Record<Tier, string> = {
  free: "bg-green-100 text-green-800 border border-green-200",
  silver: "bg-gray-200 text-gray-800 border border-gray-300",
  gold: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  platinum: "bg-slate-200 text-slate-800 border border-slate-300",
};

interface EventCardProps {
  event: Event;
  isLocked: boolean;
}

export default function EventCard({ event, isLocked }: EventCardProps) {
  // If the event is locked, render the locked card UI
  if (isLocked) {
    return (
      <div className="relative border rounded-xl bg-gray-100 p-5 text-center shadow-sm">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <Lock className="text-gray-400 w-12 h-12 mb-4" />
          <p className="text-gray-600 font-semibold">
            Upgrade to <span className="capitalize font-bold">{event.tier}</span> to access this event.
          </p>
        </div>
      </div>
    );
  }

  // Otherwise, render the normal, accessible card
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border">
      <div className="relative">
        <Image
          src={event.image_url}
          alt={event.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          unoptimized
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold rounded-full ${tierColors[event.tier]}`}
        >
          {event.tier}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-gray-500 text-sm font-medium mb-4">
          {new Date(event.event_date).toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </p>
        <p className="text-gray-700 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}