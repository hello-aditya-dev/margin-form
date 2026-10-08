import type { Article } from "@/content/types";

/**
 * ArticleHero — the editorial masthead for an article page.
 *
 * Renders, in order: a meta row (volume · issue · category · reading time),
 * the H1 title, an italic excerpt, the byline, and an art-directed hero band
 * that uses the article's accent color as a magazine-cover field. The hero
 * band carries volume/issue and a large typographic treatment of the title
 * so it can function as a cover plate if the title is shared without context.
 */

const accentMap: Record<
  Article["heroAccent"],
  { bg: string; fg: string; mark: string }
> = {
  clay: { bg: "var(--clay)", fg: "var(--ivory)", mark: "var(--paper)" },
  olive: { bg: "var(--olive)", fg: "var(--ivory)", mark: "var(--paper)" },
  ink: { bg: "var(--ink)", fg: "var(--paper)", mark: "var(--clay)" },
};

function formatBylineDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const accent = accentMap[article.heroAccent];
  const bylineDate = formatBylineDate(article.publishedAt);

  return (
    <header className="border-b border-[var(--rule)]">
      <div className="container-editorial pt-10 md:pt-16 pb-10 md:pb-14">
        {/* Meta row */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8 md:mb-12">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono-label text-[var(--warm-gray)]">
            <span>{article.volume}</span>
            <span aria-hidden className="text-[var(--rule)]">/</span>
            <span>{article.issue}</span>
            <span aria-hidden className="text-[var(--rule)]">/</span>
            <span className="text-[var(--clay)]">{article.category}</span>
          </div>
          <span className="font-mono-label text-[var(--warm-gray)]">
            {article.readingTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.0] font-normal text-balance max-w-5xl">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="mt-6 md:mt-8 font-display italic text-xl md:text-2xl leading-snug text-[var(--ink-soft)] text-pretty max-w-3xl">
          {article.excerpt}
        </p>

        {/* Byline */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-label text-[var(--ink-soft)]">
          <span>
            By <span className="text-[var(--ink)]">{article.author}</span>
          </span>
          <span aria-hidden className="text-[var(--rule)]">·</span>
          <time dateTime={article.publishedAt}>{bylineDate}</time>
        </div>
      </div>

      {/* Art-directed hero band — magazine cover plate */}
      <div
        className="paper-grain relative overflow-hidden"
        style={{ background: accent.bg, color: accent.fg }}
        role="img"
        aria-label={`${article.volume}, ${article.issue}: ${article.title}`}
      >
        <div className="container-editorial py-10 md:py-16">
          <div className="min-h-[200px] md:min-h-[280px] flex flex-col justify-between gap-10">
            {/* Top: volume + seal */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span
                  className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase opacity-90"
                >
                  {article.volume} · {article.issue}
                </span>
                <span
                  className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase opacity-70"
                >
                  {article.category}
                </span>
              </div>
              <span
                className="font-display text-2xl md:text-3xl leading-none"
                style={{ color: accent.mark }}
                aria-hidden
              >
                M/F
              </span>
            </div>

            {/* Middle: large typographic treatment of the title */}
            <div className="flex-1 flex items-center">
              <p
                className="font-display font-normal tracking-[-0.02em] leading-[0.95] text-balance max-w-5xl"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                }}
              >
                {article.title}
              </p>
            </div>

            {/* Bottom: publication mark + reading time */}
            <div className="flex items-end justify-between gap-4 pt-5 border-t"
              style={{ borderColor: `${accent.fg}33` }}
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase opacity-80">
                The Margin / Form Journal
              </span>
              <span
                className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase"
                style={{ color: accent.mark }}
              >
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative corner mark */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 pointer-events-none"
          style={{
            background: `linear-gradient(225deg, ${accent.mark}22 0%, transparent 55%)`,
          }}
        />
      </div>
    </header>
  );
}
