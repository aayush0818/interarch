import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { realImages } from "@/data/realImages";

const { institutional: inst, residential: res, commercial: com } = realImages;

type Vertical = {
  name: string;
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
        tagline: "Homes shaped around people, light and place.",
        feature: { name: "The Horizon House", location: "Lonavala" },
        img: res.exterior,
      },
      {
        name: "Commercial",
        tagline: "Workplaces built to evolve with the businesses they hold.",
        feature: { name: "Monster HQ", location: "Mumbai" },
        img: com.reception,
      },
      {
        name: "Hospitality",
        tagline: "Destinations remembered long after the stay.",
        feature: { name: "Energize Resort", location: "Nashik" },
        img: realImages.brand.hospitalityPoolsideResort,
      },
      {
        name: "Institutional",
        tagline: "Civic architecture built to last generations.",
        feature: { name: "Babasaheb Ambedkar Bhavan", location: "Mumbai" },
        img: inst.aerial,
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
        tagline: "Interiors shaped by the lives lived within.",
        feature: { name: "Atelier Residence", location: "Mumbai" },
        img: res.gallery,
      },
      {
        name: "Commercial",
        tagline: "Workplaces where culture becomes spatial.",
        feature: { name: "Jade Pink Boutique", location: "Mumbai" },
        img: com.lounge,
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
      <header className="vx-head">
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
      </header>

      <div className="vx-grid">
        {/* LEFT — dominant image */}
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
                width={1400}
                height={1600}
                loading="lazy"
              />
            </AnimatePresence>
          </div>
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

        {/* RIGHT — sector list */}
        <div className="vx-list">
          <ul className="vx-sectors">
            {items.map((it, i) => {
              const isActive = i === idx;
              return (
                <li key={`${group.key}-${it.name}`} className={`vx-row${isActive ? " is-active" : ""}`}>
                  <button
                    type="button"
                    className="vx-row-btn"
                    data-hover
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
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
                  </button>
                </li>
              );
            })}
          </ul>

          <a className="vx-cta" href={group.href} data-hover>
            <span>Explore {group.label}</span>
            <span className="vx-cta-rule" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
