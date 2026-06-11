## Plan

### 1. Team page — fix name/photo pairing
In `src/data/siteContent.ts` (top of file), keep the partner array order/names as-is but reassign the image references so each name shows the correct portrait:
- Murtaza → use `team.hussain` (file that actually contains Murtaza's face)
- Hussain → use `team.rohit` (file that actually contains Hussain's face)
- Rohit → use `team.murtaza` (file that actually contains Rohit's face)
- Dipak stays unchanged.

(Files aren't renamed — only the partner→image mapping is corrected.)

### 2. Rollback homepage Verticals + Selected Works
Only the homepage hero should keep the newly uploaded mansion image. Revert the two sections to their pre-upload imagery (no use of the new residential photos: pastel / exterior / stair / doubleheight / atrium).

**`src/components/home/Verticals.tsx`** — restore mapping to:
- Residential → `res.gallery`
- Commercial → `com.lounge`
- Institutional → `inst.aerial`
- Hospitality → `com.boutiquePanorama`
- Industrial → `inst.tower`
- Workplace → `com.boardroom`

**`src/components/home/FeaturedWorks.tsx`** — restore the prior mixed institutional/residential(old)/commercial grid:
- inst.aerial (wide), res.gallery (tall), com.lounge (tall), inst.pool (tall), res.warm (tall), com.boutiquePanorama (wide).

The newly uploaded residential images remain available on the Residential expertise page and project pages (where they were also added) — only the homepage sections roll back.

### 3. Menu hover images → architectural sketches
The header mega-menu and the bottom hover-image nav currently show real project photos on hover. Replace them with hand-drawn architectural line sketches (black ink on warm cream paper, loose perspective drawings of buildings/interiors — same quiet aesthetic as the existing manifesto skyline drawing).

- Generate 5 sketch images saved to `src/assets/` (e.g. `sketch-projects.png`, `sketch-expertise.png`, `sketch-studio.png`, `sketch-news.png`, `sketch-contact.png`) — premium model, warm-paper background, sepia/charcoal line work, no color photos.
- Add a `sketches` group to `src/data/realImages.ts` so they're centrally referenced.
- Update `src/components/home/Header.tsx` (NAV array) and `src/components/home/HoverImageNav.tsx` to use these sketches instead of the photo references.

### 4. Site-wide: black text → warm brown
Currently `--idlx-ink: #1a1614` (near-black) drives almost all body/heading text via `.idlx-body`, `.idlx-lead`, headings and most components. Shift the ink token to a soft dark brown so every text surface picks it up automatically.

- `src/styles.css`: change `--idlx-ink` from `#1a1614` to a warm dark brown around `#3a2a1f` (deep espresso brown, still high-contrast on the cream background but visibly brown, not black). Adjust the shadcn `--foreground` / `--primary` / `--card-foreground` / `--popover-foreground` / `--secondary-foreground` tokens (currently `oklch(0.27 0.03 40)`) to match — e.g. `oklch(0.28 0.05 50)` — so shadcn-based components (buttons, inputs, contact form labels) also pick up the brown.
- Spot-check Header/Footer/Hero/forms after the change; replace any hard-coded `#000` / `text-black` / `oklch(... 0)` neutrals with the token so nothing remains literally black.

### Out of scope
- No other layout or content changes.
- No edits to project pages, expertise pages, history, about, contact, or footer beyond what the brown-ink token recolours automatically.
- File names of team portraits stay the same (only mappings change).