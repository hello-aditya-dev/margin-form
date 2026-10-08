import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { SectionHeader } from "@/components/editorial/section-header";
import { EditorialImage } from "@/components/editorial/editorial-image";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CheckoutButton } from "@/components/commerce/checkout-button";
import { courses } from "@/content/courses";
import { products } from "@/content/products";
import { membership } from "@/content/membership";
import { articles } from "@/content/journal";
import { resources } from "@/content/resources";
import { founder } from "@/content/founder";
import { visuals, journalVisualMap, courseVisualMap, productVisualMap } from "@/content/visuals";
import { formatPrice } from "@/lib/commerce/offers";

export default function HomePage() {
  const flagship = courses.find((c) => c.isFlagship)!;
  const secondary = courses.find((c) => !c.isFlagship)!;
  const featuredProducts = products;
  const featuredArticles = articles.slice(0, 3);
  const studioAudit = resources.find((r) => r.isFlagship)!;
  const monthlyPlan = membership.plans.find((p) => p.interval === "month")!;
  const annualPlan = membership.plans.find((p) => p.interval === "year")!;

  return (
    <>
      {/* ============ SECTION 01 — HERO (photographic split) ============ */}
      <section className="relative border-b border-[var(--rule)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] lg:min-h-[88vh]">
          {/* Left: headline + CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center container-editorial py-16 md:py-24 lg:py-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Business Education for Independent Creatives</span>
            </div>
            <h1 className="font-display font-normal tracking-[-0.025em] leading-[0.95] text-[clamp(2.5rem,7vw,6rem)] text-balance">
              Make excellent work.
              <br />
              <span className="italic text-[var(--clay)]">Build a business</span>
              <br />
              that can sustain it.
            </h1>
            <p className="mt-8 max-w-xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              Practical courses, useful tools, and a considered community for
              people building a living from their creative work — without
              turning themselves into a sales personality.
            </p>
            {/* FIX: CTA now navigates to /courses (not checkout) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
              >
                Explore the Courses
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/resources/studio-audit"
                className="btn-outline px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2"
              >
                Start with a Free Resource
              </Link>
            </div>
            <p className="mt-6 eyebrow text-[var(--warm-gray)]">
              No hustle sermons. Just the parts of business nobody taught you.
            </p>
          </div>

          {/* Right: full-bleed hero photograph (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[50vh] lg:min-h-full bg-[var(--ink)]">
            <EditorialImage
              src={visuals.heroStudio.path}
              webp={visuals.heroStudio.webp}
              alt={visuals.heroStudio.alt}
              priority
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--ink)]/60 to-transparent">
              <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--paper)]/90">
                {visuals.heroStudio.caption}
              </p>
            </div>
          </div>
        </div>
        {/* Bottom marquee strip */}
        <div className="border-t border-[var(--rule)] bg-[var(--paper-deep)]">
          <div className="container-editorial py-4 flex items-center gap-8 overflow-x-auto no-scrollbar">
            {["Positioning", "Pricing", "Proposals", "Pipeline", "Delivery", "Operating Rhythm"].map(
              (t, i) => (
                <span
                  key={t}
                  className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--warm-gray)] whitespace-nowrap flex items-center gap-8"
                >
                  <span className="text-[var(--clay)]">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                  <span aria-hidden className="text-[var(--rule)]">/</span>
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============ SECTION 02 — THE PROBLEM (with image) ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <EditorialImage
                src={visuals.creativeProcess.path}
                webp={visuals.creativeProcess.webp}
                alt={visuals.creativeProcess.alt}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="border border-[var(--rule)]"
                caption="The practice, made tangible."
              />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">The Problem</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                The work is only <span className="italic">half</span> the job.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  { n: "i.", t: "You were taught the craft.", b: "Few independent creatives were ever taught how to price it, scope it, propose it, and deliver it without losing the practice they wanted." },
                  { n: "ii.", t: "Good work, inconsistent income.", b: "The portfolio is strong. The pipeline is a mood. Pricing is guessed. Proposals are rewritten from scratch each time." },
                  { n: "iii.", t: "The other half of the job.", b: "Positioning, pricing, proposals, delivery, and a weekly rhythm. Not growth hacks. The quiet, repeatable business of staying independent." },
                ].map((item) => (
                  <div key={item.n} className="border-t border-[var(--ink)] pt-4 flex gap-5">
                    <span className="font-display italic text-[var(--clay)] text-2xl shrink-0">{item.n}</span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight">
                        {item.t}
                      </h3>
                      <p className="mt-1.5 text-[var(--ink-soft)] leading-relaxed text-pretty">
                        {item.b}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 03 — EDUCATION OFFERINGS (photographic course covers) ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">Education Offerings</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal max-w-3xl text-balance">
                Two courses. One coherent system.
              </h2>
            </div>
            <Link
              href="/courses"
              className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline self-start md:self-end"
            >
              View catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Flagship — gets more weight, uses course photograph */}
            <div className="lg:col-span-7">
              <Link href={`/courses/${flagship.slug}`} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="relative">
                    <EditorialImage
                      src={visuals[courseVisualMap[flagship.slug]].path}
                      webp={visuals[courseVisualMap[flagship.slug]].webp}
                      alt={visuals[courseVisualMap[flagship.slug]].alt}
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="aspect-[3/4] border border-[var(--rule)]"
                    />
                    <div className="absolute top-4 left-4 bg-[var(--paper)]/90 backdrop-blur-sm px-3 py-1.5">
                      <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
                        {flagship.coverLabel} · ${flagship.price}
                      </span>
                    </div>
                  </div>
                  <div className="md:pt-4">
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--clay)]">
                      Flagship Course · 8 Modules
                    </span>
                    <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight leading-tight">
                      {flagship.title}
                    </h3>
                    <p className="mt-2 italic text-[var(--ink-soft)]">{flagship.tagline}</p>
                    <p className="mt-4 text-[var(--ink-soft)] leading-relaxed text-pretty">
                      {flagship.problemFraming}
                    </p>
                    <ul className="mt-5 space-y-1.5">
                      {flagship.modules.slice(0, 4).map((m) => (
                        <li key={m.number} className="flex items-baseline gap-3 text-sm">
                          <span className="num-marker text-[var(--warm-gray)]">{m.number}</span>
                          <span>{m.title}</span>
                        </li>
                      ))}
                      <li className="num-marker text-[var(--warm-gray)] pt-1">
                        + 4 more modules
                      </li>
                    </ul>
                    <div className="mt-6 flex items-center gap-2 font-mono-label text-[var(--clay)] group-hover:text-[var(--ink)] transition-colors">
                      Explore the course <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Secondary */}
            <div className="lg:col-span-5 lg:border-l lg:border-[var(--rule)] lg:pl-8">
              <Link href={`/courses/${secondary.slug}`} className="group block">
                <EditorialImage
                  src={visuals[courseVisualMap[secondary.slug]].path}
                  webp={visuals[courseVisualMap[secondary.slug]].webp}
                  alt={visuals[courseVisualMap[secondary.slug]].alt}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[3/4] border border-[var(--rule)] mb-6"
                />
                <div className="absolute top-4 left-4">
                </div>
                <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--olive)]">
                  Specialised Course · 6 Modules · ${secondary.price}
                </span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight">
                  {secondary.title}
                </h3>
                <p className="mt-2 italic text-[var(--ink-soft)]">{secondary.tagline}</p>
                <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                  A focused course on building a repeatable client pipeline —
                  without cold outreach scripts or hustle.
                </p>
                <div className="mt-4 flex items-center gap-2 font-mono-label text-[var(--clay)] group-hover:text-[var(--ink)] transition-colors">
                  Explore the course <ArrowUpRight size={14} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 04 — FEATURED RESOURCES (photographic products) ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">04</span>
                <span className="eyebrow">Frameworks & Toolkits</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                The shop. Objects you can use.
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline self-start md:self-end"
            >
              Visit the shop →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((p, i) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="group block">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="num-marker">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eyebrow">{p.category}</span>
                </div>
                <EditorialImage
                  src={visuals[productVisualMap[p.slug]].path}
                  webp={visuals[productVisualMap[p.slug]].webp}
                  alt={visuals[productVisualMap[p.slug]].alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-square border border-[var(--rule)] mb-4 group-hover:border-[var(--ink)] transition-colors"
                />
                <h3 className="font-display text-xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--ink-soft)] leading-relaxed">
                  {p.tagline}
                </p>
                <p className="mt-2 font-mono text-sm text-[var(--clay)]">
                  {formatPrice(p.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 05 — FOUNDER (full-bleed photographic moment) ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--ink)] text-[var(--paper)] relative overflow-hidden">
        {/* Full-bleed founder image as background */}
        <div className="absolute inset-0 opacity-30">
          <EditorialImage
            src={visuals.founderAtWork.path}
            webp={visuals.founderAtWork.webp}
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="relative container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">05</span>
                <span className="eyebrow text-[var(--linen)]">Founder Viewpoint</span>
              </div>
              {/* Real founder portrait — replaces EM placeholder */}
              <EditorialImage
                src={visuals.founderPortrait.path}
                webp={visuals.founderPortrait.webp}
                alt={visuals.founderPortrait.alt}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="border border-[var(--paper)]/20 max-w-sm"
                caption="AI-generated illustrative portrait of a fictional founder."
              />
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.015em] leading-[1.1] font-normal text-balance">
                <span className="text-[var(--clay)]">"</span>
                {founder.quote}
                <span className="text-[var(--clay)]">"</span>
              </blockquote>
              <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-[var(--paper)]/60">
                — {founder.name}, {founder.role}
              </p>
              <div className="mt-10 space-y-5 max-w-2xl text-[var(--paper)]/80 leading-relaxed">
                <p>{founder.narrative[1]}</p>
                <p>{founder.narrative[2]}</p>
              </div>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 max-w-2xl">
                {founder.principles.slice(0, 4).map((p) => (
                  <div key={p.title} className="border-t border-[var(--paper)]/20 pt-3">
                    <h3 className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-[var(--clay)]">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[var(--paper)]/70 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-2 font-mono-label text-[var(--paper)] hover:text-[var(--clay)] transition-colors link-underline"
              >
                Read the full story <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 06 — THE PRACTICE ROOM (with membership image) ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">06</span>
                <span className="eyebrow">The Membership</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                The Practice Room.
              </h2>
              <p className="mt-6 italic text-xl text-[var(--ink-soft)]">
                {membership.tagline}
              </p>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                {membership.whoFor}
              </p>
              <div className="mt-8 flex items-baseline gap-6">
                <div>
                  <span className="font-display text-4xl tracking-tight">
                    {formatPrice(monthlyPlan.price)}
                  </span>
                  <span className="font-mono text-xs text-[var(--warm-gray)] ml-1">/mo</span>
                </div>
                <div className="h-8 w-px bg-[var(--rule)]" />
                <div>
                  <span className="font-display text-4xl tracking-tight">
                    {formatPrice(annualPlan.price)}
                  </span>
                  <span className="font-mono text-xs text-[var(--warm-gray)] ml-1">/yr</span>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <CheckoutButton
                  offerSlug={annualPlan.slug}
                  label="home-membership-annual"
                  className="px-6 py-3.5"
                >
                  Join the Practice Room
                </CheckoutButton>
                <Link
                  href="/membership"
                  className="btn-outline px-6 py-3.5 font-mono-label inline-flex items-center justify-center"
                >
                  Compare plans
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <EditorialImage
                src={visuals.membershipPracticeRoom.path}
                webp={visuals.membershipPracticeRoom.webp}
                alt={visuals.membershipPracticeRoom.alt}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="border border-[var(--rule)]"
                caption={visuals.membershipPracticeRoom.caption}
              />
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {membership.benefits.slice(0, 6).map((b, i) => (
                  <li key={b.title} className="flex items-baseline gap-3 py-2 border-t border-[var(--rule)]">
                    <span className="num-marker text-[var(--clay)] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-[var(--ink-soft)]">{b.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 07 — FROM THE JOURNAL (with editorial thumbnails) ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">07</span>
                <span className="eyebrow">From the Journal</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                Essays on the independent practice.
              </h2>
            </div>
            <Link
              href="/journal"
              className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline self-start md:self-end"
            >
              Read the journal →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((a, i) => {
              const vId = journalVisualMap[a.slug];
              const v = visuals[vId];
              return (
                <Link key={a.slug} href={`/journal/${a.slug}`} className="group block">
                  <EditorialImage
                    src={v.path}
                    webp={v.webp}
                    alt={v.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-[3/2] border border-[var(--rule)] mb-4 group-hover:border-[var(--ink)] transition-colors"
                  />
                  <div className="flex items-center gap-3 mb-2">
                    <span className="num-marker">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                      {a.category} · {a.readingTime}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-2">
                    {a.excerpt}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SECTION 08 — FREE EDUCATIONAL RESOURCE (with resource image) ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">08</span>
                <span className="eyebrow">Free Resource</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
                The Studio Audit.
              </h2>
              <p className="mt-4 italic text-xl text-[var(--ink-soft)]">
                {studioAudit.tagline}
              </p>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed max-w-xl text-pretty">
                {studioAudit.overview}
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-xl">
                {studioAudit.contents.slice(0, 6).map((c) => (
                  <li key={c} className="flex items-baseline gap-2 text-sm">
                    <span className="text-[var(--clay)]">—</span>
                    <span className="text-[var(--ink-soft)]">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={`/resources/${studioAudit.slug}`}
                  className="btn-outline px-7 py-4 font-mono-label inline-flex items-center gap-2"
                >
                  Get the audit (free) <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <EditorialImage
                src={visuals.resourceStudioAudit.path}
                webp={visuals.resourceStudioAudit.webp}
                alt={visuals.resourceStudioAudit.alt}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="border border-[var(--rule)]"
                caption="The Studio Audit — 14-page PDF, free."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 09 — NEWSLETTER (with newsletter image) ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--clay)] text-[var(--paper)] relative overflow-hidden">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--paper)]/70">09</span>
                <span className="eyebrow text-[var(--paper)]/80">The Monday Letter</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
                One useful idea for a better independent practice.
              </h2>
              <p className="mt-6 text-[var(--paper)]/85 leading-relaxed max-w-lg text-lg text-pretty">
                A short Monday letter on pricing, positioning, clients, systems,
                and independent work. Planned weekly. In demonstration mode, no
                real subscription occurs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Pricing", "Positioning", "Clients", "Systems", "Independent Work"].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.625rem] tracking-[0.15em] uppercase border border-[var(--paper)]/30 px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[var(--paper)]/20">
              {/* Newsletter still life image */}
              <div className="mb-6 [&_img]:border-[var(--paper)]/30">
                <EditorialImage
                  src={visuals.newsletterMondayLetter.path}
                  webp={visuals.newsletterMondayLetter.webp}
                  alt={visuals.newsletterMondayLetter.alt}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[2/1] border border-[var(--paper)]/20"
                />
              </div>
              <h3 id="newsletter-heading" className="font-display text-2xl tracking-tight mb-5">
                Subscribe to the Monday Letter
              </h3>
              <div className="[&_*]:!border-[var(--paper)]/30 [&_input]:!bg-[var(--paper)]/10 [&_input]:!text-[var(--paper)] [&_input]:!placeholder:text-[var(--paper)]/50 [&_.btn-ink]:!bg-[var(--ink)] [&_.btn-ink]:!text-[var(--paper)] [&_.btn-ink:hover]:!bg-[var(--paper)] [&_.btn-ink:hover]:!text-[var(--ink)]">
                <NewsletterForm variant="stacked" labeledBy="newsletter-heading" />
              </div>
              <p className="mt-5 text-xs text-[var(--paper)]/70 leading-relaxed">
                Demonstration form. In demo mode, no email is stored or sent.
                When a real provider (such as Kit) is connected, this form
                activates and the disclosure updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
