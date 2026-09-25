const PALETTES: { bg: string; glyph: string }[] = [
  { bg: "#f3d7cd", glyph: "#b96a54" },
  { bg: "#f7e3cf", glyph: "#c98a4b" },
  { bg: "#e9ddca", glyph: "#8a7a5a" },
  { bg: "#ddd6e8", glyph: "#7c6a9c" },
  { bg: "#d9e7dc", glyph: "#5f8a6d" },
  { bg: "#f0d3dc", glyph: "#b25f7a" },
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function ProductThumb({
  seed,
  label,
  className = "",
}: {
  seed: string;
  label?: string;
  className?: string;
}) {
  const h = hashSeed(seed);
  const palette = PALETTES[h % PALETTES.length];
  const shape = h % 3; // 0 bottle, 1 tube/jar, 2 dropper
  const rotate = ((h >> 3) % 7) - 3;

  return (
    <div
      className={`clay-blob relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: palette.bg }}
      role="img"
      aria-label={label ? `${label} product visual` : "Product visual"}
    >
      <div
        className="animate-float-slow"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {shape === 0 && (
          <div className="relative">
            <div
              className="h-10 w-6 rounded-md"
              style={{ background: palette.glyph, opacity: 0.85 }}
            />
            <div
              className="mx-auto -mt-1 h-3 w-3.5 rounded-t-sm"
              style={{ background: palette.glyph }}
            />
          </div>
        )}
        {shape === 1 && (
          <div className="relative">
            <div
              className="h-3 w-7 rounded-t-full"
              style={{ background: palette.glyph, opacity: 0.85 }}
            />
            <div
              className="mx-auto h-8 w-6 rounded-b-xl rounded-t-sm"
              style={{ background: palette.glyph, opacity: 0.95 }}
            />
          </div>
        )}
        {shape === 2 && (
          <div className="relative flex flex-col items-center">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: palette.glyph }}
            />
            <div
              className="h-2.5 w-1"
              style={{ background: palette.glyph }}
            />
            <div
              className="h-9 w-6 rounded-lg"
              style={{ background: palette.glyph, opacity: 0.9 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
