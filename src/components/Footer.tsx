import { Link } from "react-router";
import { ShieldCheck, Truck, RefreshCcw, Lock } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Bestsellers", to: "/shop?filter=bestsellers" },
      { label: "New arrivals", to: "/shop?filter=new" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Beauty Guide", to: "/guide" },
      { label: "Skin Concern Finder", to: "/guide#finder" },
      { label: "Essence 101", to: "/guide" },
      { label: "SPF, every day", to: "/guide" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Account", to: "/account" },
      { label: "Delivery & returns", to: "/account" },
      { label: "Authenticity", to: "/guide" },
      { label: "Contact", to: "/account" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="clay-card mx-auto max-w-6xl rounded-[calc(var(--radius)+0.8rem)] px-6 py-10 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span
                className="clay-blob flex size-10 items-center justify-center bg-blush font-display text-lg font-bold text-charcoal"
                aria-hidden
              >
                M
              </span>
              <span className="font-display text-lg font-semibold text-charcoal">
                MuDi <span className="text-primary">Beauty</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              Premium Korean cosmetics, curated for skin in Uzbekistan.
              Every product ships straight from Seoul with transparent
              ingredients and honest guidance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, label: "100% authentic" },
                { icon: Truck, label: "Fast UZ delivery" },
                { icon: RefreshCcw, label: "14-day returns" },
                { icon: Lock, label: "Secure checkout" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="clay-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-charcoal/70"
                >
                  <Icon className="size-3.5 text-primary" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm font-medium text-charcoal/70 underline-offset-4 transition hover:text-charcoal hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MuDi Beauty · Placeholder content — business
            details coming before launch.
          </p>
          <p>Tashkent · Seoul · Made with care</p>
        </div>
      </div>
    </footer>
  );
}
