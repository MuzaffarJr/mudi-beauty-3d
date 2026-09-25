import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import {
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT,
} from "@/data/products";
import {
  BadgeCheck,
  CreditCard,
  Lock,
  MapPin,
  PartyPopper,
  Truck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROMOS: Record<string, { pct: number; label: string }> = {
  MUDI10: { pct: 10, label: "10% welcome discount" },
  SEOUL15: { pct: 15, label: "15% K-beauty week" },
};

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("card");
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<{ pct: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const discount = promo ? (subtotal * promo.pct) / 100 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const [orderId] = useState(() => `MU-${Math.floor(100000 + Math.random() * 900000)}`);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMOS[code]) {
      setPromo(PROMOS[code]);
      setPromoError(null);
    } else {
      setPromoError("That code isn't valid. Try MUDI10.");
    }
  };

  const placeOrder = () => {
    setPlacing(true);
    window.setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clear();
    }, 900);
  };

  if (placed) {
    return (
      <main className="px-3 pb-6 pt-2 sm:px-5">
        <div className="clay-card mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[calc(var(--radius)+0.8rem)] p-10 text-center sm:p-14">
          <span className="clay-blob flex size-20 items-center justify-center bg-mint">
            <PartyPopper className="size-9 text-charcoal/70" aria-hidden />
          </span>
          <h1 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Order confirmed!
          </h1>
          <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
            Thank you! Order <strong className="text-charcoal">{orderId}</strong> is being
            prepared. You'll get a tracking link by SMS as soon as it leaves our
            Tashkent studio. (Demo confirmation — no payment was taken.)
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild className="clay-btn h-12 px-7 text-sm font-bold">
              <Link to="/shop">Continue shopping</Link>
            </Button>
            <Button asChild variant="ghost" className="clay-btn-soft h-12 px-6 text-sm font-semibold">
              <Link to="/account">View account</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="px-3 pb-6 pt-2 sm:px-5">
        <div className="clay-card mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[calc(var(--radius)+0.8rem)] p-12 text-center">
          <h1 className="font-display text-2xl font-semibold text-charcoal">
            Nothing to check out yet
          </h1>
          <Button asChild className="clay-btn h-12 px-7 text-sm font-bold">
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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display text-3xl font-semibold text-charcoal">Checkout</h1>
            <span className="clay-chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-charcoal/70">
              <Lock className="size-3.5 text-primary" aria-hidden />
              Secure demo checkout
            </span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Form */}
            <div className="space-y-4">
              {/* Contact */}
              <fieldset className="clay-card-sm rounded-[calc(var(--radius)+0.4rem)] p-5">
                <legend className="px-1 font-display text-lg font-semibold text-charcoal">
                  Contact
                </legend>
                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="co-name">Full name</Label>
                    <Input id="co-name" placeholder="Dilnoza Karimova" required className="clay-inset h-11 rounded-2xl border-0 px-4" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="co-phone">Phone</Label>
                    <Input id="co-phone" type="tel" placeholder="+998 90 123 45 67" required className="clay-inset h-11 rounded-2xl border-0 px-4" />
                  </div>
                  <div className="grid gap-1.5 sm:col-span-2">
                    <Label htmlFor="co-email">Email (for receipt)</Label>
                    <Input id="co-email" type="email" placeholder="you@example.com" className="clay-inset h-11 rounded-2xl border-0 px-4" />
                  </div>
                </div>
              </fieldset>

              {/* Delivery */}
              <fieldset className="clay-card-sm rounded-[calc(var(--radius)+0.4rem)] p-5">
                <legend className="px-1 font-display text-lg font-semibold text-charcoal">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-primary" aria-hidden />
                    Delivery in Uzbekistan
                  </span>
                </legend>
                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="co-city">City</Label>
                    <Input id="co-city" placeholder="Tashkent" required className="clay-inset h-11 rounded-2xl border-0 px-4" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="co-district">District</Label>
                    <Input id="co-district" placeholder="Yunusabad" className="clay-inset h-11 rounded-2xl border-0 px-4" />
                  </div>
                  <div className="grid gap-1.5 sm:col-span-2">
                    <Label htmlFor="co-address">Street, house, apartment</Label>
                    <Input id="co-address" placeholder="Amir Temur 108, kv. 24" required className="clay-inset h-11 rounded-2xl border-0 px-4" />
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Truck className="size-3.5 text-primary" aria-hidden />
                  Tashkent: 1–2 days · Samarkand, Bukhara, regions: 2–4 days
                </p>
              </fieldset>

              {/* Payment */}
              <fieldset className="clay-card-sm rounded-[calc(var(--radius)+0.4rem)] p-5">
                <legend className="px-1 font-display text-lg font-semibold text-charcoal">
                  <span className="inline-flex items-center gap-2">
                    <Wallet className="size-4 text-primary" aria-hidden />
                    Payment method
                  </span>
                </legend>
                <RadioGroup value={payment} onValueChange={setPayment} className="mt-2 gap-2.5">
                  {[
                    { id: "card", icon: CreditCard, title: "Card (Uzum / Visa / Mastercard)", note: "Pay online securely" },
                    { id: "cash", icon: Wallet, title: "Cash on delivery", note: "Pay the courier when it arrives" },
                  ].map(({ id, icon: Icon, title, note }) => (
                    <Label
                      key={id}
                      htmlFor={`pay-${id}`}
                      className={cn(
                        "clay-card-sm flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition",
                        payment === id && "ring-2 ring-primary",
                      )}
                    >
                      <RadioGroupItem value={id} id={`pay-${id}`} />
                      <Icon className="size-5 text-primary" aria-hidden />
                      <span className="flex-1">
                        <span className="block text-sm font-bold text-charcoal">{title}</span>
                        <span className="block text-xs text-muted-foreground">{note}</span>
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            {/* Summary */}
            <div className="clay-card sticky top-24 h-fit rounded-[calc(var(--radius)+0.6rem)] p-6">
              <h2 className="font-display text-xl font-semibold text-charcoal">Your order</h2>
              <ul className="mt-3 max-h-56 space-y-2.5 overflow-y-auto pr-1">
                {lines.map((l) => (
                  <li key={`${l.productId}-${l.shade ?? "d"}`} className="flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0">
                      <span className="line-clamp-1 font-semibold text-charcoal">{l.name}</span>
                      <span className="text-xs text-muted-foreground">× {l.quantity}{l.shade ? ` · ${l.shade}` : ""}</span>
                    </span>
                    <span className="shrink-0 font-bold text-charcoal">{formatPrice(l.price * l.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-border/60 pt-4">
                <Label htmlFor="promo" className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal/60">
                  Promo code
                </Label>
                <div className="mt-1.5 flex gap-2">
                  <Input
                    id="promo"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="MUDI10"
                    className="clay-inset h-11 rounded-2xl border-0 px-4 uppercase"
                  />
                  <Button type="button" onClick={applyPromo} className="clay-btn-soft h-11 px-5 text-sm font-bold">
                    Apply
                  </Button>
                </div>
                {promo && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-primary">
                    <BadgeCheck className="size-4" aria-hidden />
                    {promo.label} applied
                  </p>
                )}
                {promoError && <p className="mt-2 text-xs font-semibold text-destructive">{promoError}</p>}
              </div>

              <dl className="mt-4 space-y-2.5 border-t border-border/60 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-bold text-charcoal">{formatPrice(subtotal)}</dd>
                </div>
                {promo && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Discount ({promo.pct}%)</dt>
                    <dd className="font-bold text-primary">−{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd className="font-bold text-charcoal">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border/60 pt-3">
                  <dt className="font-display text-lg font-semibold text-charcoal">Total</dt>
                  <dd className="font-display text-xl font-extrabold text-charcoal">{formatPrice(total)}</dd>
                </div>
              </dl>

              <Button
                onClick={placeOrder}
                disabled={placing}
                className="clay-btn mt-5 h-13 w-full text-base font-bold"
              >
                {placing ? "Placing order…" : `Place order · ${formatPrice(total)}`}
              </Button>
              <button onClick={() => navigate("/cart")} className="mt-3 w-full text-center text-sm font-semibold text-charcoal underline-offset-4 hover:underline">
                Back to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
