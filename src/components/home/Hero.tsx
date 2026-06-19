import heroImg from "@/assets/verticals/arch-residential.jpg";

export function Hero() {
  return (
    <section className="idl-hero" aria-label="Interarch Design Labs">
      <img
        src={heroImg}
        alt="Interarch Design Labs residential project aerial view"
        width={1800}
        height={1200}
        loading="eager"
        fetchPriority="high"
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


