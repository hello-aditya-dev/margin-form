# Brand Guide — Margin / Form

> The business of independent creativity.

This guide is the canonical reference for the Margin / Form identity. Every
visual decision in the codebase — palette tokens in
`src/app/globals.css`, type styles in `src/app/layout.tsx`, component
composition in `src/components/editorial/` — derives from the principles in
this document.

---

## 1. Brand identity

**Name:** MARGIN / FORM
**Wordmark:** `MARGIN / FORM` set in Newsreader, with the slash rendered in
Clay (`#AD4E36`) as the single chromatic accent in the mark. The slash is the
only place colour touches the wordmark.
**Tagline:** *The business of independent creativity.*
**Positioning statement:** Practical business education for independent
creative professionals — designers, consultants, strategists, and small
studios. Not growth-hacking. Not creator-economy hype. A calmer, repeatable
practice.

The brand presents as an **editorial education company** that treats
independent creative work as both an artistic practice and a commercially
sustainable profession. The visual world is an independent business journal
meeting a creative atelier: paper, ink, hairline rules, generous margins,
numbered sections, and one quiet accent.

---

## 2. Positioning

| We are                                           | We are not                                            |
|--------------------------------------------------|-------------------------------------------------------|
| Practical business education for creative people | Creator-economy hype or growth-hacking                |
| Editorial, considered, quiet                     | Loud, gamified, urgency-driven                        |
| For independent practitioners and small studios  | For agencies at scale or salaried in-house teams      |
| A system for sustaining the work you want        | A system for maximising revenue at any cost           |
| Written curricula and downloadable frameworks    | Video libraries, certifications, or accreditations    |

---

## 3. Voice

**Editorial. Intelligent. Quietly confident. Human. Precise. Commercially
literate.**

The voice assumes the reader is intelligent and busy. It does not hype, does
not use exclamation marks, does not address the reader as "friend" or "fam".
It explains commercial concepts (positioning, pricing, scope, pipeline,
delivery) the way a thoughtful editor would explain them to a peer.

### Do

> "Most creative professionals were taught to improve their craft. Few were
> taught how to price it, scope it, propose it, and deliver it without losing
> the practice they wanted in the first place."

> "A practice is partly defined by its exclusions."

### Don't

> "Unlock 10x revenue with these proven creator secrets!" *(hype, exclamation,
> vague promise)*

> "Hey friend! Let's dive into pricing lol" *(over-familiar, casual, filler)*

The voice is allowed to be direct about money, scope, and rejection — those
are the subjects the audience needs help with. It is never sarcastic, never
patronising, and never claims results it cannot deliver.

---

## 4. Color palette

All palette tokens live in `src/app/globals.css` as CSS custom properties.
Use the tokens, not the hex values, in components.

| Token           | Hex       | Role                                                        |
|-----------------|-----------|-------------------------------------------------------------|
| `--paper`       | `#F3EEE6` | Primary surface. Warm off-white.                           |
| `--ivory`       | `#FCFAF6` | Cards, panels, raised surfaces. Lightest tone.            |
| `--ink`         | `#252721` | Primary text. Buttons (ink fill). Headers.                |
| `--clay`        | `#AD4E36` | Single accent. Wordmark slash. CTAs. Editorial eyebrows.  |
| `--olive`       | `#777F68` | Secondary accent. Used sparingly for tags, marks.        |
| `--linen`       | `#D8CEBF` | Secondary fills, muted blocks.                            |
| `--warm-gray`   | `#756F65` | Tertiary text, captions, meta.                            |
| `--rule`        | `#E4DDCF` | Editorial hairline dividers.                              |
| `--ink-soft`    | `#4A4C44` | Secondary body text (derived).                            |
| `--paper-deep`  | `#ECE5D7` | Slightly deeper paper for alternating sections (derived).|

### Distribution guidance

- **Paper / ivory:** 65–75% of any view. The surface must dominate.
- **Ink:** 15–25% of any view. Type, hairlines, and dark fills.
- **Clay:** small — a few percent. The accent. Used in eyebrows, the wordmark
  slash, key CTA fills, and one or two emphasised words per headline. Never as
  a section background.
- **Olive:** smaller still. Tags, secondary marks, list bullets. Never
  competes with clay.
- **Linen:** used for muted blocks and secondary fills. Never as a primary
  accent.
- **Rule (`#E4DDCF`):** the hairline. Used everywhere a divider is needed. It
  should be visible but quiet.

### Dark mode

A dark theme is implemented (`.dark` class in `globals.css`) but the site
forces the light theme by default (`ThemeProvider` in
`src/components/layout/theme-provider.tsx` with `defaultTheme="light"` and
`enableSystem={false}`). Dark mode exists for completeness and is not the
intended presentation.

---

## 5. Typography

Three typefaces, each with a clear role. All loaded via `next/font/google` in
`src/app/layout.tsx`.

| Family          | Role                                | Weights used            |
|-----------------|-------------------------------------|-------------------------|
| **Newsreader**  | Display serif. Headlines, titles.   | 400, 500, 600 (normal + italic) |
| **DM Sans**     | UI and body. Paragraphs, controls.  | 400, 500, 600, 700      |
| **IBM Plex Mono**| Labels, eyebrows, meta, numbers.   | 400, 500                |

### Type hierarchy

