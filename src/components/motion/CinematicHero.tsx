import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectImage } from "@/components/project/ProjectImage";
import { MaskText } from "./MaskText";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  image: string;
  alt: string;
  mask?: { x: number; y: number; width: number; height: number; shiftX?: number; shiftY?: number; feather?: number };
  eyebrow?: string;
  title: string;
  meta?: string;
  height?: "full" | "tall" | "mid";
  align?: "left" | "center" | "bottom";
  className?: string;
};

export function CinematicHero({ image, alt, mask, eyebrow, title, meta, height = "full", align = "bottom", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const heightClass =
    height === "full" ? "idlx-hero--full" : height === "tall" ? "idlx-hero--tall" : "idlx-hero--mid";

  return (
    <section ref={ref} className={`idlx-hero ${heightClass} idlx-hero--${align} ${className}`.trim()}>
      <motion.div className="idlx-hero-imgwrap" style={{ y, scale }}>
        <motion.div initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease: EASE }}>
          <ProjectImage src={image} alt={alt} mask={mask} loading="eager" fetchPriority="high" />
        </motion.div>
      </motion.div>
      <div className="idlx-hero-vignette" aria-hidden />
      <div className="idlx-hero-cap">
        {eyebrow ? (
          <motion.span
            className="idlx-eyebrow idlx-eyebrow--light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <span className="idlx-eyebrow-dot" /> {eyebrow}
          </motion.span>
        ) : null}
        <MaskText className="idlx-hero-title" as="h1" delay={0.35}>
          {title}
        </MaskText>
        {meta ? (
          <motion.span
            className="idlx-hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
          >
            {meta}
          </motion.span>
        ) : null}
      </div>
    </section>
  );
}
