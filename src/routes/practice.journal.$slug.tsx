import { useRef } from "react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { journalPosts } from "@/data/siteContent";

export const Route = createFileRoute("/practice/journal/$slug")({
  beforeLoad: ({ params }) => {
    if (!journalPosts.find((p) => p.slug === params.slug)) throw redirect({ to: "/practice/journal" });
  },
  head: ({ params }) => {
    const p = journalPosts.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${p?.title ?? "Essay"} — Journal · IDL` },
        { name: "description", content: p?.dek ?? "" },
        { property: "og:title", content: `${p?.title} — Journal · IDL` },
        { property: "og:description", content: p?.dek ?? "" },
      ],
    };
  },
  component: EssayPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const body = (slug: string) => [
  { kind: "p" as const, text: "Every building begins not with a line, but with a question. Why this room, why this window, why this view? The drawing only earns its weight once the answer is honest." },
  { kind: "p" as const, text: "We talk to the people who will use the space long before the brief is fixed. Habits that drawings miss — the way light is preferred at breakfast, the door that everyone leaves open — these are the real plans." },
  { kind: "quote" as const, text: "Clarity is not minimalism. It is the discipline of leaving in only what matters." },
  { kind: "p" as const, text: `In the case of "${slug.replace(/-/g, " ")}", that meant editing as much as designing. The plan grew quieter each week, until what remained felt inevitable.` },
  { kind: "p" as const, text: "A building done with care is patient. It accepts a new tenant, a wedding, a quiet rainy afternoon, with the same composure. That is the test." },
];

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
        <Link to="/practice/journal" className="idlx-essay-back" data-hover>← Journal</Link>
        <header>
          <span className="idlx-jrn-meta">{post.category} · {post.date}</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {post.title}
          </motion.h1>
          <p className="idlx-essay-dek">{post.dek}</p>
        </header>
        <div className="idlx-essay-body">
          {body(slug).map((b, i) =>
            b.kind === "quote" ? (
              <motion.blockquote
                key={i}
                className="idlx-essay-pull"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              >
                {b.text}
              </motion.blockquote>
            ) : (
              <p key={i}>{b.text}</p>
            )
          )}
        </div>
      </article>
      <Footer />
    </>
  );
}
