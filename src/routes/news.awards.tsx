import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { recognitionList } from "@/data/siteContent";
import { realImages } from "@/data/realImages";

const hero = realImages.institutional.pool;

export const Route = createFileRoute("/news/awards")({ component: AwardsPage });

function AwardsPage() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero image={hero} alt="Awards" eyebrow="— News · Awards" title={"Quiet\nrecognition."} height="tall" />
        <section className="idlx-section">
          <div className="idlx-awards">
            {recognitionList.map((r) => (
              <div key={r.award} className="idlx-award-row">
                <span className="idlx-award-year">{r.year}</span>
                <span className="idlx-award-name">{r.award}</span>
                <span className="idlx-award-note">{r.note}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
