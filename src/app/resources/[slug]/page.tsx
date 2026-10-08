import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { resources, getResourceBySlug } from "@/content/resources";
import { withBase } from "@/lib/config/paths";
import { CheckoutButton } from "@/components/commerce/checkout-button";

/**
 * Extract an offer slug from a related-offer href.
 *   "/courses/the-independent-practice" → "the-independent-practice"
 *   "/shop/the-proposal-system"         → "the-proposal-system"
 */
function slugFromHref(href: string): string {
  const segments = href.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const resource = getResourceBySlug(slug);
    if (!resource) {
      return {
        title: "Resource not found",
        robots: { index: false, follow: false },
      };
    }
    return {
      title: resource.title,
      description: `${resource.tagline} — ${resource.preview.pages}-page PDF, free.`,
      robots: { index: false, follow: true },
    };
  })();
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const offerSlug = slugFromHref(resource.relatedOffer.href);
  const accent: "clay" | "olive" | "ink" =
    slug === "studio-audit"
      ? "clay"
      : slug === "proposal-checklist"
        ? "olive"
        : "ink";
  const accentColor =
    accent === "clay" ? "var(--clay)" : accent === "olive" ? "var(--olive)" : "var(--ink)";

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: title + download */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">
                  {resource.category} · Free Resource
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                {resource.title}
              </h1>
              <p className="mt-5 italic text-xl md:text-2xl text-[var(--ink-soft)] text-pretty">
                {resource.tagline}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={withBase(resource.preview.href)}
                  download
                  className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download (free)
                </a>
                <Link
                  href="/resources"
                  className="btn-outline px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
                >
                  All resources
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--rule)] pt-6 max-w-md">
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Format
                  </dt>
                  <dd className="mt-1 font-display text-lg">PDF</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Pages
                  </dt>
                  <dd className="mt-1 font-display text-lg">
                    {resource.preview.pages}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Cost
                  </dt>
                  <dd className="mt-1 font-display text-lg text-[var(--clay)]">
                    Free
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right: document mockup */}
            <div className="lg:col-span-5">
              <div
                className="aspect-[4/5] w-full border border-[var(--rule)] bg-[var(--ivory)] paper-grain relative overflow-hidden"
                role="img"
                aria-label={`${resource.title} — ${resource.preview.pages} page PDF preview`}
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex items-center justify-between border-b border-[var(--rule)] pb-3">
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--warm-gray)] truncate">
                      {resource.title.toUpperCase()}
                    </span>
                    <span
                      className="font-mono text-[0.625rem] tracking-[0.18em] uppercase shrink-0"
                      style={{ color: accentColor }}
                    >
                      FREE
                    </span>
                  </div>
                  <div className="flex-1 py-5 space-y-3">
                    {[85, 70, 90, 60, 78, 65, 82, 55, 72, 88, 60, 75].map(
                      (w, i) => (
                        <div key={i}>
                          <div
                            className="h-1.5 bg-[var(--rule)] rounded-full"
                            style={{ width: `${w}%` }}
                          />
                          {i % 3 === 0 && (
                            <div className="mt-2 flex gap-1">
                              {[0, 1, 2].map((j) => (
                                <div
                                  key={j}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ background: "var(--rule)" }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <div className="border-t border-[var(--rule)] pt-3 flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      {resource.preview.pages} pages · PDF
                    </span>
                    <span
                      className="font-display"
                      style={{ color: accentColor }}
                    >
                      M/F
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">Overview</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] font-normal text-balance">
                What this is for.
              </h2>
            </div>
            <div className="lg:col-span-8 reading-column">
              <p className="text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                {resource.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTENTS ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">Contents</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] font-normal text-balance">
                What is inside.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ol className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                {resource.contents.map((c, i) => (
                  <li key={c} className="py-5 flex gap-6">
                    <span className="num-marker text-[var(--clay)] pt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg md:text-xl tracking-tight leading-snug">
                      {c}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOWNLOAD ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">04</span>
              <span className="eyebrow">Download</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
              Download {resource.title}.
            </h2>
            <p className="mt-5 text-[var(--ink-soft)] leading-relaxed text-pretty">
              A {resource.preview.pages}-page PDF. No email required in
              demonstration mode.
            </p>

            <div className="mt-10 border border-[var(--rule)] bg-[var(--ivory)] p-8 md:p-10 text-left">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    File
                  </p>
                  <p className="mt-1 font-display text-xl md:text-2xl tracking-tight">
                    {resource.preview.name}
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--warm-gray)]">
                    {resource.preview.pages} pages · PDF · Free
                  </p>
                </div>
                <a
                  href={withBase(resource.preview.href)}
                  download
                  className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download {resource.title} (PDF)
                </a>
              </div>
            </div>

            <p className="mt-6 text-xs text-[var(--warm-gray)] leading-relaxed max-w-xl mx-auto">
              Free download. In demonstration mode, no email is required and no
              subscription is implied.
            </p>
          </div>
        </div>
      </section>

      {/* ============ RELATED JOURNAL ============ */}
      {resource.relatedJournal.length > 0 && (
        <section className="border-b border-[var(--rule)]">
          <div className="container-editorial py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-6">
                  <span className="num-marker text-[var(--clay)]">05</span>
                  <span className="eyebrow">From the Journal</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] font-normal text-balance">
                  Read alongside.
                </h2>
              </div>
              <div className="lg:col-span-8">
                <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                  {resource.relatedJournal.map((j) => (
                    <li key={j.slug}>
                      <Link
                        href={`/journal/${j.slug}`}
                        className="group flex items-center justify-between gap-6 py-5"
                      >
                        <span className="font-display text-lg md:text-xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                          {j.title}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ RELATED OFFER ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">06</span>
                <span className="eyebrow">Go Further</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
                When the resource is the entry point.
              </h2>
              <p className="mt-5 text-[var(--ink-soft)] leading-relaxed text-pretty">
                A natural next step from {resource.title} — a paid offer that
                develops the same framework in more depth.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="border border-[var(--rule)] bg-[var(--ivory)] p-8 md:p-10">
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
                      Related Offer
                    </p>
                    <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight">
                      {resource.relatedOffer.title}
                    </h3>
                    <p className="mt-3 font-mono text-xs tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      {resource.relatedOffer.price}
                    </p>
                  </div>
                  <CheckoutButton
                    offerSlug={offerSlug}
                    label={`resource-${slug}-related-offer`}
                    variant="ink"
                    className="px-6 py-3.5"
                  >
                    Explore <ArrowRight size={15} />
                  </CheckoutButton>
                </div>
                <p className="mt-6 text-sm text-[var(--ink-soft)] leading-relaxed border-t border-[var(--rule)] pt-5">
                  In demonstration mode, the checkout button opens a working
                  simulated checkout page. No payment is taken.
                </p>
              </div>
            </div>
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
              Free download. In demonstration mode, no email is required and no
              subscription is implied.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
