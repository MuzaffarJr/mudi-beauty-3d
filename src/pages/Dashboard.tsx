import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice, PRODUCTS } from "@/data/products";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, LogOut, MapPin, Package, ShieldCheck, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router";

const DEMO_ORDERS = [
  {
    id: "MU-382911",
    date: "Sep 12, 2026",
    items: [
      { name: "Glow Deep Serum — Rice + Alpha-Arbutin", qty: 1, price: 19.0 },
      { name: "Relief Sun — Rice + Probiotics SPF50+", qty: 1, price: 17.0 },
    ],
    total: 36.0,
    status: "Delivered",
  },
  {
    id: "MU-391044",
    date: "Sep 21, 2026",
    items: [{ name: "Lip Sleeping Mask — Berry", qty: 1, price: 24.0 }],
    total: 24.0,
    status: "Shipped",
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { ids } = useWishlist();
  const navigate = useNavigate();
  const saved = PRODUCTS.filter((p) => ids.includes(p.id)).slice(0, 3);

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <div className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Your space
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
        </div>
        {/* Orders */}
        <section aria-labelledby="orders-heading" className="clay-card mt-4 rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <h2 id="orders-heading" className="flex items-center gap-2 font-display text-2xl font-semibold text-charcoal">
            <Package className="size-5 text-primary" aria-hidden />
            Your orders
          </h2>
          <div className="mt-4 space-y-3">
            {DEMO_ORDERS.map((order) => (
              <article key={order.id} className="clay-card-sm p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-charcoal">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                  <span className="clay-chip rounded-full bg-mint px-3 py-1 text-xs font-bold text-charcoal/80">
                    {order.status}
                  </span>
                  <p className="text-sm font-extrabold text-charcoal">{formatPrice(order.total)}</p>
                </div>
                <ul className="mt-2.5 space-y-1 text-xs text-muted-foreground">
                  {order.items.map((item) => (
                    <li key={item.name}>
                      {item.qty} × {item.name} — {formatPrice(item.price)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Demo orders — your real history appears after your first purchase.
          </p>
        </section>

        {/* Wishlist preview */}
        <section aria-labelledby="saved-heading" className="clay-card mt-4 rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 id="saved-heading" className="font-display text-2xl font-semibold text-charcoal">
              Saved for later
            </h2>
            <Link
              to="/wishlist"
              className="flex items-center gap-1 text-sm font-bold text-charcoal underline-offset-4 hover:underline"
            >
              Full wishlist <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          {saved.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {saved.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing saved yet — tap the heart on any product to keep it here.
            </p>
          )}
        </section>

        {/* Profile & support */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section aria-labelledby="profile-heading" className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
            <h2 id="profile-heading" className="font-display text-2xl font-semibold text-charcoal">
              Profile
            </h2>
            <p className="mt-3 text-sm font-semibold text-charcoal/80">
              {user?.name ?? "MuDi customer"}
            </p>
            <p className="text-sm text-muted-foreground">{user?.email ?? ""}</p>
            <Button
              variant="ghost"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="clay-btn-soft mt-4 h-11 text-sm font-semibold"
            >
              <LogOut className="size-4" aria-hidden />
              Sign out
            </Button>
          </section>
          <section aria-labelledby="support-heading" className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
            <h2 id="support-heading" className="font-display text-2xl font-semibold text-charcoal">
              Good to know
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-center gap-2 font-semibold text-charcoal/80">
                <MapPin className="size-4 text-primary" aria-hidden /> Delivering across Uzbekistan
              </li>
              <li className="flex items-center gap-2 font-semibold text-charcoal/80">
                <Truck className="size-4 text-primary" aria-hidden /> Free delivery on orders over $60
              </li>
              <li className="flex items-center gap-2 font-semibold text-charcoal/80">
                <ShieldCheck className="size-4 text-primary" aria-hidden /> 14-day returns on sealed products
              </li>
            </ul>
            <Link
              to="/guide"
              className="mt-4 inline-block text-sm font-bold text-charcoal underline-offset-4 hover:underline"
            >
              Explore the Beauty Guide →
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
