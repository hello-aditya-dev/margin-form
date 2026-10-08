"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckoutButton } from "@/components/commerce/checkout-button";
import { formatPrice } from "@/lib/commerce/offers";
import { track } from "@/lib/analytics/taxonomy";
import type { MembershipPlan } from "@/content/types";

interface PlanSelectorProps {
  plans: MembershipPlan[];
}

/**
 * Plan selector for The Practice Room membership.
 *
 * Two plans are presented side-by-side as a radiogroup. The selected plan's
 * slug is passed straight to the CheckoutButton so the user's selection is
 * what gets sent to checkout — it does not change silently.
 */
export function PlanSelector({ plans }: PlanSelectorProps) {
  // Default to the recommended plan, falling back to the first.
  const recommended = plans.find((p) => p.recommended) ?? plans[0];
  const [selectedSlug, setSelectedSlug] = React.useState<string>(
    recommended.slug
  );

  const selectedIndex = Math.max(
    0,
    plans.findIndex((p) => p.slug === selectedSlug)
  );
  const selectedPlan = plans[selectedIndex] ?? plans[0];

  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  const select = React.useCallback((slug: string) => {
    setSelectedSlug((current) => {
      if (current === slug) return current;
      track({ type: "membership_plan_select", plan: slug });
      return slug;
    });
  }, []);

  const focusAt = (idx: number) => {
    const next = ((idx % plans.length) + plans.length) % plans.length;
    itemRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown": {
        e.preventDefault();
        select(plans[(idx + 1) % plans.length].slug);
        focusAt(idx + 1);
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        e.preventDefault();
        select(plans[(idx - 1 + plans.length) % plans.length].slug);
        focusAt(idx - 1);
        break;
      }
      case "Home": {
        e.preventDefault();
        select(plans[0].slug);
        focusAt(0);
        break;
      }
      case "End": {
        e.preventDefault();
        select(plans[plans.length - 1].slug);
        focusAt(plans.length - 1);
        break;
      }
      default:
        return;
    }
  };

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Choose a Practice Room plan"
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
      >
        {plans.map((plan, idx) => {
          const selected = plan.slug === selectedSlug;
          const suffix = plan.interval === "month" ? "/mo" : "/yr";
          return (
            <div
              key={plan.slug}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(plan.slug)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              className={cn(
                "relative cursor-pointer p-7 md:p-9 border-2 transition-colors duration-200 flex flex-col gap-6 min-h-[300px] outline-none",
                selected
                  ? "border-[var(--ink)] bg-[var(--ivory)]"
                  : "border-[var(--rule)] bg-[var(--ivory)] hover:border-[var(--ink)]"
              )}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-6 bg-[var(--clay)] text-[var(--paper)] font-mono-label px-3 py-1 tracking-[0.18em]">
                  Recommended
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow text-[var(--ink)]">Plan</span>
                  <h3 className="font-display text-2xl tracking-[-0.01em] mt-1 leading-tight">
                    {plan.name}
                  </h3>
                </div>
                <span
                  className={cn(
                    "mt-1 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0",
                    selected
                      ? "border-[var(--ink)]"
                      : "border-[var(--rule)]"
                  )}
                  aria-hidden
                >
                  {selected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--ink)]" />
                  )}
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-5xl md:text-6xl tracking-[-0.025em] leading-none">
                  {formatPrice(plan.price, plan.currency)}
                </span>
                <span className="font-mono text-sm text-[var(--warm-gray)] tracking-[0.1em]">
                  {suffix}
                </span>
              </div>

              <p className="text-sm md:text-[0.9375rem] text-[var(--ink-soft)] leading-relaxed flex-1">
                {plan.billingNote}
              </p>

              <div className="border-t border-[var(--rule)] pt-4">
                <span
                  className={cn(
                    "eyebrow",
                    selected ? "text-[var(--clay)]" : "text-[var(--warm-gray)]"
                  )}
                >
                  {selected ? "Selected" : "Tap to select"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout — the offerSlug reflects the user's selection */}
      <div className="mt-8 md:mt-10 border-t border-[var(--rule)] pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="eyebrow mb-2">Your selection</p>
          <p className="font-display text-2xl md:text-3xl tracking-[-0.01em] leading-tight">
            {selectedPlan.name}
            <span className="text-[var(--warm-gray)] font-mono text-base ml-2">
              · {selectedPlan.displayPrice}
            </span>
          </p>
          <p className="text-sm text-[var(--ink-soft)] mt-1.5 max-w-md leading-relaxed">
            {selectedPlan.billingNote}
          </p>
        </div>
        <CheckoutButton
          offerSlug={selectedSlug}
          label={`membership-checkout-${selectedSlug}`}
          className="px-7 py-4 self-start sm:self-auto"
        >
          Continue to checkout — {selectedPlan.name}
        </CheckoutButton>
      </div>
    </div>
  );
}
