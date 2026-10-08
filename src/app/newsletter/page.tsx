import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export const metadata: Metadata = {
  title: "The Monday Letter",
  description:
    "One useful idea for a better independent practice. A short Monday letter on pricing, positioning, clients, systems, and independent work. Planned weekly. Demonstration mode.",
  robots: { index: false, follow: true },
};

const CATEGORIES: { n: string; title: string; description: string }[] = [
  {
    n: "01",
    title: "Pricing",
    description:
      "How to reason about price — capacity, costs, scope, value — and how to defend a price without flinching.",
  },
  {
    n: "02",
    title: "Positioning",
    description:
      "The discipline of being specific enough that the right clients recognise themselves and the wrong ones self-select out.",
  },
  {
    n: "03",
    title: "Clients",
    description:
      "Discovery, briefs, scope, and the quiet work of starting a project with the right information.",
  },
  {
    n: "04",
    title: "Systems",
    description:
      "Proposals, delivery rhythm, weekly reviews. The repeatable scaffolding that keeps a practice upright.",
  },
  {
    n: "05",
    title: "Independent Work",
    description:
      "Capacity, conditions, and the longer view of staying independent without burning out.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">The Monday Letter</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                One useful idea for a better independent practice.
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                A short Monday letter on pricing, positioning, clients,
                systems, and independent work. Planned weekly. In demonstration
                mode, no real subscription occurs — but the letter below is a
                faithful sample of what the editions aim to be.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {CATEGORIES.map((c) => (
                  <span
                    key={c.title}
                    className="font-mono text-[0.625rem] tracking-[0.15em] uppercase border border-[var(--rule)] text-[var(--ink-soft)] px-3 py-1.5"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <div className="border border-[var(--rule)] bg-[var(--ivory)] p-6">
                <p className="eyebrow text-[var(--clay)]">At a glance</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] pb-3">
                    <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      Cadence
                    </dt>
                    <dd className="font-display text-base">Mondays, weekly</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] pb-3">
                    <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      Length
                    </dt>
                    <dd className="font-display text-base">~500 words</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] pb-3">
                    <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      Cost
                    </dt>
                    <dd className="font-display text-base">Free</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      Status
                    </dt>
                    <dd className="font-display text-base text-[var(--clay)]">
                      Demonstration
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT ARRIVES ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">What arrives</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
                Five subjects, one at a time.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                Each edition takes a single subject — pricing, positioning,
                clients, systems, or independent work — and develops one useful
                idea you can act on in the same week.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ol className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                {CATEGORIES.map((c) => (
                  <li key={c.n} className="py-6 flex gap-6">
                    <span className="num-marker text-[var(--clay)] pt-1 shrink-0">
                      {c.n}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-[var(--ink-soft)] leading-relaxed text-pretty">
                        {c.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ A SAMPLE EDITION ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">03</span>
              <span className="eyebrow">A sample edition</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
              What a Monday Letter looks like.
            </h2>
            <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
              A faithful sample. The masthead, subject line, body, and sign-off
              below are how every edition is shaped.
            </p>

            {/* The letter itself */}
            <article className="mt-12 border border-[var(--rule)] bg-[var(--ivory)] paper-grain">
              {/* Masthead */}
              <header className="border-b border-[var(--rule)] px-8 md:px-12 py-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="font-mono text-[0.625rem] tracking-[0.22em] uppercase text-[var(--warm-gray)]">
                    The Monday Letter
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Vol. 01 · No. 01
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Mon · Oct 13, 2026
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl md:text-3xl tracking-[-0.01em]">
                    Margin <span className="text-[var(--clay)] font-mono text-[0.7em]">/</span> Form
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--clay)]">
                    Pricing
                  </span>
                </div>
              </header>

              {/* Subject line */}
              <div className="px-8 md:px-12 pt-8">
                <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                  Subject
                </p>
                <p className="mt-1 font-display text-xl md:text-2xl tracking-tight leading-tight text-balance">
                  On naming a range before the proposal
                </p>
              </div>

              {/* Body */}
              <div className="px-8 md:px-12 py-8 prose-editorial">
                <p>
                  A common pricing mistake is to wait until the proposal to
                  introduce the number. By then the buyer has already pictured
                  the engagement, and the price arrives as a verdict rather
                  than a piece of information. The conversation gets harder
                  than it needed to be.
                </p>
                <p>
                  There is a quieter alternative: name a range earlier, in
                  plain language, during discovery or in the first reply. Not
                  the final price — a range. “Projects like this usually land
                  between $14,000 and $22,000, depending on scope.” Two
                  sentences. The buyer can absorb the range privately, compare
                  it to their budget, and decide whether to keep talking. You
                  learn the same thing on your side: whether the engagement is
                  real before you spend a week writing it up.
                </p>
                <p>
                  The objection people raise is that a range scares buyers
                  away. In practice, the opposite is more common. A range
                  shortens the early conversation. It filters out the
                  engagements that would have ended at the proposal anyway,
                  and it lets the ones that survive arrive at the proposal
                  with the money already roughly agreed. The proposal becomes
                  a confirmation, not a surprise.
                </p>
                <p className="font-display italic text-[var(--ink-soft)] border-l-2 border-[var(--clay)] pl-4">
                  Name the range. Let the buyer decide whether to keep
                  talking. Then write the proposal.
                </p>
                <p>
                  A note on ranges: make them honest. The lower number should
                  be a price you can deliver good work at. The higher number
                  should be the price the engagement actually costs when the
                  scope is at the larger end. If the range is honest, the
                  conversation that follows is honest too. If the range is a
                  bait price, the proposal will feel like a betrayal, and the
                  client will remember.
                </p>
                <p>
                  Next week: a small framework for declining work that does
                  not fit, without burning the bridge.
                </p>
              </div>

              {/* Sign-off */}
              <footer className="border-t border-[var(--rule)] px-8 md:px-12 py-6">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-display text-lg italic">
                      Until Monday,
                    </p>
                    <p className="font-display text-lg">Elena Mercer</p>
                    <p className="mt-1 font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      Margin / Form · The Monday Letter
                    </p>
                  </div>
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    End of edition
                  </span>
                </div>
              </footer>
            </article>

            <p className="mt-6 text-xs text-[var(--warm-gray)] leading-relaxed">
              Sample edition. The founder is fictional; the frameworks are the
              ones taught across the courses and the journal.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SUBSCRIBE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">04</span>
                <span className="eyebrow">Subscribe</span>
              </div>
              <h2 id="newsletter-heading" className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
                Subscribe to the Monday Letter.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                One letter, one Monday at a time. Unsubscribe any week the
                letter stops being useful.
              </p>
            </div>
            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <NewsletterForm variant="stacked" labeledBy="newsletter-heading" />
              <p className="mt-5 text-xs text-[var(--warm-gray)] leading-relaxed">
                In demonstration mode, no email is stored or sent. When a real
                provider (such as Kit) is connected, this form activates and
                the disclosure updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRIVACY & CONSENT ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <span className="num-marker text-[var(--clay)]">05</span>
                <span className="eyebrow">Privacy & consent</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight leading-tight text-balance">
                What happens to your address.
              </h2>
            </div>
            <div className="lg:col-span-8 reading-column">
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                Margin / Form is currently a demonstration. The newsletter
                form above simulates the subscription interaction — it
                validates the address, shows a success state, and then forgets
                it. No email is stored, no message is sent, no list is
                appended to.
              </p>
              <p className="mt-4 text-[var(--ink-soft)] leading-relaxed text-pretty">
                When a real provider (such as Kit, Buttondown, or a comparable
                service) is connected, this disclosure will update to describe
                exactly what is stored, for how long, and how to unsubscribe
                or request deletion. Read the full{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">06</span>
            <span className="eyebrow">Related</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/journal"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">Read</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  The Journal
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  Longer-form essays on pricing, positioning, clients, and the
                  business of independent work.
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0 mt-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/resources"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">Use</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  Free Resources
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  The Studio Audit, the Proposal Checklist, and the Pricing
                  Starter. Free PDFs, no email required.
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
              In demonstration mode, no email is stored or sent. When a real
              provider (such as Kit) is connected, this form activates and the
              disclosure updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
