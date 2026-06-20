import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
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

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page idlx-media-page">
        <header className="idlx-media-head">
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Media Recognition</span>
          </Reveal>
          <MaskText as="h1" className="idlx-media-title" delay={0.15}>
            Published, profiled, archived.
          </MaskText>
          <Reveal delay={0.3}>
            <p className="idlx-media-lede">
              A selection of magazines, books and cover features that have carried the studio's work into print.
            </p>
          </Reveal>
        </header>

        <section className="idlx-media-shelf">
          {mediaRecognitionPosts.map((post, i) => (
            <Reveal key={post.slug} delay={0.05 * i}>
              <Link
                to="/media-recognition/$slug"
                params={{ slug: post.slug }}
                className="idlx-media-card"
                data-hover
              >
                <div className="idlx-media-card-cover">
                  <img src={post.coverImage} alt={post.title} loading={i < 2 ? "eager" : "lazy"} />
                </div>
                <div className="idlx-media-card-body">
                  <span className="idlx-jrn-meta">{post.category} · {post.date}</span>
                  <h2 className="idlx-media-card-title">{post.title}</h2>
                </div>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
