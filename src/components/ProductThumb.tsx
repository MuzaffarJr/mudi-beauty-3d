import { useState } from "react";

/**
 * ProductThumb renders the brand-hosted photographic image for a product when one is
 * available, and only falls back to the editorial CSS shape (a colored circle
 * with a geometric glyph) when no image is set or when the image fails to load.
 *
 * Image policy:
 *  - Remote: HTTPS URL hosted by the product's official brand.
 *  - Loading: lazy + object-fit: contain + a clean/transparent background so the
 *    packaging proportions are preserved and nothing is cropped or distorted.
 */

export function ProductThumb({
  seed,
  image,
  className = "",
  label,
}: {
  seed: string; // stable key for the editorial fallback renderer
  image?: string; // official brand-hosted product photography
  className?: string;
  label?: string;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const shouldShowImage = !!image && failedImage !== image;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role={shouldShowImage ? "img" : "presentation"}
      aria-label={label ?? undefined}
      aria-live="polite"
    >
      {shouldShowImage ? (
        <img
          src={image}
          alt={label ?? `Product visual for ${seed}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailedImage(image ?? null)}
          sizes="100%"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            background: "transparent",
            display: "block",
          }}
          aria-hidden={false}
        />
      ) : (
        <div
          className="clay-blob relative flex items-center justify-center overflow-hidden"
          style={{ background: "#f5efe6" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-cream/60" />
        </div>
      )}
    </div>
  );
}
