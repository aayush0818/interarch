import { useEffect, useRef } from "react";
import heroImg from "@/assets/verticals/arch-residential.jpg";

export function Hero() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const onEnd = () => {
      el.style.willChange = "auto";
    };
    el.addEventListener("animationend", onEnd, { once: true });
    // Safety: drop after 13s even if animationend doesn't fire (mobile reduced-motion)
    const t = window.setTimeout(onEnd, 13000);
    return () => {
      el.removeEventListener("animationend", onEnd);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section className="idl-hero" aria-label="Interarch Design Labs">
      <img
        ref={imgRef}
        src={heroImg}
        alt="Interarch Design Labs residential project aerial view"
        width={1800}
        height={1200}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="idl-hero-vignette" />
      <div className="idl-hero-brand">
        <span className="dot" />
        <span>Interarch Design Labs</span>
      </div>
      <div className="idl-hero-scroll">
        <div>Scroll</div>
        <div className="line" />
      </div>
    </section>
  );
}
