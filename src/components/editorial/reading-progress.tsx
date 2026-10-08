"use client";

import * as React from "react";

/**
 * ReadingProgress — decorative scroll-progress bar fixed to the top of the
 * viewport. Fills with the clay accent as the reader descends the article.
 *
 * Accessibility: this is a decorative affordance, so it is hidden from
 * assistive technology via aria-hidden. Reduced-motion users get an
 * instant (transition-free) fill to avoid the width animation.
 */
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);

    let raf = 0;
    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onMq);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-[var(--clay)] origin-left"
        style={{
          width: `${progress}%`,
          transition: reducedMotion ? "none" : "width 80ms linear",
        }}
      />
    </div>
  );
}
