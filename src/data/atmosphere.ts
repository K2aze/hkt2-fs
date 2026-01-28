export type selectProps = "spring" | "summer" | "autumn" | "nightlight";

type AtmosphereType = {
  id: selectProps;
  imgs: string[];
};

export const ATMOSPHERE_DATA: AtmosphereType[] = [
  {
    id: "spring",
    imgs: ["/images/k8.jpg", "/images/k9.jpg", "/images/k10.jpg"],
  },
  {
    id: "summer",
    imgs: ["/images/k11.jpg", "/images/k12.jpg", "/images/k13.jpg"],
  },

  {
    id: "autumn",
    imgs: ["/images/k14.jpg", "/images/k15.jpg", "/images/k16.jpg"],
  },

  {
    id: "nightlight",
    imgs: ["/images/k17.jpg", "/images/k18.jpg", "/images/k19.jpg"],
  },
];
