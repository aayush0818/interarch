# Interarch Design Labs

Portfolio website for an architecture and interior design studio, spanning residential, commercial, hospitality, and institutional work.

**Live site:** https://interarchdesignlabs.com

## What this is

The project started from a generated TanStack Start scaffold to move fast on routing and base infrastructure. From there, I built out the interaction design, content architecture, and visual system: the discipline/sector navigation, the project archive and its data model, page transitions, and the overall editorial direction of the site.

## What I built

- **Discipline/sector navigation (`Verticals`)** — the homepage switcher between Architecture and Interiors, and their sub-sectors (residential, commercial, hospitality, institutional). Handles touch and hover differently so mobile doesn't fight desktop hover states (first tap reveals a sector's detail, second tap navigates), preloads imagery for the inactive tabs so switching feels instant, and supports per-image focal points so each project photo crops correctly across breakpoints.
- **Project archive & data model** — a structured content system (`src/data/projects.ts`) covering dozens of projects across sectors, each with its own image set, category tags, and listing/detail variants, feeding into filterable category and sector pages.
- **Routing & page structure** — route tree covering home, project archive (by category/sector), individual project pages, studio/about, directors, practice/journal, awards, and media recognition — built with TanStack Router.
- **Motion & transitions** — custom components (`CinematicHero`, `MaskText`, `Reveal`, `Marquee`) for scroll-triggered reveals and text animations, plus a smooth-scroll layer, tuned to feel restrained rather than showy.
- **Content & copy** — the language and structure across the site (taglines, sector descriptions, studio narrative) written to match a minimal, premium tone.

## Tech stack

React 19 · TypeScript (strict) · TanStack Start & Router · Tailwind CSS 4 · Framer Motion · Vite

## Notes

TypeScript strict mode, zero type errors. Deployed via Cloudflare/Vercel adapters with per-route SSR code-splitting.
