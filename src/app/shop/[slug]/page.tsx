import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/editorial/section-header";
import { ProductArtwork } from "@/components/editorial/covers";
import { Markdown } from "@/components/editorial/markdown";
import { CheckoutButton } from "@/components/commerce/checkout-button";
import { products } from "@/content/products";
import { formatPrice } from "@/lib/commerce/offers";
import { withBase } from "@/lib/config/paths";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Not Found" };
  }
  return {
    title: product.title,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-12 md:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] list-none p-0">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[var(--ink)] link-underline"
                >
                  Shop
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[var(--ink)]">{product.category}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: title + price + CTAs */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">{product.category}</span>
              </div>
              <h1 className="font-display font-normal tracking-[-0.025em] leading-[0.98] text-[clamp(2.5rem,6vw,5rem)] text-balance">
                {product.title}
              </h1>
              <p className="mt-6 font-display italic text-xl md:text-2xl leading-[1.3] text-[var(--ink-soft)] text-pretty max-w-2xl">
                {product.tagline}
              </p>

              <div className="mt-10 flex items-baseline gap-3">
                <span className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-none">
                  {formatPrice(product.price, product.currency)}
                </span>
                <span className="font-mono text-sm text-[var(--warm-gray)] tracking-[0.1em]">
                  one-time
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <CheckoutButton
                  offerSlug={product.slug}
                  label={`product-checkout-${product.slug}`}
                  className="px-7 py-4"
                >
                  Buy — {formatPrice(product.price, product.currency)}
                </CheckoutButton>
                <a
                  href="#preview"
                  className="btn-outline px-7 py-4 font-mono-label inline-flex items-center justify-center"
                >
                  Download free preview
                </a>
              </div>
            </div>

            {/* Right: large artwork */}
            <div className="lg:col-span-5">
              <ProductArtwork
                title={product.title}
                category={product.category}
                price={formatPrice(product.price, product.currency)}
                accent={product.heroAccent}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">Overview</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] text-balance">
                What this product is.
              </h2>
            </div>
            <div className="lg:col-span-8 reading-column">
              <Markdown content={product.overview} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTENTS ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">In the Box</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] text-balance">
                What is included.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ol className="border-t border-[var(--rule)] list-none p-0">
                {product.contents.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-6 py-4 border-b border-[var(--rule)]"
                  >
                    <span className="num-marker text-[var(--clay)] w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--ink)] leading-relaxed text-pretty">
                      {c}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PREVIEW ============ */}
      <section
        id="preview"
        className="border-b border-[var(--rule)] scroll-mt-20"
      >
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">04</span>
                <span className="eyebrow">Free Preview</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] text-balance">
                Download a free sample.
              </h2>
              <p className="mt-5 text-[var(--ink-soft)] leading-relaxed text-pretty">
                Every product includes a free preview. No email required, no
                checkout. The preview is a real document — sample pages from
                the full product.
              </p>
            </div>
            <div className="lg:col-span-8">
              <a
                href={withBase(product.preview.href)}
                download
                className="block editorial-card hover:border-[var(--ink)] p-7 md:p-9 group transition-colors"
                aria-label={`Download ${product.preview.name}`}
              >
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <span className="eyebrow text-[var(--clay)]">
                      Preview Document
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl tracking-[-0.01em] leading-tight mt-2 text-balance">
                      {product.preview.name}
                    </h3>
                  </div>
                  <div
                    aria-hidden
                    className="w-12 h-12 border border-[var(--rule)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--ink)] transition-colors"
                  >
                    <span className="font-mono text-xs text-[var(--clay)] tracking-[0.1em]">
                      PDF
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--rule)] pt-5 gap-4">
                  <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                    {product.preview.pages}{" "}
                    {product.preview.pages === 1 ? "page" : "pages"} · PDF ·
                    Free
                  </span>
                  <span className="font-mono-label text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors link-underline">
                    Download preview
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FORMATS + AUDIENCE + LICENSE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="num-marker text-[var(--clay)]">05</span>
                <span className="eyebrow">Formats</span>
              </div>
              <h2 className="font-display text-2xl tracking-[-0.01em] leading-tight mb-5">
                Formats &amp; compatibility.
              </h2>
              <ul className="space-y-3 list-none p-0">
                {product.formats.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 text-[var(--ink-soft)] leading-relaxed text-pretty"
                  >
                    <span
                      aria-hidden
                      className="w-1.5 h-1.5 rounded-full bg-[var(--clay)] flex-shrink-0 mt-2"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="num-marker text-[var(--clay)]">06</span>
                <span className="eyebrow">Audience</span>
              </div>
              <h2 className="font-display text-2xl tracking-[-0.01em] leading-tight mb-5">
                Who this is for.
              </h2>
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                {product.audience}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="num-marker text-[var(--clay)]">07</span>
                <span className="eyebrow">License</span>
              </div>
              <h2 className="font-display text-2xl tracking-[-0.01em] leading-tight mb-5">
                License terms.
              </h2>
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                {product.license}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="08"
            eyebrow="Frequently Asked"
            title="Questions about this product."
          />
          <dl className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {product.faqs.map((f) => (
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

      {/* ============ RELATED ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeader
            number="09"
            eyebrow="Related"
            title="Other products & courses."
          />
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
            {product.related.map((r) => (
              <li key={`${r.title}-${r.href}`}>
                <Link
                  href={r.href}
                  className="block editorial-card hover:border-[var(--ink)] p-7 md:p-8 h-full group transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-4 gap-4">
                    <span className="eyebrow text-[var(--clay)]">Related</span>
                    <span className="num-marker">{r.price}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight">
                    {r.title}
                  </h3>
                  <div className="mt-5 border-t border-[var(--rule)] pt-4">
                    <span className="font-mono-label text-[var(--ink)] group-hover:text-[var(--clay)] transition-colors link-underline">
                      View
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ DEMO DISCLOSURE ============ */}
      <section>
        <div className="container-editorial py-10 md:py-12">
          <p className="eyebrow text-[var(--warm-gray)] leading-relaxed max-w-3xl">
            Demonstration storefront · no payment is processed in demo mode.
            Preview files are real; paid-file fulfillment is managed separately.
          </p>
        </div>
      </section>
    </>
  );
}
