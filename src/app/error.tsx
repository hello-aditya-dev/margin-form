"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[70vh] border-b border-[var(--rule)] flex items-center">
      <div className="container-editorial py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="num-marker text-[var(--clay)]">ERR</span>
            <span className="eyebrow">Something went wrong</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl tracking-[-0.02em] leading-[1.0] font-normal text-balance">
            An unexpected error occurred.
          </h1>
          <p className="mt-6 text-[var(--ink-soft)] leading-relaxed">
            The page failed to render. You can try again, or return to the
            homepage. If the problem persists, the demonstration environment
            may need a restart.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={reset}
              className="btn-ink px-6 py-3.5 font-mono-label inline-flex items-center justify-center"
            >
              Try again
            </button>
            <Link href="/" className="btn-outline px-6 py-3.5 font-mono-label inline-flex items-center justify-center">
              Return home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
