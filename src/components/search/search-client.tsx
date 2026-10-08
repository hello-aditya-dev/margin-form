"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { track } from "@/lib/analytics/taxonomy";
import { searchIndex, type SearchEntry } from "@/lib/content/search-index";
import { cn } from "@/lib/utils";

/**
 * SearchClient — client-side search UI.
 *
 * Filters the structured `searchIndex` over title + description with light
 * normalisation (case-fold, punctuation strip). 150ms input debounce keeps
 * the UI stable while typing. Tracks `site_search` on query change and
 * `search_result_click` on result navigation.
 */

const TYPE_LABEL: Record<SearchEntry["type"], string> = {
  course: "Course",
  product: "Product",
  article: "Essay",
  resource: "Resource",
  page: "Page",
};

const TYPE_COLOR: Record<SearchEntry["type"], string> = {
  course: "text-[var(--clay)]",
  product: "text-[var(--olive)]",
  article: "text-[var(--ink)]",
  resource: "text-[var(--clay)]",
  page: "text-[var(--warm-gray)]",
};

/** A small featured set shown when the query is empty. */
const SUGGESTED_HREFS = [
  "/courses/the-independent-practice",
  "/resources/studio-audit",
  "/shop/the-pricing-workbook",
  "/journal/how-to-talk-about-pricing-before-sending-a-proposal",
  "/membership",
];

function suggestedEntries(): SearchEntry[] {
  const byHref = new Map(searchIndex.map((e) => [e.href, e]));
  const out: SearchEntry[] = [];
  for (const href of SUGGESTED_HREFS) {
    const entry = byHref.get(href);
    if (entry) out.push(entry);
  }
  return out;
}

/** Strip punctuation and collapse whitespace; lowercase. */
function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function SearchClient() {
  const [query, setQuery] = React.useState("");
  const [debounced, setDebounced] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackedQueryRef = React.useRef("");

  // Debounce the input value (150ms) before we run the filter.
  React.useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebounced(query);
    }, 150);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const results = React.useMemo<SearchEntry[]>(() => {
    const q = normalise(debounced);
    if (!q) return [];
    const tokens = q.split(" ").filter(Boolean);
    return searchIndex
      .filter((entry) => {
        const haystack = normalise(`${entry.title} ${entry.description}`);
        if (!haystack) return false;
        return tokens.every((tok) => haystack.includes(tok));
      })
      .slice(0, 12);
  }, [debounced]);

  // Track site_search when the debounced query changes (non-empty only,
  // and only once per distinct query to avoid spam).
  React.useEffect(() => {
    const q = debounced.trim();
    if (!q) return;
    if (trackedQueryRef.current === q) return;
    trackedQueryRef.current = q;
    track({ type: "site_search", query: q, result_count: results.length });
  }, [debounced, results.length]);

  const showSuggestions = debounced.trim().length === 0;

  return (
    <div className="flex flex-col gap-8">
      {/* ----- Search input ----- */}
      <div className="border-b border-[var(--rule)] pb-3">
        <label htmlFor="site-search" className="sr-only">
          Search the catalogue
        </label>
        <div className="flex items-center gap-4">
          <Search
            size={22}
            className="text-[var(--warm-gray)] shrink-0"
            aria-hidden
          />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder="Search courses, products, essays, pages…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby="search-status"
            className="w-full bg-transparent font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.015em] leading-tight text-[var(--ink)] placeholder:text-[var(--warm-gray)] focus:outline-none"
          />
        </div>
      </div>

      {/* ----- Status line ----- */}
      <div
        id="search-status"
        aria-live="polite"
        className="flex items-center justify-between font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]"
      >
        {showSuggestions ? (
          <span>Start typing to search the catalogue.</span>
        ) : (
          <span>
            {results.length} {results.length === 1 ? "result" : "results"}
            {debounced.trim() ? ` for “${debounced.trim()}”` : ""}
          </span>
        )}
      </div>

      {/* ----- Results / suggestions ----- */}
      {showSuggestions ? (
        <div className="flex flex-col gap-8">
          <div>
            <p className="eyebrow mb-4">Suggested</p>
            <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {suggestedEntries().map((entry) => (
                <ResultRow key={entry.id} entry={entry} />
              ))}
            </ul>
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="border border-[var(--rule)] bg-[var(--ivory)] p-8 md:p-10">
          <p className="font-display text-2xl tracking-tight text-balance">
            No results for “{debounced.trim()}”.
          </p>
          <p className="mt-3 text-[var(--ink-soft)] leading-relaxed text-pretty max-w-xl">
            Try a different term, or browse the{" "}
            <Link
              href="/journal"
              className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
            >
              journal
            </Link>
            ,{" "}
            <Link
              href="/shop"
              className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
            >
              shop
            </Link>
            , or{" "}
            <Link
              href="/courses"
              className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
            >
              courses
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {results.map((entry) => (
            <ResultRow key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ResultRow({ entry }: { entry: SearchEntry }) {
  const onClick = () => {
    track({ type: "search_result_click", href: entry.href });
  };

  return (
    <li>
      <Link
        href={entry.href}
        onClick={onClick}
        className="group flex items-start gap-5 py-5 px-1 -mx-1 hover:bg-[var(--paper-deep)] transition-colors"
      >
        <span
          className={cn(
            "font-mono text-[0.625rem] tracking-[0.2em] uppercase pt-1 shrink-0 w-20",
            TYPE_COLOR[entry.type]
          )}
        >
          {TYPE_LABEL[entry.type]}
        </span>
        <span className="flex-1 min-w-0">
          <span className="flex items-baseline justify-between gap-4">
            <span className="font-display text-xl md:text-2xl tracking-tight leading-tight text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors">
              {entry.title}
            </span>
            {entry.price && (
              <span className="font-mono text-xs text-[var(--warm-gray)] shrink-0">
                {entry.price}
              </span>
            )}
          </span>
          <span className="mt-1.5 block text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-2">
            {entry.description}
          </span>
          {entry.category && (
            <span className="mt-2 block font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
              {entry.category}
            </span>
          )}
        </span>
        <ArrowUpRight
          size={16}
          className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0 mt-1"
          aria-hidden
        />
      </Link>
    </li>
  );
}
