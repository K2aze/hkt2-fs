import { NavItem } from "@/types/navigation";

export const MAIN_NAV: NavItem[] = [
  {
    id: "about",
    label: "About This Place",
    children: [
      {
        id: 0,
        label: "Place 1",
        target: "other",
        href: "#",
      },
      {
        id: 1,
        label: "Place 2",
        target: "other",
        href: "#",
      },
      {
        id: 2,
        label: "Place 3",
        target: "other",
        href: "#",
      },
      {
        id: 3,
        label: "Place 4",
        target: "other",
        href: "#",
      },
    ],
  },
  {
    id: "info",
    label: "Visitor Info",
    children: [
      {
        id: 0,
        label: "Getting here",
        target: "other",
        href: "#",
      },
      {
        id: 1,
        label: "Getting around",
        target: "other",
        href: "#",
      },
      {
        id: 2,
        label: "Travel information",
        target: "other",
        href: "#",
      },
      {
        id: 3,
        label: "Weather",
        target: "other",
        href: "#",
      },
      {
        id: 4,
        label: "Contact us",
        target: "other",
        href: "#",
      },
      {
        id: 5,
        label: "Blog",
        target: "other",
        href: "#",
      },
    ],
  },
  {
    id: "things",
    label: "Things to do",
    children: [
      {
        id: 0,
        label: "Adventure & Outdoors",
        target: "other",
        href: "#",
      },
      {
        id: 1,
        label: "Arts & Culture",
        target: "other",
        href: "#",
      },
      {
        id: 2,
        label: "Eat & Drink",
        target: "other",
        href: "#",
      },
      {
        id: 3,
        label: "Shopping",
        target: "other",
        href: "#",
      },
      {
        id: 4,
        label: "Events & Festivals",
        target: "other",
        href: "#",
      },
    ],
  },
  {
    id: 4,
    label: "Trip idea",
    target: "other",
    href: "#",
  },
];
