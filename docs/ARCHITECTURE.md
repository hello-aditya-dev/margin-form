# Architecture — Margin / Form

This document describes the application structure, the server/client boundary,
the content model, the commerce adapter, analytics, security, and state
management. It is the reference for any engineer extending the demonstration
into a live site.

---

## 1. Application structure

The application is a **Next.js 16 App Router** project. The root layout
(`src/app/layout.tsx`) loads the three Google fonts via `next/font`, mounts the
`ThemeProvider` (next-themes), the `SiteHeader`, the `SiteFooter`, the `Toaster`,
and a "Skip to content" skip-link. The main content slot is wrapped in
`<main id="main">`.

Styling is **Tailwind CSS v4** with a CSS-based configuration. The editorial
design system — palette tokens, typography utilities, container, eyebrow,
num-marker, paper-grain, btn-ink, btn-outline, link-underline, editorial-card,
prose-editorial — is defined in `src/app/globals.css` using the `@theme inline`
block and `:root` custom properties. There is no `tailwind.config.ts` content
override; the v4 CSS configuration is the source of truth.

shadcn/ui (New York style) primitives live in `src/components/ui/`. They are
composed into editorial components under `src/components/editorial/`,
`src/components/course/`, `src/components/membership/`, `src/components/shop/`,
`src/components/forms/`, `src/components/search/`, `src/components/commerce/`,
and `src/components/brand/`.

---

## 2. Server/client boundary

**Server components by default.** Every page under `src/app/` is a server
component unless it explicitly opts into client behaviour with `"use client"`.

Server components are used for:
- Reading content from `src/content/` (typed TypeScript modules).
- Reading environment variables via the commerce adapter
  (`src/lib/commerce/offers.ts`).
- Generating metadata (`generateMetadata`) and static params
  (`generateStaticParams`).
- Rendering the editorial layout, cards, hero sections, footers.

Client components are used **only** where interactivity is required:
- `src/components/commerce/checkout-button.tsx` — fetches the checkout
  destination from `/api/checkout/resolve` and navigates.
- `src/components/commerce/demo-complete-button.tsx` — handles the demo
  checkout completion flow.
- `src/components/forms/newsletter-form.tsx` and `contact-form.tsx` — form
  state, Zod validation, success/error UI.
- `src/components/membership/plan-selector.tsx` — monthly/annual toggle.
- `src/components/shop/product-filters.tsx` — category filtering.
- `src/components/course/curriculum-accordion.tsx` — module expand/collapse.
- `src/components/course/preview-download.tsx` — preview-lesson reveal and
  download tracking.
- `src/components/course/sticky-checkout.tsx` — sticky mobile CTA.
- `src/components/editorial/reading-progress.tsx` — scroll progress bar.
- `src/components/editorial/faq-accordion.tsx` — FAQ expand/collapse.
- `src/components/search/search-client.tsx` — query input, filtering, keyboard
  navigation.
- `src/components/layout/site-header.tsx` — mobile navigation drawer.

The boundary is intentionally conservative. The less client JavaScript, the
closer the site stays to its editorial intent and the smaller the bundle.

---

## 3. Routing

### Static routes

```
/                              Homepage
/about                         Founder narrative + principles
/courses                       Course catalogue
/membership                    The Practice Room membership page
/shop                          Product catalogue with filters
/journal                       Journal index (6 articles)
/newsletter                    Newsletter landing + form
/resources                     Free resources hub
/search                        Site search
/contact                       Contact form
/faq                           Categorised FAQ accordion
/support                       Support page
/privacy                       Privacy policy
/terms                         Terms of service
/refund-policy                 Refund policy
/accessibility                 Accessibility statement
/demo-information              Demonstration disclosure
/checkout/demo-complete        Demo checkout completion screen
```

### Dynamic routes (with `generateStaticParams`)

| Route                          | Content source                          |
|--------------------------------|-----------------------------------------|
| `/courses/[slug]`              | `src/content/courses.ts` (2 entries)    |
| `/shop/[slug]`                 | `src/content/products.ts` (3 entries)   |
| `/resources/[slug]`            | `src/content/resources.ts` (3 entries)  |
| `/journal/[slug]`              | `src/content/journal/articles.ts` (6)   |
| `/checkout/[offerSlug]`        | Built from courses + products + membership plans; `dynamicParams = false` |

