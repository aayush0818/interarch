## Goal

Reorder the `gallery` arrays of the 25 Residential projects in `src/data/projects.ts` based on what each image actually shows (exterior, arrival, living, dining, kitchen, bedroom, etc.), not filenames.

## Feasibility

Yes - I can visually inspect each uploaded image via the image inspection tool (one image per call). I do not have a bulk vision API, so this runs as a sequential sweep across all residential images.

Approximate scope: 25 projects × ~5-10 images each ≈ 150-220 image inspections. This is doable in a single build run but consumes meaningful credits and time. I want your sign-off on scope before spending them.

## Categorisation rubric

Architecture / Residential sequence:
1. Master plan / site plan (drawings, top-down)
2. Exterior - hero / front elevation
3. Exterior - other angles, side, rear, night
4. Entry / arrival / porch
5. Living
6. Dining
7. Kitchen
8. Other shared interiors (study, family, stair, courtyard)
9. Feature spaces (pool, terrace, garden, water body)
10. Bedrooms
11. Bathrooms / dressing
12. Anything remaining

Interiors / Residential sequence:
1. Living
2. Main shared space (lounge / family)
3. Dining
4. Kitchen
5. Feature spaces (bar, library, art wall, courtyard)
6. Other shared interiors
7. Bedrooms
8. Bathrooms / dressing
9. Anything remaining

Rules:
- Where an image is genuinely ambiguous (abstract detail shot, unclear room), it keeps its current relative position.
- Drawings always lead the sequence in Architecture projects; never appear in Interiors projects.
- Filenames are ignored; only the gallery `string[]` order changes.
- No image is removed, renamed, or re-uploaded.

## Execution plan

1. Enumerate the 25 Residential projects and their gallery arrays from `src/data/projects.ts`.
2. For each project, inspect every image in its gallery via the image tool, tag it with a category, and build the reordered array.
3. Replace each `gallery: [...]` literal (or the named const that feeds it) with the reordered array. No other fields change.
4. Verify by re-reading `projects.ts` and spot-checking one architecture and one interiors project in the preview.

## Reporting back

When done, I will list:
- Each project and the before -> after order
- Any project where one or more images were ambiguous and left in place, so you can confirm or override

## Out of scope

- Non-residential projects (Commercial, Institutional, Hospitality, Industrial, Workplace) - untouched.
- Project copy, slugs, names, hero images, categories - untouched.
- Asset renames or re-uploads.

## One confirmation before I start

This sweep will run image-by-image across ~200 assets. Approve to proceed at full scope, or tell me to limit it (e.g. "only Architecture residential", "only the 5 flagship projects", or "start with Portico House and pause for review").
