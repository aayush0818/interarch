import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { partners, teamCopy, pageImages } from "@/data/siteContent";
import heroAsset from "@/assets/idl/directors-hero-pab9071.jpg.asset.json";
import directorsAsset from "@/assets/idl/DSC00260.jpg.asset.json";

const teamHero = heroAsset.url;


export const Route = createFileRoute("/studio/directors")({
  head: () => ({
    meta: [
      { title: "Our Directors - Studio · Interarch Design Labs" },
      { name: "description", content: teamCopy.intro.slice(0, 160) },
      { property: "og:title", content: "Our Directors - Studio · IDL" },
      { property: "og:description", content: teamCopy.intro.slice(0, 160) },
      { property: "og:image", content: teamHero },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 100px)", alignItems: "start", maxWidth: 1200, margin: "0 auto" }}>
          <Reveal duration={1.2}>
            <div style={{ aspectRatio: "4 / 5", overflow: "hidden", background: "#ddd5c8" }}>
              <img src={directorsAsset.url} alt="The IDL directors" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingTop: 12 }}>
            <Reveal>
              <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Meet the leadership</span>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="idlx-lead">{teamCopy.intro}</p>
            </Reveal>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .idlx-section > div[style*="grid"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>


      <section className="idlx-section--sm" style={{ padding: "0 clamp(28px,6vw,100px) clamp(120px,16vw,180px)" }}>
        <div className="idlx-team-grid">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.1} duration={1.2}>
              <div className="idlx-portrait" data-hover>
                <div className="idlx-portrait-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="idlx-portrait-cap">
                  <span className="idlx-portrait-role">{p.role} · {p.years}</span>
                  <span className="idlx-portrait-name">{p.name}</span>
                  <span className="idlx-body" style={{ fontStyle: "italic", color: "var(--idlx-mute)", marginTop: 4 }}>{p.line}</span>
                  <p className="idlx-portrait-bio">{p.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="idlx-section--sm idlx-section--bordered" style={{ textAlign: "center" }}>
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> The collective</span>
          <p className="idlx-lead" style={{ maxWidth: 900, margin: "24px auto 0" }}>{teamCopy.collective}</p>
        </Reveal>
      </section>

      <Marquee speed={45}>
        <span>Architects</span>
        <span>Interior Designers</span>
        <span>Visualisers</span>
        <span>Project Managers</span>
        <span>Delivery Specialists</span>
        <span>Strategists</span>
      </Marquee>

      <div className="idlx-split">
        <div className="idlx-split-img"><img src={pageImages.studioCulture} alt="Studio life" /></div>
        <div className="idlx-split-img"><img src={pageImages.studioHero} alt="Studio space" /></div>
      </div>

      <section className="idlx-cta idlx-section--bordered">
        <Reveal>
          <p className="idlx-lead">Let's create something that lasts.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/contact" className="idlx-cta-link" data-hover>Contact the Studio →</Link>
        </Reveal>
      </section>
    </>
  );
}
