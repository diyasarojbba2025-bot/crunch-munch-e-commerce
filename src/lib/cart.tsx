import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  wishlist: string[];
  itemCount: number;
  subtotal: number;
  detailed: { product: Product; qty: number }[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  isWished: (id: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "cm-cart";
const WISH_KEY = "cm-wishlist";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      if (c) setLines(JSON.parse(c));
      const w = localStorage.getItem(WISH_KEY);
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);
  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.id);
        return product ? { product, qty: l.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];

    return {
      lines,
      wishlist,
      detailed,
      itemCount: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: detailed.reduce((s, d) => s + d.product.price * d.qty, 0),
      add: (id, qty = 1) =>
        setLines((prev) =>
          prev.some((l) => l.id === id)
            ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { id, qty }],
        ),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
      toggleWish: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id])),
      isWished: (id) => wishlist.includes(id),
    };
  }, [lines, wishlist]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
