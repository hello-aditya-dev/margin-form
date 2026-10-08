import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/content/journal";
import { founder } from "@/content/founder";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Essays on the independent practice — positioning, pricing, clients, systems, and the work of building a creative practice that can sustain itself. A demonstration publication from Margin / Form.",
  openGraph: {
    title: "The Journal · Margin / Form",
    description:
      "Essays on the independent practice — positioning, pricing, clients, systems, and the work of building a creative practice that can sustain itself.",
    type: "website",
  },
};

const CATEGORIES = [
  "All",
  "Pricing",
  "Positioning",
  "Clients",
  "Systems",
  "Independent Work",
] as const;

const accentMap: Record<
  (typeof articles)[number]["heroAccent"],
  { bg: string; fg: string; mark: string }
> = {
  clay: { bg: "var(--clay)", fg: "var(--ivory)", mark: "var(--paper)" },
  olive: { bg: "var(--olive)", fg: "var(--ivory)", mark: "var(--paper)" },
  ink: { bg: "var(--ink)", fg: "var(--paper)", mark: "var(--clay)" },
};

function formatIssueDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function JournalIndexPage() {
  const [featured, ...rest] = articles;
  const featuredAccent = accentMap[featured.heroAccent];

  // Asymmetric grid spans for the editorial list.
  // Alternating 7/5 rhythm with a full-width closing slot for the last item.
  const spans = [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-12",
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24 lg:py-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">01</span>
            <span className="eyebrow">The Journal</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                Essays on the independent practice.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <p className="text-[var(--ink-soft)] text-base md:text-lg leading-relaxed text-pretty">
                Long-form notes on positioning, pricing, clients, systems, and
                the slow work of building a creative practice that can sustain
                itself. Written without the entrepreneurial noise.
              </p>
              <p className="mt-5 font-mono-label text-[var(--warm-gray)]">
                Autumn 2026 · Vol. 01–02 · Nos. 01–06
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ARTICLE ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-10">
            <div className="flex items-center gap-3">
              <span className="num-marker text-[var(--clay)]">02</span>
              <span className="eyebrow">In this issue · The feature</span>
            </div>
            <Link
              href="/journal#contents"
              className="font-mono-label text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
            >
              Skip to contents ↓
            </Link>
          </div>

          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Art-directed hero block */}
            <Link
              href={`/journal/${featured.slug}`}
              className="lg:col-span-7 group block"
              aria-label={`Read: ${featured.title}`}
            >
              <div
                className="paper-grain relative overflow-hidden h-full min-h-[320px] md:min-h-[440px] flex flex-col justify-between p-8 md:p-12"
                style={{ background: featuredAccent.bg, color: featuredAccent.fg }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase opacity-90">
                      {featured.volume} · {featured.issue}
                    </span>
                    <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase opacity-70">
                      {featured.category}
                    </span>
                  </div>
                  <span
                    className="font-display text-2xl md:text-3xl leading-none"
                    style={{ color: featuredAccent.mark }}
                    aria-hidden
                  >
                    M/F
                  </span>
                </div>

                <div className="flex-1 flex items-center py-10">
                  <h2
                    className="font-display font-normal tracking-[-0.02em] leading-[0.98] text-balance"
                    style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.4rem)" }}
                  >
                    {featured.title}
                  </h2>
                </div>

                <div className="flex items-end justify-between gap-4 pt-5 border-t"
                  style={{ borderColor: `${featuredAccent.fg}33` }}
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase opacity-80">
                    The feature
                  </span>
                  <span
                    className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase"
                    style={{ color: featuredAccent.mark }}
                  >
                    {featured.readingTime}
                  </span>
                </div>

                <div
                  aria-hidden
                  className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 pointer-events-none"
                  style={{
                    background: `linear-gradient(225deg, ${featuredAccent.mark}22 0%, transparent 55%)`,
                  }}
                />
              </div>
            </Link>

            {/* Right side: excerpt + CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <p className="font-mono-label text-[var(--clay)] mb-4">
                  {featured.category}
                </p>
                <p className="font-display italic text-xl md:text-2xl leading-snug text-[var(--ink-soft)] text-pretty">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-label text-[var(--warm-gray)]">
                  <span>By {featured.author}</span>
                  <span aria-hidden className="text-[var(--rule)]">·</span>
                  <time dateTime={featured.publishedAt}>
                    {formatIssueDate(featured.publishedAt)}
                  </time>
                  <span aria-hidden className="text-[var(--rule)]">·</span>
                  <span>{featured.readingTime}</span>
                </div>
              </div>

              <div>
                <Link
                  href={`/journal/${featured.slug}`}
                  className="btn-ink inline-flex items-center gap-2 px-6 py-3.5 font-mono-label group/cta"
                >
                  Read the essay
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/cta:translate-x-0.5"
                  />
                </Link>
                <p className="mt-4 text-sm text-[var(--warm-gray)] leading-relaxed max-w-md">
                  The opening essay of the volume. A working argument for why
                  excellence, on its own, does not change who shows up at the
                  door.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ============ CONTENTS — category nav + numbered list ============ */}
      <section
        id="contents"
        className="border-b border-[var(--rule)] scroll-mt-24"
      >
        <div className="container-editorial py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div className="flex items-center gap-3">
              <span className="num-marker text-[var(--clay)]">03</span>
              <span className="eyebrow">Contents · Nos. 02–06</span>
            </div>
            {/* Category navigation */}
            <nav
              aria-label="Journal categories"
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="font-mono-label text-[var(--ink-soft)]"
                >
                  {cat}
                </span>
              ))}
            </nav>
          </div>

          <h2 className="font-display text-3xl md:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance max-w-3xl mb-10 md:mb-14">
            Five further essays, in the order they were filed.
          </h2>

          <ol className="grid grid-cols-1 md:grid-cols-12 gap-px bg-[var(--rule)] border border-[var(--rule)]">
            {rest.map((article, i) => {
              const accent = accentMap[article.heroAccent];
              const issueNo = article.issue.replace(/^No\.\s*/, "");
              return (
                <li
                  key={article.slug}
                  className={cn(
                    "bg-[var(--paper)] flex",
                    spans[i] ?? "md:col-span-12"
                  )}
                >
                  <Link
                    href={`/journal/${article.slug}`}
                    className="group flex w-full flex-col justify-between gap-8 p-7 md:p-9 lg:p-10 hover:bg-[var(--ivory)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="num-marker text-[var(--clay)]">
                          {issueNo}
                        </span>
                        <span className="font-mono-label text-[var(--warm-gray)]">
                          {article.category}
                        </span>
                      </div>
                      <span
                        className="inline-flex h-2.5 w-2.5 rounded-full shrink-0 mt-1.5"
                        style={{ background: accent.bg }}
                        aria-hidden
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display text-2xl md:text-3xl lg:text-[2.1rem] tracking-[-0.02em] leading-[1.08] font-normal text-balance text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-4 text-[var(--ink-soft)] leading-relaxed text-pretty md:text-[1.0625rem]">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-4 pt-4 border-t border-[var(--rule)]">
                      <div className="font-mono-label text-[var(--warm-gray)]">
                        {article.volume} · {article.readingTime}
                      </div>
                      <span className="font-mono-label text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors inline-flex items-center gap-1.5">
                        Read
                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 text-xs text-[var(--warm-gray)] leading-relaxed max-w-2xl">
            The Journal is a demonstration publication of Margin / Form, a
            fictional creator business. Every essay is original editorial prose;
            no external studies, statistics, or named third parties are cited.
          </p>
        </div>
      </section>

      {/* ============ FROM THE FOUNDER ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3">
                <span className="num-marker text-[var(--clay)]">04</span>
                <span className="eyebrow">From the founder</span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <blockquote className="font-display italic text-2xl md:text-3xl leading-snug text-[var(--ink)] text-balance">
                “{founder.statement}”
              </blockquote>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The Journal is where {founder.name} works out the arguments
                behind the curriculum — slowly, in public, one essay at a time.
                It is not a marketing channel. It is the editorial heart of the
                practice.
              </p>
              <div className="mt-6 font-mono-label text-[var(--ink-soft)]">
                {founder.name} · {founder.role}
              </div>
            </div>
            <div className="lg:col-span-3 lg:border-l lg:border-[var(--rule)] lg:pl-8">
              <Link
                href="/about"
                className="btn-outline inline-flex items-center gap-2 px-5 py-3 font-mono-label group"
              >
                Read the founder’s note
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <p className="mt-4 text-xs text-[var(--warm-gray)] leading-relaxed">
                {founder.name} is a fictional educator. The narrative is a
                demonstration identity, not a verified history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER INVITATION ============ */}
      <section
        className="border-b border-[var(--rule)]"
        aria-labelledby="journal-newsletter-heading"
      >
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">05</span>
                <span className="eyebrow">The Monday Letter</span>
              </div>
              <h2
                id="journal-newsletter-heading"
                className="font-display text-3xl md:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance"
              >
                A short letter on Monday mornings.
              </h2>
              <p className="mt-5 text-[var(--ink-soft)] text-base md:text-lg leading-relaxed text-pretty max-w-xl">
                One quiet note from the desk — a working thought, a small
                framework, occasionally an early draft of the next essay. No
                tracking pixels, no urgency theatre.
              </p>
            </div>
            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <NewsletterForm
                variant="inline"
                labeledBy="journal-newsletter-heading"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
