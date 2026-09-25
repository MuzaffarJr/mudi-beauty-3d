import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductThumb } from "@/components/ProductThumb";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import {
  brandById,
  formatPrice,
  productBySlug,
  PRODUCTS,
} from "@/data/products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BadgeCheck,
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotFound } from "@/pages/NotFound";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? productBySlug(slug) : undefined;

  const { addLine } = useCart();
  const { has, toggle } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [shade, setShade] = useState<string | undefined>(undefined);
  const [justAdded, setJustAdded] = useState(false);

  const related = useMemo(
    () =>
      product
        ? PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.brandId === product.brandId)).slice(0, 3)
        : [],
    [product],
  );

  if (!product) return <NotFound />;

  const brand = brandById(product.brandId);
  if (!brand) return <NotFound />;
  const wished = has(product.id);
  const shades = product.shades ?? [];
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAdd = () => {
    addLine(product, quantity, shades.length ? (shade ?? shades[0].name) : undefined);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="px-2 py-3 text-xs font-semibold text-muted-foreground">
          <Link to="/" className="hover:text-charcoal">Home</Link>
          <span className="mx-1.5">/</span>
          <Link to="/shop" className="hover:text-charcoal">Shop</Link>
          <span className="mx-1.5">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          {/* Visual */}
          <div className="clay-card relative flex items-center justify-center overflow-hidden rounded-[calc(var(--radius)+1rem)] p-8 lg:min-h-[560px]">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(26rem 18rem at 50% 30%, hsl(22 80% 88% / 0.6), transparent 65%)",
              }}
              aria-hidden
            />
            <ProductThumb
              seed={product.seed}
              label={product.name}
              className="size-60 animate-float sm:size-72"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {onSale && (
                <Badge className="rounded-full bg-primary px-3 py-1 text-xs font-bold">
                  Save {formatPrice(product.compareAtPrice! - product.price)}
                </Badge>
              )}
              {product.isNew && (
                <Badge className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">New</Badge>
              )}
            </div>
          </div>

          {/* Buy panel */}
          <div className="clay-card flex flex-col gap-5 rounded-[calc(var(--radius)+1rem)] p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {brand?.name ?? product.brandId} · {product.type}
              </p>
              <h1 className="mt-1.5 font-display text-3xl font-semibold leading-tight text-charcoal">
                {product.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="flex items-center gap-1 font-bold text-charcoal">
                  <Star className="size-4 fill-primary text-primary" aria-hidden />
                  {product.rating}
                </span>
                <span className="text-muted-foreground">{product.reviewCount} reviews</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{product.volume}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-charcoal">
                {formatPrice(product.price)}
              </span>
              {onSale && (
                <span className="text-lg font-medium text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Shades */}
            {shades.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-charcoal">
                  Shade: <span className="font-semibold text-muted-foreground">{shade ?? shades[0].name}</span>
                </h2>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {shades.map((s) => {
                    const active = (shade ?? shades[0].name) === s.name;
                    return (
                      <button
                        key={s.name}
                        onClick={() => setShade(s.name)}
                        aria-pressed={active}
                        aria-label={`Shade ${s.name}`}
                        className={cn(
                          "clay-chip flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold",
                          active ? "ring-2 ring-primary" : "text-charcoal/70",
                        )}
                      >
                        <span
                          className="size-4 rounded-full border border-white/60"
                          style={{ background: s.hex }}
                          aria-hidden
                        />
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="clay-inset flex items-center gap-2 rounded-full p-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex size-10 items-center justify-center rounded-full transition hover:bg-card"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-base font-bold tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="flex size-10 items-center justify-center rounded-full transition hover:bg-card"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="clay-btn h-13 flex-1 px-6 text-base font-bold"
              >
                <ShoppingBag className="size-4.5" />
                {product.stock === 0 ? "Sold out" : justAdded ? "Added to bag ✓" : `Add to bag · ${formatPrice(product.price * quantity)}`}
              </Button>
              <button
                onClick={() => toggle(product.id)}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
                className="clay-chip flex size-13 items-center justify-center rounded-full"
              >
                <Heart className={cn("size-5", wished ? "fill-primary text-primary" : "text-charcoal/60")} />
              </button>
            </div>

            <p className="text-xs font-semibold text-muted-foreground">
              {product.stock > 10 ? "In stock — ships today" : product.stock > 0 ? `Only ${product.stock} left in stock` : "Currently sold out"}
            </p>

            {/* Trust grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: BadgeCheck, label: "100% authentic Korean origin" },
                { icon: Truck, label: "Tashkent delivery in 2–4 days" },
                { icon: RotateCcw, label: "14-day free returns" },
                { icon: Package, label: "Secure checkout" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="clay-card-sm flex items-center gap-2.5 rounded-2xl px-3.5 py-3">
                  <Icon className="size-4.5 shrink-0 text-primary" aria-hidden />
                  <span className="text-xs font-semibold text-charcoal/80">{label}</span>
                </div>
              ))}
            </div>

            {/* Details accordion */}
            <Accordion type="multiple" defaultValue={["benefits"]} className="gap-0">
              <AccordionItem value="benefits" className="border-border/60">
                <AccordionTrigger className="font-display text-base font-semibold text-charcoal no-underline hover:no-underline">
                  Benefits
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-charcoal/80">
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-mint text-[9px] font-bold">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients" className="border-border/60">
                <AccordionTrigger className="font-display text-base font-semibold text-charcoal no-underline hover:no-underline">
                  Key ingredients
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5">
                    {product.ingredients.map((ing) => (
                      <li key={ing.name} className="text-sm">
                        <span className="font-bold text-charcoal">{ing.name}</span>
                        <span className="text-muted-foreground"> — {ing.role}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="use" className="border-border/60">
                <AccordionTrigger className="font-display text-base font-semibold text-charcoal no-underline hover:no-underline">
                  How to use
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-charcoal/80">{product.howToUse}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="skin" className="border-border/60">
                <AccordionTrigger className="font-display text-base font-semibold text-charcoal no-underline hover:no-underline">
                  Skin type & concerns
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-charcoal/80">
                    Best for: <span className="font-semibold">{product.skinTypes.join(", ")}</span> skin.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {product.concerns.map((c) => (
                      <span key={c} className="clay-chip rounded-full px-3 py-1 text-[11px] font-semibold text-charcoal/70">
                        {c}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related */}
        <section aria-labelledby="related-heading" className="mt-10">
          <h2 id="related-heading" className="font-display text-2xl font-semibold text-charcoal">
            Pairs beautifully with
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
