import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/data/products";
import { ProductThumb } from "@/components/ProductThumb";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, lines, subtotal, setQuantity, removeLine } = useCart();

  const navigate = useNavigate();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (      <Sheet open={isDrawerOpen} onOpenChange={(open) => (open ? undefined : closeDrawer())}>
      <SheetContent
        side="right"
        className="clay-card m-2 flex h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] flex-col gap-0 rounded-[calc(var(--radius)+0.6rem)] border-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="px-5 pb-3 pt-5 text-left">
          <SheetTitle className="font-display text-xl">Your bag</SheetTitle>
          <SheetDescription>
            {lines.length === 0
              ? "Korean beauty, one tap away."
              : `${lines.reduce((s, l) => s + l.quantity, 0)} item(s) · Free delivery over $${FREE_SHIPPING_THRESHOLD}`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="clay-blob flex size-24 items-center justify-center bg-blush">
              <ShoppingBag className="size-9 text-charcoal/60" aria-hidden />
            </div>
            <p className="max-w-[24ch] text-sm text-muted-foreground">
              Your bag is empty. Discover bestsellers from Seoul.
            </p>
            <Button className="clay-btn h-11 px-6" onClick={() => navigate("/shop")}>
              Shop bestsellers
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-2">
              {lines.map((line) => (
                <div key={`${line.productId}-${line.shade ?? "default"}`} className="clay-card-sm flex gap-3 p-3">
                  <ProductThumb seed={line.seed} className="size-16 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground">
                          {line.brandName}
                        </p>
                        <Link
                          to={`/product/${line.slug}`}
                          onClick={closeDrawer}
                          className="line-clamp-2 text-sm font-semibold hover:underline"
                        >
                          {line.name}
                        </Link>
                        {line.shade && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{line.shade}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeLine(line.productId, line.shade)}
                        aria-label={`Remove ${line.name}`}
                        className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="clay-inset flex items-center gap-1 p-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(line.productId, line.shade, line.quantity - 1)}
                          className="flex size-9 items-center justify-center rounded-full transition hover:bg-card"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold tabular-nums">{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(line.productId, line.shade, line.quantity + 1)}
                          className="flex size-9 items-center justify-center rounded-full transition hover:bg-card"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <p className="text-sm font-bold">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-border/60 px-5 py-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className="font-semibold text-foreground">
                  {remaining > 0 ? `${formatPrice(SHIPPING_FLAT)} estimate` : "Free"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {remaining > 0
                  ? `Add ${formatPrice(remaining)} more for free delivery.`
                  : "Your order ships free across Uzbekistan."}
              </p>
              <Button
                className="clay-btn h-12 w-full text-base"
                onClick={() => {
                  closeDrawer();
                  navigate("/checkout");
                }}
              >
                Checkout · {formatPrice(subtotal + (remaining > 0 ? SHIPPING_FLAT : 0))}
              </Button>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="block text-center text-sm font-semibold underline-offset-4 hover:underline"
              >
                View full bag
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
