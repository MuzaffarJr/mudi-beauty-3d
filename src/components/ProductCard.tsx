import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductThumb } from "@/components/ProductThumb";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { brandById, formatPrice, type Product } from "@/data/products";
import { Link } from "react-router";
import { Heart, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addLine } = useCart();
  const { has, toggle } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const brand = brandById(product.brandId);
  const wished = has(product.id);
  const hasPrice = product.price != null;
  const onSale = product.price != null && product.compareAtPrice != null && product.compareAtPrice > product.price;

  const handleQuickAdd = () => {
    addLine(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  const isAvailable = hasPrice && (product.stock ?? 0) > 0;

  const discountPercent = hasPrice && product.compareAtPrice != null && product.price != null
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <article className="clay-card group flex flex-col p-4 transition-transform duration-300 hover:-translate-y-1.5">
      <div className="relative">
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <ProductThumb
            seed={product.seed}
            image={product.image}
            label={product.name}
            className="aspect-square w-full"
          />
        </Link>

        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {onSale && (
            <Badge className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold">
              −{discountPercent}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-secondary-foreground">
              New
            </Badge>
          )}
          {product.isBestseller && !onSale && !product.isNew && (
            <Badge className="rounded-full bg-peach px-2.5 py-1 text-[11px] font-bold text-charcoal">
              Featured
            </Badge>
          )}
        </div>

        <button
          onClick={() => toggle(product.id)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className="clay-chip absolute right-2 top-2 flex size-10 items-center justify-center rounded-full"
        >
          <Heart
            className={cn("size-4 transition", wished ? "fill-primary text-primary" : "text-charcoal/60")}
          />
        </button>          <Button
            onClick={handleQuickAdd}
            size="sm"
            className={cn(
              "clay-btn absolute bottom-2.5 left-1/2 h-9 -translate-x-1/2 gap-1 px-4 text-xs opacity-0 transition-all duration-300 group-hover:opacity-100 focus-visible:opacity-100",
              justAdded && "opacity-100",
            )}
            disabled={!isAvailable}
          >
            <Plus className="size-3.5" />
            {!hasPrice ? "Price coming soon" : !isAvailable ? "Sold out" : justAdded ? "Added ✓" : "Quick add"}
          </Button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground">
          {brand?.name ?? product.brandId}
        </p>
        <Link
          to={`/product/${product.slug}`}
          className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-charcoal underline-offset-2 hover:underline"
        >
          {product.name}
        </Link>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          {product.rating != null && product.reviewCount != null && (
            <>
              <Star className="size-3.5 fill-primary text-primary" aria-hidden />
              <span className="font-bold text-charcoal">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </>
          )}
          <span className="ml-auto font-semibold">{product.volume}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {product.concerns.slice(0, 2).map((c) => (
            <span
              key={c}
              className="clay-chip rounded-full px-2 py-0.5 text-[10px] font-semibold text-charcoal/60"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-base font-extrabold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {onSale && product.price != null && (
            <span className="text-sm font-medium text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
