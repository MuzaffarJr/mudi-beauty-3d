import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { ProductCard } from "@/components/ProductCard";
import {
  BRANDS,
  CATEGORIES,
  CONCERN_LABELS,
  PRODUCTS,
  type ProductType,
  type SkinConcern,
} from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategory = searchParams.get("category") as ProductType | null;
  const activeBrand = searchParams.get("brand");
  const activeConcern = searchParams.get("concern") as SkinConcern | null;
  const activeFilter = searchParams.get("filter"); // "bestsellers" | "new"
  const sort = (searchParams.get("sort") ?? "featured") as SortKey;

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory) list = list.filter((p) => p.type === activeCategory);
    if (activeBrand) list = list.filter((p) => p.brandId === activeBrand);
    if (activeConcern) list = list.filter((p) => p.concerns.includes(activeConcern));
    if (activeFilter === "bestsellers") list = list.filter((p) => p.isBestseller);
    if (activeFilter === "new") list = list.filter((p) => p.isNew);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [activeCategory, activeBrand, activeConcern, activeFilter, sort]);

  const hasActiveFilters =
    activeCategory || activeBrand || activeConcern || activeFilter;

  const filterChips = (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">Collections</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["bestsellers", "new"] as const).map((f) => (
            <button
              key={f}
              data-active={activeFilter === f}
              onClick={() => setParam("filter", activeFilter === f ? null : f)}
              className="clay-chip rounded-full px-4 py-2 text-sm font-semibold text-charcoal/70"
            >
              {f === "bestsellers" ? "★ Bestsellers" : "✦ New arrivals"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">Category</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              data-active={activeCategory === c.id}
              onClick={() => setParam("category", activeCategory === c.id ? null : c.id)}
              className="clay-chip rounded-full px-3.5 py-2 text-xs font-semibold text-charcoal/70"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">Brand</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b.id}
              data-active={activeBrand === b.id}
              onClick={() => setParam("brand", activeBrand === b.id ? null : b.id)}
              className="clay-chip rounded-full px-3.5 py-2 text-xs font-semibold text-charcoal/70"
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">Skin concern</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(CONCERN_LABELS) as SkinConcern[]).map((c) => (
            <button
              key={c}
              data-active={activeConcern === c}
              onClick={() => setParam("concern", activeConcern === c ? null : c)}
              className="clay-chip rounded-full px-3.5 py-2 text-xs font-semibold text-charcoal/70"
              data-label={CONCERN_LABELS[c]}
            >
              {CONCERN_LABELS[c]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main className="px-3 pb-6 pt-2 sm:px-5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="clay-card flex flex-col gap-4 rounded-[calc(var(--radius)+0.8rem)] p-6 sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">The collection</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
              Shop Korean beauty
            </h1>
            <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              Every product is sourced directly from official Korean distributors and
              stocked in Tashkent. Filter by ritual step, brand, or skin concern.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-charcoal/70">
              {filtered.length} product{filtered.length === 1 ? "" : "s"}
              {hasActiveFilters ? " match your filters" : " in the collection"}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="clay-chip flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-charcoal lg:hidden"
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </button>
              <Select value={sort} onValueChange={(v) => setParam("sort", v)}>
                <SelectTrigger className="clay-chip h-11 w-[190px] rounded-full border-0 px-4 text-sm font-semibold text-charcoal shadow-none">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="clay-card rounded-2xl border-0">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: low → high</SelectItem>
                  <SelectItem value="price-desc">Price: high → low</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr]">
          {/* Desktop filters */}
          <aside className="clay-card sticky top-24 hidden h-fit rounded-[calc(var(--radius)+0.8rem)] p-6 lg:block" aria-label="Product filters">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-charcoal">Refine</h2>
              {hasActiveFilters && (
                <button
                  onClick={() => setSearchParams({}, { replace: true })}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <X className="size-3.5" /> Clear all
                </button>
              )}
            </div>
            <div className="mt-4">{filterChips}</div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="clay-card flex flex-col items-center gap-3 rounded-[calc(var(--radius)+0.8rem)] p-12 text-center">
                <p className="font-display text-xl font-semibold text-charcoal">No matches</p>
                <p className="max-w-[40ch] text-sm text-muted-foreground">
                  Try removing a filter — or explore a different category.
                </p>
                <button
                  onClick={() => setSearchParams({}, { replace: true })}
                  className="clay-btn h-11 px-6 text-sm font-bold"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/30 backdrop-blur-[2px]"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="clay-card relative max-h-[82dvh] w-full overflow-y-auto rounded-t-[calc(var(--radius)+0.8rem)] p-6 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-charcoal">Refine</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="clay-chip flex size-10 items-center justify-center rounded-full"
              >
                <X className="size-4" />
              </button>
            </div>
            {filterChips}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="clay-btn mt-6 h-12 w-full text-sm font-bold"
            >
              Show {filtered.length} product{filtered.length === 1 ? "" : "s"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
