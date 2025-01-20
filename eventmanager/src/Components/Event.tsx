import { memo } from "react";
import { EventType } from "../types/Event";
import { CalendarIcon, MapPinIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";

const Event = ({ event}: { event: EventType}) => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
        <img src={event.imageUrl} alt={event.name} className="absolute w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl font-bold">{event.name}</h1>
          <p className="text-lg mt-2">
            {event.date.toLocaleDateString()} - {event.date.toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">About the Event</h2>
          <p className="text-gray-600 text-lg">{event.description}</p>
        </section>
        <section className="space-y-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="w-6 h-6 mr-3 text-blue-500" />
            <span className="text-lg">
              {event.date.toLocaleDateString()} - {event.date.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="w-6 h-6 mr-3 text-green-500" />
            <span className="text-lg">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserIcon className="w-6 h-6 mr-3 text-purple-500" />
            <span className="text-lg">Hosted by: {event.createdBy}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <TagIcon className="w-6 h-6 mr-3 text-yellow-500" />
            <span className="text-lg">Category: {event.category}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserIcon className="w-6 h-6 mr-3 text-red-500" />
            <span className="text-lg">{event.attendees} Attendees</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(Event);
