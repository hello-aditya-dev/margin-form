import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses } from "@/content/courses";
import { CourseView } from "@/components/course/course-view";

/**
 * Dynamic course fallback route.
 *
 * The two known courses are also served by their own static routes
 * (`/courses/the-independent-practice` and `/courses/the-client-pipeline`).
 * Next.js prefers the more specific static route, so this file only handles
 * other slugs — for which it calls `notFound()`.
 *
 * `generateStaticParams` is still exported so the build pre-renders both
 * valid slugs (this is required for `output: export` and harmless otherwise).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then((p) => {
    const course = courses.find((c) => c.slug === p.slug);
    if (!course) {
      return { title: "Course not found" };
    }
    const title = `${course.title} — Course`;
    const description = `${course.tagline} ${course.promise}`.slice(0, 160);
    return {
      title,
      description,
      openGraph: {
        title: `${title} · Margin / Form`,
        description,
        type: "article",
        siteName: "Margin / Form",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} · Margin / Form`,
        description,
      },
    };
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) {
    notFound();
  }
  return <CourseView course={course} />;
}
