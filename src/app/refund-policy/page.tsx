import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/editorial/markdown";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund policy for the Margin / Form portfolio demonstration. 14-day review window for courses and downloadable products, membership cancellation, and how refunds would be processed via the provider when live. Real legal review required before commercial activation.",
  robots: { index: false, follow: false },
};

const REFUND_BODY = `## What this is

This refund policy describes the **Margin / Form portfolio demonstration** and the intended refund terms for when real payments are activated. In demo mode, no purchase occurs, so no refund is required.

Real legal review is required before commercial activation. The wording on this page is editorial, not a substitute for review by a qualified professional in the jurisdiction where the business will operate, including applicable consumer-protection and distance-selling law.

## In demo mode

In demo mode, **no payment is taken and no purchase occurs**. The checkout flow simulates the journey, the order-confirmation screen is a mock, and no real order, account, or delivery obligation is created. Because there is no transaction, there is nothing to refund.

When a real provider is connected, the policy below describes the terms under which refunds will be issued.

## Courses and downloadable products

For self-paced courses and downloadable products (frameworks, workbooks, kits), a **14-day review window** applies from the date of purchase. The window is intended for a genuine review of the materials — opening the course, reading the curriculum, and assessing whether the framework fits the practice it is meant to support.

- Within the 14-day window, a refund can be requested through the payment provider's customer dashboard or through the contact page. No reason is required, though a brief note is appreciated.
- The refund is issued to the original payment method. Processing time depends on the provider and the card issuer, typically three to ten business days.
- Access to the course or product is revoked when the refund is issued. The licence to use any downloaded files ends with the refund.

This policy is the **intended** position for live mode and is subject to the consumer-protection rights that apply in the purchaser's jurisdiction, which may be more favourable than this policy.

## Membership

The Practice Room membership is a recurring subscription billed monthly or annually through the payment provider.

- A subscription can be cancelled at any time from inside the provider's customer portal. Cancellation takes effect at the end of the current billing period — access continues until then.
- Cancellation does not refund the current period's payment unless the cancellation occurs within the 14-day review window described above and the membership has not been materially used.
- Annual subscriptions cancelled within the 14-day review window are eligible for a full refund. Annual subscriptions cancelled after the 14-day window continue until the end of the annual term.

In demo mode, no subscription is created, so no cancellation or refund is required.

## How refunds are processed

When a real provider (Whop) is connected, refunds are **processed by the provider**, not by this site. Card details are never collected on this site; the provider holds the payment instrument and can refund it directly.

The provider's dashboard is the primary channel for refund requests. The contact page is the fallback for cases where the dashboard is unavailable or the request is unusual (for example, a refund for a course access issue that began after the 14-day window).

## What this policy does not cover

This policy does not cover:

- **Refunds for products purchased from a third party.** If a Margin / Form product is ever sold through a marketplace or bundle, the marketplace's refund policy applies.
- **Refunds for change of mind after substantial use.** Beyond the 14-day window, refunds are at the discretion of the practice and are typically only issued for material access problems or product defects.
- **Refunds of fees charged by the payment provider** (for example, currency-conversion fees). Those are determined by the provider and the card issuer.

## Changes to this policy

This policy may be updated as the demonstration evolves. The date of the most recent revision is shown below. Material changes — for example, connecting a real provider or changing the review window — will be reflected here in plain language before they take effect.

## Contact

Refund questions can be raised through the [contact page](/contact) or, when a real provider is connected, through the provider's customer dashboard. In demo mode, the contact form simulates submission and does not deliver a message; the composed text can be copied to your clipboard and pasted into your own email client.

---

_Last revised: editorial draft for the demonstration. Real legal review required before commercial activation._`;

export default function RefundPolicyPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Legal · Refund policy</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              Refund policy.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              The intended refund terms for when real payments are activated —
              and an honest statement that no purchase occurs in demo mode.
            </p>
            <p className="mt-6 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
              Demonstration · Not legal advice
            </p>
          </div>
        </div>
      </section>

      {/* ============ BODY ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-8 space-y-6">
                <div>
                  <p className="eyebrow text-[var(--clay)] mb-2">At a glance</p>
                  <dl className="space-y-3 text-sm">
                    <div className="border-b border-[var(--rule)] pb-3">
                      <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                        Review window
                      </dt>
                      <dd className="mt-1 font-display text-base">
                        14 days, courses &amp; products
                      </dd>
                    </div>
                    <div className="border-b border-[var(--rule)] pb-3">
                      <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                        Membership
                      </dt>
                      <dd className="mt-1 font-display text-base">
                        Cancel anytime, end of period
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                        Demo mode
                      </dt>
                      <dd className="mt-1 font-display text-base text-[var(--clay)]">
                        No purchase, no refund
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-[var(--rule)] pt-5">
                  <p className="eyebrow text-[var(--warm-gray)] mb-2">
                    Related
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/terms"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Privacy policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/support"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
            <div className="lg:col-span-9 reading-column">
              <Markdown content={REFUND_BODY} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEMO DISCLOSURE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="container-editorial py-12 md:py-14">
          <div className="flex items-start gap-4">
            <span className="num-marker text-[var(--clay)] shrink-0 mt-1">
              ※
            </span>
            <p className="text-sm md:text-base text-[var(--paper)]/85 leading-relaxed max-w-3xl text-pretty">
              This policy describes a portfolio demonstration and the intended
              terms for live mode. No legal entity, registered address, or
              financial guarantee is implied. Real legal review is required
              before commercial activation.{" "}
              <Link
                href="/demo-information"
                className="text-[var(--paper)] underline underline-offset-2 hover:text-[var(--clay)]"
              >
                Read the full disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
