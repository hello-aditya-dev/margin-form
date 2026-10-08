# Case Study — Margin / Form

A studio-facing portfolio case study. This document does not fabricate
business results. It documents what was built, why, and what was verified.

---

## Project

**Margin / Form** — "The business of independent creativity."

A fictional creator-led education business built as a flagship demonstration
for a web-development studio. The project shows what a premium
creator-commerce website looks like when it is designed as an editorial
product rather than assembled from a template.

---

## Type

Fictional creator-commerce demonstration. Portfolio piece.

---

## Objective

Showcase premium creator-website design and development at the standard of a
~$1,495 engagement: brand-led marketing site, structured course catalogue,
digital product shop, paid membership, editorial journal, lead generation,
and a payment-handoff architecture that can be taken live without rework.

---

## Scope

- Brand-led marketing site (homepage, about, contact, FAQ, support, legal).
- Course catalogue and detail pages with curriculum and preview lessons.
- Digital product shop with filtering and preview downloads.
- Paid membership page with monthly/annual plan selector.
- Editorial journal with six full-length articles and a reading experience.
- Newsletter landing page and lead-magnet resource hub.
- Site-wide search.
- Demo checkout flow with a clear path to real Whop-hosted checkout.
- Analytics taxonomy, sitemap, robots, accessibility statement, and demo
  disclosure.
- Documentation set (this folder + root README).

---

## Business problem

Independent creative professionals — designers, consultants, strategists,
small-studio founders — are sold website templates that confuse "creator
economy" hype with the actual business of running a creative practice. The
result is a checkout bolted onto a generic landing page, with no coherent
offer ladder, no editorial voice, and no honest disclosure.

The brief was to build the opposite: a creator-commerce site that treats the
audience as intelligent, presents offers as a coherent system, and is honest
about what is and is not for sale.

---

## Fictional target audience

Independent designers, consultants, strategists, and small-studio founders
who already do good work and want a calmer, repeatable way to run the
business around it. They are not beginners. They are not looking for
"passive income". They are looking for positioning, pricing, proposal, and
pipeline frameworks they can use on Monday.

---

## Positioning strategy

Editorial education company. Not growth-hacking. Not a course platform. Not a
creator-economy hype site. The voice is editorial, intelligent, quietly
confident, and commercially literate. Every offer is described honestly,
including what it does not promise.

---

## Design concept

An independent business journal meets a creative atelier. The visual world
is paper, ink, hairline rules, generous margins, numbered sections, and one
quiet accent (Clay). Type does the work; imagery is generated, not
photographed.

---

## Visual identity

- **Palette:** Paper `#F3EEE6`, Ivory `#FCFAF6`, Ink `#252721`, Clay
  `#AD4E36`, Olive `#777F68`, Linen `#D8CEBF`, Warm gray `#756F65`, Rule
  `#E4DDCF`. Distribution: 65–75% paper/ivory, 15–25% ink, small accent.
- **Type:** Newsreader (display serif), DM Sans (UI/body), IBM Plex Mono
  (labels). Hero at 76–116px, page headline 64–90px, section 40–64px, card
  title 25–36px, body 16–19px, labels 11–13px.
- **Logo:** `MARGIN / FORM` wordmark with a Clay slash as the single chromatic
  accent. MF monogram and SVG favicon for secondary use.

Full identity in `docs/BRAND_GUIDE.md`.

---

## UX decisions

- **Offer ladder.** A free resource (Studio Audit) sits at the top of the
  funnel. The newsletter is the second step. Digital products ($49–$79) are
  the entry-level purchase. Courses ($349) are the flagship. Membership
  ($39/mo or $390/yr) is the recurring relationship.
- **Free-to-paid journeys.** Every free resource is linked to a paid offer;
  every journal article is linked to a related resource and a related offer;
  every course page lists related offers. The site is a graph, not a
  collection of pages.
- **Honest demo disclosure.** Every commercial touchpoint (checkout, demo
  completion, contact form, newsletter form, membership FAQ) discloses the
  demonstration status. The `/demo-information` page is the full
  plain-language disclosure.
- **Editorial composition.** Numbered sections, hairline dividers, asymmetric
  grids, generous reading width. The site reads like a journal, not like a
  SaaS landing page.

---

## Conversion structure

```
Free resource (lead magnet)
        |
        v
Newsletter (The Monday Letter)
        |
        v
Digital product ($49–$79)
        |
        v
Course ($349)
        |
        v
Membership ($39/mo or $390/yr)
```

Each step is reachable from the step above and the step below. The homepage
features all five layers in a single scroll. No layer is gated behind another
— a visitor can enter at any point.

---

## Customer journeys

### Journey A — Reader to subscriber

A visitor lands on a journal article via a shared link. They read the
article, see the related resource and related offer at the end, click
through to the resource, download the lead-magnet PDF, and on the resource
page see the newsletter prompt. They subscribe. The newsletter form
validates their email and consent, shows a success state, and tracks the
submission. In the demonstration, no real email is sent.

### Journey B — Visitor to course checkout

A visitor browses `/courses`, selects the flagship course, reads the
curriculum accordion, expands the preview lesson, downloads the worksheet,
and clicks "Enroll". The `CheckoutButton` calls `/api/checkout/resolve`,
receives the demo destination, navigates to `/checkout/the-independent-practice`,
sees the order summary and demo disclosure, and clicks "Complete demo
checkout". They land on `/checkout/demo-complete` with a receipt-style
confirmation.

### Journey C — Membership

A visitor lands on `/membership`, reads the benefits and monthly programming,
toggles the plan selector between monthly and annual (annual is recommended),
and clicks "Join the Practice Room". The selected plan's slug is sent to
checkout. The checkout page reflects the chosen interval and price.

