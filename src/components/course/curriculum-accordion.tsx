"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics/taxonomy";
import type { CourseModule } from "@/content/types";

interface CurriculumAccordionProps {
  modules: CourseModule[];
  courseSlug: string;
  /**
   * Optional override for the module number that should be open on first paint.
   * Defaults to the first module flagged `isPreview`, falling back to the first module.
   */
  defaultOpenNumber?: string;
  className?: string;
}

/**
 * Curriculum accordion — editorial disclosure pattern for course modules.
 * One module open at a time. Tracks `course_curriculum_expand` analytics on open.
 * The first preview module (or the first module) is open by default.
 */
export function CurriculumAccordion({
  modules,
  courseSlug,
  defaultOpenNumber,
  className,
}: CurriculumAccordionProps) {
  const initialOpen = React.useMemo(() => {
    if (defaultOpenNumber) return defaultOpenNumber;
    const preview = modules.find((m) => m.isPreview);
    return (preview ?? modules[0])?.number ?? null;
  }, [modules, defaultOpenNumber]);

  const [openNumber, setOpenNumber] = React.useState<string | null>(initialOpen);

  const toggle = (m: CourseModule) => {
    const willOpen = openNumber !== m.number;
    setOpenNumber(willOpen ? m.number : null);
    if (willOpen) {
      track({
        type: "course_curriculum_expand",
        slug: courseSlug,
        module: m.number,
      });
    }
  };

  return (
    <div className={cn("border-t border-[var(--rule)]", className)}>
      {modules.map((m) => {
        const isOpen = openNumber === m.number;
        const panelId = `curriculum-${courseSlug}-panel-${m.number}`;
        const buttonId = `curriculum-${courseSlug}-button-${m.number}`;
        const lessonCount = m.lessons.length;
        return (
          <section
            key={m.number}
            className="border-b border-[var(--rule)]"
            aria-labelledby={buttonId}
          >
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(m)}
                className={cn(
                  "w-full flex items-center gap-4 md:gap-6 py-5 md:py-6 text-left",
                  "focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:-outline-offset-2",
                  "group"
                )}
              >
                <span
                  className="num-marker text-[var(--clay)] shrink-0 tabular-nums"
                  aria-hidden
                >
                  {m.number}
                </span>
                <span className="flex-1 font-display text-xl md:text-2xl tracking-[-0.01em] leading-tight text-[var(--ink)]">
                  {m.title}
                </span>
                <span
                  className="hidden sm:inline font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)] shrink-0"
                  aria-hidden
                >
                  {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                  {m.isPreview ? " · preview" : ""}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-[var(--ink)] transition-transform duration-200"
                >
                  {isOpen ? <Minus size={18} strokeWidth={1.75} /> : <Plus size={18} strokeWidth={1.75} />}
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="bg-[var(--ivory)] -mx-4 md:mx-0 px-4 md:px-8 pb-8 md:pb-10"
              >
                <p className="pt-5 md:pt-6 max-w-3xl text-[var(--ink-soft)] leading-relaxed text-pretty">
                  {m.summary}
                </p>

                <ol className="mt-7 space-y-7">
                  {m.lessons.map((lesson, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 pb-7 border-b border-[var(--rule)] last:border-b-0 last:pb-0"
                    >
                      <div className="md:col-span-4">
                        <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                          Lesson {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="mt-1.5 font-display text-lg md:text-xl tracking-[-0.01em] leading-snug text-[var(--ink)]">
                          {lesson.title}
                        </h4>
                      </div>
                      <div className="md:col-span-8">
                        <p className="text-sm md:text-[0.95rem] text-[var(--ink-soft)] leading-relaxed">
                          {lesson.summary}
                        </p>
                        {lesson.objectives.length > 0 && (
                          <div className="mt-3">
                            <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                              You will be able to
                            </span>
                            <ul className="mt-2 space-y-1.5">
                              {lesson.objectives.map((o, j) => (
                                <li
                                  key={j}
                                  className="flex gap-2 text-sm text-[var(--ink-soft)] leading-relaxed"
                                >
                                  <span
                                    aria-hidden
                                    className="text-[var(--olive)] shrink-0 translate-y-[1px]"
                                  >
                                    —
                                  </span>
                                  <span>{o}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                  <div className="border-t border-[var(--rule)] pt-4">
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--clay)]">
                      Assignment
                    </span>
                    <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed text-pretty">
                      {m.assignment}
                    </p>
                  </div>
                  <div className="border-t border-[var(--rule)] pt-4">
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase text-[var(--warm-gray)]">
                      Workload — illustrative
                    </span>
                    <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                      {m.workload}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
