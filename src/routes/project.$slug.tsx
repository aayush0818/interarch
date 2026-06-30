import type React from "react";
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { ProjectImage } from "@/components/project/ProjectImage";
import { Reveal, ClipReveal } from "@/components/motion/Reveal";
import { projectImageMasks, projects } from "@/data/projects";

export const Route = createFileRoute("/project/$slug")({
  head: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    const project = p ?? projects[0];
    return {
      meta: [
        { title: `${project.name} - Interarch Design Labs` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.name} - IDL` },
        { property: "og:description", content: project.description },
        ...(project.cover ? [{ property: "og:image", content: project.cover }] : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.description,
            creator: {
              "@type": "Organization",
              name: "Interarch Design Labs",
            },
            locationCreated: project.location,
            ...(project.year ? { dateCreated: project.year } : {}),
            image: project.cover,
            url: `/project/${project.slug}`,
          }),
        },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const current = projects.find((p) => p.slug === slug) ?? projects[0];
  const siblings = projects.filter((p) => p.category === current.category);
  const idx = Math.max(0, siblings.findIndex((p) => p.slug === current.slug));
  const project = current;
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  // De-duplication: every image appears at most once on the page.
  // - Drop the hero from the gallery (it is already shown at the top).
  // - Collapse any repeats inside the gallery itself.
  // - If removing the hero would empty the gallery, keep one copy at the end.
  const rawGallery = project.gallery.length ? project.gallery : [project.cover];
  const heroUrl = project.cover;
  const gallery = (() => {
    const seen = new Set<string>();
    const unique = rawGallery.filter((u) => (seen.has(u) ? false : (seen.add(u), true)));
    const withoutHero = unique.filter((u) => u !== heroUrl);
    return withoutHero.length ? withoutHero : unique;
  })();
  const at = (i: number) => gallery[i % gallery.length];

  return (
    <>
      <CustomCursor />
      <Header />
      <article className={`idlx-page${project.imageFit === "contain" ? " idlx-fit-contain" : ""}`}>
        <CinematicHero
          image={project.cover}
          alt={project.name}
          mask={projectImageMasks[project.cover]}
          eyebrow={[project.sector, project.location].filter(Boolean).join(" · ") ? `${[project.sector, project.location].filter(Boolean).join(" · ")}` : ""}
          title={project.name}
          meta={[project.year, project.area].filter(Boolean).join(" · ")}
        />

        {/* Meta row */}
        {(project.location || project.sector || project.scope || project.area || project.year) && (
          <section className="idlx-mono-meta">
            {project.location && <Reveal><div><span>Location</span><strong>{project.location}</strong></div></Reveal>}
            {project.sector && <Reveal delay={0.05}><div><span>Sector</span><strong>{project.sector}</strong></div></Reveal>}
            {project.scope && <Reveal delay={0.1}><div><span>Scope</span><strong>{project.scope}</strong></div></Reveal>}
            {project.area && <Reveal delay={0.15}><div><span>Area</span><strong>{project.area}</strong></div></Reveal>}
            {project.year && <Reveal delay={0.2}><div><span>Year</span><strong>{project.year}</strong></div></Reveal>}
          </section>
        )}

        {/* Essay */}
        {project.description && (
          <section className="idlx-mono-essay">
            <Reveal>
              <p>{project.description}</p>
            </Reveal>
          </section>
        )}

        {/* Featured showcase */}
        {project.showcase && (
          <section className="idlx-showcase">
            <ClipReveal>
              <div className="idlx-showcase-media">
                <img
                  src={project.showcase}
                  alt={`${project.name} — featured showcase`}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </ClipReveal>
          </section>
        )}

        {/* Photo essay - facilities (when defined) or default gallery rhythm. */}
        {project.facilities && project.facilities.length > 0 ? (
          <section className="idlx-mono-photo idlx-facilities">
            {project.facilities.map((f, fi) => (
              <div key={f.name} className="idlx-facility">
                <Reveal>
                  <header className="idlx-facility-head">
                    <span className="idlx-facility-index">Facility · {String(fi + 1).padStart(2, "0")}</span>
                    <h2 className="idlx-facility-name">{f.name}</h2>
                    <p className="idlx-facility-desc">{f.description}</p>
                  </header>
                </Reveal>
                {f.images && f.images.length > 0 && (
                  <div className="idlx-facility-media">
                    {f.images.map((src, ii) => {
                      const isFull = ii % 3 === 0;
                      return (
                        <ClipReveal key={ii} delay={(ii % 3) * 0.05}>
                          <div className={`idlx-mono-fig${isFull ? " idlx-mono-fig--full" : ""}`}>
                            <ProjectImage src={src} alt={`${f.name} - ${String(ii + 1).padStart(2, "0")}`} mask={projectImageMasks[src]} loading="lazy" decoding="async" />
                          </div>
                        </ClipReveal>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </section>
        ) : (
          <section className="idlx-mono-photo">
            <SmartGallery gallery={gallery} fullBleed={project.fullBleed} projectName={project.name} />
          </section>
        )}


        {/* Pager */}
        <nav className="idlx-pager">
          <Link to="/project/$slug" params={{ slug: prev.slug }} data-hover>
            <span>← Previous</span>
            <strong>{prev.name}</strong>
          </Link>
          <Link to="/project/$slug" params={{ slug: next.slug }} data-hover>
            <span>Next →</span>
            <strong>{next.name}</strong>
          </Link>
        </nav>
      </article>
      <Footer />
    </>
  );
}

function SmartGallery({ gallery, fullBleed, projectName }: { gallery: string[]; fullBleed?: string[]; projectName: string }) {
  const fullBleedSet = new Set(fullBleed ?? []);
  const [ratios, setRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    const unique = Array.from(new Set(gallery));
    unique.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: img.naturalWidth / img.naturalHeight }));
      };
      img.onerror = () => {
        if (cancelled) return;
        setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: 1.5 }));
      };
      img.src = src;
    });
    return () => { cancelled = true; };
  }, [gallery]);

  // Orientation buckets: portrait (<0.92), landscape (>1.12), square otherwise.
  const orient = (src: string): "p" | "l" | "s" | "u" => {
    const r = ratios[src];
    if (r === undefined) return "u";
    if (r < 0.92) return "p";
    if (r > 1.12) return "l";
    return "s";
  };

  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let landscapeSoloStreak = 0;
  let pairsSoFar = 0;
  let solosSoFar = 0;
  while (i < gallery.length) {
    const src = gallery[i];
    const forceFull = fullBleedSet.has(src);
    const o = orient(src);

    // Forced full bleed always wins.
    if (forceFull) {
      blocks.push(
        <ClipReveal key={key++}>
          <div className="idlx-mono-fig idlx-mono-fig--full">
            <ProjectImage src={src} alt={`${projectName} - ${String(i + 1).padStart(2, "0")}`} mask={projectImageMasks[src]} loading="eager" decoding="async" />
          </div>
        </ClipReveal>
      );
      i += 1;
      solosSoFar += 1;
      landscapeSoloStreak += 1;
      continue;
    }

    const next = gallery[i + 1];
    const nextOk = next && !fullBleedSet.has(next);
    const nextO = next ? orient(next) : "u";

    // Editorial rhythm: favor standalone full-bleed for landscapes/squares
    // (target ~50-60% standalone) and only group images when it clearly helps.
    // Rules:
    //   - Portraits always pair with portraits (a solo portrait wastes space).
    //   - Landscapes/squares default to standalone full-bleed, with an
    //     occasional paired grouping when 3+ landscape solos have appeared
    //     in a row, to break up monotony.
    const portraitPair = o === "p" && nextOk && nextO === "p";
    const landscapeGrouping =
      o !== "p" && o !== "u" && nextOk && nextO !== "p" && nextO !== "u" &&
      landscapeSoloStreak >= 3;

    if (portraitPair || landscapeGrouping) {
      blocks.push(
        <div className={`idlx-mono-pair${o === "p" ? " idlx-mono-pair--keep" : ""}`} key={key++}>
          <ClipReveal>
            <div className="idlx-mono-fig"><ProjectImage src={src} alt={`${projectName}`} mask={projectImageMasks[src]} loading="eager" decoding="async" /></div>
          </ClipReveal>
          <ClipReveal delay={0.1}>
            <div className="idlx-mono-fig"><ProjectImage src={next} alt={`${projectName}`} mask={projectImageMasks[next]} loading="eager" decoding="async" /></div>
          </ClipReveal>
        </div>
      );
      i += 2;
      pairsSoFar += 1;
      landscapeSoloStreak = 0;
      continue;
    }

    if (o !== "p") {
      blocks.push(
        <ClipReveal key={key++}>
          <div className="idlx-mono-fig idlx-mono-fig--full">
            <ProjectImage src={src} alt={`${projectName} - ${String(i + 1).padStart(2, "0")}`} mask={projectImageMasks[src]} loading="eager" decoding="async" />
          </div>
        </ClipReveal>
      );
      solosSoFar += 1;
      landscapeSoloStreak += 1;
    } else {
      blocks.push(
        <ClipReveal key={key++}>
          <div className="idlx-mono-fig idlx-mono-fig--inset">
            <ProjectImage src={src} alt={`${projectName}`} mask={projectImageMasks[src]} loading="eager" decoding="async" />
          </div>
        </ClipReveal>
      );
      solosSoFar += 1;
      landscapeSoloStreak = 0;
    }
    i += 1;
  }
  void solosSoFar; void pairsSoFar;

  return <>{blocks}</>;
}
