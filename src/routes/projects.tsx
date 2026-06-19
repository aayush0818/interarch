import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { projects } from "@/data/projects";
import archSplitAsset from "@/assets/projects/arch-split.jpg.asset.json";
import interiorSplitAsset from "@/assets/projects/interior-split.jpg.asset.json";

const work1 = archSplitAsset.url;
const work3 = interiorSplitAsset.url;


export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Interarch Design Labs" },
      { name: "description", content: "An archive of architecture and interiors — split between two disciplines, one register." },
      { property: "og:title", content: "Projects — Interarch Design Labs" },
      { property: "og:description", content: "Architecture and interiors by Interarch Design Labs." },
      { property: "og:image", content: work1 },
    ],
  }),
  component: ProjectsPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectsPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/projects") return <Outlet />;

  const arch = projects.filter((p) => p.category === "Architecture").length;
  const intr = projects.filter((p) => p.category === "Interiors").length;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <div className="idlx-diptych">
          <Link to="/projects/$category" params={{ category: "architecture" }} className="idlx-diptych-half">
            <img src={work1} alt="Architecture projects" style={{ objectPosition: "center 65%" }} />
            <motion.div
              className="idlx-diptych-label"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            >
              <span className="idlx-diptych-sub">— 01 / Architecture</span>
              <span>Architecture</span>
              <span className="idlx-diptych-sub" style={{ opacity: 0.6 }}>{arch} works</span>
            </motion.div>
          </Link>
          <Link to="/projects/$category" params={{ category: "interiors" }} className="idlx-diptych-half">
            <img src={work3} alt="Interior projects" style={{ objectPosition: "center center" }} />
            <motion.div
              className="idlx-diptych-label"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            >
              <span className="idlx-diptych-sub">— 02 / Interiors</span>
              <span>Interiors</span>
              <span className="idlx-diptych-sub" style={{ opacity: 0.6 }}>{intr} works</span>
            </motion.div>
          </Link>
        </div>

        <section className="idlx-section">
          <div className="idlx-manifesto">
            <Reveal>
              <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> The archive</span>
              <MaskText as="h2" className="idlx-h2" delay={0.1}>{`A Legacy of Work.\nAn Evolving Practice.`}</MaskText>
            </Reveal>
            <Reveal delay={0.18} className="idlx-manifesto-body">
              <p className="idlx-lead">
                Over the years, our portfolio has grown across disciplines, sectors, and geographies, shaped by a belief that good design should be both meaningful and enduring. From architecture to interiors, every project reflects a thoughtful response to the people, place, and purpose behind it.
              </p>
              <p className="idlx-body idlx-body--lg">
                Residential • Commercial • Institutional • Industrial • Hospitality
              </p>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
