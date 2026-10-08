/**
 * Margin / Form — content model types.
 * Single source of truth for courses, products, membership,
 * resources, journal articles, FAQs and offers.
 */

export type ContentType =
  | "course"
  | "product"
  | "membership"
  | "resource"
  | "article"
  | "page";

export type BillingInterval = "one_time" | "month" | "year";

export interface CheckoutOffer {
  id: string;
  slug: string;
  type: ContentType;
  title: string;
  description: string;
  price: number; // in major currency units (USD)
  currency: string;
  billingInterval: BillingInterval;
  features: string[];
  deliverables: string[];
  /** Demo mode is always available; whopCheckoutUrl activates hosted checkout */
  whopCheckoutUrl?: string;
  visibility: "public" | "hidden";
  availability: "available" | "coming_soon";
  relatedContent?: { title: string; href: string }[];
}

export interface Lesson {
  title: string;
  summary: string;
  objectives: string[];
}

export interface CourseModule {
  number: string; // "01"
  title: string;
  summary: string;
  lessons: Lesson[];
  assignment: string;
  workload: string; // labelled illustrative
  isPreview?: boolean; // publicly accessible preview module/lesson
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  price: number;
  currency: string;
  audience: string;
  promise: string;
  problemFraming: string;
  outcomes: string[];
  format: string;
  accessModel: string;
  whatIsIncluded: string[];
  whatIsNotPromised: string[];
  modules: CourseModule[];
  sampleLesson: {
    title: string;
    body: string; // markdown-lite
    worksheetName: string;
    worksheetHref: string;
  };
  instructor: {
    name: string;
    role: string;
    bio: string;
  };
  faqs: { q: string; a: string }[];
  relatedOffers: { title: string; href: string; price?: string }[];
  heroAccent: "clay" | "olive" | "ink";
  coverLabel: string; // e.g. "Vol. 01"
  isFlagship?: boolean;
}

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  price: number;
  currency: string;
  category: "Frameworks" | "Workbooks" | "Kits";
  overview: string;
  contents: string[];
  formats: string[];
  audience: string;
  license: string;
  faqs: { q: string; a: string }[];
  preview: {
    name: string;
    href: string;
    pages: number;
  };
  heroAccent: "clay" | "olive" | "ink";
  related: { title: string; href: string; price: string }[];
}

export interface MembershipPlan {
  id: string;
  slug: string;
  name: string;
  interval: BillingInterval;
  price: number;
  currency: string;
  displayPrice: string; // "$39/mo" or "$390/yr"
  billingNote: string;
  whopCheckoutUrl?: string;
  recommended?: boolean;
}

export interface Membership {
  name: string;
  tagline: string;
  whoFor: string;
  benefits: { title: string; description: string }[];
  monthlyProgramming: { week: string; title: string; description: string }[];
  resourcePreviews: { title: string; type: string }[];
  plans: MembershipPlan[];
  faqs: { q: string; a: string }[];
}

export interface FreeResource {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  overview: string;
  contents: string[];
  preview: {
    name: string;
    href: string;
    pages: number;
  };
  relatedJournal: { title: string; slug: string }[];
  relatedOffer: { title: string; href: string; price: string };
  isFlagship?: boolean;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "Pricing" | "Positioning" | "Clients" | "Systems" | "Independent Work";
  author: string;
  publishedAt: string; // ISO date
  readingTime: string;
  volume: string; // "Vol. 01"
  issue: string; // "No. 03"
  heroAccent: "clay" | "olive" | "ink";
  body: string; // markdown-lite
  exercise?: { title: string; body: string };
  relatedResources: { title: string; href: string }[];
  relatedOffer: { title: string; href: string; price: string };
}

export interface FaqItem {
  category: string;
  q: string;
  a: string;
}

export interface Founder {
  name: string;
  role: string;
  statement: string;
  narrative: string[];
  principles: { title: string; body: string }[];
  expertise: string[];
  voice: string;
  quote: string;
}
