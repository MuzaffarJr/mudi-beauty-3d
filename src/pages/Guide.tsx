import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import {
  CONCERN_LABELS,
  PRODUCTS,
  type SkinConcern,
} from "@/data/products";
import {
  Droplets,
  Layers,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CONCERN_ADVICE: Record<
  SkinConcern,
  { ingredients: string[]; steps: string[] }
> = {
  dryness: {
    ingredients: ["Hyaluronic acid", "Ceramides", "Panthenol", "Squalane"],
    steps: ["Cream cleanser", "Essence", "Rich moisturizer", "Sleeping mask"],
  },
  acne: {
    ingredients: ["BHA (salicylic acid)", "Centella asiatica", "Tea tree", "Snail mucin"],
    steps: ["Low-pH gel cleanser", "BHA toner", "Calming ampoule", "Gel moisturizer"],
  },
  pigmentation: {
    ingredients: ["Niacinamide", "Alpha-arbutin", "Rice extract", "Vitamin C"],
    steps: ["Vitamin C serum", "Brightening essence", "SPF 50+ every morning"],
  },
  sensitivity: {
    ingredients: ["Centella asiatica", "Madecassoside", "Oat extract", "Propolis"],
    steps: ["Micellar water", "Soothing toner", "Propolis ampoule", "Barrier cream"],
  },
  pores: {
    ingredients: ["Niacinamide", "Witch hazel", "Clay", "Peptides"],
    steps: ["Clay mask weekly", "Pore toner", "Lightweight gel cream"],
  },
  aging: {
    ingredients: ["Ginseng", "Peptides", "Retinal", "Adenosine"],
    steps: ["First treatment serum", "Firming ampoule", "Rich night cream"],
  },
  dullness: {
    ingredients: ["Rice water", "Vitamin C", "Fermented extracts", "PHA"],
    steps: ["Gentle exfoliant (1–2×/week)", "Glow essence", "Brightening serum"],
  },
  redness: {
    ingredients: ["Centella", "Propolis", "Green tea", "Zinc"],
    steps: ["Cooling toner", "Cica cream", "Mineral SPF"],
  },
};

const EDUCATION = [
  {
    icon: Droplets,
    tint: "bg-blush",
    title: "What is an essence?",
    body: "The heart of every Korean routine: a watery, fermented treatment applied after toner that floods skin with hydration and preps it to absorb serums. Think of it as a drink of water before a meal.",
  },
  {
    icon: Layers,
    tint: "bg-peach",
    title: "Serum vs ampoule",
    body: "Both deliver actives. Serums are daily drivers with 2–10% actives; ampoules are short-course boosters with double the concentration — for when skin needs a 2-week intervention.",
  },
  {
    icon: Sun,
    tint: "bg-mint",
    title: "Why SPF is the real anti-aging",
    body: "Up to 80% of visible aging is sun-driven. Korean sunscreens made daily SPF wearable: no cast, no sting, no grease. If you adopt one habit from this guide, make it this one.",
  },
  {
    icon: Layers,
    tint: "bg-lilac",
    title: "How to layer (thin → thick)",
    body: "Cleanse, tone, essence, serum/ampoule, moisturizer, SPF (AM only). Wait ~30 seconds between layers. If it pills, you're using too much — halve the amount and slow down.",
  },
];

export default function Guide() {
  const [selected, setSelected] = useState<SkinConcern[]>([]);

  const toggleConcern = (c: SkinConcern) =>
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const recommendations = useMemo(() => {
    if (selected.length === 0) return [];
    const scored = PRODUCTS.map((p) => ({
      product: p,
      score: p.concerns.filter((c) => selected.includes(c)).length,
    }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score || (b.product.rating ?? 0) - (a.product.rating ?? 0));
    return scored.slice(0, 3).map((s) => s.product);
  }, [selected]);

  const adviceKeys = selected.length
    ? (Object.keys(CONCERN_ADVICE) as SkinConcern[]).filter((k) => selected.includes(k))
    : [];

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="clay-card rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            MuDi Beauty education
          </p>
          <h1 className="mt-1.5 max-w-[28ch] font-display text-3xl font-semibold leading-tight text-charcoal sm:text-5xl">
            The Korean beauty guide, in plain language
          </h1>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
            No ten-step intimidation. Here's what each product actually does,
            which ingredients to look for, and how to build a routine around
            your skin — not someone else's.
          </p>
        </div>

        {/* Routine explainer */}
        <section aria-labelledby="routine-heading" className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01 · Hydrate",
              id: "step-hydrate",
              title: "Essence & toner",
              body: "Watery layers that deliver your first active ingredients and drench skin in hydration.",
              to: "/shop?category=essence",
              cta: "Shop essences",
            },
            {
              step: "02 · Treat",
              id: "step-treat",
              title: "Serum & ampoule",
              body: "Concentrated actives that target your specific concern: spots, pores, firmness, glow.",
              to: "/shop?category=serum",
              cta: "Shop serums",
            },
            {
              step: "03 · Protect",
              id: "step-protect",
              title: "Moisturizer & SPF",
              body: "Seal everything in and defend against UV — the single best anti-aging step there is.",
              to: "/shop?category=sunscreen",
              cta: "Shop SPF",
            },
          ].map((s) => (
            <article key={s.id} className="clay-card flex flex-col gap-3 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{s.step}</p>
              <h2 id={s.id} className="font-display text-xl font-semibold text-charcoal">{s.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <Link
                to={s.to}
                className="mt-auto text-sm font-bold text-charcoal underline-offset-4 hover:underline"
              >
                {s.cta} →
              </Link>
            </article>
          ))}
        </section>

        {/* ============ SKIN CONCERN FINDER ============ */}
        <section
          id="finder"
          aria-labelledby="finder-heading"
          className="clay-card mt-4 scroll-mt-28 rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-10"
        >
          <div className="flex items-center gap-3">
            <span className="clay-blob flex size-12 items-center justify-center bg-peach">
              <Sparkles className="size-5 text-charcoal/70" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Guided discovery</p>
              <h2 id="finder-heading" className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                What does your skin need today?
              </h2>
            </div>
          </div>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
            Select one or more concerns. We'll map the ingredients, routine
            steps, and MuDi products that Korean dermatology recommends first.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5" role="group" aria-label="Select your skin concerns">
            {(Object.keys(CONCERN_LABELS) as SkinConcern[]).map((c) => (
              <button
                key={c}
                data-active={selected.includes(c)}
                aria-pressed={selected.includes(c)}
                onClick={() => toggleConcern(c)}
                className="clay-chip rounded-full px-4 py-2.5 text-sm font-semibold text-charcoal/70"
              >
                {CONCERN_LABELS[c]}
              </button>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              {/* Advice */}
              <div className="space-y-4">
                <div className="clay-inset rounded-[calc(var(--radius)+0.3rem)] p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-charcoal/70">
                    <ShieldCheck className="size-4 text-primary" aria-hidden />
                    Ingredients to look for
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {adviceKeys
                      .flatMap((k) => CONCERN_ADVICE[k].ingredients)
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map((ing) => (
                        <span key={ing} className="clay-chip rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-charcoal">
                          {ing}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="clay-inset rounded-[calc(var(--radius)+0.3rem)] p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-charcoal/70">
                    <Layers className="size-4 text-primary" aria-hidden />
                    Your routine order
                  </h3>
                  <ol className="mt-3 space-y-2">
                    {adviceKeys
                      .flatMap((k) => CONCERN_ADVICE[k].steps)
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .slice(0, 6)
                      .map((step, i) => (
                        <li key={step} className="flex items-center gap-2.5 text-sm font-medium text-charcoal/80">
                          <span className="flex size-5 items-center justify-center rounded-full bg-card text-[10px] font-bold text-primary">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                  </ol>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-charcoal/70">
                  MuDi picks for you
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {recommendations.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                {recommendations.length === 0 && (
                  <p className="clay-inset mt-3 rounded-2xl p-5 text-sm text-muted-foreground">
                    No exact matches — try removing a concern or browsing the full shop.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Education cards — editorial offsets */}
        <section aria-labelledby="learn-heading" className="mt-4">
          <h2 id="learn-heading" className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
            The short lessons
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {EDUCATION.map((e, i) => (
              <article
                key={e.title}
                className={cn(
                  "clay-card flex items-start gap-4 p-6",
                  i % 2 === 1 && "sm:translate-y-4",
                )}
              >
                <span className={`clay-blob flex size-14 shrink-0 items-center justify-center ${e.tint}`}>
                  <e.icon className="size-6 text-charcoal/70" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-charcoal">{e.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Authenticity */}
        <section className="clay-card mt-10 flex flex-col items-center gap-4 rounded-[calc(var(--radius)+0.8rem)] p-8 text-center sm:p-10">
          <span className="clay-blob flex size-14 items-center justify-center bg-mint">
            <ShieldCheck className="size-6 text-charcoal/70" aria-hidden />
          </span>
          <h2 className="max-w-[30ch] font-display text-2xl font-semibold text-charcoal">
            Explore the original products
          </h2>
          <p className="max-w-[64ch] text-sm leading-relaxed text-muted-foreground">
            The catalog links directly to each Korean brand's product page,
            so you can compare its packaging and ingredients. MuDi is currently
            a design concept; local stock and purchase options are not yet available.
          </p>
          <Button asChild className="clay-btn mt-1 h-12 px-7 text-sm font-bold">
            <Link to="/shop">Browse the collection</Link>
          </Button>
          <ProductThumb seed="joseon-glow-1" image={PRODUCTS[1].image} label={PRODUCTS[1].name} className="size-20 opacity-90" />
        </section>
      </div>
    </main>
  );
}
