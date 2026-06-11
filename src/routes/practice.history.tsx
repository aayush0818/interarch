import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { milestones } from "@/data/siteContent";
import { realImages } from "@/data/realImages";

const work1 = realImages.institutional.aerial;

export const Route = createFileRoute("/practice/history")({
  head: () => ({
    meta: [
      { title: "History — Practice · IDL" },
      { name: "description", content: "Two practices. One purpose. Three decades of Interarch and Kala Design, now Interarch Design Labs." },
      { property: "og:title", content: "History — Practice · IDL" },
      { property: "og:description", content: "1989 to today — a chronological reading of the practice." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.25", "end 0.75"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero
          image={work1}
          alt="History of the practice"
          eyebrow="— Practice · History"
          title={"Two practices.\nOne purpose."}
          height="tall"
        />

        <section className="idlx-section">
          <div className="idlx-manifesto">
            <Reveal>
              <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> A lineage</span>
            </Reveal>
            <Reveal delay={0.1} className="idlx-manifesto-body">
              <p className="idlx-lead">
                Interarch Design Labs is a lineage of craft and thought. Interarch began as a practice dedicated to enduring architectural principles. Kala Design established itself through detail-driven interiors and contextual thinking. Over time, collaboration matured into a single, integrated studio — retaining the best of both legacies and orienting it toward new ambitions.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="idlx-spine-wrap" ref={ref}>
          <div className="idlx-spine" aria-hidden />
          <motion.div className="idlx-spine-fill" style={{ scaleY }} aria-hidden />
          {milestones.map((m, i) => (
            <motion.article
              key={m.year + m.title}
              className="idlx-tl-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="idlx-tl-year">{m.year}</div>
              <div className="idlx-tl-body">
                <h3 className="idlx-tl-title">{m.title}</h3>
                <p className="idlx-tl-text">{m.text}</p>
                {i === milestones.length - 1 && (
                  <Link to="/projects" className="idlx-cta-link" data-hover style={{ marginTop: 16, alignSelf: "start" }}>
                    See the work →
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
