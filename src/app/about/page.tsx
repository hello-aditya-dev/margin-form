import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { founder } from "@/content/founder";
import { visuals } from "@/content/visuals";
import { EditorialImage } from "@/components/editorial/editorial-image";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Margin / Form — a fictional independent creative-business education practice founded by Elena Mercer. The frameworks, the principles, and the voice.",
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">About</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              The business of independent creativity.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              {founder.statement} Margin / Form is the education practice built
              around the practical frameworks that hold an independent creative
              business upright — pricing, positioning, proposals, delivery, and
              the operating rhythm that keeps them moving.
            </p>
            <p className="mt-5 max-w-2xl text-sm text-[var(--warm-gray)] leading-relaxed text-pretty">
              Founder: {founder.name} · {founder.role}
            </p>
          </div>

          {/* Wide editorial banner — studio environment */}
          <div className="mt-12 md:mt-16 max-w-6xl">
            <EditorialImage
              src={visuals.studioEnvironment.path}
              webp={visuals.studioEnvironment.webp}
              alt={visuals.studioEnvironment.alt}
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
              className="border border-[var(--rule)] bg-[var(--ivory)]"
              caption="The studio, late afternoon — illustrative atmosphere for a fictional practice."
            />
          </div>
        </div>
      </section>

      {/* ============ FOUNDER PORTRAIT ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">Portrait</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                The founder, in the studio.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                {founder.name} is the fictional founder of Margin / Form. The
                portrait here is an AI-generated illustrative image — a
                considered stand-in for a real headshot, used so the practice
                can put a face to the work without implying one exists.
              </p>
              <p className="mt-4 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The frameworks, the principles, and the editorial voice are the
                substance. The portrait is a way of making the page feel
                inhabited.
              </p>
              <aside
                className="mt-6 border-l-2 border-[var(--clay)] pl-5 py-2"
                aria-label="Portrait disclosure"
              >
                <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)] mb-2">
                  Disclosure
                </p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed text-pretty">
                  Elena Mercer is a fictional founder. This is an AI-generated
                  illustrative portrait — no real person is depicted. See the{" "}
                  <Link
                    href="/demo-information"
                    className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
                  >
                    Demo Information
                  </Link>{" "}
                  page for the full disclosure.
                </p>
              </aside>
            </div>
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <EditorialImage
                  src={visuals.founderPortrait.path}
                  webp={visuals.founderPortrait.webp}
                  alt={visuals.founderPortrait.alt}
                  sizes="(max-width: 1024px) 80vw, 28rem"
                  className="border border-[var(--rule)] bg-[var(--ivory)]"
                  caption={visuals.founderPortrait.caption}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER NARRATIVE ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">The narrative</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                A practice is a system, not a mood.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The founder narrative is a demonstration identity. The
                frameworks are the point; the persona is a vehicle.
              </p>
            </div>
            <div className="lg:col-span-8 reading-column">
              <div className="prose-editorial">
                <p>{founder.narrative[0]}</p>
                <p>{founder.narrative[1]}</p>
              </div>

              {/* Landscape image breaking up the narrative */}
              <figure className="my-10 md:my-12">
                <EditorialImage
                  src={visuals.founderAtWork.path}
                  webp={visuals.founderAtWork.webp}
                  alt={visuals.founderAtWork.alt}
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="border border-[var(--rule)] bg-[var(--ivory)]"
                  caption="At the studio table, reviewing the week's proposals — illustrative photograph for a fictional practice."
                />
              </figure>

              <div className="prose-editorial">
                <p>{founder.narrative[2]}</p>
                <p>{founder.narrative[3]}</p>
              </div>

              <aside
                className="mt-8 border-l-2 border-[var(--clay)] pl-5 py-2"
                aria-label="Demonstration notice"
              >
                <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)] mb-2">
                  Demonstration notice
                </p>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed text-pretty">
                  Fictional demonstration identity — no professional history is
                  implied. No employers, degrees, press features, or follower
                  counts are claimed. See the{" "}
                  <Link
                    href="/demo-information"
                    className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
                  >
                    Demo Information
                  </Link>{" "}
                  page for the full disclosure.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER QUOTE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="num-marker text-[var(--clay)]">04</span>
                <span className="eyebrow">A working principle</span>
              </div>
              <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.12] font-normal text-balance text-[var(--ink)]">
                <span aria-hidden className="text-[var(--clay)] mr-1">
                  &ldquo;
                </span>
                {founder.quote}
                <span aria-hidden className="text-[var(--clay)] ml-1">
                  &rdquo;
                </span>
              </blockquote>
              <p className="mt-8 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                — {founder.name}, founder (fictional)
              </p>
            </div>
            <div className="lg:col-span-4">
              <EditorialImage
                src={visuals.creativeProcess.path}
                webp={visuals.creativeProcess.webp}
                alt={visuals.creativeProcess.alt}
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="border border-[var(--rule)] bg-[var(--ivory)]"
                caption="The work in progress — notes, samples, and a brass ruler on the studio desk."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRINCIPLES ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">05</span>
              <span className="eyebrow">Principles</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance">
              Six principles that shape the work.
            </h2>
            <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
              Each course, framework, and letter on Margin / Form traces back to
              one of these. They are not slogans; they are the operating
              beliefs of a sustainable independent practice.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)] border border-[var(--rule)]">
            {founder.principles.map((p, i) => (
              <li
                key={i}
                className="bg-[var(--paper)] p-8 md:p-9 flex flex-col gap-4"
              >
                <span
                  className="num-marker text-[var(--clay)]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ EXPERTISE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">06</span>
                <span className="eyebrow">Areas of focus</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                What the practice teaches.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The curriculum is organised around the operating parts of an
                independent creative practice — from positioning and pricing
                through to delivery rhythm and weekly review.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="border-t border-[var(--rule)]">
                {founder.expertise.map((item, i) => (
                  <li
                    key={i}
                    className="border-b border-[var(--rule)] py-4 flex items-baseline gap-6"
                  >
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)] shrink-0 w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg md:text-xl tracking-[-0.005em] leading-snug text-[var(--ink)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER VOICE ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">07</span>
                <span className="eyebrow">Editorial voice</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                How the work sounds.
              </h2>
            </div>
            <div className="lg:col-span-8 reading-column">
              <p className="font-display italic text-2xl md:text-3xl tracking-[-0.01em] leading-[1.3] text-[var(--ink-soft)] text-balance">
                {founder.voice}
              </p>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The journal, the Monday Letter, the course prose, and the
                framework copy all share this register. The aim is to read like
                a thoughtful colleague, not a marketing channel — concrete,
                considered, and willing to be plain about what is hard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">08</span>
            <span className="eyebrow">Where to go next</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/courses"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">Learn</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  Browse the courses
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  The Independent Practice and The Client Pipeline — the full
                  curriculum built on the principles above.
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0 mt-1"
                aria-hidden
              />
            </Link>
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
                  Longer-form essays on pricing, positioning, clients, and the
                  business of independent work.
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

      {/* ============ DEMO DISCLOSURE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="container-editorial py-12 md:py-14">
          <div className="flex items-start gap-4">
            <span className="num-marker text-[var(--clay)] shrink-0 mt-1">
              ※
            </span>
            <p className="text-sm md:text-base text-[var(--paper)]/85 leading-relaxed max-w-3xl text-pretty">
              Margin / Form is a portfolio demonstration. The founder, the
              narrative, and the portrait above are demonstration content. No
              legal entity, professional history, or endorsement is implied.{" "}
              <Link
                href="/demo-information"
                className="text-[var(--paper)] underline underline-offset-2 hover:text-[var(--clay)]"
              >
                Read the full disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
