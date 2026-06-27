import type React from "react";
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal, ClipReveal } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/project/$slug")({
  head: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${p?.name ?? "Project"} - Interarch Design Labs` },
        { name: "description", content: p?.description ?? "Project case study by IDL." },
        { property: "og:title", content: `${p?.name ?? "Project"} - IDL` },
        { property: "og:description", content: p?.description ?? "" },
        ...(p?.cover ? [{ property: "og:image", content: p.cover }] : []),
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
  // Hero de-duplication:
  // - Galleries > 5 images: hero is already shown above; remove every duplicate from the gallery.
  // - Galleries <= 5 images: a repeat is acceptable, but never immediately after the hero —
  //   move the duplicate to the end of the sequence.
  const rawGallery = project.gallery.length ? project.gallery : [project.cover];
  const heroUrl = project.cover;
  const gallery = (() => {
    if (rawGallery.length > 5) {
      const filtered = rawGallery.filter((u) => u !== heroUrl);
      return filtered.length ? filtered : rawGallery;
    }
    if (!rawGallery.includes(heroUrl)) return rawGallery;
    const withoutHero = rawGallery.filter((u) => u !== heroUrl);
    return [...withoutHero, heroUrl];
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
                            <img src={src} alt={`${f.name} - ${String(ii + 1).padStart(2, "0")}`} loading="lazy" decoding="async" />
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
  while (i < gallery.length) {
    const src = gallery[i];
    const forceFull = fullBleedSet.has(src);
    const o = orient(src);

    // Forced full bleed always wins.
    if (forceFull) {
      blocks.push(
        <ClipReveal key={key++}>
          <div className="idlx-mono-fig idlx-mono-fig--full">
            <img src={src} alt={`${projectName} - ${String(i + 1).padStart(2, "0")}`} loading="eager" decoding="async" />
          </div>
        </ClipReveal>
      );
      i += 1;
      continue;
    }

    // Pair when current and next share the same orientation (portrait or landscape),
    // and neither is forced full bleed. Squares are paired with squares too.
    const next = gallery[i + 1];
    const nextOk = next && !fullBleedSet.has(next);
    const nextO = next ? orient(next) : "u";
    const canPair = o !== "u" && nextOk && nextO === o;

    if (canPair) {
      blocks.push(
        <div className={`idlx-mono-pair${o === "p" ? " idlx-mono-pair--keep" : ""}`} key={key++}>
          <ClipReveal>
            <div className="idlx-mono-fig"><img src={src} alt={`${projectName}`} loading="eager" decoding="async" /></div>
          </ClipReveal>
          <ClipReveal delay={0.1}>
            <div className="idlx-mono-fig"><img src={next} alt={`${projectName}`} loading="eager" decoding="async" /></div>
          </ClipReveal>
        </div>
      );
      i += 2;
      continue;
    }

    // Solo image: landscapes/squares go full bleed; portraits/unknown go inset to avoid huge crops.
    if (o === "l" || o === "s") {
      blocks.push(
        <ClipReveal key={key++}>
          <div className="idlx-mono-fig idlx-mono-fig--full">
            <img src={src} alt={`${projectName} - ${String(i + 1).padStart(2, "0")}`} loading="eager" decoding="async" />
          </div>
        </ClipReveal>
      );
    } else {
      blocks.push(
        <ClipReveal key={key++}>
          <div className="idlx-mono-fig idlx-mono-fig--inset">
            <img src={src} alt={`${projectName}`} loading="eager" decoding="async" />
          </div>
        </ClipReveal>
      );
    }
    i += 1;
  }

  return <>{blocks}</>;
}
