import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { realImages } from "@/data/realImages";

const hero = realImages.commercial.boutiquePanorama;
const awardsHero = realImages.institutional.pool;

export const Route = createFileRoute("/news")({ component: NewsPage });

function NewsPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/news") return <Outlet />;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero image={hero} alt="News" eyebrow="— News" title={"Journal and\nawards."} height="tall" />
        <section className="idlx-diptych" style={{ height: "70svh", minHeight: 520 }}>
          <Link to="/news/journal" className="idlx-diptych-half">
            <img src={hero} alt="Journal" />
            <div className="idlx-diptych-label"><span className="idlx-diptych-sub">— 01</span><span>Journal</span></div>
          </Link>
          <Link to="/news/awards" className="idlx-diptych-half">
            <img src={awardsHero} alt="Awards" />
            <div className="idlx-diptych-label"><span className="idlx-diptych-sub">— 02</span><span>Awards</span></div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
