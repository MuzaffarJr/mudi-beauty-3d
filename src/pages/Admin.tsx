import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice, PRODUCTS, brandById } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Box,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Box },
  { id: "orders", label: "Orders", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
] as const;

type TabId = (typeof TABS)[number]["id"];

const DEMO_ORDERS = [
  { id: "MU-391044", customer: "Dilnoza K.", total: 24.0, status: "Shipped", date: "Sep 21" },
  { id: "MU-390887", customer: "Malika T.", total: 61.5, status: "Processing", date: "Sep 21" },
  { id: "MU-390512", customer: "Sevara A.", total: 17.0, status: "New", date: "Sep 20" },
  { id: "MU-390233", customer: "Zilola R.", total: 96.0, status: "Delivered", date: "Sep 19" },
  { id: "MU-390118", customer: "Kamola S.", total: 42.5, status: "Cancelled", date: "Sep 19" },
];

const STATUS_TINT: Record<string, string> = {
  New: "bg-peach text-charcoal",
  Processing: "bg-lilac text-charcoal",
  Shipped: "bg-mint text-charcoal",
  Delivered: "bg-secondary text-secondary-foreground",
  Cancelled: "bg-destructive/15 text-destructive",
};

const CUSTOMERS = [
  { name: "Dilnoza Karimova", email: "dilnoza@example.com", orders: 6, spent: 214.5 },
  { name: "Malika Tosheva", email: "malika@example.com", orders: 4, spent: 158.0 },
  { name: "Sevara Alieva", email: "sevara@example.com", orders: 3, spent: 96.5 },
  { name: "Zilola Rahimova", email: "zilola@example.com", orders: 2, spent: 96.0 },
];

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState<TabId>("overview");

  const lowStock = PRODUCTS.filter((p) => p.stock <= 15);
  const revenue = DEMO_ORDERS.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const aov = revenue / DEMO_ORDERS.filter((o) => o.status !== "Cancelled").length;

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Internal tools
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Store administration
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {user?.name ?? user?.email ?? "admin"} — manage the
            catalog, orders, and customers of MuDi Beauty 3D.
          </p>
          <nav aria-label="Admin sections" className="mt-5 flex flex-wrap gap-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                data-active={tab === id}
                onClick={() => setTab(id)}
                aria-pressed={tab === id}
                className="clay-chip inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-charcoal/70"
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* ============ OVERVIEW ============ */}
        {tab === "overview" && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: "Revenue (7 days)", value: formatPrice(revenue), icon: BarChart3 },
                { label: "Orders", value: String(DEMO_ORDERS.length), icon: Package },
                { label: "Average order value", value: formatPrice(aov), icon: BarChart3 },
                { label: "Low-stock items", value: String(lowStock.length), icon: Box },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="clay-card-sm p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal/50">{label}</p>
                    <Icon className="size-4 text-primary" aria-hidden />
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-charcoal">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
              {/* Recent orders */}
              <section aria-labelledby="recent-heading" className="clay-card rounded-[calc(var(--radius)+0.6rem)] p-6">
                <h2 id="recent-heading" className="font-display text-xl font-semibold text-charcoal">
                  Recent orders
                </h2>
                <ul className="mt-3 divide-y divide-border/60">
                  {DEMO_ORDERS.slice(0, 4).map((o) => (
                    <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                      <div>
                        <p className="text-sm font-bold text-charcoal">{o.id}</p>
                        <p className="text-xs text-muted-foreground">{o.customer} · {o.date}</p>
                      </div>
                      <Badge className={cn("rounded-full border-0 px-3 py-1 text-xs font-bold", STATUS_TINT[o.status])}>
                        {o.status}
                      </Badge>
                      <p className="text-sm font-extrabold text-charcoal">{formatPrice(o.total)}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Low stock */}
              <section aria-labelledby="lowstock-heading" className="clay-card rounded-[calc(var(--radius)+0.6rem)] p-6">
                <h2 id="lowstock-heading" className="font-display text-xl font-semibold text-charcoal">
                  Low stock
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {lowStock.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-2">
                      <span className="line-clamp-1 text-sm font-semibold text-charcoal/80">{p.name}</span>
                      <Badge className="rounded-full border-0 bg-peach px-2.5 py-1 text-xs font-bold text-charcoal">
                        {p.stock} left
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        {/* ============ PRODUCTS ============ */}
        {tab === "products" && (
          <section aria-labelledby="admin-products-heading" className="clay-card mt-4 overflow-hidden rounded-[calc(var(--radius)+0.6rem)] p-6">
            <h2 id="admin-products-heading" className="font-display text-xl font-semibold text-charcoal">
              Catalog ({PRODUCTS.length})
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-xs uppercase tracking-[0.1em] text-charcoal/50">
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Product</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Brand</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Price</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Stock</th>
                    <th scope="col" className="pb-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {PRODUCTS.map((p) => (
                    <tr key={p.id}>
                      <td className="max-w-[280px] py-3 pr-3 font-semibold text-charcoal">{p.name}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{brandById(p.brandId)?.name}</td>
                      <td className="py-3 pr-3 font-bold text-charcoal">{formatPrice(p.price)}</td>
                      <td className="py-3 pr-3">
                        <span className={cn("font-bold", p.stock <= 15 ? "text-destructive" : "text-charcoal")}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="py-3">
                        <Badge className={cn("rounded-full border-0 px-2.5 py-1 text-xs font-bold",
                          p.stock === 0 ? "bg-destructive/15 text-destructive" : p.isNew ? "bg-secondary text-secondary-foreground" : "bg-muted text-charcoal/70")}>
                          {p.stock === 0 ? "Sold out" : p.isNew ? "New" : "Active"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ============ ORDERS ============ */}
        {tab === "orders" && (
          <section aria-labelledby="admin-orders-heading" className="clay-card mt-4 overflow-hidden rounded-[calc(var(--radius)+0.6rem)] p-6">
            <h2 id="admin-orders-heading" className="font-display text-xl font-semibold text-charcoal">
              Order pipeline
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-xs uppercase tracking-[0.1em] text-charcoal/50">
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Order</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Customer</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Date</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Total</th>
                    <th scope="col" className="pb-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {DEMO_ORDERS.map((o) => (
                    <tr key={o.id}>
                      <td className="py-3 pr-3 font-bold text-charcoal">{o.id}</td>
                      <td className="py-3 pr-3 text-charcoal/80">{o.customer}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{o.date}</td>
                      <td className="py-3 pr-3 font-bold text-charcoal">{formatPrice(o.total)}</td>
                      <td className="py-3">
                        <Badge className={cn("rounded-full border-0 px-2.5 py-1 text-xs font-bold", STATUS_TINT[o.status])}>
                          {o.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Demo data — statuses advance New → Processing → Shipped → Delivered.
            </p>
          </section>
        )}

        {/* ============ CUSTOMERS ============ */}
        {tab === "customers" && (
          <section aria-labelledby="admin-customers-heading" className="clay-card mt-4 overflow-hidden rounded-[calc(var(--radius)+0.6rem)] p-6">
            <h2 id="admin-customers-heading" className="font-display text-xl font-semibold text-charcoal">
              Customers
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-xs uppercase tracking-[0.1em] text-charcoal/50">
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Name</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Email</th>
                    <th scope="col" className="pb-2.5 pr-3 font-bold">Orders</th>
                    <th scope="col" className="pb-2.5 font-bold">Lifetime value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {CUSTOMERS.map((c) => (
                    <tr key={c.email}>
                      <td className="py-3 pr-3 font-semibold text-charcoal">{c.name}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{c.email}</td>
                      <td className="py-3 pr-3 font-bold text-charcoal">{c.orders}</td>
                      <td className="py-3 font-bold text-charcoal">{formatPrice(c.spent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
