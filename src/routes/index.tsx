import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeIndianRupee,
  Instagram,
  Leaf,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroImg from "@/assets/hero-snacks.jpg";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import gal4 from "@/assets/gal-4.jpg";
import gal5 from "@/assets/gal-5.jpg";
import gal6 from "@/assets/gal-6.jpg";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crunch & Munch — Crunch. Munch. Repeat." },
      {
        name: "description",
        content:
          "Your favourite snacks, made for every craving. Shop crispy chips, cheesy nachos, caramel popcorn, cookies, namkeen and healthy snacks with fast delivery.",
      },
      { property: "og:title", content: "Crunch & Munch — Crunch. Munch. Repeat." },
      {
        property: "og:description",
        content: "Fresh, crispy and affordable snacks delivered across India. Get 20% off your first order.",
      },
    ],
  }),
  component: Home,
});

const perks = [
  { icon: Zap, title: "Fresh & Crispy", text: "Sealed within hours of frying so every bite snaps." },
  { icon: Leaf, title: "Quality Ingredients", text: "No palm oil, no artificial colours, ever." },
  { icon: BadgeIndianRupee, title: "Affordable Prices", text: "Big-brand taste starting at just ₹40." },
  { icon: Truck, title: "Fast Delivery", text: "Doorstep delivery in 2–4 days, pan India." },
];

const reviews = [
  {
    name: "Ananya Sharma",
    role: "Student, Pune",
    rating: 5,
    text: "The Masala Magic Chips are dangerously good. My hostel room has become the official snack shop of our floor.",
  },
  {
    name: "Rohit Verma",
    role: "Product Designer, Bengaluru",
    rating: 5,
    text: "Caramel Cloud Popcorn is the best I've had outside a cinema. Packaging arrived perfectly intact too.",
  },
  {
    name: "Meera Iyer",
    role: "Mom of two, Chennai",
    rating: 4,
    text: "Finally snacks my kids love that I feel okay about. The roasted makhana disappears in a day.",
  },
  {
    name: "Karan Patel",
    role: "Analyst, Mumbai",
    rating: 5,
    text: "Ordered the Bombay Mix on Monday, got it Wednesday. Tastes exactly like my favourite Mumbai street stall.",
  },
];

const gallery = [gal1, gal2, gal3, gal4, gal5, gal6];

function Home() {
  const bestSellers = products.filter((p) => p.bestSeller);
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="gradient-cream relative overflow-hidden">
        <div className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-14">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-accent-foreground">
              <Sparkles size={14} /> Freshly fried, freshly sealed
            </span>
            <h1 className="mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Crunch. <span className="text-primary">Munch.</span> Repeat.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Your favourite snacks, made for every craving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="crunch">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link to="/shop" search={{ category: "Chips" }}>
                  Explore Snacks <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
            <dl className="mt-10 flex flex-wrap gap-8">
              {[
                ["1.2 L+", "Packets munched"],
                ["4.8★", "Average rating"],
                ["24 hrs", "Order dispatch"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="text-display text-2xl text-primary">{v}</dt>
                  <dd className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-pop-in relative">
            <div className="absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-accent/50 blur-2xl sm:block" />
            <img
              src={heroImg}
              alt="A spread of assorted snacks: chips, nachos, popcorn, cookies and namkeen"
              width={1600}
              height={1200}
              className="shadow-lift relative w-full rounded-[2.5rem] object-cover"
            />
            <div className="shadow-soft absolute -bottom-5 left-4 rounded-2xl bg-card px-4 py-3 sm:left-8">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Starting at
              </p>
              <p className="text-display text-2xl text-primary">₹40</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="gradient-warm overflow-hidden py-3 text-cocoa">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap text-sm font-extrabold uppercase tracking-widest">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex gap-8">
              {["Crispy", "Cheesy", "Caramel", "Masala", "Baked", "Buttery", "Spicy", "Fresh"].map(
                (w) => (
                  <span key={w} className="flex items-center gap-8">
                    {w} <span className="opacity-60">✦</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="section">
        <div className="container-x">
          <SectionHead
            kicker="Featured Categories"
            title="Pick your crunch"
            text="Six shelves of snackable joy — from desi masala classics to baked-not-fried bites."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/shop"
                search={{ category: c.name }}
                className="card-hover group overflow-hidden rounded-3xl border border-border/70 bg-card p-3 text-center"
              >
                <div className="overflow-hidden rounded-2xl bg-cream">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-3 text-base">{c.name}</h3>
                <p className="pb-1 text-xs text-muted-foreground">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="section bg-cream">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              kicker="Best Sellers"
              title="The crowd favourites"
              text="Loved by 1.2 lakh+ snackers and counting."
              align="left"
            />
            <Button asChild variant="outline">
              <Link to="/shop">
                View all snacks <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container-x">
          <SectionHead
            kicker="Why Choose Us?"
            title="Snacks you can trust"
            text="Small batches, honest ingredients and delivery that actually shows up on time."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <div
                key={p.title}
                className="card-hover rounded-3xl border border-border/70 bg-card p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <p.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer banner */}
      <section className="container-x pb-4">
        <div className="gradient-warm shadow-lift relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-center text-cocoa sm:px-12 sm:py-16">
          <div className="animate-float absolute -left-8 top-6 h-28 w-28 rounded-full bg-cocoa/10 blur-xl" />
          <p className="text-xs font-extrabold uppercase tracking-[0.25em]">Limited time</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">
            Get 20% OFF on your first order
          </h2>
          <p className="mt-4 text-base font-bold opacity-80">
            Use code <span className="rounded-lg bg-cocoa/10 px-2 py-1">CRUNCH20</span> at checkout.
          </p>
          <Button asChild size="xl" variant="cocoa" className="mt-8">
            <Link to="/shop">Grab the Deal</Link>
          </Button>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container-x">
          <SectionHead
            kicker="Customer Reviews"
            title="Snackers say it best"
            text="Real reviews from real crunch addicts."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="card-hover flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6"
              >
                <StarRating rating={r.rating} size={16} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
                    {r.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold">{r.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead
            kicker="@crunchandmunch"
            title="Snack-stagram"
            text="Tag us in your snack moments for a chance to be featured."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.map((g, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative overflow-hidden rounded-3xl"
              >
                <img
                  src={g}
                  alt="Crunch & Munch snack moment"
                  loading="lazy"
                  width={700}
                  height={700}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-cocoa/45 text-cocoa-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <Instagram size={24} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section">
        <div className="container-x">
          <div className="shadow-soft mx-auto max-w-3xl rounded-[2.5rem] border border-border/70 bg-card px-6 py-12 text-center sm:px-12">
            <h2 className="text-4xl">Stay in the Snack Loop!</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              New flavours, secret drops and subscriber-only discounts. No spam, only crunch.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("You're in! Check your inbox for 20% off.");
                setEmail("");
              }}
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="h-12 rounded-full px-5"
              />
              <Button type="submit" size="lg" variant="crunch">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  kicker,
  title,
  text,
  align = "center",
}: {
  kicker: string;
  title: string;
  text: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h2 className="mt-3 text-4xl sm:text-5xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{text}</p>
    </div>
  );
}
