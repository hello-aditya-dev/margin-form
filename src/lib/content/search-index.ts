/**
 * Margin / Form — site-wide search index.
 *
 * A structured, typed searchable index compiled from the canonical content
 * sources (courses, products, journal articles, free resources) plus a small
 * set of hand-curated page entries for the most useful top-level routes.
 *
 * The index is intentionally simple — title + description + category — and is
 * filtered client-side. No external service, no network call.
 */

import { courses } from "@/content/courses";
import { products } from "@/content/products";
import { articles } from "@/content/journal";
import { resources } from "@/content/resources";
import { formatPrice } from "@/lib/commerce/offers";

export interface SearchEntry {
  id: string;
  type: "course" | "product" | "article" | "resource" | "page";
  title: string;
  description: string;
  href: string;
  category?: string;
  price?: string;
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // ----- Courses -----
  for (const c of courses) {
    entries.push({
      id: `course-${c.slug}`,
      type: "course",
      title: c.title,
      description: c.tagline,
      href: `/courses/${c.slug}`,
      category: "Course",
      price: formatPrice(c.price, c.currency),
    });
  }

  // ----- Products -----
  for (const p of products) {
    entries.push({
      id: `product-${p.slug}`,
      type: "product",
      title: p.title,
      description: p.tagline,
      href: `/shop/${p.slug}`,
      category: p.category,
      price: formatPrice(p.price, p.currency),
    });
  }

  // ----- Journal articles -----
  for (const a of articles) {
    entries.push({
      id: `article-${a.slug}`,
      type: "article",
      title: a.title,
      // Include category + reading time so searches like "pricing 5 min" work.
      description: `${a.excerpt} · ${a.category} · ${a.readingTime}`,
      href: `/journal/${a.slug}`,
      category: a.category,
    });
  }

  // ----- Free resources -----
  for (const r of resources) {
    entries.push({
      id: `resource-${r.slug}`,
      type: "resource",
      title: r.title,
      description: r.tagline,
      href: `/resources/${r.slug}`,
      category: r.category,
    });
  }

  // ----- Key pages -----
  // A small, curated set of navigational entries. Not every route — just the
  // ones a reader is likely to look for by name.
  const pages: SearchEntry[] = [
    {
      id: "page-home",
      type: "page",
      title: "Home",
      description:
        "Margin / Form — practical education, frameworks, and community for independent creative professionals.",
      href: "/",
      category: "Page",
    },
    {
      id: "page-about",
      type: "page",
      title: "About",
      description:
        "The founder, the philosophy, and the quiet, repeatable business of staying independent.",
      href: "/about",
      category: "Page",
    },
    {
      id: "page-membership",
      type: "page",
      title: "The Practice Room (Membership)",
      description:
        "A considered space for people building independent creative businesses. Curated discussions, monthly practice sessions, and office hours.",
      href: "/membership",
      category: "Membership",
    },
    {
      id: "page-newsletter",
      type: "page",
      title: "The Monday Letter (Newsletter)",
      description:
        "One useful idea for a better independent practice. A short Monday letter on pricing, positioning, clients, systems, and independent work.",
      href: "/newsletter",
      category: "Newsletter",
    },
    {
      id: "page-journal",
      type: "page",
      title: "The Journal",
      description:
        "Essays on the business of independent creativity — pricing, positioning, proposals, pipeline, and operating rhythm.",
      href: "/journal",
      category: "Page",
    },
    {
      id: "page-shop",
      type: "page",
      title: "Shop",
      description:
        "Frameworks, workbooks, and kits. The Proposal System, The Pricing Workbook, The Client Brief Kit.",
      href: "/shop",
      category: "Page",
    },
    {
      id: "page-courses",
      type: "page",
      title: "Courses",
      description:
        "The Independent Practice and The Client Pipeline — two courses, one coherent system.",
      href: "/courses",
      category: "Page",
    },
    {
      id: "page-resources",
      type: "page",
      title: "Free Resources",
      description:
        "Useful things, free. The Studio Audit, The Proposal Checklist, The Pricing Starter.",
      href: "/resources",
      category: "Page",
    },
    {
      id: "page-faq",
      type: "page",
      title: "FAQ",
      description:
        "Frequently asked questions about courses, products, membership, and demo behaviour.",
      href: "/faq",
      category: "Page",
    },
    {
      id: "page-contact",
      type: "page",
      title: "Contact",
      description:
        "Reach the studio. Demonstration form — no message is stored or sent in demo mode.",
      href: "/contact",
      category: "Page",
    },
  ];

  entries.push(...pages);

  return entries;
}

export const searchIndex: SearchEntry[] = buildIndex();
