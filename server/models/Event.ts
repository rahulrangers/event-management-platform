import mongoose, { Schema, Document } from 'mongoose';


export interface IEvent extends Document {
    eventId: String;
    name: string;
    description: string;
    date: Date;
    attendees: number; 
    createdBy: string; 
    imageUrl: string;
    location: string;
    category: string;
}
const EventSchema: Schema = new Schema(
    {
        eventId: { type: String, required: true, unique: true },
        location: { type: String, required: true },
        category: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        imageUrl: { type: String, required: true },
        attendees:
            { type: Number, default:0}, 
        createdBy: {
            type: String, 
            required: true,
        },
    },
    { timestamps: true } 
);


const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
