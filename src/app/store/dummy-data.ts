import { Event } from "../core/models/event.model";

export const dummyEvents: Event[] = [
  {
    id: 1,
    title: "Angular Conference",
    description: "A conference about Angular",
    category: "Tech",
    dateTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
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
    dateTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
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
    dateTime: new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
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
    dateTime: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
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
    dateTime: new Date(new Date().getTime() + 75 * 24 * 60 * 60 * 1000), // 75 days from now
    location: "Chicago",
    availableTickets: 400,
    price: 79.99,
    pictures: ["assets/images/events/food-expo.jpg"],
  },
];

// Add a property to mark featured events
export const featuredEventIds = [3, 4, 5];

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export const eventCategories: Category[] = [
  {
    id: 1,
    name: "Music",
    image: "assets/images/categories/music.jpg",
    count: 12,
  },
  {
    id: 2,
    name: "Sports",
    image: "assets/images/categories/sports.jpg",
    count: 8,
  },
  {
    id: 3,
    name: "Art",
    image: "assets/images/categories/arts.jpg",
    count: 15,
  },
  {
    id: 4,
    name: "Food",
    image: "assets/images/categories/food.jpg",
    count: 10,
  },
  {
    id: 5,
    name: "Technology",
    image: "assets/images/categories/technology.jpg",
    count: 6,
  },
  {
    id: 6,
    name: "Business",
    image: "assets/images/categories/business.jpg",
    count: 9,
  },
];
