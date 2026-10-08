import type { Course } from "./types";

export const courses: Course[] = [
  {
    slug: "the-independent-practice",
    title: "The Independent Practice",
    tagline: "Build the business around the work.",
    price: 349,
    currency: "USD",
    audience:
      "Independent creatives with professional skills who need an organized business system — designers, consultants, strategists, and small studios who can do the work but want a calmer, repeatable way to run it.",
    promise:
      "Help you develop clearer positioning, intentional pricing, a proposal process that protects your time, and repeatable client-management habits — so the business stops being improvised month to month.",
    problemFraming:
      "Most creative professionals were taught to improve their craft. Few were taught how to price it, scope it, propose it, and deliver it without losing the practice they wanted in the first place. The result is a career that produces good work but inconsistent income, unclear boundaries, and quiet burnout.",
    outcomes: [
      "Articulate a positioning that makes referrals and inquiries easier to qualify.",
      "Price work from a reasoned cost-and-capacity model rather than guesswork.",
      "Run a discovery process that surfaces scope and risk before the proposal.",
      "Write proposals that protect scope, revisions, and payment terms.",
      "Deliver projects with a repeatable onboarding, checkpoint, and handoff rhythm.",
      "Build a weekly operating rhythm that keeps the pipeline and the practice visible.",
    ],
    format:
      "Self-paced structured curriculum. Eight modules with written lessons, frameworks, worksheets, and assignments. No video library is promised — instructional writing and downloadable frameworks are the primary format. Live sessions are not part of the self-paced edition.",
    accessModel:
      "Lifetime access to the current version of the course materials, including future text and framework updates. Access is delivered through the Margin / Form learning environment after purchase.",
    whatIsIncluded: [
      "Eight structured modules with written lessons and frameworks",
      "A downloadable worksheet for every module",
      "The Independent Practice field notebook (PDF)",
      "A proposal template and scope worksheet",
      "A pricing model workbook",
      "A weekly operating-rhythm checklist",
      "Lifetime access to current materials and text updates",
      "A publicly viewable preview lesson before purchase",
    ],
    whatIsNotPromised: [
      "No guarantee of income, revenue, or client acquisition results.",
      "No video recordings or live coaching in the self-paced edition.",
      "No 1:1 feedback on your work from the instructor.",
      "No access to a private community (that lives in The Practice Room, sold separately).",
      "No certification, credential, or formal accreditation.",
      "No promise that the frameworks will fit every discipline unchanged.",
    ],
    modules: [
      {
        number: "01",
        title: "Define Your Practice",
        summary:
          "Before pricing or pipelines, you need a clear definition of what your practice actually is — the work you want to be known for, the work you will decline, and the conditions under which the work stays good.",
        lessons: [
          {
            title: "The practice versus the services",
            summary:
              "Separating what you make from what you sell, and why the confusion costs you clarity.",
            objectives: [
              "Distinguish practice (the craft) from services (the offers)",
              "Identify which services currently subsidise the practice",
              "Write a one-paragraph definition of the practice you want",
            ],
          },
          {
            title: "What you will decline",
            summary: "A practice is partly defined by its exclusions.",
            objectives: [
              "List three project types you will no longer take",
              "Articulate the reason for each exclusion",
              "Use the exclusions to sharpen positioning",
            ],
          },
          {
            title: "Conditions for good work",
            summary:
              "Naming the conditions that let you do good work — time, budget, access, trust.",
            objectives: [
              "List the minimum conditions for your best work",
              "Flag which current clients violate those conditions",
              "Plan a conversation to repair or end those engagements",
            ],
          },
        ],
        assignment:
          "Write a one-page Practice Definition: the work you want, the work you will decline, and the three conditions under which your work stays good.",
        workload: "Illustrative · approximately 2–3 hours of reading and writing.",
        isPreview: false,
      },
      {
        number: "02",
        title: "Position Your Expertise",
        summary:
          "Positioning is not a tagline. It is the discipline of being specific enough that the right clients recognise themselves and the wrong clients self-select out.",
        lessons: [
          {
            title: "Specificity over category",
            summary: "Why generalists struggle to be referred and remembered.",
            objectives: [
              "Audit current positioning language for vagueness",
              "Rewrite positioning around a specific buyer and outcome",
              "Test it against three recent referrals",
            ],
          },
          {
            title: "The positioning sentence",
            summary: "A single sentence that organises everything else.",
            objectives: [
              "Draft a positioning sentence using the provided template",
              "Identify what the sentence lets you say no to",
              "Use it consistently across site, proposals, and intros",
            ],
          },
        ],
        assignment:
          "Write your positioning sentence and use it in three real places within two weeks: your website subhead, a proposal, and an introduction email.",
        workload: "Illustrative · approximately 2–3 hours.",
        isPreview: false,
      },
      {
        number: "03",
        title: "Package What You Sell",
        summary:
          "Unscoped services force you to reprice every conversation. Packaging turns your expertise into objects a buyer can understand, compare, and choose between.",
        lessons: [
          {
            title: "From hours to offers",
            summary: "Why hourly pricing penalises skill and rewards slowness.",
            objectives: [
              "Map current services to discrete offers",
              "Define what is and is not included in each offer",
              "Write offer one-liners a buyer can repeat",
            ],
          },
          {
            title: "The three-offer menu",
            summary:
              "A deliberately small service menu reduces decision fatigue and improves proposals.",
            objectives: [
              "Design a three-offer menu with clear scope",
              "Differentiate by scope and outcome, not by discount",
              "Document the boundaries of each offer",
            ],
          },
          {
            title: "Naming and pricing anchors",
            summary: "Names and structure shape how price is perceived.",
            objectives: [
              "Name offers so they describe the outcome, not the hours",
              "Establish a price anchor for each offer",
              "Sequence offers so the mid-tier is the natural choice",
            ],
          },
        ],
        assignment:
          "Produce a one-page service menu: three offers, each with a one-line description, scope, exclusions, and an indicative price anchor.",
        workload: "Illustrative · approximately 3–4 hours.",
        isPreview: false,
      },
      {
        number: "04",
        title: "Price with Intention",
        summary:
          "Pricing is not a feeling. It is a reasoned model of your capacity, your costs, the scope of the work, and the value the work creates for the buyer. This module gives you the model.",
        lessons: [
          {
            title: "Capacity first",
            summary: "You cannot price well if you do not know your real capacity.",
            objectives: [
              "Calculate effective working capacity per month",
              "Identify non-billable load that erodes capacity",
              "Set a capacity ceiling you will not exceed",
            ],
          },
          {
            title: "Costs, scope, and value",
            summary: "Three pricing inputs that should never be reduced to one.",
            objectives: [
              "Document underlying cost floor per offer",
              "Map scope complexity to a multiplier",
              "Assess value created for the buyer without overclaiming",
            ],
          },
          {
            title: "Pricing scenarios",
            summary: "Worked examples for common independent-practice situations.",
            objectives: [
              "Price a fixed-scope project end-to-end",
              "Price a retainer without scope creep",
              "Respond to a budget-below-floor inquiry gracefully",
            ],
          },
        ],
        assignment:
          "Complete the Pricing Model Workbook for one current or upcoming offer: capacity, costs, scope multiplier, and a floor and target price.",
        workload: "Illustrative · approximately 3–4 hours.",
        isPreview: false,
      },
      {
        number: "05",
        title: "Build a Repeatable Client Pipeline",
        summary:
          "A pipeline is not a hustle. It is a small set of habits that keep the right kind of work approaching you, so you are never starting from zero when a project ends.",
        lessons: [
          {
            title: "The pipeline as a rhythm",
            summary: "Why sporadic outreach fails and steady habits compound.",
            objectives: [
              "Define the four pipeline stages for your practice",
              "Set a weekly time budget for pipeline activity",
              "Identify the single highest-leverage activity for your stage",
            ],
          },
          {
            title: "Inquiries and introductions",
            summary: "Turning warm interest into qualified conversations.",
            objectives: [
              "Write an inquiry-reply template that qualifies early",
              "Define what disqualifies a lead",
              "Build a simple tracking view for open inquiries",
            ],
          },
          {
            title: "Referrals on purpose",
            summary: "Referrals are a system, not luck.",
            objectives: [
              "Design a post-project referral request",
              "Identify which clients are referral sources",
              "Make the introduction easy to give",
            ],
          },
        ],
        assignment:
          "Design your weekly pipeline rhythm on one page: the time slot, the single activity, and the tracking metric.",
        workload: "Illustrative · approximately 2–3 hours.",
        isPreview: false,
      },
      {
        number: "06",
        title: "Write Better Proposals",
        summary:
          "A proposal is not a sales document. It is a shared agreement about what will happen, what will not, what it costs, and what happens when things change. Bad proposals create bad projects.",
        lessons: [
          {
            title: "The anatomy of a clear proposal",
            summary: "The seven sections a proposal needs and the order they belong in.",
            objectives: [
              "Structure proposals using the provided template",
              "Write scope as outcomes with explicit exclusions",
              "Place price in context, not in isolation",
            ],
          },
          {
            title: "Revisions, timelines, and payment",
            summary: "The three clauses that prevent most project disputes.",
            objectives: [
              "Draft a revision boundary that is generous and clear",
              "Write a timeline that names dependencies",
              "Structure payment terms that protect cashflow",
            ],
          },
          {
            title: "Sending and following up",
            summary: "How you send a proposal shapes how it is received.",
            objectives: [
              "Write a proposal cover note that frames the decision",
              "Schedule a review call rather than waiting silently",
              "Handle a no without burning the relationship",
            ],
          },
        ],
        assignment:
          "Rewrite one recent or upcoming proposal using the template, including explicit scope, exclusions, revision boundary, and payment terms.",
        workload: "Illustrative · approximately 3–4 hours.",
        isPreview: false,
      },
      {
        number: "07",
        title: "Deliver without Chaos",
        summary:
          "Delivery is where independent practices quietly break. The work is good, but the experience is disorganised — and the next project never arrives because the last one ended in confusion.",
        lessons: [
          {
            title: "Onboarding that sets the tone",
            summary: "The first week determines the rest of the project.",
            objectives: [
              "Design a repeatable onboarding sequence",
              "Define what the client provides and by when",
              "Set communication norms explicitly",
            ],
          },
          {
            title: "Checkpoints, not surprises",
            summary: "Why mid-project silence creates scope creep.",
            objectives: [
              "Schedule checkpoints at scope-decision points",
              "Write checkpoint agendas that surface risk early",
              "Document decisions as you go",
            ],
          },
          {
            title: "Handoff and close-out",
            summary: "A clean close-out is what produces the next project.",
            objectives: [
              "Design a handoff package the client can use",
              "Run a simple project retrospective",
              "Request a referral and a testimonial in writing",
            ],
          },
        ],
        assignment:
          "Document your delivery sequence as a checklist: onboarding, checkpoints, handoff, and close-out — with templates for each.",
        workload: "Illustrative · approximately 3 hours.",
        isPreview: false,
      },
      {
        number: "08",
        title: "Build Your Operating Rhythm",
        summary:
          "An independent practice needs a weekly and monthly rhythm or it slowly drifts. This module assembles the previous seven into a single operating cadence you can actually keep.",
        lessons: [
          {
            title: "The weekly review",
            summary: "Thirty minutes a week that prevent most surprises.",
            objectives: [
              "Run the weekly review using the provided checklist",
              "Update pipeline, capacity, and cashflow views",
              "Decide the single most important task for next week",
            ],
          },
          {
            title: "The monthly close",
            summary: "A light financial and pipeline review each month.",
            objectives: [
              "Close the month in under an hour",
              "Compare actuals to the pricing model",
              "Adjust the next month's plan from evidence",
            ],
          },
          {
            title: "The quarterly reset",
            summary: "When to change the practice, and when to leave it alone.",
            objectives: [
              "Review positioning, pricing, and pipeline quarterly",
              "Decide what to stop, start, and keep",
              "Protect the practice from reactive change",
            ],
          },
        ],
        assignment:
          "Schedule your weekly, monthly, and quarterly cadence on the calendar and run one full weekly review using the checklist.",
        workload: "Illustrative · approximately 2 hours to set up.",
        isPreview: false,
      },
    ],
    sampleLesson: {
      title:
        "Preview Lesson — Module 02, Lesson 01: Specificity over Category",
      body: `Most independent creatives describe what they do in category terms. "I'm a designer." "I do brand strategy." "I'm a consultant." These are accurate and useless. They describe a shelf in a supermarket, not a practice a buyer can recognise.

The problem with category positioning is that it forces every referral to do the work of explaining why *you* and not someone else in the same category. The referrer has to remember your name, recall your category, and then improvise a reason you are the right choice. Most of the time, they do not. They refer the person whose specific outcome they can repeat in one sentence.

**Specificity is not a niche.** A niche is a market segment. Specificity is a description. You can serve a broad market and still be specific about the outcome you produce. "I help independent law firms redesign their intake process so they stop losing clients in the first week" is specific. "I do UX consulting" is not.

The test is simple. Can a satisfied client repeat what you do in one sentence, to a person who has never met you, in a way that would make that person recognise themselves as a potential client? If not, the positioning is doing the work of preventing referrals.

### An exercise

Take your current one-line positioning and ask:

1. Does it name a buyer or a situation?
2. Does it name an outcome they care about?
3. Does it exclude anyone?

If the answer to all three is yes, you have a positioning sentence. If not, rewrite it until it does. The worksheet for this lesson walks you through the rewrite.

> The goal of positioning is not to sound impressive. It is to make the right next conversation easy to start.

This is a preview. The full lesson includes the rewrite framework, three worked examples from different disciplines, and the positioning-sentence worksheet.`,
      worksheetName: "Positioning Sentence Worksheet (PDF preview)",
      worksheetHref: "/downloads/positioning-sentence-workbook-preview.pdf",
    },
    instructor: {
      name: "Elena Mercer",
      role: "Founder · Educator · Creative-business strategist (fictional)",
      bio: "Elena built a career across brand strategy, independent consulting, and creative operations, and observed how strong creative skills do not automatically produce stable independent businesses. Margin / Form is the fictional education business built around the practical frameworks she developed. This is a demonstration identity, not a verified professional history.",
    },
    faqs: [
      {
        q: "Is this a video course?",
        a: "No. The self-paced edition is a written curriculum with downloadable frameworks and worksheets. No video library is promised. If video is added in a future edition, it will be clearly announced.",
      },
      {
        q: "How long does it take to complete?",
        a: "The course is self-paced. Illustrative workload per module is 2–4 hours of reading and writing, so a deliberate pace of one module per week takes about two months. There is no deadline.",
      },
      {
        q: "Do I get feedback on my work?",
        a: "Not in the self-paced edition. The assignments are designed to be self-directed. If you want peer discussion and structured practice, consider The Practice Room membership.",
      },
      {
        q: "Will this guarantee I make more money?",
        a: "No. The course teaches frameworks for positioning, pricing, proposals, and delivery. Whether they produce results depends on your discipline, market, and execution. No income is promised or implied.",
      },
      {
        q: "Is there a refund policy?",
        a: "Yes — a 14-day review window from purchase, described in detail on the Refund Policy page. This is a demonstration storefront, so no real purchase occurs in demo mode.",
      },
      {
        q: "Do I need to be a designer to benefit?",
        a: "No. The frameworks are written for independent creative professionals broadly — designers, strategists, consultants, writers, and small studios. Examples span disciplines.",
      },
    ],
    relatedOffers: [
      {
        title: "The Client Pipeline",
        href: "/courses/the-client-pipeline",
        price: "$189",
      },
      {
        title: "The Practice Room (membership)",
        href: "/membership",
        price: "$39/mo",
      },
      {
        title: "The Pricing Workbook",
        href: "/shop/the-pricing-workbook",
        price: "$49",
      },
    ],
    heroAccent: "clay",
    coverLabel: "Vol. 01",
    isFlagship: true,
  },
  {
    slug: "the-client-pipeline",
    title: "The Client Pipeline",
    tagline: "A calmer, more repeatable way to find good-fit work.",
    price: 189,
    currency: "USD",
    audience:
      "Independent creatives who already have skills and a small body of work, but whose pipeline is erratic — too much work one month, silence the next, and no clear habits in between.",
    promise:
      "Give you a repeatable pipeline built on a small number of weekly habits, so inquiry volume becomes more predictable and the work that arrives is more often the work you actually want.",
    problemFraming:
      "Feast-or-famine is not a personality trait. It is the predictable result of treating pipeline as a mood instead of a rhythm. When pipeline activity is reactive, you start outreach only when you are afraid, and you stop the moment you are busy — which guarantees the next gap.",
    outcomes: [
      "Define the client profile that produces good-fit work for your practice.",
      "Build a small, repeatable set of weekly pipeline habits.",
      "Turn inquiries into qualified discovery conversations.",
      "Run a discovery process that protects both your time and the client's.",
      "Write proposals that emerge naturally from a real discovery.",
      "Keep the pipeline visible and healthy without obsessing over it.",
    ],
    format:
      "Self-paced structured curriculum. Six modules with written lessons, frameworks, and worksheets. No video library is promised. Live sessions are not included in the self-paced edition.",
    accessModel:
      "Lifetime access to the current version of the course materials, including future text and framework updates.",
    whatIsIncluded: [
      "Six structured modules with written lessons and frameworks",
      "A downloadable worksheet for every module",
      "A client-profile definition template",
      "A discovery call agenda and note-taking structure",
      "A weekly pipeline rhythm checklist",
      "A simple pipeline-tracking view template",
      "Lifetime access to current materials",
      "A publicly viewable preview lesson before purchase",
    ],
    whatIsNotPromised: [
      "No guarantee of inquiries, clients, or revenue.",
      "No cold-outreach scripts that pretend to be personal.",
      "No video recordings or live coaching.",
      "No access to lead lists or contact databases.",
      "No promise that the same habits work identically across disciplines.",
    ],
    modules: [
      {
        number: "01",
        title: "Define the Right Client",
        summary:
          "You cannot build a pipeline to clients you have not defined. This module produces a written client profile that every later activity is measured against.",
        lessons: [
          {
            title: "The client profile",
            summary: "Going past demographics into the situations that produce good work.",
            objectives: [
              "Describe the buyer's situation, not just their industry",
              "Identify the trigger that makes them look for you",
              "Flag the disqualifiers that save you both time",
            ],
          },
          {
            title: "Good-fit vs available",
            summary: "Why taking available work erodes the practice over time.",
            objectives: [
              "List three traits of past good-fit clients",
              "List three traits of past bad-fit clients",
              "Use the contrast to sharpen the profile",
            ],
          },
        ],
        assignment:
          "Write a one-page client profile: the buyer, the trigger, the scope they need, and the disqualifiers.",
        workload: "Illustrative · approximately 2 hours.",
        isPreview: false,
      },
      {
        number: "02",
        title: "Find Relevant Opportunities",
        summary:
          "Pipeline is not about volume of outreach. It is about being present in the small number of places where your defined client already looks for help.",
        lessons: [
          {
            title: "Where your client looks",
            summary: "Mapping the actual discovery path of your best past clients.",
            objectives: [
              "Trace how three good clients found you",
              "Identify the two channels worth sustaining",
              "Stop maintaining channels that never produced good-fit work",
            ],
          },
          {
            title: "Visibility without performance",
            summary: "Being findable without becoming a content personality.",
            objectives: [
              "Define the minimum visible footprint for your practice",
              "Write a single canonical answer to 'what do you do'",
              "Make one piece of evidence findable per quarter",
            ],
          },
        ],
        assignment:
          "Choose two channels to sustain for the next quarter and write the minimum activity for each.",
        workload: "Illustrative · approximately 2–3 hours.",
        isPreview: false,
      },
      {
        number: "03",
        title: "Start Better Conversations",
        summary:
          "An inquiry is not a conversation. This module turns inbound interest and warm introductions into qualified discovery calls that respect everyone's time.",
        lessons: [
          {
            title: "The inquiry reply",
            summary: "A short, structured reply that qualifies before it schedules.",
            objectives: [
              "Draft an inquiry-reply template",
              "Include two qualifying questions",
              "Make a no-show or a mismatch cheap to surface",
            ],
          },
          {
            title: "Warm introductions",
            summary: "Asking for and receiving introductions without awkwardness.",
            objectives: [
              "Write a forwardable introduction request",
              "Make the introducer look good",
              "Follow up once, gracefully",
            ],
          },
          {
            title: "Saying no early",
            summary: "A respectful early no is a pipeline asset.",
            objectives: [
              "Recognise disqualifiers in the first reply",
              "Write a kind no that leaves the door open",
              "Redirect mismatched inquiries where possible",
            ],
          },
        ],
        assignment:
          "Write your inquiry-reply template, your introduction request template, and your kind-no template.",
        workload: "Illustrative · approximately 2 hours.",
        isPreview: false,
      },
      {
        number: "04",
        title: "Run a Discovery Process",
        summary:
          "Discovery is the most undervalued hour in independent practice. Done well, it surfaces scope, risk, budget, and fit — and makes the proposal almost write itself.",
        lessons: [
          {
            title: "The discovery agenda",
            summary: "A repeatable structure that surfaces what matters.",
            objectives: [
              "Use the provided discovery agenda",
              "Ask about constraints before solutions",
              "Document risk explicitly",
            ],
          },
          {
            title: "Listening for the real brief",
            summary: "Clients rarely state the real brief first.",
            objectives: [
              "Identify the stated brief vs the underlying need",
              "Ask follow-up questions that surface stakes",
              "Summarise back before moving on",
            ],
          },
        ],
        assignment:
          "Run one discovery call using the agenda and submit a redacted summary using the provided structure.",
        workload: "Illustrative · approximately 2–3 hours including the call.",
        isPreview: false,
      },
      {
        number: "05",
        title: "Build a Useful Proposal",
        summary:
          "A proposal built on real discovery is short, specific, and easy to say yes to. This module connects discovery to proposal without padding.",
        lessons: [
          {
            title: "From discovery to scope",
            summary: "Translating the discovery notes into a scope a buyer can read.",
            objectives: [
              "Write scope as outcomes with explicit exclusions",
              "Connect each scope item to a discovery finding",
              "Avoid scope you did not hear in discovery",
            ],
          },
          {
            title: "Price, terms, and the decision",
            summary: "Placing price in context and making the decision easy.",
            objectives: [
              "Anchor price to the outcome, not the hours",
              "Write payment terms that protect cashflow",
              "End with a clear next step",
            ],
          },
        ],
        assignment:
          "Draft a proposal from a recent or hypothetical discovery using the provided template.",
        workload: "Illustrative · approximately 3 hours.",
        isPreview: false,
      },
      {
        number: "06",
        title: "Keep the Pipeline Healthy",
        summary:
          "A pipeline decays the moment you stop looking at it. This module installs a light weekly rhythm that keeps the pipeline visible without becoming a burden.",
        lessons: [
          {
            title: "The weekly pipeline check",
            summary: "Twenty minutes a week that prevent most gaps.",
            objectives: [
              "Run the weekly pipeline check using the provided checklist",
              "Update the four pipeline stages",
              "Decide the one pipeline action for the week",
            ],
          },
          {
            title: "Recognising pipeline problems early",
            summary: "The four signals that a gap is coming.",
            objectives: [
              "Identify the early warning signals",
              "Choose the right response to each",
              "Avoid panic outreach when a gap appears",
            ],
          },
        ],
        assignment:
          "Set up the pipeline-tracking view and run the weekly check three weeks in a row.",
        workload: "Illustrative · approximately 2 hours to set up, 20 minutes weekly.",
        isPreview: false,
      },
    ],
    sampleLesson: {
      title: "Preview Lesson — Module 01, Lesson 01: The Client Profile",
      body: `When independent creatives describe their ideal client, they usually describe a person they liked working with. That is a memory, not a profile. A profile has to be specific enough that you could recognise the next one before the project starts.

A useful client profile has four parts.

**The buyer.** Not the industry, the buyer. A marketing director at a 40-person independent law firm is a buyer. "Legal" is not. The buyer is the person who decides, not the person who signs the invoice.

**The trigger.** Something happened that made them look for help. A rebrand that stalled. A founder leaving. A new service line that needs a name. Without a trigger, there is no project — only curiosity. Naming the trigger tells you where to be visible.

**The scope they need.** What they actually buy, in their language. Not what you wish they bought. If your best clients consistently buy a six-week sprint and not a retainer, the profile says so.

**The disqualifiers.** The traits that, if present, mean you should decline. Budget below your floor. A decision-maker who is not in the room. A timeline that requires you to drop other clients.

When you have all four, you can read an inquiry and know within a minute whether it is worth a call. That is the point. The profile is not a wish. It is a filter.

> A pipeline built on a vague profile will deliver vague work.

The worksheet walks you through writing the profile from your three best past clients.`,
      worksheetName: "Client Profile Worksheet (PDF preview)",
      worksheetHref: "/downloads/client-profile-workbook-preview.pdf",
    },
    instructor: {
      name: "Elena Mercer",
      role: "Founder · Educator · Creative-business strategist (fictional)",
      bio: "Elena developed the pipeline frameworks in this course from observation of independent practices that stayed calm through gaps — and those that didn't. This is a demonstration identity; no professional history is implied.",
    },
    faqs: [
      {
        q: "Is this a sales or outreach course?",
        a: "No. It is a pipeline course. It does not teach cold outreach scripts, funnel automation, or sales personality techniques. It teaches a small set of repeatable habits for independent creatives.",
      },
      {
        q: "Do I need to have an existing audience?",
        a: "No, but you need to have done some client work. The frameworks use your past clients as raw material. If you have never had a client, this course is premature.",
      },
      {
        q: "How is this different from The Independent Practice?",
        a: "The Independent Practice is the full system: positioning, pricing, proposals, delivery, and operating rhythm. The Client Pipeline goes deeper on the pipeline specifically. Many learners take The Independent Practice first and The Client Pipeline as a focused follow-on.",
      },
      {
        q: "Is there a refund?",
        a: "Yes — a 14-day review window, described on the Refund Policy page. No real purchase occurs in demo mode.",
      },
      {
        q: "Will this guarantee me clients?",
        a: "No. The course teaches a repeatable process. Results depend on your market, discipline, and consistency.",
      },
    ],
    relatedOffers: [
      {
        title: "The Independent Practice",
        href: "/courses/the-independent-practice",
        price: "$349",
      },
      {
        title: "The Client Brief Kit",
        href: "/shop/the-client-brief-kit",
        price: "$39",
      },
      {
        title: "The Practice Room (membership)",
        href: "/membership",
        price: "$39/mo",
      },
    ],
    heroAccent: "olive",
    coverLabel: "Vol. 02",
  },
];
