import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/editorial/markdown";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility statement for the Margin / Form portfolio demonstration. WCAG 2.2 AA practices, what was done, what automated checks do not establish, manual keyboard review status, contact for accessibility issues, and known limitations.",
  robots: { index: false, follow: false },
};

const ACCESSIBILITY_BODY = `## What this is

This accessibility statement describes the **Margin / Form portfolio demonstration**. The site is built to **WCAG 2.2 AA** practices, with semantic HTML, keyboard navigation, visible focus, reduced-motion support, and meaningful alt text. Automated axe checks have been run on representative pages; manual keyboard review has been completed on primary routes.

Real accessibility review is required before commercial activation. The wording on this page is editorial, not a substitute for a formal audit by a qualified accessibility professional.

## What was done

The demonstration was built with accessibility in mind from the start, not as an afterthought. Concretely:

- **Semantic HTML.** Pages use proper heading order (one \`h1\` per page, descending hierarchy without skipped levels), landmark elements (\`header\`, \`main\`, \`footer\`, \`nav\`, \`aside\`), and native form controls wherever possible.
- **Keyboard navigation.** All interactive elements are reachable and operable with the keyboard alone. The membership plan selector uses a radiogroup pattern with arrow-key navigation and roving tabindex; the curriculum and FAQ accordions use the disclosure pattern with \`aria-expanded\` and \`aria-controls\`.
- **Visible focus.** A high-contrast focus ring (2px solid ink, 3px offset) is applied to every focusable element. Focus is never removed without an equivalent visual affordance.
- **Reduced motion.** The site respects \`prefers-reduced-motion\`. When a visitor has the setting enabled, all animations and transitions are collapsed to a near-zero duration via a global CSS rule.
- **Alt text.** Decorative imagery is marked \`aria-hidden\` or given empty alt text. Meaningful images (covers, artwork, document mockups) have descriptive alt text or are accompanied by visible captions.
- **Skip link.** A "Skip to content" link is the first focusable element on every page, visible on focus.
- **Colour contrast.** The editorial palette (paper, ink, clay, olive) was chosen for contrast. Body text, headings, and interactive elements meet AA contrast ratios against their backgrounds.
- **Form labels.** Every form field has a visible label and an associated \`label[for]\` or \`aria-labelledby\`. Error messages are connected via \`aria-describedby\` and \`aria-invalid\`.

## What automated checks do not establish

Automated **axe** checks have been run on representative pages — the home page, a course detail page, a product detail page, the membership page, and the contact page. The checks cover a useful subset of WCAG success criteria but **do not establish complete WCAG conformance**.

Automated checks cannot reliably detect:

- Meaningful sequence and reading order for screen-reader users across complex layouts.
- Whether alt text is accurate and useful (only whether it is present).
- Whether keyboard interactions match ARIA patterns in real usage.
- Cognitive load, plain language, or the appropriateness of error recovery.
- Real-world experience with assistive technologies beyond the lab.

A clean axe scan is a starting point, not a finish line.

## Manual keyboard review

Manual keyboard navigation has been reviewed on primary routes — home, courses, courses/[slug], shop, shop/[slug], membership, journal, journal/[slug], resources, search, about, contact, faq, support, and the legal pages. The review confirmed that all interactive elements are reachable, operable, and visible on focus, and that the disclosure and radiogroup patterns work as expected.

Manual review with screen readers (VoiceOver on macOS, NVDA on Windows) has been **partial**. Full screen-reader review is planned before commercial activation.

## Contact for accessibility issues

If you encounter an accessibility barrier on the site, please raise it through the [contact page](/contact). Choose the subject that best fits (typically "Other") and describe the issue, the page where it occurred, and the assistive technology you were using.

In demo mode, the contact form simulates submission and does not deliver a message; the composed text can be copied to your clipboard and pasted into your own email client. When a real provider is connected, accessibility issues will be acknowledged within two business days and tracked to resolution.

## Known limitations

- **Third-party embeds.** No third-party embeds (video players, social widgets, comment systems) are currently used. If embeds are added in live mode, they will be reviewed for accessibility and disclosed here.
- **Live region timing.** The search results count uses \`aria-live="polite"\`. In rare cases, very fast typing may delay the announcement by a fraction of a second.
- **Colour-only encoding.** The category badges on the search results page use colour in addition to text labels; colour is never the sole carrier of meaning.
- **Demo-only surfaces.** The demo checkout confirmation screen is a static illustration and does not represent the live checkout experience. The live checkout, hosted by the payment provider, has its own accessibility statement.
- **Manual screen-reader testing.** As noted above, full screen-reader review is partial and will be completed before commercial activation.

## Changes to this statement

This statement may be updated as the demonstration evolves and as more thorough review is completed. The date of the most recent revision is shown below.

---

_Last revised: editorial draft for the demonstration. Real accessibility review is required before commercial activation._`;

export default function AccessibilityPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Legal · Accessibility</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              Accessibility statement.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              How the Margin / Form demonstration is built for accessibility —
              and an honest account of what automated checks do and do not
              establish.
            </p>
            <p className="mt-6 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
              Target: WCAG 2.2 AA
            </p>
          </div>
        </div>
      </section>

      {/* ============ BODY ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-8 space-y-6">
                <div>
                  <p className="eyebrow text-[var(--clay)] mb-2">At a glance</p>
                  <dl className="space-y-3 text-sm">
                    <div className="border-b border-[var(--rule)] pb-3">
                      <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                        Target
                      </dt>
                      <dd className="mt-1 font-display text-base">
                        WCAG 2.2 AA
                      </dd>
                    </div>
                    <div className="border-b border-[var(--rule)] pb-3">
                      <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                        Automated checks
                      </dt>
                      <dd className="mt-1 font-display text-base">
                        axe, representative pages
                      </dd>
                    </div>
                    <div className="border-b border-[var(--rule)] pb-3">
                      <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                        Keyboard review
                      </dt>
                      <dd className="mt-1 font-display text-base">
                        Primary routes
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-[var(--warm-gray)]">
                        Screen-reader review
                      </dt>
                      <dd className="mt-1 font-display text-base text-[var(--clay)]">
                        Partial
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-[var(--rule)] pt-5">
                  <p className="eyebrow text-[var(--warm-gray)] mb-2">
                    Related
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/contact"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Report an issue
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Privacy policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/demo-information"
                        className="text-[var(--ink-soft)] hover:text-[var(--clay)] transition-colors link-underline"
                      >
                        Demo information
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
            <div className="lg:col-span-9 reading-column">
              <Markdown content={ACCESSIBILITY_BODY} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEMO DISCLOSURE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="container-editorial py-12 md:py-14">
          <div className="flex items-start gap-4">
            <span className="num-marker text-[var(--clay)] shrink-0 mt-1">
              ※
            </span>
            <p className="text-sm md:text-base text-[var(--paper)]/85 leading-relaxed max-w-3xl text-pretty">
              Automated axe checks have been run on representative pages.
              Manual keyboard navigation has been reviewed on primary routes.
              Automated checks do not establish complete WCAG conformance. Real
              accessibility review is required before commercial activation.{" "}
              <Link
                href="/demo-information"
                className="text-[var(--paper)] underline underline-offset-2 hover:text-[var(--clay)]"
              >
                Read the full disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
