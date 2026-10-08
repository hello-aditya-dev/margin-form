import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support for your Margin / Form purchase — product access, payment routing, subscription management, course access, and response expectations. Honest about demo behaviour.",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    n: "01",
    eyebrow: "Product access",
    title: "How downloads and courses are delivered.",
    body: [
      "In live mode, downloadable products are delivered as direct file links from the order confirmation page and the receipt email. Courses are accessed from a private URL on the site after purchase.",
      "In demo mode, no real access is granted. The demo checkout flow ends on a confirmation screen that simulates the journey without producing a real order, a real download link, or a real account. Free preview PDFs on product and resource pages are the only files actually delivered — those work as plain downloads.",
    ],
  },
  {
    n: "02",
    eyebrow: "Payment support",
    title: "Where payment questions are routed.",
    body: [
      "In live mode, payment is handled by a hosted checkout provider (Whop). Card details are never collected on this site. Refunds, failed charges, receipts, and tax documents are managed inside the provider's dashboard — and most payment questions can be resolved there directly.",
      "In demo mode, no payment is taken. The checkout button demonstrates the journey, the order-confirmation screen is a mock, and no charge is processed. When a real provider is connected, purchase questions are routed to Whop's support first; the contact form on this site is the fallback for anything Whop cannot resolve.",
    ],
  },
  {
    n: "03",
    eyebrow: "Subscription management",
    title: "Cancelling or changing your membership.",
    body: [
      "The Practice Room membership runs monthly or annually. In live mode, you can cancel, pause, or switch plans from inside the provider's customer portal — the link arrives in the receipt email and is also available from the membership page.",
      "In demo mode, no subscription is created, so there is nothing to cancel. The plan selector on the membership page demonstrates the choice; the checkout that follows is a mock. When a real provider is connected, the cancellation flow is managed by that provider, not by this site.",
    ],
  },
  {
    n: "04",
    eyebrow: "Course access",
    title: "Lifetime access, no expiry.",
    body: [
      "Self-paced courses come with lifetime access to the current version of the materials — text, frameworks, and worksheets. There is no expiry, no recurring fee, and no access window. Future editions are sold separately; existing owners keep access to the edition they bought.",
      "In demo mode, no real course access is created. The course pages show the curriculum, the preview lesson, and the purchase flow as a demonstration. When the site goes live, course access is delivered through the same hosted-checkout provider as the rest of the catalogue.",
    ],
  },
  {
    n: "05",
    eyebrow: "Response expectations",
    title: "When to expect a reply.",
    body: [
      "In live mode, responses are typically within two business days. There is no formal SLA, no guaranteed first-response time, and no ticketing system — the contact form is read by a person, not a queue.",
      "In demo mode, no message is delivered, so no reply is possible. The contact form simulates submission, shows you the composed message, and offers a copy-to-clipboard button so you can paste it into your own email client if you would like to actually reach a person.",
      "No support commitment is implied in demo mode. The honest version of this section will be published when a real provider, real inbox, and real person are connected.",
    ],
  },
];

export default function SupportPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Support</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              Support for your purchase.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              Product access, payment routing, subscription management, course
              access, and response expectations — explained honestly, including
              how each one differs in demonstration mode.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTIONS ============ */}
      {SECTIONS.map((section) => (
        <section
          key={section.n}
          className="border-b border-[var(--rule)] bg-[var(--paper-deep)] even:bg-[var(--paper)]"
        >
          <div className="container-editorial py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-5">
                  <span className="num-marker text-[var(--clay)]">
                    {section.n}
                  </span>
                  <span className="eyebrow">{section.eyebrow}</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.015em] leading-[1.1] font-normal text-balance">
                  {section.title}
                </h2>
              </div>
              <div className="lg:col-span-8 reading-column space-y-4">
                {section.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-[var(--ink-soft)] leading-relaxed text-pretty"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============ CONTACT CTA ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="num-marker text-[var(--clay)]">06</span>
                <span className="eyebrow">Still need help</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
                Write to the practice.
              </h2>
              <p className="mt-5 max-w-2xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                If none of the above answers your question, use the contact
                form. In demo mode, the form simulates submission and shows you
                the composed message; no real message is delivered.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/contact"
                className="btn-ink inline-flex items-center gap-2 px-7 py-3.5 font-mono-label"
              >
                Go to contact
                <ArrowUpRight size={16} aria-hidden />
              </Link>
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
              Margin / Form is a portfolio demonstration. No real purchases,
              subscriptions, or support requests occur in demo mode. The
              support information above describes both the intended live
              behaviour and the current demo behaviour.{" "}
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
