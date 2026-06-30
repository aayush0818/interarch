# Project & Layout Updates

Targeted edits only — no redesigns. Existing components/layouts reused throughout.

## 1. Residential order & card orientation (Projects page only)
In `src/data/projects.ts`, reorder the Architecture · Residential entries to:

1. Glasswood Retreat — Landscape
2. Laxmi Kunj — Portrait
3. Proximus — Portrait
4. The Panorama House — Landscape
5. The Portico House — Portrait
6. The Pavilion Estate — Portrait
7. The Lantern Villa — Landscape
8. The Ridge House — Portrait
9. The Atrium House — Portrait
10. The Linear Estate — Landscape
11. The Ivory Estate — Portrait
12. Altura Residence — Portrait
13. The Courtyard Twins — Landscape

Add an optional `cardOrientation?: "portrait" | "landscape"` field on `Project` and set it per the list above. In `src/routes/projects.$category.tsx`, extend the existing grid: portrait cards keep the current column span; landscape cards span the full row width. No new component.

## 2. Hero image swaps
- The Pavilion Estate → first attached image
- The Portico House → second attached image

> ⚠️ The attached images aren't present in this turn (no uploads found). I'll do every other change and circle back on these two heroes once you re-attach them.

## 3. Hero focal-point / fit adjustments (data only)
In `src/data/projects.ts`:
- Laxmi Kunj — `coverPosition: "50% 70%"` (shift down)
- Glasswood Retreat — `imageFit: "contain"` (zoom out)
- Ivory Estate — `imageFit: "contain"` (zoom out)
- Courtyard Twins — `coverPosition: "50% 70%"` (shift down)

## 4. Project cover card framing
Audit every project. For each, set a per-project `coverPosition` (and `cardCover` only where already used) that:
- Keeps the upper portion of the building visible.
- Crops from the bottom when crop is unavoidable (focal points typically `50% 20%`–`50% 35%`).
- Removes excessive zoom by switching to `imageFit: "contain"` where compositions demand it.

Purely data-level — no component changes.

## 5. Hero image repetition
Add `keepHeroInGallery: true` for **Ivory Estate** and **Altura Residence** only. Update the gallery-render dedupe in `src/routes/project.$slug.tsx` to honor this flag (otherwise the cover is stripped from the gallery as it is today).

## 6. Gallery cleanup
- Run a dedupe pass on every project's `gallery` array (and Maple's `facilities[].images`) and remove repeated URLs.
- In `src/styles.css`, scrub `.idlx-gallery`, `SmartGallery`, and `ProjectImage` rules for stray `background`, `border`, or `padding` that produces white/brown edges; set transparent / zero where unintended.
- Verify with a quick Playwright pass on a handful of project pages.

## 7. Immersive header on project detail pages
- New tiny hook `src/hooks/useImmersiveHeader.ts`: hidden at top of page until cursor enters top ~80px band; once `scrollY > 80`, hand back to the existing sticky behaviour.
- In `src/components/home/Header.tsx`, accept a `mode?: "immersive"` prop that toggles a CSS class (`is-hidden` / `is-revealed`) driving translateY/opacity. No visual redesign — same markup, same animations.
- In `src/routes/project.$slug.tsx`, render `<Header mode="immersive" />` instead of the default (the root layout's default header is hidden on this route).

## 8. Awards page CTA
At the bottom of `src/routes/awards.tsx`, add a CTA block using the existing `idlx-cta` / `idlx-cta-link` pattern, linking to `/media-recognition` with copy like "Continue exploring recognitions through media coverage →".

## 9. Merge Industrial → Commercial
- In `src/data/projects.ts`, change every `sector: "Industrial"` to `sector: "Commercial"`; drop `"Industrial"` from the `Project["sector"]` union.
- In `src/routes/projects.$category.tsx`, remove the Industrial chip and its `sectorContent` entry.

## Verification (before done)
- All Residential projects appear in the exact order above with the specified orientations.
- No duplicate gallery images except the two flagged hero repeats.
- No stray white/brown borders.
- Cover cards keep building tops visible.
- Header is hidden on project detail load, reveals on top-edge hover, sticks on scroll.

## Technical notes
Files touched:
- `src/data/projects.ts` (data: order, orientation, focal points, sector merge, fit, keepHeroInGallery, dedupe)
- `src/routes/projects.$category.tsx` (grid orientation handling, remove Industrial chip)
- `src/routes/project.$slug.tsx` (header mode, gallery dedupe flag)
- `src/routes/awards.tsx` (CTA)
- `src/components/home/Header.tsx` (`mode` prop)
- `src/hooks/useImmersiveHeader.ts` (new, small)
- `src/styles.css` (border/background cleanup, immersive header transitions)

No new dependencies. No component redesigns.
