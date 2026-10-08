import { cn } from "@/lib/utils";

interface CourseCoverProps {
  label: string; // "Vol. 01"
  title: string;
  tagline?: string;
  accent: "clay" | "olive" | "ink";
  price?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const accentMap = {
  clay: { bg: "var(--clay)", fg: "var(--ivory)", accent: "var(--paper)" },
  olive: { bg: "var(--olive)", fg: "var(--ivory)", accent: "var(--paper)" },
  ink: { bg: "var(--ink)", fg: "var(--paper)", accent: "var(--clay)" },
};

/**
 * Original typographic course-cover composition.
 * A printed-publication aesthetic with volume label, title, and seal.
 */
export function CourseCover({
  label,
  title,
  tagline,
  accent,
  price,
  className,
  size = "md",
}: CourseCoverProps) {
  const c = accentMap[accent];
  const titleSize =
    size === "lg" ? "text-3xl md:text-5xl" : size === "sm" ? "text-xl" : "text-2xl md:text-3xl";

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden border border-[var(--rule)] flex flex-col justify-between p-6 md:p-8 paper-grain",
        className
      )}
      style={{ background: c.bg, color: c.fg }}
      role="img"
      aria-label={`${label}: ${title}${tagline ? ` — ${tagline}` : ""}`}
    >
      {/* Top: label + seal */}
      <div className="flex items-start justify-between">
        <span
          className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase opacity-80"
        >
          {label}
        </span>
        <span className="font-display text-lg leading-none" style={{ color: c.accent }}>
          M/F
        </span>
      </div>

      {/* Middle: title */}
      <div className="flex-1 flex items-center">
        <h3
          className={cn(
            "font-display font-normal tracking-[-0.02em] leading-[0.98]",
            titleSize
          )}
        >
          {title}
        </h3>
      </div>

      {/* Bottom: tagline + price */}
      <div className="flex items-end justify-between gap-4 pt-4 border-t" style={{ borderColor: `${c.fg}33` }}>
        <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase opacity-80 max-w-[60%]">
          {tagline ?? "Margin / Form"}
        </span>
        {price && (
          <span className="font-mono text-sm" style={{ color: c.accent }}>
            {price}
          </span>
        )}
      </div>

      {/* Decorative corner mark */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-12 h-12"
        style={{
          background: `linear-gradient(225deg, ${c.accent}33 0%, transparent 55%)`,
        }}
      />
    </div>
  );
}

interface ProductArtworkProps {
  title: string;
  category: string;
  price: string;
  accent: "clay" | "olive" | "ink";
  className?: string;
}

/**
 * Original product artwork — a document/worksheet aesthetic.
 */
export function ProductArtwork({
  title,
  category,
  price,
  accent,
  className,
}: ProductArtworkProps) {
  const c = accentMap[accent];
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden border border-[var(--rule)] bg-[var(--ivory)] paper-grain",
        className
      )}
      role="img"
      aria-label={`${title} — ${category} — ${price}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--rule)]">
        <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--warm-gray)]">
          {category}
        </span>
        <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase" style={{ color: c.bg === "var(--clay)" || c.bg === "var(--olive)" || c.bg === "var(--ink)" ? "var(--clay)" : "var(--clay)" }}>
          M/F
        </span>
      </div>

      {/* Body — mock worksheet lines */}
      <div className="p-5 flex flex-col gap-3">
        <div className="h-px bg-[var(--rule)]" />
        <div className="h-px bg-[var(--rule)] w-[85%]" />
        <div className="h-px bg-[var(--rule)] w-[70%]" />
        <div className="mt-4">
          <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
            Contents
          </span>
        </div>
        <div className="space-y-2 mt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: c.bg }}
              />
              <div
                className="h-1.5 rounded-full bg-[var(--rule)]"
                style={{ width: `${[90, 75, 82, 65, 70][i]}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Title block at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-5 border-t border-[var(--rule)] bg-[var(--paper)]">
        <h3 className="font-display text-lg md:text-xl tracking-[-0.01em] leading-tight">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
            Margin / Form
          </span>
          <span className="font-mono text-sm" style={{ color: "var(--clay)" }}>
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
