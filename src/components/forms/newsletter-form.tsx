"use client";

import * as React from "react";
import { z } from "zod";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { track } from "@/lib/analytics/taxonomy";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  consent: z.literal(true, {
    message: "Please acknowledge the consent statement.",
  }),
});

interface NewsletterFormProps {
  variant?: "inline" | "stacked";
  className?: string;
  /** Heading context for accessibility */
  labeledBy?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({
  variant = "inline",
  className,
  labeledBy,
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<{ email?: string; consent?: string }>({});
  const startedRef = React.useRef(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!startedRef.current) {
      startedRef.current = true;
      track({ type: "newsletter_form_start" });
    }
    const parsed = schema.safeParse({ email, consent });
    if (!parsed.success) {
      const fieldErrors: { email?: string; consent?: string } = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0] === "email") fieldErrors.email = issue.message;
        if (issue.path[0] === "consent") fieldErrors.consent = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("submitting");
    // Simulated demo submission. No email is stored or sent.
    await new Promise((r) => setTimeout(r, 900));
    track({ type: "newsletter_demo_submit" });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div
        className={cn("border border-[var(--rule)] bg-[var(--ivory)] p-6", className)}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 shrink-0 text-[var(--olive)]" size={20} />
          <div>
            <p className="font-display text-xl tracking-tight">
              Form demonstration complete.
            </p>
            <p className="mt-1 text-sm text-[var(--ink-soft)] leading-relaxed">
              This email was not added to a mailing list. In demo mode, the
              newsletter form simulates the subscription interaction without
              storing or sending any address. When a real provider (such as
              Kit) is connected, this notice updates and real subscriptions
              activate.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setEmail("");
                setConsent(false);
                startedRef.current = false;
              }}
              className="mt-3 font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline"
            >
              Reset form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-4", className)}
      aria-labelledby={labeledBy}
      noValidate
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          variant === "inline" && "md:flex-row md:items-start"
        )}
      >
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@studio.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className={cn(
              "w-full bg-[var(--ivory)] border px-4 py-3.5 text-[var(--ink)] placeholder:text-[var(--warm-gray)] focus:outline-none focus:border-[var(--ink)] transition-colors",
              errors.email ? "border-[var(--clay)]" : "border-[var(--rule)]"
            )}
          />
          {errors.email && (
            <p
              id="newsletter-email-error"
              className="mt-1.5 text-xs text-[var(--clay)] flex items-center gap-1.5"
            >
              <AlertCircle size={13} /> {errors.email}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-ink px-6 py-3.5 font-mono-label inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Submitting
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (errors.consent) setErrors((p) => ({ ...p, consent: undefined }));
          }}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "newsletter-consent-error" : undefined}
          className="mt-1 w-4 h-4 accent-[var(--ink)]"
        />
        <span className="text-xs text-[var(--ink-soft)] leading-relaxed">
          I understand this is a demonstration form. In demo mode, no email is
          stored or sent. Read the{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:text-[var(--ink)]"
          >
            privacy policy
          </a>
          .
          {errors.consent && (
            <span
              id="newsletter-consent-error"
              className="block mt-1 text-[var(--clay)]"
            >
              {errors.consent}
            </span>
          )}
        </span>
      </label>
    </form>
  );
}
