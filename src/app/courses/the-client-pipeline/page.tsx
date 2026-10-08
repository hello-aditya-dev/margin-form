import type { Metadata } from "next";
import { courses } from "@/content/courses";
import { CourseView } from "@/components/course/course-view";

/**
 * Static route for The Client Pipeline (specialised course).
 *
 * Next.js prefers this more specific route over the dynamic `/courses/[slug]`
 * fallback. The shared <CourseView /> handles the full sales-page layout.
 */

const course = courses.find((c) => c.slug === "the-client-pipeline")!;

export const metadata: Metadata = {
  title: `${course.title} — Course`,
  description: `${course.tagline} ${course.promise}`.slice(0, 160),
  openGraph: {
    title: `${course.title} — Course · Margin / Form`,
    description: `${course.tagline} ${course.promise}`.slice(0, 160),
    type: "article",
    siteName: "Margin / Form",
  },
  twitter: {
    card: "summary_large_image",
    title: `${course.title} — Course · Margin / Form`,
    description: `${course.tagline} ${course.promise}`.slice(0, 160),
  },
};

export default function Page() {
  return <CourseView course={course} />;
}
