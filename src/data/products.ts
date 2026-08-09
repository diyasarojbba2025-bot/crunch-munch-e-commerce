import chips from "@/assets/prod-chips.jpg";
import nachos from "@/assets/prod-nachos.jpg";
import popcorn from "@/assets/prod-popcorn.jpg";
import cookies from "@/assets/prod-cookies.jpg";
import namkeen from "@/assets/prod-namkeen.jpg";
import healthy from "@/assets/prod-healthy.jpg";

export type Category =
  | "Chips"
  | "Nachos"
  | "Popcorn"
  | "Cookies"
  | "Namkeen"
  | "Healthy Snacks";

export const categories: { name: Category; blurb: string; image: string }[] = [
  { name: "Chips", blurb: "Wafer-thin & wildly crispy", image: chips },
  { name: "Nachos", blurb: "Loaded, cheesy, unstoppable", image: nachos },
  { name: "Popcorn", blurb: "Buttery clouds of crunch", image: popcorn },
  { name: "Cookies", blurb: "Bakery-soft, choc-loaded", image: cookies },
  { name: "Namkeen", blurb: "Desi masala classics", image: namkeen },
  { name: "Healthy Snacks", blurb: "Baked, never fried", image: healthy },
];

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  longDescription: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  weight: string;
  image: string;
  bestSeller?: boolean;
  tag?: string;
};

export const products: Product[] = [
  {
    id: "masala-magic-chips",
    name: "Masala Magic Chips",
    category: "Chips",
    description: "Kettle-cooked potato chips tossed in fiery desi masala.",
    longDescription:
      "Hand-picked potatoes sliced wafer-thin, kettle-cooked in small batches and dusted with our 11-spice masala blend. Big crunch, bigger flavour — the packet never survives a movie.",
    price: 45,
    mrp: 60,
    rating: 4.8,
    reviews: 1284,
    weight: "90 g",
    image: chips,
    bestSeller: true,
    tag: "Fan Favourite",
  },
  {
    id: "salted-classic-chips",
    name: "Salted Classic Chips",
    category: "Chips",
    description: "Just potatoes, sunflower oil and a pinch of sea salt.",
    longDescription:
      "The original. Three ingredients, zero shortcuts, endless crunch. Perfect with dips or straight out of the pack.",
    price: 40,
    mrp: 50,
    rating: 4.6,
    reviews: 842,
    weight: "90 g",
    image: chips,
  },
  {
    id: "cheesy-blast-nachos",
    name: "Cheesy Blast Nachos",
    category: "Nachos",
    description: "Corn triangles loaded with real cheddar seasoning.",
    longDescription:
      "Stone-ground corn nachos baked till golden, then coated in aged cheddar seasoning. Scoop-strong so they never snap in the salsa.",
    price: 85,
    mrp: 110,
    rating: 4.9,
    reviews: 1610,
    weight: "150 g",
    image: nachos,
    bestSeller: true,
    tag: "Trending",
  },
  {
    id: "jalapeno-nachos",
    name: "Jalapeño Fire Nachos",
    category: "Nachos",
    description: "Smoky nachos with a slow-building green chilli kick.",
    longDescription:
      "For the heat seekers. Roasted jalapeño and lime seasoning on our signature corn triangles.",
    price: 89,
    mrp: 115,
    rating: 4.5,
    reviews: 502,
    weight: "150 g",
    image: nachos,
  },
  {
    id: "caramel-cloud-popcorn",
    name: "Caramel Cloud Popcorn",
    category: "Popcorn",
    description: "Air-popped corn drizzled in slow-cooked caramel.",
    longDescription:
      "Butterfly kernels air-popped and hand-glazed with copper-kettle caramel. Light as a cloud, sweet as a Sunday.",
    price: 120,
    mrp: 150,
    rating: 4.9,
    reviews: 2140,
    weight: "120 g",
    image: popcorn,
    bestSeller: true,
    tag: "Best Seller",
  },
  {
    id: "butter-salt-popcorn",
    name: "Movie Night Butter Popcorn",
    category: "Popcorn",
    description: "Cinema-style buttery popcorn, ready in the pack.",
    longDescription:
      "The smell of the multiplex, at home. Real butter seasoning, fluffy pop, no unpopped duds.",
    price: 99,
    mrp: 125,
    rating: 4.7,
    reviews: 977,
    weight: "120 g",
    image: popcorn,
  },
  {
    id: "double-choc-cookies",
    name: "Double Choc Chunk Cookies",
    category: "Cookies",
    description: "Gooey centres packed with Belgian chocolate chunks.",
    longDescription:
      "Baked fresh every morning with cocoa-rich dough and fat chocolate chunks that melt on contact. Soft middle, crisp edge.",
    price: 149,
    mrp: 190,
    rating: 4.8,
    reviews: 1330,
    weight: "200 g",
    image: cookies,
    bestSeller: true,
    tag: "Freshly Baked",
  },
  {
    id: "butter-atta-cookies",
    name: "Butter Atta Cookies",
    category: "Cookies",
    description: "Whole-wheat bakery cookies with pure ghee butter.",
    longDescription:
      "An old-school bakery recipe made with whole wheat atta and pure butter. The perfect chai companion.",
    price: 110,
    mrp: 135,
    rating: 4.6,
    reviews: 618,
    weight: "200 g",
    image: cookies,
  },
  {
    id: "bombay-mix-namkeen",
    name: "Bombay Mix Namkeen",
    category: "Namkeen",
    description: "Crunchy sev, peanuts and curry leaves masala mix.",
    longDescription:
      "Our take on the street-side classic: besan sev, roasted peanuts, corn flakes and fried curry leaves in a tangy masala.",
    price: 75,
    mrp: 95,
    rating: 4.7,
    reviews: 1105,
    weight: "250 g",
    image: namkeen,
    bestSeller: true,
    tag: "Desi Classic",
  },
  {
    id: "masala-peanuts",
    name: "Masala Coated Peanuts",
    category: "Namkeen",
    description: "Crackly spiced shell over roasted jumbo peanuts.",
    longDescription:
      "Jumbo peanuts in a crisp besan shell with chilli, amchur and black salt. Dangerously snackable.",
    price: 65,
    mrp: 80,
    rating: 4.5,
    reviews: 430,
    weight: "200 g",
    image: namkeen,
  },
  {
    id: "roasted-makhana",
    name: "Roasted Peri Peri Makhana",
    category: "Healthy Snacks",
    description: "Lotus seeds roasted in peri peri — only 90 calories.",
    longDescription:
      "Hand-roasted foxnuts with a peri peri dusting. High in protein, low in guilt, zero palm oil.",
    price: 130,
    mrp: 160,
    rating: 4.7,
    reviews: 726,
    weight: "80 g",
    image: healthy,
    bestSeller: true,
    tag: "Guilt-Free",
  },
  {
    id: "baked-veggie-crisps",
    name: "Baked Veggie Crisps",
    category: "Healthy Snacks",
    description: "Beetroot, sweet potato and okra crisps — baked, not fried.",
    longDescription:
      "Real vegetables, thinly sliced and slow-baked with rock salt. All the crunch with 40% less fat.",
    price: 140,
    mrp: 175,
    rating: 4.4,
    reviews: 318,
    weight: "100 g",
    image: healthy,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const inr = (n: number) => `₹${n.toFixed(0)}`;
