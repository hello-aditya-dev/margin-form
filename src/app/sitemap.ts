import type { MetadataRoute } from "next";
import { courses } from "@/content/courses";
import { products } from "@/content/products";
import { resources } from "@/content/resources";
import { articles } from "@/content/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://marginform.example";
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/membership",
    "/shop",
    "/newsletter",
    "/resources",
    "/journal",
    "/search",
    "/contact",
    "/faq",
    "/support",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/accessibility",
    "/demo-information",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  for (const c of courses) {
    entries.push({
      url: `${base}/courses/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    });
  }
  for (const p of products) {
    entries.push({
      url: `${base}/shop/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
  }
  for (const r of resources) {
    entries.push({
      url: `${base}/resources/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  }
  for (const a of articles) {
    entries.push({
      url: `${base}/journal/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
