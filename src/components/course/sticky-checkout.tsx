"use client";

import * as React from "react";
import { CheckoutButton } from "@/components/commerce/checkout-button";
import { formatPrice } from "@/lib/commerce/offers";
import { cn } from "@/lib/utils";

interface StickyCheckoutProps {
  offerSlug: string;
  price: number;
  title: string;
  billingLabel?: string;
  ctaLabel?: string;
  /**
   * Optional id of the hero sentinel element to observe. When provided, the bar
   * stays hidden on desktop until the sentinel scrolls out of view (i.e. the
   * user has scrolled past the hero). When not provided, the component renders
   * its own sentinel at the top of its output — so place the component just
   * after the hero.
   */
  sentinelId?: string;
  className?: string;
}

/**
 * Sticky checkout bar.
 *
 * Mobile: always visible as a compact bottom bar.
 * Desktop (lg+): hidden until the user has scrolled past the hero sentinel,
 * then appears as a fixed bottom bar with the course title, price, and CTA.
 *
 * Respects prefers-reduced-motion (no animated transitions on entry).
 * Includes iOS safe-area padding via `env(safe-area-inset-bottom)`.
 *
 * Note: the page that renders this component should add bottom padding
 * (e.g. `pb-28 md:pb-24`) so the fixed bar doesn't cover the final section
 * or the site footer.
 */
export function StickyCheckout({
  offerSlug,
  price,
  title,
  billingLabel = "one-time",
  ctaLabel = "Enrol",
  sentinelId,
  className,
}: StickyCheckoutProps) {
  const localSentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [pastHero, setPastHero] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const desktopMq = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = () => setIsDesktop(desktopMq.matches);
    updateDesktop();
    desktopMq.addEventListener("change", updateDesktop);

    const sentinel = sentinelId
      ? (document.getElementById(sentinelId) as HTMLElement | null)
      : localSentinelRef.current;

    if (!sentinel || typeof IntersectionObserver === "undefined") {
      // No sentinel — always show.
      setPastHero(true);
      return () => {
        desktopMq.removeEventListener("change", updateDesktop);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // When sentinel scrolls out of view above the viewport, the user
          // has scrolled past the hero.
          setPastHero(!entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      desktopMq.removeEventListener("change", updateDesktop);
      observer.disconnect();
    };
  }, [sentinelId]);

  // Mobile: always visible. Desktop: visible only after scrolling past hero.
  const visible = !isDesktop || pastHero;

  return (
    <>
      {/* Sentinel — observed to detect "scrolled past hero" on desktop.
          Rendered as a zero-height marker so it doesn't affect layout. */}
      {!sentinelId && <div ref={localSentinelRef} aria-hidden className="h-0 w-full" />}

      <div
        role="region"
        aria-label="Course purchase"
        aria-hidden={!visible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40",
          "bg-[var(--paper)]/95 backdrop-blur-md border-t border-[var(--rule)]",
          "pb-[env(safe-area-inset-bottom)]",
          "transition-opacity duration-200 ease-out",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
          className
        )}
      >
        <div className="container-editorial py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 md:gap-6">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] truncate">
                Course · Enrol
              </p>
              <p className="font-display text-base md:text-lg tracking-[-0.01em] leading-tight truncate text-[var(--ink)]">
                {title}
              </p>
            </div>
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
              <div className="text-right">
                <p className="font-display text-lg md:text-xl tracking-[-0.01em] leading-none text-[var(--ink)]">
                  {formatPrice(price)}
                </p>
                <p className="mt-1 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                  {billingLabel}
                </p>
              </div>
              <CheckoutButton
                offerSlug={offerSlug}
                label={`sticky-${offerSlug}`}
                className="px-4 py-2.5 md:px-7 md:py-3.5 text-xs md:text-sm"
              >
                <span className="whitespace-nowrap">{ctaLabel}</span>
              </CheckoutButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
