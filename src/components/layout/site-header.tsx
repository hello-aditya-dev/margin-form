"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { PRIMARY_NAV } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[var(--paper)]/92 backdrop-blur-md border-b border-[var(--rule)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-editorial">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-display tracking-tight hover:opacity-80 transition-opacity"
            aria-label="Margin / Form — home"
          >
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7"
          >
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive(item.href)}
                className="nav-link font-mono-label text-[var(--ink)] hover:text-[var(--clay)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/courses"
              className="btn-ink px-5 py-2.5 text-[0.8125rem] font-mono-label"
            >
              Explore the Courses
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-[var(--ink)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 z-40 bg-[var(--paper)] transition-all duration-300 overflow-y-auto",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div className="container-editorial py-10">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {PRIMARY_NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline justify-between border-b border-[var(--rule)] py-5"
              >
                <span className="font-display text-3xl tracking-tight">
                  {item.label}
                </span>
                <span className="num-marker">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>
          <Link
            href="/courses"
            className="btn-ink mt-8 w-full px-5 py-4 text-center font-mono-label block"
          >
            Explore the Courses
          </Link>
          <p className="mt-8 eyebrow leading-relaxed">
            Portfolio demonstration · Margin / Form is a fictional creator
            business.
          </p>
        </div>
      </div>
    </header>
  );
}
