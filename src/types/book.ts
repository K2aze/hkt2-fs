export interface Booking {
  fullName: string;
  email: string;
  phoneNumber: string;
  bookingDate: string;
  people: number;
  service: [number];
  time: "morning" | "afternoon" | "evening";
  request: string;
  subscription: boolean;
}
