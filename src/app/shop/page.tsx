import type { Metadata } from "next";
import { ProductFilters } from "@/components/shop/product-filters";
import { products, productCategories } from "@/content/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Frameworks, workbooks, and kits for independent creative professionals. Downloadable, with free previews of every product.",
};

export default function ShopPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">01</span>
                <span className="eyebrow">The Shop</span>
              </div>
              <h1 className="font-display font-normal tracking-[-0.025em] leading-[0.98] text-[clamp(2.5rem,7vw,5.5rem)] text-balance">
                Frameworks, workbooks,
                <br />
                <span className="italic text-[var(--clay)]">and kits.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg text-[var(--ink-soft)] leading-relaxed text-pretty">
                Downloadable products built from the course frameworks —
                proposal templates, pricing workbooks, and intake kits designed
                to be used in real client work, not admired on a shelf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FILTERS + GRID ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-20">
          <ProductFilters products={products} categories={productCategories} />
        </div>
      </section>

      {/* ============ PREVIEW NOTE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-baseline">
            <div className="md:col-span-3">
              <span className="eyebrow text-[var(--clay)]">On Previews</span>
            </div>
            <p className="md:col-span-9 font-display text-xl md:text-2xl leading-snug text-[var(--ink-soft)] text-pretty max-w-3xl">
              Each product includes a free preview. Paid-file fulfillment is
              managed separately from free preview downloads.
            </p>
          </div>
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
