
## 1. Larger logo (header + footer)

- `src/styles.css` — bump `.idl-logo-mark` from `height: 60px` (and 46px scrolled) to roughly `height: 88px` / `72px scrolled`; mobile 64/52. Raise `max-width` to ~240px so it doesn't clip.
- `.idl-footer-logo` — increase from current size to ~120–140px tall for stronger footer presence.

## 2. Real, best-of-portfolio projects on the homepage

Replace the generic `realImages` thumbnails in `src/components/home/FeaturedWorks.tsx` with covers from specific named projects in `src/data/projects.ts` (so clicks deep-link to the right project page). The 6 picks (3 residential, 1 commercial, 1 hospitality, 1 industrial, plus 1 institutional to round out the grid → actually per your spec, drop institutional):

- **Residential** — Noir Residence, Emerald Reverie — A Classical Penthouse, Saffron & Stone — A Skyline Residence
- **Commercial** — Gold Cornet Boutique
- **Hospitality** — Energize Resort - Nashik
- **Industrial** — Pidilite R&D Centre — Taloja

Looked up by slug from `projects` and rendered with their real `cover` URLs in the existing wide/tall mosaic layout.

## 3. Sketch manifesto — remove white background

The manifesto skyline is a PNG with a white backdrop loaded via `<image href={skyline} …>` inside the SVG in `src/components/home/SketchPhilosophy.tsx`. Two-part fix:

- Add `style={{ mixBlendMode: "multiply" }}` to the `<image>` so the white drops out against the cream page background.
- As a belt-and-braces measure, set the section's CSS background to the page cream and ensure the SVG itself has no white fill.

(If multiply still looks off on darker sections, fallback: regenerate the asset as a transparent PNG via `imagegen` — flagging here, not doing unless needed.)

## 4. Six sectors, one canonical naming everywhere

Final list, in this order: **Residential, Commercial, Hospitality, Industrial, Institutional, Workplace.**

Files updated:

- `src/data/siteContent.ts` `sectors[]`:
  - Reorder to the new order.
  - Rename slug `commercial` display from "Commercial Interiors" → "Commercial".
  - Replace the `industrial` entry (currently labelled "Master Planning") with a real Industrial sector — name "Industrial", cover/gallery built from `meril-bld-5-6-*` and `pidilite-rd-taloja-*` assets, copy about R&D centres, factories, and process-led architecture.
  - Replace the `workplace` entry (currently labelled "Sustainability") with a real Workplace sector — name "Workplace", cover/gallery built from D CP Office Belapur + Monster + Body Goals office-style imagery, copy about workplace interiors balancing individuals and teams.
- `src/components/home/Verticals.tsx` — already mostly aligned; reorder items to the canonical order and swap the Industrial image (currently `inst.tower`) to a real industrial cover (`mb56_1`/`pidilite1`).
- `src/routes/expertise.$sector.tsx` — remove the stale `sectorMap` aliases; sector slugs now match `projects.ts` sector names 1:1.
- `src/data/siteContent.ts` `designApproach` / copy mentions of "Sustainability" and "Master Planning" as core verticals are removed from the sector list (kept in body copy where it reads as a principle, not a sector).

## 5. News → Journal restructure

Currently: `/news` (diptych) → `/news/journal` + `/news/awards`.
Target: top-level **Journal** with two subpages — **News** (articles where IDL is featured) and **Awards**.

Routes:

- Rename `src/routes/news.tsx` → `src/routes/journal.tsx` (`createFileRoute("/journal")`), update hero copy to "Journal", diptych links to `/journal/news` and `/journal/awards`.
- Rename `src/routes/news.awards.tsx` → `src/routes/journal.awards.tsx` (`/journal/awards`).
- Rename `src/routes/news.journal.tsx` → `src/routes/journal.news.tsx` (`/journal/news`); repurpose content from "essays/journal posts" to "press / articles featuring IDL". Pull from a new `pressMentions` array in `siteContent.ts` (title, publication, date, link, thumbnail).
- Rename `src/routes/news.journal.$slug.tsx` → `src/routes/journal.news.$slug.tsx`; keep the detail layout for press article pages (or convert to outbound links if articles live on external sites — will use outbound links by default).
- Update every internal link (`Header`, `Footer`, `HoverImageNav`, etc.) from `/news*` to `/journal*`.

## 6. Verify

After edits: visit `/`, `/expertise`, each `/expertise/<sector>`, `/journal`, `/journal/news`, `/journal/awards` in the preview, and confirm the build passes.

### Technical notes

- File renames done via `mv`; `routeTree.gen.ts` regenerates automatically.
- No data-layer changes to `projects.ts`; only the homepage selection function changes.
- Sector slug `industrial` and `workplace` keep the same URLs — only labels, images, and copy change — so no external links break.
