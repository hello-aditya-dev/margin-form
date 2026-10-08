import type { Membership } from "./types";

export const membership: Membership = {
  name: "The Practice Room",
  tagline:
    "A considered space for people building independent creative businesses.",
  whoFor:
    "Independent designers, consultants, strategists, and small-studio founders who have finished (or are working through) a Margin / Form course and want a sustained place to practice the frameworks with peers — without a community that demands performance.",
  benefits: [
    {
      title: "Curated business discussions",
      description:
        "Focused, threaded discussions on pricing, positioning, proposals, and delivery — moderated to stay useful and free of self-promotion.",
    },
    {
      title: "Monthly practice sessions",
      description:
        "A structured monthly session where members bring a real pricing, proposal, or pipeline question and leave with a next step. Sessions are text-first to respect different time zones.",
    },
    {
      title: "Educational office hours",
      description:
        "Twice-monthly office hours where members can ask questions about the course frameworks and get a thoughtful written response.",
    },
    {
      title: "Resource library",
      description:
        "An expanding library of worksheets, templates, and worked examples that extend the course materials.",
    },
    {
      title: "Guided challenges",
      description:
        "Short, optional challenges — a pricing audit, a proposal rewrite, a pipeline review — designed to be done in a week.",
    },
    {
      title: "Practical templates",
      description:
        "Member-only versions of the proposal, pricing, and intake templates, with worked examples from different disciplines.",
    },
    {
      title: "A private peer community",
      description:
        "A small, considered community of independent practitioners. Capped in size to keep discussions coherent.",
    },
  ],
  monthlyProgramming: [
    {
      week: "Week 01",
      title: "Office hours",
      description:
        "Written office hours thread opens. Members submit questions about current projects; responses arrive within the week.",
    },
    {
      week: "Week 02",
      title: "Practice session",
      description:
        "A structured text practice session on a rotating theme — pricing, proposals, pipeline, or delivery. Members bring real situations.",
    },
    {
      week: "Week 03",
      title: "Optional challenge",
      description:
        "A one-week challenge with a clear deliverable. Past examples: rewrite one proposal, audit one offer's pricing, define one client profile.",
    },
    {
      week: "Week 04",
      title: "Office hours & retro",
      description:
        "Second office hours thread plus a light monthly retrospective on what members changed in their practice.",
    },
  ],
  resourcePreviews: [
    { title: "Pricing Model — worked example (consulting)", type: "Worksheet" },
    { title: "Proposal — annotated example (rebrand)", type: "Template" },
    { title: "Weekly review checklist (annotated)", type: "Checklist" },
    { title: "Discovery agenda — annotated call notes", type: "Reference" },
  ],
  plans: [
    {
      id: "practice-room-monthly",
      slug: "the-practice-room-monthly",
      name: "Monthly",
      interval: "month",
      price: 39,
      currency: "USD",
      displayPrice: "$39/mo",
      billingNote: "Billed monthly. Cancel anytime. No long-term commitment.",
      whopCheckoutUrl: undefined,
    },
    {
      id: "practice-room-annual",
      slug: "the-practice-room-annual",
      name: "Annual",
      interval: "year",
      price: 390,
      currency: "USD",
      displayPrice: "$390/yr",
      billingNote:
        "Billed annually. Equivalent to $32.50/mo — two months free versus monthly.",
      whopCheckoutUrl: undefined,
      recommended: true,
    },
  ],
  faqs: [
    {
      q: "Is this a real community or a simulation?",
      a: "In demonstration mode, no live community is running and no member access is granted. The page describes the proposed membership. When a real provider is connected, the features activate and this notice is updated.",
    },
    {
      q: "Do I need to have taken a course first?",
      a: "It helps but is not required. The Practice Room assumes familiarity with the Margin / Form frameworks. If you have not taken a course, the monthly practice sessions may refer to concepts you have not encountered.",
    },
    {
      q: "Is it video or text?",
      a: "Text-first, to respect time zones and to keep discussions searchable and calm. There is no video component in the proposed membership.",
    },
    {
      q: "How is the community kept useful?",
      a: "Discussions are moderated, the community is capped in size, and self-promotion is not permitted. The goal is a small room of practitioners, not a feed.",
    },
    {
      q: "What is the difference between monthly and annual?",
      a: "Same features. Annual is billed once per year at $390, equivalent to two months free versus monthly. The selected plan is what is sent to checkout — it does not change silently.",
    },
    {
      q: "Can I cancel?",
      a: "Yes. Monthly cancels at the end of the billing period. Annual cancels at the end of the year. Refunds follow the Refund Policy page.",
    },
  ],
};
