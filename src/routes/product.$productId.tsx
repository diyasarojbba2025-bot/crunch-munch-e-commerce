import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Leaf, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { getProduct, inr, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Snack not found — Crunch & Munch" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Crunch & Munch` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Crunch & Munch` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetails,
});

function ProductDetails() {
  const { product } = Route.useLoaderData();
  const { add, toggleWish, isWished } = useCart();
  const [qty, setQty] = useState(1);
  const wished = isWished(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id);
  const off = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <>
      <div className="container-x pt-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to shop
        </Link>
      </div>

      <section className="container-x grid gap-10 py-8 lg:grid-cols-2 lg:gap-14 lg:py-12">
        <div className="shadow-soft overflow-hidden rounded-[2.5rem] bg-cream">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-accent-foreground">
              {product.category}
            </span>
            {product.tag && (
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary-foreground">
                {product.tag}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl">{product.name}</h1>
          <div className="mt-4">
            <StarRating rating={product.rating} reviews={product.reviews} size={16} />
          </div>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.longDescription}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-display text-4xl text-primary">{inr(product.price)}</span>
            <span className="pb-1 text-lg text-muted-foreground line-through">
              {inr(product.mrp)}
            </span>
            <span className="mb-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-extrabold text-accent-foreground">
              {off}% OFF
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Pack size: {product.weight} · Inclusive of all taxes
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border-2 border-border bg-card p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
              >
                <Minus size={16} />
              </button>
              <span className="w-9 text-center text-base font-extrabold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((v) => Math.min(20, v + 1))}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
              >
                <Plus size={16} />
              </button>
            </div>
            <Button
              size="lg"
              variant="crunch"
              onClick={() => {
                add(product.id, qty);
                toast.success(`${qty} × ${product.name} added to cart`);
              }}
            >
              Add to Cart · {inr(product.price * qty)}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                toggleWish(product.id);
                toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
            >
              <Heart size={18} className={cn(wished && "fill-primary text-primary")} />
              {wished ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Ships in 24 hrs" },
              { icon: Leaf, label: "No palm oil" },
              { icon: ShieldCheck, label: "FSSAI certified" },
            ].map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-2 rounded-2xl bg-cream px-4 py-3 text-sm font-bold"
              >
                <f.icon size={18} className="shrink-0 text-primary" />
                <span className="min-w-0 truncate">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-cream">
          <div className="container-x">
            <h2 className="text-3xl sm:text-4xl">More {product.category}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
