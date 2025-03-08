export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  dateTime: Date;
  location: string;
  availableTickets: number;
  price: number;
  pictures: string[];
}
