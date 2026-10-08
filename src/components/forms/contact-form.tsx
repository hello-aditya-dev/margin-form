"use client";

import * as React from "react";
import { z } from "zod";
import { Check, Loader2, AlertCircle, Copy } from "lucide-react";
import { track } from "@/lib/analytics/taxonomy";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/config/paths";

/**
 * Subject categories — kept in sync with the categories described on the
 * /contact page. The label is what the visitor sees in the <select>;
 * `value` is what is included in the composed message preview.
 */
const SUBJECT_CATEGORIES = [
  {
    value: "course-access",
    label: "Course access",
    description: "Trouble opening or navigating a purchased course.",
  },
  {
    value: "product-support",
    label: "Product support",
    description: "Question about a downloadable framework, workbook, or kit.",
  },
  {
    value: "membership",
    label: "Membership",
    description: "The Practice Room — plans, billing, or features.",
  },
  {
    value: "press",
    label: "Press",
    description: "Press, podcast, or interview enquiry.",
  },
  {
    value: "other",
    label: "Other",
    description: "Anything that does not fit the categories above.",
  },
] as const;

type SubjectValue = (typeof SUBJECT_CATEGORIES)[number]["value"];

const schema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name.")
    .max(120, "Please keep your name under 120 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.enum(
    SUBJECT_CATEGORIES.map((c) => c.value) as [SubjectValue, ...SubjectValue[]],
    { message: "Please choose a subject." }
  ),
  message: z
    .string()
    .min(10, "Please add a few sentences so we can help usefully.")
    .max(4000, "Please keep your message under 4,000 characters."),
  consent: z.literal(true, {
    message: "Please acknowledge the consent statement.",
  }),
});

/**
 * Local form state. Looser than the zod schema's input type so we can hold
 * empty / partial inputs (an empty subject string, an unchecked consent box)
 * before the user has produced a valid value. `schema.safeParse(values)` is
 * the gate that decides whether the values are valid; the local state is just
 * the working draft.
 */
interface FormState {
  name: string;
  email: string;
  subject: SubjectValue | "";
  message: string;
  consent: boolean;
}

type Status = "idle" | "submitting" | "complete";

interface ContactFormProps {
  className?: string;
  /** Heading context for accessibility */
  labeledBy?: string;
}

const EMPTY_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

