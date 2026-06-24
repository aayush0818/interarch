# Project & Studio Refinements + Vercel Image Fix

Scope is presentation/data only. No layout redesigns, no IA changes.

## 1. Hero de-duplication across all projects (`src/data/projects.ts`)

Iterate every project entry and reshape its `gallery` array using `cover` as the reference (filename ignored — comparison is by image URL identity):

- **gallery.length ≤ 5 (including hero):** if `cover` appears in `gallery`, remove it from its current position and re-append near the end (last or second-to-last slot, chosen so it doesn't land directly adjacent to a visually similar neighbour). If `cover` is not in `gallery`, leave the gallery untouched.
- **gallery.length > 5:** strip every occurrence of `cover` from `gallery`. Hero shows once (via `CinematicHero`), gallery never repeats it.

Apply manually project-by-project so curated sequences (e.g. Pavilion Estate, Lantern Villa, Portico House, Panorama House, House of Layers, Linear Estate, Quest Ajay Seth, VIA Auditorium, MVVPL Hotel/Clubhouse) keep their intentional ordering. Re-read each `gallery` array; do not run a blind script.

## 2. Homepage Awards CTA copy (`src/components/home/Recognition.tsx`)

Change pill label `View archive` → `View Awards`. `href="/awards"` stays unchanged.

## 3. Studio cross-navigation CTAs

Each studio page's bottom CTA currently links to a single destination. Replace the single-link CTA with a two-link CTA block (same `idlx-cta` styling, two `idlx-cta-link` items side-by-side, keep the lead sentence above).

- **`src/routes/studio.about.tsx`** — CTAs: `Meet the Directors →` (`/studio/directors`), `Read our Legacy →` (`/studio/history`).
- **`src/routes/studio.directors.tsx`** — CTAs: `About the Studio →` (`/studio/about`), `Read our Legacy →` (`/studio/history`). Removes current single Contact CTA.
- **`src/routes/studio.history.tsx`** — CTAs: `About the Studio →` (`/studio/about`), `Meet the Directors →` (`/studio/directors`).

Lead copy stays in the spirit of each page (one short sentence). No new components.

## 4. About Us mobile hero readability (`src/components/motion/CinematicHero.tsx` + `src/styles.css`)

Mobile-only refinement. Add a media query (≤640px) for the hero used on `/studio/about`:

- Strengthen the existing gradient overlay opacity on small screens so headline/eyebrow stay legible over the image.
- Reduce hero title `font-size` clamp floor on mobile, tighten line-height, and add horizontal padding so multi-line headlines don't kiss the edges.
- Add `text-wrap: balance` and a small text-shadow as fallback for very bright crops.
- Verify no change above 640px (desktop untouched).

If `CinematicHero` is reused by other hero pages, scope rules to `.idlx-hero` mobile breakpoint globally — the readability improvement is acceptable across all heroes per the request's spirit, but no structural change.

## 5. Mobile image cropping in project galleries (`src/styles.css`)

Today `.idlx-mono-fig img` uses `object-fit: cover` inside fixed-aspect containers, which crops architectural shots on narrow viewports. Mobile-only change (≤640px):

- For `.idlx-mono-fig`, `.idlx-mono-fig--full`, `.idlx-mono-fig--inset`, and `.idlx-facility-media .idlx-mono-fig` on mobile: relax `aspect-ratio` (let height be intrinsic) and switch `img` to `object-fit: contain` with `width: 100%; height: auto`. Background stays the page surface so letterboxing reads as intentional matting.
- Keep `.idlx-mono-pair` stacking unchanged; only the image fit behaviour changes.
- Desktop CSS untouched (rules wrapped in `@media (max-width: 640px)`).
- Hero (`CinematicHero`) keeps `cover` — only essay/gallery figures change.

## 6. Vercel image delivery (root cause + fix)

Symptom: MVPL and House of Layers tiles show broken images only on the Vercel deployment.

Investigation plan:
1. Read `vite.config.vercel.ts`, `vercel.json`, `api/index.mjs`, and the asset JSON files those projects import. The `vercel.json` rewrite already proxies `/__l5e/*` to the Lovable asset CDN, so suspect (a) catch-all `/(.*)` swallowing `/__l5e/*` due to ordering, (b) an asset import path with case mismatch between filesystem and `.asset.json` filename, or (c) a missing `.asset.json` for an image referenced by `houseOfLayersGallery` / MVVPL arrays.
2. Grep every `mvvpl*` and `hol*` / `houseOfLayers*` import; confirm each `.asset.json` exists with exact case and that `url` strings start with `/__l5e/assets-v1/...`.
3. Add an explicit Vercel rewrite ordering guard if needed (the `/__l5e/*` rule already precedes `/(.*)`, but verify Vercel evaluates in declared order; if not, switch to `routes` with `continue: true` or convert to `headers` + `rewrites` pair).
4. If a stray binary asset still lives in the repo (e.g. `quest-clubhouse-23.jpg.asset.json` at repo root rather than `src/assets/`) and is imported by relative path, move it under `src/assets/` so the Vite build includes the import graph correctly.

Fix:
- Repair any case-mismatched or missing imports surfaced in step 2.
- If the rewrite is the culprit, change `vercel.json` to use `routes` with explicit ordering, or scope the SSR catch-all to exclude `/__l5e/*` (`"source": "/((?!__l5e/).*)"`).
- Re-run `bunx tsc --noEmit` and confirm both project pages load all images locally before handing off.

## Verification

- TypeScript clean (`bunx tsc --noEmit`).
- Spot-check 4–5 project pages (mix of ≤5 and >5 image galleries) — hero appears once at top; gallery sequencing reads intentionally.
- Mobile preview (393px) on `/studio/about` hero and 2 project pages — text readable, full architectural images visible without aggressive crop.
- Local prod build (`vite build --config vite.config.vercel.ts`) → preview locally and confirm `/__l5e/...` URLs resolve.

## Out of scope

No new pages, no nav/IA changes, no layout restructuring, no copy changes beyond items 2 and 3, no desktop CSS edits.
