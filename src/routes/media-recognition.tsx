import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { journalPosts, pageImages } from "@/data/siteContent";

export const Route = createFileRoute("/media-recognition")({
  head: () => ({
    meta: [
      { title: "Media Recognition — Interarch Design Labs" },
      { name: "description", content: "Press features, essays and notes from the studio." },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/media-recognition") return <Outlet />;
  const [feature, ...rest] = journalPosts;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <div className="idlx-jrn">
          <Link to="/media-recognition/$slug" params={{ slug: feature.slug }} className="idlx-jrn-feature" data-hover>
            <div className="idlx-jrn-feature-img"><img src={pageImages.works[0]} alt={feature.title} /></div>
            <div className="idlx-jrn-feature-body">
              <span className="idlx-jrn-meta">— Featured · {feature.category} · {feature.date}</span>
              <h2 className="idlx-jrn-feature-title">{feature.title}</h2>
              <p className="idlx-jrn-feature-dek">{feature.dek}</p>
              <span className="idlx-cta-link" style={{ alignSelf: "start" }}>Read article →</span>
            </div>
          </Link>
          <div className="idlx-jrn-grid">
            {rest.map((p, i) => (
              <Link key={p.slug} to="/media-recognition/$slug" params={{ slug: p.slug }} className="idlx-jrn-card" data-hover>
                <div className="idlx-jrn-card-img"><img src={pageImages.works[(i + 2) % pageImages.works.length]} alt={p.title} loading="lazy" /></div>
                <span className="idlx-jrn-meta">{p.category} · {p.date}</span>
                <h3 className="idlx-jrn-card-title">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
