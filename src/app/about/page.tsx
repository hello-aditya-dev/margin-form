import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { founder } from "@/content/founder";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Margin / Form — a fictional independent creative-business education practice founded by Elena Mercer (demonstration). The frameworks, the principles, and the voice.",
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
        </div>
      </section>

      {/* ============ FOUNDER NARRATIVE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">The narrative</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                A practice is a system, not a mood.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The founder narrative below is a demonstration identity. The
                frameworks are the point; the persona is a vehicle.
              </p>
            </div>
            <div className="lg:col-span-8 reading-column">
              <div className="prose-editorial">
                {founder.narrative.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
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

      {/* ============ ABSTRACT FOUNDER PORTRAIT ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">Portrait</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                The founder is a composition, not a photograph.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                Margin / Form is a demonstration. To stay honest about that, the
                founder is represented by an art-directed typographic
                composition rather than a stock photograph of a person. No real
                individual is depicted or implied.
              </p>
              <p className="mt-4 text-[var(--ink-soft)] leading-relaxed text-pretty">
                The initials stand in for the founder name; the paper grain and
                the editorial lockup are the visual identity of the practice.
              </p>
            </div>
            <div className="lg:col-span-7">
              <figure className="border border-[var(--rule)] bg-[var(--ivory)] paper-grain">
                <div className="bg-[var(--ink)] text-[var(--paper)] paper-grain aspect-[4/5] md:aspect-[5/4] relative overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between px-6 md:px-8 pt-6 md:pt-8">
                    <span className="font-mono text-[0.625rem] tracking-[0.22em] uppercase text-[var(--paper)]/60">
                      Margin / Form
                    </span>
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
                      Vol. 01
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-6">
                    <span className="font-display tracking-[-0.04em] leading-none text-[28vw] md:text-[14rem] lg:text-[16rem] text-[var(--paper)] select-none">
                      EM
                    </span>
                  </div>
                  <div className="flex items-end justify-between px-6 md:px-8 pb-6 md:pb-8">
                    <div>
                      <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--paper)]/60">
                        Founder
                      </p>
                      <p className="mt-1 font-display text-xl md:text-2xl tracking-tight text-[var(--paper)]">
                        {founder.name}
                      </p>
                    </div>
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--paper)]/60 text-right">
                      Illustrative
                      <br />
                      composition
                    </span>
                  </div>
                </div>
                <figcaption className="px-6 md:px-8 py-4 border-t border-[var(--rule)] flex items-center justify-between gap-4 flex-wrap">
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                    Portrait · Vol. 01 / Illustrative composition
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--clay)]">
                    Fictional
                  </span>
                </figcaption>
              </figure>
              <p className="mt-3 text-xs text-[var(--warm-gray)] leading-relaxed">
                The founder is fictional; no real person is depicted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER QUOTE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="max-w-4xl">
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
