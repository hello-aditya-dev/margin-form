import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { FOOTER_NAV, LEGAL_NAV, SITE_CONFIG } from "@/lib/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--rule)] bg-[var(--paper-deep)]">
      <div className="container-editorial py-14 md:py-20">
        {/* Top: brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="font-display text-3xl md:text-4xl tracking-tight hover:opacity-80 transition-opacity"
              aria-label="Margin / Form — home"
            >
              <Wordmark />
            </Link>
            <p className="mt-5 text-[var(--ink-soft)] text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <p className="mt-6 eyebrow text-[var(--clay)]">
              An editorial education company
            </p>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <h3 className="eyebrow mb-4">{col.heading}</h3>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-[var(--rule)]" />

        {/* Bottom: disclosure + legal */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow text-[var(--clay)] mb-2">
              Demonstration Notice
            </p>
            <p className="text-xs text-[var(--warm-gray)] leading-relaxed">
              {SITE_CONFIG.disclosure}{" "}
              <Link
                href="/demo-information"
                className="underline underline-offset-2 hover:text-[var(--ink)]"
              >
                Read the full disclosure →
              </Link>
            </p>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-[var(--warm-gray)] hover:text-[var(--ink)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-mono text-[0.6875rem] text-[var(--warm-gray)] tracking-wider">
            © {year} MARGIN / FORM — DEMONSTRATION PROJECT
          </p>
          <p className="font-mono text-[0.6875rem] text-[var(--warm-gray)] tracking-wider">
            NO LEGAL ENTITY IS IMPLIED · ALL CONTENT FICTIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
