import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** Use stacked editorial lockup */
  stacked?: boolean;
}

/**
 * MARGIN / FORM wordmark — original typographic lockup.
 * Editorial slash separator with optical spacing.
 */
export function Wordmark({ className, stacked = false }: WordmarkProps) {
  if (stacked) {
    return (
      <span
        className={cn(
          "font-display leading-[0.95] tracking-[-0.02em] inline-flex flex-col",
          className
        )}
        aria-label="Margin / Form"
      >
        <span className="text-[1.05em]">MARGIN</span>
        <span className="text-[0.62em] font-mono tracking-[0.3em] text-[var(--clay)] mt-[0.15em] pl-[0.1em]">
          / FORM
        </span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        "font-display tracking-[-0.01em] inline-flex items-baseline gap-[0.35em]",
        className
      )}
      aria-label="Margin / Form"
    >
      <span>MARGIN</span>
      <span aria-hidden className="text-[var(--clay)] font-mono text-[0.7em]">
        /
      </span>
      <span>FORM</span>
    </span>
  );
}

/**
 * MF monogram — compact mark for favicons, mobile, tight spaces.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center justify-center leading-none",
        className
      )}
      aria-label="Margin / Form monogram"
    >
      <span>M</span>
      <span className="text-[var(--clay)] mx-[0.02em]">/</span>
      <span>F</span>
    </span>
  );
}
