import { useEffect, useRef, useState } from "react";
import { realImages } from "@/data/realImages";

const skyline = realImages.brand.manifestoSkyline;

const W = 1200;
const H = 220;
const SEGMENTS = 18; // down from 49 - visually identical, much cheaper

function isTouchDevice() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (window.matchMedia("(hover: none)").matches) return true;
  if (window.innerWidth <= 768) return true;
  return false;
}

function buildClip(p: number): string {
  if (p <= 0) return `0,0 0,0 0,${H} 0,${H}`;
  if (p >= 1) return `0,0 ${W},0 ${W},${H} 0,${H}`;
  const ex = p * W;
  const pts = [`0,0`, `${ex.toFixed(1)},0`];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    const y = t * H;
    const jag =
      Math.sin(t * 26 + p * 35) * 7 +
      Math.sin(t * 11 + p * 18) * 4 +
      Math.cos(t * 47 + p * 9) * 2.5;
    pts.push(`${Math.max(0, ex + jag).toFixed(1)},${y.toFixed(1)}`);
  }
  pts.push(`0,${H}`);
  return pts.join(" ");
}

/* ---------- Mobile static layout: no scroll math, no SVG clip ---------- */
function MobilePhilosophy() {
  return (
    <section className="sketch-philosophy-mobile">
      <span className="sketch-mobile-eyebrow">(Our Philosophy)</span>
      <h2 className="sketch-mobile-text">
        Design is not about creating landmarks.
        It is about creating places that people
        return to, remember, and make their own.
      </h2>
      <div className="sketch-mobile-rule" aria-hidden />
      <div className="sketch-mobile-image">
        <img src={skyline} alt="Skyline sketch" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}

export function SketchPhilosophy() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(isTouchDevice());
    const onResize = () => setIsMobile(isTouchDevice());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const polyRef = useRef<SVGPolygonElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const lineRef = useRef<SVGLineElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);
  const topLabelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const l1 = useRef<HTMLSpanElement | null>(null);
  const l2 = useRef<HTMLSpanElement | null>(null);
  const l3 = useRef<HTMLSpanElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile !== false) return; // only run on desktop branch
    const outer = outerRef.current;
    if (!outer) return;

    let inView = false;
    let scheduled = false;
    let lastDrawP = -1;
    let lastTextP = -1;
    let lastPctText = "";

    const update = () => {
      scheduled = false;
      const rect = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);

      const drawP = Math.min(p / 0.55, 1);
      if (Math.abs(drawP - lastDrawP) > 0.002) {
        lastDrawP = drawP;
        polyRef.current?.setAttribute("points", buildClip(drawP));
        const ex = drawP * W;
        const py = H * 0.5 + Math.sin(drawP * Math.PI * 4) * 20;
        if (drawP > 0.01 && drawP < 0.99) {
          dotRef.current?.setAttribute("cx", String(ex));
          dotRef.current?.setAttribute("cy", String(py));
          dotRef.current?.setAttribute("opacity", "0.6");
          lineRef.current?.setAttribute("x1", String(ex));
          lineRef.current?.setAttribute("x2", String(ex));
          lineRef.current?.setAttribute("opacity", "0.12");
        } else {
          dotRef.current?.setAttribute("opacity", "0");
          lineRef.current?.setAttribute("opacity", "0");
        }
        const pctText = `${Math.round(drawP * 100)}%`;
        if (pctRef.current && pctText !== lastPctText) {
          pctRef.current.textContent = pctText;
          lastPctText = pctText;
        }
        topLabelRef.current?.classList.toggle("visible", p > 0.02);
      }

      const textP = Math.min(Math.max((p - 0.55) / 0.45, 0), 1);
      if (Math.abs(textP - lastTextP) > 0.002) {
        lastTextP = textP;
        overlayRef.current?.classList.toggle("visible", textP > 0);
        const set = (el: HTMLElement | null, on: boolean) => {
          if (!el) return;
          el.style.transform = on ? "translateY(0)" : "translateY(100%)";
        };
        set(labelRef.current, textP > 0.05);
        set(l1.current, textP > 0.15);
        set(l2.current, textP > 0.3);
        set(l3.current, textP > 0.45);
        if (ruleRef.current) {
          const w = textP > 0.6 ? Math.min((textP - 0.6) / 0.15, 1) * 56 : 0;
          ruleRef.current.style.width = `${w}px`;
        }
        if (bodyRef.current) {
          bodyRef.current.style.opacity =
            textP > 0.75 ? String(Math.min((textP - 0.75) / 0.15, 1)) : "0";
        }
      }
    };

    const onScroll = () => {
      if (!inView || scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView = e.isIntersecting;
        if (inView) {
          scheduled = true;
          requestAnimationFrame(update);
        }
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    io.observe(outer);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  if (isMobile === null) {
    // SSR / first paint placeholder - keep DOM stable
    return <div className="sketch-philosophy-outer" ref={outerRef} aria-hidden />;
  }
  if (isMobile) return <MobilePhilosophy />;

  return (
    <div className="sketch-philosophy-outer" ref={outerRef}>
      <div className="sketch-philosophy-stage">
        <div className="sketch-top-label" ref={topLabelRef}>
          (Our Philosophy)
        </div>

        {/* Philosophy text overlay (upper-left) */}
        <div className="philosophy-overlay" ref={overlayRef}>
          <div className="philosophy-text">
            <div className="reveal-line m-label-wrap">
              <span className="m-label-inner" ref={labelRef}>
                (Our Philosophy)
              </span>
            </div>
            <div className="reveal-line">
              <span className="reveal-line-inner" ref={l1}>
                Design is not about creating landmarks.
              </span>
            </div>
            <div className="reveal-line">
              <span className="reveal-line-inner" ref={l2}>
                It is about creating places that people
              </span>
            </div>
            <div className="reveal-line">
              <span className="reveal-line-inner" ref={l3}>
                return to, remember, and make their own.
              </span>
            </div>
            <div className="m-rule" ref={ruleRef} />
            <div className="m-body" ref={bodyRef}>
              &nbsp;
            </div>
          </div>
        </div>

        {/* Sketch drawing (bottom) */}
        <div className="sketch-drawing-area">
          <svg
            className="sketch-svg"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <clipPath id="sketchClip">
                <polygon ref={polyRef} points={`0,0 0,0 0,${H} 0,${H}`} />
              </clipPath>
            </defs>
            <image
              href={skyline}
              x="0"
              y="0"
              width={W}
              height={H}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#sketchClip)"
            />
            <line
              ref={lineRef}
              x1="0"
              y1="0"
              x2="0"
              y2={H}
              stroke="#3f3431"
              strokeWidth="0.5"
              opacity="0"
            />
            <circle ref={dotRef} cx="0" cy={H / 2} r="4" fill="#3f3431" opacity="0" />
          </svg>
          <div className="sketch-caption">
            <span>
              Building the city · <span ref={pctRef}>0%</span>
            </span>
            <span className="sketch-caption-right">
              Where every building tells a story
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
