import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    const LERP = 0.18;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    function loop() {
      cx += (mx - cx) * LERP;
      cy += (my - cy) * LERP;
      el!.style.transform = `translate(${cx - 3.5}px, ${cy - 3.5}px)`;
      raf = requestAnimationFrame(loop);
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} className="idl-cursor" aria-hidden />;
}
