import { Anchor, Camera, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";
type EssenceType = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const ESSENCE_DATA: EssenceType[] = [
  {
    id: "pr",
    icon: Anchor,
    title: "Preserved Legacies",
    desc: "Our 400-year-old canal system isn't just a relic of the past. It is a living infrastructure maintained through eco-conscious traditional methods, ensuring the water remains a source of life for generations.",
  },
  {
    id: "aor",
    icon: Camera,
    title: "Architecture of Reuse",
    desc: "Sustainability is built into our walls. Instead of new construction, we breathe new life into historic Kura storehouses, repurposing them into world-class museums, artisan workshops, and zero-waste cafes.",
  },
  {
    id: "cc",
    icon: Leaf,
    title: "Conscious Connection",
    desc: "Every step you take in Kurashiki is an opportunity to connect with local craftspeople. Our mission is to foster travel that respects the environment while empowering the community through cultural exchange.",
  },
];
