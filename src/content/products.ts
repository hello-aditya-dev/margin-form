import type { Product } from "./types";

export const products: Product[] = [
  {
    slug: "the-proposal-system",
    title: "The Proposal System",
    tagline: "A structured proposal toolkit for independent creative professionals.",
    price: 79,
    currency: "USD",
    category: "Frameworks",
    overview:
      "A complete proposal system built from the templates and clauses used in The Independent Practice. It includes a structured proposal template, a scope worksheet, a revision-boundary framework, a timeline framework, a commercial-assumptions checklist, and a delivery-and-license statement. It is designed to be used, not admired.",
    contents: [
      "A 12-page structured proposal template (editable)",
      "A scope worksheet with explicit exclusions prompts",
      "A revision-boundary framework with three tiers",
      "A project timeline framework that names dependencies",
      "A commercial-assumptions checklist (15 items)",
      "A delivery-formats and usage-license statement",
      "A sample completed proposal for reference",
      "A short usage guide",
    ],
    formats: [
      "Editable document format for the proposal template",
      "PDF worksheets for scope, timeline, and assumptions",
      "Plain-text clauses you can paste into any tool",
    ],
    audience:
      "Independent designers, strategists, consultants, and small studios who write proposals regularly and want a repeatable structure that protects scope and payment.",
    license:
      "Single-practitioner license. Use across your own practice and projects. Not for resale, redistribution, or inclusion in courses or template marketplaces. A studio license for 3+ practitioners is available on request.",
    faqs: [
      {
        q: "What format are the files in?",
        a: "The proposal template is an editable document format; worksheets are PDF and plain-text clauses are included. Everything is designed to drop into your existing tools.",
      },
      {
        q: "Is this the same proposal template from The Independent Practice?",
        a: "It is the same underlying framework, expanded into a standalone toolkit with the worksheets and checklists filled out in more detail. If you have taken the course, this is a useful companion; if you have not, it stands alone.",
      },
      {
        q: "Can I use this for client work?",
        a: "Yes — that is the purpose. The single-practitioner license covers your own practice. Resale and redistribution are not permitted.",
      },
      {
        q: "Is there a refund?",
        a: "A 14-day review window applies, described on the Refund Policy page. Because the product is downloadable, the review window is brief.",
      },
    ],
    preview: {
      name: "The Proposal System — Preview (sample pages)",
      href: "/previews/proposal-system-preview.pdf",
      pages: 4,
    },
    heroAccent: "clay",
    related: [
      {
        title: "The Pricing Workbook",
        href: "/shop/the-pricing-workbook",
        price: "$49",
      },
      {
        title: "The Client Brief Kit",
        href: "/shop/the-client-brief-kit",
        price: "$39",
      },
      {
        title: "The Independent Practice (course)",
        href: "/courses/the-independent-practice",
        price: "$349",
      },
    ],
  },
  {
    slug: "the-pricing-workbook",
    title: "The Pricing Workbook",
    tagline: "A guided workbook that helps creatives reason through costs, capacity, scope, and pricing.",
    price: 49,
    currency: "USD",
    category: "Workbooks",
    overview:
      "Pricing is not a feeling. This workbook walks you through the inputs to a reasoned price: effective capacity, underlying costs, scope complexity, and value to the buyer. It includes worked pricing scenarios and a discount-decision checklist so you can respond to 'can you do it for less?' without guessing.",
    contents: [
      "An effective-capacity worksheet",
      "A cost-assumptions worksheet",
      "A scope-complexity checklist with a multiplier table",
      "Three worked pricing scenarios",
      "A discount-decision checklist",
      "A pricing-model summary page you can reuse per offer",
    ],
    formats: [
      "Printable PDF workbook (24 pages)",
      "Editable worksheet version for digital use",
    ],
    audience:
      "Independent creatives who suspect they underprice, who price by guessing, or who struggle to defend a price when pushed. Also useful for small studios auditing their pricing model.",
    license:
      "Single-practitioner license for personal use. Not for resale, redistribution, or inclusion in courses. Studio licensing available on request.",
    faqs: [
      {
        q: "Will this tell me what to charge?",
        a: "No. It gives you a model for reasoning about price from your own capacity, costs, scope, and value. The output is a reasoned floor and target price for each offer — not a market rate table.",
      },
      {
        q: "Does this promise I will earn more?",
        a: "No. It is a reasoning tool. Whether your pricing improves your income depends on your market and execution.",
      },
      {
        q: "Is this included in The Independent Practice course?",
        a: "A condensed version of the pricing model is taught in Module 04 of the course. This workbook is the expanded, standalone version with worked scenarios.",
      },
      {
        q: "Is there a refund?",
        a: "A 14-day review window applies, described on the Refund Policy page.",
      },
    ],
    preview: {
      name: "The Pricing Workbook — Preview (sample pages)",
      href: "/previews/pricing-workbook-preview.pdf",
      pages: 4,
    },
    heroAccent: "olive",
    related: [
      {
        title: "The Proposal System",
        href: "/shop/the-proposal-system",
        price: "$79",
      },
      {
        title: "The Client Brief Kit",
        href: "/shop/the-client-brief-kit",
        price: "$39",
      },
      {
        title: "The Independent Practice (course)",
        href: "/courses/the-independent-practice",
        price: "$349",
      },
    ],
  },
  {
    slug: "the-client-brief-kit",
    title: "The Client Brief Kit",
    tagline: "A practical client discovery and project-intake toolkit.",
    price: 39,
    currency: "USD",
    category: "Kits",
    overview:
      "A discovery and intake toolkit that helps you start projects with the right information. It includes a discovery questionnaire, a project brief template, a stakeholder checklist, a meeting-notes structure, and a handoff checklist. Use it to turn a vague inquiry into a project that starts cleanly.",
    contents: [
      "A discovery questionnaire (28 questions, grouped)",
      "A project brief template",
      "A stakeholder checklist (who decides, who reviews, who is affected)",
      "A meeting-notes structure for discovery calls",
      "A handoff checklist for project start",
      "A short guide on running the first call",
    ],
    formats: [
      "Printable PDF (18 pages)",
      "Editable document version of the brief template",
    ],
    audience:
      "Independent creatives and small studios who want a repeatable intake process. Especially useful for those whose projects sometimes start with missing information.",
    license:
      "Single-practitioner license for personal use. Not for resale or redistribution. Studio licensing available on request.",
    faqs: [
      {
        q: "Is this the same as the discovery agenda in The Client Pipeline course?",
        a: "It is the expanded, standalone version. The course teaches the framework; the kit gives you the ready-to-use templates and checklists.",
      },
      {
        q: "Can I send the questionnaire directly to clients?",
        a: "Yes. The questionnaire is written to be sent to a client before a discovery call, or used live on the call.",
      },
      {
        q: "Is there a refund?",
        a: "A 14-day review window applies, described on the Refund Policy page.",
      },
    ],
    preview: {
      name: "The Client Brief Kit — Preview (sample pages)",
      href: "/previews/client-brief-kit-preview.pdf",
      pages: 3,
    },
    heroAccent: "ink",
    related: [
      {
        title: "The Proposal System",
        href: "/shop/the-proposal-system",
        price: "$79",
      },
      {
        title: "The Pricing Workbook",
        href: "/shop/the-pricing-workbook",
        price: "$49",
      },
      {
        title: "The Client Pipeline (course)",
        href: "/courses/the-client-pipeline",
        price: "$189",
      },
    ],
  },
];

export const productCategories = ["All", "Frameworks", "Workbooks", "Kits"] as const;
