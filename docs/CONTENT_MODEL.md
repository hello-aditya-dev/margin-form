# Content Model — Margin / Form

This document explains how to change every kind of content on the site. All
content lives in typed TypeScript files under `src/content/`. The interfaces
are in `src/content/types.ts`. There is no CMS and no admin UI — to change
something, you edit the file and the dev server reflects the change on the
next reload.

---

## File map

| File                              | What it contains                                              |
|-----------------------------------|---------------------------------------------------------------|
| `src/content/types.ts`            | All content interfaces. Single source of truth for shapes.    |
| `src/content/courses.ts`          | 2 courses (flagship + secondary).                             |
| `src/content/products.ts`         | 3 digital products (Frameworks / Workbooks / Kits).           |
| `src/content/membership.ts`       | The Practice Room membership + 2 plans (monthly, annual).     |
| `src/content/resources.ts`        | 3 free lead-magnet resources.                                 |
| `src/content/journal/articles.ts` | 6 editorial articles.                                          |
| `src/content/journal/index.ts`    | Re-export of `articles` and the `Article` type.               |
| `src/content/faqs.ts`             | Categorised FAQ entries.                                       |
| `src/content/founder.ts`          | Founder narrative, principles, expertise, quote.              |
| `src/lib/config/site.ts`          | Site name, tagline, primary nav, footer nav, legal nav.       |

---

## 1. Product prices

Prices are centralised on each product object. To change a price, edit the
`price` field on the relevant entry in `src/content/products.ts`.

```ts
// src/content/products.ts
{
  slug: "the-proposal-system",
  title: "The Proposal System",
  price: 79,            // <-- change this. Currency is USD by default.
  currency: "USD",
  // ...
}
```

The same field is read by the commerce adapter (`src/lib/commerce/offers.ts`)
to build the `CheckoutOffer`, by the catalogue page to render the price card,
and by the product detail page to render the purchase panel. Change it once;
it propagates everywhere.

Course prices live on each course in `src/content/courses.ts` (`price` field).
Membership plan prices live on each plan in `src/content/membership.ts`
(`price` and `displayPrice` fields — keep both in sync).

---

## 2. Course descriptions and modules

Each course in `src/content/courses.ts` is a `Course` object (see
`src/content/types.ts`). The shape:

```ts
{
  slug: string;
  title: string;
  tagline: string;          // one-line summary used on cards
  price: number;
  currency: string;
  audience: string;         // who the course is for
  promise: string;          // what it helps you build
  problemFraming: string;   // why the course exists
  outcomes: string[];       // what you walk away with
  format: string;           // self-paced / written / etc.
  accessModel: string;      // lifetime access, etc.
  whatIsIncluded: string[];
  whatIsNotPromised: string[];   // honest exclusions
  modules: CourseModule[];
  sampleLesson: { title, body, worksheetName, worksheetHref };
  instructor: { name, role, bio };
  faqs: { q, a }[];
  relatedOffers: { title, href, price? }[];
  heroAccent: "clay" | "olive" | "ink";
  coverLabel: string;       // "Vol. 01"
  isFlagship?: boolean;
}
```

### Modules

Each module is a `CourseModule`:

```ts
{
  number: string;           // "01", "02", ...
  title: string;
  summary: string;
  lessons: Lesson[];        // each lesson has title, summary, objectives[]
  assignment: string;
  workload: string;         // labelled illustrative, e.g. "approx. 2-3 hours"
  isPreview?: boolean;      // publicly viewable preview module
}
```

To add or edit a module, edit the `modules` array on the relevant course.
Module `number` is a string for display flexibility (zero-padded two-digit).
Keep `workload` honestly labelled as illustrative — do not promise exact
durations.

The curriculum accordion (`src/components/course/curriculum-accordion.tsx`)
renders modules in order. The first module flagged `isPreview: true` (or the
first module by default) is exposed in the public preview lesson section via
`src/components/course/preview-download.tsx`.

---

## 3. Membership benefits and plans

`src/content/membership.ts` exports a single `Membership` object. Key parts:

```ts
{
  name: "The Practice Room",
  tagline: string,
  whoFor: string,
  benefits: { title, description }[],          // 7 benefits
  monthlyProgramming: { week, title, description }[],  // 4-week cycle
  resourcePreviews: { title, type }[],
  plans: MembershipPlan[],
  faqs: { q, a }[],
}
```