| Element              | Family     | Size range                  | Notes                                              |
|----------------------|------------|-----------------------------|----------------------------------------------------|
| Hero headline        | Newsreader | 76–116px (clamp-based)      | `text-[clamp(2.75rem,8vw,7rem)]`, leading 0.95, tracking -0.025em |
| Page headline        | Newsreader | 64–90px                     | Section-leading titles on interior pages           |
| Section headline     | Newsreader | 40–64px                     | Used with `SectionHeader`                          |
| Card title           | Newsreader | 25–36px                     | Course / product / article cards                   |
| Body                 | DM Sans    | 16–19px                     | 1.6 line-height for reading                        |
| Labels / eyebrows    | IBM Plex Mono | 11–13px                 | Uppercase, tracked, used for `eyebrow`, `num-marker`, `font-mono-label` |

Editorial labels use the `.eyebrow` class (Plex Mono, uppercase, tracked).
Numbered sections use `.num-marker` (Plex Mono, clay-coloured two-digit
number, e.g. `01`, `02`).

### Type principles

- Italic Newsreader is reserved for emphasis within a headline or for short
  pull-quotes — never for body.
- Mono labels never sit below 11px. If a label needs to be smaller, rewrite
  the label.
- Body line-height is generous (1.6). Headlines are tight (0.95–1.1).
- Numerals in editorial copy use Newsreader (old-style figures feel right for
  the journal voice).

---

## 6. Logo rules

**Wordmark** (`src/components/brand/wordmark.tsx`): `MARGIN / FORM` set in
Newsreader with the slash in Clay. The wordmark is used in the site header,
the site footer, the demo checkout header, and the demo completion screen. It
must always render on the paper or ivory background; never on ink.

**MF monogram:** available as the SVG mark in `public/logo.svg`. Reserved for
favicon-adjacent uses and (optionally) the demo completion receipt. Never
replaces the wordmark in primary navigation.

**Favicon:** `public/brand/favicon.svg`. A simple SVG mark. Scales cleanly to
16x16.

**Do not:**
- Recolour the wordmark. The slash is always Clay; the rest is always Ink.
- Stretch or condense the wordmark.
- Add a drop shadow, gradient, or glow to the wordmark.
- Place the wordmark on a photograph or busy background.

---

## 7. Composition principles

- **12-column grid.** `container-editorial` (defined in `globals.css`)
  establishes the page grid at a 1440px max width with generous gutters.
- **1440px max width.** Content never exceeds 1440px. On wider viewports the
  margin grows.
- **660–760px reading width.** Long-form prose (journal articles, course
  lessons) caps at roughly 660–760px for readability. Use `max-w-2xl` or
  `max-w-prose` equivalents.
- **Asymmetric layouts.** Hero uses an 8/4 split. Editorial sections
  frequently use 7/5 or 5/7 splits. Symmetric layouts are reserved for
  catalogue grids.
- **Numbered sections.** Every major section on a page opens with a
  `.num-marker` two-digit number and an `.eyebrow` label. This is the editorial
  spine of the site.
- **Hairline dividers.** Sections are separated by 1px `--rule` borders, not
  by shadows or gradients. The hairline is the primary structural element.
- **Paper grain.** A subtle grain texture (`.paper-grain` utility) is applied
  to the body to keep the surface from feeling flat. Keep it subtle.
- **Generous vertical rhythm.** Section padding is `py-12 md:py-20 lg:py-28`
  on most pages. The page should breathe.

---

## 8. Imagery direction

The site deliberately avoids photographic imagery. There are no stock photos
of smiling freelancers, no fake meeting-room shots, no AI-generated portraits
of the founder.

- **Founder portrait:** abstract. The About page uses CSS/SVG composition, not
  a photograph. This is intentional: a fictional founder should not be
  illustrated with a real person's face.
- **Course covers:** generated SVG artwork (`src/components/editorial/covers.tsx`,
  `public/course-covers/`). Accent-driven (clay / olive / ink) with a
  volume/issue number and a serif title — styled as monograph covers.
- **Product artwork:** same system. Generated SVG, accent-driven, no
  photographs.
- **Article heroes:** typographic compositions with an accent block, not
  images.
- **Icons:** Lucide line icons, 1.25px stroke, sized 14–20px in most contexts.
  Never decorative for its own sake.

The visual world is paper, type, hairlines, and one accent. Imagery is
generated, not photographed.

---

## 9. Accessibility

- **Target:** WCAG 2.2 AA.
- **Contrast.** Ink on paper and ink on ivory both exceed 7:1. Warm-gray on
  paper is the lowest-contrast text and is reserved for tertiary meta;
  verify it on a per-use basis if used for anything the user must read.
- **Keyboard.** Every interactive element is keyboard-reachable. The site
  includes a visible "Skip to content" link (`src/app/layout.tsx`). Focus
  styles use the ink ring token.
- **Reduced motion.** Framer Motion animations are wrapped to respect
  `prefers-reduced-motion`. The checkout button spinner uses a CSS animation
  that can be disabled by the user agent's reduced-motion setting.
- **Forms.** All inputs have associated labels. Errors are announced
  (`aria-live`). The newsletter form requires explicit consent (a real
  checkbox, not a pre-ticked box).
- **Images.** All SVG artwork is decorative where decorative, and labelled
  where informative. The wordmark is set as text, not as an image, so it is
  available to assistive technology.
- **Colour is never the sole carrier of meaning.** Eyebrows use uppercase
  tracked text in addition to colour; status states pair colour with text
  labels.

Automated axe scans have **not** been run in this workspace (Playwright/axe is
not installed). See `docs/ENVIRONMENT.md` and `docs/FEATURE_INVENTORY.md` for
the verification status. Manual keyboard review is recommended before any
real deployment.
