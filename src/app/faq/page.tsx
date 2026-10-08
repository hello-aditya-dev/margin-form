import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/content/faqs";
import { FaqAccordion } from "@/components/editorial/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Margin / Form — the demonstration, courses, pricing, membership, products, newsletter, accessibility, and contact. Honest answers about demo behaviour.",
  robots: { index: false, follow: true },
};

/** Preserve the source-of-truth order from faqs.ts. */
const CATEGORY_ORDER = [
  "About Margin / Form",
  "Courses",
  "Pricing & Payment",
  "Membership",
  "Products",
  "Newsletter",
  "Accessibility",
  "Contact & Support",
] as const;

function slugify(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function FaqPage() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: faqs.filter((f) => f.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">FAQ</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              Frequently asked questions.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              Plain answers to the questions that come up most — about the
              demonstration, the courses, payment, membership, products, the
              newsletter, accessibility, and contact. If your question is not
              here, the{" "}
              <Link
                href="/contact"
                className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
              >
                contact page
              </Link>{" "}
              is the next stop.
            </p>
          </div>
        </div>
      </section>

      {/* ============ INDEX ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-12 md:py-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="num-marker text-[var(--clay)]">02</span>
            <span className="eyebrow">Index</span>
          </div>
          <nav aria-label="FAQ categories">
            <ol className="flex flex-wrap gap-x-6 gap-y-3">
              {grouped.map((g, i) => (
                <li key={g.category} className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#faq-${slugify(g.category)}`}
                    className="font-display text-base md:text-lg tracking-tight link-underline"
                  >
                    {g.category}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      {grouped.map((group, i) => {
        const idPrefix = `faq-${slugify(group.category)}`;
        return (
          <section
            key={group.category}
            id={`faq-${slugify(group.category)}`}
            className="border-b border-[var(--rule)] scroll-mt-24"
          >
            <div className="container-editorial py-16 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="num-marker text-[var(--clay)]">
                      {String(i + 3).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{group.category}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.015em] leading-[1.1] font-normal text-balance">
                    {group.category}.
                  </h2>
                  <p className="mt-4 text-sm text-[var(--warm-gray)] leading-relaxed">
                    {group.items.length}{" "}
                    {group.items.length === 1 ? "question" : "questions"} in
                    this section.
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <FaqAccordion items={group.items} idPrefix={idPrefix} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ============ FOOTER CTA ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">※</span>
            <span className="eyebrow">Still need help</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/contact"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">Write to us</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  Contact
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  Use the contact form to ask about anything not covered here.
                  In demo mode, the form simulates submission without sending.
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0 mt-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/support"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">For purchases</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  Support
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  Product access, payment routing, subscription management, and
                  response expectations.
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0 mt-1"
                aria-hidden
              />
            </Link>
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
              Margin / Form is a portfolio demonstration. The answers above
              describe the demonstration&rsquo;s behaviour honestly, including
              where demo mode differs from a live business.{" "}
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
