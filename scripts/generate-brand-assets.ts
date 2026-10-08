/**
 * MARGIN / FORM — Generate favicon set + OG/social images programmatically.
 * Creates: favicon.svg (refined), apple-touch-icon (180x180), og-default (1200x630),
 * twitter-card (1200x628), and a social-square (1024x1024).
 *
 * Usage: bun run scripts/generate-brand-assets.ts
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const BRAND = path.join(process.cwd(), "public", "brand");
const OG = path.join(process.cwd(), "public", "images", "og");
fs.mkdirSync(OG, { recursive: true });

const INK = "#252721";
const CLAY = "#AD4E36";
const PAPER = "#F3EEE6";
const IVORY = "#FCFAF6";
const OLIVE = "#777F68";

// ── 1. Refined favicon.svg ──
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="6" fill="${PAPER}"/>
  <text x="32" y="40" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-weight="400" fill="${INK}">M<tspan fill="${CLAY}" dx="1" font-size="22">/</tspan>F</text>
  <rect x="6" y="58" width="52" height="1.5" fill="${CLAY}"/>
</svg>`;
fs.writeFileSync(path.join(BRAND, "favicon.svg"), faviconSvg);
console.log("✓ favicon.svg");

// ── 2. Apple touch icon (180x180) ──
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" rx="36" fill="${INK}"/>
  <text x="90" y="108" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="400" fill="${PAPER}">M<tspan fill="${CLAY}" dx="2" font-size="56">/</tspan>F</text>
</svg>`;
const appleBuf = Buffer.from(appleSvg);
await sharp(appleBuf).resize(180, 180).png().toFile(path.join(BRAND, "apple-touch-icon.png"));
console.log("✓ apple-touch-icon.png");

// ── 3. OG default image (1200x630) — editorial brand card ──
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <!-- Left color block -->
  <rect x="0" y="0" width="420" height="630" fill="${INK}"/>
  <!-- Clay accent line -->
  <rect x="0" y="0" width="420" height="6" fill="${CLAY}"/>
  <!-- Left block: wordmark -->
  <text x="60" y="250" font-family="Georgia, serif" font-size="78" font-weight="400" fill="${PAPER}" letter-spacing="-2">MARGIN</text>
  <text x="60" y="305" font-family="'Courier New', monospace" font-size="28" fill="${CLAY}" letter-spacing="8">/ FORM</text>
  <text x="60" y="400" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" fill="${PAPER}" opacity="0.7" letter-spacing="3">AN EDITORIAL EDUCATION COMPANY</text>
  <text x="60" y="435" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" fill="${PAPER}" opacity="0.7" letter-spacing="3">EST. FOR DEMONSTRATION</text>
  <!-- Right side: tagline -->
  <text x="510" y="230" font-family="Georgia, serif" font-size="56" font-weight="400" fill="${INK}" letter-spacing="-1">Make excellent</text>
  <text x="510" y="298" font-family="Georgia, serif" font-size="56" font-weight="400" fill="${INK}" letter-spacing="-1">work. Build a</text>
  <text x="510" y="366" font-family="Georgia, serif" font-size="56" font-style="italic" fill="${CLAY}" letter-spacing="-1">business that</text>
  <text x="510" y="434" font-family="Georgia, serif" font-size="56" font-weight="400" fill="${INK}" letter-spacing="-1">can sustain it.</text>
  <!-- Bottom meta -->
  <text x="510" y="540" font-family="'Courier New', monospace" font-size="14" fill="${OLIVE}" letter-spacing="2">COURSES · PRODUCTS · MEMBERSHIP · JOURNAL</text>
  <text x="510" y="570" font-family="'Courier New', monospace" font-size="13" fill="${OLIVE}" opacity="0.7" letter-spacing="2">PORTFOLIO DEMONSTRATION · FICTIONAL CREATOR BUSINESS</text>
  <!-- Right corner mark -->
  <text x="1140" y="590" text-anchor="end" font-family="Georgia, serif" font-size="22" fill="${CLAY}">M/F</text>
</svg>`;
const ogBuf = Buffer.from(ogSvg);
await sharp(ogBuf).jpeg({ quality: 88, progressive: true }).toFile(path.join(OG, "og-default.jpg"));
await sharp(ogBuf).webp({ quality: 84 }).toFile(path.join(OG, "og-default.webp"));
console.log("✓ og-default.jpg + webp");

// ── 4. Twitter card (1200x628 — same composition, slightly different height) ──
await sharp(ogBuf).resize(1200, 628, { fit: "cover", position: "top" }).jpeg({ quality: 88 }).toFile(path.join(OG, "twitter-card.jpg"));
console.log("✓ twitter-card.jpg");

// ── 5. Social square (1024x1024) for consistent cross-platform ──
const squareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="${PAPER}"/>
  <rect x="0" y="0" width="1024" height="8" fill="${CLAY}"/>
  <text x="512" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="120" font-weight="400" fill="${INK}" letter-spacing="-3">MARGIN</text>
  <text x="512" y="500" text-anchor="middle" font-family="'Courier New', monospace" font-size="42" fill="${CLAY}" letter-spacing="12">/ FORM</text>
  <line x1="362" y1="560" x2="662" y2="560" stroke="${INK}" stroke-width="1" opacity="0.2"/>
  <text x="512" y="620" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-style="italic" fill="${INK}">The business of</text>
  <text x="512" y="668" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-style="italic" fill="${INK}">independent creativity</text>
  <text x="512" y="760" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="${OLIVE}" letter-spacing="3">PORTFOLIO DEMONSTRATION</text>
</svg>`;
const sqBuf = Buffer.from(squareSvg);
await sharp(sqBuf).png().toFile(path.join(BRAND, "social-square.png"));
await sharp(sqBuf).resize(512, 512).png().toFile(path.join(BRAND, "icon-512.png"));
console.log("✓ social-square.png + icon-512.png");

// ── 6. favicon.ico equivalent (32x32 png, browsers accept png with rel=icon) ──
await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(path.join(BRAND, "favicon-32.png"));
await sharp(Buffer.from(faviconSvg)).resize(16, 16).png().toFile(path.join(BRAND, "favicon-16.png"));
console.log("✓ favicon-32.png + favicon-16.png");

console.log("\n=== ALL BRAND ASSETS GENERATED ===");
