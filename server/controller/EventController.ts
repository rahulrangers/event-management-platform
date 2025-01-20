import { Request, Response } from 'express';
import Event, { IEvent } from '../models/Event';
import { v4 as uuidv4 } from "uuid"; 
import { getIO } from "../websocket/socket"
import User from '../models/User';

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find({}, { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};


export const createEvent = async (req: Request, res: Response) => {
    const { name, description, date, createdBy,imageUrl,category,location } = req.body;
    const eventId = uuidv4();
    const newEvent: IEvent = new Event({
        eventId,
        name,
        description,
        date,
        attendees:0,
        createdBy,
        imageUrl,
        location,
        category
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

export const resgisterevent = async (req: Request, res: Response):Promise<void> => {
    const { eventId, userId } = req.body;

    try {
        const event = await Event.findOne({ eventId });
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        event.attendees += 1;
        await event.save();
        const user = await User.findOne(
            { userId } 
          );
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const io = getIO();
        io.emit("updateEvent", { eventId, message: "New attendee registered" });
        user.myevents.push(eventId);
        await user.save();
        res.status(200).json({ myevents: user.myevents });
    } catch (error) {
        console.error("Error registering event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};