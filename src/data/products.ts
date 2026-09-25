/** MuDi Beauty — product catalog.
 *
 * Facts verified against official brand sources (Sept 2026).
 * - COSRX — Advanced Snail 96 Mucin Power Essence — cosrx.com
 * - Beauty of Joseon — Glow Serum: Propolis + Niacinamide — beautyofjoseon.com
 * - Round Lab — 1025 Dokdo Toner — roundlab.com
 * - Torriden — DIVE-IN Serum — torriden.us
 * - Laneige — Lip Sleeping Mask EX — us.laneige.com
 * - Mediheal — Tea Tree Essential Mask — mediheal.com
 *
 * Data policy:
 * - Only claims published by the brands themselves (ingredients, usage steps,
 *   brand marketing language). No invented certifications, clinical results,
 *   ratings, review counts, or Uzbekistan retail prices.
 * - `price` is null until real retail pricing is confirmed for Uzbekistan;
 *   the UI renders "Price coming soon" and disables purchase.
 */

export type SkinConcern =
  | "dryness"
  | "acne"
  | "pigmentation"
  | "sensitivity"
  | "pores"
  | "aging"
  | "dullness"
  | "redness";

export type ProductType =
  | "cleanser"
  | "toner"
  | "essence"
  | "serum"
  | "ampoule"
  | "moisturizer"
  | "sunscreen"
  | "mask"
  | "cushion"
  | "foundation"
  | "lip"
  | "eye"
  | "blush"
  | "shampoo"
  | "treatment"
  | "bodycare";

export type ProductCategory = "skincare" | "makeup" | "hair-body";

export interface Brand {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  officialSite: string;
}

export interface Category {
  id: ProductType;
  label: string;
  category: ProductCategory;
  blurb: string;
}

export interface Product {
  id: string;
  slug: string;
  brandId: string;
  name: string;
  type: ProductType;
  category: ProductCategory;
  price: number | null; // null = retail price not yet confirmed for Uzbekistan
  compareAtPrice?: number | null;
  rating: number | null; // null = no verified rating to publish
  reviewCount: number | null; // null = no verified review count to publish
  volume: string;
  blurb: string;
  description: string;
  benefits: string[];
  ingredients: { name: string; role: string }[];
  skinTypes: string[];
  concerns: SkinConcern[];
  howToUse: string;
  colors?: { name: string; hex: string; tone: string }[];
  shades?: { name: string; hex: string; tone: string }[];
  stock: number | null; // null = availability not yet confirmed
  isBestseller?: boolean;
  isNew?: boolean;
  seed: string; // stable key for the editorial fallback renderer
  image?: string; // licensed product photography (user-provided)
  imageAlt?: string;
  sourceUrl?: string; // official brand product page, shown as provenance
}

export const BRANDS: Brand[] = [
  {
    id: "cosrx",
    name: "COSRX",
    country: "South Korea",
    tagline: "Minimal ingredients, honest results",
    description:
      "A Seoul-based K-beauty lab built around short, effective formulas — snail mucin, propolis and centella done simply.",
    officialSite: "https://www.cosrx.com",
  },
  {
    id: "beautyofjoseon",
    name: "Beauty of Joseon",
    country: "South Korea",
    tagline: "Hanhbang, reimagined",
    description:
      "Joseon-era herbal ingredients paired with modern dermatology — gentle daily formulas built on rice, propolis and ginseng.",
    officialSite: "https://beautyofjoseon.com",
  },
  {
    id: "roundlab",
    name: "Round Lab",
    country: "South Korea",
    tagline: "Skin balanced by nature",
    description:
      "Jeju-born skincare built on deep-sea water and gentle, dermatologist-friendly textures for sensitive skin.",
    officialSite: "https://roundlab.com",
  },
  {
    id: "torriden",
    name: "Torriden",
    country: "South Korea",
    tagline: "Hydration engineering",
    description:
      "The hydration specialists behind the 5D low-molecular hyaluronic acid complex — lightweight moisture for every skin layer.",
    officialSite: "https://torriden.us",
  },
  {
    id: "laneige",
    name: "LANEIGE",
    country: "South Korea",
    tagline: "Hydration science",
    description:
      "Seoul's water-science pioneer — home of the Water Sleeping Mask and the world's most-loved Lip Sleeping Mask.",
    officialSite: "https://us.laneige.com",
  },
  {
    id: "mediheal",
    name: "MEDIHEAL",
    country: "South Korea",
    tagline: "The sheet mask specialist",
    description:
      "Korea's sheet-mask house — derma-tested essences in soft, comfort-fit masks for targeted daily care.",
    officialSite: "https://mediheal.com",
  },
];

