import { useEffect } from "react";

/**
 * Image reveal + parallax system.
 *
 * Optimised:
 *   - One IntersectionObserver tracks which wraps are on-screen; only those
 *     get a per-frame transform write.
 *   - RAF runs only while the user is scrolling (or resizing); it self-stops
 *     a few frames after scroll ends so the main thread is idle when idle.
 *   - On touch / small viewports the heavy parallax is disabled and elements
 *     are simply faded in via an IntersectionObserver (cheap, one-shot).
 */
function isTouchDevice() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (window.matchMedia("(hover: none)").matches) return true;
  if (window.innerWidth <= 768) return true;
  return false;
}

export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = isTouchDevice();

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

    // On touch / reduced motion: fall back to a cheap one-shot fade-in for
    // .img-parallax - no RAF, no scroll listener.
    if (touch || reduceMotion) {
      const imgIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.opacity = "1";
              imgIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      const inners = document.querySelectorAll<HTMLElement>(
        ".img-reveal-wrap .img-parallax"
      );
      inners.forEach((el) => {
        el.style.opacity = "0";
        el.style.transition = "opacity 600ms cubic-bezier(0.22,1,0.36,1)";
        imgIo.observe(el);
      });
      return () => {
        textIo?.disconnect();
        imgIo.disconnect();
      };
    }

    // ---- Desktop: parallax + reveal only for on-screen entries ----
    type Entry = { wrap: HTMLElement; inner: HTMLElement; isWorks: boolean };
    const visible = new Set<Entry>();
    const all: Entry[] = [];

    const wraps = Array.from(
      document.querySelectorAll<HTMLElement>(".img-reveal-wrap")
    );
    for (const wrap of wraps) {
      const inner = wrap.querySelector<HTMLElement>(".img-parallax");
      if (inner) {
        all.push({ wrap, inner, isWorks: wrap.classList.contains("works-drop-wrap") });
      }
    }

    const visIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const entry = all.find((x) => x.wrap === e.target);
          if (!entry) continue;
          if (e.isIntersecting) visible.add(entry);
          else visible.delete(entry);
        }
        // Kick the loop in case scroll handler isn't firing right now
        if (visible.size > 0) requestLoop();
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    all.forEach((e) => visIo.observe(e.wrap));

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let rafId = 0;
    let running = false;
    let idleFrames = 0;

    const tick = () => {
      const vh = window.innerHeight || 1;
      for (const { wrap, inner, isWorks } of visible) {
        const rect = wrap.getBoundingClientRect();
        const revealRaw = (vh - rect.top) / (vh * 0.75);
        const reveal = revealRaw < 0 ? 0 : revealRaw > 1 ? 1 : revealRaw;
        const r = easeOutCubic(reveal);
        const revealY = (1 - r) * 40;
        const revealScale = 1 + (1 - r) * 0.06;

        const center = rect.top + rect.height / 2;
        const through = (center - vh / 2) / (vh / 2 + rect.height / 2);
        const t = through < -1 ? -1 : through > 1 ? 1 : through;
        const parallaxY = isWorks ? t * 26 : t * -26;

        const y = revealY + parallaxY;
        inner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${revealScale.toFixed(4)})`;
        inner.style.opacity = r.toFixed(3);
      }

      // Self-stop after a few idle frames (no scroll input)
      if (idleFrames > 6) {
        running = false;
        return;
      }
      idleFrames += 1;
      rafId = requestAnimationFrame(tick);
    };

    const requestLoop = () => {
      idleFrames = 0;
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => requestLoop();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // Initial paint
    requestLoop();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      visIo.disconnect();
      textIo?.disconnect();
    };
  }, []);
}
