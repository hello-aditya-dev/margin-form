import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/**
 * Editorial section header — numbered chapter style.
 */
export function SectionHeader({
  number,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {(number || eyebrow) && (
        <div className="flex items-center gap-3">
          {number && (
            <span className="num-marker text-[var(--clay)]">{number}</span>
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}
      <Tag
        className={cn(
          "font-display tracking-[-0.02em] font-normal text-balance",
          Tag === "h1" && "text-4xl md:text-6xl lg:text-7xl leading-[0.98]",
          Tag === "h2" && "text-3xl md:text-5xl leading-[1.02]",
          Tag === "h3" && "text-2xl md:text-3xl leading-[1.1]"
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "text-[var(--ink-soft)] text-base md:text-lg leading-relaxed text-pretty",
            align === "center" ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
