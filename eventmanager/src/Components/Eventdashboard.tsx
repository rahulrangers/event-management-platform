import { useContext, useState, useMemo, useEffect } from "react";
import { usercontext } from "../context/Usercontext";
import EventCard from "./EventCard";
import Event from "./Event";
import { useFetchEvents } from "../hooks/usefetchevents";
import { useEventFilter } from "../hooks/usefilterevents";
import { EventType } from "../types/Event";
import { createwebsocket } from "../utils/index";
import Loading from "./Loading";
import User from "../types/User";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const socket = createwebsocket(`${BASE_URL}`);

export const EventDashboard = () => {
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [selectedevent, setSelectedEvent] = useState<EventType | null>(null); 
  const { userinfo, loading,setUserinfo } = useContext(usercontext);
  const { events, setEvents, isLoading, error } = useFetchEvents();
  const filteredEvents = useEventFilter(events, filter);

  const searchedEvents = useMemo(() => {
    return filteredEvents.filter((event) => {
      const searchText = searchQuery.toLowerCase();
      return (
        event.name.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText)
      );
    });
  }, [searchQuery, filteredEvents]);

  useEffect(() => {
    const handleUpdateEvent = (data: { eventId: string; attendees: number }) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventId === data.eventId
            ? { ...event, attendees: event.attendees + 1 }
            : event
        )
      );
      setUserinfo((user:User) => ({
        ...user,myevents:[...user.myevents,data.eventId]
      }))
    };

    socket.on("updateEvent", handleUpdateEvent);
    return () => {
      socket.off("updateEvent", handleUpdateEvent);
    };
  }, []);

  if (isLoading || loading) {
    return (
      <Loading />
    );
  }
 
  if (error) {
    return <div className="text-red-500 text-center flex justify-center">{error}</div>;
  }
  if (!selectedevent && events?.length > 0) setSelectedEvent(events[0]);
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-700">Event Dashboard</h1>
        <p className="text-gray-500">Discover and manage events effortlessly.</p>
      </div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events by title, location or category"
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <div className="flex space-x-4">
          {["all", "upcoming", "past"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as "all" | "upcoming" | "past")}
              className={`px-4 py-2 text-sm rounded-md ${
                filter === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Events
            </button>
          ))}
        </div>
      </div>

      <div className="md3:grid md3:grid-cols-5 flex justify-center gap-6">
        <div className="md3:col-span-2 w-full max-h-[80vh] overflow-y-auto overflow-x-hidden bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Event List
          </h2>
          <div className="flex justify-center md3:flex-col items-center flex-wrap "> 
          {searchedEvents.length === 0 ? (
            <div className="text-gray-500 text-center">
              No events found. Try a different filter or search.
            </div>
          ) : (
            searchedEvents.map((event: EventType, i: number) => (
              <EventCard
                key={i}
                event={event}
                onSelect={() => setSelectedEvent(event)}
                selectedid={selectedevent?.eventId}
                registered={
                  userinfo && userinfo.myevents.length > 0
                    ? userinfo.myevents.includes(event.eventId)
                    : false
                }
              />
            ))
          )}
          </div>
        </div>
        <div className="col-span-3 h-screen max-h-[80vh] overflow-y-auto hidden md3:block bg-white shadow-md rounded-lg p-6">
          {selectedevent ? (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Event Details
              </h2>
              <Event event={selectedevent} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select an event to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
