import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import archCommercial from "@/assets/verticals/arch-commercial.png.asset.json";
import archInstitutional from "@/assets/verticals/arch-institutional.png.asset.json";
import archResidential from "@/assets/verticals/arch-residential.png.asset.json";
import hospitalityImg from "@/assets/verticals/hospitality.png.asset.json";
import intResidential from "@/assets/verticals/int-residential.png.asset.json";
import intCommercial from "@/assets/verticals/int-commercial.png.asset.json";

type Vertical = {
  name: string;
  sectorSlug: string;
  tagline: string;
  feature: { name: string; location: string };
  img: string;
};

type Group = {
  key: "architecture" | "interiors";
  label: string;
  href: string;
  items: Vertical[];
};

const groups: Group[] = [
  {
    key: "architecture",
    label: "Architecture",
    href: "/projects/architecture",
    items: [
      {
        name: "Residential",
        sectorSlug: "residential",
        tagline: "Homes designed as enduring expressions of lifestyle, context and place.",
        feature: { name: "The Horizon House", location: "Lonavala" },
        img: archResidential.url,
      },
      {
        name: "Commercial",
        sectorSlug: "commercial",
        tagline: "Workplaces and business environments designed to balance performance, presence, and experience.",
        feature: { name: "Meril Corporate HQ", location: "Vapi" },
        img: archCommercial.url,
      },
      {
        name: "Hospitality",
        sectorSlug: "hospitality",
        tagline: "Destinations crafted to elevate comfort, atmosphere, and memorable guest experiences",
        feature: { name: "Energize Resort", location: "Nashik" },
        img: hospitalityImg.url,
      },
      {
        name: "Institutional",
        sectorSlug: "institutional",
        tagline: "Spaces that serve communities through thoughtful planning, longevity, and purpose.",
        feature: { name: "Kanu Desai VIA Auditorium", location: "Vapi" },
        img: archInstitutional.url,
      },
    ],
  },
  {
    key: "interiors",
    label: "Interiors",
    href: "/projects/interiors",
    items: [
      {
        name: "Residential",
        sectorSlug: "residential",
        tagline: "Interiors shaped by the lives lived within.",
        feature: { name: "Atelier Residence", location: "Mumbai" },
        img: intResidential.url,
      },
      {
        name: "Commercial",
        sectorSlug: "commercial",
        tagline: "Workplaces where culture becomes spatial.",
        feature: { name: "Monster Energy HQ", location: "Mumbai" },
        img: intCommercial.url,
      },
    ],
  },
];

const FADE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

export function Verticals() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [active, setActive] = useState(0);
  const group = groups[groupIdx];
  const items = group.items;
  const idx = Math.min(active, items.length - 1);
  const current = items[idx];

  return (
    <section className="vx-section">
      <div className="vx-grid">
        {/* LEFT — discipline tabs + sector list */}
        <div className="vx-list">
          <span className="vx-eyebrow">( 02 ) — Disciplines</span>

          <div className="vx-disc-row">
            {groups.map((g, i) => (
              <button
                key={g.key}
                type="button"
                className={`vx-disc-tab${i === groupIdx ? " is-active" : ""}`}
                data-hover
                onClick={() => {
                  setGroupIdx(i);
                  setActive(0);
                }}
              >
                {g.label}
              </button>
            ))}
          </div>

          <ul className="vx-sectors">
            {items.map((it, i) => {
              const isActive = i === idx;
              return (
                <li key={`${group.key}-${it.name}`} className={`vx-row${isActive ? " is-active" : ""}`}>
                  <Link
                    to="/projects/$category"
                    params={{ category: group.key }}
                    search={{ sector: it.sectorSlug }}
                    className="vx-row-btn"
                    data-hover
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="vx-row-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="vx-row-body">
                      <span className="vx-row-name">{it.name}</span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="tag"
                            className="vx-row-tag"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={FADE}
                          >
                            {it.tagline}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="vx-row-rule" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link to="/projects/$category" params={{ category: group.key }} className="vx-cta" data-hover>
            <span>Explore {group.label}</span>
            <span className="vx-cta-rule" aria-hidden />
          </Link>
        </div>

        {/* RIGHT — contained image */}
        <div className="vx-media">
          <div className="vx-media-frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${group.key}-${current.name}-img`}
                src={current.img}
                alt={`${group.label} — ${current.name}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
              />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${group.key}-${current.name}-badge`}
                className="vx-media-badge"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={FADE}
              >
                <p className="vx-media-badge-name">{current.feature.name}</p>
                <p className="vx-media-badge-loc">{current.feature.location}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
