import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { mediaRecognitionPosts } from "@/data/siteContent";

export const Route = createFileRoute("/media-recognition/$slug")({
  beforeLoad: ({ params }) => {
    if (!mediaRecognitionPosts.find((p) => p.slug === params.slug))
      throw redirect({ to: "/media-recognition" });
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

const EASE = [0.22, 1, 0.36, 1] as const;

function ArticlePage() {
  const { slug } = Route.useParams();
  const post = mediaRecognitionPosts.find((p) => p.slug === slug)!;
  const images = post.galleryImages;
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page idlx-media-detail">
        <div className="idlx-media-detail-head">
          <Link to="/media-recognition" className="idlx-essay-back" data-hover>
            ← Media Recognition
          </Link>
          <span className="idlx-jrn-meta">{post.category} · {post.date}</span>
          <h1 className="idlx-media-detail-title">{post.title}</h1>
        </div>

        <div className="idlx-slideshow">
          <button
            type="button"
            className="idlx-slide-nav idlx-slide-nav--prev"
            onClick={prev}
            aria-label="Previous image"
            data-hover
          >
            ←
          </button>

          <button
            type="button"
            className="idlx-slide-stage"
            onClick={() => setLightbox(true)}
            aria-label="Open image in fullscreen"
            data-hover
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={`${post.title} — page ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            </AnimatePresence>
            <span className="idlx-slide-zoom-hint">Click to enlarge</span>
          </button>

          <button
            type="button"
            className="idlx-slide-nav idlx-slide-nav--next"
            onClick={next}
            aria-label="Next image"
            data-hover
          >
            →
          </button>
        </div>

        <div className="idlx-slide-meta">
          <span className="idlx-slide-counter">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <div className="idlx-slide-dots" role="tablist" aria-label="Image navigation">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                className={`idlx-slide-dot${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-selected={i === index}
                role="tab"
                data-hover
              />
            ))}
          </div>
        </div>

        <div className="idlx-slide-thumbs" aria-label="All images">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              className={`idlx-slide-thumb${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              data-hover
            >
              <img src={img} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="idlx-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={`${post.title} image viewer`}
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              className="idlx-lightbox-close"
              onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
              aria-label="Close"
              data-hover
            >
              ✕
            </button>
            <button
              type="button"
              className="idlx-lightbox-nav idlx-lightbox-nav--prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              data-hover
            >
              ←
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={`${post.title} — page ${index + 1}`}
                className="idlx-lightbox-img"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            <button
              type="button"
              className="idlx-lightbox-nav idlx-lightbox-nav--next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              data-hover
            >
              →
            </button>
            <span className="idlx-lightbox-counter">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Footer />
    </>
  );
}
