/**
 * Path helpers for basePath-aware static asset / raw anchor URLs.
 *
 * `next/link` and `next/router` automatically apply `basePath` from
 * next.config.ts. Raw `<a>` tags do NOT — they must use `withBase()`.
 *
 * In local dev, NEXT_PUBLIC_BASE_PATH is "" so paths are unchanged.
 * In the GitHub Pages export build, it is "/margin-form".
 */
export function withBase(href: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!href.startsWith("/")) return href;
  return `${base}${href}`;
}
