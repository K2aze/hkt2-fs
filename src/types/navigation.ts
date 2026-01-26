export type NavItem = {
  id: string | number;
  label: string;
  target?: "home" | "other";
  href?: string;
  children?: NavItem[];
};
