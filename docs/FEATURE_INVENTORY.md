# Feature Inventory — Margin / Form

Status values used in this table:

- **Fully working** — the feature works end-to-end in the demonstration with
  no external dependencies.
- **Working in labelled demonstration mode** — the feature works as a clearly
  labelled simulation. No real backend is involved. Disclosure is in-UI.
- **Requires external configuration** — the code is complete but the feature
  needs an external account or credentials to function for real.
- **Unverified or incomplete** — the feature is implemented but has not been
  verified in this environment, or is documented as a known limitation.

| Feature                                              | Status                                      | Notes                                                                                                                  |
|------------------------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Homepage                                             | Fully working                               | `src/app/page.tsx`. Hero, flagship course, products, journal teaser, membership, resources, founder pull-quote.       |
| Navigation (desktop)                                 | Fully working                               | `src/components/layout/site-header.tsx`. Hover treatments, navigation menu, brand wordmark.                            |
| Navigation (mobile)                                  | Fully working                               | Sheet-based drawer, full primary nav, accessible toggle.                                                               |
| Courses catalogue (`/courses`)                       | Fully working                               | Lists 2 courses with covers, taglines, prices, CTAs.                                                                   |
| Course detail pages (`/courses/[slug]`)              | Fully working                               | 2 courses: `the-independent-practice`, `the-client-pipeline`.                                                          |
| Curriculum accordion                                 | Fully working                               | `src/components/course/curriculum-accordion.tsx`. Expand/collapse per module with lessons and objectives.              |
| Course preview lesson + worksheet download           | Fully working                               | `src/components/course/preview-download.tsx`. Reveal + download with analytics event. Worksheet PDFs in `public/downloads/`. |
| Membership page (`/membership`)                      | Working in labelled demonstration mode      | Describes The Practice Room. Discloses "no live community is running" in the FAQ.                                      |
| Plan selector (monthly/annual)                       | Fully working                               | `src/components/membership/plan-selector.tsx`. Toggles the offer slug sent to checkout.                                |
| Shop (`/shop`)                                       | Fully working                               | Lists 3 products with covers, categories, prices.                                                                      |
| Product filters                                      | Fully working                               | `src/components/shop/product-filters.tsx`. Category filter (Frameworks / Workbooks / Kits), URL-synced.                |
| Product detail pages (`/shop/[slug]`)                | Fully working                               | 3 products: `the-proposal-system`, `the-pricing-workbook`, `the-client-brief-kit`.                                     |
| Product preview downloads                            | Fully working                               | Each product has a `preview.href` pointing at a real PDF under `public/previews/`.                                     |
| Journal index (`/journal`)                           | Fully working                               | Lists 6 articles with volume/issue, category, reading time, excerpt.                                                   |
| Journal articles (`/journal/[slug]`)                 | Fully working                               | 6 articles. Markdown-lite body, exercise block, related resources, related offer.                                      |
| Reading progress bar                                 | Fully working                               | `src/components/editorial/reading-progress.tsx`. Respects reduced motion.                                              |
| Newsletter page + form (`/newsletter`)               | Working in labelled demonstration mode      | `src/components/forms/newsletter-form.tsx`. Zod-validated. No real email is sent; success state is simulated.          |
| Resources hub (`/resources`)                         | Fully working                               | Lists 3 free resources. Flagship (Studio Audit) is highlighted.                                                        |
| Resource detail pages (`/resources/[slug]`)          | Fully working                               | 3 resources: `studio-audit`, `proposal-checklist`, `pricing-starter`.                                                  |
| Resource PDF downloads                               | Fully working                               | Each resource `preview.href` points at a real PDF under `public/downloads/`. All PDFs generated by `scripts/generate-pdfs.ts`. |
| Search (`/search`)                                   | Fully working                               | `src/components/search/search-client.tsx`. Typed index from `src/lib/content/search-index.ts`. Client-side filter. Keyboard nav. |
| Checkout (demo)                                      | Working in labelled demonstration mode      | `src/app/checkout/[offerSlug]/page.tsx`. Renders order summary + disclosure. No payment taken.                         |
| Checkout completion page (`/checkout/demo-complete`) | Working in labelled demonstration mode      | Receipt-style confirmation. Discloses no real purchase.                                                                |
| About (`/about`)                                     | Fully working                               | Founder narrative, principles, expertise. Discloses fictional status in the first paragraph.                          |
| Contact form (`/contact`)                            | Working in labelled demonstration mode      | `src/components/forms/contact-form.tsx`. Zod-validated. No real email is sent; success state is simulated.             |
| FAQ (`/faq`)                                         | Fully working                               | `src/components/editorial/faq-accordion.tsx`. Categorised accordion from `src/content/faqs.ts`.                        |
| Support (`/support`)                                 | Fully working                               | Static support content.                                                                                                 |
| Privacy (`/privacy`)                                 | Fully working                               | Static legal content, demo-aware.                                                                                      |
| Terms (`/terms`)                                     | Fully working                               | Static legal content, demo-aware.                                                                                      |
| Refund Policy (`/refund-policy`)                     | Fully working                               | Static legal content, demo-aware.                                                                                      |
| Accessibility (`/accessibility`)                     | Fully working                               | Statement + contact route. Manual review recommended (axe not run here).                                               |
| Demo Information (`/demo-information`)               | Fully working                               | The full plain-language disclosure page.                                                                               |
| 404 page (`not-found.tsx`)                           | Fully working                               | Editorial-styled 404.                                                                                                  |
| Error boundary (`error.tsx`)                         | Fully working                               | Renders a recovery UI on uncaught errors.                                                                              |
| Loading state (`loading.tsx`)                        | Fully working                               | Route-level loading skeleton.                                                                                          |
| Sitemap (`/sitemap.xml`)                             | Fully working                               | `src/app/sitemap.ts`. Uses `https://marginform.example` as base — update before deploying.                             |
| `robots.txt`                                         | Fully working                               | `src/app/robots.ts`. Disallows all indexing by default for the demonstration.                                          |
| Analytics events                                     | Working in labelled demonstration mode      | `src/lib/analytics/taxonomy.ts`. No-op adapter in production preview; console adapter in browser dev. No PII.          |
| Whop hosted checkout                                 | Requires external configuration             | Adapter, validation, and resolver endpoint are complete and tested in demo. Hosted handoff requires a real Whop account. See `docs/WHOP_INTEGRATION.md`. |
| Kit newsletter (live email delivery)                 | Requires external configuration             | The form is complete and validates. To deliver real email, wire an ESP (Kit recommended) into the form submit handler. |
| Contact email delivery                               | Requires external configuration             | Same as above. The form simulates submission. A real backend (e.g. a transactional email service) is required.         |
| Lighthouse / performance audit                       | Unverified or incomplete                    | No Lighthouse run in this workspace. Dev-server-only environment; production build is not run here.                    |
| Playwright / axe automated scans                     | Unverified or incomplete                    | Playwright and axe are not installed in this environment. Automated E2E and accessibility scans are documented as a known limitation. Manual keyboard review is recommended. |
| Post-purchase entitlement granting                   | Unverified or incomplete                    | Not implemented. Requires Whop webhooks + server-side verification + auth. Documented as a production extension in `docs/WHOP_INTEGRATION.md`. |
| Deployment (Vercel or other)                         | Unverified or incomplete                    | No deployment tooling configured in this workspace; no verified deployment URL.                                        |
