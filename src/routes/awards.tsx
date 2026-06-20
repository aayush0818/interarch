import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { recognitionList } from "@/data/siteContent";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards — Interarch Design Labs" },
      { name: "description", content: "Awards and recognitions received by Interarch Design Labs." },
    ],
  }),
  component: AwardsPage,
});

function AwardsPage() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page idlx-media-page">
        <header className="idlx-media-head">
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Awards</span>
          </Reveal>
          <MaskText as="h1" className="idlx-media-title" delay={0.15}>
            Quiet recognition.
          </MaskText>
          <Reveal delay={0.3}>
            <p className="idlx-media-lede">
              Honours, commendations and acknowledgements gathered across three decades of practice.
            </p>
          </Reveal>
        </header>

        <section className="idlx-media-shelf">
          {recognitionList.map((r, i) => (
            <Reveal key={r.award} delay={0.05 * i}>
              <article className="idlx-media-card idlx-award-card">
                <div className="idlx-media-card-cover idlx-award-cover">
                  <span className="idlx-award-year-mark">{r.year}</span>
                </div>
                <div className="idlx-media-card-body">
                  <span className="idlx-jrn-meta">Recognition · {r.year}</span>
                  <h2 className="idlx-media-card-title">{r.award}</h2>
                  <p className="idlx-media-card-dek">{r.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
