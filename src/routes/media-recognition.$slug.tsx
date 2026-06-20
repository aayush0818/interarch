import { useRef } from "react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { mediaRecognitionPosts } from "@/data/siteContent";

export const Route = createFileRoute("/media-recognition/$slug")({
  beforeLoad: ({ params }) => {
    if (!mediaRecognitionPosts.find((p) => p.slug === params.slug)) throw redirect({ to: "/media-recognition" });
  },
  head: ({ params }) => {
    const post = mediaRecognitionPosts.find((item) => item.slug === params.slug);
    return {
      meta: [
        { title: `${post?.title ?? "Media Recognition"} — Interarch Design Labs` },
        { name: "description", content: post?.dek ?? "Published work and media recognition from the studio." },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const post = mediaRecognitionPosts.find((p) => p.slug === slug)!;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start", "end end"] });

  return (
    <>
      <CustomCursor />
      <Header />
      <motion.div className="idlx-essay-progress" style={{ scaleX: scrollYProgress }} />
      <article className="idlx-page idlx-essay idlx-media-essay" ref={ref}>
        <Link to="/media-recognition" className="idlx-essay-back" data-hover>← Media Recognition</Link>
        <header>
          <span className="idlx-jrn-meta">{post.category} · {post.date}</span>
          <h1>{post.title}</h1>
          <p className="idlx-essay-dek">{post.dek}</p>
        </header>
        <div className="idlx-media-gallery">
          {post.galleryImages.map((image, index) => (
            <figure key={image} className="idlx-media-figure">
              <img src={image} alt={`${post.title} page ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
            </figure>
          ))}
        </div>
      </article>
      <Footer />
    </>
  );
}
