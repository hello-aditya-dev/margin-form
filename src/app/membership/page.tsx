import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/editorial/section-header";
import { EditorialImage } from "@/components/editorial/editorial-image";
import { PlanSelector } from "@/components/membership/plan-selector";
import { membership } from "@/content/membership";
import { visuals } from "@/content/visuals";

export const metadata: Metadata = {
  title: "The Practice Room",
  description:
    "A considered membership for independent creatives who have finished a Margin / Form course and want a sustained place to practice — text-first, capped in size, no performance.",
};

export default function MembershipPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: headline + copy + CTAs */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">The Membership</span>
              </div>
              <h1 className="font-display font-normal tracking-[-0.025em] leading-[0.95] text-[clamp(2.75rem,7vw,6rem)] text-balance">
                The Practice
                <br />
                <span className="italic text-[var(--clay)]">Room.</span>
              </h1>
              <p className="mt-7 font-display italic text-2xl md:text-3xl leading-[1.25] text-[var(--ink-soft)] text-pretty max-w-2xl">
                {membership.tagline}
              </p>
              <p className="mt-8 max-w-2xl text-lg text-[var(--ink-soft)] leading-relaxed text-pretty">
                {membership.whoFor}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#plans"
                  className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center"
                >
                  View Plans
                </a>
                <a
                  href="#programming"
                  className="btn-outline px-7 py-4 font-mono-label inline-flex items-center justify-center"
                >
                  See the Monthly Programming
                </a>
              </div>
            </div>

            {/* Right: membership card mockup */}
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <div className="flex items-baseline justify-between mb-5">
                <span className="eyebrow text-[var(--clay)]">Member Card</span>
                <span className="num-marker">M/F</span>
              </div>
              <div className="relative aspect-[4/5] bg-[var(--ink)] text-[var(--paper)] p-7 md:p-9 paper-grain overflow-hidden flex flex-col justify-between">
                {/* Identifier row: THE PRACTICE ROOM / M/F */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase opacity-80">
                    The Practice Room
                  </span>
                  <span className="font-display text-xl leading-none text-[var(--clay)]">
                    M/F
                  </span>
                </div>

                {/* Main title */}
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase opacity-60">
                    No. 01 · The Membership
                  </span>
                  <h2 className="font-display text-5xl md:text-6xl leading-[0.92] mt-4 tracking-[-0.025em] max-w-[85%]">
                    The Practice
                    <br />
                    <span className="italic text-[var(--clay)]">Room.</span>
                  </h2>

                  {/* Member seal */}
                  <div
                    aria-hidden
                    className="mt-8 self-end w-24 h-24 md:w-28 md:h-28 rounded-full border border-[var(--paper)]/25 flex flex-col items-center justify-center"
                  >
                    <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase opacity-60">
                      Member
                    </span>
                    <span className="font-display text-2xl leading-none mt-1.5 text-[var(--clay)]">
                      M/F
                    </span>
                    <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase opacity-60 mt-1.5">
                      Seal
                    </span>
                  </div>
                </div>

                {/* Card metadata */}
                <div className="border-t border-[var(--paper)]/20 pt-4 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase opacity-60">
                      Holder
                    </span>
                    <p className="font-mono text-sm mt-1">M. F. Member</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase opacity-60">
                      Issued
                    </span>
                    <p className="font-mono text-sm mt-1">Vol. 01</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wide editorial photograph — the Practice Room atmosphere */}
          <div className="mt-12 md:mt-16">
            <EditorialImage
              src={visuals.membershipPracticeRoom.path}
              webp={visuals.membershipPracticeRoom.webp}
              alt={visuals.membershipPracticeRoom.alt}
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="border border-[var(--rule)]"
              caption={visuals.membershipPracticeRoom.caption}
            />
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="02"
            eyebrow="What is inside"
            title="Seven things the room provides."
            intro="Not a content library, not a feed. A small set of recurring structures designed to keep your practice sharp, alongside peers who are doing the work."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {membership.benefits.map((b, i) => {
              const isLast = i === membership.benefits.length - 1;
              return (
                <div
                  key={b.title}
                  className={cn(
                    "editorial-card p-7 md:p-8 flex flex-col gap-4",
                    isLast && "md:col-span-2 lg:col-span-3"
                  )}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="num-marker text-[var(--clay)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow text-[var(--warm-gray)]">
                      Benefit
                    </span>
                  </div>
                  <h3 className="font-display text-2xl tracking-[-0.01em] leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ MONTHLY PROGRAMMING ============ */}
      <section
        id="programming"
        className="border-b border-[var(--rule)] scroll-mt-20"
      >
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="03"
            eyebrow="The Monthly Rhythm"
            title="A four-week programming cycle."
            intro="Each month in the Practice Room follows a small, repeatable rhythm. Nothing mandatory, nothing staged — a quiet structure you can plan around."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--rule)]">
            {membership.monthlyProgramming.map((w) => (
              <div
                key={w.week}
                className="border-b border-r border-[var(--rule)] p-7 md:p-8 bg-[var(--ivory)] flex flex-col gap-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className="num-marker text-[var(--clay)]">
                    {w.week}
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--warm-gray)]">
                    Cycle
                  </span>
                </div>
                <h3 className="font-display text-2xl tracking-[-0.01em] leading-tight">
                  {w.title}
                </h3>
                <p className="text-[var(--ink-soft)] leading-relaxed text-sm flex-1">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESOURCE PREVIEWS ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="04"
            eyebrow="The Resource Library"
            title="An expanding set of worksheets, templates, and worked examples."
            intro="Members get access to the resource library — practical artifacts that extend the course frameworks with annotated examples."
          />
          <ul className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)] list-none p-0">
            {membership.resourcePreviews.map((r, i) => (
              <li
                key={r.title}
                className="py-5 flex items-baseline justify-between gap-6"
              >
                <div className="flex items-baseline gap-5 md:gap-7 min-w-0">
                  <span className="num-marker text-[var(--clay)] w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight">
                    {r.title}
                  </span>
                </div>
                <span className="eyebrow text-[var(--warm-gray)] flex-shrink-0">
                  {r.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ PLANS / PRICING ============ */}
      <section id="plans" className="border-b border-[var(--rule)] scroll-mt-20">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="05"
            eyebrow="Choose Your Plan"
            title="Monthly or annual. Same room."
            intro="The selected plan is the plan that goes to checkout — it does not change silently. Annual is equivalent to two months free versus monthly."
          />
          <div className="mt-12">
            <PlanSelector plans={membership.plans} />
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="06"
            eyebrow="Frequently Asked"
            title="Questions about the membership."
          />
          <dl className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {membership.faqs.map((f) => (
              <div
                key={f.q}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
              >
                <dt className="md:col-span-5">
                  <span className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight text-balance">
                    {f.q}
                  </span>
                </dt>
                <dd className="md:col-span-7 text-[var(--ink-soft)] leading-relaxed text-pretty">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ DEMO DISCLOSURE ============ */}
      <section>
        <div className="container-editorial py-10 md:py-12">
          <p className="eyebrow text-[var(--warm-gray)] leading-relaxed max-w-3xl">
            In demonstration mode, no live community is running and no member
            access is granted. The page describes the proposed membership. When
            a real provider is connected, the features activate and this notice
            is updated.
          </p>
        </div>
      </section>
    </>
  );
}
