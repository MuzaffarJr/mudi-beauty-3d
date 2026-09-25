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
  price: number; // USD
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
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
  stock: number;
  isBestseller?: boolean;
  isNew?: boolean;
  seed: string; // for generated product imagery
}

export const BRANDS: Brand[] = [
  {
    id: "laneige",
    name: "LANEIGE",
    country: "South Korea",
    tagline: "Hydration science",
    description:
      "Seoul-born skincare pioneer famous for water-science hydration, from the Water Sleeping Mask to the Lip Sleeping Mask loved worldwide.",
  },
  {
    id: "cosrx",
    name: "COSRX",
    country: "South Korea",
    tagline: "Minimal ingredients, maximum results",
    description:
      "A cult-favorite K-beauty lab built around short, effective formulas — snail mucin, centella, and BHA done right.",
  },
  {
    id: "sulwhasoo",
    name: "Sulwhasoo",
    country: "South Korea",
    tagline: "Herbal luxury",
    description:
      "Korea's premier luxury house blending ginseng and traditional herbal wisdom with modern anti-aging science.",
  },
  {
    id: "beautyofjoseon",
    name: "Beauty of Joseon",
    country: "South Korea",
    tagline: "Hanbang, reimagined",
    description:
      "Joseon-dynasty herbal ingredients meeting modern dermatology — gentle formulas for daily glow.",
  },
  {
    id: "innisfree",
    name: "innisfree",
    country: "South Korea",
    tagline: "Nature from Jeju",
    description:
      "Green-tea and volcanic-clay skincare sourced from Jeju Island, known for fresh, affordable daily care.",
  },
  {
    id: "romand",
    name: "rom&nd",
    country: "South Korea",
    tagline: "Effortless modern makeup",
    description:
      "The makeup darling of Seoul — weightless tints, glazed finishes, and shades tuned for warm undertones.",
  },
];

