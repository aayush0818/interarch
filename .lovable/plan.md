## Scope

Content, imagery, and label updates only. No layout redesign. Desktop visual identity preserved.

---

### 1. Verticals imagery (homepage)

`src/components/home/Verticals.tsx` + asset pipeline

- Upload the two attached images via `lovable-assets` to `src/assets/verticals/`:
  - Image 1 (pool / pavilion) → `arch-hospitality-new.jpg`
  - Image 2 (arched mansion) → `arch-institutional-new.jpg`
- Swap the `hospitalityImg` and `archInstitutional` imports to the new assets.
- Keep existing residential/commercial imagery untouched.

### 2. Verticals responsive framing

`src/styles.css` (`.vx-media-frame img` and related rules)

- Audit current `object-fit` / `object-position` / aspect ratio at mobile, tablet, laptop, desktop.
- Set a consistent aspect (e.g. `4/5` on mobile/tablet, `3/4` on laptop, current on desktop) so the same focal point survives.
- Apply `object-position: center 35%` (or per-image override via a data attribute) so the architectural subject — pavilion / arched facade / building elevation — never gets cropped out at narrower widths.
- Add per-vertical focal hints in `Verticals.tsx` (`focal: "center 30%"`) and consume in the `<motion.img>` `style` prop so each vertical can be tuned individually.

### 3. Residential project gallery ordering

`src/data/projects.ts`

- For every project in `architecture / residential` and `interiors / residential`, reorder the `gallery` arrays to follow the two sequences in the brief.
- Approach: keep filenames intact; only the array order changes. Where a slot has no image, skip and continue.
- Architecture order: master plan → site plan → exterior → arrival → living → dining → kitchen → other interiors → feature areas → bedrooms → remaining.
- Interiors order: living → main shared → dining → kitchen → feature → other interiors → bedrooms → remaining.
- Classification will be inferred from filename keywords (`master`, `site`, `plan`, `ext`, `exterior`, `entry`, `arrival`, `living`, `dining`, `kitchen`, `bed`, `bath`, etc.) with a sensible fallback to current order for ambiguous frames.

### 4. Philosophy skyline image

- Upload third attached image (skyline line drawing) via `lovable-assets` → replace `src/assets/manifesto-skyline-drawing.png` pointer (delete old asset, write new pointer at same path) so `SketchPhilosophy.tsx` picks it up with zero code change.
- Layout, lightbox link, and CSS untouched.

### 5. Footer & pre-footer navigation labels

Align both to the Header IA: Projects · About IDL · Awards & Recognition · Contact.

- `src/components/home/Footer.tsx` — `navLinks` array: rename `Studio` → `About IDL`, merge `Awards` + `Media Recognition` into a single `Awards & Recognition` entry pointing to `/awards`. Keep Projects and Contact. Also rename the "Studio" column label (address block) to "Office" so it doesn't collide with the new "About IDL" nav entry.
- `src/components/home/HoverImageNav.tsx` — rename `Studio` → `About IDL`, `Awards` → `Awards & Recognition`. Keep the four-tile layout and images.

### 6. Em-dash cleanup

Sweep visible copy in:

- `src/data/siteContent.ts`
- `src/data/projects.ts`
- `src/components/home/*.tsx` and `src/routes/*.tsx` string literals

Rules:
- Replace ` — ` (spaced em-dash between clauses) with ` - ` (spaced hyphen).
- Replace leading eyebrow markers like `"— Mission"` with `"Mission"` (drop the dash entirely, since the eyebrow style already provides separation).
- Leave em-dashes inside SVG/code/identifiers untouched.
- Preserve readability — where an em-dash acts as a colon, prefer `:` instead of a hyphen.

### 7. Remove "Range of Experience" from About

- `src/routes/studio.about.tsx` — delete the `rangeOfExperience` section block (around line 140-160) and the import.
- `src/data/siteContent.ts` — remove the `rangeOfExperience` export.
- Verify spacing of the section above (Mission/Vision) and below flows cleanly; no extra empty wrappers left behind.

### 8. Subsection typography bump (About + Directors)

`src/styles.css`

- Locate the small heading style used for Conviction / Mission / Vision / similar subsection titles (likely `.idlx-section-title` or `.idlx-sub-title` inside the studio pages).
- Increase `font-size` by ~1pt (≈ +1.5px) at desktop; scale proportionally at mobile via existing `clamp()`. Keep weight, tracking, and family identical.
- No structural or component changes.

---

## Out of scope

- Desktop layout, animations, and visual identity stay exactly as they are.
- No new routes, no new components, no data-model changes beyond array reordering and copy edits.

## Verification

- Visual check `/`, `/studio/about`, `/studio/directors`, a residential architecture project, and a residential interior project at mobile + desktop widths via Playwright.
- Grep confirms `Range of Experience` and stray ` — ` instances are gone from user-visible copy.
