import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inr } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Crunch & Munch" },
      {
        name: "description",
        content:
          "Secure checkout for your Crunch & Munch order. Enter delivery details, apply CRUNCH20 and pay on delivery or online.",
      },
      { property: "og:title", content: "Checkout — Crunch & Munch" },
      { property: "og:description", content: "Complete your snack order in a few quick steps." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotal, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [placed, setPlaced] = useState(false);

  const discount = applied ? Math.round(subtotal * 0.2) : 0;
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + delivery);

  if (placed) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-16">
        <div className="max-w-md text-center">
          <CheckCircle2 size={48} className="mx-auto text-primary" />
          <h1 className="mt-5 text-4xl">Order placed!</h1>
          <p className="mt-3 text-muted-foreground">
            Your snacks are being packed right now. We'll email tracking details shortly.
          </p>
          <Button asChild variant="crunch" size="lg" className="mt-7">
            <Link to="/shop">Keep snacking</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-16">
        <div className="max-w-md text-center">
          <h1 className="text-4xl">Nothing to check out</h1>
          <p className="mt-3 text-muted-foreground">Add a few snacks and come right back.</p>
          <Button asChild variant="crunch" size="lg" className="mt-7">
            <Link to="/shop">Shop snacks</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      <h1 className="text-4xl sm:text-5xl">Checkout</h1>
      <p className="mt-3 text-muted-foreground">Almost there — just the delivery details.</p>

      <form
        className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]"
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
        }}
      >
        <div className="shadow-soft space-y-5 rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
          <h2 className="text-2xl">Delivery details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Full name" placeholder="Ananya Sharma" />
            <Field id="phone" label="Phone" placeholder="+91 98765 43210" />
            <Field id="email" label="Email" type="email" placeholder="you@email.com" />
            <Field id="pincode" label="PIN code" placeholder="560001" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              required
              rows={3}
              placeholder="Flat, street, landmark, city"
              className="rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Payment method</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Pay online (UPI / Card)", "Cash on delivery"].map((m, i) => (
                <label
                  key={m}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-border p-4 text-sm font-bold transition-colors has-[:checked]:border-primary has-[:checked]:bg-cream"
                >
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={i === 0}
                    className="accent-primary"
                  />
                  <span className="min-w-0">{m}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="shadow-soft h-fit rounded-3xl border border-border/70 bg-card p-6 lg:sticky lg:top-32">
          <h2 className="text-2xl">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {detailed.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-muted-foreground">
                  {qty} × {product.name}
                </span>
                <span className="shrink-0 font-extrabold">{inr(product.price * qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-2">
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              aria-label="Coupon code"
              className="h-11 rounded-full"
            />
            <Button
              type="button"
              variant="sunshine"
              onClick={() => {
                if (coupon.trim().toUpperCase() === "CRUNCH20") {
                  setApplied(true);
                  toast.success("CRUNCH20 applied — 20% off!");
                } else {
                  toast.error("That code isn't valid.");
                }
              }}
            >
              Apply
            </Button>
          </div>

          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-extrabold">{inr(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Discount (20%)</dt>
                <dd className="font-extrabold text-primary">−{inr(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-extrabold">{delivery === 0 ? "FREE" : inr(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-extrabold">Total</dt>
              <dd className="text-display text-xl text-primary">{inr(total)}</dd>
            </div>
          </dl>

          <Button type="submit" size="lg" variant="crunch" className="mt-6 w-full">
            <Lock size={16} /> Place order
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo store — no real payment is taken.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} required placeholder={placeholder} className="h-11 rounded-full" />
    </div>
  );
}
