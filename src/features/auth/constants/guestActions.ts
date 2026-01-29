import {
  CalendarSync,
  KeyRound,
  LucideIcon,
  Send,
  UserRoundPlus,
} from "lucide-react";

type UserActionType = {
  id: string;
  icon: LucideIcon;
  label: string;
  to: string;
};
export const GUEST_ACTION: UserActionType[] = [
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
    id: "login",
    icon: KeyRound,
    label: "Sign in",
    to: "/login",
  },
  {
    id: "create",
    icon: UserRoundPlus,
    label: "Create accout",
    to: "/register",
  },
];
