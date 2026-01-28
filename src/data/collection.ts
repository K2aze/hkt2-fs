export type tagType = "heritage" | "art" | "food" | "tour";

type CollectionType = {
  id: string;
  tag: tagType;
  img: string;
  title: string;
  to: string;
};

export const COLLECTION_DATA: CollectionType[] = [
  {
    id: "6a6fdefb-6364-47fd-8cf2-905fb38f3b96",
    tag: "food",
    img: "/images/k20.jpg",
    title: "Ohte Manju Cafe",
    to: "/collection/ohte-manju-cafe",
  },
  {
    id: "3bb96bda-8f3c-4417-9f0f-e936cfb8fce7",
    tag: "food",
    img: "/images/k21.jpg",
    title: "Kurashiki Denim Street",
    to: "/collection/kurashiki-denim-street",
  },
  {
    id: "8675b971-8aa1-4424-b8a8-608862e3b9ab",
    tag: "heritage",
    img: "/images/k22.jpg",
    title: "Ohara Museum of Art",
    to: "/collection/ohte-manju-cafe",
  },
  {
    id: "4b90d231-2910-4c6b-863e-5029a67a08c4",
    tag: "heritage",
    img: "/images/k23.jpg",
    title: "Cafe El Greco",
    to: "/collection/cafe-el-greco",
  },
  {
    id: "98024d28-dbe9-494b-ab7d-77bfd63bf48f",
    tag: "food",
    img: "/images/k24.jpg",
    title: "White-Walled Streets: The Path of Tradition",
    to: "/collection/white-walled-streets-the-path-of-tradition",
  },
  {
    id: "3d631a5c-aa21-453c-841b-71f636177bb1",
    tag: "tour",
    img: "/images/k25.jpg",
    title: "Bikan Night Illumination",
    to: "/collection/bikan-night-illumination",
  },

  {
    id: "cb1241e8-e303-4c16-b77d-58356d53cd3d",
    tag: "food",
    img: "/images/k26.jpg",
    title: "Japanese Western-style Comfort Meals",
    to: "/collection/japanese-western-style-comfort-meals",
  },

  {
    id: "905a63a8-a692-4eb2-94db-186a74e78b2f",
    tag: "food",
    img: "/images/k27.jpg",
    title: "Coffee Ueda",
    to: "/collection/coffee-ueda",
  },

  {
    id: "a15fef00-0c6e-4399-b149-545c8b6174eb",
    tag: "food",
    img: "/images/k28.jpg",
    title: "Tako Tamago",
    to: "/collection/tako-tamago",
  },

  {
    id: "43d72fe3-8512-4798-976d-5932fad2cd26",
    tag: "art",
    img: "/images/k29.jpg",
    title: "Neko-no-Yume: The Cat-Lover's Tea Nook",
    to: "/collection/neko-no-yume-the-cat-lovers-tea-nook",
  },

  {
    id: "8cef1454-4547-47a5-b9b5-95c07f51ead1",
    tag: "food",
    img: "/images/k30.jpg",
    title: "Sano-ya: The Master of Fried Fish Crafts",
    to: "/collection/sano-ya-the-master-of-fried-fish-crafts",
  },

  {
    id: "54bd7be1-9bb1-4b5f-a5e5-5c0ea25d01ad",
    tag: "food",
    img: "/images/k31.jpg",
    title: "Hokkaido & Okayama Fusion Creamery",
    to: "/collection/hokkaido-okayama-fusion-creamery",
  },

  {
    id: "d95575b8-4404-4a58-9072-9c6a579ab1c5",
    tag: "food",
    img: "/images/k32.jpg",
    title: "Takoyaki & Karaage",
    to: "/collection/takoyaki-karaage",
  },

  {
    id: "5bd2d7dd-474b-4b39-97ff-59d7e6ea2dac",
    tag: "food",
    img: "/images/k33.jpg",
    title: "Hanetsuki Gyoza: The Crispy Wing House",
    to: "/collection/hanetsuki-gyoza-the-crispy-wing-house",
  },

  {
    id: "2324cf3e-0932-4f7b-8f6c-a0284bc4221a",
    tag: "food",
    img: "/images/k34.jpg",
    title: "Ikumen-ya: Authentic Kurashiki Tonkotsu",
    to: "/collection/ikumen-ya-authentic-kurashiki-tonkotsu",
  },
];