The checkout route is dynamic over an explicit, closed set of offer slugs
(7 total). `dynamicParams = false` means unknown checkout slugs 404 rather
than attempting to render — there is no risk of an attacker probing for
arbitrary offers.

### API routes

| Route                          | Method | Purpose                                            |
|--------------------------------|--------|----------------------------------------------------|
| `/api/checkout/resolve`        | GET    | Returns the checkout destination for an offer slug. Server-only; never exposes env or Whop URLs to the client bundle. |
| `/api`                         | GET    | Health check.                                      |

### Special files

- `src/app/layout.tsx` — root layout (fonts, theme, header, footer).
- `src/app/page.tsx` — homepage.
- `src/app/loading.tsx` — route-level loading state.
- `src/app/error.tsx` — error boundary.
- `src/app/not-found.tsx` — 404.
- `src/app/sitemap.ts` — sitemap (uses `https://marginform.example` as the
  base; update before deploying).
- `src/app/robots.ts` — `robots.txt` (disallows all indexing by default for
  the demonstration).

---

## 4. Content model

All editorial content is structured TypeScript in `src/content/`. The
interfaces live in `src/content/types.ts` — a single source of truth that
describes courses, products, membership, free resources, journal articles,
FAQs, the founder, and checkout offers.

There is **no CMS** and **no database for content**. Prisma is installed
(`src/lib/db.ts`) but is not used to source any editorial content in this
demonstration. The trade-off:

- **Pros of the current approach:** type-safe content, instant edits, no
  infrastructure, no migration risk, content lives next to the code that
  renders it, no admin UI to maintain or secure.
- **Cons:** non-technical editors cannot update content; every change is a
  code change; content updates require a redeploy.

### Future CMS migration path

The content files are shaped as plain typed exports. A future migration to a
CMS (Sanity, Contentful, Payload, or a headless instance of Ghost for the
journal) would replace the imports in `src/content/*` with async fetchers
returning the same shapes. Because every consumer already expects typed
objects (not raw CMS payloads), the migration is localised to the content
modules. The `Markdown` component (`src/components/editorial/markdown.tsx`)
already handles the body format and would continue to render CMS-sourced
markdown-lite without changes.

See `docs/CONTENT_MODEL.md` for the file-by-file editing guide.

---

## 5. Commerce adapter

`src/lib/commerce/offers.ts` is the entire commerce layer. It exports:

- `getPaymentsMode()` — reads `PAYMENTS_MODE` from the server environment,
  returns `"demo"` or `"hosted"`. Defaults to `"demo"`.
- `getOffers()` — builds the offer catalogue from `courses`, `products`, and
  `membership.plans`. Each offer is a `CheckoutOffer` (see
  `src/content/types.ts`) and carries its `whopCheckoutUrl` only when in
  hosted mode and only when a validated URL is present in env.
- `getOfferBySlug(slug)` — single-offer lookup.
- `resolveCheckoutDestination(slug)` — returns where a purchase button should
  send the user. In demo mode this is `/checkout/[slug]`. In hosted mode this
  is the external Whop URL if configured, otherwise a configuration-error
  route.
- `formatPrice(price, currency)` and `billingLabel(interval)` — display
  helpers.

### URL safety

`safeWhopUrl(raw)` validates every hosted-checkout URL against a hardcoded
allowlist of Whop hosts (`whop.com`, `www.whop.com`, `checkout.whop.com`,
`pay.whop.com` and any subdomain of those). It rejects non-`https` URLs and
anything that fails `new URL()` parsing. This means an attacker who somehow
set a `WHOP_CHECKOUT_*` env var to an arbitrary URL would still not produce an
open redirect — the URL would be silently dropped and the user would see a
configuration notice instead.

### Why a resolver endpoint?

