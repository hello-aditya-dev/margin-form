import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/editorial/markdown";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for the Margin / Form portfolio demonstration. No real offer of sale, no contract, content is fictional, intellectual property of the demonstration, no warranty, liability exclusion. Real legal review required before commercial activation.",
  robots: { index: false, follow: false },
};

const TERMS_BODY = `## What this is

These terms describe the **Margin / Form portfolio demonstration**. Margin / Form is a fictional creator business built as a flagship demonstration for a web-development studio. No legal entity is implied, and these terms do not constitute a real offer of sale.

Real legal review is required before commercial activation. The wording on this page is editorial, not a substitute for review by a qualified professional in the jurisdiction where the business will operate.

## No offer, no contract

In demo mode, **no offer of sale is made and no contract is formed**. The courses, products, and membership described on this site are demonstration content. The checkout flow is a mock: clicking a purchase button simulates the journey, the order-confirmation screen is illustrative, and no transaction, order, account, or delivery obligation is created.

When a real provider is connected, these terms will be replaced with commercial terms that describe offer, acceptance, payment, delivery, and the parties' respective obligations. Until then, nothing on this site is capable of acceptance by you, and no conduct (including clicking a purchase button or completing the demo checkout) amounts to acceptance.

## The content is fictional

The founder, the courses, the products, the membership, the journal articles' authorship voice, and the Monday Letter are **fictional demonstration content**. The journal articles themselves are original editorial writing; the curriculum and frameworks describe a real, working approach to independent creative business — but the business behind them, the persona of the founder, and any specific figures, scenarios, or testimonials that imply a real customer base are demonstration devices.

No employers, degrees, press features, or follower counts are claimed for the founder. No real customer data, revenue figures, or reviews are represented.

## Intellectual property

The design, the code, the editorial writing, the curriculum structure, the journal articles, the design system, the wordmark, and the demonstration content are the intellectual property of the demonstration's author and are presented here as a portfolio piece.

The downloadable preview files referenced on product and resource pages are sample documents; any redistribution, resale, or inclusion of those files in other courses, marketplaces, or paid offerings is not permitted without written permission.

When a real provider is connected and real products are sold, this section will be updated to describe the licence granted to purchasers — including permitted use in client work, prohibited redistribution, and any studio-licensing terms.

## No warranty

The demonstration is provided **as is, without warranty of any kind**. No representation is made that the site will be available, uninterrupted, error-free, or fit for any particular purpose. The curriculum, frameworks, and journal articles are editorial writing about creative-business practice; they are not professional advice — legal, financial, tax, or otherwise.

When a real provider is connected and real products are sold, warranty terms will be added that describe what is guaranteed about the materials, the access period, and the support available.

## Limitation of liability

To the maximum extent permitted by law, the author of the demonstration is not liable for any direct, indirect, incidental, consequential, or special damages arising from access to, use of, or inability to use the demonstration, including any loss of data, business interruption, or loss of anticipated savings.

Because no transaction occurs in demo mode and no payment is taken, no liability for failure to deliver goods or services arises. When a real provider is connected, this section will be reviewed against the actual products, payment flows, and jurisdictions involved.

## Governing law

The governing law and dispute-resolution mechanism **will be determined upon commercial activation**. No jurisdiction is specified in this draft because no contract is formed and no transaction occurs. When a real provider is connected, this section will identify the governing law, the courts or arbitration body with jurisdiction, and the process for raising disputes.

## Changes to these terms

These terms may be updated as the demonstration evolves. The date of the most recent revision is shown below. Material changes — for example, connecting a real provider or starting to accept payment — will be reflected here in plain language before they take effect.

## Contact

Questions about these terms can be sent through the [contact page](/contact). In demo mode, the contact form simulates submission and does not deliver a message; the composed text can be copied to your clipboard and pasted into your own email client.

---

_Last revised: editorial draft for the demonstration. Real legal review required before commercial activation._`;

export default function TermsPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Legal · Terms</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              Terms.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              The terms under which the Margin / Form demonstration is offered.
              No real offer of sale is made and no contract is formed in demo
              mode.
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
                    Portfolio demonstration. No offer of sale, no contract, no
                    transaction in demo mode.
                  </p>
                </div>
                <div className="border-t border-[var(--rule)] pt-5">
                  <p className="eyebrow text-[var(--warm-gray)] mb-2">
                    Related
                  </p>
                  <ul className="space-y-2 text-sm">
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
              <Markdown content={TERMS_BODY} />
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
              These terms describe a portfolio demonstration. No legal entity,
              registered address, or governing law is specified. Real legal
              review is required before commercial activation.{" "}
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
