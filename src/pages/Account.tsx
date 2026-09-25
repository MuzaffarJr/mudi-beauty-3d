import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/data/products";
import { LogOut, MapPin, ShieldCheck, Truck, User } from "lucide-react";
import { useNavigate } from "react-router";

const DEMO_ORDERS = [
  { id: "MU-382911", date: "Sep 12, 2026", items: 2, total: 45.5, status: "Delivered" },
  { id: "MU-391044", date: "Sep 21, 2026", items: 1, total: 24.0, status: "Shipped" },
];

export default function Account() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <User className="size-6 animate-pulse text-muted-foreground" aria-hidden />
      </main>
    );
  }

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <div className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Your space</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Account
          </h1>

          {!isAuthenticated ? (
            <div className="mt-6 flex flex-col items-center gap-4 pb-4 text-center">
              <span className="clay-blob flex size-20 items-center justify-center bg-lilac">
                <User className="size-8 text-charcoal/50" aria-hidden />
              </span>
              <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
                Sign in to track orders, keep your wishlist in sync, and check
                out faster next time.
              </p>
              <Button
                onClick={() => navigate("/auth?returnTo=/account")}
                className="clay-btn h-12 px-7 text-sm font-bold"
              >
                Sign in / create account
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              {/* Orders */}
              <div className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-charcoal">Your orders</h2>
                {DEMO_ORDERS.map((o) => (
                  <div key={o.id} className="clay-card-sm flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="text-sm font-bold text-charcoal">{o.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {o.date} · {o.items} item{o.items > 1 ? "s" : ""}
                      </p>
                    </div>
                    <span className="clay-chip rounded-full bg-mint px-3 py-1 text-xs font-bold text-charcoal/80">
                      {o.status}
                    </span>
                    <p className="text-sm font-extrabold text-charcoal">{formatPrice(o.total)}</p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">
                  Demo orders — real order history appears after your first purchase.
                </p>
              </div>

              {/* Profile & trust */}
              <div className="space-y-4">
                <div className="clay-card-sm p-5">
                  <h2 className="font-display text-lg font-semibold text-charcoal">Profile</h2>
                  <p className="mt-2 text-sm font-semibold text-charcoal/80">
                    {user?.name ?? user?.email ?? "MuDi customer"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      await signOut();
                      navigate("/");
                    }}
                    className="clay-btn-soft mt-4 h-11 w-full text-sm font-semibold"
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </Button>
                </div>
                <div className="clay-card-sm space-y-2.5 p-5 text-sm">
                  <p className="flex items-center gap-2 font-semibold text-charcoal/80">
                    <MapPin className="size-4 text-primary" aria-hidden /> Tashkent, Uzbekistan
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-charcoal/80">
                    <Truck className="size-4 text-primary" aria-hidden /> Free delivery over $60
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-charcoal/80">
                    <ShieldCheck className="size-4 text-primary" aria-hidden /> 14-day returns
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
