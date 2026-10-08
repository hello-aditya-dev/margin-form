"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { track } from "@/lib/analytics/taxonomy";

interface DemoCompleteButtonProps {
  offerSlug: string;
  offerTitle: string;
  offerType: "course" | "product" | "membership" | "resource" | "article" | "page";
}

/**
 * Writes short-lived demonstration state to sessionStorage, then navigates
 * to /checkout/demo-complete. The completion page reads this state; if it
 * is absent, a neutral explanation is shown.
 */
export function DemoCompleteButton({
  offerSlug,
  offerTitle,
  offerType,
}: DemoCompleteButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onClick = () => {
    if (pending) return;
    setPending(true);
    try {
      sessionStorage.setItem(
        "mf_demo_checkout",
        JSON.stringify({ slug: offerSlug, title: offerTitle, type: offerType, ts: Date.now() })
      );
    } catch {
      // sessionStorage may be unavailable; navigation still proceeds
    }
    track({ type: "checkout_start", offer: offerSlug, mode: "demo" });
    // brief delay for feedback
    setTimeout(() => {
      track({ type: "demo_checkout_complete", offer: offerSlug });
      router.push("/checkout/demo-complete");
    }, 350);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-busy={pending}
      className="btn-ink px-7 py-4 font-mono-label inline-flex items-center justify-center gap-2 w-full disabled:opacity-60 disabled:cursor-wait"
    >
      {pending ? (
        <>
          <Loader2 size={15} className="animate-spin" /> Processing
        </>
      ) : (
        <>
          Preview checkout completion <ArrowRight size={15} />
        </>
      )}
    </button>
  );
}
