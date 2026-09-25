import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist";
import { PRODUCTS } from "@/data/products";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { ids } = useWishlist();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <div className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Saved for later</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Your wishlist
          </h1>
          {products.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {products.length} product{products.length === 1 ? "" : "s"} waiting for the right moment.
            </p>
          )}

          {products.length === 0 ? (
            <div className="mt-8 flex flex-col items-center gap-4 pb-4 text-center">
              <span className="clay-blob flex size-20 items-center justify-center bg-blush">
                <Heart className="size-8 text-charcoal/50" aria-hidden />
              </span>
              <p className="max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
                Nothing saved yet. Tap the heart on any product to keep it here.
              </p>
              <Button asChild className="clay-btn h-12 px-7 text-sm font-bold">
                <Link to="/shop">Discover products</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
