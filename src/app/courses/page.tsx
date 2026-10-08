import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/editorial/section-header";
import { EditorialImage } from "@/components/editorial/editorial-image";
import { CheckoutButton } from "@/components/commerce/checkout-button";
import { courses } from "@/content/courses";
import { faqs } from "@/content/faqs";
import { formatPrice } from "@/lib/commerce/offers";
import { visuals, courseVisualMap } from "@/content/visuals";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Two written courses for independent creative professionals — The Independent Practice (the full system) and The Client Pipeline (a focused follow-on). Self-paced, lifetime access, no video library promised.",
  openGraph: {
    title: "Courses · Margin / Form",
    description:
      "Two written courses for independent creative professionals. Self-paced, lifetime access.",
    type: "website",
    siteName: "Margin / Form",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses · Margin / Form",
    description:
      "Two written courses for independent creative professionals. Self-paced, lifetime access.",
  },
};

export default function CoursesPage() {
  const flagship = courses.find((c) => c.isFlagship) ?? courses[0];
  const secondary = courses.find((c) => !c.isFlagship) ?? courses[1];
  const courseFaqs = faqs.filter((f) => f.category === "Courses").slice(0, 3);

  const flagshipVisual = visuals[courseVisualMap[flagship.slug]];
  const secondaryVisual = visuals[courseVisualMap[secondary.slug]];

  const comparisonRows: {
    label: string;
    flagship: string;
    secondary: string;
  }[] = [
    {
      label: "Audience",
      flagship: flagship.audience,
      secondary: secondary.audience,
    },
    {
      label: "Modules",
      flagship: `${flagship.modules.length} modules · ${flagship.modules.reduce(
        (n, m) => n + m.lessons.length,
        0
      )} lessons`,
      secondary: `${secondary.modules.length} modules · ${secondary.modules.reduce(
        (n, m) => n + m.lessons.length,
        0
      )} lessons`,
    },
    {
      label: "Focus",
      flagship:
        "The full system: positioning, packaging, pricing, pipeline, proposals, delivery, and operating rhythm.",
      secondary:
        "Pipeline specifically: defining the right client, finding opportunities, running discovery, and keeping the pipeline healthy.",
    },
    {
      label: "Best for",
      flagship:
        "Independent creatives who want a calmer, repeatable business system end to end.",
      secondary:
        "Independent creatives whose pipeline is erratic and who want focused habits, not the full system.",
    },
    {
      label: "Format",
      flagship: "Self-paced · written curriculum · worksheets · lifetime access",
      secondary: "Self-paced · written curriculum · worksheets · lifetime access",
    },
    {
      label: "Price",
      flagship: formatPrice(flagship.price),
      secondary: formatPrice(secondary.price),
    },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative border-b border-[var(--rule)] overflow-hidden">
        <div className="container-editorial py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="num-marker text-[var(--clay)]" aria-hidden>
                  01
                </span>
                <span className="eyebrow">Learn</span>
              </div>
              <h1 className="font-display font-normal tracking-[-0.025em] leading-[0.95] text-[clamp(2.5rem,7vw,6rem)] text-balance">
                Courses for the <span className="italic text-[var(--clay)]">independent</span> practice.
              </h1>
              <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                Two written courses for independent creative professionals —
                a flagship that covers the full system and a focused follow-on
                on pipeline. Self-paced, lifetime access, no video library
                promised. Each course has a free preview lesson before you
                decide.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#catalogue"
                  className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
                >
                  Browse the catalogue
                  <ArrowRight size={16} strokeWidth={1.75} />
                </a>
                <Link
                  href="/membership"
                  className="btn-outline px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
                >
                  Or join the membership
                </Link>
              </div>
            </div>

            {/* Right column — meta panel */}
            <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <div className="flex items-baseline justify-between mb-4">
                <span className="eyebrow text-[var(--clay)]">Catalogue</span>
                <span className="num-marker">Autumn 2026</span>
              </div>
              <dl className="space-y-4">
                <div className="flex items-baseline justify-between border-t border-[var(--rule)] pt-3">
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Courses
                  </dt>
                  <dd className="font-display text-2xl tracking-tight">
                    {courses.length}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-[var(--rule)] pt-3">
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Total modules
                  </dt>
                  <dd className="font-display text-2xl tracking-tight">
                    {courses.reduce((n, c) => n + c.modules.length, 0)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-[var(--rule)] pt-3">
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Format
                  </dt>
                  <dd className="font-display text-base tracking-tight text-right">
                    Self-paced · written
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-[var(--rule)] pt-3">
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Access
                  </dt>
                  <dd className="font-display text-base tracking-tight text-right">
                    Lifetime
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED FLAGSHIP ============ */}
      <section
        id="catalogue"
        className="border-b border-[var(--rule)] scroll-mt-20"
      >
        <div className="container-editorial py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="num-marker text-[var(--clay)]" aria-hidden>
              02
            </span>
            <span className="eyebrow">Flagship Course</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance max-w-4xl">
            The full system, end to end.
          </h2>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Cover */}
            <div className="lg:col-span-5">
              <Link href={`/courses/${flagship.slug}`} className="block group">
                <div className="aspect-[3/4] w-full overflow-hidden border border-[var(--rule)] bg-[var(--paper-deep)] transition-colors group-hover:border-[var(--ink)]">
                  <EditorialImage
                    src={flagshipVisual.path}
                    webp={flagshipVisual.webp}
                    alt={flagshipVisual.alt}
                    className="h-full w-full [&_img]:h-full [&_img]:object-cover"
                    sizes="(min-width: 1024px) 40vw, 92vw"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    {flagship.coverLabel}
                  </span>
                  <span className="font-mono text-sm text-[var(--clay)]">
                    {formatPrice(flagship.price)}
                  </span>
                </div>
                <p className="mt-3 text-xs text-[var(--warm-gray)] leading-relaxed">
                  Photographic cover image. The course is a written
                  curriculum; no physical object is shipped.
                </p>
              </Link>
            </div>

            {/* Description + outcomes + CTA */}
            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--clay)]">
                {flagship.coverLabel} · {flagship.modules.length} modules · {flagship.modules.reduce((n, m) => n + m.lessons.length, 0)} lessons
              </span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-[-0.02em] leading-tight">
                {flagship.title}
              </h3>
              <p className="mt-2 italic text-lg text-[var(--ink-soft)]">
                {flagship.tagline}
              </p>
              <p className="mt-5 text-[var(--ink-soft)] leading-relaxed text-pretty">
                {flagship.problemFraming}
              </p>

              <div className="mt-8">
                <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                  What you'll be able to do
                </span>
                <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {flagship.outcomes.map((o, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-[var(--ink-soft)] leading-relaxed"
                    >
                      <span
                        className="num-marker text-[var(--clay)] shrink-0 tabular-nums"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-pretty">{o}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <CheckoutButton
                  offerSlug={flagship.slug}
                  label={`catalogue-flagship`}
                  className="px-7 py-4"
                >
                  Enrol — {formatPrice(flagship.price)}
                  <ArrowRight size={16} strokeWidth={1.75} />
                </CheckoutButton>
                <Link
                  href={`/courses/${flagship.slug}`}
                  className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline inline-flex items-center gap-2"
                >
                  Read the full curriculum <ArrowUpRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECONDARY COURSE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="num-marker text-[var(--olive)]" aria-hidden>
              03
            </span>
            <span className="eyebrow">Specialised Course</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance max-w-4xl">
            A focused follow-on for the pipeline.
          </h2>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 lg:order-2 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--olive)]">
                {secondary.coverLabel} · {secondary.modules.length} modules · {secondary.modules.reduce((n, m) => n + m.lessons.length, 0)} lessons
              </span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-[-0.02em] leading-tight">
                {secondary.title}
              </h3>
              <p className="mt-2 italic text-lg text-[var(--ink-soft)]">
                {secondary.tagline}
              </p>
              <p className="mt-5 text-[var(--ink-soft)] leading-relaxed text-pretty">
                {secondary.problemFraming}
              </p>

              <div className="mt-8">
                <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                  What you'll be able to do
                </span>
                <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {secondary.outcomes.map((o, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-[var(--ink-soft)] leading-relaxed"
                    >
                      <span
                        className="num-marker text-[var(--olive)] shrink-0 tabular-nums"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-pretty">{o}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <CheckoutButton
                  offerSlug={secondary.slug}
                  label={`catalogue-secondary`}
                  className="px-7 py-4"
                >
                  Enrol — {formatPrice(secondary.price)}
                  <ArrowRight size={16} strokeWidth={1.75} />
                </CheckoutButton>
                <Link
                  href={`/courses/${secondary.slug}`}
                  className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline inline-flex items-center gap-2"
                >
                  Read the full curriculum <ArrowUpRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 lg:order-1">
              <Link href={`/courses/${secondary.slug}`} className="block group">
                <div className="aspect-[3/4] w-full overflow-hidden border border-[var(--rule)] bg-[var(--paper-deep)] transition-colors group-hover:border-[var(--ink)]">
                  <EditorialImage
                    src={secondaryVisual.path}
                    webp={secondaryVisual.webp}
                    alt={secondaryVisual.alt}
                    className="h-full w-full [&_img]:h-full [&_img]:object-cover"
                    sizes="(min-width: 1024px) 40vw, 92vw"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    {secondary.coverLabel}
                  </span>
                  <span className="font-mono text-sm text-[var(--olive)]">
                    {formatPrice(secondary.price)}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="04"
            eyebrow="Which Course Is Right for You"
            title="A side-by-side comparison."
            intro="Both courses are self-paced and written. The Independent Practice is the full system; The Client Pipeline is a focused follow-on. Many learners take the flagship first and the pipeline as a deeper second pass."
            className="mb-14"
          />

          <div className="border-t border-b border-[var(--ink)] overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[720px] border-collapse">
              <caption className="sr-only">
                Comparison of The Independent Practice and The Client Pipeline
                courses
              </caption>
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  <th
                    scope="col"
                    className="text-left py-5 pr-6 font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--warm-gray)] align-bottom w-[18%]"
                  >
                    &nbsp;
                  </th>
                  <th
                    scope="col"
                    className="text-left py-5 px-6 align-bottom border-l border-[var(--rule)]"
                  >
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--clay)]">
                      {flagship.coverLabel} · Flagship
                    </span>
                    <span className="block mt-1 font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight">
                      {flagship.title}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="text-left py-5 px-6 align-bottom border-l border-[var(--rule)]"
                  >
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--olive)]">
                      {secondary.coverLabel} · Specialised
                    </span>
                    <span className="block mt-1 font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight">
                      {secondary.title}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 1 ? "bg-[var(--paper-deep)]" : ""}
                  >
                    <th
                      scope="row"
                      className="text-left py-5 pr-6 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] align-top"
                    >
                      {row.label}
                    </th>
                    <td className="py-5 px-6 border-l border-[var(--rule)] text-[var(--ink-soft)] leading-relaxed text-pretty align-top">
                      {row.flagship}
                    </td>
                    <td className="py-5 px-6 border-l border-[var(--rule)] text-[var(--ink-soft)] leading-relaxed text-pretty align-top">
                      {row.secondary}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-[var(--ink)]">
                  <th
                    scope="row"
                    className="text-left py-5 pr-6 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] align-top"
                  >
                    Enrol
                  </th>
                  <td className="py-5 px-6 border-l border-[var(--rule)] align-top">
                    <CheckoutButton
                      offerSlug={flagship.slug}
                      label="compare-flagship"
                      className="px-5 py-3 text-xs"
                    >
                      {formatPrice(flagship.price)} — enrol
                    </CheckoutButton>
                  </td>
                  <td className="py-5 px-6 border-l border-[var(--rule)] align-top">
                    <CheckoutButton
                      offerSlug={secondary.slug}
                      label="compare-secondary"
                      className="px-5 py-3 text-xs"
                    >
                      {formatPrice(secondary.price)} — enrol
                    </CheckoutButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ RELATED FREE CONTENT ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]" aria-hidden>
                  05
                </span>
                <span className="eyebrow">Related Free Content</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance max-w-3xl">
                Read first. Decide after.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/resources"
              className="editorial-card p-7 md:p-9 flex flex-col group"
            >
              <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--olive)]">
                Free resources
              </span>
              <h3 className="mt-4 font-display text-2xl md:text-3xl tracking-[-0.01em] leading-tight">
                Frameworks, audits, and worksheets — at no cost.
              </h3>
              <p className="mt-3 text-[var(--ink-soft)] leading-relaxed text-pretty">
                A small library of free, immediately useful resources for
                independent creatives. A good way to test whether the voice and
                the frameworks fit your practice before you enrol.
              </p>
              <span className="mt-auto pt-6 font-mono-label text-[var(--clay)] group-hover:text-[var(--ink)] transition-colors inline-flex items-center gap-2">
                Browse the resources <ArrowUpRight size={14} strokeWidth={1.75} />
              </span>
            </Link>

            <Link
              href="/journal"
              className="editorial-card p-7 md:p-9 flex flex-col group"
            >
              <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--olive)]">
                The journal
              </span>
              <h3 className="mt-4 font-display text-2xl md:text-3xl tracking-[-0.01em] leading-tight">
                Essays on pricing, positioning, clients, and systems.
              </h3>
              <p className="mt-3 text-[var(--ink-soft)] leading-relaxed text-pretty">
                Longer-form writing on the independent practice. Each essay
                includes a concrete exercise and pointers to related resources
                and offers.
              </p>
              <span className="mt-auto pt-6 font-mono-label text-[var(--clay)] group-hover:text-[var(--ink)] transition-colors inline-flex items-center gap-2">
                Read the journal <ArrowUpRight size={14} strokeWidth={1.75} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FAQ TEASER ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]" aria-hidden>
                  06
                </span>
                <span className="eyebrow">Course FAQ</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                Common questions before enrolling.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The full set of questions — including payment, refunds, and
                accessibility — lives on the{" "}
                <Link
                  href="/faq"
                  className="text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline"
                >
                  FAQ page
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <dl className="divide-y divide-[var(--rule)]">
                {courseFaqs.map((faq, i) => (
                  <div key={i} className="py-6">
                    <dt className="flex gap-4 items-baseline">
                      <span
                        className="num-marker text-[var(--clay)] tabular-nums shrink-0"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg md:text-xl tracking-[-0.01em] leading-snug text-[var(--ink)]">
                        {faq.q}
                      </span>
                    </dt>
                    <dd className="mt-2 pl-8 text-[var(--ink-soft)] leading-relaxed text-pretty">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEMO DISCLOSURE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="container-editorial py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-[var(--paper)]/70">
              Demonstration storefront · no payment is processed in demo mode.
            </p>
            <Link
              href="/faq"
              className="font-mono-label text-[var(--paper)] hover:text-[var(--clay)] transition-colors link-underline self-start md:self-auto"
            >
              Read the demo information →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
