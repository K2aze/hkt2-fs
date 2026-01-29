import { CalendarSync, LucideIcon, Send, UserRoundPen } from "lucide-react";
type UserActionType = {
  id: string;
  icon: LucideIcon;
  label: string;
  to: string;
};

export const USER_ACTION: UserActionType[] = [
  {
    id: "book",
    icon: Send,
    label: "Book a tour",
    to: "/booking",
  },
  {
    id: "manage",
    icon: CalendarSync,
    label: "Manage booking",
    to: "/bookings",
  },
  {
    id: "edit",
    icon: UserRoundPen,
    label: "Edit profile",
    to: "/",
  },
];
