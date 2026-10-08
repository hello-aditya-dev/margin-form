# Whop Integration — Margin / Form

This document explains how the Margin / Form site connects (or does not
connect) to Whop for payments. It is honest about what is implemented, what is
tested, and what is not.

---

## 1. The two modes

The site has a single payments-mode switch.

| Mode     | `PAYMENTS_MODE` | Behaviour                                                                 |
|----------|-----------------|---------------------------------------------------------------------------|
| Demo     | `demo` (default)| All purchase buttons route to the internal `/checkout/[offerSlug]` page. No real payment is taken. The user reaches `/checkout/demo-complete`. |
| Hosted   | `hosted`        | Purchase buttons resolve, via the server-side `/api/checkout/resolve` endpoint, to a validated Whop-hosted checkout URL. The user completes payment on Whop. |

In demo mode, the `WHOP_CHECKOUT_*` env vars are ignored entirely. In hosted
mode, every offer must have a corresponding env var set, or the user sees a
configuration notice instead of a purchase link.

---

## 2. Required environment variables

| Variable                                 | Used by                                            |
|------------------------------------------|----------------------------------------------------|
| `PAYMENTS_MODE`                          | Mode switch. `demo` (default) or `hosted`.         |
| `WHOP_CHECKOUT_INDEPENDENT_PRACTICE`     | Flagship course (`the-independent-practice`).      |
| `WHOP_CHECKOUT_CLIENT_PIPELINE`          | Second course (`the-client-pipeline`).             |
| `WHOP_CHECKOUT_PRACTICE_ROOM_MONTHLY`    | Membership monthly plan.                           |
| `WHOP_CHECKOUT_PRACTICE_ROOM_ANNUAL`     | Membership annual plan.                            |
| `WHOP_CHECKOUT_PROPOSAL_SYSTEM`          | Digital product `the-proposal-system`.             |
| `WHOP_CHECKOUT_PRICING_WORKBOOK`         | Digital product `the-pricing-workbook`.            |
| `WHOP_CHECKOUT_CLIENT_BRIEF_KIT`         | Digital product `the-client-brief-kit`.            |

Each `WHOP_CHECKOUT_*` value must be a full `https://` URL pointing at a Whop
hosted-checkout page (e.g. `https://checkout.whop.com/...`). The adapter
validates the host against an allowlist (see below).

---

## 3. How the adapter works

The adapter lives in `src/lib/commerce/offers.ts`. It is server-only.

### Reading env

`readEnv(key)` reads `process.env[key]` defensively. It returns `undefined`
if `process` is not available (e.g. during a client-side import attempt).

### Validating URLs

`safeWhopUrl(raw)` runs every hosted-checkout URL through:

1. `new URL(raw)` — rejects anything that is not a parseable URL.
2. `u.protocol === "https:"` — rejects non-HTTPS URLs.
3. Host allowlist check — the hostname must be exactly one of:
   - `whop.com`
   - `www.whop.com`
   - `checkout.whop.com`
   - `pay.whop.com`
   ...or any subdomain of those (e.g. `my-store.whop.com`).

If any check fails, the URL is dropped (returns `undefined`) and the offer is
treated as unconfigured for hosted mode. The user sees a configuration notice,
not a broken external link.

### Building the offer catalogue

`getOffers()` iterates `courses`, `products`, and `membership.plans` and
produces a flat `CheckoutOffer[]`. Each offer carries:

- `id`, `slug`, `type` (course / product / membership)
- `title`, `description`, `price`, `currency`, `billingInterval`
- `features` and `deliverables` (sourced from the content)
- `whopCheckoutUrl` — present only in hosted mode and only when the env URL
  validates.

### Resolving a destination

`resolveCheckoutDestination(slug)` is what the client checkout button calls
(via the API route). It returns:

- Demo mode: `{ mode: "demo", href: "/checkout/[slug]", external: false }`.
- Hosted mode + URL configured: `{ mode: "hosted", href: "https://...whop.com/...", external: true }`.
- Hosted mode + URL missing: `{ mode: "hosted", href: "/checkout/[slug]?error=config", external: false, configurationError: "..." }`.
- Unknown slug: `{ mode, href: "/checkout/invalid", external: false, configurationError: "Unknown offer" }`.

### The API route

`src/app/api/checkout/resolve/route.ts` is a single GET handler. It reads
`slug` from the query string, calls `resolveCheckoutDestination`, and returns
the destination as JSON. The client `CheckoutButton`
(`src/components/commerce/checkout-button.tsx`) fetches this endpoint and
either navigates internally (`router.push`) or externally
(`window.location.href`).

This indirection means:

- The Whop URL is **never embedded in the client bundle**.
- The Whop URL is **never present in the page source** in demo mode.
- In hosted mode, the URL is only returned after validation.

---

## 4. How to activate hosted mode

