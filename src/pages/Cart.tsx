import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ProductThumb } from "@/components/ProductThumb";
import { useCart } from "@/lib/cart";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export default function Cart() {
  const { lines, subtotal, setQuantity, removeLine, count } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const recommendations = PRODUCTS.filter(
    (p) => p.isBestseller && !lines.some((l) => l.productId === p.id),
  ).slice(0, 3);

  if (lines.length === 0) {
    return (
      <main className="px-3 pb-6 pt-2 sm:px-5">
        <div className="clay-card mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-[calc(var(--radius)+0.8rem)] p-12 text-center">
          <span className="clay-blob flex size-24 items-center justify-center bg-blush">
            <ShoppingBag className="size-10 text-charcoal/50" aria-hidden />
          </span>
          <h1 className="font-display text-3xl font-semibold text-charcoal">Your bag is empty</h1>
          <p className="max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
            Fill it with something wonderful — Korean serums, sunscreens and
            glass-skin rituals await.
          </p>
          <Button asChild className="clay-btn h-13 px-8 text-base font-bold">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <div className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <h1 className="font-display text-3xl font-semibold text-charcoal">
            Your bag <span className="text-lg text-muted-foreground">({count} items)</span>
          </h1>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            {/* Lines */}
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={`${line.productId}-${line.shade ?? "d"}`}
                  className="clay-card-sm flex gap-4 p-4"
                >
                  <Link to={`/product/${line.slug}`} className="shrink-0">
                    <ProductThumb seed={line.seed} label={line.name} className="size-20" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          {line.brandName}
                        </p>
                        <Link
                          to={`/product/${line.slug}`}
                          className="line-clamp-2 text-sm font-bold text-charcoal hover:underline"
                        >
                          {line.name}
                        </Link>
                        {line.shade && <p className="text-xs text-muted-foreground">{line.shade}</p>}
                        <p className="mt-0.5 text-xs text-muted-foreground">{line.volume}</p>
                      </div>
                      <button
                        onClick={() => removeLine(line.productId, line.shade)}
                        aria-label={`Remove ${line.name}`}
                        className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="clay-inset flex items-center gap-1 rounded-full p-1">
                        <button
                          onClick={() => setQuantity(line.productId, line.shade, line.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex size-9 items-center justify-center rounded-full transition hover:bg-card"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold tabular-nums">{line.quantity}</span>
                        <button
                          onClick={() => setQuantity(line.productId, line.shade, line.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex size-9 items-center justify-center rounded-full transition hover:bg-card"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <p className="font-display text-lg font-bold text-charcoal">
                        {formatPrice(line.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="clay-card sticky top-24 h-fit rounded-[calc(var(--radius)+0.6rem)] p-6">
              <h2 className="font-display text-xl font-semibold text-charcoal">Order summary</h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-bold text-charcoal">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery estimate</dt>
                  <dd className="font-bold text-charcoal">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </dd>
                </div>
              </dl>
              {remaining > 0 && (
                <p className="clay-inset mt-4 rounded-2xl px-4 py-3 text-xs font-semibold text-charcoal/70">
                  Add {formatPrice(remaining)} more for free delivery across Uzbekistan.
                </p>
              )}
              <div className="mt-4 flex justify-between border-t border-border/60 pt-4">
                <span className="font-display text-lg font-semibold text-charcoal">Total</span>
                <span className="font-display text-xl font-extrabold text-charcoal">
                  {formatPrice(subtotal + shipping)}
                </span>
              </div>
              <Button
                onClick={() => navigate("/checkout")}
                className="clay-btn mt-5 h-13 w-full text-base font-bold"
              >
                Proceed to checkout
              </Button>
              <Link
                to="/shop"
                className="mt-3 block text-center text-sm font-semibold text-charcoal underline-offset-4 hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>

        <section aria-labelledby="recs-heading" className="mt-8">
          <h2 id="recs-heading" className="font-display text-2xl font-semibold text-charcoal">
            You might also love
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