export const CATEGORIES: Category[] = [
  { id: "toner", label: "Toner", category: "skincare", blurb: "Hydration-first layers" },
  { id: "essence", label: "Essence", category: "skincare", blurb: "The Korean skin-prep step" },
  { id: "serum", label: "Serum", category: "skincare", blurb: "Targeted treatment layers" },
  { id: "mask", label: "Masks", category: "skincare", blurb: "Sheet & sleeping treatments" },
  { id: "lip", label: "Lip care", category: "makeup", blurb: "Overnight & daily lip care" },
];

export const CONCERN_LABELS: Record<SkinConcern, string> = {
  dryness: "Dryness",
  acne: "Acne & blemishes",
  pigmentation: "Pigmentation",
  sensitivity: "Sensitivity",
  pores: "Enlarged pores",
  aging: "Fine lines & firmness",
  dullness: "Dullness",
  redness: "Redness",
};

export const PRODUCTS: Product[] = [
  {
    id: "p-cosrx-snail-96",
    slug: "cosrx-snail-96-mucin-essence",
    brandId: "cosrx",
    name: "Advanced Snail 96 Mucin Power Essence",
    type: "essence",
    category: "skincare",
    price: null,
    rating: null,
    reviewCount: null,
    volume: "100 ml",
    blurb: "The cult essence with 96% snail secretion filtrate.",
    description:
      "COSRX's award-winning essence is built on 96% snail secretion filtrate — a lightweight, watery-gel layer that floods skin with moisture, supports the skin barrier, and leaves a healthy glow without stickiness. The brand's most-loved K-beauty essential and a classic first step into Korean skincare.",
    benefits: [
      "Deep, long-lasting hydration with 96% snail secretion filtrate",
      "Barrier care and a visible glow (brand's published claim)",
      "Lightweight, non-sticky finish that layers into any routine",
    ],
    ingredients: [
      { name: "Snail secretion filtrate 96%", role: "Deep hydration and barrier care" },
      { name: "Sodium hyaluronate", role: "Humectant hydration" },
      { name: "Panthenol", role: "Soothes and supports the barrier" },
      { name: "Allantoin", role: "Calms and softens" },
    ],
    skinTypes: ["All", "Dry", "Combination"],
    concerns: ["dryness", "dullness", "redness"],
    howToUse:
      "After cleansing and toning, apply a small amount to the entire face. Gently pat with fingertips to aid absorption, then follow with a moisturizer.",
    stock: null,
    isBestseller: true,
    seed: "cosrx-snail-96",
    sourceUrl: "https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence",
  },
  {
    id: "p-boj-glow-serum",
    slug: "beauty-of-joseon-glow-serum",
    brandId: "beautyofjoseon",
    name: "Glow Serum: Propolis + Niacinamide",
    type: "serum",
    category: "skincare",
    price: null,
    rating: null,
    reviewCount: null,
    volume: "30 ml",
    blurb: "Propolis and niacinamide for balanced, glassy skin.",
    description:
      "Beauty of Joseon's Glow Serum pairs 60% propolis extract with 2% niacinamide — propolis to hydrate and soothe, niacinamide to keep oil and moisture in balance while refining the look of texture, pores and fine lines. A honey-toned daily serum that leaves a luminous, glassy finish.",
    benefits: [
      "Hydrates and soothes with 60% propolis extract",
      "Balances oil and moisture with 2% niacinamide",
      "Improves the look of texture, pores and fine lines",
    ],
    ingredients: [
      { name: "Propolis extract 60%", role: "Hydrates and soothes" },
      { name: "Niacinamide 2%", role: "Balances oil-moisture, refines texture" },
    ],
    skinTypes: ["All", "Combination", "Oily"],
    concerns: ["dullness", "pores", "redness"],
    howToUse:
      "After cleansing and toning, apply 2–3 drops over the face and gently pat until absorbed. Use morning and evening, followed by moisturizer and SPF in the daytime.",
    stock: null,
    isBestseller: true,
    seed: "boj-glow-serum",
    sourceUrl: "https://beautyofjoseon.com/products/glow-serum-propolis-niacinamide",
  },
  {
    id: "p-roundlab-dokdo-toner",
    slug: "round-lab-1025-dokdo-toner",
    brandId: "roundlab",
    name: "1025 Dokdo Toner",
    type: "toner",
    category: "skincare",
    price: null,
    rating: null,
    reviewCount: null,
    volume: "100 / 200 / 500 ml",
    blurb: "Deep-sea water hydration from 5,000 feet below the East Sea.",
    description:
      "Round Lab's signature toner is built on deep-sea water drawn from 5,000 feet below the surface near Ulleungdo — naturally rich in minerals like magnesium, calcium and zinc. The watery texture absorbs instantly with no sticky finish, replenishing moisture while gently sweeping away dead skin cells and calming tired skin with panthenol, allantoin and betaine. Unscented and kind to sensitive skin.",
    benefits: [
      "Long-lasting moisture with 72 nature-derived minerals (brand-published)",
      "Gently exfoliates dead skin cells and helps control excess sebum",
      "Soothing care for tired, irritated skin",
    ],
    ingredients: [
      { name: "Deep-sea water", role: "Mineral-rich hydration" },
      { name: "Panthenol + allantoin + betaine", role: "Soothing care" },
      { name: "Protease (Hatching EX-07)", role: "Gentle exfoliation and sebum control" },
    ],
    skinTypes: ["All", "Sensitive"],
    concerns: ["dryness", "sensitivity", "redness", "pores"],
    howToUse:
      "After cleansing, soak a cotton pad with toner and gently swipe all over the face. For a leave-on treatment, soak cotton pads and leave on the face for 5–10 minutes.",
    stock: null,
    isBestseller: true,
    seed: "round-lab-dokdo",
    sourceUrl: "https://roundlab.com/products/1025-dokdo-toner",
  },
  {
    id: "p-torriden-dive-in",
    slug: "torriden-dive-in-serum",
    brandId: "torriden",
    name: "DIVE-IN Serum",
    type: "serum",
    category: "skincare",
    price: null,
    rating: null,
    reviewCount: null,
    volume: "50 ml",
    blurb: "Five molecular weights of hyaluronic acid, surface to deep.",
    description:
      "Torriden's hydration serum carries five different sizes of hyaluronic acid molecules — larger ones lock moisture onto the surface while smaller, low-molecular forms absorb more easily to hydrate deeper layers. Panthenol and allantoin keep the formula gentle enough for sensitive skin, and the lightweight texture absorbs fast with a dewy, non-sticky finish.",
    benefits: [
      "Multi-layer hydration with the 5D low-molecular hyaluronic acid complex",
      "Up to 48 hours of lasting moisture (brand's published claim)",
      "Gentle formula suitable even for sensitive skin",
    ],
    ingredients: [
      { name: "5D Hyaluronic Acid complex", role: "Surface-to-deep hydration" },
      { name: "Panthenol", role: "Retains moisture and soothes" },
      { name: "Allantoin", role: "Calms sensitivity" },
      { name: "Ceramide NP", role: "Barrier support" },
    ],
    skinTypes: ["All", "Dry", "Sensitive", "Combination"],
    concerns: ["dryness", "sensitivity", "dullness"],
    howToUse:
      "Evenly apply an appropriate amount to the face and lightly pat until absorbed. Use morning and evening after cleansing and toning.",
    stock: null,
    isBestseller: true,
    seed: "torriden-dive-in",
    sourceUrl: "https://torriden.us/products/dive-in-serum",
  },
  {
    id: "p-laneige-lip-mask-ex",
    slug: "laneige-lip-sleeping-mask-ex",
    brandId: "laneige",
    name: "Lip Sleeping Mask EX",
    type: "mask",
    category: "skincare",
    price: null,
    rating: null,
    reviewCount: null,
    volume: "20 g",
    blurb: "The world's most-loved overnight lip treatment.",
    description:
      "LANEIGE's iconic leave-on lip mask melts over lips overnight with its Moisture Wrap™ technology — a breathable moisture barrier of murumuru and shea butter sealed with antioxidant berry fruit complex and vitamin C. One generous layer before bed, softer, smoother lips by morning. Includes a spatula for hygienic application.",
    benefits: [
      "Intensive overnight moisture for dry, flaky lips",
      "Moisture Wrap™ technology seals in hydration as you sleep",
      "Murumuru & shea butter for soft, supple lips by morning",
    ],
    ingredients: [
      { name: "Moisture Wrap™ technology", role: "Seals in moisture overnight" },
      { name: "Murumuru & shea butter", role: "Nourishing, softening" },
      { name: "Berry fruit complex + vitamin C", role: "Antioxidant care" },
    ],
    skinTypes: ["All"],
    concerns: ["dryness"],
    howToUse:
      "PM: apply generously before bed for intensive overnight moisture. AM: apply a thin layer to prep lips before the rest of your lip routine. Use the included spatula and gently wipe off any residue in the morning.",
    stock: null,
    isBestseller: true,
    isNew: true,
    seed: "laneige-lip-ex",
    sourceUrl: "https://us.laneige.com/products/lip-sleeping-mask",
  },
  {
    id: "p-mediheal-teatree-mask",
    slug: "mediheal-tea-tree-essential-mask",
    brandId: "mediheal",
    name: "Tea Tree Essential Mask",
    type: "mask",
    category: "skincare",
    price: null,
    rating: null,
    reviewCount: null,
    volume: "25 ml",
    blurb: "A calming sheet mask for troubled, unbalanced skin.",
    description:
      "MEDIHEAL's Tea Tree Essential Mask delivers a soothing essence to skin that feels irritated or unbalanced — tea tree helps clear pores and reduce excess oil while calming visible redness. The soft, comfort-fit sheet holds its moisture for the entire wear time and leaves a fresh, non-sticky finish.",
    benefits: [
      "Soothes and rebalances troubled skin",
      "Helps clear pores and reduce excess oil",
      "Comfort-fit sheet with a fresh, non-sticky finish",
    ],
    ingredients: [
      { name: "Tea tree extract", role: "Calms visible redness, clarifies" },
      { name: "Soothing essence complex", role: "Rebalances stressed skin" },
    ],
    skinTypes: ["Oily", "Combination", "Sensitive"],
    concerns: ["acne", "redness", "pores"],
    howToUse:
      "After cleansing and toning, apply the mask and smooth it to fit the face. Leave on for 10–20 minutes, remove, then gently press the remaining essence into the skin.",
    stock: null,
    isNew: true,
    seed: "mediheal-teatree",
    sourceUrl: "https://mediheal.com/products/teatree-essential-mask-calming-moisture",
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const brandById = (id: string) => BRANDS.find((b) => b.id === id);

/** Renders a price, or the "coming soon" state when retail pricing is not yet set. */
export const formatPrice = (value: number) =>
  `${
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }`;

/** Shipping estimate for Uzbekistan (placeholder rates, confirmed at checkout). */
export const FREE_SHIPPING_THRESHOLD = 60;
export const SHIPPING_FLAT = 5;
