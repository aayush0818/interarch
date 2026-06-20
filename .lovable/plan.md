## Scope

Two deliverables, no redesign and no desktop changes.

1. End-to-end mobile polish across every route and shared component.
2. Replace the placeholder 6-image grid on the Contact page with the official Elfsight Instagram feed for @interarchdesignlabs, and surface a clear LinkedIn link alongside it.

---

## 1. Mobile Optimization Pass

Approach: changes are made in `src/styles.css` (where the bulk of the layout lives via custom CSS classes) plus targeted inline-style fixes in the route/component files. Desktop breakpoints (≥ 901px) are not touched. All work happens inside existing `@media (max-width: 900px)` / `(max-width: 600px)` / `(max-width: 480px)` blocks, extended as needed.

### Per-page review checklist
Each of the following gets a hands-on review at 360, 390, 414, 768 widths via Playwright screenshots before/after:

- Homepage — Hero, HoverImageNav, FeaturedWorks, Verticals, SketchPhilosophy, Recognition, Clients marquee
- Projects index (`/projects`) + category pages (`/projects/architecture`, `/projects/interior`)
- Project detail (`/project/$slug`) — hero, image pairs, gallery, meta block
- Studio (`/studio`, `/studio/about`, `/studio/team`, `/studio/history`)
- Practice routes (history, process, journal index + slug)
- Awards (`/awards`)
- Media & Recognition index + slug
- Contact
- Header / mobile nav drawer
- Footer

### Issue categories the pass targets
- **Typography**: clamp() hero/heading sizes so nothing overflows ≤ 360px; add `overflow-wrap: anywhere` / `hyphens: auto` to long words (project names, addresses); cap line-length with `max-width` in rem.
- **Layout**: collapse multi-column grids to single column at ≤ 600px where they currently squeeze; tighten section vertical padding on mobile (reduce from desktop `clamp` floors); ensure `padding-inline` uses safe gutters (min 20px).
- **Images**: remove fixed `aspect-ratio` overrides that crop on narrow screens for `idlx-mono-*`, project hero, gallery pairs; switch to `height: auto` on mobile while keeping desktop ratios.
- **Navigation**: verify Header mobile drawer covers full viewport, scroll locks body, all links route, close on route change; tap targets ≥ 44px.
- **Interactive**: button/anchor min-height 44px; form inputs full-width with 16px font (prevents iOS zoom); marquee speed/gap retuned for narrow screens; Google Map iframe keeps `aspect-ratio: 4/3` but switches to `3/4` ≤ 480px so it isn't a thin strip.
- **Galleries / sliders**: confirm touch scrolling, snap points, and no horizontal page overflow (`overflow-x: hidden` on `body` as a safety net only after individual fixes).
- **Footer**: stack columns, keep social links tappable.

### Verification
Playwright runs at 360×780, 390×844, 414×896, 768×1024 capturing each route. Each screenshot is reviewed for overflow, cropping, tap-target, and spacing regressions. No desktop screenshots change.

---

## 2. Instagram Feed (Contact page)

Replace the placeholder 3×2 grid (lines 138–162 of `src/routes/contact.tsx`) with the Elfsight widget.

- Load the Elfsight platform script once via a `<script>` tag added in `src/routes/__root.tsx` head (async). Avoid double-loading on client navigation.
- Render the widget container: `<div className="elfsight-app-41b2e8ed-d5a5-4d65-9789-65526979679e" data-elfsight-app-lazy />` inside a styled wrapper that matches the site's section rhythm (same `<Reveal>` block, same `h3`, same spacing tokens).
- Section copy updated to: heading "Instagram", lead "Follow our latest projects, publications, studio updates, and architectural insights.", followed by the widget, then explicit Instagram + LinkedIn links.
- Wrapper styling: `min-height` reserved to prevent layout jump while widget loads; border + padding consistent with surrounding panels; mobile padding tightened so widget cards aren't cramped.
- The existing "Follow" block (lines 113–119) keeps both Instagram and LinkedIn anchors; nothing else on the page changes.

### Verification
- Playwright loads `/contact`, waits for the Elfsight container to mount, screenshots desktop + 390px mobile.
- Confirm clicking through opens real Instagram posts (Elfsight default behaviour).
- Confirm LinkedIn anchor opens `https://www.linkedin.com/company/interarch-design-lab/` in a new tab.
- Confirm Google Map still renders and "Open in Google Maps" link works.

---

## Technical notes

- Files expected to change:
  - `src/styles.css` — extended `@media` blocks for mobile fixes (no desktop rule changes).
  - `src/routes/__root.tsx` — add Elfsight `<script src="https://elfsightcdn.com/platform.js" async />` in head.
  - `src/routes/contact.tsx` — swap placeholder grid for Elfsight container, refine copy, keep LinkedIn link.
  - Minor inline-style tweaks in: `src/routes/project.$slug.tsx`, `src/routes/projects.$category.tsx`, `src/routes/studio.*`, `src/routes/awards.tsx`, `src/routes/media-recognition*.tsx`, `src/components/home/{Header,Footer,Hero,FeaturedWorks,Verticals,SketchPhilosophy,Recognition,Clients}.tsx` — only where a CSS-only fix is insufficient.
- No new dependencies. No data/schema changes. No edits to desktop styles.
- No changes to animations, copy (outside the Instagram section), routing, or visual identity.

---

## Out of scope
- Redesigning any section.
- Replacing the Elfsight widget with a custom Instagram Graph API integration.
- Adding new pages or restructuring IA.
- Desktop layout adjustments.
