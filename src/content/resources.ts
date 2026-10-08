import type { FreeResource } from "./types";

export const resources: FreeResource[] = [
  {
    slug: "studio-audit",
    title: "The Studio Audit",
    tagline:
      "A positioning, offer, and inquiry-process review for your independent practice.",
    category: "Self-assessment",
    overview:
      "The flagship free resource. A structured audit that walks you through the six areas where independent creative practices most often drift: positioning, website clarity, offer clarity, inquiry process, pricing communication, and an action-priority worksheet. Use it once a quarter to catch drift before it becomes a gap.",
    contents: [
      "Positioning self-assessment (12 questions)",
      "Website clarity checklist (15 items)",
      "Offer clarity review (8 questions)",
      "Inquiry process review (10 items)",
      "Pricing communication checklist (12 items)",
      "An action-priority worksheet",
    ],
    preview: {
      name: "The Studio Audit (full PDF)",
      href: "/downloads/studio-audit.pdf",
      pages: 14,
    },
    relatedJournal: [
      {
        title: "Why Better Work Does Not Automatically Win Better Clients",
        slug: "why-better-work-does-not-win-better-clients",
      },
      {
        title: "The Case for a Smaller, Clearer Service Menu",
        slug: "the-case-for-a-smaller-clearer-service-menu",
      },
    ],
    relatedOffer: {
      title: "The Independent Practice",
      href: "/courses/the-independent-practice",
      price: "$349",
    },
    isFlagship: true,
  },
  {
    slug: "proposal-checklist",
    title: "The Proposal Checklist",
    tagline: "A one-page checklist for every proposal you send.",
    category: "Checklist",
    overview:
      "A concise checklist of the seven sections a clear proposal needs and the clauses that prevent most disputes — scope, exclusions, revision boundary, timeline, payment, and the decision. Print it. Keep it next to your draft.",
    contents: [
      "The seven-section proposal structure",
      "A scope-and-exclusions prompt set",
      "A revision-boundary framework",
      "A payment-terms checklist",
      "A pre-send review checklist",
    ],
    preview: {
      name: "The Proposal Checklist (PDF)",
      href: "/downloads/proposal-checklist.pdf",
      pages: 3,
    },
    relatedJournal: [
      {
        title: "How to Talk About Pricing Before Sending a Proposal",
        slug: "how-to-talk-about-pricing-before-sending-a-proposal",
      },
    ],
    relatedOffer: {
      title: "The Proposal System",
      href: "/shop/the-proposal-system",
      price: "$79",
    },
  },
  {
    slug: "pricing-starter",
    title: "The Pricing Starter",
    tagline: "A first pricing model for independent creatives who have never written one down.",
    category: "Worksheet",
    overview:
      "A lightweight pricing starter — not the full Pricing Workbook, but enough to stop guessing. It walks you through effective capacity, a simple cost floor, a scope multiplier, and a target price for one offer. A practical entry point before the full course.",
    contents: [
      "An effective-capacity worksheet (simplified)",
      "A cost-floor calculation",
      "A scope-complexity multiplier table",
      "A target-price summary page",
    ],
    preview: {
      name: "The Pricing Starter (PDF)",
      href: "/downloads/pricing-starter.pdf",
      pages: 5,
    },
    relatedJournal: [
      {
        title: "How to Talk About Pricing Before Sending a Proposal",
        slug: "how-to-talk-about-pricing-before-sending-a-proposal",
      },
      {
        title: "Building an Independent Practice without Burning Out",
        slug: "building-an-independent-practice-without-burning-out",
      },
    ],
    relatedOffer: {
      title: "The Pricing Workbook",
      href: "/shop/the-pricing-workbook",
      price: "$49",
    },
  },
];

export function getResourceBySlug(slug: string): FreeResource | undefined {
  return resources.find((r) => r.slug === slug);
}
