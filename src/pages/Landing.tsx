import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import {
  ArrowRight,
  Droplets,
  Leaf,
  Sparkles,
  Star,
  Sun,
  ExternalLink,
} from "lucide-react";

const Hero3D = lazy(() =>
  import("@/components/three/Hero3D").then((m) => ({ default: m.Hero3D })),
);

const CATEGORY_TILES = [
  { id: "essence", tint: "bg-blush", icon: Droplets },
  { id: "serum", tint: "bg-peach", icon: Sparkles },
  { id: "sunscreen", tint: "bg-mint", icon: Sun },
  { id: "lip", tint: "bg-lilac", icon: Leaf },
] as const;

export default function Landing() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setHeroReady(true), 150);
    return () => window.clearTimeout(t);
  }, []);

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const moreToExplore = PRODUCTS.slice(-2);

  return (
    <div className="pb-4">
      {/* ============ HERO ============ */}
      <section className="px-3 sm:px-5">
        <div className="clay-card mx-auto grid max-w-6xl overflow-hidden rounded-[calc(var(--radius)+1rem)] lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="flex flex-col justify-center gap-6 px-6 py-12 sm:px-10 lg:py-16">
            <p
              className="clay-chip inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-charcoal/70 animate-fade-up"
            >
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Straight from Seoul
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-charcoal text-balance sm:text-5xl lg:text-[3.4rem] animate-fade-up [animation-delay:80ms]">
              Korean beauty,
              <br />
              <span className="text-primary">softened by clay,</span>
              <br />
              perfected by science.
            </h1>
            <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground animate-fade-up [animation-delay:160ms]">
              Explore real Korean skincare from the brands behind it — product
              photography, ingredients, and routines brought together in an
              interactive 3D concept store.
            </p>
            <div className="flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:240ms]">
              <Button asChild className="clay-btn h-13 px-7 text-base font-bold">
                <Link to="/shop">Explore the collection</Link>
              </Button>
              <Button asChild variant="ghost" className="clay-btn-soft h-13 px-6 text-base font-semibold">
                <Link to="/guide">
                  Discover your routine
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3 animate-fade-up [animation-delay:320ms]">
              {[
                ["6", "real Korean products"],
                ["6", "official brand sources"],
                ["3D", "interactive experience"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-xl font-semibold text-charcoal">{stat}</dd>
                  <dd className="text-xs font-medium text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 3D stage */}
        <div className="relative min-h-[380px] bg-gradient-to-br from-cream via-card to-blush/40 lg:min-h-full">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(38rem 24rem at 70% 20%, hsl(22 80% 88% / 0.55), transparent 65%), radial-gradient(30rem 20rem at 20% 85%, hsl(165 45% 82% / 0.4), transparent 60%)",
            }}
            aria-hidden
          />
          <Suspense fallback={<div className="size-full" />}>
            {heroReady && <Hero3D image={PRODUCTS[0].image} />}
          </Suspense>
            {/* callouts over the stage */}
            <div className="clay-card-sm absolute left-4 top-5 hidden rounded-2xl px-4 py-2.5 sm:block">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Hero pick</p>
              <p className="text-sm font-bold text-charcoal">COSRX Snail 96 Essence</p>
            </div>
            <div className="clay-card-sm absolute bottom-5 right-4 hidden rounded-2xl px-4 py-2.5 sm:block">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Official product</p>
              <p className="text-sm font-bold text-charcoal">100 ml · Price coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section aria-label="About the collection" className="px-3 pt-3 sm:px-5">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
          {[
            { icon: ExternalLink, title: "Official product sources", body: "Each product links to its brand's product page for reference." },
            { icon: Sparkles, title: "Real product photography", body: "See the original packaging in imagery hosted by the brands." },
            { icon: Leaf, title: "Concept collection", body: "Explore routines while local pricing and availability are being confirmed." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="clay-card-sm flex items-start gap-3.5 rounded-[calc(var(--radius)+0.3rem)] p-5">
              <span className="clay-blob flex size-11 shrink-0 items-center justify-center bg-mint">
                <Icon className="size-5 text-charcoal/70" aria-hidden />
              </span>
              <div>
                <h2 className="text-sm font-bold text-charcoal">{title}</h2>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORY DISCOVERY ============ */}
      <section aria-labelledby="categories-heading" className="px-3 pt-14 sm:px-5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Start here</p>
              <h2 id="categories-heading" className="mt-1 font-display text-3xl font-semibold text-charcoal">
                Find your ritual step
              </h2>
            </div>
            <Link to="/shop" className="text-sm font-bold text-charcoal underline-offset-4 hover:underline">
              All categories →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORY_TILES.map(({ id, tint, icon: Icon }) => {
              const cat = CATEGORIES.find((c) => c.id === id);
              if (!cat) return null;
              return (
                <Link
                  key={id}
                  to={`/shop?category=${id}`}
                  className="clay-card group flex flex-col items-center gap-3 p-6 text-center transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <span className={`clay-blob flex size-16 items-center justify-center ${tint}`}>
                    <Icon className="size-6 text-charcoal/70" aria-hidden />
                  </span>
                  <span className="font-display text-lg font-semibold text-charcoal">{cat.label}</span>
                  <span className="-mt-2 text-xs text-muted-foreground">{cat.blurb}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ BESTSELLERS ============ */}
      <section aria-labelledby="bestsellers-heading" className="px-3 pt-16 sm:px-5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Most loved</p>
              <h2 id="bestsellers-heading" className="mt-1 font-display text-3xl font-semibold text-charcoal">
                Featured K-beauty essentials
              </h2>
            </div>
            <Link to="/shop?filter=bestsellers" className="text-sm font-bold text-charcoal underline-offset-4 hover:underline">
              View featured products →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ EDUCATION — EDITORIAL SPLIT ============ */}
      <section aria-labelledby="edu-heading" className="px-3 pt-16 sm:px-5">
        <div className="clay-card mx-auto grid max-w-6xl gap-0 overflow-hidden rounded-[calc(var(--radius)+1rem)] lg:grid-cols-[1fr_1.1fr]">
          <div className="relative flex items-center justify-center bg-gradient-to-br from-blush/70 via-card to-peach/60 p-10">
            <div className="relative">
              <ProductThumb seed="cosrx-snail-2" image={PRODUCTS[0].image} label={PRODUCTS[0].name} className="size-44 animate-float" />
              <ProductThumb seed="laneige-lip-4" image={PRODUCTS[4].image} label={PRODUCTS[4].name} className="absolute -right-16 -top-8 size-24 animate-float-slow" />
              <ProductThumb seed="boj-glow-3" image={PRODUCTS[1].image} label={PRODUCTS[1].name} className="absolute -bottom-10 -left-14 size-28 animate-float" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Beauty Guide</p>
            <h2 id="edu-heading" className="font-display text-3xl font-semibold leading-tight text-charcoal text-balance">
              New to K-beauty? Start with the 3-step rule.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Korean skincare isn't ten confusing steps — it's three mindful
              layers: <strong className="text-charcoal">hydrate</strong> (essence),
              <strong className="text-charcoal"> treat</strong> (serum),{" "}
              <strong className="text-charcoal">protect</strong> (SPF). Our guide
              explains what each product does in plain language.
            </p>
            <ul className="space-y-2.5">
              {[
                "What is an essence — and why everyone needs one",
                "Serum vs ampoule: which concentration is right",
                "Why sunscreen is the real anti-aging hero",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-charcoal/80">
                  <span className="flex size-5 items-center justify-center rounded-full bg-mint text-[10px] font-bold text-charcoal">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="clay-btn mt-2 w-fit h-12 px-6 text-sm font-bold">
              <Link to="/guide">
                Open the Beauty Guide
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ MORE TO EXPLORE ============ */}
      <section aria-labelledby="new-heading" className="px-3 pt-16 sm:px-5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">The collection</p>
              <h2 id="new-heading" className="mt-1 font-display text-3xl font-semibold text-charcoal">
                More to explore
              </h2>
            </div>
            <Link to="/shop" className="text-sm font-bold text-charcoal underline-offset-4 hover:underline">
              View all products →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {moreToExplore.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="px-3 pt-16 sm:px-5">
        <div className="clay-card mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-[calc(var(--radius)+1rem)] px-6 py-14 text-center">
          <span className="clay-blob flex size-16 items-center justify-center bg-blush">
            <Star className="size-7 fill-primary text-primary" aria-hidden />
          </span>
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl">
            Your glass-skin era starts with one bottle.
          </h2>
          <p className="max-w-[52ch] text-base text-muted-foreground">
            Explore the original products and build a routine that suits you.
            Local availability and checkout details are being prepared.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="clay-btn h-13 px-8 text-base font-bold">
              <Link to="/shop">Shop the collection</Link>
            </Button>
            <Button asChild variant="ghost" className="clay-btn-soft h-13 px-6 text-base font-semibold">
              <Link to="/guide#finder">Find my skin concern</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
