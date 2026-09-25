import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/lib/cart";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Bestsellers", to: "/shop?filter=bestsellers" },
  { label: "Beauty Guide", to: "/guide" },
];

export function Navbar() {
  const { count, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const results =
    query.trim().length > 0
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brandId.toLowerCase().includes(query.toLowerCase()) ||
            p.type.includes(query.toLowerCase()),
        ).slice(0, 6)
      : [];

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main navigation"
        className="clay-card mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 rounded-full px-4 sm:px-6"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 focus-visible:rounded-full">
          <span
            className="clay-blob flex size-10 items-center justify-center bg-blush font-display text-lg font-bold text-charcoal"
            aria-hidden
          >
            M
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-charcoal">
            MuDi <span className="text-primary">Beauty 3D</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-charcoal/70 transition hover:bg-muted hover:text-charcoal",
                location.pathname === link.to && "bg-muted text-charcoal",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search (desktop dialog, mobile hidden into sheet) */}
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <button
                aria-label="Search products"
                className="clay-chip flex size-11 items-center justify-center rounded-full text-charcoal/70"
              >
                <Search className="size-[18px]" />
              </button>
            </DialogTrigger>
            <DialogContent className="clay-card top-[15%] translate-y-0 rounded-[2rem] p-0 sm:top-[12%]">
              <DialogHeader className="px-5 pb-2 pt-5 text-left">
                <DialogTitle className="font-display text-lg">
                  Search Korean beauty
                </DialogTitle>
              </DialogHeader>
              <div className="px-5 pb-5">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “snail essence” or “SPF”…"
                  aria-label="Search products"
                  className="clay-inset h-12 w-full rounded-full px-5 text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="mt-3 space-y-1.5">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                        navigate(`/product/${p.slug}`);
                      }}
                      className="clay-card-sm flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold hover:-translate-y-0.5"
                    >
                      <span className="line-clamp-1">{p.name}</span>
                      <span className="ml-3 shrink-0 text-xs font-bold text-primary">
                        ${p.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                  {query && results.length === 0 && (
                    <p className="px-2 py-3 text-sm text-muted-foreground">
                      Nothing found. Try “serum”, “lip” or “sunscreen”.
                    </p>
                  )}
                </div>
              </div>
              <X className="absolute right-5 top-5 size-4 text-muted-foreground" aria-hidden />
            </DialogContent>
          </Dialog>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="clay-chip hidden size-11 items-center justify-center rounded-full text-charcoal/70 sm:flex"
          >
            <Heart className="size-[18px]" />
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="clay-chip flex size-11 items-center justify-center rounded-full text-charcoal/70"
          >
            <User className="size-[18px]" />
          </Link>

          {/* Cart */}
          <button
            onClick={openDrawer}
            aria-label={`Open cart, ${count} items`}
            className="clay-chip relative flex size-11 items-center justify-center rounded-full text-charcoal"
          >
            <ShoppingBag className="size-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="clay-chip flex size-11 items-center justify-center rounded-full text-charcoal lg:hidden"
              >
                <Menu className="size-[18px]" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="clay-card m-2 h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] rounded-[calc(var(--radius)+0.6rem)] border-0 p-0 sm:max-w-xs"
            >
              <SheetHeader className="px-5 pb-2 pt-6 text-left">
                <SheetTitle className="flex items-center gap-2 font-display text-lg">
                  <Sparkles className="size-4 text-primary" />
                  MuDi Beauty 3D
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5 px-5 py-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="clay-card-sm rounded-2xl px-4 py-3.5 text-base font-semibold min-h-11"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="clay-card-sm rounded-2xl px-4 py-3.5 text-base font-semibold min-h-11"
                >
                  Wishlist
                </Link>
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="clay-card-sm rounded-2xl px-4 py-3.5 text-base font-semibold min-h-11"
                >
                  Account
                </Link>
              </nav>
              <p className="mt-auto px-5 pb-6 text-xs text-muted-foreground">
                Korean cosmetics, delivered across Uzbekistan
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
