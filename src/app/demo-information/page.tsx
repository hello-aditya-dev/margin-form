import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Demo Information",
  description:
    "The full disclosure for the Margin / Form portfolio demonstration. What is real, what is not, the commercial activation path, the integration status table, and the trademark and domain disclaimer.",
  robots: { index: false, follow: true },
};

const INTEGRATION_ROWS = [
  {
    surface: "Checkout",
    demo: "Demo mode",
    live: "Whop hosted-ready",
    note: "PAYMENTS_MODE=hosted + WHOP_CHECKOUT_* env vars route purchase buttons to Whop-hosted pages.",
  },
  {
    surface: "Newsletter",
    demo: "Demo mode",
    live: "Kit-ready",
    note: "When a Kit (or comparable) provider is connected, the Monday Letter form activates and the disclosure updates.",
  },
  {
    surface: "Contact",
    demo: "Demo mode",
    live: "Provider-ready",
    note: "An email or form provider is required to route contact submissions to a real inbox.",
  },
  {
    surface: "Analytics",
    demo: "No-op / console",
    live: "Provider-ready",
    note: "First-party event layer; no PII in events. Console adapter for transparency in demo, no network in production preview.",
  },
  {
    surface: "Search",
    demo: "Fully working",
    live: "Fully working",
    note: "Client-side search over a built index of courses, products, articles, resources, and key pages.",
  },
];

const REAL_ITEMS = [
  "The design — the editorial palette, the typography, the layout system, the components.",
  "The code — Next.js 16, React, TypeScript, Tailwind v4, the routing, the server components, the client islands.",
  "The navigation — the primary nav, the footer, the breadcrumbs, the skip link, the keyboard flow.",
  "The search — a real client-side search over a built index of courses, products, articles, resources, and key pages.",
  "The filtering — the shop category filter, the membership plan selector, the curriculum and FAQ accordions.",
  "The curriculum content — the module structure, lesson summaries, objectives, and assignments across both courses.",
  "The journal articles — six original editorial essays on pricing, positioning, clients, systems, and independent work.",
  "The downloadable preview files — real PDFs served from the public directory for the free resources and product previews.",
  "The form interactions — the newsletter and contact forms validate, simulate submission, and respond honestly.",
  "The demo checkout flow — the journey from product to confirmation, rendered faithfully without processing payment.",
];

const NOT_REAL_ITEMS = [
  "No real payments — the checkout is a mock. No card is charged, no order is created, no receipt is emailed.",
  "No real subscriptions — the membership plans describe the intended offering. No subscription is created.",
  "No real community — The Practice Room page describes the intended membership. No live space is running.",
  "No real email delivery — the Monday Letter form simulates subscription. No email is stored or sent.",
  "No real customer data — the contact form simulates submission. No name, email, or message body is stored.",
  "No fabricated revenue, stats, reviews, or testimonials — any specific figures, scenarios, or social proof in the demonstration are illustrative, not real.",
];

