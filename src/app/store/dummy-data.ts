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
  {
    id: 3,
    title: "Summer Music Festival",
    description: "Experience the best of live music under the stars",
    category: "Music",
    dateTime: new Date("2024-06-25T18:00:00"),
    location: "Miami Beach",
    availableTickets: 500,
    price: 149.99,
    pictures: ["assets/images/events/music-festival.jpg"],
  },
  {
    id: 4,
    title: "Tech Conference 2024",
    description: "Join industry leaders in technology and innovation",
    category: "Technology",
    dateTime: new Date("2024-07-15T09:00:00"),
    location: "San Francisco",
    availableTickets: 300,
    price: 299.99,
    pictures: ["assets/images/events/tech-conference.jpg"],
  },
  {
    id: 5,
    title: "Food & Wine Expo",
    description: "Taste extraordinary cuisines from around the world",
    category: "Food & Drink",
    dateTime: new Date("2024-08-10T11:00:00"),
    location: "Chicago",
    availableTickets: 400,
    price: 79.99,
    pictures: ["assets/images/events/food-expo.jpg"],
  },
];

// Add a property to mark featured events
export const featuredEventIds = [3, 4, 5];

export interface Category {
  name: string;
  image: string;
  count?: number;
}

export const eventCategories: Category[] = [
  { name: "Music", image: "assets/images/categories/music.jpg", count: 5 },
  { name: "Technology", image: "assets/images/categories/technology.jpg", count: 3 },
  { name: "Food & Drink", image: "assets/images/categories/food.jpg", count: 4 },
  { name: "Sports", image: "assets/images/categories/sports.jpg", count: 2 },
  { name: "Arts", image: "assets/images/categories/arts.jpg", count: 3 },
  { name: "Business", image: "assets/images/categories/business.jpg", count: 2 },
];
