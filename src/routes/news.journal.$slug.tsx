import { useRef } from "react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { journalPosts } from "@/data/siteContent";

export const Route = createFileRoute("/news/journal/$slug")({
  beforeLoad: ({ params }) => {
    if (!journalPosts.find((p) => p.slug === params.slug)) throw redirect({ to: "/news/journal" });
  },
  component: EssayPage,
});

function EssayPage() {
  const { slug } = Route.useParams();
  const post = journalPosts.find((p) => p.slug === slug)!;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start", "end end"] });

  return (
    <>
      <CustomCursor />
      <Header />
      <motion.div className="idlx-essay-progress" style={{ scaleX: scrollYProgress }} />
      <article className="idlx-page idlx-essay" ref={ref}>
        <Link to="/news/journal" className="idlx-essay-back" data-hover>← Journal</Link>
        <header>
          <span className="idlx-jrn-meta">{post.category} · {post.date}</span>
          <h1>{post.title}</h1>
          <p className="idlx-essay-dek">{post.dek}</p>
        </header>
        <div className="idlx-essay-body">
          <p>Every building begins not with a line, but with a question. Why this room, why this window, why this view?</p>
          <p>We talk to the people who will use the space long before the brief is fixed. Habits that drawings miss become the real plan.</p>
          <blockquote className="idlx-essay-pull">Clarity is not minimalism. It is the discipline of leaving in only what matters.</blockquote>
          <p>The essay around {post.title.toLowerCase()} follows the same principle: slower reading, stronger imagery, and fewer distractions.</p>
        </div>
      </article>
      <Footer />
    </>
  );
}
