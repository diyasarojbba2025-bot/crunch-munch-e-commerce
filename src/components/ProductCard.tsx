import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { inr, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, isWished } = useCart();
  const wished = isWished(product.id);

  return (
    <article className="card-hover group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block overflow-hidden bg-cream"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-primary-foreground">
            {product.tag}
          </span>
        )}
      </Link>

      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => {
          toggleWish(product.id);
          toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
        }}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur transition-transform hover:scale-110"
      >
        <Heart
          size={17}
          className={cn(wished ? "fill-primary text-primary" : "text-muted-foreground")}
        />
      </button>

      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
            {product.category}
          </span>
          <span className="text-xs text-muted-foreground">{product.weight}</span>
        </div>
        <h3 className="text-lg leading-tight">
          <Link to="/product/$productId" params={{ productId: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="text-xl font-extrabold">{inr(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
          </div>
          <Button
            size="sm"
            variant="crunch"
            onClick={() => {
              add(product.id);
              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingBag size={16} />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
