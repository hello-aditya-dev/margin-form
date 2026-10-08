/**
 * Margin / Form — Commerce adapter.
 *
 * Two modes:
 *  - "demo":  No real payment. Working simulated checkout. No false claims.
 *  - "hosted": Validated Whop-hosted checkout URL mappings.
 *
 * Activation:
 *  - Set PAYMENTS_MODE=hosted and the corresponding WHOP_CHECKOUT_* env vars.
 *  - In demo mode, env vars are ignored entirely.
 *
 * Security:
 *  - Hosted checkout URLs are validated against an allowlist of Whop hosts.
 *  - No client-side secrets. Env read server-side only.
 *  - No query-param-controlled open redirects.
 */

import type { CheckoutOffer } from "@/content/types";
import { courses } from "@/content/courses";
import { products } from "@/content/products";
import { membership } from "@/content/membership";

export type PaymentsMode = "demo" | "hosted";

const WHOP_ALLOWED_HOSTS = [
  "whop.com",
  "www.whop.com",
  "checkout.whop.com",
  "pay.whop.com",
];

function readEnv(key: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  return process.env?.[key];
}

export function getPaymentsMode(): PaymentsMode {
  const mode = readEnv("PAYMENTS_MODE");
  return mode === "hosted" ? "hosted" : "demo";
}

function safeWhopUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    const host = u.hostname.toLowerCase();
    const allowed = WHOP_ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
    if (!allowed) return undefined;
    if (u.protocol !== "https:") return undefined;
    return raw;
  } catch {
    return undefined;
  }
}

/**
 * Resolve env-mapped Whop checkout URL for a given offer env key.
 */
function envCheckoutUrl(envKey: string): string | undefined {
  return safeWhopUrl(readEnv(envKey));
}

/**
 * Build the centralized offer catalogue from content + env config.
 * Server-side only (reads env).
 */
export function getOffers(): CheckoutOffer[] {
  const mode = getPaymentsMode();

  const offers: CheckoutOffer[] = [];

  // Courses
  for (const c of courses) {
    const envKey = c.isFlagship
      ? "WHOP_CHECKOUT_INDEPENDENT_PRACTICE"
      : "WHOP_CHECKOUT_CLIENT_PIPELINE";
    offers.push({
      id: `course-${c.slug}`,
      slug: c.slug,
      type: "course",
      title: c.title,
      description: c.tagline,
      price: c.price,
      currency: c.currency,
      billingInterval: "one_time",
      features: c.whatIsIncluded.slice(0, 4),
      deliverables: c.whatIsIncluded,
      whopCheckoutUrl: mode === "hosted" ? envCheckoutUrl(envKey) : undefined,
      visibility: "public",
      availability: "available",
    });
  }

  // Products
  const productEnvMap: Record<string, string> = {
    "the-proposal-system": "WHOP_CHECKOUT_PROPOSAL_SYSTEM",
    "the-pricing-workbook": "WHOP_CHECKOUT_PRICING_WORKBOOK",
    "the-client-brief-kit": "WHOP_CHECKOUT_CLIENT_BRIEF_KIT",
  };
  for (const p of products) {
    offers.push({
      id: `product-${p.slug}`,
      slug: p.slug,
      type: "product",
      title: p.title,
      description: p.tagline,
      price: p.price,
      currency: p.currency,
      billingInterval: "one_time",
      features: p.contents.slice(0, 4),
      deliverables: p.contents,
      whopCheckoutUrl: mode === "hosted" ? envCheckoutUrl(productEnvMap[p.slug]) : undefined,
      visibility: "public",
      availability: "available",
    });
  }

  // Membership plans
  for (const plan of membership.plans) {
    const envKey =
      plan.interval === "year"
        ? "WHOP_CHECKOUT_PRACTICE_ROOM_ANNUAL"
        : "WHOP_CHECKOUT_PRACTICE_ROOM_MONTHLY";
    offers.push({
      id: `membership-${plan.slug}`,
      slug: plan.slug,
      type: "membership",
      title: `${membership.name} — ${plan.name}`,
      description: membership.tagline,
      price: plan.price,
      currency: plan.currency,
      billingInterval: plan.interval,
      features: membership.benefits.map((b) => b.title),
      deliverables: membership.benefits.map((b) => b.title),
      whopCheckoutUrl: mode === "hosted" ? envCheckoutUrl(envKey) : undefined,
      visibility: "public",
      availability: "available",
    });
  }

  return offers;
}

export function getOfferBySlug(slug: string): CheckoutOffer | undefined {
  return getOffers().find((o) => o.slug === slug);
}

export interface CheckoutDestination {
  mode: PaymentsMode;
  /** internal demo checkout route, or external whop url */
  href: string;
  external: boolean;
  /** reason if checkout cannot proceed in hosted mode */
  configurationError?: string;
}

/**
 * Resolve where a purchase button should send the user.
 *  - demo mode: always internal /checkout/[slug]
 *  - hosted mode: external Whop URL if configured, else config error route
 */
export function resolveCheckoutDestination(slug: string): CheckoutDestination {
  const offer = getOfferBySlug(slug);
  if (!offer) {
    return {
      mode: getPaymentsMode(),
      href: "/checkout/invalid",
      external: false,
      configurationError: "Unknown offer",
    };
  }

  const mode = getPaymentsMode();
  if (mode === "demo") {
    return {
      mode: "demo",
      href: `/checkout/${offer.slug}`,
      external: false,
    };
  }

  // hosted
  if (offer.whopCheckoutUrl) {
    return {
      mode: "hosted",
      href: offer.whopCheckoutUrl,
      external: true,
    };
  }
  return {
    mode: "hosted",
    href: `/checkout/${offer.slug}?error=config`,
    external: false,
    configurationError:
      "Hosted checkout is enabled but no Whop URL is configured for this offer.",
  };
}

/**
 * Format a price for display.
 */
export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function billingLabel(interval: CheckoutOffer["billingInterval"]): string {
  switch (interval) {
    case "one_time":
      return "one-time";
    case "month":
      return "per month";
    case "year":
      return "per year";
  }
}