export const CATEGORIES: Category[] = [
  { id: "cleanser", label: "Cleanser", category: "skincare", blurb: "Low-pH gels, oils and balms" },
  { id: "toner", label: "Toner", category: "skincare", blurb: "Hydration first layers" },
  { id: "essence", label: "Essence", category: "skincare", blurb: "The Korean skin-prep step" },
  { id: "serum", label: "Serum", category: "skincare", blurb: "Targeted actives" },
  { id: "ampoule", label: "Ampoule", category: "skincare", blurb: "Concentrated boosters" },
  { id: "moisturizer", label: "Moisturizer", category: "skincare", blurb: "Creams, gels & balms" },
  { id: "sunscreen", label: "Sunscreen", category: "skincare", blurb: "Everyday SPF" },
  { id: "mask", label: "Masks", category: "skincare", blurb: "Sheet, wash-off & sleeping" },
  { id: "cushion", label: "Cushion", category: "makeup", blurb: "Signature K-base" },
  { id: "foundation", label: "Foundation", category: "makeup", blurb: "Skin-like coverage" },
  { id: "lip", label: "Lip", category: "makeup", blurb: "Tints, balms & glaze" },
  { id: "eye", label: "Eye", category: "makeup", blurb: "Palettes & liner" },
  { id: "blush", label: "Blush", category: "makeup", blurb: "Soft diffusion color" },
  { id: "shampoo", label: "Shampoo", category: "hair-body", blurb: "Scalp-first care" },
  { id: "treatment", label: "Treatment", category: "hair-body", blurb: "Hair masks & oils" },
  { id: "bodycare", label: "Body care", category: "hair-body", blurb: "Lotions & cleansers" },
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
    id: "p1",
    slug: "glow-deep-serum",
    brandId: "beautyofjoseon",
    name: "Glow Deep Serum — Rice + Alpha-Arbutin",
    type: "serum",
    category: "skincare",
    price: 19.0,
    compareAtPrice: 24.0,
    rating: 4.9,
    reviewCount: 412,
    volume: "30 ml",
    blurb: "The cult rice serum for even, glass-glow tone.",
    description:
      "A lightweight brightening serum that pairs 68% rice bran water with 2% alpha-arbutin to visibly even tone and soften the look of dark spots over weeks of daily use. Fast-absorbing with no tack — layered easily under SPF.",
    benefits: [
      "Visibly fades dark spots and post-acne marks",
      "Rice bran water hydrates and softens texture",
      "Weightless layering under makeup or SPF",
    ],
    ingredients: [
      { name: "Rice bran water 68%", role: "Hydrates, brightens, soothes" },
      { name: "Alpha-arbutin 2%", role: "Evens tone, fades spots" },
      { name: "Niacinamide", role: "Barrier support" },
    ],
    skinTypes: ["All", "Dry", "Combination"],
    concerns: ["pigmentation", "dullness", "dryness"],
    howToUse:
      "After toner, smooth 2–3 drops over face morning and evening. Follow with moisturizer and SPF in daytime.",
    stock: 42,
    isBestseller: true,
    seed: "joseon-glow-1",
  },
  {
    id: "p2",
    slug: "snail-mucin-96-essence",
    brandId: "cosrx",
    name: "Advanced Snail 96 Mucin Power Essence",
    type: "essence",
    category: "skincare",
    price: 21.5,
    rating: 4.8,
    reviewCount: 586,
    volume: "100 ml",
    blurb: "96% snail mucin for bounce and repair.",
    description:
      "The world's most-loved K-beauty essence. 96% snail secretion filtrate floods the skin with glycoproteins that support repair, calm irritation, and leave a plump, lit-from-within finish. A first bottle of K-beauty for a reason.",
    benefits: [
      "Supports skin repair and elasticity",
      "Calms redness and post-blemish irritation",
      "Plump, dewy finish without heaviness",
    ],
    ingredients: [
      { name: "Snail secretion filtrate 96%", role: "Repair, elasticity, hydration" },
      { name: "Sodium hyaluronate", role: "Deep hydration" },
      { name: "Panthenol", role: "Soothes and strengthens" },
    ],
    skinTypes: ["All", "Sensitive", "Dry"],
    concerns: ["dryness", "redness", "dullness", "aging"],
    howToUse:
      "After cleansing and toner, pat 2–3 pumps into skin until absorbed. Use morning and evening.",
    stock: 61,
    isBestseller: true,
    seed: "cosrx-snail-2",
  },
  {
    id: "p3",
    slug: "relief-sun-rice-probiotics",
    brandId: "beautyofjoseon",
    name: "Relief Sun — Rice + Probiotics SPF50+",
    type: "sunscreen",
    category: "skincare",
    price: 17.0,
    rating: 4.9,
    reviewCount: 733,
    volume: "50 ml",
    blurb: "The no-cast organic sunscreen TikTok made famous.",
    description:
      "A featherlight chemical sunscreen that behaves like a hydrating cream: zero white cast, zero stickiness, and a soft dewy finish. Broad-spectrum SPF50+ PA++++ with rice extract and probiotics to support the barrier.",
    benefits: [
      "SPF50+ PA++++ broad-spectrum protection",
      "No white cast on any skin tone",
      "Doubles as a hydrating primer",
    ],
    ingredients: [
      { name: "Rice extract", role: "Hydrates, brightens" },
      { name: "Probiotics complex", role: "Barrier support" },
      { name: "Niacinamide", role: "Evens tone" },
    ],
    skinTypes: ["All", "Sensitive", "Combination"],
    concerns: ["dryness", "sensitivity", "pigmentation"],
    howToUse:
      "As the final morning step, apply generously to face and neck. Reapply every 2–3 hours in direct sun.",
    stock: 88,
    isBestseller: true,
    seed: "joseon-sun-3",
  },
  {
    id: "p4",
    slug: "lip-sleeping-mask-berry",
    brandId: "laneige",
    name: "Lip Sleeping Mask — Berry",
    type: "mask",
    category: "skincare",
    price: 24.0,
    rating: 4.9,
    reviewCount: 921,
    volume: "20 g",
    blurb: "The iconic overnight lip treatment.",
    description:
      "A berry-scented overnight mask with a vitamin C and antioxidant-rich Moisture Wrap™ technology. One jar lasts months: lips wake up soft, smooth, and comfortable — the world's most repurchased K-beauty product.",
    benefits: [
      "Overnight repair for flaky, dry lips",
      "Berry fruit complex with antioxidants",
      "Melts in — never sticky or heavy",
    ],
    ingredients: [
      { name: "Berry fruit complex", role: "Antioxidants, softening" },
      { name: "Murumuru & shea butter", role: "Occlusive moisture" },
      { name: "Vitamin C", role: "Brightens lip tone" },
    ],
    skinTypes: ["All"],
    concerns: ["dryness"],
    howToUse:
      "Before bed, apply a generous layer to lips. Gently tissue off any residue in the morning.",
    stock: 120,
    isBestseller: true,
    seed: "laneige-lip-4",
  },
  {
    id: "p5",
    slug: "water-sleeping-mask",
    brandId: "laneige",
    name: "Water Sleeping Mask",
    type: "mask",
    category: "skincare",
    price: 32.0,
    compareAtPrice: 38.0,
    rating: 4.8,
    reviewCount: 354,
    volume: "70 ml",
    blurb: "Seoul's famous overnight hydration wrap.",
    description:
      "A gel-type overnight mask with SLEEPSCENT™ and hydro-ionized mineral water that locks in the night's full routine. Skin looks visibly plumper and glassier by morning — ideal when heaters or summer AC dehydrate.",
    benefits: [
      "Seals in your entire evening routine",
      "Wake up visibly plumper and glassy",
      "Lightweight gel, washes clean",
    ],
    ingredients: [
      { name: "Hydro-ionized mineral water", role: "Deep hydration" },
      { name: "Sleepscent™ aromatic complex", role: "Relaxation ritual" },
      { name: "Beta-glucan", role: "Soothes and plumps" },
    ],
    skinTypes: ["All", "Dry", "Combination"],
    concerns: ["dryness", "dullness"],
    howToUse: "Two or three nights a week, apply as the last evening step. Rinse in the morning.",
    stock: 35,
    isBestseller: true,
    seed: "laneige-water-5",
  },
  {
    id: "p6",
    slug: "concentrated-ginseng-renewing-cream",
    brandId: "sulwhasoo",
    name: "Concentrated Ginseng Renewing Cream",
    type: "moisturizer",
    category: "skincare",
    price: 145.0,
    rating: 4.7,
    reviewCount: 128,
    volume: "60 ml",
    blurb: "Herbal anti-aging luxury from Seoul.",
    description:
      "Sulwhasoo's flagship: a silken cream with Ginsenomics™ — a patented ginseng saponin complex — that visibly firms and restores radiance. Texture melts between a balm and a cream, cushioning the skin all day.",
    benefits: [
      "Visibly improves firmness in 4 weeks",
      "Patented Ginsenomics™ complex",
      "Rich yet fast-absorbing cushion texture",
    ],
    ingredients: [
      { name: "Ginsenomics™", role: "Firming, radiance" },
      { name: "Ginseng root extract", role: "Antioxidant care" },
      { name: "Honey & olive extracts", role: "Nourishing barrier" },
    ],
    skinTypes: ["Dry", "Mature", "Normal"],
    concerns: ["aging", "dryness", "dullness"],
    howToUse: "Morning and evening, warm a pearl-sized amount between palms and press into skin.",
    stock: 12,
    isBestseller: false,
    seed: "sulwhasoo-cream-6",
  },
  {
    id: "p7",
    slug: "green-tea-fresh-cleanser",
    brandId: "innisfree",
    name: "Green Tea Foam Cleanser",
    type: "cleanser",
    category: "skincare",
    price: 11.0,
    rating: 4.6,
    reviewCount: 297,
    volume: "150 ml",
    blurb: "Jeju green tea in a soft daily foam.",
    description:
      "A cushiony low-pH foam with Jeju green tea extract that removes the day without stripping. Ideal second cleanse in a double-cleanse routine — skin feels soft and never squeaky.",
    benefits: [
      "Removes impurities without stripping",
      "Jeju green tea hydrates while cleansing",
      "Perfect pH for the daily second cleanse",
    ],
    ingredients: [
      { name: "Jeju green tea extract", role: "Antioxidant hydration" },
      { name: "Glycerin", role: "Softening" },
      { name: "Amino-acid cleansers", role: "Gentle cleanse" },
    ],
    skinTypes: ["All", "Oily", "Combination"],
    concerns: ["pores", "dullness"],
    howToUse: "Morning and evening, emulsify a small amount with water and massage over damp skin. Rinse.",
    stock: 74,
    seed: "innisfree-cleanser-7",
  },
  {
    id: "p8",
    slug: "glow-tinge-lip-tint-rose",
    brandId: "romand",
    name: "Glasting Water Tint — Rose",
    type: "lip",
    category: "makeup",
    price: 12.5,
    rating: 4.7,
    reviewCount: 268,
    volume: "4.5 g",
    blurb: "Glazed, glass-finish lip color.",
    description:
      "rom&nd's water-gloss tint delivers that signature Seoul glazed-lip look: high shine, low stick, and a rose-juice stain that survives coffee. Sheer but buildable — one layer for a kiss of color, three for gloss-editorial.",
    benefits: [
      "Glass-gloss finish without stickiness",
      "Water-light stain survives meals",
      "Rose-berry shade tuned for warm undertones",
    ],
    ingredients: [
      { name: "Water-based film former", role: "Glassy shine" },
      { name: "Jojoba oil", role: "Comfort" },
      { name: "Berry pigment complex", role: "Juicy color" },
    ],
    skinTypes: ["All"],
    concerns: ["dryness"],
    shades: [
      { name: "01 Rose", hex: "#d4707f", tone: "rose" },
      { name: "04 Peach", hex: "#e8927c", tone: "peach" },
      { name: "07 Berry", hex: "#b25566", tone: "berry" },
    ],
    howToUse:
      "Apply a thin layer over bare lips. Reapply after meals for a fresh glass finish.",
    stock: 96,
    isNew: true,
    seed: "romand-tint-8",
  },
  {
    id: "p9",
    slug: "melting-blush-cushion",
    brandId: "romand",
    name: "Better Than Cheek — Melting Blush",
    type: "blush",
    category: "makeup",
    price: 13.0,
    rating: 4.8,
    reviewCount: 187,
    volume: "4 g",
    blurb: "Pillow-soft flush that melts into skin.",
    description:
      "A bouncy pressed blush with a marshmallow texture that diffuses pigment like airbrush — no patches, no chalk. Seoul's answer to natural flush, made for daily wear.",
    benefits: [
      "Blurs like a filter, blends with fingers",
      "One swipe gives an all-day flush",
      "Shade family designed for warm tones",
    ],
    ingredients: [
      { name: "Silica powder", role: "Soft-focus blur" },
      { name: "Shea butter", role: "Creamy blendability" },
      { name: "Mineral pigments", role: "Natural flush" },
    ],
    skinTypes: ["All"],
    concerns: ["dullness"],
    shades: [
      { name: "W01 Ginger", hex: "#e0a179", tone: "warm peach" },
      { name: "P01 Berry", hex: "#d67f95", tone: "cool rose" },
      { name: "C02 Sand", hex: "#e3b6a0", tone: "neutral nude" },
    ],
    howToUse:
      "Smile and tap a small amount onto the apples of the cheeks with fingertips, blending upward.",
    stock: 58,
    isNew: true,
    seed: "romand-blush-9",
  },
  {
    id: "p10",
    slug: "propolis-ampoule",
    brandId: "cosrx",
    name: "Full Fit Propolis Light Ampoule",
    type: "ampoule",
    category: "skincare",
    price: 24.0,
    rating: 4.8,
    reviewCount: 341,
    volume: "40 ml",
    blurb: "Golden honey glow in one pump.",
    description:
      "A silky ampoule with black propolis and honey extract that calms reactive skin and adds a honeyed glow. One of the most reliable picks for redness-prone and post-treatment skin.",
    benefits: [
      "Calms redness and reactive skin",
      "Honeyed, healthy glow from day one",
      "Non-sticky silky glide",
    ],
    ingredients: [
      { name: "Black propolis extract 66%", role: "Soothes, antibacterial" },
      { name: "Honey extract", role: "Hydrating glow" },
      { name: "Royal jelly", role: "Nourishment" },
    ],
    skinTypes: ["Sensitive", "Dry", "All"],
    concerns: ["redness", "sensitivity", "dullness"],
    howToUse: "Morning and evening, apply 2 pumps after serum. Pat gently until absorbed.",
    stock: 47,
    seed: "cosrx-propolis-10",
  },
  {
    id: "p11",
    slug: "no-sebum-mineral-powder",
    brandId: "innisfree",
    name: "No-Sebum Mineral Powder",
    type: "cushion",
    category: "makeup",
    price: 9.5,
    rating: 4.7,
    reviewCount: 502,
    volume: "5 g",
    blurb: "The matte-lock finishing legend.",
    description:
      "A featherweight mineral powder with Jeju minerals and mint that mattifies shine without looking flat or ashy. Pocket-sized with a soft puff — the finishing step every T-zone needs.",
    benefits: [
      "Blots oil for hours without caking",
      "Invisible on all skin tones",
      "Travel puff included",
    ],
    ingredients: [
      { name: "Jeju mineral powder", role: "Oil control" },
      { name: "Mint extract", role: "Fresh feel" },
      { name: "Silica", role: "Soft blur" },
    ],
    skinTypes: ["Oily", "Combination", "All"],
    concerns: ["pores"],
    howToUse: "Press lightly over moisturizer, base, or bare skin to set and mattify.",
    stock: 150,
    seed: "innisfree-powder-11",
  },
  {
    id: "p12",
    slug: "first-care-activating-serum",
    brandId: "sulwhasoo",
    name: "First Care Activating Serum VI",
    type: "serum",
    category: "skincare",
    price: 89.0,
    rating: 4.8,
    reviewCount: 163,
    volume: "120 ml",
    blurb: "The pre-serum that makes everything work harder.",
    description:
      "Sulwhasoo's cult first step: a watery herbal booster applied right after cleansing that preps the skin to absorb every layer after it. Jaum-balancing complex with five treasured herbs — a quiet luxury upgrade to any routine.",
    benefits: [
      "Boosts absorption of the whole routine",
      "Five-herb Jaum balancing complex",
      "Hydrating, fast, never sticky",
    ],
    ingredients: [
      { name: "Jaum balancing complex™", role: "Skin equilibrium" },
      { name: "Solomon's seal extract", role: "Firming" },
      { name: "Honeysuckle extract", role: "Soothing" },
    ],
    skinTypes: ["All", "Dry", "Mature"],
    concerns: ["dullness", "dryness", "aging"],
    howToUse: "First step after cleansing, morning and evening: pour into palms and press into skin.",
    stock: 19,
    isNew: true,
    seed: "sulwhasoo-firstcare-12",
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const brandById = (id: string) => BRANDS.find((b) => b.id === id);

export const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Shipping estimate for Uzbekistan (placeholder rates) */
export const FREE_SHIPPING_THRESHOLD = 60;
export const SHIPPING_FLAT = 5;
