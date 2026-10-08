# Margin / Form

> The business of independent creativity.

A fictional creator-led education business built as a flagship demonstration
for a web-development studio. Margin / Form presents a complete creator-commerce
experience — courses, digital products, paid membership, an editorial journal,
a newsletter, and lead-magnet resources — designed and engineered to the
standard of a ~$1,495 creator website.

**This is a demonstration.** No real payments are processed, no real
subscriptions are granted, no real email is sent. Every commercial flow runs in
a labelled demo mode and is fully disclosed on the
[`/demo-information`](src/app/demo-information/page.tsx) page. See
[Demonstration limitations](#demonstration-limitations) below.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack dev server)
- **React 19** (server components by default; client components only where
  interactivity is required)
- **TypeScript 5** (strict mode)
- **Tailwind CSS v4** (CSS-based configuration via `src/app/globals.css`)
- **shadcn/ui** (New York style) primitives, built on Radix UI
- **Lucide** icons
- **Framer Motion** (used selectively, not globally)
- **Zod** for runtime validation
- **React Hook Form** for form state
- **next-themes** for theme handling
- **next/font** (Google Fonts) for Newsreader, DM Sans, IBM Plex Mono

Content is structured TypeScript in `src/content/`. There is no CMS and no
database for editorial content. Prisma is installed (`src/lib/db.ts`) but is not
used to source content in this demonstration.

---

## Quick start

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint
```

Environment rule: **never run `bun run build`** in this workspace. The dev
server is the only supported run target here. See
[`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) for the full environment notes.

---

## Project structure

```
src/
  app/                      App Router routes
    (top-level pages)       /, /about, /courses, /membership, /shop, /journal,
                            /newsletter, /resources, /search, /contact, /faq,
                            /support, /privacy, /terms, /refund-policy,
                            /accessibility, /demo-information
    courses/[slug]/         Dynamic course detail (generateStaticParams)
    shop/[slug]/            Dynamic product detail (generateStaticParams)
    resources/[slug]/       Dynamic resource detail (generateStaticParams)
    journal/[slug]/         Dynamic article (generateStaticParams)
    checkout/[offerSlug]/   Demo checkout (generateStaticParams, dynamicParams=false)
    checkout/demo-complete/ Checkout completion screen
    api/checkout/resolve/   Server-side checkout destination resolver
    layout.tsx              Root layout (fonts, header, footer, theme)
    page.tsx                Homepage
    sitemap.ts              Sitemap route
    robots.ts               robots.txt (disallows indexing for the demo)
    not-found.tsx           404
    error.tsx               Error boundary
    loading.tsx             Route loading state
  components/
    layout/                 SiteHeader, SiteFooter, ThemeProvider
    editorial/              SectionHeader, Markdown, ArticleHero, Covers,
                            ReadingProgress, FAQAccordion
    commerce/               CheckoutButton, DemoCompleteButton
    course/                 CourseView, CurriculumAccordion, StickyCheckout,
                            PreviewDownload
    membership/             PlanSelector
    shop/                   ProductFilters
    forms/                  ContactForm, NewsletterForm
    search/                 SearchClient
    brand/                  Wordmark
    ui/                     shadcn/ui primitives (New York)
  content/                  Structured, typed editorial content
    types.ts                Single source of truth for all content interfaces
    courses.ts              2 courses
    products.ts             3 digital products
    membership.ts           The Practice Room membership + 2 plans
    resources.ts            3 free lead-magnet resources
    faqs.ts                 FAQ entries (categorised)
    founder.ts              Founder narrative + principles
    journal/                6 editorial articles + index re-export
  lib/
    commerce/offers.ts      Demo/hosted commerce adapter
    newsletter/             Newsletter hooks (extension point)
    analytics/taxonomy.ts   Typed analytics events + no-op/console adapters
    config/site.ts          Site name, navigation, footer, legal links
    content/search-index.ts Typed site-wide search index
    seo/                    SEO helpers (extension point)
    validation/             Shared Zod schemas (extension point)
    db.ts                   Prisma client (available, not used for content)
    utils.ts                cn() helper
  hooks/                    use-mobile, use-toast
public/
  brand/                    Favicon (SVG)
  downloads/                Original PDFs (studio-audit, proposal-checklist,
                            pricing-starter)
  previews/                 Original product/course preview PDFs
  course-covers/            Course cover artwork (SVG)
  images/                   Static images
  logo.svg                  Wordmark mark
docs/                       This documentation
scripts/
  generate-pdfs.ts          Original PDF generator (pdfkit)
```

---

## Environment modes

The site has a single environment switch that controls commercial behaviour:

| Variable        | Values              | Default | Purpose                                         |
|-----------------|---------------------|---------|-------------------------------------------------|
| `PAYMENTS_MODE` | `demo` \| `hosted`  | `demo`  | Selects simulated checkout vs. real Whop handoff |

When `PAYMENTS_MODE=hosted`, the adapter reads these Whop-hosted checkout URLs
from the server environment:

