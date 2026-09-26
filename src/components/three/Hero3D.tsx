import { useEffect, useRef, useState } from "react";
import { ProductThumb } from "@/components/ProductThumb";
import { PRODUCTS } from "@/data/products";

function useWebGLAvailable(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // Defer capability detection one frame so the first paint isn't blocked
    // and state updates don't cascade during the effect flush.
    const raf = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl");
        setOk(!!gl);
      } catch {
        setOk(false);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  return ok;
}

function useInView(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, active]);
  return inView;
}

/**
 * Pointer-parallax wrapper so the DOM container (and any overlay content)
 * can subtly react without touching the Canvas itself.
 */
function useParallax(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };
    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);
  return ref;
}

export function Hero3D({ image }: { image?: string }) {
  const webgl = useWebGLAvailable();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, true);
  const parallaxRef = useParallax(8);
  const [Scene, setScene] = useState<React.ComponentType | null>(null);
  const isSmall =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Lazy load the 3D scene only when it makes sense to render it
  useEffect(() => {
    if (!webgl || isSmall) return;
    let cancelled = false;
    import("./HeroScene")
      .then((mod) => {
        if (!cancelled) setScene(() => mod.default);
      })
      .catch(() => setScene(null));
    return () => {
      cancelled = true;
    };
  }, [webgl, isSmall]);

  const render3D = webgl && !isSmall && Scene && inView;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      data-testid="hero-3d"
    >
      {render3D ? (
        <div className="relative h-full w-full">
          <div ref={parallaxRef} className="h-full w-full transition-transform duration-300 ease-out will-change-transform" aria-hidden="true">
            <Scene />
          </div>
          <div className="clay-card-sm absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-card/90 p-2 pr-4 shadow-lg sm:bottom-8 sm:left-8">
            <ProductThumb seed="cosrx-snail-96" image={image ?? PRODUCTS[0].image} label={PRODUCTS[0].name} className="size-16 shrink-0 rounded-xl" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">The real product</p>
              <p className="max-w-36 text-xs font-bold leading-snug text-charcoal">COSRX Snail 96 Essence</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-full max-h-[520px] w-full max-w-[560px]">            <ProductThumb
              seed="joseon-sun-3"
              image={PRODUCTS[2].image}
              label="1025 Dokdo Toner"
              className="absolute left-[6%] top-[8%] h-40 w-40 animate-float"
            />
            <ProductThumb
              seed="cosrx-snail-2"
              image={image ?? PRODUCTS[0].image}
              label="Advanced Snail 96 Essence"
              className="absolute right-[4%] top-[22%] h-32 w-32 animate-float-slow"
            />
            <ProductThumb
              seed="laneige-lip-4"
              image={PRODUCTS[4].image}
              label="Lip Sleeping Mask Berry"
              className="absolute bottom-[10%] left-[24%] h-28 w-28 animate-float"
            />
            <ProductThumb
              seed="sulwhasoo-cream-6"
              image={PRODUCTS[3].image}
              label="DIVE-IN Serum"
              className="absolute bottom-[24%] right-[18%] h-24 w-24 animate-float-slow"
            />
          </div>
        </div>
      )}
    </div>
  );
}
