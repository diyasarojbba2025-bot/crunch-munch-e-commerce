import { createFileRoute, Link } from "@tanstack/react-router";
import { Factory, HeartHandshake, Sprout } from "lucide-react";
import gal1 from "@/assets/gal-1.jpg";
import gal6 from "@/assets/gal-6.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Crunch & Munch — Our Snack Story" },
      {
        name: "description",
        content:
          "Born in a Bengaluru kitchen in 2019, Crunch & Munch makes small-batch snacks with honest ingredients, no palm oil and a lot of crunch.",
      },
      { property: "og:title", content: "About Crunch & Munch — Our Snack Story" },
      {
        property: "og:description",
        content: "How two hungry friends turned a kitchen experiment into India's crunchiest snack brand.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Sprout,
    title: "Honest ingredients",
    text: "Sunflower oil, real spices, real cheese. No palm oil, no artificial colours, no mystery numbers.",
  },
  {
    icon: Factory,
    title: "Small-batch kitchens",
    text: "We fry in 30 kg batches so we can taste-test every single one before it's sealed.",
  },
  {
    icon: HeartHandshake,
    title: "Fair to farmers",
    text: "Potatoes, corn and makhana bought direct from farmer collectives in UP, Bihar and Gujarat.",
  },
];

function About() {
  return (
    <>
      <section className="gradient-cream">
        <div className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary">
              About Us
            </p>
            <h1 className="mt-3 text-4xl sm:text-6xl">
              Two friends. One <span className="text-primary">very</span> loud kitchen.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Crunch & Munch started in 2019 when Aditi and Rahul got tired of paying premium prices
              for stale snacks. One borrowed fryer and 400 taste tests later, our first batch of
              Masala Magic Chips sold out in a single evening.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today we make eight kinds of snacks for students, hostellers, desk-lunchers and
              families across India — still in small batches, still obsessively taste-tested.
            </p>
            <Button asChild variant="crunch" size="lg" className="mt-8">
              <Link to="/shop">Taste our range</Link>
            </Button>
          </div>
          <img
            src={gal1}
            alt="Friends sharing bowls of Crunch & Munch snacks"
            loading="lazy"
            width={700}
            height={700}
            className="shadow-lift w-full rounded-[2.5rem] object-cover"
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="text-4xl sm:text-5xl">What we stand for</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-hover rounded-3xl border border-border/70 bg-card p-7"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-4 text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <img
            src={gal6}
            alt="Colourful Crunch & Munch snack packets"
            loading="lazy"
            width={700}
            height={700}
            className="shadow-soft w-full rounded-[2.5rem] object-cover"
          />
          <div>
            <h2 className="text-4xl sm:text-5xl">Privacy & the fine print</h2>
            <p className="mt-5 text-muted-foreground">
              We only collect what we need to deliver your snacks — your name, address, phone and
              email. We never sell your data, and we never send more than two emails a month.
              Payments are handled by certified partners, so card details never touch our servers.
            </p>
            <p className="mt-4 text-muted-foreground">
              Questions about an order, a return or an ingredient list? Our team replies within one
              working day.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