1. **Create your products and pricing plans in Whop.** For each of the seven
   offers above, create a matching Whop product (for one-time purchases) or
   pricing plan (for the membership monthly/annual subscriptions).
2. **Copy each Whop hosted-checkout URL** into the matching `WHOP_CHECKOUT_*`
   env var. The URL looks like `https://checkout.whop.com/...` or
   `https://pay.whop.com/...`.
3. **Set `PAYMENTS_MODE=hosted`.**
4. **Restart the dev server.**
5. **Verify on a single offer first.** Visit `/courses/the-independent-practice`,
   click the purchase button, and confirm you land on Whop.

If you forget to set one of the env vars, the corresponding purchase button
will route to the internal checkout page with a "Configuration Notice"
banner instead of breaking.

---

## 5. How to test

### Demo mode (default)

Demo mode requires **no credentials**. Visit any purchase button on the site;
it will route to `/checkout/[offerSlug]`, which renders a labelled
demonstration checkout and a "Complete demo checkout" button that routes to
`/checkout/demo-complete`. No network call to Whop is made in demo mode.

### Hosted mode

Hosted mode requires **a real Whop account** with:

- Products created for the two courses and three digital products.
- Pricing plans created for the membership (monthly + annual).
- Hosted-checkout URLs copied into the seven `WHOP_CHECKOUT_*` env vars.

To test hosted mode without going live with real charges, use Whop's test
mode (if available on your account) and verify the full handoff: click
purchase, land on Whop, complete a test checkout, and observe the redirect.

---

## 6. How to verify access (post-purchase entitlement)

**This is not implemented in the demonstration.** Whop can collect a payment,
but granting the buyer access to course materials, downloadable products, or
the membership community requires server-side verification of the buyer's
entitlement.

A production entitlement flow would look like:

1. **Webhook.** Register a Whop webhook for `payment.succeeded` (and
   `subscription.*` events for the membership). The webhook handler verifies
   the Whop signature (see "Limitations" below) and creates an entitlement
   record keyed on the buyer's email or Whop user id.
2. **Auth.** Add NextAuth (already installed) to give buyers a session.
   Request the email scope from Whop OAuth so a buyer can sign in with the
   same email they paid with.
3. **Entitlement check.** On protected routes (course modules, product
   downloads, membership pages), server-side fetch the buyer's entitlement
   from your database and either render the content or redirect to purchase.
4. **Sync.** Listen for `subscription.cancelled` and `refund.created` webhooks
   to revoke access.

This is a substantial production extension and is out of scope for the
demonstration. It is documented here so a future engineer knows where to
start.

---

## 7. Limitations

The demonstration's Whop integration has the following limits. Be honest
about these in any client conversation.

- **No embedded checkout.** Hosted mode links out to Whop; it does not embed
  the Whop checkout iframe on this site. An embedded checkout (Whop's
  embedded checkout widget) is a future enhancement.
- **No webhook signature verification.** The webhook route does not exist.
  A production webhook handler must verify the Whop signature before trusting
  the payload.
- **No real entitlement granting.** Purchasing a course or product in hosted
  mode does not unlock any protected content on this site. The buyer gets
  whatever Whop grants them at Whop; this site has no concept of a buyer
  session yet.
- **No subscription lifecycle handling.** The membership plans can be
  purchased, but there is no server-side record of who is an active
  subscriber. Membership is described, not operated.
- **No idempotency on the resolver.** The `/api/checkout/resolve` endpoint
  is stateless and idempotent, which is fine for what it does. A real
  checkout backend would need idempotency at the order-creation layer.

---

## 8. What was actually tested

This is the verified status, as of the demonstration build:

- **Demo checkout flow, end-to-end.** Verified: clicking a purchase button on
  every offer type (course, product, membership monthly, membership annual)
  routes to `/checkout/[offerSlug]`, the demo checkout renders the correct
  order summary and disclosure, and the "Complete demo checkout" button
  routes to `/checkout/demo-complete`. Verified for all 7 offer slugs.
- **Hosted URL validation logic.** Verified by code inspection:
  `safeWhopUrl()` rejects non-https URLs, non-Whop hosts, and unparseable
  strings. The allowlist is enforced.
- **Configuration-error path.** Verified: with `PAYMENTS_MODE=hosted` and a
  missing `WHOP_CHECKOUT_*` var, the resolver returns the configuration-error
  destination and the checkout page renders the Configuration Notice banner.

**Not tested:**

- The hosted-mode handoff against a real Whop account. **No Whop credentials
  are available in this workspace**, so the external navigation to a real
  `https://checkout.whop.com/...` URL has not been exercised. The URL
  validation is verified; the actual external checkout experience is not.
- Webhook signature verification (the webhook handler does not exist).
- Post-purchase entitlement granting (not implemented).

If you activate hosted mode with real Whop credentials, treat the first end
to end checkout as your integration test.
