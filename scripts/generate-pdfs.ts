/**
 * MARGIN / FORM — PDF generator
 * Generates the 8 downloadable / preview PDFs for the site.
 *
 * Design language:
 *  - Warm paper field (#F3EEE6)
 *  - Ink text (#252721)
 *  - Clay accents (#AD4E36)
 *  - Olive secondary (#777F68)
 *  - Editorial header (wordmark + resource title) + page-number footer
 *  - Section numbers, generous spacing, hairline rules
 *
 * Run with: `bun run scripts/generate-pdfs.ts`
 */

import PDFDocument from "pdfkit";
import * as fs from "fs";
import * as path from "path";

// ============================================================
// Palette + geometry
// ============================================================

const PAPER = "#F3EEE6";
const PAPER_DEEP = "#ECE5D7";
const IVORY = "#FCFAF6";
const INK = "#252721";
const INK_SOFT = "#4A4C44";
const CLAY = "#AD4E36";
const OLIVE = "#777F68";
const WARM_GRAY = "#756F65";
const RULE = "#E4DDCF";

const PAGE_W = 595.28; // A4 width, pt
const PAGE_H = 841.89; // A4 height, pt
const MARGIN = 64;
const CONTENT_W = PAGE_W - 2 * MARGIN;

const ROOT = path.resolve(__dirname, "..");
const DOWNLOADS_DIR = path.join(ROOT, "public", "downloads");
const PREVIEWS_DIR = path.join(ROOT, "public", "previews");

// ============================================================
// Low-level helpers
// ============================================================

type Doc = PDFKit.PDFDocument;

function newDoc(title: string): Doc {
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    // Compress content streams so files stay small but real content is preserved.
    compress: true,
    info: {
      Title: title,
      Author: "Margin / Form",
      Subject: "Demonstration resource",
      Producer: "Margin / Form",
      Creator: "Margin / Form",
    },
  });
  paintBackground(doc);
  return doc;
}

function paintBackground(doc: Doc) {
  doc.save();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(PAPER);
  doc.restore();
  doc.fillColor(INK);
}

function nextPage(doc: Doc) {
  // Note: must pass `size: "A4"` explicitly — addPage defaults to LETTER
  // if size is not specified, which would shrink new pages to 792pt tall.
  doc.addPage({ size: "A4", margin: 0 });
  paintBackground(doc);
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Stream a doc to a file path; resolves on finish. */
function saveDoc(doc: Doc, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);
    stream.on("error", reject);
    stream.on("finish", () => resolve());
    doc.pipe(stream);
    doc.end();
  });
}

// ============================================================
// Editorial chrome — header, footer, section header, rules
// ============================================================

function drawHeader(doc: Doc, resourceTitle: string) {
  const y = 44;

  // Left: MARGIN / FORM wordmark (MARGIN + clay slash + FORM)
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK);
  const marginW = doc.widthOfString("MARGIN");
  doc.text("MARGIN", MARGIN, y);

  doc.font("Helvetica").fontSize(9).fillColor(CLAY);
  const slashStr = "  /  ";
  const slashW = doc.widthOfString(slashStr);
  doc.text(slashStr, MARGIN + marginW, y);

  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK);
  doc.text("FORM", MARGIN + marginW + slashW, y);

  // Right: resource title (right-aligned)
  doc.font("Helvetica").fontSize(8).fillColor(WARM_GRAY);
  doc.text(resourceTitle.toUpperCase(), MARGIN + 140, y, {
    align: "right",
    width: CONTENT_W - 140,
  });

  // Hairline rule
  const ruleY = y + 14;
  doc
    .moveTo(MARGIN, ruleY)
    .lineTo(PAGE_W - MARGIN, ruleY)
    .strokeColor(RULE)
    .lineWidth(0.5)
    .stroke();
}

