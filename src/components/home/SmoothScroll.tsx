import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

function isTouchDevice() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (window.matchMedia("(hover: none)").matches) return true;
  if (window.innerWidth <= 768) return true;
  return false;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip Lenis entirely on touch / small screens — native scroll is faster
    if (isTouchDevice()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId = 0;
    let running = true;
    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
