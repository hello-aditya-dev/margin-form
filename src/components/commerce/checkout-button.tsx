"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
 * - In demo mode: navigates to /checkout/[offerSlug]
 * - In hosted mode: navigates to external Whop URL (resolved server-side via API)
 *
 * To avoid exposing env to client, we resolve destination via /api/checkout/resolve.
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

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch(
        `/api/checkout/resolve?slug=${encodeURIComponent(offerSlug)}`,
        { method: "GET" }
      );
      const data = (await res.json()) as {
        href: string;
        external: boolean;
        mode: "demo" | "hosted";
      };
      if (data.external) {
        window.location.href = data.href;
      } else {
        router.push(data.href);
      }
    } catch {
      router.push(`/checkout/${offerSlug}`);
    } finally {
      // small delay to show feedback
      setTimeout(() => setPending(false), 200);
    }
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
