import type { Article } from "@/content/types";
import { EditorialImage } from "@/components/editorial/editorial-image";
import { visuals, journalVisualMap } from "@/content/visuals";

/**
 * ArticleHero — the editorial masthead for an article page.
 *
 * Renders, in order: a meta row (volume · issue · category · reading time),
 * the H1 title, an italic excerpt, the byline, and a wide editorial
 * photograph sourced from the journal visual manifest. The photograph is
 * loaded eagerly (priority) because it sits above the fold on the article
 * page and is the LCP element.
 */

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
  const bylineDate = formatBylineDate(article.publishedAt);
  const visualKey = journalVisualMap[article.slug];
  const visual = visualKey ? visuals[visualKey] : undefined;

  return (
    <header className="border-b border-[var(--rule)]">
      <div className="container-editorial pt-10 md:pt-16 pb-10 md:pb-12">
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

      {/* Editorial photograph — wide landscape hero (priority / LCP) */}
      {visual && (
        <div className="container-editorial pb-10 md:pb-14">
          <EditorialImage
            src={visual.path}
            webp={visual.webp}
            alt={visual.alt}
            priority
            sizes="(max-width: 1024px) 100vw, 1280px"
            overlay="ink-15"
            className="aspect-[16/9] md:aspect-[21/9] border border-[var(--rule)]"
            caption={`The Margin / Form Journal · ${article.volume} · ${article.issue} · ${article.readingTime}`}
          />
        </div>
      )}
    </header>
  );
}
