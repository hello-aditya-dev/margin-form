import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Margin / Form. Course access, product support, membership, press, or anything else. In demonstration mode, the contact form simulates submission without sending any message.",
  robots: { index: false, follow: true },
};

const SUBJECT_CATEGORIES = [
  {
    n: "01",
    value: "Course access",
    description:
      "Trouble opening, navigating, or downloading a purchased course. Include the course name and the email you would have used at checkout.",
  },
  {
    n: "02",
    value: "Product support",
    description:
      "Question about a downloadable framework, workbook, or kit — file format, license, edit access, or printing. Include the product name.",
  },
  {
    n: "03",
    value: "Membership",
    description:
      "The Practice Room — plan selection, billing questions, switching monthly to annual, or cancelling. Include the plan you are on (or considering).",
  },
  {
    n: "04",
    value: "Press",
    description:
      "Press, podcast, or interview enquiries. Please include your publication, the angle, and your deadline.",
  },
  {
    n: "05",
    value: "Other",
    description:
      "Anything that does not fit the categories above — partnerships, corrections, or general questions. A few sentences is enough.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="num-marker text-[var(--clay)]">01</span>
              <span className="eyebrow">Contact</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.98] font-normal text-balance">
              Get in touch.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed text-pretty">
              The form below is the primary way to reach Margin / Form. Pick the
              subject that fits, write a few sentences, and the demo will show
              you exactly what would have been sent.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SUBJECT CATEGORIES ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">02</span>
                <span className="eyebrow">Subjects</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl tracking-[-0.015em] leading-[1.05] font-normal text-balance">
                Choose the subject that fits.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                Routing by subject keeps responses faster and clearer. If
                nothing fits, choose <em>Other</em> — the form still works.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ol className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                {SUBJECT_CATEGORIES.map((c) => (
                  <li key={c.n} className="py-6 flex gap-6">
                    <span
                      className="num-marker text-[var(--clay)] pt-1 shrink-0"
                      aria-hidden
                    >
                      {c.n}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight">
                        {c.value}
                      </h3>
                      <p className="mt-1.5 text-[var(--ink-soft)] leading-relaxed text-pretty">
                        {c.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FORM ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="num-marker text-[var(--clay)]">03</span>
                <span className="eyebrow">The form</span>
              </div>
              <h2
                id="contact-heading"
                className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.02] font-normal text-balance"
              >
                Write to the practice.
              </h2>
              <p className="mt-6 text-[var(--ink-soft)] leading-relaxed text-pretty">
                In demonstration mode, submitting the form does not deliver a
                message. The composed message is shown back to you and can be
                copied to your clipboard so you can paste it into your own
                email client if you would like to actually reach a person.
              </p>
              <p className="mt-4 text-sm text-[var(--warm-gray)] leading-relaxed">
                No name, email, or message body is stored or transmitted in
                demo mode.
              </p>
            </div>
            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--rule)]">
              <ContactForm labeledBy="contact-heading" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRIVACY NOTE ============ */}
      <section className="border-b border-[var(--rule)] bg-[var(--paper-deep)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <span className="num-marker text-[var(--clay)]">04</span>
                <span className="eyebrow">Privacy</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight leading-tight text-balance">
                What happens to your message.
              </h2>
            </div>
            <div className="lg:col-span-8 reading-column">
              <p className="text-[var(--ink-soft)] leading-relaxed text-pretty">
                In demonstration mode, nothing you type into the contact form is
                stored or transmitted. The form validates locally, simulates a
                submission, and shows you the composed message — that is the
                full extent of what happens.
              </p>
              <p className="mt-4 text-[var(--ink-soft)] leading-relaxed text-pretty">
                When a real provider is connected (an email service, a help-desk
                tool, or a form backend), this disclosure will update to
                describe exactly what is stored, for how long, and how to
                request deletion. Read the full{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--ink)]"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ALTERNATIVES ============ */}
      <section className="border-b border-[var(--rule)]">
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="num-marker text-[var(--clay)]">05</span>
            <span className="eyebrow">Before you write</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/faq"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">Try first</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  Frequently asked questions
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  Common questions on courses, payment, membership, products,
                  the newsletter, accessibility, and contact — answered
                  directly.
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0 mt-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/support"
              className="group editorial-card p-8 flex items-start justify-between gap-6"
            >
              <div>
                <span className="eyebrow">For purchases</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-[var(--clay)] transition-colors">
                  Support
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  Product access, payment routing, subscription management,
                  course access, and response expectations.
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--warm-gray)] group-hover:text-[var(--clay)] transition-colors shrink-0 mt-1"
                aria-hidden
              />
            </Link>
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
              In demonstration mode, the contact form does not deliver a
              message. The composed text is shown back to you and can be copied
              to your clipboard. No name, email, or message body is stored or
              transmitted.{" "}
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
