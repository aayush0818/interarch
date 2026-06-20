import type React from "react";
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
        { title: `${p?.name ?? "Project"} — Interarch Design Labs` },
        { name: "description", content: p?.description ?? "Project case study by IDL." },
        { property: "og:title", content: `${p?.name ?? "Project"} — IDL` },
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
  const gallery = project.gallery.length ? project.gallery : [project.cover];
  const at = (i: number) => gallery[i % gallery.length];

  return (
    <>
      <CustomCursor />
      <Header />
      <article className={`idlx-page${project.imageFit === "contain" ? " idlx-fit-contain" : ""}`}>
        <CinematicHero
          image={project.cover}
          alt={project.name}
          eyebrow={[project.sector, project.location].filter(Boolean).join(" · ") ? `— ${[project.sector, project.location].filter(Boolean).join(" · ")}` : ""}
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

        {/* Photo essay — facilities (when defined) or default gallery rhythm. */}
        {project.facilities && project.facilities.length > 0 ? (
          <section className="idlx-mono-photo idlx-facilities">
            {project.facilities.map((f, fi) => (
              <div key={f.name} className="idlx-facility">
                <Reveal>
                  <header className="idlx-facility-head">
                    <span className="idlx-facility-index">— Facility · {String(fi + 1).padStart(2, "0")}</span>
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
                            <img src={src} alt={`${f.name} — ${String(ii + 1).padStart(2, "0")}`} loading="lazy" decoding="async" />
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
            {(() => {
              const blocks: React.ReactNode[] = [];
              let i = 0;
              let key = 0;
              let useFull = true;
              while (i < gallery.length) {
                if (useFull) {
                  blocks.push(
                    <ClipReveal key={key++}>
                      <div className="idlx-mono-fig idlx-mono-fig--full">
                        <img src={gallery[i]} alt={`${project.name} — ${String(i + 1).padStart(2, "0")}`} loading="eager" decoding="async" />
                      </div>
                    </ClipReveal>
                  );
                  i += 1;
                } else if (i + 1 < gallery.length) {
                  blocks.push(
                    <div className="idlx-mono-pair" key={key++}>
                      <ClipReveal>
                        <div className="idlx-mono-fig"><img src={gallery[i]} alt={`${project.name}`} loading="eager" decoding="async" /></div>
                      </ClipReveal>
                      <ClipReveal delay={0.1}>
                        <div className="idlx-mono-fig"><img src={gallery[i + 1]} alt={`${project.name}`} loading="eager" decoding="async" /></div>
                      </ClipReveal>
                    </div>
                  );
                  i += 2;
                } else {
                  blocks.push(
                    <ClipReveal key={key++}>
                      <div className="idlx-mono-fig idlx-mono-fig--inset">
                        <img src={gallery[i]} alt={`${project.name}`} loading="eager" decoding="async" style={{ aspectRatio: "16/10", objectFit: "cover" }} />
                      </div>
                    </ClipReveal>
                  );
                  i += 1;
                }
                useFull = !useFull;
              }
              return blocks;
            })()}
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