### Journey D — Product

A visitor browses `/shop`, filters by Frameworks, selects The Proposal System,
reads the overview and contents, downloads the preview PDF, and clicks "Buy
now". The checkout flow mirrors Journey B with the product's deliverables.

### Journey E — Mobile

A visitor on a phone navigates via the mobile drawer, scrolls the homepage
(which art-directs each section at the mobile breakpoint), reads a journal
article (single column, generous line height, sticky reading-progress bar),
and uses the sticky mobile checkout CTA on a course page to start the
purchase flow without scrolling back to the top.

---

## Component architecture

- **Editorial design system.** `src/components/editorial/` contains
  `SectionHeader`, `Markdown`, `ArticleHero`, `Covers` (CourseCover +
  ProductArtwork), `ReadingProgress`, and `FAQAccordion`. These are the
  reusable editorial primitives.
- **Centralised content model.** Every page reads from `src/content/`. The
  interfaces in `src/content/types.ts` are the contract. No page hard-codes
  content.
- **Commerce adapter.** `src/lib/commerce/offers.ts` is the only place that
  knows about Whop. Pages and components ask for an offer by slug; the
  adapter decides whether to return a demo or hosted destination.
- **shadcn/ui primitives.** `src/components/ui/` is the New York style set,
  used as the base layer for interactive components (accordion, dialog,
  sheet, form, etc.). Editorial components compose on top.

---

## Responsive strategy

Mobile-first. Every section art-directs its layout at each breakpoint
(`md:`, `lg:`) rather than scaling a single layout. The homepage hero uses a
clamp-based font size so the headline scales fluidly from mobile to desktop.
Reading width is capped at 660–760px for long-form prose. A sticky mobile
checkout CTA (`src/components/course/sticky-checkout.tsx`) keeps the purchase
action reachable on long course pages.

---

## Actual integrations

- **Demo checkout:** fully working end-to-end. Verified for all 7 offer slugs.
- **Whop hosted checkout:** adapter, URL validation, and resolver endpoint
  complete and tested in demo. Hosted handoff is ready to activate with a
  real Whop account. No Whop credentials are configured in this workspace,
  so the external handoff has not been exercised against a live account.
- **Kit newsletter:** the form is complete and validates. Live email
  delivery requires wiring an ESP into the submit handler.
- **Contact email:** same as above — the form simulates submission.
- **Analytics:** typed event taxonomy with a no-op adapter in production
  preview and a console adapter in browser dev. No PII. Pluggable for a real
  provider.

---

## Demo limitations

Stated honestly and disclosed in-UI on `/demo-information`:

- No real payments.
- No real subscriptions.
- No real email.
- No real access granting.
- No real community.
- No third-party accounts connected in this workspace.

---

## Verified functionality

All 25 routes render. Specifically verified:

- Homepage, all top-level marketing pages, all legal pages.
- Courses catalogue + both course detail pages with curriculum accordion.
- Shop + filters + all three product detail pages with preview downloads.
- Membership page + plan selector toggles correctly between monthly/annual.
- Journal index + all six articles with markdown-lite rendering, reading
  progress, related resource, and related offer.
- Resources hub + all three resource detail pages with PDF downloads.
- Search returns results across courses, products, articles, resources, and
  pages; keyboard navigation works.
- Demo checkout renders the correct order summary and disclosure for every
  offer slug; demo completion page renders.
- Sitemap and `robots.txt` are served.
- `bun run lint` is clean.
- `tsc --noEmit` is clean for the project.

---

## Performance and accessibility results

- **Lint:** clean (`bun run lint`).
- **Type-check:** clean (`tsc --noEmit`).
- **Lighthouse:** not run in this workspace. The dev server is the only run
  target here; a production build is intentionally not run per environment
  rules, so Lighthouse scores are not available. Documenting a Lighthouse
  score without running it would be fabrication.
- **axe automated scan:** not run. Playwright and axe are not installed in
  this environment. This is a documented limitation. Manual keyboard review
  is recommended before any real deployment. The site includes a "Skip to
  content" link, visible focus styles, labelled form inputs, and
  reduced-motion-aware animations.

---

## Potential production evolution

- **Whop embedded checkout.** Replace the link-out handoff with Whop's
  embedded checkout widget for an in-context experience.
- **Kit live forms.** Wire the newsletter and contact forms to a real ESP
  (Kit recommended) for email delivery and subscriber management.
- **Real contact email.** Add a transactional email service (Resend, Postmark)
  behind the contact form.
- **CMS migration.** Move the content modules in `src/content/` to a headless
  CMS (Sanity, Payload, or Ghost for the journal) without changing the
  consumer interfaces.
- **Student portal with NextAuth.** Add NextAuth (already installed) with
  Whop OAuth, grant entitlements via webhook, and gate course modules and
  product downloads behind a verified session. This is the largest single
  production extension and is documented in `docs/WHOP_INTEGRATION.md`.
- **Performance pass.** Run a production build, run Lighthouse, optimise
  images and font loading, add `next/image` where photographs are
  introduced.
- **Automated tests.** Add Playwright E2E tests and axe accessibility scans
  in CI.

---

## Credits

Design, content, and engineering for the demonstration. All written content
is original and fictional. All brand graphics are original. All PDFs are
generated by `scripts/generate-pdfs.ts`. Fonts (Newsreader, DM Sans, IBM Plex
Mono) are Google Fonts loaded via `next/font`. No third-party trademarks
implied. See `docs/ASSET_LICENSES.md` for the full asset record.
