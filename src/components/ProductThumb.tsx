import { useState, useEffect } from "react";

/**
 * ProductThumb renders the licensed photographic image for a product when one is
 * available, and only falls back to the editorial CSS shape (a colored circle
 * with a geometric glyph) when no image is set or when the image fails to load.
 *
 * Image policy:
 *  - Local: /products/<slug>.jpg (or .png/.webp) in the public folder.
 *  - Remote: any HTTPS URL hosted by an official or brand-authorized source.
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
  image?: string; // licensed product photography: /products/<slug>.jpg | remote URL
  className?: string;
  label?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (!image) {
      setLoaded(true);
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.loading = "lazy";
    // Clean background, preserve proportions, never crop or distort.
    img.sizes = "100%";
    img.srcset = "";
    img.onload = () => setLoaded(true);
    img.onerror = () => setErrored(true);
    // Warm the cache so a repeated render uses the already-loaded image.
    img.src = image;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);

  const shouldShowImage = !!image && (loaded || !errored);

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