```
WHOP_CHECKOUT_INDEPENDENT_PRACTICE     # flagship course
WHOP_CHECKOUT_CLIENT_PIPELINE          # second course
WHOP_CHECKOUT_PRACTICE_ROOM_MONTHLY    # membership monthly plan
WHOP_CHECKOUT_PRACTICE_ROOM_ANNUAL     # membership annual plan
WHOP_CHECKOUT_PROPOSAL_SYSTEM          # digital product
WHOP_CHECKOUT_PRICING_WORKBOOK         # digital product
WHOP_CHECKOUT_CLIENT_BRIEF_KIT         # digital product
```

**Demo mode (default):** the checkout route `/checkout/[offerSlug]` renders a
clearly labelled simulated checkout, then routes to
`/checkout/demo-complete`. No card details are collected, no transaction
occurs, no access is granted.

**Hosted mode:** purchase buttons resolve, via the server-only
`/api/checkout/resolve` endpoint, to a validated Whop-hosted checkout URL. The
URL is never embedded in the client bundle; the adapter validates every URL
against a Whop host allowlist before returning it. If a hosted URL is missing
for an offer, the user sees a configuration notice instead of a broken link.

Full activation steps: see [`docs/WHOP_INTEGRATION.md`](docs/WHOP_INTEGRATION.md).

---

## Content editing

All editorial content lives in typed TypeScript files under `src/content/`.
There is no admin UI and no CMS — to change a price, a course description, a
journal article, or a navigation link, you edit the relevant file and the
change is reflected at the next dev-server reload.

Start with [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md) for a complete
walkthrough of every content file, the markdown-lite syntax used in article and
course-lesson bodies, and the rules for adding new courses or products.

---

## Commercial activation

To take the demonstration from "demo checkout" to "real purchases", see
[`docs/WHOP_INTEGRATION.md`](docs/WHOP_INTEGRATION.md). The short version:

1. Set `PAYMENTS_MODE=hosted`.
2. Create the seven products/plans in your Whop account and copy each hosted
   checkout URL into the matching `WHOP_CHECKOUT_*` env var.
3. Restart the dev server.

Post-purchase entitlement (granting access to course materials after a
successful Whop payment) is **not** implemented in this demonstration. It is
documented as a production extension in the Whop integration guide.

---

## Demonstration limitations

Everything below is also disclosed in plain language on the
[`/demo-information`](src/app/demo-information/page.tsx) page.

- **No real payments.** Checkout is a labelled simulation.
- **No real subscriptions.** The membership plans are described, not sold.
- **No real email.** The newsletter and contact forms validate input and show
  a success state, but no email is sent and no subscriber record is created.
- **No real access granting.** Purchasing a course in demo mode does not
  unlock any protected content.
- **No real community.** The Practice Room is described as a proposed
  membership; no live community is running.
- **No third-party accounts connected.** No Whop, Kit, email provider, or
  deployment platform credentials are configured in this workspace.

The site is fictional throughout. The founder (Elena Mercer), the courses, the
products, the journal articles, and the membership are demonstration content.

---

## Deployment

The project is Vercel-ready (standard Next.js App Router). In this workspace no
deployment tooling is configured, no Vercel account is connected, and there is
no verified deployment URL. `robots.txt` blocks all indexing by default
(`src/app/robots.ts`) to prevent the demonstration from being treated as a live
site. Switch the `robots.ts` rules and the layout-level `robots` metadata
before deploying a real instance.

---

## License and credits

All written content is original and fictional. All brand graphics (wordmark,
monogram, favicon) are original works created for this demonstration. All PDFs
under `public/downloads/` and `public/previews/` are original content generated
by `scripts/generate-pdfs.ts` using pdfkit. Fonts (Newsreader, DM Sans, IBM
Plex Mono) are loaded via `next/font` from Google Fonts under their open
licenses. No Unsplash or Pexels imagery is used in the final build — every
visual composition is CSS or SVG.

The name "MARGIN / FORM" is fictional and unverified for trademark or domain
availability. No third-party trademarks are implied.

See [`docs/ASSET_LICENSES.md`](docs/ASSET_LICENSES.md) for the full asset
record.

---

## Documentation index

- [`docs/BRAND_GUIDE.md`](docs/BRAND_GUIDE.md) — identity, palette, type, voice
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — application structure and
  commerce/analytics/security model
- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md) — how to edit content
- [`docs/WHOP_INTEGRATION.md`](docs/WHOP_INTEGRATION.md) — commercial activation
- [`docs/FEATURE_INVENTORY.md`](docs/FEATURE_INVENTORY.md) — feature status
  table
- [`docs/CASE_STUDY.md`](docs/CASE_STUDY.md) — studio-facing portfolio case
  study
- [`docs/ASSET_LICENSES.md`](docs/ASSET_LICENSES.md) — asset provenance and
  licenses
- [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) — workspace environment notes
