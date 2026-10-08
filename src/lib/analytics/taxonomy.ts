/**
 * Margin / Form — analytics event taxonomy.
 * Central interface; pluggable adapters. No raw PII in events.
 * Default adapter is no-op in demo. Console adapter only in dev.
 */

export type AnalyticsEvent =
  | { type: "page_view"; path: string }
  | { type: "primary_cta_click"; cta: string; destination: string }
  | { type: "course_view"; slug: string }
  | { type: "course_curriculum_expand"; slug: string; module: string }
  | { type: "product_view"; slug: string }
  | { type: "product_preview_download"; slug: string }
  | { type: "membership_plan_select"; plan: string }
  | { type: "checkout_start"; offer: string; mode: "demo" | "hosted" }
  | { type: "checkout_external_handoff"; offer: string }
  | { type: "demo_checkout_complete"; offer: string }
  | { type: "newsletter_form_start" }
  | { type: "newsletter_demo_submit" }
  | { type: "newsletter_live_submit" }
  | { type: "lead_magnet_download"; slug: string }
  | { type: "contact_form_start" }
  | { type: "contact_demo_preview" }
  | { type: "contact_live_submit" }
  | { type: "site_search"; query: string; result_count: number }
  | { type: "search_result_click"; href: string };

type Adapter = (event: AnalyticsEvent) => void;

const noop: Adapter = () => {};

const consoleAdapter: Adapter = (event) => {
  if (typeof console !== "undefined") {
    console.debug("[analytics]", event.type, event);
  }
};

function selectAdapter(): Adapter {
  if (typeof window === "undefined") return noop;
  // Only use console adapter in non-production preview for transparency.
  return consoleAdapter;
}

let currentAdapter: Adapter | null = null;

function adapter(): Adapter {
  if (!currentAdapter) currentAdapter = selectAdapter();
  return currentAdapter;
}

export function track(event: AnalyticsEvent): void {
  try {
    adapter()(event);
  } catch {
    // analytics must never break the UX
  }
}
