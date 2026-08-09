import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inr } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Crunch & Munch" },
      {
        name: "description",
        content:
          "Review your Crunch & Munch snack basket, adjust quantities and head to checkout with free delivery above ₹499.",
      },
      { property: "og:title", content: "Your Cart — Crunch & Munch" },
      { property: "og:description", content: "Review your snack basket and check out in seconds." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, clear } = useCart();
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 49;

  return (
    <div className="container-x py-12 md:py-16">
      <h1 className="text-4xl sm:text-5xl">Your snack basket</h1>
      <p className="mt-3 text-muted-foreground">
        {detailed.length === 0
          ? "Nothing here yet — let's fix that."
          : `${detailed.length} item${detailed.length === 1 ? "" : "s"} ready to go.`}
      </p>

      {detailed.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center">
          <ShoppingBag size={36} className="mx-auto text-primary" />
          <h2 className="mt-4 text-2xl">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Go on, add something crunchy.</p>
          <Button asChild variant="crunch" size="lg" className="mt-6">
            <Link to="/shop">Shop snacks</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <ul className="space-y-4">
            {detailed.map(({ product, qty }) => (
              <li
                key={product.id}
                className="shadow-soft grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-3xl border border-border/70 bg-card p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <Link
                    to="/product/$productId"
                    params={{ productId: product.id }}
                    className="text-display block truncate text-lg hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {product.category} · {product.weight}
                  </p>
                  <p className="mt-1 font-extrabold text-primary">{inr(product.price)}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 rounded-full border-2 border-border p-0.5">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(product.id, qty - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm font-extrabold">{qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(product.id, qty + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
                <p className="text-display text-xl sm:text-right">{inr(product.price * qty)}</p>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={clear}
                className="text-xs font-bold text-muted-foreground hover:text-destructive"
              >
                Clear cart
              </button>
            </li>
          </ul>

          <aside className="shadow-soft h-fit rounded-3xl border border-border/70 bg-card p-6 lg:sticky lg:top-32">
            <h2 className="text-2xl">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-extrabold">{inr(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-extrabold">{delivery === 0 ? "FREE" : inr(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-extrabold">Total</dt>
                <dd className="text-display text-xl text-primary">{inr(subtotal + delivery)}</dd>
              </div>
            </dl>
            {delivery > 0 && (
              <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-xs font-bold">
                Add {inr(499 - subtotal)} more for free delivery.
              </p>
            )}
            <Button asChild size="lg" variant="crunch" className="mt-6 w-full">
              <Link to="/checkout">
                Checkout <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
