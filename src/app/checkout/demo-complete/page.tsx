"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";

interface DemoState {
  slug: string;
  title: string;
  type: string;
  ts: number;
}

function readDemoState(): DemoState | "none" {
  if (typeof window === "undefined") return "none";
  try {
    const raw = window.sessionStorage.getItem("mf_demo_checkout");
    if (!raw) return "none";
    const parsed = JSON.parse(raw) as DemoState;
    // expire after 10 minutes
    if (Date.now() - parsed.ts > 10 * 60 * 1000) {
      window.sessionStorage.removeItem("mf_demo_checkout");
      return "none";
    }
    // clear so reload shows neutral state
    window.sessionStorage.removeItem("mf_demo_checkout");
    return parsed;
  } catch {
    return "none";
  }
}

export default function DemoCompletePage() {
  // Lazy initializer reads sessionStorage once on the client.
  // On the server this returns "none"; on the client it reads real state.
  const [state] = useState<DemoState | "none">(() => readDemoState());

  if (state === "none") {
    return (
      <section className="min-h-[60vh] border-b border-[var(--rule)]">
        <div className="container-editorial py-20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow text-[var(--clay)]">No Active Demonstration</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl tracking-tight font-normal">
              No demonstration in progress.
            </h1>
            <p className="mt-5 text-[var(--ink-soft)] leading-relaxed">
              This page is reached after a demonstration checkout. If you arrived
              here directly, no demonstration state was found. Browse the
              catalogue to start a demonstration checkout journey.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses" className="btn-ink px-6 py-3.5 font-mono-label inline-flex items-center gap-2">
                View courses <ArrowRight size={14} />
              </Link>
              <Link href="/shop" className="btn-outline px-6 py-3.5 font-mono-label inline-flex items-center gap-2">
                Visit the shop
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const offerHref =
    state.type === "course"
      ? `/courses/${state.slug}`
      : state.type === "product"
      ? `/shop/${state.slug}`
      : "/membership";

  return (
    <section className="min-h-[70vh] border-b border-[var(--rule)]">
      <div className="container-editorial py-20">
        <div className="max-w-2xl mx-auto">
          {/* Success seal */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[var(--olive)] text-[var(--paper)] flex items-center justify-center">
              <Check size={28} />
            </div>
          </div>

          <div className="text-center">
            <span className="eyebrow text-[var(--olive)]">Demonstration Complete</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
              Demonstration complete.
            </h1>
            <p className="mt-6 text-lg text-[var(--ink-soft)] leading-relaxed text-pretty">
              No payment was processed and no access was purchased. This was a
              simulated checkout flow for demonstration purposes only.
            </p>
          </div>

          {/* No-receipt disclosure */}
          <div className="mt-10 border border-[var(--rule)] bg-[var(--ivory)] p-6">
            <div className="flex items-center justify-between border-b border-[var(--rule)] pb-3 mb-4">
              <span className="font-mono-label text-[var(--warm-gray)]">
                Demonstration Record
              </span>
              <Wordmark className="text-sm" />
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--warm-gray)] font-mono">Offer</dt>
                <dd className="text-[var(--ink)] text-right">{state.title}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--warm-gray)] font-mono">Type</dt>
                <dd className="text-[var(--ink)] text-right capitalize">{state.type}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--warm-gray)] font-mono">Transaction</dt>
                <dd className="text-[var(--ink)] text-right">None — demonstration</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--warm-gray)] font-mono">Access granted</dt>
                <dd className="text-[var(--clay)] text-right">No</dd>
              </div>
            </dl>
            <p className="mt-4 pt-4 border-t border-[var(--rule)] text-xs text-[var(--warm-gray)] leading-relaxed">
              No transaction ID, receipt number, or payment reference is
              generated. No email is sent. No account is created. When a real
              payment provider is connected, this flow is replaced by a hosted
              checkout and a verified post-purchase state.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={offerHref} className="btn-outline px-6 py-3.5 font-mono-label inline-flex items-center justify-center gap-2">
              Return to the offer
            </Link>
            <Link href="/courses" className="btn-ink px-6 py-3.5 font-mono-label inline-flex items-center justify-center gap-2">
              Keep exploring <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
