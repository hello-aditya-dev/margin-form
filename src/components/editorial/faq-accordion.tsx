"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/types";

interface FaqAccordionProps {
  items: FaqItem[];
  /** Stable id prefix so multiple accordions on one page do not collide. */
  idPrefix: string;
  className?: string;
}

/**
 * FAQ accordion — accessible disclosure pattern.
 * Multiple items can be open at the same time. Tracks no analytics.
 * Expanded panels use the ivory background to differentiate from the page.
 */
export function FaqAccordion({
  items,
  idPrefix,
  className,
}: FaqAccordionProps) {
  const [openSet, setOpenSet] = React.useState<Set<number>>(() => new Set());

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className={cn("border-t border-[var(--rule)]", className)}>
      {items.map((item, i) => {
        const isOpen = openSet.has(i);
        const buttonId = `${idPrefix}-button-${i}`;
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          <section
            key={`${idPrefix}-${i}`}
            className={cn(
              "border-b border-[var(--rule)]",
              isOpen && "bg-[var(--ivory)]"
            )}
            aria-labelledby={buttonId}
          >
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={cn(
                  "w-full flex items-start gap-4 md:gap-6 py-5 md:py-6 text-left",
                  "focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:-outline-offset-2",
                  "group"
                )}
              >
                <span
                  className="num-marker text-[var(--clay)] shrink-0 pt-1 tabular-nums"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-lg md:text-xl tracking-[-0.005em] leading-snug text-[var(--ink)] text-balance">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-[var(--ink)] mt-0.5"
                >
                  {isOpen ? (
                    <Minus size={18} strokeWidth={1.75} />
                  ) : (
                    <Plus size={18} strokeWidth={1.75} />
                  )}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-6 md:pb-7 pl-12 md:pl-16 pr-4 md:pr-8"
              >
                <p className="max-w-3xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                  {item.a}
                </p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