function drawFooter(doc: Doc, pageNum: number, totalPages: number, label = "Demonstration resource") {
  const y = PAGE_H - 44;
  doc
    .moveTo(MARGIN, y - 12)
    .lineTo(PAGE_W - MARGIN, y - 12)
    .strokeColor(RULE)
    .lineWidth(0.5)
    .stroke();

  // Left: page number (mono-style, zero-padded)
  doc.font("Helvetica").fontSize(8).fillColor(WARM_GRAY);
  const pageStr = `${String(pageNum).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  doc.text(pageStr, MARGIN, y);

  // Right: short disclosure
  doc.font("Helvetica").fontSize(8).fillColor(WARM_GRAY);
  doc.text(`MARGIN / FORM  ·  ${label}`, MARGIN + 80, y, {
    align: "right",
    width: CONTENT_W - 80,
  });
}

interface PageState {
  pageNum: number;
  totalPages: number;
  y: number;
  resourceTitle: string;
  previewTag?: string;
}

/** Standard editorial page: header, optional preview tag, footer.
 *  Returns starting y for content. */
function startPage(doc: Doc, state: PageState): number {
  drawHeader(doc, state.resourceTitle);
  if (state.previewTag) drawPreviewTag(doc, state.previewTag);
  drawFooter(doc, state.pageNum, state.totalPages);
  return 88;
}

function drawPreviewTag(doc: Doc, tag: string) {
  // Top-right small badge
  const y = 44;
  const text = tag.toUpperCase();
  doc.font("Helvetica-Bold").fontSize(7).fillColor(CLAY);
  const w = doc.widthOfString(text) + 14;
  doc.rect(PAGE_W - MARGIN - w, y - 3, w, 14).fillColor(PAPER_DEEP).fill();
  doc.fillColor(CLAY).font("Helvetica-Bold").fontSize(7);
  doc.text(text, PAGE_W - MARGIN - w + 7, y - 1, { width: w - 14, align: "center" });
  doc.fillColor(INK);
}

function ensureSpace(doc: Doc, state: PageState, needed: number): number {
  const bottom = PAGE_H - 64;
  if (state.y + needed > bottom) {
    nextPage(doc);
    state.pageNum += 1;
    state.y = startPage(doc, state);
  }
  return state.y;
}

function drawSectionHeader(doc: Doc, num: string, title: string, y: number): number {
  // Large clay section number
  doc.font("Helvetica-Bold").fontSize(34).fillColor(CLAY);
  doc.text(num, MARGIN, y);
  const numH = 36;

  // Eyebrow rule + title to the right of the number
  doc.font("Helvetica-Bold").fontSize(13).fillColor(INK);
  doc.text(title.toUpperCase(), MARGIN, y + numH + 4);

  // Soft rule under the section header
  const ruleY = y + numH + 24;
  doc
    .moveTo(MARGIN, ruleY)
    .lineTo(PAGE_W - MARGIN, ruleY)
    .strokeColor(RULE)
    .lineWidth(0.5)
    .stroke();

  return ruleY + 18;
}

function drawEyebrow(doc: Doc, label: string, y: number, color = OLIVE): number {
  doc.font("Helvetica-Bold").fontSize(8).fillColor(color);
  doc.text(label.toUpperCase(), MARGIN, y);
  return y + 14;
}

function drawParagraph(
  doc: Doc,
  text: string,
  y: number,
  opts: {
    fontSize?: number;
    color?: string;
    italic?: boolean;
    bold?: boolean;
    indent?: number;
    lineGap?: number;
    width?: number;
  } = {}
): number {
  const {
    fontSize = 10.5,
    color = INK,
    italic = false,
    bold = false,
    indent = 0,
    lineGap = 4,
    width,
  } = opts;
  const font =
    bold && italic
      ? "Helvetica-BoldOblique"
      : bold
        ? "Helvetica-Bold"
        : italic
          ? "Helvetica-Oblique"
          : "Helvetica";
  doc.font(font).fontSize(fontSize).fillColor(color);
  const w = width ?? CONTENT_W - indent;
  doc.text(text, MARGIN + indent, y, { width: w, lineGap });
  const h = doc.heightOfString(text, { width: w, lineGap });
  return y + h + 6;
}

/** Editorial pull-quote with clay left rule. */
function drawPullQuote(doc: Doc, text: string, y: number): number {
  const padX = 18;
  const x = MARGIN + padX;
  const w = CONTENT_W - padX * 2;
  doc.font("Helvetica-Oblique").fontSize(11).fillColor(INK_SOFT);
  const h = doc.heightOfString(text, { width: w, lineGap: 5 });
  // Clay left rule
  doc
    .moveTo(MARGIN, y - 2)
    .lineTo(MARGIN, y + h + 6)
    .strokeColor(CLAY)
    .lineWidth(2)
    .stroke();
  doc.text(text, x, y, { width: w, lineGap: 5 });
  return y + h + 18;
}

function drawCheckbox(doc: Doc, x: number, y: number, size = 9) {
  doc
    .rect(x, y, size, size)
    .strokeColor(INK)
    .lineWidth(0.75)
    .stroke();
}

function drawAnswerLines(doc: Doc, y: number, count: number, indent = 0): number {
  const lineGap = 22;
  for (let i = 0; i < count; i++) {
    const ly = y + i * lineGap;
    doc
      .moveTo(MARGIN + indent, ly)
      .lineTo(PAGE_W - MARGIN, ly)
      .strokeColor(RULE)
      .lineWidth(0.5)
      .stroke();
  }
  return y + count * lineGap + 6;
}

/** Draws a numbered question + answer lines, returns new y. */
function drawQuestion(
  doc: Doc,
  state: PageState,
  num: number,
  text: string,
  answerLines = 2
): number {
  ensureSpace(doc, state, 60 + answerLines * 22);
  const y = state.y;
  // Number circle (light)
  doc.font("Helvetica-Bold").fontSize(9).fillColor(CLAY);
  const numStr = String(num).padStart(2, "0");
  doc.text(numStr, MARGIN, y);
  const numW = doc.widthOfString(numStr) + 8;

  // Question text
  doc.font("Helvetica").fontSize(10.5).fillColor(INK);
  doc.text(text, MARGIN + numW, y, { width: CONTENT_W - numW, lineGap: 3 });
  const qH = doc.heightOfString(text, { width: CONTENT_W - numW, lineGap: 3 });
  state.y = y + qH + 8;
  // Answer lines
  state.y = drawAnswerLines(doc, state.y, answerLines, 24);
  state.y += 4;
  return state.y;
}

/** Draws a checkbox + label row, returns new y. */
function drawChecklistItem(
  doc: Doc,
  state: PageState,
  text: string
): number {
  ensureSpace(doc, state, 28);
  const y = state.y;
  drawCheckbox(doc, MARGIN, y + 1, 9);
  doc.font("Helvetica").fontSize(10.5).fillColor(INK);
  doc.text(text, MARGIN + 18, y, { width: CONTENT_W - 18, lineGap: 2 });
  const h = doc.heightOfString(text, { width: CONTENT_W - 18, lineGap: 2 });
  state.y = y + Math.max(h, 14) + 8;
  return state.y;
}

function drawHr(doc: Doc, y: number, color = RULE, width = 0.5): number {
  doc
    .moveTo(MARGIN, y)
    .lineTo(PAGE_W - MARGIN, y)
    .strokeColor(color)
    .lineWidth(width)
    .stroke();
  return y + 14;
}

function drawDisclosure(doc: Doc, state: PageState) {
  ensureSpace(doc, state, 80);
  const y = state.y + 14;
  drawHr(doc, y);
  doc.font("Helvetica-Oblique").fontSize(9).fillColor(WARM_GRAY);
  doc.text(
    "Margin / Form is a fictional creator business. This is a demonstration resource.",
    MARGIN,
    y + 14,
    { width: CONTENT_W, lineGap: 3 }
  );
  state.y = y + 50;
}

// ============================================================
// Cover page helper
// ============================================================

function drawCover(
  doc: Doc,
  opts: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    meta?: string[]; // lines below subtitle
    vol?: string;
    totalPages: number;
  }
) {
  paintBackground(doc);
  // Wordmark top-left (no resource-title right slot on cover)
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK);
  doc.text("MARGIN", MARGIN, 56);
  const marginW = doc.widthOfString("MARGIN");
  doc.font("Helvetica").fontSize(11).fillColor(CLAY);
  const slashStr = "  /  ";
  const slashW = doc.widthOfString(slashStr);
  doc.text(slashStr, MARGIN + marginW, 56);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK);
  doc.text("FORM", MARGIN + marginW + slashW, 56);

  // Top-right small disclosure
  doc.font("Helvetica").fontSize(7.5).fillColor(WARM_GRAY);
  doc.text("DEMONSTRATION  ·  FREE RESOURCE", MARGIN + 200, 58, {
    align: "right",
    width: CONTENT_W - 200,
  });

  // Top hairline
  doc
    .moveTo(MARGIN, 80)
    .lineTo(PAGE_W - MARGIN, 80)
    .strokeColor(RULE)
    .lineWidth(0.5)
    .stroke();

  // Big title block — centered vertically a bit above center
  const blockTop = 220;
  let y = blockTop;

  if (opts.eyebrow) {
    doc.font("Helvetica-Bold").fontSize(9).fillColor(CLAY);
    doc.text(opts.eyebrow.toUpperCase(), MARGIN, y);
    y += 22;
  }

  // Title — large, set in pieces so it carries weight
  doc.font("Helvetica-Bold").fontSize(38).fillColor(INK);
  const titleLines = opts.title.split("\n");
  for (const line of titleLines) {
    doc.text(line, MARGIN, y, { width: CONTENT_W, lineGap: 2 });
    const h = doc.heightOfString(line, { width: CONTENT_W, lineGap: 2 });
    y += h + 4;
  }
  y += 16;

  // Clay short rule under title
  doc
    .moveTo(MARGIN, y)
    .lineTo(MARGIN + 56, y)
    .strokeColor(CLAY)
    .lineWidth(2)
    .stroke();
  y += 18;

  if (opts.subtitle) {
    doc.font("Helvetica-Oblique").fontSize(13).fillColor(INK_SOFT);
    const subH = doc.heightOfString(opts.subtitle, { width: CONTENT_W, lineGap: 4 });
    doc.text(opts.subtitle, MARGIN, y, { width: CONTENT_W, lineGap: 4 });
    y += subH + 18;
  }

  if (opts.meta && opts.meta.length) {
    doc.font("Helvetica").fontSize(10).fillColor(WARM_GRAY);
    for (const line of opts.meta) {
      doc.text(line, MARGIN, y, { width: CONTENT_W, lineGap: 3 });
      const h = doc.heightOfString(line, { width: CONTENT_W, lineGap: 3 });
      y += h;
    }
  }

  // Bottom block: MARGIN / FORM, Vol
  const footY = PAGE_H - 110;
  drawHr(doc, footY - 10);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK);
  doc.text("MARGIN / FORM", MARGIN, footY);
  if (opts.vol) {
    doc.font("Helvetica").fontSize(8.5).fillColor(WARM_GRAY);
    doc.text(opts.vol.toUpperCase(), MARGIN, footY + 14, {
      width: CONTENT_W,
      align: "right",
    });
  }

  // Page number (cover counts as page 01)
  drawFooter(doc, 1, opts.totalPages);
}

// ============================================================
// 1. The Studio Audit
// ============================================================

async function generateStudioAudit() {
  const doc = newDoc("The Studio Audit");
  const file = path.join(DOWNLOADS_DIR, "studio-audit.pdf");

  const totalPages = 14;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "The Studio Audit · Vol. 01",
  };

  // -------- Cover --------
  drawCover(doc, {
    eyebrow: "The flagship free resource",
    title: "THE STUDIO\nAUDIT",
    subtitle:
      "A positioning, offer, and inquiry-process review for the independent creative practice.",
    meta: [
      "Use this audit once a quarter. Drift is normal. Unchecked drift becomes a gap.",
      "Six areas · 69 prompts · one action-priority worksheet.",
    ],
    vol: "Vol. 01 · The Studio Audit",
    totalPages,
  });

  // -------- Introduction (page 2) --------
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Introduction", state.y);
  state.y = drawSectionHeader(doc, "00", "How to use this audit", state.y);

  state.y = drawParagraph(
    doc,
    "The Studio Audit is a structured review of the six areas where independent creative practices most often drift: positioning, website clarity, offer clarity, inquiry process, pricing communication, and an action-priority worksheet. It is the diagnostic you would do for a friend's practice on a long walk, written down.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "Use it once a quarter. Block out an afternoon. Read each prompt aloud. Write your answer in the space provided — not in your head. The audit only works if you externalize. A vague answer is data; a blank answer is the most useful kind of data.",
    state.y
  );

  state.y = drawPullQuote(
    doc,
    "Drift is normal. It is the cost of doing client work instead of working on the practice. The audit is how you catch it before it becomes a gap.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "The six sections move from abstract (positioning) to concrete (pricing communication) and end with a single action-priority worksheet. Do them in order. Each section takes ten to twenty minutes. Do not skip the worksheet at the end — it is the only page that asks you to commit.",
    state.y
  );

  state.y = drawEyebrow(doc, "The six areas", state.y, OLIVE);
  const areas = [
    ["01", "Positioning", "Who you serve, what changes for them, who you decline."],
    ["02", "Website clarity", "Whether a stranger could explain what you do after one minute."],
    ["03", "Offer clarity", "Whether each offer names its deliverable, inputs, and disqualifiers."],
    ["04", "Inquiry process", "Whether inquiries are acknowledged, qualified, and answered in writing."],
    ["05", "Pricing communication", "Whether the price is a stated number with a written scope — not a feeling."],
    ["06", "Action-priority worksheet", "Where you commit to the next move."],
  ];
  for (const [num, name, desc] of areas) {
    ensureSpace(doc, state, 32);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(9).fillColor(CLAY);
    doc.text(num, MARGIN, y);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK);
    doc.text(name, MARGIN + 28, y);
    doc.font("Helvetica").fontSize(9.5).fillColor(INK_SOFT);
    doc.text(desc, MARGIN + 28, y + 14, { width: CONTENT_W - 28, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W - 28, lineGap: 2 });
    state.y = y + 14 + h + 10;
  }

  // -------- Section 01 — Positioning --------
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawSectionHeader(doc, "01", "Positioning self-assessment", state.y);
  state.y = drawParagraph(
    doc,
    "Answer each question in one or two sentences. If you cannot answer in two sentences, you do not yet have the answer. That is the point of the question.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const positioningQs = [
    "In one sentence, who do you serve and what change do you produce for them?",
    "Could a non-specialist name three buyers who would not be a fit? If not, your positioning is too broad.",
    "When you describe what you do, do you lead with your discipline (\"I'm a designer\") or with the outcome you produce?",
    "Do you have a written positioning sentence that you revisit at least once a quarter?",
    "Name your three best past clients. What do they have in common — discipline, scale, stage, problem?",
    "Name your three most difficult past clients. What do they have in common?",
    "If a stranger read your website for sixty seconds, who would they say you serve?",
    "Are there services listed on your site that you no longer want to deliver? List them.",
    "Are there buyers you would politely decline today that you would have taken a year ago?",
    "Does your positioning match the work your last three clients actually bought — or the work you wish they had bought?",
    "Are you competing on category (what you do) or on outcome (what changes for the buyer)?",
    "What is one sentence you could remove from your website today that would make the rest sharper?",
  ];
  positioningQs.forEach((q, i) => drawQuestion(doc, state, i + 1, q, 2));

  // -------- Section 02 — Website clarity --------
  nextPage(doc);
  state.pageNum = 4;
  state.y = startPage(doc, state);
  state.y = drawSectionHeader(doc, "02", "Website clarity checklist", state.y);
  state.y = drawParagraph(
    doc,
    "Read each item aloud against your live site. Check the box only if it is true today — not if it was true last quarter, not if it is on your to-do list.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const websiteItems = [
    "The homepage states who you serve in the first scroll.",
    "The homepage states what changes for the buyer, not only what you do.",
    "Services are listed in priority order — not alphabetically and not randomly.",
    "Each service has a one-sentence description a non-specialist could repeat back.",
    "There is a visible path to start a conversation (a contact or inquiry page).",
    "The inquiry page tells the buyer what information to include.",
    "Sample work is captioned with the buyer's outcome, not only the deliverable.",
    "Pricing language (or the absence of pricing language) is consistent across pages.",
    "Testimonials are attributed with buyer role and discipline — not only initials.",
    "The About page describes how you work, not only who you are.",
    "No service is listed that you would not currently deliver.",
    "There is no claim on the site that you could not defend in a discovery call.",
    "The site loads without errors on a phone.",
    "The footer includes a working contact method.",
    "A first-time visitor could explain what you do after one minute on the site.",
  ];
  websiteItems.forEach((item) => drawChecklistItem(doc, state, item));

  // -------- Section 03 — Offer clarity --------
  nextPage(doc);
  state.pageNum = 5;
  state.y = startPage(doc, state);
  state.y = drawSectionHeader(doc, "03", "Offer clarity review", state.y);
  state.y = drawParagraph(
    doc,
    "For each offer on your current menu, answer these eight questions. If you have more than three offers and cannot answer the questions for all of them, that is itself an answer.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const offerQs = [
    "For each offer, can you name the specific deliverable the buyer receives at the end?",
    "For each offer, can you name the inputs the buyer must provide for the work to succeed?",
    "For each offer, can you name the buyer who is a poor fit and should be declined?",
    "For each offer, can you name the typical duration in weeks — not in \"phases\"?",
    "For each offer, can you state the price without recalculating it each time?",
    "Is the revision boundary written down (number of rounds, what counts as a revision)?",
    "Is the next step after delivery defined — handoff, support window, anything else?",
    "Are there offers currently on your menu that you would not deliver to your best client?",
  ];
  offerQs.forEach((q, i) => drawQuestion(doc, state, i + 1, q, 2));

  // -------- Section 04 — Inquiry process --------
  nextPage(doc);
  state.pageNum = 6;
  state.y = startPage(doc, state);
  state.y = drawSectionHeader(doc, "04", "Inquiry process review", state.y);
  state.y = drawParagraph(
    doc,
    "Inquiry process is where most practices lose good buyers. The buyer who emails you on a Tuesday has also emailed two other people. Speed and clarity are not optional.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const inquiryItems = [
    "Inquiries are acknowledged within one business day — even if only to say \"I'll respond fully by Friday.\"",
    "The acknowledgment tells the buyer what happens next and when.",
    "Inquiries are qualified against a written client profile before a call is booked.",
    "Discovery calls have a written agenda that is shared in advance.",
    "Discovery calls end with a stated next step: proposal, decline, or follow-up.",
    "Notes from the discovery call are written down within twenty-four hours.",
    "Proposals are sent within five business days of the call.",
    "Proposals are sent only after the scope has been confirmed in writing.",
    "Declined inquiries receive a polite, written response — not silence.",
    "The pipeline (inquiries → calls → proposals → decisions) is reviewed weekly.",
  ];
  inquiryItems.forEach((item) => drawChecklistItem(doc, state, item));

  // -------- Section 05 — Pricing communication --------
  nextPage(doc);
  state.pageNum = 7;
  state.y = startPage(doc, state);
  state.y = drawSectionHeader(doc, "05", "Pricing communication checklist", state.y);
  state.y = drawParagraph(
    doc,
    "How you talk about price shapes how the buyer receives it. Most pricing disputes are not about the number — they are about the conversation that came before the number.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const pricingItems = [
    "The buyer is told the price before the proposal is sent — not inside it for the first time.",
    "The price is stated as a number, not a range and not \"starting at.\"",
    "The price includes a written scope. There is no \"and any related tasks.\"",
    "The proposal names what is excluded, not only what is included.",
    "Payment terms (deposit, milestones, final) are written in the proposal.",
    "The proposal states when payment is due — not only how much.",
    "Late-payment consequences are stated in the proposal, not added after the fact.",
    "Discounts, when offered, are framed as a deliberate choice with a stated reason.",
    "The buyer is not asked \"what is your budget?\" without a stated reason for asking.",
    "The proposal does not include optional add-ons the buyer did not request.",
    "The price is not negotiated against itself in the buyer's absence.",
    "The pricing conversation is documented in writing after the call.",
  ];
  pricingItems.forEach((item) => drawChecklistItem(doc, state, item));

  // -------- Section 06 — Action-priority worksheet --------
  nextPage(doc);
  state.pageNum = 8;
  state.y = startPage(doc, state);
  state.y = drawSectionHeader(doc, "06", "Action-priority worksheet", state.y);
  state.y = drawParagraph(
    doc,
    "From the five review sections above, list what is drifting. For each item, mark priority 1 (do this week), 2 (this month), or 3 (this quarter). Then write one next action — not a goal, an action. The next action is the smallest concrete step that moves the item forward.",
    state.y
  );
  state.y += 6;

  // Table
  const tableTop = state.y;
  const cols = [
    { label: "AREA", x: MARGIN, w: 90 },
    { label: "WHAT'S DRIFTING", x: MARGIN + 96, w: 200 },
    { label: "PRIORITY (1–3)", x: MARGIN + 302, w: 70 },
    { label: "NEXT ACTION", x: MARGIN + 378, w: PAGE_W - MARGIN - 378 },
  ];
  // Header row
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(INK);
  for (const c of cols) {
    doc.text(c.label, c.x, tableTop, { width: c.w, lineGap: 2 });
  }
  const headerH = 16;
  drawHr(doc, tableTop + headerH);

  // Rows (8 blank rows for the user to fill)
  const rowH = 44;
  for (let i = 0; i < 8; i++) {
    const ry = tableTop + headerH + 14 + i * rowH;
    ensureSpace(doc, state, rowH);
    // Row separators
    doc
      .moveTo(MARGIN, ry + rowH - 4)
      .lineTo(PAGE_W - MARGIN, ry + rowH - 4)
      .strokeColor(RULE)
      .lineWidth(0.4)
      .stroke();
    // Faint vertical column dividers
    doc
      .moveTo(MARGIN + 96, ry)
      .lineTo(MARGIN + 96, ry + rowH - 4)
      .strokeColor(RULE)
      .lineWidth(0.4)
      .stroke();
    doc
      .moveTo(MARGIN + 302, ry)
      .lineTo(MARGIN + 302, ry + rowH - 4)
      .strokeColor(RULE)
      .lineWidth(0.4)
      .stroke();
    doc
      .moveTo(MARGIN + 378, ry)
      .lineTo(MARGIN + 378, ry + rowH - 4)
      .strokeColor(RULE)
      .lineWidth(0.4)
      .stroke();
    // Number the row (small olive digit)
    doc.font("Helvetica-Bold").fontSize(8).fillColor(OLIVE);
    doc.text(String(i + 1).padStart(2, "0"), MARGIN + 4, ry);
  }
  state.y = tableTop + headerH + 14 + 8 * rowH + 8;

  // -------- Page 9 — Worked example / how to read your answers --------
  nextPage(doc);
  state.pageNum = 9;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "After the audit", state.y);
  state.y = drawSectionHeader(doc, "07", "How to read your answers", state.y);

  state.y = drawParagraph(
    doc,
    "Once you have written your answers, look for three patterns. They are more useful than any individual answer.",
    state.y
  );

  state.y = drawEyebrow(doc, "Pattern one — Blank answers", state.y, CLAY);
  state.y = drawParagraph(
    doc,
    "Any question you could not answer is the most useful data from the audit. A blank answer marks a place where the practice is running on assumption rather than decision. Treat blanks as priority-one items.",
    state.y
  );

  state.y = drawEyebrow(doc, "Pattern two — Contradictions", state.y, CLAY);
  state.y = drawParagraph(
    doc,
    "If your answer to a positioning question says you serve early-stage founders and your answer to an offer question says your typical engagement is twelve weeks at a fixed price, you have a contradiction. Contradictions are where drift hides. Name them.",
    state.y
  );

  state.y = drawEyebrow(doc, "Pattern three — Repeats", state.y, CLAY);
  state.y = drawParagraph(
    doc,
    "If the same phrase appears in three answers — \"I keep meaning to write that down\" — that is the next action. Not next quarter. This week.",
    state.y
  );

  state.y = drawPullQuote(
    doc,
    "The audit does not produce a strategy. It produces a list. The list is the strategy.",
    state.y
  );

  // -------- Page 10 — Cadence + closing --------
  nextPage(doc);
  state.pageNum = 10;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Cadence", state.y);
  state.y = drawSectionHeader(doc, "08", "How often, and what to do with it", state.y);

  state.y = drawParagraph(
    doc,
    "Run the audit four times a year. Pick a cadence you will actually keep — the first Friday of every quarter, the Monday after a project ships, the day before your birthday. Put it on the calendar. The audit takes an afternoon. It pays for itself the first time it catches a pricing clause you would otherwise have left out of a proposal.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "After the audit, write one paragraph to yourself: what changed since last quarter, what is the single priority for this quarter, and what is the next action on that priority. Keep these paragraphs. After a year, read them in order. You will see your own drift.",
    state.y
  );

  state.y = drawEyebrow(doc, "What the audit is not", state.y, OLIVE);
  state.y = drawParagraph(
    doc,
    "It is not a strategy document. It does not tell you what to do — it tells you where you have not yet decided. It is not a benchmark against other practices. It is not a substitute for talking to your three best clients about what they actually needed. And it is not a one-time exercise. Drift comes back. The audit comes back too.",
    state.y
  );

  // -------- Page 11 — A note from the studio --------
  nextPage(doc);
  state.pageNum = 11;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "A note from the studio", state.y);
  state.y = drawSectionHeader(doc, "09", "Why we made this", state.y);

  state.y = drawParagraph(
    doc,
    "We made the audit because we kept watching good creatives lose good buyers for reasons that had nothing to do with the quality of the work. The work was excellent. The positioning had drifted. The offer was unclear. The inquiry went unanswered for four days. The proposal arrived without an exclusions list and the scope grew. None of these are creative failures. They are operational ones.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "The audit is the lightest possible structure that catches them. It does not replace a course, a coach, or a community. It replaces the nothing that most practices have in their place.",
    state.y
  );

  state.y = drawPullQuote(
    doc,
    "The work is what makes the practice good. The practice is what makes the work possible. The audit is how you keep the practice in working order.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "If you find the audit useful, the next step is The Independent Practice — the six-module course that builds the frameworks the audit points at. If the audit is enough for now, that is also fine. Come back in ninety days.",
    state.y
  );

  // -------- Page 12 — Companion resources --------
  nextPage(doc);
  state.pageNum = 12;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "If this was useful", state.y);
  state.y = drawSectionHeader(doc, "10", "Where to go next", state.y);

  state.y = drawParagraph(
    doc,
    "The audit is diagnostic. The resources below are prescriptive — they tell you how to fix what the audit finds.",
    state.y
  );

  const companions = [
    ["The Proposal Checklist", "Free · 3 pages", "If section four or five of the audit turned up gaps, this is the fix. The seven sections a clear proposal needs and the clauses that prevent most disputes."],
    ["The Pricing Starter", "Free · 5 pages", "If section five of the audit turned up a price that is a feeling, this is the fix. A first pricing model — capacity, cost floor, scope multiplier, target price."],
    ["The Independent Practice", "Course · $349", "If the audit turned up blanks in section one or three, the course is the long-form fix. Six modules on positioning, offers, inquiry process, pricing, proposals, and delivery."],
    ["The Proposal System", "Toolkit · $79", "If section four of the audit turned up a proposal that arrives late and without an exclusions list, this is the toolkit. Templates, worksheets, clauses."],
    ["The Pricing Workbook", "Workbook · $49", "If the Pricing Starter was not enough — three worked scenarios, a discount-decision checklist, a per-offer pricing model."],
    ["The Client Brief Kit", "Kit · $39", "If section four of the audit turned up discovery calls without agendas, this is the kit. Discovery questionnaire, project brief template, handoff checklist."],
  ];

  for (const [name, price, desc] of companions) {
    ensureSpace(doc, state, 56);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(INK);
    doc.text(name, MARGIN, y);
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(CLAY);
    doc.text(price.toUpperCase(), MARGIN, y, {
      width: CONTENT_W,
      align: "right",
    });
    doc.font("Helvetica").fontSize(9.5).fillColor(INK_SOFT);
    doc.text(desc, MARGIN, y + 16, { width: CONTENT_W, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W, lineGap: 2 });
    state.y = y + 16 + h + 14;
    drawHr(doc, state.y - 8, RULE, 0.4);
  }

  // -------- Page 13 — A closing note --------
  nextPage(doc);
  state.pageNum = 13;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Closing note", state.y);
  state.y = drawSectionHeader(doc, "11", "A closing note", state.y);

  state.y = drawParagraph(
    doc,
    "You do not need to fix everything the audit finds. You need to fix one thing this week, one thing this month, and one thing this quarter. The rest can wait. The rest is what the next audit is for.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "If you are tempted to skip the action-priority worksheet at the back, that is the signal to do it. The worksheet is the page where the audit stops being a review and becomes a decision. Everything before it is diagnosis. The worksheet is the prescription.",
    state.y
  );

  state.y = drawPullQuote(
    doc,
    "A practice is not a thing you have. It is a thing you tend. The audit is the act of tending.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "Thank you for taking the time. If this was useful, send it to one person you know who runs a practice of their own. If it was not, tell us why. We revise the audit between volumes — the prompts are not fixed. They are the questions we have found most useful, most often, for the practices we have worked with.",
    state.y
  );

  // -------- Page 14 — Disclosure --------
  nextPage(doc);
  state.pageNum = 14;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Disclosure", state.y);
  state.y = drawSectionHeader(doc, "12", "Demo disclosure", state.y);

  state.y = drawParagraph(
    doc,
    "Margin / Form is a fictional creator business. This is a demonstration resource. The frameworks, prompts, and worksheets are real and usable — they were written to be used. The business itself is a portfolio demonstration of how an independent creative-education practice might publish, sell, and support its work.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "No purchase is possible from this site. No email you enter will be added to a real list. No proposal sent from the templates in the shop will be received by a real buyer. The audit you just completed, however, is yours. Use it.",
    state.y
  );

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// 2. The Proposal Checklist
// ============================================================

async function generateProposalChecklist() {
  const doc = newDoc("The Proposal Checklist");
  const file = path.join(DOWNLOADS_DIR, "proposal-checklist.pdf");
  const totalPages = 5;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "The Proposal Checklist",
  };

  // ---- Page 1 ----
  drawCover(doc, {
    eyebrow: "A free resource",
    title: "THE PROPOSAL\nCHECKLIST",
    subtitle:
      "The seven sections a clear proposal needs — and the clauses that prevent most disputes.",
    meta: [
      "Print it. Keep it next to your draft.",
      "Companion to The Proposal System ($79).",
    ],
    vol: "Margin / Form · Free resource",
    totalPages,
  });

  // ---- Page 2 ----
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "How to use this checklist", state.y);
  state.y = drawSectionHeader(doc, "00", "Before you draft", state.y);
  state.y = drawParagraph(
    doc,
    "This checklist is the lightest possible structure for a proposal that protects both sides. Print it. Keep it next to your draft. Check each box only when the section is written, reviewed, and free of the most common failure mode for that section. A box checked in haste is a clause you will renegotiate later.",
    state.y
  );
  state.y = drawParagraph(
    doc,
    "The seven-section structure is the spine. The scope-and-exclusions prompts are where most proposals go wrong — answer them in writing before you draft the scope, not after. The revision-boundary framework is the clause that prevents most scope creep. The payment-terms checklist is the clause that prevents most late-payment conversations. The pre-send review is the last pass before the proposal leaves your hands.",
    state.y
  );
  state.y = drawPullQuote(
    doc,
    "A proposal is not a sales document. It is a written agreement about what will happen, in what order, for what price, and what happens if it does not.",
    state.y
  );

  state.y = drawEyebrow(doc, "Part one", state.y);
  state.y = drawSectionHeader(doc, "01", "The seven-section structure", state.y);
  state.y = drawParagraph(
    doc,
    "Every proposal you send should contain these seven sections, in this order. If you are tempted to skip one, that is the section that will cost you the most money.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const sections = [
    ["Introduction", "Who you are, who they are, the date, and one sentence on why you are writing."],
    ["Situation", "The buyer's situation in their words, quoted from the discovery call. Not your interpretation."],
    ["Scope", "The specific deliverables you will produce. Each named as a noun, not a verb."],
    ["Exclusions", "What you will not produce. Named with the same precision as the scope."],
    ["Approach", "How the work happens — phases, dependencies, decision points. Not a Gantt chart."],
    ["Price & terms", "The number, the deposit, the milestones, the due dates, the late-payment consequence."],
    ["Decision", "What you need from the buyer to start, by when, and what happens if you do not hear back."],
  ];
  for (const [name, desc] of sections) {
    ensureSpace(doc, state, 36);
    const y = state.y;
    drawCheckbox(doc, MARGIN, y + 2, 10);
    doc.font("Helvetica-Bold").fontSize(11).fillColor(INK);
    doc.text(name, MARGIN + 20, y, { width: 140 });
    doc.font("Helvetica").fontSize(10).fillColor(INK_SOFT);
    doc.text(desc, MARGIN + 160, y, { width: CONTENT_W - 160, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W - 160, lineGap: 2 });
    state.y = y + Math.max(h, 18) + 10;
  }

  // Scope-and-exclusions prompt set
  state.y += 6;
  state.y = drawEyebrow(doc, "Part two · The scope-and-exclusions prompts", state.y, OLIVE);
  state.y = drawParagraph(
    doc,
    "Before you write the scope, answer these eight prompts in writing. Most scope disputes are not about what was in the proposal — they are about what was never named.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const prompts = [
    "What does the buyer receive on the day we deliver? Name the file, document, or session.",
    "How many rounds of revision are included? What counts as one round?",
    "What is the source of the inputs we need — and what happens if they are late?",
    "What is the working file format, and do we hand it over? If not, name it as an exclusion.",
    "Is travel, hosting, software, or stock included? If not, name it as an exclusion.",
    "Is there a third party whose cooperation we depend on? Name them and the dependency.",
    "What is the support window after delivery — and what is excluded from it?",
    "What would the buyer be surprised to learn is not included? Write it down now.",
  ];
  prompts.forEach((p, i) => drawQuestion(doc, state, i + 1, p, 1));

  // ---- Page 3 ----
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Part three", state.y);
  state.y = drawSectionHeader(doc, "02", "The revision-boundary framework", state.y);
  state.y = drawParagraph(
    doc,
    "Pick one tier per project and write it into the proposal. The tier is not a discount — it is a stated agreement about what a revision is. Silence on this point is the single most common source of scope creep.",
    state.y
  );
  state.y += 4;

  // Three-tier table
  const tiers = [
    {
      name: "Light",
      revisions: "1 round",
      countsAs: "Consolidated written feedback from one stakeholder, applied in one pass. New direction after the round is a new phase, billed separately.",
    },
    {
      name: "Standard",
      revisions: "2 rounds",
      countsAs: "Consolidated written feedback from the agreed decision-maker, applied in two passes. Changes to the brief, the audience, or the deliverable format after round one restart the scope.",
    },
    {
      name: "Generous",
      revisions: "3 rounds",
      countsAs: "Consolidated written feedback from up to three stakeholders, applied in three passes. Verbal feedback does not count. New deliverables requested after round two are billed as a change order.",
    },
  ];
  for (const t of tiers) {
    ensureSpace(doc, state, 70);
    const y = state.y;
    // Tier label
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(t.name.toUpperCase(), MARGIN, y);
    // Revision count
    doc.font("Helvetica-Bold").fontSize(10).fillColor(INK);
    doc.text(t.revisions, MARGIN + 100, y);
    // Description
    doc.font("Helvetica").fontSize(9.5).fillColor(INK_SOFT);
    doc.text(t.countsAs, MARGIN, y + 18, { width: CONTENT_W, lineGap: 2 });
    const h = doc.heightOfString(t.countsAs, { width: CONTENT_W, lineGap: 2 });
    state.y = y + 18 + h + 10;
    drawHr(doc, state.y - 6, RULE, 0.4);
  }

  // Payment-terms checklist
  state.y += 6;
  state.y = drawEyebrow(doc, "Part four · Payment-terms checklist", state.y, OLIVE);
  const paymentItems = [
    "A deposit is required to start — typically 30–50% of the total. Name the amount.",
    "Milestone payments are tied to deliverables, not to calendar dates.",
    "Final payment is due on delivery — not on the buyer's internal approval.",
    "Late-payment interest or fee is stated, with the trigger date named.",
    "The proposal names the currency, the method, and the invoicing window.",
    "The deposit is non-refundable once work has begun — stated in writing.",
  ];
  paymentItems.forEach((item) => drawChecklistItem(doc, state, item));

  // Pre-send review checklist
  state.y += 6;
  state.y = drawEyebrow(doc, "Part five · Pre-send review", state.y, OLIVE);
  const preSend = [
    "The buyer's name and company are spelled correctly.",
    "The scope and exclusions are in matching grammatical form.",
    "Every number in the proposal appears in two places (price, terms, and schedule agree).",
    "The deposit amount and due date are stated in the same sentence.",
    "The revision tier is named — not implied.",
    "The decision deadline is named — not \"let me know.\"",
    "There are no optional add-ons the buyer did not ask about.",
    "There is no phrase you would be embarrassed to read aloud to the buyer.",
    "You have removed every adjective that does not earn its place.",
    "You have read it once out loud, start to finish, without skipping.",
  ];
  preSend.forEach((item) => drawChecklistItem(doc, state, item));

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// 3. The Pricing Starter
// ============================================================

async function generatePricingStarter() {
  const doc = newDoc("The Pricing Starter");
  const file = path.join(DOWNLOADS_DIR, "pricing-starter.pdf");
  const totalPages = 5;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "The Pricing Starter",
  };

  // ---- Cover ----
  drawCover(doc, {
    eyebrow: "A first pricing model",
    title: "THE PRICING\nSTARTER",
    subtitle:
      "A first pricing model for independent creatives who have never written one down.",
    meta: [
      "Not the full Pricing Workbook — enough to stop guessing.",
      "Capacity · cost floor · scope multiplier · target price.",
    ],
    vol: "Margin / Form · Free resource",
    totalPages,
  });

  // ---- Page 2: Introduction + capacity ----
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Introduction", state.y);
  state.y = drawSectionHeader(doc, "01", "Pricing is a model, not a feeling", state.y);

  state.y = drawParagraph(
    doc,
    "Most independent creatives price by feel. They look at a project, feel a number, and round it. Sometimes the number is right. Often it is wrong in the same direction — too low — for years. The cost of pricing by feel is invisible until the practice cannot absorb a slow quarter.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "A pricing model does not tell you what to charge. It gives you a way to reason about price from your own capacity, your own costs, the scope of the work, and the value to the buyer. The number you produce is a reasoned floor and a target. What you actually quote is up to you — but you will know what you are quoting against.",
    state.y
  );

  state.y = drawPullQuote(
    doc,
    "A model does not remove judgment. It gives judgment something to land on.",
    state.y
  );

  state.y = drawEyebrow(doc, "Section one", state.y, OLIVE);
  state.y = drawSectionHeader(doc, "02", "Effective-capacity worksheet", state.y);
  state.y = drawParagraph(
    doc,
    "Effective capacity is the number of hours per year you can actually bill. It is not your working hours. It is your working hours minus the time the practice requires to exist — admin, marketing, learning, rest, and the gap between projects.",
    state.y
  );
  state.y += 6;

  // Capacity worksheet — labeled fill-in rows
  const capacityRows = [
    ["A", "Working hours per week", "Hours you are at your desk, available for work."],
    ["B", "Weeks worked per year", "After holidays, vacation, and sick leave."],
    ["C", "A × B  =  gross working hours", "The total hours the practice has."],
    ["D", "Non-billable load (% of C)", "Admin, marketing, learning, pitching, gap. 35–55% is typical."],
    ["E", "C × (1 − D)  =  effective capacity", "The hours you can actually bill. This is the number that matters."],
  ];
  for (const [label, name, desc] of capacityRows) {
    ensureSpace(doc, state, 44);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(label, MARGIN, y);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK);
    doc.text(name, MARGIN + 24, y, { width: CONTENT_W - 24 - 100 });
    // Fill-in line on the right
    doc
      .moveTo(PAGE_W - MARGIN - 90, y + 12)
      .lineTo(PAGE_W - MARGIN, y + 12)
      .strokeColor(INK)
      .lineWidth(0.5)
      .stroke();
    doc.font("Helvetica").fontSize(9).fillColor(WARM_GRAY);
    doc.text(desc, MARGIN + 24, y + 16, { width: CONTENT_W - 24, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W - 24, lineGap: 2 });
    state.y = y + 16 + h + 10;
    drawHr(doc, state.y - 6, RULE, 0.4);
  }

  // ---- Page 3: Cost floor ----
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Section two", state.y);
  state.y = drawSectionHeader(doc, "03", "Cost-floor calculation", state.y);
  state.y = drawParagraph(
    doc,
    "The cost floor is the annual revenue the practice must produce to keep you at the income you have decided to live on, after all the costs of running the practice. Price below the floor and you are paying to work. The floor is not your price — it is the line the price cannot cross.",
    state.y
  );
  state.y += 6;

  const costRows = [
    ["F", "Annual overhead", "Software, hardware, insurance, professional fees, coworking, travel, supplies."],
    ["G", "Desired annual income (pre-tax)", "What you want to pay yourself. Decide before you calculate, not after."],
    ["H", "F + G  =  revenue required", "The minimum the practice must bring in."],
    ["I", "H ÷ E  =  cost-floor hourly rate", "The hourly rate below which you are paying to work."],
    ["J", "Cost floor × 1.0", "Use this for the floor price of a project. Do not quote below it."],
  ];
  for (const [label, name, desc] of costRows) {
    ensureSpace(doc, state, 44);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(label, MARGIN, y);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK);
    doc.text(name, MARGIN + 24, y, { width: CONTENT_W - 24 - 100 });
    doc
      .moveTo(PAGE_W - MARGIN - 90, y + 12)
      .lineTo(PAGE_W - MARGIN, y + 12)
      .strokeColor(INK)
      .lineWidth(0.5)
      .stroke();
    doc.font("Helvetica").fontSize(9).fillColor(WARM_GRAY);
    doc.text(desc, MARGIN + 24, y + 16, { width: CONTENT_W - 24, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W - 24, lineGap: 2 });
    state.y = y + 16 + h + 10;
    drawHr(doc, state.y - 6, RULE, 0.4);
  }

  state.y = drawPullQuote(
    doc,
    "The floor is not a price. It is the line the price cannot cross without you funding the work.",
    state.y
  );

  // ---- Page 4: Scope-complexity multiplier ----
  nextPage(doc);
  state.pageNum = 4;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Section three", state.y);
  state.y = drawSectionHeader(doc, "04", "Scope-complexity multiplier", state.y);
  state.y = drawParagraph(
    doc,
    "The same hourly rate does not apply to every project. A project with three stakeholders, an unfamiliar industry, and a fixed public launch carries more cognitive load than a project for a returning buyer in your home discipline. The multiplier adjusts the floor to the actual project.",
    state.y
  );
  state.y += 6;

  // Multiplier table
  const tableTop = state.y;
  const cols2 = [
    { label: "LEVEL", x: MARGIN, w: 60 },
    { label: "PROFILE", x: MARGIN + 64, w: 290 },
    { label: "MULTIPLIER", x: MARGIN + 358, w: PAGE_W - MARGIN - 358 },
  ];
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(INK);
  for (const c of cols2) doc.text(c.label, c.x, tableTop, { width: c.w });
  drawHr(doc, tableTop + 16);

  const rows2 = [
    ["1.0", "Returning buyer, home discipline, one decision-maker, no fixed launch date.", "1.0×"],
    ["1.2", "Returning buyer, adjacent discipline, two decision-makers, internal-only delivery.", "1.2×"],
    ["1.4", "New buyer, home discipline, two decision-makers, internal-only delivery.", "1.4×"],
    ["1.7", "New buyer, adjacent discipline, three stakeholders, soft launch date.", "1.7×"],
    ["2.0", "New buyer, unfamiliar industry, three or more stakeholders, fixed public launch.", "2.0×"],
  ];
  let ry = tableTop + 22;
  for (const [lvl, profile, mult] of rows2) {
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(lvl, MARGIN, ry);
    doc.font("Helvetica").fontSize(10).fillColor(INK);
    doc.text(profile, MARGIN + 64, ry, { width: 290, lineGap: 2 });
    const h = doc.heightOfString(profile, { width: 290, lineGap: 2 });
    doc.font("Helvetica-Bold").fontSize(11).fillColor(INK);
    doc.text(mult, MARGIN + 358, ry, { width: PAGE_W - MARGIN - 358 });
    ry += Math.max(h, 18) + 10;
    drawHr(doc, ry - 6, RULE, 0.4);
  }
  state.y = ry + 4;

  state.y = drawParagraph(
    doc,
    "The multiplier is a judgment, not a formula. Two projects at level 1.4 can still differ by 20%. Use the table to anchor the conversation with yourself — not to replace it.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );

  // ---- Page 5: Target price summary + worked example ----
  nextPage(doc);
  state.pageNum = 5;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Section four", state.y);
  state.y = drawSectionHeader(doc, "05", "Target-price summary", state.y);
  state.y = drawParagraph(
    doc,
    "Fill this in for one offer you currently sell. The output is a reasoned floor and a target. The target is what you quote when the project is a fit and the buyer is a fit. The floor is the line below which you decline.",
    state.y
  );
  state.y += 6;

  const summaryRows = [
    ["K", "Offer name", "The specific offer you are pricing. Not the category — the offer."],
    ["L", "Estimated hours for this offer", "From past projects like this one. Not from a hope."],
    ["M", "Cost-floor hourly rate (from row I)", "Carry it down."],
    ["N", "L × M  =  floor price", "Below this, you are paying to work."],
    ["O", "Scope-complexity multiplier (from §04)", "1.0 to 2.0."],
    ["P", "N × O  =  adjusted floor", "The floor for this project."],
    ["Q", "Target multiplier", "Typically 1.3 to 1.8. Accounts for value, scarcity, and the buyer's gain."],
    ["R", "P × Q  =  target price", "The number you quote when the fit is right."],
  ];
  for (const [label, name, desc] of summaryRows) {
    ensureSpace(doc, state, 38);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(label, MARGIN, y);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK);
    doc.text(name, MARGIN + 24, y, { width: CONTENT_W - 24 - 100 });
    doc
      .moveTo(PAGE_W - MARGIN - 90, y + 12)
      .lineTo(PAGE_W - MARGIN, y + 12)
      .strokeColor(INK)
      .lineWidth(0.5)
      .stroke();
    doc.font("Helvetica").fontSize(9).fillColor(WARM_GRAY);
    doc.text(desc, MARGIN + 24, y + 16, { width: CONTENT_W - 24, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W - 24, lineGap: 2 });
    state.y = y + 16 + h + 8;
    drawHr(doc, state.y - 4, RULE, 0.4);
  }

  // Worked example
  state.y += 6;
  state.y = drawEyebrow(doc, "A worked example", state.y, OLIVE);
  state.y = drawParagraph(
    doc,
    "A designer with effective capacity of 1,100 hours/year (E), overhead of $9,000 (F), and desired income of $80,000 (G) has a revenue required (H) of $89,000. Their cost-floor rate (I) is roughly $81/hour. A brand-refresh offer estimated at 80 hours (L) has a floor price (N) of $6,480. At scope multiplier 1.4 (new buyer, home discipline) the adjusted floor (P) is $9,072. At target multiplier 1.5 (R), the target price is $13,608. They might quote $13,500 — and decline below $9,000.",
    state.y,
    { fontSize: 10 }
  );

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// 4. The Proposal System — Preview
// ============================================================

async function generateProposalSystemPreview() {
  const doc = newDoc("The Proposal System — Preview");
  const file = path.join(PREVIEWS_DIR, "proposal-system-preview.pdf");
  const totalPages = 4;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "The Proposal System · Preview",
    previewTag: "Preview · Sample pages",
  };

  // ---- Page 1: Title ----
  drawCover(doc, {
    eyebrow: "Preview · Sample pages",
    title: "THE PROPOSAL\nSYSTEM",
    subtitle:
      "A structured proposal toolkit for independent creative professionals.",
    meta: [
      "This is a 4-page preview of a 12-page proposal template, plus worksheets and clauses.",
      "The full toolkit is available in the shop. No purchase is possible in demo mode.",
    ],
    vol: "Margin / Form · Product preview",
    totalPages,
  });

  // ---- Page 2: Template structure overview ----
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 01", state.y);
  state.y = drawSectionHeader(doc, "01", "Proposal template structure", state.y);
  state.y = drawParagraph(
    doc,
    "The template is twelve pages when fully filled in. The first page is the cover; the last page is the decision. The middle ten are the working document — scope, exclusions, approach, schedule, price, terms, and the supporting appendices.",
    state.y
  );
  state.y = drawParagraph(
    doc,
    "The order is deliberate. Situation before scope, because scope without context reads as a price list. Exclusions before approach, because approach without exclusions grows. Price before decision, because a decision without a stated price is a negotiation in disguise. Each section earns the next.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );

  state.y = drawEyebrow(doc, "What's in the template", state.y, OLIVE);
  const templateItems = [
    ["Cover", "Buyer, project name, date, version, prepared-by."],
    ["Situation", "Quoted from the discovery call. Two paragraphs maximum."],
    ["Scope", "Named deliverables. Each as a noun."],
    ["Exclusions", "Named non-deliverables. Matching grammatical form."],
    ["Approach", "Phases, dependencies, decision points."],
    ["Schedule", "Weeks, not dates. Dates are confirmed on signature."],
    ["Price & terms", "Total, deposit, milestones, final, due dates, late fee."],
    ["Revision tier", "Light / Standard / Generous. Stated, not implied."],
    ["Decision", "What you need to start, by when, and the expiry."],
    ["Appendix A", "Commercial-assumptions checklist (signed)."],
    ["Appendix B", "Delivery-formats and usage-license statement."],
    ["Appendix C", "Stakeholder list with roles (decides, reviews, affected)."],
  ];
  for (const [name, desc] of templateItems) {
    ensureSpace(doc, state, 26);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(CLAY);
    doc.text("—", MARGIN, y);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK);
    doc.text(name, MARGIN + 18, y, { width: 140 });
    doc.font("Helvetica").fontSize(10).fillColor(INK_SOFT);
    doc.text(desc, MARGIN + 160, y, { width: CONTENT_W - 160, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W - 160, lineGap: 2 });
    state.y = y + Math.max(h, 14) + 6;
  }

  state.y = drawParagraph(
    doc,
    "Each section in the full template includes a one-paragraph usage note explaining how to fill it in, what to avoid, and where buyers most often push back.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 9.5 }
  );

  // ---- Page 3: Scope worksheet sample ----
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 02", state.y);
  state.y = drawSectionHeader(doc, "02", "Scope worksheet — sample", state.y);
  state.y = drawParagraph(
    doc,
    "The scope worksheet is the page where most proposals go wrong. It is structured as three paired columns: what we will produce, what we will not produce, and the input the buyer must provide for each item.",
    state.y
  );
  state.y += 4;

  // Sample table
  const tTop = state.y;
  const sCols = [
    { label: "WE WILL PRODUCE", x: MARGIN, w: 170 },
    { label: "WE WILL NOT PRODUCE", x: MARGIN + 176, w: 170 },
    { label: "BUYER PROVIDES", x: MARGIN + 352, w: PAGE_W - MARGIN - 352 },
  ];
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(INK);
  for (const c of sCols) doc.text(c.label, c.x, tTop, { width: c.w });
  drawHr(doc, tTop + 16);

  const sampleRows = [
    [
      "Brand-mark in three lockup variations.",
      "Sub-marks, illustrations, or iconography.",
      "Existing brand research and stakeholder list.",
    ],
    [
      "One type system with display + body pairing.",
      "Custom typeface design or lettering.",
      "Approval on the type direction before round two.",
    ],
    [
      "Color system with named ratios for print + screen.",
      "Production files for print, packaging, or signage.",
      "Final Pantone references and substrate samples.",
    ],
    [
      "Application of the system to three named touchpoints.",
      "Photography, illustration, or motion for those touchpoints.",
      "Final copy for each touchpoint, in editable format.",
    ],
    [
      "A 16-page brand guidelines PDF.",
      "An editable brand portal or ongoing brand management.",
      "Confirmation of the deliverable format before round one.",
    ],
  ];
  let sy = tTop + 24;
  for (const row of sampleRows) {
    let maxH = 0;
    for (let i = 0; i < 3; i++) {
      doc.font("Helvetica").fontSize(9.5).fillColor(INK);
      const h = doc.heightOfString(row[i], { width: sCols[i].w - 6, lineGap: 2 });
      doc.text(row[i], sCols[i].x, sy, { width: sCols[i].w - 6, lineGap: 2 });
      maxH = Math.max(maxH, h);
    }
    sy += maxH + 12;
    drawHr(doc, sy - 6, RULE, 0.4);
  }
  state.y = sy + 4;

  state.y = drawParagraph(
    doc,
    "The full worksheet includes 12 paired rows and a separate \"surprise check\" prompt at the bottom: name one thing the buyer would be surprised to learn is not included.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 9.5 }
  );

  // ---- Page 4: Commercial-assumptions checklist ----
  nextPage(doc);
  state.pageNum = 4;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 03", state.y);
  state.y = drawSectionHeader(doc, "03", "Commercial-assumptions checklist", state.y);
  state.y = drawParagraph(
    doc,
    "This is the page the buyer signs. It names the assumptions behind the price — so that if they change, the price changes. Silence on these points is how scope grows.",
    state.y
  );
  state.y += 4;

  const assumptionItems = [
    "The scope is as named in §3 of the proposal. Any addition is a change order.",
    "The schedule assumes one round of consolidated feedback per phase, within three business days.",
    "The price assumes delivery in the file formats named in Appendix B.",
    "The price assumes the buyer provides named inputs by the dates in §6.",
    "The deposit is non-refundable once work has begun.",
    "Travel, hosting, software, and stock are not included unless named.",
    "The support window after delivery is 14 calendar days.",
    "The license is for the named deliverable only — not for derivative works.",
    "The buyer warrants that all materials provided are cleared for use.",
    "The proposal is valid for 30 days from the date on the cover.",
  ];
  assumptionItems.forEach((item) => drawChecklistItem(doc, state, item));

  state.y = drawParagraph(
    doc,
    "Signed: ____________________________   Date: ____________   On behalf of: ____________________________",
    state.y + 6,
    { fontSize: 9.5, color: INK_SOFT }
  );

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// 5. The Pricing Workbook — Preview
// ============================================================

async function generatePricingWorkbookPreview() {
  const doc = newDoc("The Pricing Workbook — Preview");
  const file = path.join(PREVIEWS_DIR, "pricing-workbook-preview.pdf");
  const totalPages = 4;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "The Pricing Workbook · Preview",
    previewTag: "Preview",
  };

  // ---- Cover ----
  drawCover(doc, {
    eyebrow: "Preview · Sample pages",
    title: "THE PRICING\nWORKBOOK",
    subtitle:
      "A guided workbook for reasoning about costs, capacity, scope, and price.",
    meta: [
      "This is a 4-page preview of a 24-page printable workbook.",
      "The full workbook includes three worked scenarios and a discount-decision checklist.",
    ],
    vol: "Margin / Form · Product preview",
    totalPages,
  });

  // ---- Page 2: Effective-capacity sample ----
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 01", state.y);
  state.y = drawSectionHeader(doc, "01", "Effective-capacity worksheet — sample", state.y);
  state.y = drawParagraph(
    doc,
    "Effective capacity is the number of hours per year you can actually bill. The workbook walks you through five inputs and produces a single number. The sample below shows the worked example for a fictional independent designer in year three of practice.",
    state.y
  );
  state.y = drawParagraph(
    doc,
    "Notice that the sample designer works 32 hours per week, not 40. The other eight are the cost of running the practice — admin, marketing, learning, pitching, and the gap between projects. Most independents overestimate their capacity by 30 to 40 percent. The workbook is the exercise that catches the gap before the calendar does.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const sampleCapacity = [
    ["A", "Working hours per week", "32"],
    ["B", "Weeks worked per year", "46"],
    ["C", "A × B = gross working hours", "1,472"],
    ["D", "Non-billable load (% of C)", "45%"],
    ["E", "C × (1 − D) = effective capacity", "809 hours"],
  ];
  for (const [label, name, val] of sampleCapacity) {
    ensureSpace(doc, state, 30);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(label, MARGIN, y);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK);
    doc.text(name, MARGIN + 24, y, { width: 280 });
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(OLIVE);
    doc.text(val, PAGE_W - MARGIN - 90, y, { width: 90, align: "right" });
    state.y = y + 22;
    drawHr(doc, state.y - 4, RULE, 0.4);
  }

  state.y += 4;
  state.y = drawParagraph(
    doc,
    "The full worksheet includes a notes column for the reasoning behind each number — so that next quarter you can revisit your assumptions instead of starting from scratch.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 9.5 }
  );

  // ---- Page 3: Scope-complexity multiplier table ----
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 02", state.y);
  state.y = drawSectionHeader(doc, "02", "Scope-complexity multiplier — sample", state.y);
  state.y = drawParagraph(
    doc,
    "The multiplier adjusts the floor price to the project. The sample shows the full five-level table; the workbook adds a notes column for what pushed a specific project up a level.",
    state.y
  );
  state.y += 6;

  const tTop = state.y;
  const cols = [
    { label: "LEVEL", x: MARGIN, w: 60 },
    { label: "PROFILE", x: MARGIN + 64, w: 320 },
    { label: "MULTIPLIER", x: MARGIN + 388, w: PAGE_W - MARGIN - 388 },
  ];
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(INK);
  for (const c of cols) doc.text(c.label, c.x, tTop, { width: c.w });
  drawHr(doc, tTop + 16);

  const rows = [
    ["1.0", "Returning buyer · home discipline · one decision-maker · no fixed launch.", "1.0×"],
    ["1.2", "Returning buyer · adjacent discipline · two decision-makers · internal-only.", "1.2×"],
    ["1.4", "New buyer · home discipline · two decision-makers · internal-only.", "1.4×"],
    ["1.7", "New buyer · adjacent discipline · three stakeholders · soft launch.", "1.7×"],
    ["2.0", "New buyer · unfamiliar industry · 3+ stakeholders · fixed public launch.", "2.0×"],
  ];
  let ry = tTop + 24;
  for (const [lvl, profile, mult] of rows) {
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(lvl, MARGIN, ry);
    doc.font("Helvetica").fontSize(10).fillColor(INK);
    doc.text(profile, MARGIN + 64, ry, { width: 320, lineGap: 2 });
    const h = doc.heightOfString(profile, { width: 320, lineGap: 2 });
    doc.font("Helvetica-Bold").fontSize(11).fillColor(INK);
    doc.text(mult, MARGIN + 388, ry, { width: PAGE_W - MARGIN - 388 });
    ry += Math.max(h, 18) + 10;
    drawHr(doc, ry - 6, RULE, 0.4);
  }
  state.y = ry + 4;

  state.y = drawParagraph(
    doc,
    "The workbook's full version includes a second table for \"project conditions\" — five yes/no questions that nudge the multiplier up or down (e.g., \"buyer has done this kind of project before\").",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 9.5 }
  );

  // ---- Page 4: Discount-decision checklist ----
  nextPage(doc);
  state.pageNum = 4;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 03", state.y);
  state.y = drawSectionHeader(doc, "03", "Discount-decision checklist — sample", state.y);
  state.y = drawParagraph(
    doc,
    "The discount-decision checklist is the page you reach for when a buyer asks, \"Can you do it for less?\" It turns the question from a feeling into a written decision.",
    state.y
  );
  state.y += 4;

  const discountItems = [
    "Is the buyer a fit for the offer, with the inputs and decision-maker in place?",
    "Is the requested price at or above the floor for this project (P × 1.0)?",
    "Is there a stated reason for the discount the buyer can name back to you?",
    "Does the discount preserve the target multiplier for at least one stakeholder?",
    "Is the discount framed as a choice with a trade-off the buyer accepts (smaller scope, longer timeline, case-study rights)?",
    "Is the discount documented in writing, with the reason attached, so it does not become the new floor?",
    "If you decline, have you named a smaller scope at the buyer's budget instead?",
    "Have you waited at least 24 hours between the request and your reply?",
  ];
  discountItems.forEach((item) => drawChecklistItem(doc, state, item));

  state.y = drawPullQuote(
    doc,
    "A discount is not a price cut. It is a written agreement about what changed in exchange.",
    state.y
  );

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// 6. The Client Brief Kit — Preview
// ============================================================

async function generateClientBriefKitPreview() {
  const doc = newDoc("The Client Brief Kit — Preview");
  const file = path.join(PREVIEWS_DIR, "client-brief-kit-preview.pdf");
  const totalPages = 3;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "The Client Brief Kit · Preview",
    previewTag: "Preview",
  };

  // ---- Cover ----
  drawCover(doc, {
    eyebrow: "Preview · Sample pages",
    title: "THE CLIENT\nBRIEF KIT",
    subtitle:
      "A practical client-discovery and project-intake toolkit.",
    meta: [
      "This is a 3-page preview of an 18-page printable kit.",
      "The full kit includes a 28-question discovery questionnaire, brief template, and handoff checklist.",
    ],
    vol: "Margin / Form · Product preview",
    totalPages,
  });

  // ---- Page 2: Discovery questionnaire sample ----
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 01", state.y);
  state.y = drawSectionHeader(doc, "01", "Discovery questionnaire — sample", state.y);
  state.y = drawParagraph(
    doc,
    "The discovery questionnaire is sent to the buyer before the first call, or used live on the call. The full kit includes 28 questions grouped into five sections. The sample below shows six questions from across the sections.",
    state.y
  );
  state.y = drawParagraph(
    doc,
    "Send the questionnaire the day after the inquiry is acknowledged. Do not book the call until it is returned. A buyer who will not spend fifteen minutes on a written response is unlikely to spend thirty thousand dollars on a project. The questionnaire is the first filter — and the buyer's answers are the raw material for the brief, the proposal, and the scope.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 10 }
  );
  state.y += 4;

  const sampleQs = [
    "In one sentence, what would be different about your business at the end of this project?",
    "Who is the decision-maker on this project — and who else needs to be comfortable with the decision?",
    "What does success look like six months after delivery? Be specific.",
    "What has been tried before? What happened? (Be candid — it saves us both time.)",
    "Is there a date on the calendar that is driving this project? If so, what is it and why?",
    "If we declined this project, what would you do instead?",
  ];
  sampleQs.forEach((q, i) => drawQuestion(doc, state, i + 1, q, 1));

  state.y = drawParagraph(
    doc,
    "The full questionnaire is grouped into Background · Outcomes · Decision · Constraints · Risk. Each section has 5–7 questions and a notes column for the buyer's written response.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 9.5 }
  );

  // ---- Page 3: Project brief template sample ----
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "Sample page 02", state.y);
  state.y = drawSectionHeader(doc, "02", "Project brief template — sample", state.y);
  state.y = drawParagraph(
    doc,
    "The brief template is what you write after the discovery call — for yourself and for the buyer. It is one page. It is the document the proposal is written from. The sample below shows the structure.",
    state.y
  );
  state.y += 4;

  const briefSections = [
    ["Project name", "A short name the buyer and you both use. Not the buyer's internal code name."],
    ["Buyer", "Decision-maker, role, contact. Named once at the top of the brief."],
    ["Situation", "Two paragraphs, in the buyer's words where possible. Quoted from the discovery call."],
    ["Outcome", "One sentence. What is different six months after delivery. If you cannot write it in one sentence, the project is not yet clear."],
    ["Scope (draft)", "Named deliverables. Each as a noun. Drafted before the proposal — refined in the proposal."],
    ["Exclusions (draft)", "Named non-deliverables. Drafted now so the proposal does not surprise the buyer later."],
    ["Constraints", "Dates, dependencies, fixed inputs, fixed decisions. Named, not implied."],
    ["Stakeholders", "Decides · Reviews · Affected. Three lists. If you do not know who decides, the project is not ready."],
    ["Risks", "Two to four named risks. Each with a mitigation that is a person and a date, not a hope."],
    ["Next step", "One sentence. Proposal by [date]. Or: declined, with reason."],
  ];
  for (const [name, desc] of briefSections) {
    ensureSpace(doc, state, 32);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(CLAY);
    doc.text(name.toUpperCase(), MARGIN, y, { width: 130 });
    doc.font("Helvetica").fontSize(10).fillColor(INK);
    doc.text(desc, MARGIN + 140, y, { width: CONTENT_W - 140, lineGap: 2 });
    const h = doc.heightOfString(desc, { width: CONTENT_W - 140, lineGap: 2 });
    state.y = y + Math.max(h, 14) + 8;
    drawHr(doc, state.y - 4, RULE, 0.4);
  }

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// 7. Positioning Sentence Worksheet — Preview
// ============================================================

async function generatePositioningSentenceWorkbookPreview() {
  const doc = newDoc("Positioning Sentence Worksheet — Preview");
  const file = path.join(DOWNLOADS_DIR, "positioning-sentence-workbook-preview.pdf");
  const totalPages = 4;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "Positioning Sentence Worksheet · Preview",
    previewTag: "Preview · The Independent Practice, Module 02",
  };

  // ---- Cover ----
  drawCover(doc, {
    eyebrow: "Preview · from The Independent Practice, Module 02",
    title: "POSITIONING\nSENTENCE WORKSHEET",
    subtitle:
      "A guided worksheet for writing a positioning sentence you can defend in a discovery call.",
    meta: [
      "This preview includes the framework, three worked examples, and a fill-in template.",
      "The full worksheet is available inside The Independent Practice course.",
    ],
    vol: "Margin / Form · Course worksheet preview",
    totalPages,
  });

  // ---- Page 2: Framework + worked examples ----
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "The framework", state.y);
  state.y = drawSectionHeader(doc, "01", "The positioning sentence", state.y);
  state.y = drawParagraph(
    doc,
    "A positioning sentence is one sentence that names who you serve, the outcome you produce for them, and (by implication) who you do not serve. It is the sentence a stranger could repeat back after a minute on your site. It is the sentence you revise when your practice drifts.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "Positioning is not a tagline. It is not a niche. It is not the first line of your About page. It is the operational answer to the question every buyer is already asking: \"is this for someone like me?\" When the answer is yes for the right buyer and no for the wrong one, the rest of the practice — the website, the offer, the proposal, the price — gets easier to write. When the answer is \"maybe,\" every other page on the site has to do the work the positioning sentence should be doing.",
    state.y
  );

  state.y = drawEyebrow(doc, "The shape", state.y, OLIVE);
  state.y = drawParagraph(
    doc,
    "I help [specific buyer] do [specific outcome] by [specific approach], so they can [specific change].",
    state.y,
    { bold: true, color: INK }
  );

  state.y = drawParagraph(
    doc,
    "Each part is a constraint, not a fill-in-the-blank. If you cannot name a specific buyer, the sentence is not finished. If the outcome could apply to anyone, the sentence is not finished. The sentence is finished when a stranger can name three buyers who would not be a fit.",
    state.y
  );

  state.y = drawEyebrow(doc, "Three worked examples", state.y, OLIVE);
  state.y += 4;

  const examples = [
    {
      discipline: "Independent brand strategist",
      sentence:
        "I help founder-led service businesses at the 12-to-40-person stage name what they do and who they do it for, by running a four-week positioning sprint, so they can stop competing on category and start competing on outcome.",
    },
    {
      discipline: "Editorial designer",
      sentence:
        "I help independent magazines and small publishers design their first ten issues, by building a flexible editorial system in twelve weeks, so the editor can ship on schedule without reinventing the layout each issue.",
    },
    {
      discipline: "Operations consultant",
      sentence:
        "I help two-to-five-person creative studios write down how their practice actually runs, by facilitating a six-week operations audit, so the founder can take a month off without the pipeline freezing.",
    },
  ];
  for (const ex of examples) {
    ensureSpace(doc, state, 80);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(9).fillColor(CLAY);
    doc.text(ex.discipline.toUpperCase(), MARGIN, y);
    doc.font("Helvetica-Oblique").fontSize(10.5).fillColor(INK);
    doc.text(ex.sentence, MARGIN, y + 16, { width: CONTENT_W, lineGap: 4 });
    const h = doc.heightOfString(ex.sentence, { width: CONTENT_W, lineGap: 4 });
    state.y = y + 16 + h + 14;
    drawHr(doc, state.y - 6, RULE, 0.4);
  }

  state.y = drawParagraph(
    doc,
    "Notice what each example excludes. The strategist does not serve agencies. The designer does not serve brands. The consultant does not serve solo practitioners. Each exclusion is the sentence doing its job.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 9.5 }
  );

  // ---- Page 3: Fill-in template ----
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "The template", state.y);
  state.y = drawSectionHeader(doc, "02", "Fill in your sentence", state.y);
  state.y = drawParagraph(
    doc,
    "Draft three versions. Do not try to write the right one first — write three bad ones first. The right one is usually a combination of two of the bad ones.",
    state.y
  );
  state.y += 6;

  // Fill-in template: prompts + answer lines
  const templateParts = [
    ["Specific buyer", "Name a real buyer from your past three projects. Not a category — a person."],
    ["Specific outcome", "The change they cared about. Not the deliverable you produced."],
    ["Specific approach", "How you do it. The method, the duration, the format."],
    ["Specific change", "What becomes possible six months later. Not what you delivered — what they can do now."],
    ["Who is excluded", "Three buyers you would politely decline today. If you cannot name them, the sentence is not finished."],
  ];
  for (const [name, prompt] of templateParts) {
    ensureSpace(doc, state, 60);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(CLAY);
    doc.text(name.toUpperCase(), MARGIN, y);
    doc.font("Helvetica-Oblique").fontSize(9.5).fillColor(WARM_GRAY);
    doc.text(prompt, MARGIN, y + 14, { width: CONTENT_W, lineGap: 2 });
    state.y = y + 30;
    state.y = drawAnswerLines(doc, state.y, 2, 0);
    state.y += 4;
  }

  state.y += 4;
  state.y = drawEyebrow(doc, "Your three drafts", state.y, OLIVE);
  for (let i = 1; i <= 3; i++) {
    ensureSpace(doc, state, 50);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(CLAY);
    doc.text(`Draft ${String(i).padStart(2, "0")}`, MARGIN, y);
    state.y = y + 18;
    state.y = drawAnswerLines(doc, state.y, 2, 0);
    state.y += 4;
  }

  state.y = drawPullQuote(
    doc,
    "The goal of positioning is not to sound impressive. It is to make the right next conversation easy to start.",
    state.y
  );

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// 8. Client Profile Worksheet — Preview
// ============================================================

async function generateClientProfileWorkbookPreview() {
  const doc = newDoc("Client Profile Worksheet — Preview");
  const file = path.join(DOWNLOADS_DIR, "client-profile-workbook-preview.pdf");
  const totalPages = 4;
  const state: PageState = {
    pageNum: 1,
    totalPages,
    y: 88,
    resourceTitle: "Client Profile Worksheet · Preview",
    previewTag: "Preview · The Client Pipeline, Module 01",
  };

  // ---- Cover ----
  drawCover(doc, {
    eyebrow: "Preview · from The Client Pipeline, Module 01",
    title: "CLIENT PROFILE\nWORKSHEET",
    subtitle:
      "The four-part client profile — written from your three best past clients, not from a wish.",
    meta: [
      "This preview includes the four-part framework and a fill-in template.",
      "The full worksheet is available inside The Client Pipeline course.",
    ],
    vol: "Margin / Form · Course worksheet preview",
    totalPages,
  });

  // ---- Page 2: The framework ----
  nextPage(doc);
  state.pageNum = 2;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "The framework", state.y);
  state.y = drawSectionHeader(doc, "01", "The four-part client profile", state.y);
  state.y = drawParagraph(
    doc,
    "A client profile is not a wish. It is a filter. It is written from your three best past clients — the ones whose projects went well, paid on time, and referred other buyers like themselves. When you have the profile, you can read an inquiry and know within a minute whether it is worth a call.",
    state.y
  );

  state.y = drawParagraph(
    doc,
    "Most independent creatives build a pipeline from the inquiries that arrive, then complain about the inquiries that arrive. The profile inverts that. You write down the buyer you want to repeat, then judge each new inquiry against it. The cost of writing the profile is an afternoon. The cost of not writing it is a year of unsuitable projects.",
    state.y
  );

  state.y = drawPullQuote(
    doc,
    "A pipeline built on a vague profile will deliver vague work.",
    state.y
  );

  state.y = drawEyebrow(doc, "The four parts", state.y, OLIVE);

  const parts = [
    {
      name: "01 · The buyer",
      desc: "Who they are: role, discipline, stage of business, how they found you. Not a demographic — a working role. \"Marketing director at a 40-person law firm who has hired creatives before\" is more useful than \"professional services, 25–55\".",
    },
    {
      name: "02 · The trigger",
      desc: "What happened in the last 90 days that made them reach out. A new product. A rebrand. A leadership change. A website that finally broke. The trigger tells you whether the project is real or aspirational.",
    },
    {
      name: "03 · The scope they need",
      desc: "What they actually buy, in their language. Not what you wish they bought. If your best clients consistently buy a six-week sprint and not a retainer, the profile says so.",
    },
    {
      name: "04 · The disqualifiers",
      desc: "The traits that, if present, mean you should decline. Budget below your floor. A decision-maker who is not in the room. A timeline that requires you to drop other clients. Named now so the decision is not made under pressure.",
    },
  ];
  for (const p of parts) {
    ensureSpace(doc, state, 70);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(CLAY);
    doc.text(p.name, MARGIN, y);
    doc.font("Helvetica").fontSize(10).fillColor(INK);
    doc.text(p.desc, MARGIN, y + 18, { width: CONTENT_W, lineGap: 3 });
    const h = doc.heightOfString(p.desc, { width: CONTENT_W, lineGap: 3 });
    state.y = y + 18 + h + 12;
    drawHr(doc, state.y - 6, RULE, 0.4);
  }

  state.y = drawParagraph(
    doc,
    "The full worksheet walks you through extracting each part from your three best past clients — including a 12-question interview you can run on yourself, by re-reading the project notes and the emails you saved.",
    state.y,
    { italic: true, color: INK_SOFT, fontSize: 9.5 }
  );

  // ---- Page 3: Fill-in template ----
  nextPage(doc);
  state.pageNum = 3;
  state.y = startPage(doc, state);
  state.y = drawEyebrow(doc, "The template", state.y);
  state.y = drawSectionHeader(doc, "02", "Write your profile", state.y);
  state.y = drawParagraph(
    doc,
    "Fill this in from your three best past clients. If you cannot answer a section, that section is the next thing to figure out. Do not invent it.",
    state.y
  );
  state.y += 6;

  const sections = [
    ["01 · The buyer", "Role, discipline, stage of business, how they found you. One sentence."],
    ["02 · The trigger", "What happened in the last 90 days. Be specific — a name, a date, an event."],
    ["03 · The scope they need", "What they actually bought, in their language. Not what you wish they had bought."],
    ["04 · The disqualifiers", "Three traits that, if present, mean you decline. Named now."],
  ];
  for (const [name, prompt] of sections) {
    ensureSpace(doc, state, 70);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(CLAY);
    doc.text(name, MARGIN, y);
    doc.font("Helvetica-Oblique").fontSize(9.5).fillColor(WARM_GRAY);
    doc.text(prompt, MARGIN, y + 16, { width: CONTENT_W, lineGap: 2 });
    state.y = y + 32;
    state.y = drawAnswerLines(doc, state.y, 2, 0);
    state.y += 6;
  }

  state.y += 4;
  state.y = drawEyebrow(doc, "The three clients this profile is built from", state.y, OLIVE);
  for (let i = 1; i <= 3; i++) {
    ensureSpace(doc, state, 32);
    const y = state.y;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(CLAY);
    doc.text(`Client ${String(i).padStart(2, "0")}`, MARGIN, y);
    doc.font("Helvetica").fontSize(9).fillColor(WARM_GRAY);
    doc.text("Name (or initials) · project · year · what made them a good fit", MARGIN + 90, y, {
      width: CONTENT_W - 90,
    });
    state.y = y + 16;
    state.y = drawAnswerLines(doc, state.y, 1, 0);
    state.y += 4;
  }

  state.y = drawPullQuote(
    doc,
    "The profile is not a wish. It is a filter. The filter is what makes the pipeline calm.",
    state.y
  );

  state.y = drawDisclosure(doc, state);

  await saveDoc(doc, file);
  return file;
}

// ============================================================
// Main
// ============================================================

async function main() {
  ensureDir(DOWNLOADS_DIR);
  ensureDir(PREVIEWS_DIR);

  const jobs = [
    ["The Studio Audit", generateStudioAudit],
    ["The Proposal Checklist", generateProposalChecklist],
    ["The Pricing Starter", generatePricingStarter],
    ["The Proposal System — Preview", generateProposalSystemPreview],
    ["The Pricing Workbook — Preview", generatePricingWorkbookPreview],
    ["The Client Brief Kit — Preview", generateClientBriefKitPreview],
    ["Positioning Sentence Worksheet — Preview", generatePositioningSentenceWorkbookPreview],
    ["Client Profile Worksheet — Preview", generateClientProfileWorkbookPreview],
  ] as const;

  const results: { name: string; path: string; size: number }[] = [];
  for (const [name, fn] of jobs) {
    const filePath = await fn();
    const stat = fs.statSync(filePath);
    const sizeKB = Math.round(stat.size / 1024);
    console.log(`  ✓ ${name}  →  ${path.relative(ROOT, filePath)}  (${sizeKB} KB)`);
    results.push({ name, path: filePath, size: stat.size });
  }

  console.log(`\nGenerated ${results.length} PDFs.`);
  const totalKB = results.reduce((acc, r) => acc + r.size, 0) / 1024;
  console.log(`Total: ${Math.round(totalKB)} KB`);
}

main().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
