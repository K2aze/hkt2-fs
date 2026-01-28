export interface User {
  id: number;
  username: string;
  createdAt: string;
}

export interface UserContact {
  fullName: string;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface SessionInfo {
  sessionId: string;
  expiresAt: string;
  createdAt: string;
}

export interface BookingSummary {
  total: number;
  new: number;
  scheduled: number;
  contacted: number;
}

export interface AuthMeResponse {
  user: User;
  contact: UserContact;
  session: SessionInfo;
  bookings: BookingSummary;
}

export interface GuestSessionResponse {
  isGuest: true;
  session: SessionInfo;
  bookings: {
    total: number;
  };
}