### Plans

Each `MembershipPlan` has a `slug` that **must match** the slug used as the
commerce adapter's checkout offer slug. The adapter maps:

| Plan interval | Env var                                |
|---------------|----------------------------------------|
| `month`       | `WHOP_CHECKOUT_PRACTICE_ROOM_MONTHLY`  |
| `year`        | `WHOP_CHECKOUT_PRACTICE_ROOM_ANNUAL`   |

If you change a plan slug, you must also update the membership loop in
`src/lib/commerce/offers.ts` and the `generateStaticParams` in
`src/app/checkout/[offerSlug]/page.tsx`. Keep `displayPrice` (e.g. `"$39/mo"`)
and `price` (e.g. `39`) consistent with each other.

The plan selector (`src/components/membership/plan-selector.tsx`) toggles
between monthly and annual. The selected plan's slug is what gets sent to the
checkout button.

---

## 4. Articles

`src/content/journal/articles.ts` exports `articles: Article[]`. Each article:

```ts
{
  slug: string;
  title: string;
  excerpt: string;
  category: "Pricing" | "Positioning" | "Clients" | "Systems" | "Independent Work";
  author: string;
  publishedAt: string;      // ISO date "2025-09-15"
  readingTime: string;      // "5 min read" — match actual word count / 220wpm
  volume: string;           // "Vol. 01"
  issue: string;            // "No. 03"
  heroAccent: "clay" | "olive" | "ink";
  body: string;             // markdown-lite (see below)
  exercise?: { title, body };
  relatedResources: { title, href }[];
  relatedOffer: { title, href, price };
}
```

The article body uses the **markdown-lite** syntax supported by the
`Markdown` component (`src/components/editorial/markdown.tsx`). See the syntax
section below.

`readingTime` should be set honestly. Compute it from the body word count at
~220 words per minute and round to the nearest minute. Do not understate.

---

## 5. FAQs

