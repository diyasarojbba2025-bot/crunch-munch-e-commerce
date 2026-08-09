import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-mark.png";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";
import { useCart } from "@/lib/cart";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { itemCount, wishlist } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="gradient-warm text-cocoa">
        <div className="container-x flex h-9 items-center justify-center gap-2 text-xs font-extrabold sm:text-sm">
          <span className="truncate">Free delivery above ₹499</span>
          <span className="opacity-50">•</span>
          <span className="truncate">Use code CRUNCH20 for 20% off</span>
        </div>
      </div>

      <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
            <img
              src={logo}
              alt="Crunch & Munch logo"
              width={512}
              height={512}
              className="h-10 w-10 shrink-0"
            />
            <span className="text-display truncate text-xl leading-none sm:text-2xl">
              Crunch <span className="text-primary">&</span> Munch
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            to="/shop"
            aria-label="Search snacks"
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <Search size={19} />
          </Link>
          <Link
            to="/shop"
            search={{ wishlist: true }}
            aria-label="Wishlist"
            className="relative hidden h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary sm:grid"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
          <Button asChild variant="crunch" className="hidden lg:inline-flex">
            <Link to="/shop">Shop Now</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-up border-t border-border bg-background lg:hidden">
          <nav className="container-x flex flex-col py-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-base font-bold text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <p className="px-3 pb-2 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to="/shop"
                    search={{ category: c.name }}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-secondary px-3 py-2.5 text-sm font-bold"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
