## Goal

Fix sitewide lag (desktop + mobile) and do a proper mobile pass across every section — not just the ones called out. Keep the existing design language; this is performance + responsiveness work, not a redesign.

## Sitewide performance — what's slowing the whole site down

1. **Lenis smooth-scroll on every page.** Runs a RAF loop forever, intercepts wheel + touch, and compounds with framer-motion scroll listeners. Heavy even on desktop.
2. **CustomCursor RAF loop runs always**, including on mobile where it's invisible. Listens on every mousemove, writes `transform` 60×/s.
3. **SketchPhilosophy scroll handler** does `getBoundingClientRect` + builds a 50-point SVG polygon with sin/cos every scroll frame, and sets multiple inline styles. Easily the most expensive scroll listener on the home page.
4. **Hero ken-burns** uses `will-change: transform` permanently — forces a huge GPU layer on the LCP image for the entire session.
5. **Lots of `cursor: none` rules** force the browser to manage a hidden cursor across the whole tree; combined with `data-hover` listeners this thrashes on hover.
6. **`backdrop-blur` over moving content** in the header / overlays causes per-frame re-sampling. (Known cause of jank.)
7. **Reveal/MaskText components** likely attach IntersectionObservers per element; harmless individually, but many of them on a long page add up.

## Sitewide perf fixes (apply on all pages, desktop + mobile)

- **Throttle Lenis sensibly and disable it on touch devices.**
  - Desktop: keep Lenis but with `smoothTouch: false`, `wheelMultiplier: 1`, `lerp: 0.1`, and stop the RAF when the tab is hidden (`visibilitychange`).
  - Touch / coarse pointer / ≤768px: do not instantiate Lenis at all — render children only, use native scroll.
- **CustomCursor: skip on touch/coarse-pointer and respect `prefers-reduced-motion`.** Early-return — no DOM, no listeners, no RAF.
- **Rewrite SketchPhilosophy's scroll loop:**
  - Replace per-frame `getBoundingClientRect` with a single `IntersectionObserver` + a lightweight `scroll` handler that only runs while the section is in view.
  - Reduce polygon points from 49 → ~16, cache the points array, only `setAttribute` when the value actually changes.
  - Wrap the section in `content-visibility: auto` so it's skipped entirely when off-screen.
  - On mobile, replace the whole scroll-driven thing with a static stacked layout (see below).
- **Hero image:** drop `will-change: transform` after the ken-burns animation ends (use `animation-fill-mode: forwards` + remove the hint on `animationend`), and add `fetchpriority="high"` + `decoding="async"`.
- **Remove global `cursor: none`** from large containers; apply it only to the body on desktop. Keep `data-hover` styling but stop forcing custom cursor management on every element.
- **Replace any `backdrop-blur`** sitting over animated content (hero overlay, sticky header on scroll) with a solid/semi-opaque background or a `text-shadow` for legibility.
- **Add `loading="lazy"` + `decoding="async"`** to every non-LCP image (projects grid, recognition, awards thumbnails, footer).
- **Honor `prefers-reduced-motion: reduce`** across hero ken-burns, Reveal, MaskText, and SketchPhilosophy — render the final state, no animation.

## Mobile audit (every section, not just the ones mentioned)

I'll walk the site at 375px and 414px widths and fix what's broken. Anticipated issues based on the code already reviewed:

- **Header / nav** — keep the hamburger always visible (already requested earlier), verify drawer height on small phones, tap targets ≥44px, fix any z-index conflict now that the cursor is gone.
- **Hero** — tighten side paddings to `clamp(20px, 5vw, 40px)`, prevent headline/sub/scroll-indicator from stacking on top of each other on 360px screens.
- **SketchPhilosophy** — replace the 1200×220 SVG + sticky stage with a static stacked layout: eyebrow → philosophy lines → short rule → skyline image. No scroll math.
- **FeaturedWorks** — single column at ≤900px (already there); verify `wide` cards don't crop the subject, "View Project →" label sits inside the card.
- **Verticals** — likely overflows horizontally on small phones; collapse to a single-column list, reduce type scale.
- **Recognition / Clients** — wrap into 2-column logo strips on small phones, ensure logos don't clip.
- **Footer** — stack columns, increase line-height, ensure links are tappable.
- **Projects index + category pages** — verify filter chips wrap, project cards stack, no horizontal scroll.
- **Project detail (`/project/$slug`)** — hero image, gallery, metadata block all need a mobile pass; ensure the lightbox prev/next/close are thumb-sized.
- **Awards** — buttons in the new lightbox ≥44px, image stacks cleanly under text, no card frame regressions.
- **Media & Recognition** — check the slideshow controls and the article body width.
- **Studio (about / history / team)** — stack the team grid (1 column under 600px is already in place), audit history timeline for overflow.
- **Practice (history / journal / process)** — long-form pages: tighten line-length, reduce side padding, ensure imagery isn't cropped weirdly.
- **Contact** — form fields full-width, Instagram embed stacks left as previously fixed.
- **Global** — audit every `padding: 0 40px` style and replace with `clamp(20px, 5vw, 40px)` to kill horizontal overflow at 360px.

## Out of scope

- No visual redesign. No changes to brand, palette, typography, or section structure.
- No changes to backend/data.

## Verification

- Walk every route on desktop and on a 375px mobile viewport.
- DevTools Performance: confirm idle CPU drops (no more constant Lenis + cursor RAFs on mobile; reduced scripting time on desktop).
- Confirm no horizontal scroll on any page at 360px.
- Confirm no console errors and that all interactive elements (menu, lightbox, project links) work.

## Technical notes

- Touch detection helper (reused): `(window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768)`.
- Reduced-motion helper: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- `SmoothScroll` and `CustomCursor` become no-op wrappers on touch.
- `SketchPhilosophy` gets two code paths: existing desktop animation (optimized) + new static mobile layout.
- Mobile CSS rules added to existing `@media` blocks in `src/styles.css` — no new files, no token changes.
