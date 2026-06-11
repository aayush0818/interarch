import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { projects } from "@/data/projects";
import { realImages } from "@/data/realImages";

const work1 = realImages.institutional.aerial;
const work3 = realImages.residential.exterior;


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
            <img src={work1} alt="Architecture projects" />
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
            <img src={work3} alt="Interior projects" />
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
              <MaskText as="h2" className="idlx-h2" delay={0.1}>{`Two disciplines.\nOne register.`}</MaskText>
            </Reveal>
            <Reveal delay={0.18} className="idlx-manifesto-body">
              <p className="idlx-lead">
                A growing record of work across India, the Middle East and Africa — composed with the same care from a private residence to a civic campus.
              </p>
              <p className="idlx-body idlx-body--lg">
                {arch} architecture projects · {intr} interior projects · across residential, hospitality, institutional and workplace.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
