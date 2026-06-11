import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { partners, teamCopy, pageImages } from "@/data/siteContent";
import { realImages } from "@/data/realImages";

const teamHero = realImages.commercial.lounge;

export const Route = createFileRoute("/studio/team")({
  head: () => ({
    meta: [
      { title: "Team — Studio · Interarch Design Labs" },
      { name: "description", content: teamCopy.intro.slice(0, 160) },
      { property: "og:title", content: "Team — Studio · IDL" },
      { property: "og:description", content: teamCopy.intro.slice(0, 160) },
      { property: "og:image", content: teamHero },
    ],
  }),
  component: TeamPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function TeamPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <CinematicHero
        image={teamHero}
        alt="The IDL team"
        eyebrow={teamCopy.eyebrow}
        title={teamCopy.headline}
        height="tall"
      />

      <section className="idlx-section">
        <div className="idlx-manifesto">
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Meet the leadership</span>
          </Reveal>
          <Reveal delay={0.12} className="idlx-manifesto-body">
            <p className="idlx-lead">{teamCopy.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="idlx-section--sm" style={{ padding: "0 clamp(28px,6vw,100px) clamp(120px,16vw,180px)" }}>
        <div className="idlx-team-grid">
          {partners.map((p, i) => {
            const isOpen = open === p.name;
            return (
              <Reveal key={p.name} delay={(i % 2) * 0.1} duration={1.2}>
                <button
                  type="button"
                  className="idlx-portrait"
                  data-hover
                  onClick={() => setOpen(isOpen ? null : p.name)}
                  style={{ background: "none", border: "none", padding: 0, textAlign: "left", width: "100%" }}
                >
                  <div className="idlx-portrait-img">
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>
                  <div className="idlx-portrait-cap">
                    <span className="idlx-portrait-role">{p.role} · {p.years}</span>
                    <span className="idlx-portrait-name">{p.name}</span>
                    <span className="idlx-body" style={{ fontStyle: "italic", color: "var(--idlx-mute)", marginTop: 4 }}>{p.line}</span>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          className="idlx-portrait-bio"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.6, ease: EASE }}
                        >
                          {p.bio}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="idlx-section--sm idlx-section--bordered" style={{ textAlign: "center" }}>
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> The collective</span>
          <p className="idlx-lead" style={{ maxWidth: 900, margin: "24px auto 0" }}>{teamCopy.collective}</p>
        </Reveal>
      </section>

      <Marquee speed={45}>
        <span>— Architects</span>
        <span>— Interior Designers</span>
        <span>— Visualisers</span>
        <span>— Project Managers</span>
        <span>— Delivery Specialists</span>
        <span>— Strategists</span>
      </Marquee>

      <div className="idlx-split">
        <div className="idlx-split-img"><img src={pageImages.studioCulture} alt="Studio life" /></div>
        <div className="idlx-split-img"><img src={pageImages.studioHero} alt="Studio space" /></div>
      </div>

      <section className="idlx-cta idlx-section--bordered">
        <Reveal>
          <p className="idlx-lead">Begin a project with the studio.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/contact" className="idlx-cta-link" data-hover>Contact the studio →</Link>
        </Reveal>
      </section>
    </>
  );
}
