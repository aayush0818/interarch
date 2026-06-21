## Mobile Refinement Plan

All changes are **mobile-only** (`@media (max-width: 768px)` overrides in `src/styles.css` plus `useIsMobile()`-guarded JSX branches). Desktop CSS and desktop component trees stay untouched. Work ships in three phases — you review after each.

---

### Phase 1 — Foundations (highest visual impact)

**1.1 Mobile mega-menu — full-screen accordion with inline visuals**
- Rework `Header.tsx` mobile branch only. Each top-level item is an accordion row showing label + index; tap expands inline to reveal the section's sketch, blurb, and children links.
- Scrollable full-height sheet, generous vertical rhythm, sketches sized to ~70vw width, blurb in editorial body type.
- Footer (studio name + year) pinned at the bottom of the scroll.
- Personality preserved: same eyebrow, numbering, sketch assets, easing curves as desktop.

**1.2 Universal mobile hero system**
Single shared set of mobile hero rules applied across: Projects, Architecture/Interior categories, Awards, Media, Studio, Directors, Legacy, Contact, Individual Project pages.
- Tighter top padding (clears header without dead space), title clamp scaled down (~`clamp(2.25rem, 9vw, 3.25rem)`), single-line eyebrow with dot, lede capped at ~60ch.
- Hero imagery: full-bleed, fixed aspect (4:5 portrait for portrait pages, 3:2 for landscape), no parallax on mobile to stop layout jank.
- Consistent vertical rhythm token (`--m-hero-gap`) so every page hero feels part of one family.
- Projects diptych: stacks vertically with equal heights and a thin divider; labels reposition to bottom-left.

**1.3 Hover → tap-to-reveal**
- `Verticals.tsx`, `HoverImageNav.tsx`, `FeaturedWorks.tsx`, and the mega-menu image swap: on mobile, tap a row to swap the image + expand its copy; tap again or tap another row to switch. Active state persists (no hover dependency).
- Always show at least the headline + thumbnail so nothing is hidden before interaction.

---

### Phase 2 — Galleries + Internal pages

**2.1 Project detail galleries — "mostly single + occasional pair"**
- New mobile gallery system in `project.$slug.tsx`: default to single full-bleed images stacked with consistent gap (`--m-gallery-gap`).
- Mark specific image groups in project data as `pair: true` to render as a 2-up row (related shots only). All others stack.
- Uniform aspect handling: landscape images get 3:2, portrait get 4:5, panoramas stay native. Captions sit below with editorial spacing.

**2.2 Internal pages restructure (Studio, Directors, Legacy, About IDL, Contact)**
- Reorder modules for mobile reading order (intro → image → body → secondary modules), not desktop column compression.
- Directors: card grid → single column with portrait, name, role, then bio expandable.
- Legacy timeline: horizontal scroll → vertical stepped list with year markers.
- Contact: form fields full-width, info block above form (currently side-by-side compresses badly).

---

### Phase 3 — Animations + Final QA

**3.1 Mobile animation pass**
- Audit `Reveal`, `MaskText`, `SketchPhilosophy`, `CinematicHero`, `SmoothScroll` for mobile parity.
- Keep: text reveal, mask reveal, image fade-up, philosophy sketch build (already fixed).
- Drop on mobile: custom cursor, heavy parallax, smooth-scroll lerp (use native scroll for performance).
- Respect `prefers-reduced-motion`.

**3.2 Full mobile QA sweep**
Playwright walk at 390×844 across every route: hero, navigation, hover-replacements, galleries, animations, no clipped content, no horizontal scroll, no broken sticky.

---

### Technical notes

- All overrides land in `src/styles.css` under a single `/* === MOBILE REFINEMENT === */` block and in component files behind `const isMobile = useIsMobile()` branches — never touching desktop JSX paths.
- No new dependencies expected.
- `overflow-x: clip` rule (from last fix) stays; sticky sections remain functional.
- New CSS tokens added: `--m-hero-gap`, `--m-gallery-gap`, `--m-section-pad`.

---

### Deliverable order

1. Phase 1 ships in one implementation turn → you review on device.
2. Phase 2 ships next turn after your approval.
3. Phase 3 ships last with the Playwright QA report.