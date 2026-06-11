import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { realImages } from "@/data/realImages";

const hero = realImages.commercial.boutiquePanorama;
const awardsHero = realImages.institutional.pool;

export const Route = createFileRoute("/journal")({ component: JournalIndexPage });

function JournalIndexPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/journal") return <Outlet />;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero image={hero} alt="Journal" eyebrow="— Journal" title={"News and\nawards."} height="tall" />
        <section className="idlx-diptych" style={{ height: "70svh", minHeight: 520 }}>
          <Link to="/journal/news" className="idlx-diptych-half">
            <img src={hero} alt="News" />
            <div className="idlx-diptych-label"><span className="idlx-diptych-sub">— 01</span><span>News</span></div>
          </Link>
          <Link to="/journal/awards" className="idlx-diptych-half">
            <img src={awardsHero} alt="Awards" />
            <div className="idlx-diptych-label"><span className="idlx-diptych-sub">— 02</span><span>Awards</span></div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
