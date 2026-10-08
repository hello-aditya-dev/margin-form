import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import type { Course } from "@/content/types";
import { CourseCover } from "@/components/editorial/covers";
import { Markdown } from "@/components/editorial/markdown";
import { CheckoutButton } from "@/components/commerce/checkout-button";
import { CurriculumAccordion } from "@/components/course/curriculum-accordion";
import { StickyCheckout } from "@/components/course/sticky-checkout";
import { PreviewDownloadLink } from "@/components/course/preview-download";
import { formatPrice } from "@/lib/commerce/offers";
import { cn } from "@/lib/utils";

const accentColorVar: Record<Course["heroAccent"], string> = {
  clay: "var(--clay)",
  olive: "var(--olive)",
  ink: "var(--ink)",
};

/**
 * Shared course-detail view — rendered by both the static course routes
 * (`/courses/the-independent-practice`, `/courses/the-client-pipeline`)
 * and the dynamic fallback `/courses/[slug]`.
 *
 * Server component. Client interactions live in:
 *  - <CurriculumAccordion /> (module expand/collapse + analytics)
 *  - <StickyCheckout /> (scroll-aware fixed CTA bar)
 *  - <PreviewDownloadLink /> (preview download analytics)
 */
export function CourseView({ course }: { course: Course }) {
  const accent = accentColorVar[course.heroAccent];
  const isFlagship = Boolean(course.isFlagship);
  const heroEyebrow = `${course.coverLabel} · ${isFlagship ? "Flagship Course" : "Specialised Course"}`;

  return (
    <>
      {/* ====================== 01 — HERO ====================== */}
      <section
        id="course-hero"
        className="relative border-b border-[var(--rule)] overflow-hidden"
      >
        <div className="container-editorial py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left column — title, price, CTA */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  01
                </span>
                <span className="eyebrow">{heroEyebrow}</span>
              </div>

              <h1 className="font-display font-normal tracking-[-0.025em] leading-[0.95] text-[clamp(2.5rem,6.5vw,5.5rem)] text-balance">
                {course.title}
              </h1>

              <p className="mt-6 font-display italic text-xl md:text-2xl text-[var(--ink-soft)] leading-snug max-w-2xl text-pretty">
                {course.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-3xl md:text-4xl tracking-[-0.01em] text-[var(--ink)]">
                  {formatPrice(course.price, course.currency)}
                </span>
                <span className="font-mono text-sm tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                  · one-time
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] mr-2">
                  For
                </span>
                {course.audience}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <CheckoutButton
                  offerSlug={course.slug}
                  label={`hero-${course.slug}`}
                  className="px-7 py-4"
                >
                  Enrol — {formatPrice(course.price)}
                  <ArrowRight size={16} strokeWidth={1.75} />
                </CheckoutButton>
                <a
                  href="#preview"
                  className="btn-outline px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
                >
                  Read a preview lesson
                </a>
              </div>

              <p className="mt-6 text-xs text-[var(--warm-gray)] leading-relaxed max-w-xl">
                Demonstration storefront — no payment is processed in demo mode.
                Lifetime access to the current materials.
              </p>
            </div>

            {/* Right column — course cover */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="max-w-md mx-auto lg:max-w-none">
                <CourseCover
                  label={course.coverLabel}
                  title={course.title}
                  tagline={course.tagline}
                  accent={course.heroAccent}
                  price={formatPrice(course.price)}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sentinel for the sticky checkout — observed so the desktop CTA
            bar only appears once the user has scrolled past the hero. */}
        <div id="course-hero-end" aria-hidden className="h-0 w-full" />
      </section>

      {/* ====================== 02 — THE PROBLEM ====================== */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  02
                </span>
                <span className="eyebrow">The Problem</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                The work is only <span className="italic">half</span> the job.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <p className="text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                {course.problemFraming}
              </p>
              <blockquote className="mt-8 border-l-2 border-[var(--clay)] pl-6 font-display italic text-xl md:text-2xl leading-snug text-[var(--ink)]">
                {course.promise}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 03 — WHO IT'S FOR + OUTCOMES ====================== */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  03
                </span>
                <span className="eyebrow">Who It's For</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                For independent creatives who can already do the work.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                {course.audience}
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]" aria-hidden>
                  →
                </span>
                <span className="eyebrow">What You'll Be Able to Do</span>
              </div>
              <ol className="divide-y divide-[var(--rule)]">
                {course.outcomes.map((o, i) => (
                  <li
                    key={i}
                    className="py-4 flex gap-5 items-baseline"
                  >
                    <span
                      className="num-marker text-[var(--clay)] tabular-nums shrink-0 w-8"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--ink)] leading-relaxed text-pretty">
                      {o}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 04 — CURRICULUM ====================== */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  04
                </span>
                <span className="eyebrow">The Curriculum</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                {course.modules.length} modules. Written lessons, frameworks, and assignments.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                Each module is a small, complete unit: a summary, written
                lessons with concrete objectives, a self-directed assignment,
                and an illustrative workload estimate. The first module is
                open below so you can see the shape of the work.
              </p>
              <p className="mt-4 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                {course.modules.reduce((n, m) => n + m.lessons.length, 0)} lessons · {course.modules.length} assignments · self-paced
              </p>
            </div>
          </div>

          <CurriculumAccordion
            modules={course.modules}
            courseSlug={course.slug}
          />
        </div>
      </section>

      {/* ====================== 05 — PREVIEW LESSON ====================== */}
      <section
        id="preview"
        className="border-b border-[var(--rule)] bg-[var(--paper-deep)] scroll-mt-20"
      >
        <div className="container-editorial py-20 md:py-28">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="num-marker"
                style={{ color: accent }}
                aria-hidden
              >
                05
              </span>
              <span className="eyebrow">Preview Lesson · Free to Read</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] font-normal text-balance">
              {course.sampleLesson.title}
            </h2>

            <div className="mt-10 reading-column">
              <Markdown content={course.sampleLesson.body} />
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--rule)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                  Preview download
                </span>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  {course.sampleLesson.worksheetName}
                </p>
              </div>
              <PreviewDownloadLink
                slug={course.slug}
                href={course.sampleLesson.worksheetHref}
              >
                Download the worksheet preview
              </PreviewDownloadLink>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 06 — WHAT'S INCLUDED / NOT PROMISED ====================== */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="num-marker"
              style={{ color: accent }}
              aria-hidden
            >
              06
            </span>
            <span className="eyebrow">What's Included · What's Not Promised</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance max-w-3xl mb-12">
            An honest accounting of what this course is — and is not.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* Included */}
            <div>
              <h3 className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-[var(--olive)] border-t border-[var(--olive)] pt-4">
                What's included
              </h3>
              <ul className="mt-6 space-y-3">
                {course.whatIsIncluded.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[var(--ink)] leading-relaxed"
                  >
                    <Check
                      size={18}
                      strokeWidth={1.75}
                      className="text-[var(--olive)] shrink-0 mt-[3px]"
                      aria-hidden
                    />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not promised */}
            <div>
              <h3 className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-[var(--clay)] border-t border-[var(--clay)] pt-4">
                What's not promised
              </h3>
              <ul className="mt-6 space-y-3">
                {course.whatIsNotPromised.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[var(--ink-soft)] leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="text-[var(--clay)] shrink-0 mt-[1px] font-display text-lg leading-none"
                    >
                      —
                    </span>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 07 — FORMAT & ACCESS ====================== */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  07
                </span>
                <span className="eyebrow">Format & Access</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                Written curriculum. Lifetime access.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-[var(--rule)] space-y-8">
              <div>
                <h3 className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-[var(--clay)] mb-3">
                  Format
                </h3>
                <p className="text-lg text-[var(--ink-soft)] leading-relaxed text-pretty">
                  {course.format}
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-[var(--clay)] mb-3">
                  Access model
                </h3>
                <p className="text-lg text-[var(--ink-soft)] leading-relaxed text-pretty">
                  {course.accessModel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 08 — INSTRUCTOR ====================== */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  08
                </span>
                <span className="eyebrow">Instructor</span>
              </div>
              {/* Abstract editorial portrait treatment — no real person */}
              <div
                className="aspect-[4/5] w-full max-w-xs border border-[var(--rule)] relative overflow-hidden paper-grain"
                aria-label="Abstract editorial composition representing the fictional instructor"
                role="img"
                style={{
                  background:
                    course.heroAccent === "clay"
                      ? "var(--clay)"
                      : course.heroAccent === "olive"
                      ? "var(--olive)"
                      : "var(--ink)",
                  color: "var(--paper)",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase opacity-80">
                      Portrait · {course.coverLabel}
                    </span>
                    <span className="font-display text-[var(--clay)] text-lg">M/F</span>
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    <span className="font-display text-[6rem] leading-none opacity-15 select-none">
                      {course.instructor.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-2xl tracking-tight">
                      {course.instructor.name}
                    </p>
                    <p className="font-mono text-[0.625rem] tracking-[0.15em] uppercase opacity-70 mt-1">
                      {course.instructor.role}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-[var(--warm-gray)] leading-relaxed max-w-xs">
                Illustrative composition. The instructor is fictional; no real
                person is depicted and no professional history is implied.
              </p>
            </div>
            <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.015em] leading-[1.15] font-normal text-balance">
                <span className="text-[var(--clay)]">“</span>
                The frameworks are the point. The identity is a vehicle.
                <span className="text-[var(--clay)]">”</span>
              </blockquote>
              <p className="mt-8 text-lg text-[var(--ink-soft)] leading-relaxed text-pretty max-w-2xl">
                {course.instructor.bio}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline"
              >
                Read the founder statement <ArrowUpRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 09 — FAQ ====================== */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  09
                </span>
                <span className="eyebrow">Frequently Asked</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                The questions that come up before enrolling.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                More questions live on the{" "}
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
                {course.faqs.map((faq, i) => (
                  <details key={i} className="group py-5">
                    <summary
                      className={cn(
                        "flex items-start justify-between gap-4 cursor-pointer list-none",
                        "focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:-outline-offset-2"
                      )}
                    >
                      <span className="flex gap-4 items-baseline">
                        <span
                          className="num-marker text-[var(--clay)] tabular-nums shrink-0"
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg md:text-xl tracking-[-0.01em] leading-snug text-[var(--ink)]">
                          {faq.q}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="text-[var(--ink)] shrink-0 mt-1 transition-transform duration-200 group-open:rotate-45"
                      >
                        <Plus size={16} strokeWidth={1.75} />
                      </span>
                    </summary>
                    <dd className="mt-3 pl-8 text-[var(--ink-soft)] leading-relaxed text-pretty">
                      {faq.a}
                    </dd>
                  </details>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 10 — RELATED OFFERS ====================== */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="num-marker"
                  style={{ color: accent }}
                  aria-hidden
                >
                  10
                </span>
                <span className="eyebrow">Related Offerings</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                Pairs well with.
              </h2>
            </div>
            <Link
              href="/courses"
              className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline self-start md:self-end"
            >
              Back to the catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.relatedOffers.map((offer, i) => (
              <Link
                key={i}
                href={offer.href}
                className="editorial-card p-6 md:p-7 flex flex-col group"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span
                    className="num-marker text-[var(--warm-gray)]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {offer.price && (
                    <span className="font-mono text-sm text-[var(--clay)]">
                      {offer.price}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors">
                  {offer.title}
                </h3>
                <span className="mt-auto pt-6 font-mono-label text-[var(--clay)] group-hover:text-[var(--ink)] transition-colors inline-flex items-center gap-2">
                  Explore <ArrowUpRight size={14} strokeWidth={1.75} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== STICKY CHECKOUT ====================== */}
      <StickyCheckout
        offerSlug={course.slug}
        price={course.price}
        title={course.title}
        billingLabel="one-time"
        ctaLabel="Enrol"
        sentinelId="course-hero-end"
      />

      {/* Bottom spacer — keeps the fixed CTA bar from covering the last
          section or the site footer when the user has scrolled to the end. */}
      <div aria-hidden className="h-24 md:h-20" />
    </>
  );
}
