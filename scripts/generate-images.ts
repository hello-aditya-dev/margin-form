/**
 * MARGIN / FORM — Brand image generation pipeline.
 *
 * Generates ~20 original editorial photographs using the z-ai-web-dev-sdk
 * image generation API, then optimizes each to WebP + JPEG with sharp.
 *
 * Visual direction (from contact-sheet VLM analysis):
 *  - 35mm film, Kodak Portra 400 warmth, shallow DoF, fine grain
 *  - Natural side window light, soft warm shadows, 10am-3pm working light
 *  - Palette: terracotta/clay #C4654F, sage/olive #8B9A82, charcoal #2B2D2F, warm cream
 *  - Materials: dark walnut wood, heavyweight textured paper, matte ceramics, linen/wool
 *  - Composition: rule of thirds, negative space, hands-on detail, layered depth
 *
 * Usage: bun run scripts/generate-images.ts
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "images");

interface ImgJob {
  id: string;
  relPath: string;   // relative to public/images/
  size: string;
  prompt: string;
  eager?: boolean;   // optimize eagerly (hero)
}

const STYLE =
  "shot on 35mm film, Kodak Portra 400 color science, shallow depth of field f/2.8, " +
  "natural diffused side window light, soft warm shadows, warm color grading around 5800K, " +
  "fine subtle film grain, matte surfaces, no glossy plastic, editorial lifestyle photography, " +
  "sophisticated contemplative mood, premium independent magazine aesthetic, high detail, 8k quality";

const PALETTE =
  "warm color palette of terracotta clay, sage olive green, charcoal, and warm cream paper";

const MATERIALS =
  "dark walnut wood desk surface, heavyweight textured uncoated paper, matte stoneware ceramics";

const jobs: ImgJob[] = [
  // ── Hero ──
  {
    id: "hero-studio",
    relPath: "hero/hero-studio.jpg",
    size: "1440x720",
    eager: true,
    prompt: `Editorial photograph of an independent creative professional's studio on a warm afternoon. A woman in her early 30s with natural imperfect brown hair wearing a structured oatmeal wool blazer sits at a dark walnut desk, seen from the side, reviewing printed layouts and sketches. Warm window light streams in from the right casting soft long shadows. The desk has art books, a matte ceramic coffee cup, loose printed pages, and a brass ruler. Bookshelves with binders and framed references in the soft-focus background. Rich lived-in composition with generous negative space on the left for headline placement. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  // ── Founder ──
  {
    id: "founder-portrait",
    relPath: "founder/founder-portrait.jpg",
    size: "864x1152",
    eager: true,
    prompt: `Editorial portrait of a fictional woman in her early 30s named Elena, a creative-business educator. Natural imperfect brown hair pulled back loosely, wearing a structured oatmeal wool blazer over a black cotton shirt. Thoughtful relaxed expression, seated at a dark walnut desk resting chin lightly on hand, looking just off camera. Soft diffused window light from the left. Background is a warm blurred creative studio with bookshelves. Contemplative, approachable, confident — creative professional not corporate executive. ${PALETTE}. ${STYLE}`,
  },
  {
    id: "founder-at-work",
    relPath: "founder/founder-at-work.jpg",
    size: "1344x768",
    prompt: `Candid editorial photograph of the same fictional woman in her early 30s with brown hair and oatmeal wool blazer, reviewing proposal layouts and printed documents at a dark walnut studio table. Natural posture, believable hands, head slightly tilted in thought. Printed pages with handwritten notes, a mechanical pencil, a matte ceramic mug. Warm side window light. Shallow depth of field with soft-focus bookshelves behind. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  {
    id: "creative-process",
    relPath: "founder/creative-process.jpg",
    size: "1024x1024",
    prompt: `Close-up editorial photograph of hands arranging printed notes, paper samples, and project materials on a textured dark walnut desk. A black fine-point pen, mechanical pencil, and brass ruler visible. Heavyweight cream paper with handwritten annotations. Matte stoneware cup nearby. Warm side light creating soft shadows across the paper textures. Tactile, tangible, intimate framing. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  {
    id: "studio-environment",
    relPath: "founder/studio-environment.jpg",
    size: "1344x768",
    prompt: `Beautifully composed independent design workspace interior. Floor-to-ceiling wooden bookshelves filled with art books, binders, and framed reference images. A dark walnut desk with a closed silver laptop, matte ceramic vase with dried botanicals, stacked journals. Soft natural light from a large window. No people. Warm, lived-in, considered creative environment. ${PALETTE}. ${STYLE}`,
  },
  // ── Course covers ──
  {
    id: "course-independent-practice",
    relPath: "courses/course-independent-practice.jpg",
    size: "864x1152",
    prompt: `Premium product photograph of a thick beautifully designed creative-business workbook resting on a textured warm cream linen surface. The workbook cover is warm terracotta clay colored matte uncoated cardstock with a subtle debossed geometric line pattern. Soft directional window light from the upper left casting gentle shadows. A matte ceramic cup and a brass ruler subtly in the background bokeh. No text on the cover — purely a textured colored object. Editorial product photography, sophisticated shadow and lighting. ${PALETTE}. ${STYLE}`,
  },
  {
    id: "course-client-pipeline",
    relPath: "courses/course-client-pipeline.jpg",
    size: "864x1152",
    prompt: `Premium product photograph of an olive sage green creative-business workbook lying on a dark walnut wood surface next to printed worksheets, a mechanical pencil, and small note cards. The workbook has a subtly different debossed dot pattern on its matte cover. Warm side light from the right. No text on the cover. Slightly different lighting and angle from a terracotta counterpart — same publishing house, distinct identity. Editorial product photography. ${PALETTE}. ${STYLE}`,
  },
  // ── Product mockups ──
  {
    id: "product-proposal-system",
    relPath: "products/product-proposal-system.jpg",
    size: "1024x1024",
    prompt: `Premium flat-lay product photograph of a structured proposal toolkit: stacked printed documents on heavyweight cream paper, a clipboard with a scope worksheet, a printed timeline framework, and a commercial-assumptions checklist page visible. All on a dark walnut desk surface with a matte ceramic coffee cup in the corner. Warm overhead diffused light. No readable text — suggest structure through layout and typography forms. Editorial stationery photography. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  {
    id: "product-pricing-workbook",
    relPath: "products/product-pricing-workbook.jpg",
    size: "1024x1024",
    prompt: `Premium product photograph of an open pricing workbook on a dark walnut desk. The left page shows a grid-like worksheet with faint lines and checkbox forms, the right page shows a table with multiplier values. A mechanical pencil rests across the pages. Matte ceramic cup nearby. Warm side light. No readable text — suggest worksheets through layout and line forms. Editorial workbook photography. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  {
    id: "product-client-brief-kit",
    relPath: "products/product-client-brief-kit.jpg",
    size: "1024x1024",
    prompt: `Premium product photograph of a client discovery kit: a printed discovery questionnaire page, a project brief template, and a stakeholder checklist arranged in a deliberate stack on a charcoal desk surface. A black pen lies diagonally across the top page. Warm directional light. No readable text. Editorial stationery photography with sophisticated shadow. ${PALETTE}. ${STYLE}`,
  },
  // ── Membership ──
  {
    id: "membership-practice-room",
    relPath: "membership/membership-practice-room.jpg",
    size: "1344x768",
    prompt: `Warm aspirational editorial photograph of a beautiful collaborative creative studio. A large dark walnut table with sketchbooks, open notebooks, printed discussion prompts, and matte ceramic coffee cups. No people visible — the space feels considered and ready for a small group session. Soft natural window light, warm shadows, bookshelves in the background. Illustrative of thoughtful independent learning. ${PALETTE}. ${STYLE}`,
  },
  // ── Newsletter ──
  {
    id: "newsletter-monday-letter",
    relPath: "newsletter/newsletter-monday-letter.jpg",
    size: "1344x768",
    prompt: `Editorial still life of a folded editorial letter on heavyweight cream paper resting on a dark walnut desk. A matte ceramic coffee cup with steam rising, a mechanical pencil, and a small stack of handwritten notes nearby. Quiet morning atmosphere with soft warm window light from the left. The letter has no readable text — a simple folded paper object with elegant proportions. Independent print newsletter aesthetic. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  // ── Resource ──
  {
    id: "resource-studio-audit",
    relPath: "resources/resource-studio-audit.jpg",
    size: "1024x1024",
    prompt: `Premium product photograph of an open audit workbook on a textured warm cream surface. The left page shows a scoring framework with checkboxes and rating columns, the right page shows an action-priority worksheet with a simple grid. A black pen rests on the page. Warm directional light. No readable text — suggest audit structure through line forms and grid layout. Tangible, considered, premium. ${PALETTE}. ${STYLE}`,
  },
  // ── Journal (6 images) ──
  {
    id: "journal-better-clients",
    relPath: "journal/journal-better-clients.jpg",
    size: "1344x768",
    prompt: `Editorial photograph of a considered creative workspace with an open printed portfolio, client notes on cream paper, and a matte ceramic cup on a dark walnut desk. Warm side light. No readable text. Composition communicates discernment and selection. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  {
    id: "journal-service-menu",
    relPath: "journal/journal-service-menu.jpg",
    size: "1344x768",
    prompt: `Minimal editorial still life of three carefully arranged objects on a warm cream paper background: a single matte ceramic cup, a folded note card, and a brass ruler. Extreme restraint, generous negative space, soft directional light. Composition communicates selection and saying less. ${PALETTE}. ${STYLE}`,
  },
  {
    id: "journal-pricing-conversations",
    relPath: "journal/journal-pricing-conversations.jpg",
    size: "1344x768",
    prompt: `Editorial photograph of printed project estimate pages, a vintage mechanical calculator, and handwritten pricing notes on a dark walnut desk. Warm side light. No readable text. Composition communicates considered money conversations. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
  {
    id: "journal-client-briefs",
    relPath: "journal/journal-client-briefs.jpg",
    size: "1344x768",
    prompt: `Editorial top-down photograph of structured notes, pencil sketches, and briefing materials arranged on heavyweight cream paper on a dark walnut surface. A grid of small sticky notes, a sketch of a layout, printed meeting notes. Warm diffused light. No readable text. Composition communicates structure and preparation. ${PALETTE}. ${STYLE}`,
  },
  {
    id: "journal-sustainable-practice",
    relPath: "journal/journal-sustainable-practice.jpg",
    size: "1344x768",
    prompt: `Quiet architectural editorial photograph of a minimalist studio corner: a single wooden chair, a tall window with soft light, a potted dried plant, and a warm cream wall. No people, no desk. Composition communicates balance, calm, and sustainable space. Warm tones, soft shadows. ${PALETTE}. ${STYLE}`,
  },
  {
    id: "journal-weekly-review",
    relPath: "journal/journal-weekly-review.jpg",
    size: "1344x768",
    prompt: `Editorial photograph of an open journal, a mechanical pencil, and a small notebook arranged on a dark walnut desk in soft morning window light. A matte ceramic cup nearby. No readable text. Composition communicates a quiet weekly review ritual. Warm, intimate, considered. ${PALETTE}. ${MATERIALS}. ${STYLE}`,
  },
];

async function generateOne(zai: any, job: ImgJob): Promise<boolean> {
  const fullPath = path.join(OUT, job.relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  // Skip if already generated
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).size > 5000) {
    console.log(`  ⏭  skip ${job.id} (exists)`);
    return true;
  }

  try {
    console.log(`  ▶  generating ${job.id} (${job.size})...`);
    const res = await zai.images.generations.create({
      prompt: job.prompt,
      size: job.size as any,
    });
    const b64 = res.data?.[0]?.base64;
    if (!b64) throw new Error("no base64 in response");

    const buf = Buffer.from(b64, "base64");

    // Optimize: convert to JPEG quality 82, and also produce a WebP
    await sharp(buf)
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(fullPath.replace(/\.jpg$/, ".jpg"));

    // Also save a WebP variant for performance
    const webpPath = fullPath.replace(/\.jpg$/, ".webp");
    await sharp(buf)
      .webp({ quality: 78 })
      .toFile(webpPath);

    const sz = fs.statSync(fullPath).size;
    console.log(`  ✓  ${job.id} → ${job.relPath} (${(sz / 1024).toFixed(0)}KB jpg)`);
    return true;
  } catch (e: any) {
    console.error(`  ✗  ${job.id} FAILED: ${e.message}`);
    return false;
  }
}

async function main() {
  console.log(`\n=== MARGIN / FORM image generation: ${jobs.length} assets ===\n`);
  const zai = await ZAI.create();

  // Process in concurrency batches of 3
  const BATCH = 3;
  const failed: string[] = [];

  for (let i = 0; i < jobs.length; i += BATCH) {
    const batch = jobs.slice(i, i + BATCH);
    console.log(`\n--- batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(jobs.length / BATCH)} ---`);
    const results = await Promise.all(batch.map((j) => generateOne(zai, j)));
    results.forEach((ok, idx) => {
      if (!ok) failed.push(batch[idx].id);
    });
  }

  console.log(`\n=== DONE ===`);
  console.log(`Success: ${jobs.length - failed.length}/${jobs.length}`);
  if (failed.length) {
    console.log(`Failed (will retry): ${failed.join(", ")}`);
    // Retry failed once
    console.log(`\n--- retrying failed ---`);
    for (const id of failed) {
      const job = jobs.find((j) => j.id === id)!;
      await generateOne(zai, job);
    }
  }

  // Print manifest summary
  console.log(`\n=== MANIFEST ===`);
  for (const job of jobs) {
    const p = path.join(OUT, job.relPath);
    const exists = fs.existsSync(p);
    const sz = exists ? fs.statSync(p).size : 0;
    console.log(`  ${exists ? "✓" : "✗"}  /images/${job.relPath}  ${(sz / 1024).toFixed(0)}KB  ${job.size}`);
  }
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
