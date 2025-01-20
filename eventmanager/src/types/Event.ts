export interface EventType {
  eventId: string;
  name: string;
  description: string;
  date: Date;
  attendees: number;
  createdBy: string;
  imageUrl: string;
  location: string;
  category: string;
}