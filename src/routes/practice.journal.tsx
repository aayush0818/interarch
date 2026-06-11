import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { journalPosts, pageImages } from "@/data/siteContent";

export const Route = createFileRoute("/practice/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Practice · IDL" },
      { name: "description", content: "Essays and notes from the studio — on architecture, interiors, light and material." },
      { property: "og:title", content: "Journal — Practice · IDL" },
      { property: "og:description", content: "Studio notes." },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/practice/journal") return <Outlet />;
  const [feature, ...rest] = journalPosts;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <section className="idlx-section--sm" style={{ paddingTop: 180, textAlign: "center" }}>
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Practice · Journal</span>
          </Reveal>
          <div style={{ height: 24 }} />
          <MaskText as="h1" className="idlx-h2" delay={0.1}>{`In conversation.`}</MaskText>
          <Reveal delay={0.3}>
            <p className="idlx-lead" style={{ maxWidth: 720, margin: "32px auto 0" }}>
              Blogs, achievements and studio observations — a slow, irregular journal.
            </p>
          </Reveal>
        </section>

        <div className="idlx-jrn">
          <Reveal>
            <Link to="/practice/journal/$slug" params={{ slug: feature.slug }} className="idlx-jrn-feature" data-hover>
              <div className="idlx-jrn-feature-img"><img src={pageImages.works[0]} alt={feature.title} /></div>
              <div className="idlx-jrn-feature-body">
                <span className="idlx-jrn-meta">— Feature · {feature.category} · {feature.date}</span>
                <h2 className="idlx-jrn-feature-title">{feature.title}</h2>
                <p className="idlx-jrn-feature-dek">{feature.dek}</p>
                <span className="idlx-cta-link" style={{ alignSelf: "start" }}>Read essay →</span>
              </div>
            </Link>
          </Reveal>

          <div className="idlx-jrn-grid">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to="/practice/journal/$slug" params={{ slug: p.slug }} className="idlx-jrn-card" data-hover>
                  <div className="idlx-jrn-card-img">
                    <img src={pageImages.works[(i + 2) % pageImages.works.length]} alt={p.title} loading="lazy" />
                  </div>
                  <span className="idlx-jrn-meta">{p.category} · {p.date}</span>
                  <h3 className="idlx-jrn-card-title">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