export function ContactForm({ className, labeledBy }: ContactFormProps) {
  const [values, setValues] = React.useState<FormState>(EMPTY_STATE);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [copied, setCopied] = React.useState(false);
  const startedRef = React.useRef(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleFirstFocus = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track({ type: "contact_form_start" });
    }
  };

  const composedMessage = React.useMemo(
    () =>
      [
        `To: Margin / Form (demonstration)`,
        `From: ${values.name} <${values.email}>`,
        `Subject: ${subjectLabel(values.subject)}`,
        ``,
        values.message,
      ].join("\n"),
    [values.name, values.email, values.subject, values.message]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!startedRef.current) {
      startedRef.current = true;
      track({ type: "contact_form_start" });
    }
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    // Simulated demo submission. No message is stored or sent.
    await new Promise((r) => setTimeout(r, 900));
    track({ type: "contact_demo_preview" });
    setStatus("complete");
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(composedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard unavailable — silently ignore. The composed message is
      // also shown in the success state so the visitor can copy manually.
    }
  };

  const reset = () => {
    setStatus("idle");
    setValues(EMPTY_STATE);
    setErrors({});
    setCopied(false);
    startedRef.current = false;
  };

  if (status === "complete") {
    return (
      <div
        className={cn("border border-[var(--rule)] bg-[var(--ivory)] p-6 md:p-8", className)}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 shrink-0 text-[var(--olive)]" size={20} />
          <div className="flex-1">
            <p className="font-display text-xl md:text-2xl tracking-tight">
              Form demonstration complete.
            </p>
            <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
              This message was not sent. In demo mode, the contact form
              simulates submission without delivering any message. No name,
              email, or message body is stored or transmitted.
            </p>

            <div className="mt-5 border-t border-[var(--rule)] pt-5">
              <p className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] mb-2">
                Your composed message
              </p>
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-[var(--ink-soft)] bg-[var(--paper-deep)] border border-[var(--rule)] p-4 max-h-64 overflow-auto">
                {composedMessage}
              </pre>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onCopy}
                  className="btn-outline px-4 py-2.5 font-mono-label inline-flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copied to clipboard
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy message to clipboard
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline"
                >
                  Reset form
                </button>
              </div>
              <p className="mt-3 text-xs text-[var(--warm-gray)] leading-relaxed">
                If you would like to actually reach a person, copy the composed
                message and paste it into your own email client. In
                demonstration mode, no inbound email address is configured.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-6", className)}
      aria-labelledby={labeledBy}
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          id="contact-name"
          label="Name"
          error={errors.name}
        >
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onFocus={handleFirstFocus}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onFocus={handleFirstFocus}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <Field id="contact-subject" label="Subject" error={errors.subject}>
        <select
          id="contact-subject"
          value={values.subject ?? ""}
          onFocus={handleFirstFocus}
          onChange={(e) =>
            update("subject", e.target.value as FormState["subject"])
          }
          aria-invalid={!!errors.subject}
          aria-describedby={
            errors.subject ? "contact-subject-error" : undefined
          }
          className={cn(inputClass(!!errors.subject), "appearance-none pr-10 cursor-pointer")}
        >
          <option value="" disabled>
            Choose a subject…
          </option>
          {SUBJECT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label} — {c.description}
            </option>
          ))}
        </select>
      </Field>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          rows={6}
          value={values.message}
          onFocus={handleFirstFocus}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : "contact-message-help"
          }
          className={cn(inputClass(!!errors.message), "resize-y min-h-36")}
        />
        <p
          id="contact-message-help"
          className="mt-1.5 text-xs text-[var(--warm-gray)]"
        >
          A few sentences is enough. In demo mode, nothing you type is stored
          or sent.
        </p>
      </Field>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={values.consent}
          onFocus={handleFirstFocus}
          onChange={(e) => update("consent", e.target.checked)}
          aria-invalid={!!errors.consent}
          aria-describedby={
            errors.consent ? "contact-consent-error" : undefined
          }
          className="mt-1 w-4 h-4 accent-[var(--ink)]"
        />
        <span className="text-xs text-[var(--ink-soft)] leading-relaxed">
          I understand this is a demonstration form. In demo mode, my message
          is not stored or sent. Read the{" "}
          <a
            href={withBase("/privacy")}
            className="underline underline-offset-2 hover:text-[var(--ink)]"
          >
            privacy policy
          </a>
          .
          {errors.consent && (
            <span
              id="contact-consent-error"
              className="block mt-1 text-[var(--clay)]"
            >
              {errors.consent}
            </span>
          )}
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-ink px-7 py-3.5 font-mono-label inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Submitting
            </>
          ) : (
            "Submit message"
          )}
        </button>
        <span className="text-xs text-[var(--warm-gray)]">
          Demo mode — no message is sent.
        </span>
      </div>
    </form>
  );
}

/* ---------- helpers ---------- */

function subjectLabel(value: SubjectValue | ""): string {
  if (!value) return "(no subject)";
  return (
    SUBJECT_CATEGORIES.find((c) => c.value === value)?.label ?? "(no subject)"
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full bg-[var(--ivory)] border px-4 py-3 text-[var(--ink)] placeholder:text-[var(--warm-gray)] focus:outline-none focus:border-[var(--ink)] transition-colors",
    hasError ? "border-[var(--clay)]" : "border-[var(--rule)]"
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] mb-2"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-[var(--clay)] flex items-center gap-1.5"
        >
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}
