"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics/taxonomy";

interface CheckoutButtonProps {
  offerSlug: string;
  children: React.ReactNode;
  className?: string;
  variant?: "ink" | "outline";
  /** Optional label for analytics */
  label?: string;
}

/**
 * Checkout button.
 *
 * Navigates directly to /checkout/[offerSlug]. The checkout page (a
 * server component pre-rendered at build time) renders the appropriate
 * CTA for the active payments mode:
 *  - demo mode  → demo checkout flow (no payment)
 *  - hosted mode → external Whop link (baked in at build time from env)
 *
 * This avoids any runtime API dependency, making the component fully
 * compatible with static export (GitHub Pages).
 */
export function CheckoutButton({
  offerSlug,
  children,
  className,
  variant = "ink",
  label,
}: CheckoutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    track({ type: "checkout_start", offer: offerSlug, mode: "demo" });
    // Brief delay for visual feedback.
    setTimeout(() => {
      router.push(`/checkout/${offerSlug}/`);
    }, 150);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-busy={pending}
      data-label={label}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono-label transition-all",
        variant === "ink" ? "btn-ink" : "btn-outline",
        pending && "opacity-60 cursor-wait",
        className
      )}
    >
      {pending ? (
        <span
          className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}
