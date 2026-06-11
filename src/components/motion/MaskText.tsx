import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode | string | string[];
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
};

/** Splits children string into lines on `\n` and mask-reveals each line. */
export function MaskText({ children, delay = 0, stagger = 0.08, duration = 1.1, className = "", as = "h1" }: Props) {
  const lines = Array.isArray(children)
    ? children
    : typeof children === "string"
    ? children.split("\n")
    : [children];
  const Tag = as as any;
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="idlx-mask-line">
          <motion.span
            className="idlx-mask-inner"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
