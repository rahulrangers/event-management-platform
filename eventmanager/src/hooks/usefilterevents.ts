import { useState, useEffect } from "react";
import { EventType } from "../types/Event";

export const useEventFilter = (events: EventType[], filter: "upcoming" | "past" | "all") => {
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const now = new Date();
    let filtered = events;

    if (filter === "upcoming") {
      filtered = events.filter((event) => event.date > now);
    } else if (filter === "past") {
      filtered = events.filter((event) => event.date < now);
    }

    setFilteredEvents(filtered);
  }, [filter, events]);

  return filteredEvents;
};
