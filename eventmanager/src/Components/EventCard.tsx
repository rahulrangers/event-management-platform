import { memo, useContext, useState } from "react";
import { usercontext } from "../context/Usercontext";
import { EventType } from "../types/Event";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Button, Dialog } from "@mui/material";
import Event from "./Event";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const EventCard = ({
  event,
  registered,
  onSelect,
  selectedid,
}: {
  event: EventType;
  registered: boolean;
  onSelect: () => void;
  selectedid: string | undefined;
}) => {
  const { eventId, imageUrl, date, attendees, name, location, category } = event;
  const { userinfo } = useContext(usercontext);
  const [isRegistered, setIsRegistered] = useState(registered);
  const [openModal, setOpenModal] = useState(false);

  const handleRegister = async () => {
    
    if (userinfo) {
      try {
        const register = await fetch(`${BASE_URL}/api/events/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: userinfo.userId,
            eventId,
          }),
        });

        if (register.ok) setIsRegistered(true);
      } catch (error) {
        console.error(error);
        alert("Failed to register for the event");
      }
    } else {
      alert("Please login to register");
    }
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <>
      <div
        onClick={onSelect}
        className={`border m-2 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 p-5 bg-white cursor-pointer w-[400px] ${
          selectedid === eventId ? "md3:border-blue-500 md3:bg-blue-50" : ""
        }`}
        style={{ height: "auto" }}
      >
        <img
          src={imageUrl}
          alt="Event"
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm shadow-slate-500"
        />
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm">{date.toLocaleDateString()}</span>
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h3>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600 bg-yellow-100 px-2 py-1 rounded-full">{category}</span>
        </div>
        
        <div className="flex justify-between items-center">
        {new Date() < new Date(event.date) ? (
              !isRegistered ? (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegister();
                  }}
                >
                  Register
                </Button>
              ) : (
                <div className="text-green-600 font-medium">
                  <span className="bg-green-100 px-4 py-2 rounded-md">Registered</span>
                </div>
              )
            ) : (
              <div className="flex items-center bg-blue-100 border border-blue-300 rounded-lg px-3 py-2 shadow-md">Completed</div>
            )}

        
          <div className="flex items-center bg-blue-100 border border-blue-300 rounded-lg px-3 py-2 shadow-md">
            <span className="text-2xl font-bold text-blue-600">{attendees}</span>
            <span className="ml-1 text-sm text-gray-600">Attendees</span>
          </div>
        </div>
        <div className="md3:hidden w-full mt-4">
          <Button variant="contained" fullWidth onClick={handleModalOpen}>
            View More
          </Button>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleModalClose} fullWidth maxWidth="md">
        <Event event={event} />
      </Dialog>
    </>
  );
};

export default memo(EventCard);
