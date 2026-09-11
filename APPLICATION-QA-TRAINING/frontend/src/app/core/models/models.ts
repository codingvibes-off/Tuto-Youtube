export interface Destination {
  id: number;
  slug: string;
  city: string;
  country: string;
  imageUrl: string;
  description: string;
  popular: boolean;
}

export interface Flight {
  id: number;
  destinationId: number;
  destination: Destination;
  airline: string;
  departAirport: string;
  arriveAirport: string;
  departTime: string;
  arriveTime: string;
  durationMinutes: number;
  price: number;
  stops: number;
  imageUrl: string;
}

export interface Hotel {
  id: number;
  destinationId: number;
  destination: Destination;
  name: string;
  stars: number;
  pricePerNight: number;
  imageUrl: string;
  address: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
}

export interface HotelReview {
  id: number;
  hotelId: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type CartItemType = 'FLIGHT' | 'HOTEL';

export interface CartItem {
  id: number;
  userId: number;
  type: CartItemType;
  refId: number;
  label: string;
  imageUrl: string;
  unitPrice: number;
  travelers: number;
  startDate: string;
  endDate: string | null;
  promoCode: string | null;
  createdAt: string;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export type BookingStatus = 'CONFIRMED' | 'CANCELLED';

export interface BookingItem {
  id: number;
  bookingId: number;
  type: CartItemType;
  refId: number;
  label: string;
  imageUrl: string;
  unitPrice: number;
  travelers: number;
  startDate: string;
  endDate: string | null;
}

export interface Booking {
  id: number;
  userId: number;
  reference: string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: string;
  items: BookingItem[];
  user?: { id: number; name: string; email: string };
}

export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  discountPercent: number;
  active: boolean;
  createdAt: string;
}

export interface PaymentErrorResponse {
  success: false;
  errorCode: 'EXPIRED_CARD' | 'CARD_DECLINED';
  message: string;
}

export interface PaymentSuccessResponse {
  success: true;
  booking: Booking;
}

export type PaymentResponse = PaymentErrorResponse | PaymentSuccessResponse;

export interface AdminStats {
  bookingCount: number;
  revenue: number;
  userCount: number;
}