`CheckoutButton` (`src/components/commerce/checkout-button.tsx`) is a client
component. It cannot read `process.env` directly. Rather than passing the
Whop URL down through server-component props (which would embed it in the
client bundle and expose it in the page source), the button fetches
`/api/checkout/resolve?slug=...` and receives only a destination (`href`),
an `external` flag, and a `mode`. The Whop URL is never sent to the browser
in demo mode, and in hosted mode it is only returned after validation.

---

## 6. Analytics

`src/lib/analytics/taxonomy.ts` defines a discriminated union of analytics
events and a pluggable adapter interface. The current adapters:

- **No-op** (default in production preview): events are swallowed.
- **Console** (default in browser dev): events are logged with `console.debug`.

Events include `page_view`, `primary_cta_click`, `course_view`,
`course_curriculum_expand`, `product_view`, `product_preview_download`,
`membership_plan_select`, `checkout_start`, `checkout_external_handoff`,
`demo_checkout_complete`, `newsletter_form_start`,
`newsletter_demo_submit`, `newsletter_live_submit`, `lead_magnet_download`,
`contact_form_start`, `contact_demo_preview`, `contact_live_submit`,
`site_search`, and `search_result_click`.

**No PII is included in any event.** Search queries are included in
`site_search` events for relevance debugging; if you wire a real analytics
provider, consider whether to keep that. The `track()` function is wrapped in
a try/catch — analytics must never break the UX.

To add a real adapter (Plausible, PostHog, Vercel Analytics, etc.), replace
`selectAdapter()` to return your adapter. The event union is the contract.

---

## 7. Security boundaries

- **No client secrets.** Every secret stays server-side. The Whop URLs are
  read by `offers.ts` (server) and only returned to the client via the
  resolver endpoint, and only after validation.
- **Server-only env.** `next.config` does not expose `WHOP_CHECKOUT_*` to the
  client. The adapter reads them via `process.env` from inside server
  components and route handlers.
- **Whop host allowlist.** `safeWhopUrl()` rejects any URL not on the Whop
  host allowlist. This prevents open redirects and exfiltration via a
  misconfigured env var.
- **No open redirects.** The resolver never accepts a destination URL from
  the request — it only accepts a `slug`, looks it up in the offer catalogue,
  and returns either an internal path or a pre-validated Whop URL.
- **Closed checkout params.** `/checkout/[offerSlug]` sets
  `dynamicParams = false`. Unknown slugs 404.
- **Form validation.** Newsletter and contact forms use Zod schemas. Email
  format is enforced; the newsletter form requires explicit consent.
- **No raw HTML in markdown.** The `Markdown` renderer is intentionally
  minimal and does not accept raw HTML. Inline formatting is limited to bold,
  italic, code, and links. This removes a class of XSS risk from editorial
  content.
- **External links.** The `Markdown` renderer adds `rel="noopener noreferrer"`
  and `target="_blank"` to external links automatically.

---

## 8. State management

There is **no global state store**. Zustand is installed but not used in the
demonstration. State lives in two places:

1. **Local component state.** Forms, accordions, the plan selector, the
   product filters, the search box, the mobile nav drawer, the reading
   progress bar — all use `React.useState` / `React.useRef`.
2. **URL parameters.** Where a state change should be shareable or
   bookmarkable, it is reflected in the URL. The product filters and the
   search query are the primary examples.

This is deliberate. The site is mostly static editorial content with a small
amount of interactivity; a global store would add complexity without value.
If a future feature (a student dashboard, a saved-cart flow, an auth context)
requires shared state, Zustand is the intended tool.

---

## 9. Build and deployment

The dev server (`bun run dev`) is the only supported run target in this
workspace. `bun run build` is intentionally not used per the environment
rules — see `docs/ENVIRONMENT.md`.

For a real deployment (Vercel or any Next.js-compatible host):

1. Set `PAYMENTS_MODE=hosted` and the seven `WHOP_CHECKOUT_*` env vars.
2. Update `metadataBase` in `src/app/layout.tsx` and `base` in
   `src/app/sitemap.ts` to the real domain.
3. Update `src/app/robots.ts` to allow indexing (or keep it disallowed for a
   staging deploy).
4. Run `bun run build` and deploy the output.

No deployment tooling is configured in this workspace and no deployment URL
has been verified.
