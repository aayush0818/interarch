import { useEffect } from "react";

/**
 * Cinematic image system.
 *
 * For every `.img-reveal-wrap > .img-parallax` on the page we drive a single
 * transform per frame that combines three behaviours:
 *
 *   1. REVEAL          — image starts translated down (+60px) and scaled
 *                        UP (1.12). As it enters the viewport it slides
 *                        upward and scales DOWN to (0, 1.0). This is the
 *                        "camera stabilising" feel.
 *   2. PARALLAX        — once revealed, the inner element continues to drift
 *                        opposite to scroll at ~30% speed. Mimics camera
 *                        movement across a static scene.
 *   3. WORKS REVERSE   — `.works-drop-wrap` overrides the parallax direction
 *                        so images drift DOWNWARD as the page scrolls down.
 *
 * Text reveals use a one-shot IntersectionObserver (unchanged).
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ---- Text / element reveal (one-shot) ----
    let textIo: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      textIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              textIo!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => textIo!.observe(el));
    } else {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
    }

    // ---- Image system ----
    type Entry = { wrap: HTMLElement; inner: HTMLElement; isWorks: boolean };
    const collect = (): Entry[] => {
      const wraps = Array.from(
        document.querySelectorAll<HTMLElement>(".img-reveal-wrap")
      );
      const out: Entry[] = [];
      for (const wrap of wraps) {
        const inner = wrap.querySelector<HTMLElement>(".img-parallax");
        if (inner) {
          out.push({
            wrap,
            inner,
            isWorks: wrap.classList.contains("works-drop-wrap"),
          });
        }
      }
      return out;
    };

    let entries = collect();
    let lastQuery = performance.now();
    let rafId = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = () => {
      const now = performance.now();
      if (now - lastQuery > 1200) {
        entries = collect();
        lastQuery = now;
      }

      const vh = window.innerHeight || 1;

      for (const { wrap, inner, isWorks } of entries) {
        const rect = wrap.getBoundingClientRect();
        if (rect.bottom < -400 || rect.top > vh + 400) continue;

        // Reveal progress: 0 when the top edge is at the viewport bottom,
        // 1 by the time the top edge reaches 25% from the viewport top.
        const revealRaw = (vh - rect.top) / (vh * 0.75);
        const reveal = revealRaw < 0 ? 0 : revealRaw > 1 ? 1 : revealRaw;
        const r = easeOutCubic(reveal);

        // Reveal contribution: translateY +40px → 0, scale 1.06 → 1.0
        const revealY = (1 - r) * 40;
        const revealScale = 1 + (1 - r) * 0.06;
        const opacity = r;

        // Parallax contribution: progress from -1 (entering) to +1 (leaving)
        // through the viewport. Drives a subtle 24px range.
        const center = rect.top + rect.height / 2;
        const through = (center - vh / 2) / (vh / 2 + rect.height / 2);
        const t = through < -1 ? -1 : through > 1 ? 1 : through;
        // Default: image moves UPWARD opposite to scroll (camera-like).
        // Works override: image moves DOWNWARD as you scroll down.
        const parallaxY = isWorks ? t * 26 : t * -26;

        const y = revealY + parallaxY;
        inner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${revealScale.toFixed(4)})`;
        inner.style.opacity = opacity.toFixed(3);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      textIo?.disconnect();
    };
  }, []);
}
