import { useState, useEffect } from "react";
import { EventType } from "../types/Event";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const useFetchEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/events/allevents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setEvents(data.map((event: EventType) => ({ ...event, date: new Date(event.date) })));
      } catch (error) {
        setError("Failed to fetch events. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, isLoading,setEvents, error };
};
