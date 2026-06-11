import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { sectors, designApproach } from "@/data/siteContent";

export const Route = createFileRoute("/expertise")({
  head: () => ({
    meta: [
      { title: "Expertise — Interarch Design Labs" },
      { name: "description", content: "Six disciplines. One sensibility — residential, commercial, institutional, hospitality, master planning and sustainability." },
      { property: "og:title", content: "Expertise — IDL" },
      { property: "og:description", content: "Six disciplines. One sensibility." },
      { property: "og:image", content: sectors[0]?.image },
    ],
  }),
  component: ExpertisePage,
});

function ExpertisePage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/expertise") return <Outlet />;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero
          image={sectors[0].image}
          alt="Expertise"
          eyebrow="— Expertise"
          title={"Six disciplines.\nOne sensibility."}
          height="tall"
        />

        <section className="idlx-section">
          <div className="idlx-manifesto">
            <Reveal>
              <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> The Index</span>
            </Reveal>
            <Reveal delay={0.12} className="idlx-manifesto-body">
              <p className="idlx-lead">
                Architecture, interiors and planning across scales — held to the same register of clarity, intent, context and craft. Each discipline carries its own technical depth; the studio's voice remains one.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="idlx-exp-list">
          {sectors.map((s, i) => (
            <Link key={s.slug} to="/expertise/$sector" params={{ sector: s.slug }} className="idlx-exp-row" data-hover>
              <span className="idlx-exp-num">{String(i + 1).padStart(2, "0")} / 06</span>
              <span className="idlx-exp-name">{s.name}</span>
              <span className="idlx-exp-blurb">{s.short}</span>
              <span className="idlx-exp-arr">→</span>
              <span className="idlx-exp-peek" aria-hidden>
                <img src={s.image} alt="" loading="lazy" />
              </span>
            </Link>
          ))}
        </section>

        {/* Design approach */}
        <section className="idlx-section idlx-section--bordered idlx-section--ink">
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Our Design Approach</span>
            <MaskText as="h2" className="idlx-h2" delay={0.1}>
              {`Five attitudes that\nshape every project.`}
            </MaskText>
          </Reveal>
          <div style={{ height: 80 }} />
          <div className="idlx-values">
            {designApproach.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <div className="idlx-value-row" style={{ borderColor: "rgba(245,238,227,0.12)" }}>
                  <span className="idlx-value-n" style={{ color: "rgba(245,238,227,0.5)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="idlx-value-title" style={{ color: "var(--idlx-cream)" }}>{d.title}</span>
                  <span className="idlx-value-body" style={{ color: "rgba(245,238,227,0.78)" }}>{d.body}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
