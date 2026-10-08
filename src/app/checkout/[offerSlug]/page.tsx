import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { getOfferBySlug, getPaymentsMode, formatPrice, billingLabel } from "@/lib/commerce/offers";
import { DemoCompleteButton } from "@/components/commerce/demo-complete-button";
import { Wordmark } from "@/components/brand/wordmark";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { offerSlug: "the-independent-practice" },
    { offerSlug: "the-client-pipeline" },
    { offerSlug: "the-proposal-system" },
    { offerSlug: "the-pricing-workbook" },
    { offerSlug: "the-client-brief-kit" },
    { offerSlug: "the-practice-room-monthly" },
    { offerSlug: "the-practice-room-annual" },
  ];
}

export function generateMetadata({ params }: { params: Promise<{ offerSlug: string }> }) {
  return params.then((p) => {
    const offer = getOfferBySlug(p.offerSlug);
    return {
      title: offer ? `Checkout · ${offer.title}` : "Checkout",
      robots: { index: false, follow: false },
    };
  });
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ offerSlug: string }>;
}) {
  const { offerSlug } = await params;
  const offer = getOfferBySlug(offerSlug);
  if (!offer) notFound();

  const mode = getPaymentsMode();
  const configError =
    mode === "hosted" && !offer.whopCheckoutUrl
      ? "Hosted checkout is enabled but no Whop URL is configured for this offer."
      : undefined;

  return (
    <section className="border-b border-[var(--rule)] min-h-[70vh]">
      <div className="container-editorial py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href={
              offer.type === "course"
                ? `/courses/${offer.slug}`
                : offer.type === "product"
                ? `/shop/${offer.slug}`
                : "/membership"
            }
            className="inline-flex items-center gap-2 font-mono-label text-[var(--warm-gray)] hover:text-[var(--ink)] transition-colors mb-10"
          >
            <ArrowLeft size={13} /> Return to the offer
          </Link>

          <div className="border border-[var(--clay)] bg-[var(--clay)]/5 p-5 mb-10 flex items-start gap-3">
            <ShieldCheck className="text-[var(--clay)] mt-0.5 shrink-0" size={20} />
            <div>
              <p className="font-mono-label text-[var(--clay)]">
                Demonstration Checkout
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)] leading-relaxed">
                No payment is taken. No card details are collected. No access is
                purchased or granted. This page demonstrates the checkout journey
                only.
              </p>
            </div>
          </div>

          {configError && (
            <div className="border border-[var(--clay)] bg-[var(--paper-deep)] p-5 mb-8">
              <p className="font-mono-label text-[var(--clay)]">
                Configuration Notice
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{configError}</p>
            </div>
          )}

          <div className="border border-[var(--rule)] bg-[var(--ivory)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--rule)]">
              <span className="font-mono-label text-[var(--warm-gray)]">
                Order Summary
              </span>
              <Wordmark className="text-base" />
            </div>
            <div className="p-6 md:p-8">
              <span className="eyebrow text-[var(--clay)]">
                {offer.type === "course"
                  ? "Course"
                  : offer.type === "product"
                  ? "Digital Product"
                  : "Membership"}
              </span>
              <h1 className="mt-2 font-display text-3xl md:text-4xl tracking-tight leading-tight">
                {offer.title}
              </h1>
              <p className="mt-2 text-[var(--ink-soft)]">{offer.description}</p>

              <div className="mt-6 flex items-baseline justify-between border-t border-[var(--rule)] pt-5">
                <div>
                  <span className="font-display text-4xl tracking-tight">
                    {formatPrice(offer.price, offer.currency)}
                  </span>
                  <span className="font-mono text-xs text-[var(--warm-gray)] ml-2">
                    {billingLabel(offer.billingInterval)}
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--warm-gray)]">
                  {offer.currency} · {mode} mode
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-mono-label mb-4">What&apos;s included</h2>
            <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {offer.deliverables.map((d) => (
                <li key={d} className="py-3 flex items-start gap-3 text-sm">
                  <span className="text-[var(--olive)] mt-0.5">—</span>
                  <span className="text-[var(--ink-soft)]">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-4">
            {mode === "demo" ? (
              <DemoCompleteButton
                offerSlug={offer.slug}
                offerTitle={offer.title}
                offerType={offer.type}
              />
            ) : offer.whopCheckoutUrl ? (
              <a
                href={offer.whopCheckoutUrl}
                className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2 w-full"
                rel="noopener noreferrer"
              >
                Continue to secure checkout <ArrowRight size={15} />
              </a>
            ) : (
              <div className="border border-[var(--rule)] p-5 text-center text-sm text-[var(--ink-soft)]">
                Hosted checkout is enabled but not configured for this offer. See
                the Demo Information page.
              </div>
            )}

            <p className="text-xs text-[var(--warm-gray)] leading-relaxed text-center">
              By continuing you acknowledge this is a demonstration. No real
              transaction occurs. Read the{" "}
              <Link href="/demo-information" className="underline underline-offset-2 hover:text-[var(--ink)]">
                full demo disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
