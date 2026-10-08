/**
 * MARGIN / FORM — Visual asset manifest.
 *
 * Central registry of all brand imagery. Each entry includes:
 *  - path: relative to /public (use withBase() for raw <img>/<a>)
 *  - alt: accessible alt text
 *  - location: where it's used
 *  - provenance: how it was produced
 *  - aspect: "portrait" | "landscape" | "square"
 *  - darkSuitable: works on dark backgrounds
 *
 * All photographs are original AI-generated editorial imagery produced
 * via the z-ai image generation API for this demonstration. No real
 * person is depicted. The founder portrait is a fictional AI-generated
 * illustrative portrait.
 */

export interface VisualAsset {
  id: string;
  path: string;        // e.g. "/images/hero/hero-studio.jpg"
  webp: string;        // webp variant
  alt: string;
  location: string;
  provenance: string;
  aspect: "portrait" | "landscape" | "square";
  darkSuitable: boolean;
  caption?: string;
}

const AI_PHOTO =
  "Original AI-generated editorial photograph produced via z-ai image generation for this demonstration. No real person depicted.";

export const visuals: Record<string, VisualAsset> = {
  heroStudio: {
    id: "hero-studio",
    path: "/images/hero/hero-studio.jpg",
    webp: "/images/hero/hero-studio.webp",
    alt: "Close-up of a creative professional's hands sketching in an open notebook on a dark walnut desk, surrounded by fabric swatches, art books, a ceramic mug, and a brass ruler in warm golden afternoon window light",
    location: "Homepage hero",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
    caption: "The studio, late afternoon. The work is only half the job.",
  },
  founderPortrait: {
    id: "founder-portrait",
    path: "/images/founder/founder-portrait.jpg",
    webp: "/images/founder/founder-portrait.webp",
    alt: "Editorial portrait of Elena Mercer, a fictional creative-business educator in her early 30s with brown hair and an oatmeal wool blazer, seated thoughtfully at a studio desk — AI-generated illustrative portrait",
    location: "Homepage founder section, About page",
    provenance:
      "AI-generated illustrative portrait of a fictional founder. Elena Mercer is entirely fictional; no real person is depicted.",
    aspect: "portrait",
    darkSuitable: false,
    caption: "Elena Mercer — AI-generated illustrative portrait of a fictional founder.",
  },
  founderAtWork: {
    id: "founder-at-work",
    path: "/images/founder/founder-at-work.jpg",
    webp: "/images/founder/founder-at-work.webp",
    alt: "A creative professional reviewing proposal layouts and printed documents at a dark walnut studio table, warm side window light",
    location: "About page, homepage founder section",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  creativeProcess: {
    id: "creative-process",
    path: "/images/founder/creative-process.jpg",
    webp: "/images/founder/creative-process.webp",
    alt: "Close-up of hands arranging printed notes, paper samples, and a brass ruler on a textured dark walnut desk",
    location: "Homepage problem section, course methodology",
    provenance: AI_PHOTO,
    aspect: "square",
    darkSuitable: false,
  },
  studioEnvironment: {
    id: "studio-environment",
    path: "/images/founder/studio-environment.jpg",
    webp: "/images/founder/studio-environment.webp",
    alt: "An independent design workspace interior with floor-to-ceiling wooden bookshelves, a desk, and soft natural window light",
    location: "About page, membership page",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  courseIndependentPractice: {
    id: "course-independent-practice",
    path: "/images/courses/course-independent-practice.jpg",
    webp: "/images/courses/course-independent-practice.webp",
    alt: "A thick terracotta-clay colored creative-business workbook resting on a warm cream linen surface with soft directional window light",
    location: "Homepage, courses catalogue, course detail page",
    provenance: AI_PHOTO,
    aspect: "portrait",
    darkSuitable: true,
  },
  courseClientPipeline: {
    id: "course-client-pipeline",
    path: "/images/courses/course-client-pipeline.jpg",
    webp: "/images/courses/course-client-pipeline.webp",
    alt: "An olive-sage green creative-business workbook on a dark walnut surface with printed worksheets and a mechanical pencil",
    location: "Homepage, courses catalogue, course detail page",
    provenance: AI_PHOTO,
    aspect: "portrait",
    darkSuitable: true,
  },
  productProposalSystem: {
    id: "product-proposal-system",
    path: "/images/products/product-proposal-system.jpg",
    webp: "/images/products/product-proposal-system.webp",
    alt: "A flat-lay of a structured proposal toolkit with stacked printed documents, a clipboard, and a scope worksheet on a dark walnut desk",
    location: "Homepage shop section, shop, product detail",
    provenance: AI_PHOTO,
    aspect: "square",
    darkSuitable: false,
  },
  productPricingWorkbook: {
    id: "product-pricing-workbook",
    path: "/images/products/product-pricing-workbook.jpg",
    webp: "/images/products/product-pricing-workbook.webp",
    alt: "An open pricing workbook with grid-like worksheets and a table of multiplier values on a dark walnut desk with a mechanical pencil",
    location: "Homepage shop section, shop, product detail",
    provenance: AI_PHOTO,
    aspect: "square",
    darkSuitable: false,
  },
  productClientBriefKit: {
    id: "product-client-brief-kit",
    path: "/images/products/product-client-brief-kit.jpg",
    webp: "/images/products/product-client-brief-kit.webp",
    alt: "A client discovery kit with a printed questionnaire, project brief template, and stakeholder checklist stacked on a charcoal surface with a pen",
    location: "Homepage shop section, shop, product detail",
    provenance: AI_PHOTO,
    aspect: "square",
    darkSuitable: false,
  },
  membershipPracticeRoom: {
    id: "membership-practice-room",
    path: "/images/membership/membership-practice-room.jpg",
    webp: "/images/membership/membership-practice-room.webp",
    alt: "A warm collaborative creative studio with a large dark walnut table, sketchbooks, notebooks, and ceramic coffee cups in soft natural light",
    location: "Homepage membership section, membership page",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
    caption: "The Practice Room — illustrative atmosphere for a fictional community.",
  },
  newsletterMondayLetter: {
    id: "newsletter-monday-letter",
    path: "/images/newsletter/newsletter-monday-letter.jpg",
    webp: "/images/newsletter/newsletter-monday-letter.webp",
    alt: "An editorial still life of a folded letter on heavyweight cream paper with a ceramic coffee cup and handwritten notes in quiet morning light",
    location: "Homepage newsletter section, newsletter page",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  resourceStudioAudit: {
    id: "resource-studio-audit",
    path: "/images/resources/resource-studio-audit.jpg",
    webp: "/images/resources/resource-studio-audit.webp",
    alt: "An open audit workbook with a scoring framework and action-priority worksheet on a warm cream surface with a pen",
    location: "Homepage free resource section, resources hub, resource detail",
    provenance: AI_PHOTO,
    aspect: "square",
    darkSuitable: false,
  },
  journalBetterClients: {
    id: "journal-better-clients",
    path: "/images/journal/journal-better-clients.jpg",
    webp: "/images/journal/journal-better-clients.webp",
    alt: "A considered creative workspace with an open printed portfolio, client notes, and a ceramic cup on a dark walnut desk",
    location: "Journal article: Why Better Work Does Not Automatically Win Better Clients",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  journalServiceMenu: {
    id: "journal-service-menu",
    path: "/images/journal/journal-service-menu.jpg",
    webp: "/images/journal/journal-service-menu.webp",
    alt: "A minimal still life of three carefully arranged objects — a ceramic cup, a folded note card, and a brass ruler — on warm cream paper",
    location: "Journal article: The Case for a Smaller, Clearer Service Menu",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  journalPricingConversations: {
    id: "journal-pricing-conversations",
    path: "/images/journal/journal-pricing-conversations.jpg",
    webp: "/images/journal/journal-pricing-conversations.webp",
    alt: "Printed project estimate pages, a vintage mechanical calculator, and handwritten pricing notes on a dark walnut desk",
    location: "Journal article: How to Talk About Pricing Before Sending a Proposal",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  journalClientBriefs: {
    id: "journal-client-briefs",
    path: "/images/journal/journal-client-briefs.jpg",
    webp: "/images/journal/journal-client-briefs.webp",
    alt: "A top-down view of structured notes, pencil sketches, and briefing materials arranged on cream paper on a dark walnut surface",
    location: "Journal article: What a Good Client Brief Actually Needs",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  journalSustainablePractice: {
    id: "journal-sustainable-practice",
    path: "/images/journal/journal-sustainable-practice.jpg",
    webp: "/images/journal/journal-sustainable-practice.webp",
    alt: "A quiet minimalist studio corner with a single wooden chair, a tall window with soft warm light, and a potted dried plant",
    location: "Journal article: Building an Independent Practice without Burning Out",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
  journalWeeklyReview: {
    id: "journal-weekly-review",
    path: "/images/journal/journal-weekly-review.jpg",
    webp: "/images/journal/journal-weekly-review.webp",
    alt: "An open journal, mechanical pencil, and small notebook on a dark walnut desk in soft morning window light with a ceramic cup",
    location: "Journal article: The Quiet Power of a Repeatable Weekly Review",
    provenance: AI_PHOTO,
    aspect: "landscape",
    darkSuitable: false,
  },
};

/** Map journal article slugs to their visual asset IDs */
export const journalVisualMap: Record<string, keyof typeof visuals> = {
  "why-better-work-does-not-win-better-clients": "journalBetterClients",
  "the-case-for-a-smaller-clearer-service-menu": "journalServiceMenu",
  "how-to-talk-about-pricing-before-sending-a-proposal": "journalPricingConversations",
  "what-a-good-client-brief-actually-needs": "journalClientBriefs",
  "building-an-independent-practice-without-burning-out": "journalSustainablePractice",
  "the-quiet-power-of-a-repeatable-weekly-review": "journalWeeklyReview",
};

/** Map course slugs to their visual asset IDs */
export const courseVisualMap: Record<string, keyof typeof visuals> = {
  "the-independent-practice": "courseIndependentPractice",
  "the-client-pipeline": "courseClientPipeline",
};

/** Map product slugs to their visual asset IDs */
export const productVisualMap: Record<string, keyof typeof visuals> = {
  "the-proposal-system": "productProposalSystem",
  "the-pricing-workbook": "productPricingWorkbook",
  "the-client-brief-kit": "productClientBriefKit",
};

/** Get a visual by ID */
export function getVisual(id: keyof typeof visuals): VisualAsset {
  return visuals[id];
}
