import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/editorial/markdown";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Margin / Form portfolio demonstration. What the demo collects, what it does not, consent, third parties, and data subject rights. Real legal review required before commercial activation.",
  robots: { index: false, follow: false },
};

const PRIVACY_BODY = `## What this is

This privacy policy describes the **Margin / Form portfolio demonstration**. Margin / Form is a fictional creator business built as a flagship demonstration for a web-development studio. No legal entity is implied. The policy below describes what the demonstration actually does today, and what is intended when a real provider is connected.

Real legal review is required before commercial activation. The wording on this page is editorial, not legal advice, and is not a substitute for review by a qualified professional in the jurisdiction where the business will operate.

## What the demonstration collects

In demo mode, the site collects **no personal information** from visitors:

- The contact form validates inputs locally and simulates submission. No name, email address, subject, or message body is stored or transmitted.
- The newsletter form validates the email address locally and simulates subscription. No email address is stored, sent, or appended to a list.
- The checkout flow is a mock. No payment instrument, billing name, billing address, or order is created. The demo state used to render the confirmation screen is held in \`sessionStorage\` and is cleared when the browser tab is closed.
- No account system is present. There is no login, no profile, and no persistent identifier tied to a visitor.

The site does set a single **theme preference** cookie (or \`localStorage\` entry, depending on browser settings) when a visitor changes between light and dark mode. This preference contains no identifying information and is not shared with any third party.

## Analytics

The site includes a small first-party analytics layer. In demo mode the layer is a **no-op**: events are logged to the browser console for transparency during development and are not transmitted anywhere.

Events contain **no personally identifiable information**. They include the type of interaction (for example, \`page_view\`, \`site_search\`, \`checkout_start\`, \`newsletter_form_start\`) and a small amount of context — the search query typed, the course slug viewed, the plan selected, or the offer being checked out. The search query is treated as user input and is never associated with a name or email address.

When a real analytics provider is connected, this section will be updated to describe what is sent, where it is stored, how long it is retained, and how to opt out.

## Cookies

The demonstration uses **no advertising, marketing, or tracking cookies**. The only client-side storage is:

- A theme preference (light or dark mode), set only when a visitor actively changes the theme.
- \`sessionStorage\` entries used by the demo checkout flow, cleared automatically when the browser tab closes.

No consent banner is shown because no non-essential cookies are set. When a real provider is connected, the cookie position will be reviewed and a consent mechanism added if required by applicable law.

## Third parties

**No third-party services are active in demo mode.** No payment provider, email provider, analytics provider, help-desk provider, or advertising network receives any data from this site today.

The demonstration is built to integrate with the following providers when activated commercially:

- **Whop** — hosted checkout for courses, products, and membership. When activated, purchase buttons route to Whop-hosted checkout pages. Card details are collected by Whop, not by this site.
- **Kit** (formerly ConvertKit) — newsletter delivery. When activated, the newsletter form submits to Kit, which stores the email address and sends the Monday Letter.
- **An email or form provider** (to be selected) — for routing contact form submissions to a real inbox.

Each provider has its own privacy policy and its own data handling practices. When a provider is activated, this section will be updated with a direct link to that provider's privacy policy and a plain-language description of what is shared.

## Data subject rights

Because the demonstration collects no personal information, there is no personal information to access, correct, export, or delete.

When a real provider is activated, data subject rights will apply to the data that provider collects — for example, the right to access, correct, or delete an email address held by the newsletter provider, or the right to export or delete a customer record held by the payment provider. The contact page will be the channel for exercising those rights, and this section will be updated with the specific process for each provider and jurisdiction.

## Children

The demonstration is not directed at children under 16, and no personal information is knowingly collected from children. When a real provider is connected, age-gating and parental-consent requirements will be reviewed against the jurisdictions where the business operates.

## Changes to this policy

This policy may be updated as the demonstration evolves. The date of the most recent revision is shown below. Material changes — for example, connecting a new provider or changing what is stored — will be reflected here in plain language before they take effect.

## Contact

Questions about this policy can be sent through the [contact page](/contact). In demo mode, the contact form simulates submission and does not deliver a message; the composed text can be copied to your clipboard and pasted into your own email client.

---

_Last revised: editorial draft for the demonstration. Real legal review required before commercial activation._`;

export default function PrivacyPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Legal · Privacy</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              Privacy policy.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              What the Margin / Form demonstration collects, what it does not,
              and what is intended when a real provider is connected.
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
                  <p className="eyebrow text-[var(--clay)] mb-2">Status</p>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                    Portfolio demonstration. No personal information is
                    collected in demo mode.
                  </p>
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
                        href="/refund-policy"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Refund policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/accessibility"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Accessibility
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/demo-information"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Demo information
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
            <div className="lg:col-span-9 reading-column">
              <Markdown content={PRIVACY_BODY} />
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
              This policy describes a portfolio demonstration. No legal entity,
              registered address, or VAT number is implied. Real legal review
              is required before commercial activation.{" "}
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
