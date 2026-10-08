import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/content/journal";
import { founder } from "@/content/founder";
import { Markdown } from "@/components/editorial/markdown";
import { ArticleHero } from "@/components/editorial/article-hero";
import { ReadingProgress } from "@/components/editorial/reading-progress";
import { NewsletterForm } from "@/components/forms/newsletter-form";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return { title: "Not found" };
  }
  const title = `${article.title}`;
  return {
    title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} · Margin / Form`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: [article.category],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} · Margin / Form`,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) {
    notFound();
  }
  const article = articles[index];
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <>
      <ReadingProgress />

      <ArticleHero article={article} />

      {/* ============ ARTICLE BODY ============ */}
      <article className="border-b border-[var(--rule)]">
        <div className="container-editorial py-14 md:py-20">
          <div className="mx-auto reading-column">
            <Markdown content={article.body} />

            {/* Exercise callout */}
            {article.exercise && (
              <aside
                className="mt-12 md:mt-16 p-7 md:p-9 bg-[var(--paper-deep)] border-l-2 border-[var(--clay)]"
                aria-labelledby="exercise-heading"
              >
                <p className="font-mono-label text-[var(--clay)] mb-3">
                  Exercise · Try this
                </p>
                <h2
                  id="exercise-heading"
                  className="font-display text-2xl md:text-3xl tracking-[-0.02em] leading-[1.1] font-normal text-balance mb-3"
                >
                  {article.exercise.title}
                </h2>
                <p className="text-[var(--ink-soft)] leading-relaxed text-pretty md:text-[1.0625rem]">
                  {article.exercise.body}
                </p>
              </aside>
            )}

            {/* Article footer — byline restated + back link */}
            <footer className="mt-12 pt-8 border-t border-[var(--rule)]">
              <p className="font-mono-label text-[var(--warm-gray)] mb-1">
                Written by
              </p>
              <p className="text-[var(--ink)]">
                {article.author} · {founder.role}
              </p>
              <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                {founder.name} is a fictional independent creative-business
                educator. This essay is original demonstration prose; no
                external studies or named third parties are cited.
              </p>
              <Link
                href="/journal"
                className="mt-6 inline-flex items-center gap-1.5 font-mono-label text-[var(--ink)] hover:text-[var(--clay)] transition-colors link-underline"
              >
                <ArrowLeft size={12} />
                Back to the Journal
              </Link>
            </footer>
          </div>
        </div>
      </article>

      {/* ============ RELATED RESOURCES + RELATED OFFER ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Related resources */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">Related reading</span>
              </div>
              <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                {article.relatedResources.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="group flex items-center justify-between gap-4 py-5 hover:px-2 transition-all"
                    >
                      <span className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-snug text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors text-pretty">
                        {r.title}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related offer */}
            <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">If this was useful</span>
              </div>
              <div className="editorial-card p-7 md:p-8 flex flex-col gap-5">
                <p className="font-mono-label text-[var(--warm-gray)]">
                  Take it further
                </p>
                <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] leading-[1.1] font-normal text-balance">
                  {article.relatedOffer.title}
                </h3>
                <div className="flex items-baseline justify-between gap-3 pt-2">
                  <span className="font-mono text-base text-[var(--clay)]">
                    {article.relatedOffer.price}
                  </span>
                  <Link
                    href={article.relatedOffer.href}
                    className="btn-ink inline-flex items-center gap-2 px-5 py-3 font-mono-label group"
                  >
                    View the offer
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-xs text-[var(--warm-gray)] leading-relaxed">
                A paid demonstration product. Checkout is simulated in demo
                mode — no payment is processed.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER INVITATION ============ */}
      <section
        className="border-b border-[var(--rule)]"
        aria-labelledby="article-newsletter-heading"
      >
        <div className="container-editorial py-14 md:py-20">
          <div className="mx-auto reading-column">
            <div className="flex items-center gap-3 mb-5">
              <span className="num-marker text-[var(--clay)]">03</span>
              <span className="eyebrow">The Monday Letter</span>
            </div>
            <h2
              id="article-newsletter-heading"
              className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] font-normal text-balance mb-4"
            >
              Get the next essay in your inbox, quietly.
            </h2>
            <p className="text-[var(--ink-soft)] text-base md:text-lg leading-relaxed text-pretty mb-8">
              One short note on Monday mornings. No tracking, no urgency, no
              third parties. You can leave at any time.
            </p>
            <NewsletterForm
              variant="inline"
              labeledBy="article-newsletter-heading"
            />
          </div>
        </div>
      </section>

      {/* ============ CONTINUE READING — prev / next ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-14 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">04</span>
            <span className="eyebrow">Continue reading</span>
          </div>
          <nav
            aria-label="More essays"
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]"
          >
            {prev ? (
              <Link
                href={`/journal/${prev.slug}`}
                className="group flex flex-col gap-3 p-7 md:p-9 bg-[var(--paper)] hover:bg-[var(--ivory)] transition-colors"
              >
                <span className="flex items-center gap-2 font-mono-label text-[var(--warm-gray)]">
                  <ArrowLeft size={12} />
                  Previous · {prev.issue}
                </span>
                <span className="font-display text-2xl md:text-3xl tracking-[-0.02em] leading-[1.1] font-normal text-balance text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors">
                  {prev.title}
                </span>
                <span className="font-mono-label text-[var(--warm-gray)] mt-auto pt-3">
                  {prev.category} · {prev.readingTime}
                </span>
              </Link>
            ) : (
              <div className="flex flex-col gap-3 p-7 md:p-9 bg-[var(--paper-deep)]">
                <span className="font-mono-label text-[var(--warm-gray)]">
                  Beginning of the volume
                </span>
                <span className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-snug text-[var(--ink-soft)]">
                  This is the first essay in the journal.
                </span>
                <Link
                  href="/journal"
                  className="mt-auto pt-3 font-mono-label text-[var(--ink)] hover:text-[var(--clay)] transition-colors link-underline inline-flex items-center gap-1.5"
                >
                  <ArrowLeft size={12} />
                  To the contents page
                </Link>
              </div>
            )}

            {next ? (
              <Link
                href={`/journal/${next.slug}`}
                className="group flex flex-col gap-3 p-7 md:p-9 bg-[var(--paper)] hover:bg-[var(--ivory)] transition-colors md:text-right"
              >
                <span className="flex items-center gap-2 font-mono-label text-[var(--warm-gray)] md:justify-end">
                  Next · {next.issue}
                  <ArrowRight size={12} />
                </span>
                <span className="font-display text-2xl md:text-3xl tracking-[-0.02em] leading-[1.1] font-normal text-balance text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors">
                  {next.title}
                </span>
                <span className="font-mono-label text-[var(--warm-gray)] mt-auto pt-3">
                  {next.category} · {next.readingTime}
                </span>
              </Link>
            ) : (
              <div className="flex flex-col gap-3 p-7 md:p-9 bg-[var(--paper-deep)] md:text-right md:items-end">
                <span className="font-mono-label text-[var(--warm-gray)]">
                  End of the current volume
                </span>
                <span className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-snug text-[var(--ink-soft)]">
                  This is the most recent essay in the journal.
                </span>
                <Link
                  href="/journal"
                  className="mt-auto pt-3 font-mono-label text-[var(--ink)] hover:text-[var(--clay)] transition-colors link-underline inline-flex items-center gap-1.5"
                >
                  To the contents page
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </nav>

          <div className="mt-8">
            <Link
              href="/journal"
              className="btn-outline inline-flex items-center gap-2 px-5 py-3 font-mono-label group"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              All essays
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
