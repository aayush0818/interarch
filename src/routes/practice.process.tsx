import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal, ClipReveal } from "@/components/motion/Reveal";
import { processPhases, pageImages } from "@/data/siteContent";

export const Route = createFileRoute("/practice/process")({
  head: () => ({
    meta: [
      { title: "Process — Practice · IDL" },
      { name: "description", content: "Five phases. One trajectory — from listening to evolution." },
      { property: "og:title", content: "Process — Practice · IDL" },
      { property: "og:description", content: "The IDL design method, in five phases." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero
          image={pageImages.works[3]}
          alt="The IDL process"
          eyebrow="— Practice · Process"
          title={"Five phases.\nOne trajectory."}
          height="tall"
        />

        <section className="idlx-section">
          <div className="idlx-manifesto">
            <Reveal>
              <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> A considered method</span>
            </Reveal>
            <Reveal delay={0.12} className="idlx-manifesto-body">
              <p className="idlx-lead">
                We believe every project is a journey — from vision to lived experience. A considered method that holds from the first conversation to the building's quietest second decade.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="idlx-process">
          {processPhases.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <section key={p.n} className="idlx-phase" style={{ direction: reverse ? "rtl" : "ltr" }}>
                <div className="idlx-phase-text" style={{ direction: "ltr" }}>
                  <Reveal>
                    <span className="idlx-phase-num">— Phase {p.n}</span>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h2 className="idlx-phase-name">{p.title}</h2>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="idlx-phase-body">{p.body}</p>
                  </Reveal>
                </div>
                <ClipReveal>
                  <div className="idlx-phase-img" style={{ direction: "ltr" }}>
                    <img src={pageImages.works[i % pageImages.works.length]} alt={p.title} loading="lazy" />
                  </div>
                </ClipReveal>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
