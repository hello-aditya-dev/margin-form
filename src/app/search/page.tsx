import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SearchClient } from "@/components/search/search-client";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the Margin / Form catalogue — courses, products, essays from the journal, free resources, and key pages.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">Search</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                Find a course, product, or essay.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-[var(--ink-soft)] leading-relaxed text-pretty">
                A small, considered catalogue — two courses, three products,
                six essays, and three free resources. Type a word or two and
                the index filters as you go.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <p className="eyebrow text-[var(--olive)]">How this works</p>
              <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                The search runs entirely in your browser against a structured
                index of titles and descriptions. No server round-trip, no
                tracking beyond an anonymised event count.
              </p>
              <p className="mt-4 text-sm text-[var(--ink-soft)] leading-relaxed">
                Looking for something specific? Try{" "}
                <Link
                  href="/journal"
                  className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
                >
                  the journal
                </Link>{" "}
                for essays, or{" "}
                <Link
                  href="/resources"
                  className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
                >
                  the resources hub
                </Link>{" "}
                for free downloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SEARCH ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-12 md:py-16">
          <div className="max-w-4xl">
            <SearchClient />
          </div>
        </div>
      </section>

      {/* ============ POPULAR LINKS (fallback when not searching) ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">If you are not sure where to start</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance max-w-2xl">
                A few places readers tend to begin.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                label: "Free Resource",
                title: "The Studio Audit",
                href: "/resources/studio-audit",
                note: "A 14-page positioning and offer review. Free PDF.",
              },
              {
                n: "02",
                label: "Essay",
                title: "How to Talk About Pricing Before Sending a Proposal",
                href: "/journal/how-to-talk-about-pricing-before-sending-a-proposal",
                note: "5 min read · Pricing",
              },
              {
                n: "03",
                label: "Course",
                title: "The Independent Practice",
                href: "/courses/the-independent-practice",
                note: "Eight modules. The flagship course.",
              },
              {
                n: "04",
                label: "Product",
                title: "The Pricing Workbook",
                href: "/shop/the-pricing-workbook",
                note: "A guided workbook for reasoning about price.",
              },
              {
                n: "05",
                label: "Membership",
                title: "The Practice Room",
                href: "/membership",
                note: "A considered space for ongoing practice.",
              },
              {
                n: "06",
                label: "Newsletter",
                title: "The Monday Letter",
                href: "/newsletter",
                note: "One useful idea, each Monday. Demo mode.",
              },
            ].map((item) => (
              <Link
                key={item.n}
                href={item.href}
                className="group editorial-card p-6 flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="num-marker text-[var(--clay)]">{item.n}</span>
                  <span className="eyebrow">{item.label}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed flex-1">
                  {item.note}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono-label text-[var(--clay)] group-hover:text-[var(--ink)] transition-colors">
                  Open <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
