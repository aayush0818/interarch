import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { mediaRecognitionPosts } from "@/data/siteContent";

export const Route = createFileRoute("/media-recognition")({
  head: () => ({
    meta: [
      { title: "Media Recognition — Interarch Design Labs" },
      { name: "description", content: "Press features, published work and media recognition from the studio." },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/media-recognition") return <Outlet />;
  const [feature, ...rest] = mediaRecognitionPosts;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <div className="idlx-jrn">
          <Link to="/media-recognition/$slug" params={{ slug: feature.slug }} className="idlx-jrn-feature" data-hover>
            <div className="idlx-jrn-feature-img"><img src={feature.coverImage} alt={feature.title} /></div>
            <div className="idlx-jrn-feature-body">
              <span className="idlx-jrn-meta">— Featured · {feature.category} · {feature.date}</span>
              <h2 className="idlx-jrn-feature-title">{feature.title}</h2>
              <p className="idlx-jrn-feature-dek">{feature.dek}</p>
              <span className="idlx-cta-link" style={{ alignSelf: "start" }}>View publication →</span>
            </div>
          </Link>
          <div className="idlx-jrn-grid">
            {rest.map((post) => (
              <Link key={post.slug} to="/media-recognition/$slug" params={{ slug: post.slug }} className="idlx-jrn-card" data-hover>
                <div className="idlx-jrn-card-img"><img src={post.coverImage} alt={post.title} loading="lazy" /></div>
                <span className="idlx-jrn-meta">{post.category} · {post.date}</span>
                <h3 className="idlx-jrn-card-title">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
