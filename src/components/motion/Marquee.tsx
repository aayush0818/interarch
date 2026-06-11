import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Marquee({ children, speed = 40 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="idlx-marquee">
      <motion.div
        className="idlx-marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="idlx-marquee-row">{children}</div>
        <div className="idlx-marquee-row" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}
