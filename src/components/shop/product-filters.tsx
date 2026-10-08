"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EditorialImage } from "@/components/editorial/editorial-image";
import { formatPrice } from "@/lib/commerce/offers";
import { visuals, productVisualMap } from "@/content/visuals";
import type { Product } from "@/content/types";

interface ProductFiltersProps {
  products: Product[];
  categories: readonly string[];
}

/**
 * Shop product filters + grid.
 *
 * Category buttons filter the grid client-side. The grid renders inside this
 * component so a single piece of state drives both the filter UI and the
 * visible products.
 */
export function ProductFilters({ products, categories }: ProductFiltersProps) {
  const [active, setActive] = React.useState<string>("All");

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-[var(--rule)] pb-6 mb-10">
        <div
          role="group"
          aria-label="Filter products by category"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => {
            const pressed = active === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-2 border font-mono-label transition-colors",
                  pressed
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--rule)] text-[var(--ink)] hover:border-[var(--ink)]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4">
          <span
            className="eyebrow text-[var(--warm-gray)]"
            aria-live="polite"
          >
            Showing {filtered.length} of {products.length}
          </span>
          {active !== "All" && (
            <button
              type="button"
              onClick={() => setActive("All")}
              className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 md:py-24 border border-dashed border-[var(--rule)]">
          <p className="font-display text-2xl md:text-3xl text-[var(--ink-soft)] mb-2 tracking-[-0.01em]">
            No products in this category.
          </p>
          <p className="text-sm text-[var(--warm-gray)] mb-6 max-w-sm mx-auto leading-relaxed">
            Try a different filter, or reset to see the full catalogue.
          </p>
          <button
            type="button"
            onClick={() => setActive("All")}
            className="btn-outline px-5 py-2.5 font-mono-label"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 list-none p-0">
          {filtered.map((p) => (
            <li key={p.slug} className="group">
              <Link
                href={`/shop/${p.slug}`}
                className="block"
                aria-label={`View ${p.title}`}
              >
                <div className="aspect-square w-full overflow-hidden border border-[var(--rule)] bg-[var(--paper-deep)] transition-colors group-hover:border-[var(--ink)]">
                  {(() => {
                    const visualId = productVisualMap[p.slug];
                    const visual = visualId
                      ? visuals[visualId]
                      : undefined;
                    if (!visual) {
                      return (
                        <div className="flex h-full w-full items-center justify-center bg-[var(--ivory)]">
                          <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--warm-gray)]">
                            {p.category}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <EditorialImage
                        src={visual.path}
                        webp={visual.webp}
                        alt={visual.alt}
                        className="h-full w-full [&_img]:h-full [&_img]:object-cover"
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                      />
                    );
                  })()}
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-2xl tracking-[-0.01em] leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[var(--ink-soft)] leading-relaxed text-pretty">
                    {p.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--rule)] pt-3">
                    <span className="font-mono text-sm text-[var(--clay)]">
                      {formatPrice(p.price, p.currency)}
                    </span>
                    <span className="font-mono-label text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors link-underline">
                      View details
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
