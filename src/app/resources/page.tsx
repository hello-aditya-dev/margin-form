import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { resources } from "@/content/resources";
import { EditorialImage } from "@/components/editorial/editorial-image";
import { visuals } from "@/content/visuals";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Useful things, free. The Studio Audit, the Proposal Checklist, and the Pricing Starter — downloadable PDFs for independent creative professionals.",
  robots: { index: false, follow: true },
};

/**
 * A small art-directed document mockup used in cards.
 * Renders lines of varying width to suggest a real document.
 */
function DocumentMock({
  label,
  pages,
  lines = [85, 70, 90, 60, 78, 65, 82, 55],
  accent = "clay",
  size = "lg",
}: {
  label: string;
  pages: number;
  lines?: number[];
  accent?: "clay" | "olive" | "ink";
  size?: "lg" | "sm";
}) {
  const accentColor =
    accent === "clay" ? "var(--clay)" : accent === "olive" ? "var(--olive)" : "var(--ink)";

  return (
    <div
      className={
        size === "lg"
          ? "aspect-[4/5] w-full border border-[var(--rule)] bg-[var(--ivory)] paper-grain relative overflow-hidden"
          : "aspect-[3/4] w-full border border-[var(--rule)] bg-[var(--ivory)] paper-grain relative overflow-hidden"
      }
      role="img"
      aria-label={`${label} — ${pages} page PDF preview`}
    >
      <div className="flex flex-col h-full p-5">
        <div className="flex items-center justify-between border-b border-[var(--rule)] pb-3">
          <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--warm-gray)] truncate">
            {label}
          </span>
          <span
            className="font-mono text-[0.625rem] tracking-[0.18em] uppercase shrink-0"
            style={{ color: accentColor }}
          >
            FREE
          </span>
        </div>
        <div className="flex-1 py-4 space-y-3">
          {lines.map((w, i) => (
            <div key={i}>
              <div
                className="h-1.5 bg-[var(--rule)] rounded-full"
                style={{ width: `${w}%` }}
              />
              {i < lines.length - 1 && i % 2 === 0 && (
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
          ))}
        </div>
        <div className="border-t border-[var(--rule)] pt-3 flex items-center justify-between">
          <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
            {pages} pages · PDF
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
  );
}

export default function ResourcesPage() {
  const flagship = resources.find((r) => r.isFlagship)!;
  const others = resources.filter((r) => !r.isFlagship);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">Free Resources</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                Useful things, free.
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                Three downloadable PDFs for independent creative professionals:
                a full positioning and offer audit, a one-page proposal
                checklist, and a lightweight pricing starter. No email
                required in demonstration mode.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <p className="eyebrow text-[var(--olive)]">How downloads work</p>
              <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                Every download link on this site resolves to a real file. If
                email gating is ever added, it will clearly distinguish
                simulated capture from real subscription.
              </p>
              <p className="mt-4 text-sm text-[var(--ink-soft)] leading-relaxed">
                Looking for the courses or the shop?{" "}
                <Link
                  href="/courses"
                  className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
                >
                  Browse the catalogue
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FLAGSHIP RESOURCE — THE STUDIO AUDIT ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="num-marker text-[var(--clay)]">02</span>
            <span className="eyebrow">The Flagship Resource</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: the editorial photograph */}
            <div className="lg:col-span-5">
              <EditorialImage
                src={visuals.resourceStudioAudit.path}
                webp={visuals.resourceStudioAudit.webp}
                alt={visuals.resourceStudioAudit.alt}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="border border-[var(--rule)]"
                caption={`The Studio Audit — ${flagship.preview.pages}-page PDF, free.`}
              />
            </div>

            {/* Right: description + contents */}
            <div className="lg:col-span-7 lg:pl-4">
              <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--clay)]">
                Self-assessment · {flagship.preview.pages} pages
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
                {flagship.title}
              </h2>
              <p className="mt-3 italic text-lg text-[var(--ink-soft)] text-pretty">
                {flagship.tagline}
              </p>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty max-w-2xl">
                {flagship.overview}
              </p>

              <div className="mt-8">
                <p className="eyebrow mb-4">What is inside</p>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-[var(--rule)] pt-4">
                  {flagship.contents.map((c, i) => (
                    <li
                      key={c}
                      className="flex items-baseline gap-3 text-sm"
                    >
                      <span className="num-marker text-[var(--clay)] shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[var(--ink)]">{c}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10">
                <Link
                  href={`/resources/${flagship.slug}`}
                  className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
                >
                  Get the audit (free) <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OTHER RESOURCES ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">Also Available</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
                Two smaller resources.
              </h2>
            </div>
            <p className="md:max-w-sm text-sm text-[var(--ink-soft)] leading-relaxed">
              A one-page proposal checklist and a five-page pricing starter —
              the right size for a single sitting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-8">
            {others.map((r, i) => {
              const accent = i === 0 ? "olive" : "ink";
              return (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="group block"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="num-marker text-[var(--clay)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{r.category}</span>
                  </div>
                  <DocumentMock
                    label={r.title.toUpperCase()}
                    pages={r.preview.pages}
                    accent={accent}
                    size="sm"
                    lines={[80, 65, 88, 70, 55, 75]}
                  />
                  <div className="mt-5">
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 italic text-[var(--ink-soft)] text-pretty">
                      {r.tagline}
                    </p>
                    <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                      {r.overview}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono-label text-[var(--clay)] group-hover:text-[var(--ink)] transition-colors">
                      View <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ DOWNLOAD NOTE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="container-editorial py-12 md:py-14">
          <div className="flex items-start gap-4">
            <span className="num-marker text-[var(--clay)] shrink-0 mt-1">
              ※
            </span>
            <p className="text-sm md:text-base text-[var(--paper)]/85 leading-relaxed max-w-3xl text-pretty">
              All free-file downloads resolve to real files. Email gating, if
              implemented, will clearly distinguish simulated capture from
              real subscription.
            </p>
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">04</span>
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
                  Essays on positioning, pricing, clients, systems, and the
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
              href="/courses"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">Learn</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  The Courses
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  The Independent Practice and The Client Pipeline — two
                  courses, one coherent system.
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
    </>
  );
}
