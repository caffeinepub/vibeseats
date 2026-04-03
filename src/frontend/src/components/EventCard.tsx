import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Tag } from "lucide-react";
import type { Event } from "../types/events";

const CATEGORY_COLORS: Record<string, string> = {
  sports: "oklch(0.55 0.18 260)",
  concerts: "oklch(0.55 0.22 290)",
  theater: "oklch(0.55 0.16 240)",
  festivals: "oklch(0.55 0.20 320)",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  sports: "linear-gradient(135deg, oklch(0.20 0.04 260), oklch(0.25 0.08 270))",
  concerts:
    "linear-gradient(135deg, oklch(0.20 0.04 290), oklch(0.25 0.08 295))",
  theater:
    "linear-gradient(135deg, oklch(0.20 0.04 240), oklch(0.25 0.08 250))",
  festivals:
    "linear-gradient(135deg, oklch(0.20 0.04 320), oklch(0.25 0.08 330))",
};

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 1 }: EventCardProps) {
  return (
    <article
      className="group rounded-xl overflow-hidden border border-white/8 transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5"
      style={{ background: "oklch(0.18 0.025 265)" }}
      data-ocid={`events.item.${index}`}
    >
      <div className="relative h-36 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                CATEGORY_GRADIENTS[event.category] ||
                CATEGORY_GRADIENTS.concerts,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 left-2">
          <Badge
            className="text-xs capitalize px-2 py-0.5 border-0 text-white"
            style={{
              background:
                CATEGORY_COLORS[event.category] || CATEGORY_COLORS.concerts,
            }}
          >
            {event.category}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-sm leading-snug text-foreground line-clamp-2">
          {event.name}
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="w-3 h-3 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">
              {event.venue} &middot; {event.city}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag className="w-3 h-3" />
            <span>
              From{" "}
              <span className="text-foreground font-semibold">
                ${event.minPrice}
              </span>
            </span>
          </div>
          <a
            href={`/event/${event.id}`}
            className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-foreground hover:border-purple-500/60 hover:bg-purple-500/10 transition-all"
            data-ocid="events.button"
          >
            Find Tickets
          </a>
        </div>
      </div>
    </article>
  );
}