`src/content/faqs.ts` exports `faqs: FaqItem[]` where each item is
`{ category, q, a }`. The category string is used to group items in the
accordion on `/faq`. Add or edit entries freely; keep `a` honest about the
demonstration status where relevant (e.g. "In demonstration mode, no real
community is running").

---

## 6. Resources

`src/content/resources.ts` exports `resources: FreeResource[]`. Each resource:

```ts
{
  slug: string;
  title: string;
  tagline: string;
  category: string;
  overview: string;
  contents: string[];
  preview: {
    name: string;
    href: string;        // path to a real PDF in /public/downloads/
    pages: number;
  };
  relatedJournal: { title, slug }[];
  relatedOffer: { title, href, price };
  isFlagship?: boolean;
}
```

The `preview.href` field **must point to a real PDF file** that exists under
`public/downloads/` (for full lead-magnet PDFs) or `public/previews/` (for
product/course preview PDFs). All current PDFs are listed in
`docs/ASSET_LICENSES.md` and were generated by `scripts/generate-pdfs.ts`.

If you add a new resource, you must also add a matching PDF under
`public/downloads/` and update the generator script (or place the PDF
manually). A resource whose `preview.href` 404s is a broken lead magnet.

---

## 7. Founder

`src/content/founder.ts` exports a single `Founder` object. Edit the
narrative, principles, expertise, voice, and quote directly. Keep the
narrative honest about fictional status — the first narrative paragraph
already states that the founder is fictional. Do not add fabricated
employers, degrees, press features, or follower counts.

---

## 8. Navigation

`src/lib/config/site.ts` is the single source of truth for header and footer
links:

- `PRIMARY_NAV` — the top-level header items.
- `FOOTER_NAV` — grouped footer link lists (Learn, Shop, Read, Studio).
- `LEGAL_NAV` — the legal sub-footer (Privacy, Terms, Refund Policy,
  Accessibility, Demo Information).
- `SITE_CONFIG` — site name, tagline, description, founder name, disclosure
  string.

Editing any of these arrays updates the header and footer everywhere. Keep
labels short and editorial; descriptions are optional and used for the
desktop nav hover treatment.

---

## Markdown-lite syntax

The `Markdown` component (`src/components/editorial/markdown.tsx`) is an
intentionally minimal, safe renderer. It does not accept raw HTML. Supported
syntax:

| Element        | Syntax                            | Example                            |
|----------------|-----------------------------------|------------------------------------|
| H2             | `## `                             | `## Positioning is not a niche`    |
| H3             | `### `                            | `### A note on categories`         |
| Blockquote     | `> ` (consecutive lines join)     | `> A practice is partly defined...`|
| Unordered list | `- ` or `* `                      | `- First item`                     |
| Ordered list   | `1. `, `2. `, ...                 | `1. Audit positioning`             |
| Bold           | `**text**`                        | `**reasoned price**`               |
| Italic         | `*text*`                          | `*an artistic practice*`           |
| Inline code    | `` `code` ``                      | `` `PAYMENTS_MODE` ``              |
| Link           | `[text](url)`                     | `[journal](/journal)`              |
| Horizontal rule| `---` or `***` on its own line    | `---`                              |

Paragraphs are separated by blank lines. Anything else is treated as a
paragraph. External links (http/https) automatically get
`target="_blank"` and `rel="noopener noreferrer"`.

Use this syntax in `Article.body`, `Course.sampleLesson.body`, and anywhere
else the `Markdown` component is used.

---

## Offer slugs — the contract between content and commerce

The commerce adapter builds the checkout catalogue from the content modules.
The slug is the join key. The mapping is:

| Content source              | Offer slug used at checkout            |
|-----------------------------|----------------------------------------|
| Course (flagship)           | `the-independent-practice`             |
| Course (secondary)          | `the-client-pipeline`                  |
| Product                     | `the-proposal-system`, `the-pricing-workbook`, `the-client-brief-kit` |
| Membership plan (monthly)   | `the-practice-room-monthly`            |
| Membership plan (annual)    | `the-practice-room-annual`             |

These slugs must match:

1. The `slug` field on the content object (`courses.ts`, `products.ts`,
   `membership.ts`).
2. The entries returned by `generateStaticParams` in
   `src/app/checkout/[offerSlug]/page.tsx` (because `dynamicParams = false`).
3. The `slug` passed to `<CheckoutButton offerSlug="..." />` on the
   relevant page.

If you rename a product slug, update all three places, or the checkout will
404.

---

## Adding a new course or product

To add a new course:

1. Add a `Course` object to `src/content/courses.ts`. Set a unique `slug`.
2. The dynamic route `src/app/courses/[slug]/page.tsx` will pick it up
   automatically because it does not set `dynamicParams = false`. (If you want
   to enforce a closed set, add the slug to its `generateStaticParams` and set
   `dynamicParams = false`.)
3. Add the course slug to `generateStaticParams` in
   `src/app/checkout/[offerSlug]/page.tsx`.
4. Wire the course into the commerce adapter by adding a new env-key branch
   in `src/lib/commerce/offers.ts` (currently the adapter uses `isFlagship`
   to pick between two env keys; extend this if you have more than two
   courses).
5. When going live, add a matching `WHOP_CHECKOUT_*` env var for the new
   course.

To add a new product:

1. Add a `Product` object to `src/content/products.ts`. Set a unique `slug`.
2. Add the slug to the `productEnvMap` in `src/lib/commerce/offers.ts`.
3. Add the slug to `generateStaticParams` in
   `src/app/checkout/[offerSlug]/page.tsx`.
4. Add a matching `WHOP_CHECKOUT_*` env var when going live.
5. (Optional) Add a preview PDF under `public/previews/` and reference it
   from the product's `preview.href`.

To add a new membership plan, follow the same pattern: add the plan to
`membership.ts`, add an env-key branch in the adapter's membership loop, add
the slug to `generateStaticParams`, and add the env var.

---

## Content editing principles

- **Honesty first.** Every claim about what the course / product / membership
  does must be true of the demonstration. The "what is not promised" lists on
  courses are not optional — keep them.
- **No fabricated stats.** Do not invent conversion rates, student counts,
  revenue figures, or press quotes. The journal articles avoid this; the rest
  of the content should too.
- **Reading times must be honest.** Compute from word count at ~220 wpm.
- **Workload labels are illustrative.** Keep them as illustrative, not as
  promises.
- **Fictional status is disclosed.** The founder narrative, the FAQ, and the
  `/demo-information` page all state that the business is fictional. Do not
  remove those disclosures.
