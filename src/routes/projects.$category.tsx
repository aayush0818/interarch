import { useMemo, useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { ProjectImage } from "@/components/project/ProjectImage";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";

import { projectImageMasks, projectsByCategory, type Project } from "@/data/projects";
import { realImages } from "@/data/realImages";
import archCommercial from "@/assets/verticals/arch-commercial-new.png";
import archInstitutional from "@/assets/verticals/arch-institutional.jpg";
import archResidential from "@/assets/verticals/arch-residential.jpg";
import hospitalityImg from "@/assets/verticals/arch-hospitality.jpg";
import intResidential from "@/assets/verticals/int-residential.jpg";
import intCommercial from "@/assets/verticals/int-commercial.jpg";

const archHeroes: Record<string, string> = {
  all: archResidential,
  commercial: archCommercial,
  institutional: archInstitutional,
  residential: archResidential,
  hospitality: hospitalityImg,
  workplace: archCommercial,
};
const interiorHeroes: Record<string, string> = {
  all: intResidential,
  residential: intResidential,
  commercial: intCommercial,
};

const sectorContent: Record<"architecture" | "interiors", Record<string, { title: string; body: string }>> = {
  architecture: {
    residential: {
      title: "On residential.",
      body: "Homes shaped around people, routines and place. We design residences that balance privacy, openness and natural light, creating environments that feel timeless, personal and deeply connected to everyday living.",
    },
    commercial: {
      title: "On commercial.",
      body: "Buildings that express identity through clarity and purpose. From offices to mixed-use developments, we create commercial environments that support business growth while delivering lasting architectural presence.",
    },
    hospitality: {
      title: "On hospitality.",
      body: "Destinations designed around experience, comfort and memory. Every hospitality project is carefully composed to create a sense of arrival, connection and belonging through architecture that feels both distinctive and timeless.",
    },
    institutional: {
      title: "On institutional.",
      body: "Spaces that serve communities with responsibility and longevity. We design educational, civic and public buildings that prioritise functionality, accessibility and enduring value for generations to come.",
    },
  },
  interiors: {
    residential: {
      title: "On residential.",
      body: "Interiors crafted to reflect the lives lived within them. Through thoughtful planning, material richness and attention to detail, we create homes that feel comfortable, refined and deeply personal.",
    },
    commercial: {
      title: "On commercial.",
      body: "Workplaces and retail environments that transform brand values into spatial experiences. Designed to support productivity, culture and engagement, each space balances functionality with a strong visual identity.",
    },
  },
};


const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const architectureSectors = ["all", "hospitality", "commercial", "institutional", "workplace", "residential"] as const;
const interiorSectors = ["all", "residential", "commercial"] as const;

type ArchitectureFilter = (typeof architectureSectors)[number];
type InteriorFilter = (typeof interiorSectors)[number];

export const Route = createFileRoute("/projects/$category")({
  validateSearch: (search: Record<string, unknown>): { sector?: string } => ({
    sector: typeof search.sector === "string" ? search.sector.toLowerCase() : undefined,
  }),
  beforeLoad: ({ params }) => {
    const c = params.category.toLowerCase();
    if (c !== "architecture" && c !== "interiors") throw redirect({ to: "/projects" });
  },
  head: ({ params }) => ({
    meta: [
      { title: `${cap(params.category)} - Projects · IDL` },
      { name: "description", content: `Selected ${params.category.toLowerCase()} projects by Interarch Design Labs.` },
      { property: "og:title", content: `${cap(params.category)} - Projects · IDL` },
      { property: "og:description", content: `Selected ${params.category.toLowerCase()} work.` },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { sector } = Route.useSearch();
  const cat = category.toLowerCase() as "architecture" | "interiors";
  const list = projectsByCategory(cat);
  const other = cat === "architecture" ? "interiors" : "architecture";
  const initialInterior: InteriorFilter = (interiorSectors as readonly string[]).includes(sector ?? "") ? (sector as InteriorFilter) : "all";
  const initialArch: ArchitectureFilter = (architectureSectors as readonly string[]).includes(sector ?? "") ? (sector as ArchitectureFilter) : "all";
  const [interiorFilter, setInteriorFilter] = useState<InteriorFilter>(initialInterior);
  const [architectureFilter, setArchitectureFilter] = useState<ArchitectureFilter>(initialArch);
  const hero = cat === "architecture" ? (archHeroes[architectureFilter] ?? archCommercial) : (interiorHeroes[interiorFilter] ?? intResidential);

  const filteredList = useMemo(() => {
    const bySector = (items: Project[], s: string) => items.filter((project) => project.sector.toLowerCase() === s);
    if (cat === "interiors") return interiorFilter === "all" ? list : bySector(list, interiorFilter);
    return architectureFilter === "all" ? list : bySector(list, architectureFilter);
  }, [architectureFilter, cat, interiorFilter, list]);


  const layout = (i: number): "wide" | "narrow" | "tall" => {
    const m = i % 5;
    if (m === 0) return "wide";
    if (m === 3) return "tall";
    return "narrow";
  };

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero
          image={hero}
          alt={cap(cat)}
          eyebrow={`Projects · ${cap(cat)}`}
          title={cap(cat) + "."}
          meta={`${filteredList.length} works`}
          height="tall"
        />

        {(() => {
          const activeSector = cat === "architecture" ? architectureFilter : interiorFilter;
          const content = sectorContent[cat]?.[activeSector];
          if (!content) return null;
          return (
            <section className="idlx-section">
              <div className="idlx-manifesto">
                <Reveal>
                  <MaskText as="h2" className="idlx-h2" delay={0.05}>{content.title}</MaskText>
                </Reveal>
                <Reveal delay={0.15} className="idlx-manifesto-body">
                  <p className="idlx-lead">{content.body}</p>
                </Reveal>
              </div>
            </section>
          );
        })()}



        <div className="idlx-archive">
          <aside className="idlx-archive-rail">
            <span>Category</span>
            <Link to="/projects" data-hover>All projects</Link>
            <Link
              to="/projects/$category"
              params={{ category: "architecture" }}
              data-hover
              className={cat === "architecture" ? "is-on" : ""}
            >
              Architecture
            </Link>
            <Link
              to="/projects/$category"
              params={{ category: "interiors" }}
              data-hover
              className={cat === "interiors" ? "is-on" : ""}
            >
              Interiors
            </Link>

            {cat === "interiors" && (
              <>
                <span className="idlx-archive-rail-gap">Sector</span>
                <button type="button" className={interiorFilter === "all" ? "is-on" : ""} onClick={() => setInteriorFilter("all")} data-hover>
                  All Interiors
                </button>
                <button type="button" className={interiorFilter === "residential" ? "is-on" : ""} onClick={() => setInteriorFilter("residential")} data-hover>
                  Residential
                </button>
                <button type="button" className={interiorFilter === "commercial" ? "is-on" : ""} onClick={() => setInteriorFilter("commercial")} data-hover>
                  Commercial
                </button>
              </>
            )}

            {cat === "architecture" && (
              <>
                <span className="idlx-archive-rail-gap">Sector</span>
                <button type="button" className={architectureFilter === "all" ? "is-on" : ""} onClick={() => setArchitectureFilter("all")} data-hover>
                  All Architecture
                </button>
                <button type="button" className={architectureFilter === "residential" ? "is-on" : ""} onClick={() => setArchitectureFilter("residential")} data-hover>
                  Residential
                </button>
                <button type="button" className={architectureFilter === "hospitality" ? "is-on" : ""} onClick={() => setArchitectureFilter("hospitality")} data-hover>
                  Hospitality
                </button>
                <button type="button" className={architectureFilter === "commercial" ? "is-on" : ""} onClick={() => setArchitectureFilter("commercial")} data-hover>
                  Commercial
                </button>
                <button type="button" className={architectureFilter === "institutional" ? "is-on" : ""} onClick={() => setArchitectureFilter("institutional")} data-hover>
                  Institutional
                </button>
              </>
            )}

            <span className="idlx-archive-rail-gap">Count</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 30, color: "var(--idlx-ink)" }}>{String(filteredList.length).padStart(2, "0")}</span>
          </aside>

          <div className="idlx-archive-grid">
            {filteredList.length === 0 ? (
              <Reveal>
                <div className="idlx-pcard2">
                  <div className="idlx-pcard2-cap">
                    <span className="idlx-pcard2-name">No projects added yet</span>
                    <span className="idlx-pcard2-meta">This category is currently empty.</span>
                  </div>
                </div>
              </Reveal>
            ) : (
              filteredList.map((p, i) => {
                const kind = layout(i);
                const cls = kind === "wide" ? "idlx-archive-cell idlx-archive-cell--wide" : "idlx-archive-cell";
                const imgCls =
                  kind === "wide"
                    ? "idlx-pcard2-img idlx-pcard2-img--wide"
                    : kind === "tall"
                      ? "idlx-pcard2-img idlx-pcard2-img--tall"
                      : "idlx-pcard2-img";
                const meta = [p.location, p.year].filter(Boolean).join(" · ");

                return (
                  <div key={p.slug} className={cls}>
                    <Reveal delay={(i % 3) * 0.05}>
                      <Link to="/project/$slug" params={{ slug: p.slug }} className="idlx-pcard2" data-hover>
                        <div className={imgCls}>
                          <ProjectImage src={p.cardCover ?? p.cover} alt={p.name} loading="lazy" mask={projectImageMasks[p.cardCover ?? p.cover]} style={{ objectPosition: p.coverPosition ?? "50% 45%" }} />
                        </div>
                        <div className="idlx-pcard2-cap">
                          <span className="idlx-pcard2-name">{p.name}</span>
                          {meta ? <span className="idlx-pcard2-meta">{meta}</span> : <span className="idlx-pcard2-meta">{p.sector}</span>}
                        </div>
                      </Link>
                    </Reveal>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <section className="idlx-cta idlx-section--bordered">
          <Reveal>
            <Link to="/projects/$category" params={{ category: other }} className="idlx-cta-link" data-hover>
              View {cap(other)} →
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
