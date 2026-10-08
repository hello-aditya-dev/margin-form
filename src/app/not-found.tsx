import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] border-b border-[var(--rule)] flex items-center">
      <div className="container-editorial py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="num-marker text-[var(--clay)]">404</span>
            <span className="eyebrow">Not Found</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.025em] leading-[0.95] font-normal text-balance">
            This page is not in the catalogue.
          </h1>
          <p className="mt-6 text-lg text-[var(--ink-soft)] leading-relaxed max-w-xl text-pretty">
            The route you tried does not exist, or the slug is invalid. Return
            to the homepage, browse the courses, or search the catalogue.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-ink px-6 py-3.5 font-mono-label inline-flex items-center gap-2">
              Return home <ArrowRight size={14} />
            </Link>
            <Link href="/search" className="btn-outline px-6 py-3.5 font-mono-label inline-flex items-center gap-2">
              Search the site
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            {[
              { label: "Courses", href: "/courses" },
              { label: "Shop", href: "/shop" },
              { label: "Journal", href: "/journal" },
              { label: "Membership", href: "/membership" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border border-[var(--rule)] p-4 hover:border-[var(--ink)] transition-colors font-mono-label"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
