import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

type ShopSearch = {
  category?: string | undefined;
  q?: string | undefined;
  sort?: "popular" | "price-asc" | "price-desc" | "rating" | undefined;
  wishlist?: boolean | undefined;
};

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["popular", "price-asc", "price-desc", "rating"]).optional(),
  wishlist: z.boolean().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop All Snacks — Crunch & Munch" },
      {
        name: "description",
        content:
          "Browse every Crunch & Munch snack: chips, nachos, popcorn, cookies, namkeen and healthy snacks. Search, filter and add to cart in seconds.",
      },
      { property: "og:title", content: "Shop All Snacks — Crunch & Munch" },
      {
        property: "og:description",
        content: "Search and filter our full snack range by category, price and rating.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category, q = "", sort = "popular", wishlist: onlyWished } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { wishlist } = useCart();

  const filtered = products
    .filter((p) => (category ? p.category === category : true))
    .filter((p) => (onlyWished ? wishlist.includes(p.id) : true))
    .filter((p) =>
      q
        ? `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q.toLowerCase())
        : true,
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(!!b.bestSeller) - Number(!!a.bestSeller) || b.reviews - a.reviews;
    });

  const setSearch = (patch: Record<string, unknown>) =>
    navigate({ search: (prev: ShopSearch) => ({ ...prev, ...patch }) });

  return (
    <>
      <section className="gradient-cream">
        <div className="container-x py-12 md:py-16">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary">
            The Snack Shelf
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl">
            {onlyWished ? "Your wishlist" : (category ?? "All snacks")}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {filtered.length} snack{filtered.length === 1 ? "" : "s"} ready to be crunched.
          </p>
        </div>
      </section>

      <div className="container-x py-10">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative min-w-0">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={q}
              onChange={(e) => setSearch({ q: e.target.value || undefined })}
              placeholder="Search chips, popcorn, namkeen…"
              aria-label="Search products"
              className="h-12 rounded-full pl-11"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-muted-foreground sm:flex">
              <SlidersHorizontal size={14} /> Sort
            </span>
            {(
              [
                ["popular", "Popular"],
                ["rating", "Top rated"],
                ["price-asc", "Price ↑"],
                ["price-desc", "Price ↓"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSearch({ sort: value })}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-extrabold transition-colors",
                  sort === value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <FilterChip active={!category && !onlyWished} to={{}} label="All" />
          {categories.map((c) => (
            <FilterChip
              key={c.name}
              active={category === c.name}
              to={{ category: c.name }}
              label={c.name}
            />
          ))}
          <button
            type="button"
            onClick={() => setSearch({ wishlist: onlyWished ? undefined : true })}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              onlyWished
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            <Heart size={14} /> Wishlist ({wishlist.length})
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border p-12 text-center">
            <h2 className="text-2xl">No snacks found</h2>
            <p className="mt-2 text-muted-foreground">
              Try a different search or browse the whole shelf.
            </p>
            <Button asChild variant="crunch" className="mt-6">
              <Link to="/shop" search={{}}>
                Reset filters
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function FilterChip({
  active,
  label,
  to,
}: {
  active: boolean;
  label: string;
  to: { category?: string };
}) {
  return (
    <Link
      to="/shop"
      search={(prev: ShopSearch) => ({ ...prev, category: to.category, wishlist: undefined })}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}
