import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Crunch & Munch — Support, FAQs & Shipping" },
      {
        name: "description",
        content:
          "Reach the Crunch & Munch team for orders, bulk enquiries and returns. Read our FAQs plus shipping and returns policy.",
      },
      { property: "og:title", content: "Contact Crunch & Munch" },
      {
        property: "og:description",
        content: "Support, FAQs, shipping and returns — everything you need in one place.",
      },
    ],
  }),
  component: Contact,
});

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 24 hours and reach most Indian PIN codes in 2–4 working days. Metro cities usually get theirs in 48 hours.",
  },
  {
    q: "What are the shipping charges?",
    a: "Flat ₹49 for orders under ₹499, and completely free above that. No hidden handling fees at checkout.",
  },
  {
    q: "Can I return a snack?",
    a: "If a pack arrives damaged, stale or leaking, send us a photo within 48 hours of delivery and we'll refund or replace it — no questions asked. Opened packs that are simply not to your taste can't be returned for food-safety reasons.",
  },
  {
    q: "How fresh are the snacks?",
    a: "Everything is fried or baked in small batches and nitrogen-sealed the same day. Best before is 4 months from packing, printed on every pack.",
  },
  {
    q: "Do you take bulk or corporate orders?",
    a: "Yes! We do office snack boxes, wedding hampers and event orders from 50 packs upwards. Email bulk@crunchandmunch.in for a quote.",
  },
];

function Contact() {
  return (
    <>
      <section className="gradient-cream">
        <div className="container-x py-14 md:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary">
            Contact Us
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-6xl">Say hello to the snack squad</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Order questions, flavour ideas, bulk enquiries or just to tell us which chip you love
            most — we read everything.
          </p>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { icon: Mail, title: "Email", lines: ["hello@crunchandmunch.in", "bulk@crunchandmunch.in"] },
              { icon: Phone, title: "Phone", lines: ["+91 98765 43210"] },
              { icon: MapPin, title: "Snack HQ", lines: ["42 Crunch Street", "Bengaluru 560001"] },
              { icon: Clock, title: "Support hours", lines: ["Mon–Sat, 9 am – 7 pm IST"] },
            ].map((c) => (
              <div key={c.title} className="rounded-3xl border border-border/70 bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
                    <c.icon size={18} />
                  </span>
                  <h2 className="text-lg">{c.title}</h2>
                </div>
                {c.lines.map((l) => (
                  <p key={l} className="mt-2 break-words text-sm text-muted-foreground">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <form
            className="shadow-soft space-y-5 rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent! We'll reply within one working day.");
              (e.target as HTMLFormElement).reset();
            }}
          >
            <h2 className="text-2xl">Send us a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" required placeholder="Your name" className="h-11 rounded-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="h-11 rounded-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-subject">Subject</Label>
              <Input
                id="c-subject"
                required
                placeholder="Order #, flavour idea, bulk order…"
                className="h-11 rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-msg">Message</Label>
              <Textarea id="c-msg" required rows={5} placeholder="Tell us everything" className="rounded-2xl" />
            </div>
            <Button type="submit" size="lg" variant="crunch">
              Send message
            </Button>
          </form>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x max-w-3xl">
          <h2 className="text-4xl sm:text-5xl">FAQs & shipping</h2>
          <p className="mt-3 text-muted-foreground">
            The quick answers — including our shipping and returns policy.
          </p>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-b border-border">
                <AccordionTrigger className="text-left text-base font-extrabold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
