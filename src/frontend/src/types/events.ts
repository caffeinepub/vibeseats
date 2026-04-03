export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  category: "sports" | "concerts" | "theater" | "festivals";
  minPrice: number;
  image: string | null;
  description?: string;
}

export interface TicketListing {
  id: string;
  section: string;
  row: string;
  quantity: number;
  pricePerTicket: number;
  seller: string;
}

export interface CartItem {
  eventId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  section: string;
  row: string;
  quantity: number;
  pricePerTicket: number;
}