export default function DemoInformationPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Demo Information</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              This is a portfolio demonstration.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              Margin / Form is a fictional creator-led education business built
              as a flagship demonstration for a web-development studio. Every
              page, every interaction, and every line of copy is honest about
              what it is — and what it is not.
            </p>
            <p className="mt-6 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
              Central disclosure · Read first
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHAT THIS IS ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">What this is</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                A fictional creator business, built as a demonstration.
              </h2>
            </div>
            <div className="lg:col-span-8 reading-column space-y-4">
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                Margin / Form is a fictional creator-led education business —
                the kind of independent practice that sells courses, frameworks,
                a membership, and a newsletter to independent creative
                professionals. The brand, the founder, the curriculum, the
                products, the membership, the journal, and the Monday Letter
                are all demonstration content.
              </p>
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                The site is built as a flagship demonstration for a
                web-development studio: a complete, production-quality
                storefront that shows how the studio thinks about editorial
                design, information architecture, commerce, accessibility,
                analytics, and honest disclosure. It is meant to be browsed
                end-to-end, including the legal pages.
              </p>
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                No legal entity is implied. No registered address, no VAT
                number, no company number, and no financial guarantees are
                claimed or represented anywhere on the site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT IS REAL ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">What is real</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                The work underneath the demonstration.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The list at right is what was actually built. None of it is
                mockup; all of it ships in the repository.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="border-t border-[var(--rule)]">
                {REAL_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    className="border-b border-[var(--rule)] py-4 flex gap-5"
                  >
                    <span
                      className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--olive)] shrink-0 w-8 pt-1"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT IS NOT REAL ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">04</span>
                <span className="eyebrow">What is not real</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                What does not happen in demo mode.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                Equally important. The site is honest about each of these on
                the relevant page; this list is the consolidated view.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="border-t border-[var(--rule)]">
                {NOT_REAL_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    className="border-b border-[var(--rule)] py-4 flex gap-5"
                  >
                    <span
                      className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)] shrink-0 w-8 pt-1"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMMERCIAL ACTIVATION PATH ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">05</span>
                <span className="eyebrow">Activation path</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                How demo mode becomes live.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The architecture is built so that activation is a configuration
                step, not a rewrite. Three providers, plus the disclosure copy,
                are what stand between this page and a real business.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ol className="space-y-px border-t border-[var(--rule)]">
                {[
                  {
                    n: "01",
                    title: "Set PAYMENTS_MODE=hosted and connect Whop",
                    body: "Set the PAYMENTS_MODE environment variable to hosted and configure the WHOP_CHECKOUT_* environment variables for each course, product, and membership plan. Purchase buttons immediately route to Whop-hosted checkout pages. Card details are collected by Whop, never on this site.",
                  },
                  {
                    n: "02",
                    title: "Connect Kit for the newsletter",
                    body: "Wire the Monday Letter form to a Kit (or comparable) account. The form already validates the address and tracks the start event; activation adds the real submission. The disclosure on the newsletter page updates automatically once the live submit path is in place.",
                  },
                  {
                    n: "03",
                    title: "Configure a real email provider for contact",
                    body: "Route the contact form to a real inbox — either a transactional email service, a help-desk tool, or a form backend. The form already validates, composes the message, and offers a copy-to-clipboard fallback; activation replaces the simulated submit with the real send.",
                  },
                  {
                    n: "04",
                    title: "Update the disclosure copy",
                    body: "Replace each demo-mode disclosure strip with live-mode wording. Update the legal pages (privacy, terms, refund, accessibility) with the real entity, governing law, and provider details. Run real legal review.",
                  },
                ].map((step) => (
                  <li
                    key={step.n}
                    className="border-b border-[var(--rule)] py-6 flex gap-6"
                  >
                    <span
                      className="num-marker text-[var(--clay)] shrink-0 pt-1"
                      aria-hidden
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl tracking-[-0.005em] leading-tight">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[var(--ink-soft)] leading-relaxed text-pretty">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-[var(--warm-gray)] leading-relaxed">
                A separate integration reference is planned at{" "}
                <code className="font-mono text-[0.7rem] bg-[var(--linen)] px-1.5 py-0.5">
                  /docs/WHOP_INTEGRATION.md
                </code>{" "}
                (the docs file may be created separately). It will document the
                env-var contract, the offer-slug mapping, the URL allowlist,
                and the activation checklist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTEGRATION STATUS TABLE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">06</span>
              <span className="eyebrow">Integration status</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
              What works today, and what is provider-ready.
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[680px]">
              <caption className="sr-only">
                Integration status by surface, showing demo-mode state and
                live-mode readiness
              </caption>
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  <th
                    scope="col"
                    className="text-left font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] py-4 pr-6 align-bottom"
                  >
                    Surface
                  </th>
                  <th
                    scope="col"
                    className="text-left font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] py-4 pr-6 align-bottom"
                  >
                    Demo mode
                  </th>
                  <th
                    scope="col"
                    className="text-left font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] py-4 pr-6 align-bottom"
                  >
                    Live mode
                  </th>
                  <th
                    scope="col"
                    className="text-left font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] py-4 align-bottom"
                  >
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {INTEGRATION_ROWS.map((row, i) => (
                  <tr
                    key={row.surface}
                    className="border-b border-[var(--rule)]"
                  >
                    <th
                      scope="row"
                      className="text-left font-display text-base md:text-lg tracking-tight py-5 pr-6 align-top"
                    >
                      <span className="text-[var(--clay)] font-mono text-[0.625rem] tracking-[0.18em] uppercase mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {row.surface}
                    </th>
                    <td className="text-sm text-[var(--ink-soft)] py-5 pr-6 align-top">
                      {row.demo}
                    </td>
                    <td className="text-sm text-[var(--ink-soft)] py-5 pr-6 align-top">
                      {row.live}
                    </td>
                    <td className="text-sm text-[var(--ink-soft)] py-5 align-top leading-relaxed text-pretty">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ TRADEMARK / DOMAIN DISCLAIMER ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">07</span>
                <span className="eyebrow">Trademark &amp; domain</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                A name, not a verified mark.
              </h2>
            </div>
            <div className="lg:col-span-8 reading-column">
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                <strong className="text-[var(--ink)]">
                  MARGIN / FORM is a fictional demonstration name.
                </strong>{" "}
                It is not a verified available trademark, not a registered
                business name, and not a verified available domain. Trademark
                clearance, domain registration, and entity formation are
                separate steps that must be completed before any commercial
                adoption.
              </p>
              <p className="mt-4 text-[var(--ink-soft)] leading-relaxed text-pretty">
                Legal review is required before commercial adoption —
                including name clearance in the relevant trademark classes,
                domain registration, and confirmation that the name does not
                infringe on any existing mark in the jurisdictions where the
                business will operate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED LEGAL ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">08</span>
            <span className="eyebrow">Related</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                href: "/accessibility",
                label: "Statement",
                title: "Accessibility",
                body: "WCAG 2.2 AA practices, what was done, what automated checks do not establish.",
              },
              {
                href: "/privacy",
                label: "Policy",
                title: "Privacy",
                body: "What the demo collects, what it does not, consent, third parties, data subject rights.",
              },
              {
                href: "/terms",
                label: "Policy",
                title: "Terms",
                body: "No offer of sale, no contract, intellectual property, no warranty, liability exclusion.",
              },
              {
                href: "/refund-policy",
                label: "Policy",
                title: "Refund policy",
                body: "14-day review window for courses and products, membership cancellation, demo-mode statement.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group editorial-card p-6 flex flex-col gap-3"
              >
                <span className="eyebrow">{card.label}</span>
                <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed flex-1">
                  {card.body}
                </p>
                <span className="font-mono-label text-[var(--clay)] inline-flex items-center gap-1.5 mt-1">
                  Read
                  <ArrowUpRight size={12} aria-hidden />
                </span>
              </Link>
            ))}
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
              This is the central disclosure for the Margin / Form portfolio
              demonstration. No legal entity, registered address, VAT number,
              financial guarantee, or verified trademark is implied. Real
              legal, accessibility, and provider review is required before
              commercial activation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
