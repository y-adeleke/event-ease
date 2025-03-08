import { Event } from "../core/models/event.model";

export const dummyEvents: Event[] = [
  {
    id: 1,
    title: "Angular Conference",
    description: "A conference about Angular",
    category: "Tech",
    dateTime: new Date("2025-05-15T09:00:00"),
    location: "New York",
    availableTickets: 100,
    price: 99.99,
    pictures: ["assets/images/angular_conf.jpg"],
  },
  {
    id: 2,
    title: "Music Festival",
    description: "A great music festival",
    category: "Music",
    dateTime: new Date("2025-06-20T16:00:00"),
    location: "Los Angeles",
    availableTickets: 200,
    price: 49.99,
    pictures: ["assets/images/music_festival.jpg"],
  },
];
