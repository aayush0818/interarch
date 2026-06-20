import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { recognitionList } from "@/data/siteContent";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards — Interarch Design Labs" },
      { name: "description", content: "Awards and recognitions received by Interarch Design Labs." },
    ],
  }),
  component: AwardsPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function AwardsPage() {
  const imageItems = recognitionList.filter((r) => r.image) as Array<{ year: string; award: string; note: string; image: string }>;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      else if (e.key === "ArrowRight") setLightboxIdx((i) => (i === null ? null : (i + 1) % imageItems.length));
      else if (e.key === "ArrowLeft") setLightboxIdx((i) => (i === null ? null : (i - 1 + imageItems.length) % imageItems.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, imageItems.length]);

  const close = () => setLightboxIdx(null);
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % imageItems.length));
  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + imageItems.length) % imageItems.length));

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page idlx-media-page">
        <header className="idlx-media-head">
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Awards</span>
          </Reveal>
          <MaskText as="h1" className="idlx-media-title" delay={0.15}>
            Quiet recognition.
          </MaskText>
          <Reveal delay={0.3}>
            <p className="idlx-media-lede">
              Honours, commendations and acknowledgements gathered across three decades of practice.
            </p>
          </Reveal>
        </header>

        <section className="idlx-media-shelf">
          {recognitionList.map((r, i) => {
            const imgIdx = r.image ? imageItems.findIndex((x) => x.award === r.award) : -1;
            const clickable = imgIdx >= 0;
            return (
              <Reveal key={r.award} delay={0.05 * i}>
                <article className="idlx-media-card idlx-award-card idlx-award-card--clean">
                  <div
                    className={`idlx-award-cover-clean${clickable ? " is-clickable" : ""}`}
                    onClick={clickable ? () => setLightboxIdx(imgIdx) : undefined}
                    role={clickable ? "button" : undefined}
                    tabIndex={clickable ? 0 : undefined}
                    onKeyDown={clickable ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIdx(imgIdx); } } : undefined}
                    aria-label={clickable ? `View ${r.award}` : undefined}
                    data-hover={clickable ? true : undefined}
                  >
                    {r.image ? (
                      <img src={r.image} alt={r.award} loading="lazy" />
                    ) : (
                      <span className="idlx-award-year-mark">{r.year}</span>
                    )}
                  </div>
                  <div className="idlx-media-card-body">
                    <span className="idlx-jrn-meta">Recognition · {r.year}</span>
                    <h2 className="idlx-media-card-title">{r.award}</h2>
                    <p className="idlx-media-card-dek">{r.note}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </section>
      </main>

      <AnimatePresence>
        {lightboxIdx !== null ? (
          <motion.div
            className="idlx-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Award image viewer"
            onClick={close}
          >
            <button type="button" className="idlx-lightbox-close" onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close" data-hover>✕</button>
            {imageItems.length > 1 ? (
              <button type="button" className="idlx-lightbox-nav idlx-lightbox-nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" data-hover>←</button>
            ) : null}
            <AnimatePresence mode="wait">
              <motion.img
                key={imageItems[lightboxIdx].image}
                src={imageItems[lightboxIdx].image}
                alt={imageItems[lightboxIdx].award}
                className="idlx-lightbox-img"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            {imageItems.length > 1 ? (
              <button type="button" className="idlx-lightbox-nav idlx-lightbox-nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" data-hover>→</button>
            ) : null}
            <span className="idlx-lightbox-counter">
              {String(lightboxIdx + 1).padStart(2, "0")} / {String(imageItems.length).padStart(2, "0")}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Footer />
    </>
  );
}
