## 1. Header — hide social icons when scrolled

In `src/components/home/Header.tsx`, the right-side `HeaderSocials` renders in every state. The header already toggles `is-scrolled` and `is-menu` classes on scroll/menu open.

- In `src/styles.css`, hide `.idl-header.is-scrolled .idl-header-socials` and `.idl-header.is-menu .idl-header-socials` (display: none).
- Keep the socials inside the mega menu footer untouched.
- No JS changes needed — purely CSS, preserving current animation/behavior.

## 2. Project cover images — smarter cropping

In `src/components/home/FeaturedWorks.tsx` the covers use `object-fill` (which stretches!). Other cover surfaces (Projects index, category grid) likely use `object-cover` with default center focus.

- Replace `object-fill` with `object-cover` so images aren't distorted.
- Add per-project `coverFocus` field (e.g. `"50% 30%"`) in `src/data/projects.ts`, defaulting to `"50% 50%"`, and apply via inline `style={{ objectPosition }}` on every cover img (FeaturedWorks, projects list, category list, related projects).
- Review each of the ~20+ project covers and set a sensible focal point per image (sky-heavy aerials → bias down, vertical facades → bias up, etc.). Where a cover crops out an important element, swap to a better-suited gallery image as the cover.
- Add a subtle width/aspect tuning: keep current grid spans, but ensure the underlying `<img>` uses `object-cover` + `object-position` only — no aspect-ratio changes, no layout redesign.

## 3. Philosophy section — smoother entry

In `src/components/home/SketchPhilosophy.tsx` the section currently starts blank because the sketch SVG draws in from zero against an empty background.

- Add a soft visible intro layer: a faint eyebrow label ("Philosophy" / section number) and a short opening line of text that fades in at section entry, so the viewport is never blank.
- Pre-render a very low-opacity (~8–12%) static version of the final sketch underneath the animated stroke so there's always a faint silhouette before the draw-in begins.
- Trigger the sketch animation slightly earlier (IntersectionObserver threshold lowered, or `rootMargin: "0px 0px -10% 0px"`) so it starts before the section is fully in view.
- Keep the existing draw-on animation concept, easing, and durations unchanged.

## Out of scope
No redesign of header, project pages, or Philosophy layout. No changes to navigation behavior, image aspect ratios, or animation concept.