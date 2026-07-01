import { useEffect, useRef } from "react";
import heroVideo from "@/assets/uploads/hero-video-2026.mp4.asset.json";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Ensure video starts playing even if autoplay is blocked
    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <section className="idl-hero" aria-label="Interarch Design Labs">
      <video
        ref={videoRef}
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        width={1800}
        height={1200}
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
