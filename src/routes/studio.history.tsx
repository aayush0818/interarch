import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { milestones } from "@/data/siteContent";
import { realImages } from "@/data/realImages";

export const Route = createFileRoute("/studio/history")({
  head: () => ({
    meta: [
      { title: "History — Studio · Interarch Design Labs" },
      { name: "description", content: "From 1989 to today — a year-by-year journey through three decades of Interarch Design Labs." },
      { property: "og:title", content: "History — Studio · IDL" },
      { property: "og:description", content: "A chronological reading of the practice, 1989 to today." },
      { property: "og:image", content: realImages.institutional.aerial },
    ],
  }),
  component: StudioHistoryPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function StudioHistoryPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.2", "end 0.8"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <CinematicHero
        image={realImages.institutional.aerial}
        alt="A legacy in motion"
        eyebrow="— Studio · History"
        title={"A legacy,\nyear by year."}
        meta="1989 — Today"
        height="tall"
      />

      <section className="idlx-section">
        <div className="idlx-manifesto">
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> The journey</span>
          </Reveal>
          <Reveal delay={0.12} className="idlx-manifesto-body">
            <p className="idlx-lead">
              Three decades of practice, read as a sequence of moments — each year a stage in a single, continuous story of craft, recognition, and quiet growth.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="idlx-journey" ref={ref}>
        <div className="idlx-journey-spine" aria-hidden />
        <motion.div className="idlx-journey-fill" style={{ scaleY }} aria-hidden />

        {milestones.map((m, i) => (
          <motion.article
            key={m.year + m.title}
            className={`idlx-journey-stage${i % 2 === 1 ? " is-flip" : ""}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div className="idlx-journey-media">
              <motion.div
                className="idlx-journey-img"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-18%" }}
                transition={{ duration: 1.6, ease: EASE }}
              >
                <img src={m.image} alt={m.title} loading="lazy" />
              </motion.div>
              <span className="idlx-journey-bigyear" aria-hidden>{m.year}</span>
            </div>

            <div className="idlx-journey-text">
              <span className="idlx-journey-dot" aria-hidden />
              <span className="idlx-journey-year">{m.year}</span>
              <MaskText as="h3" className="idlx-journey-title" delay={0.05}>{m.title}</MaskText>
              <Reveal delay={0.12}>
                <p className="idlx-journey-body">{m.text}</p>
              </Reveal>
              {i === milestones.length - 1 && (
                <Reveal delay={0.18}>
                  <Link to="/projects" className="idlx-cta-link" data-hover style={{ marginTop: 8 }}>
                    See the work →
                  </Link>
                </Reveal>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <section className="idlx-cta idlx-section--bordered">
        <Reveal>
          <p className="idlx-lead" style={{ maxWidth: 640 }}>The story continues with the people behind every project.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/studio/team" className="idlx-cta-link" data-hover>Meet the team →</Link>
        </Reveal>
      </section>
    </>
  );
}
