import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { realImages } from "@/data/realImages";

const { institutional: inst, residential: res, commercial: com } = realImages;

type Vertical = {
  name: string;
  headline: string;
  intro: string;
  onLabel: string;
  onText: string;
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
        headline: "Spaces that breathe with the rhythm of life.",
        intro:
          "A home is never just a structure. It is where memories are built over decades and where architecture quietly shapes everyday life. We design residences that balance aspiration with practicality.",
        onLabel: "On residential.",
        onText:
          "Homes shaped around people, routines and place — balancing privacy, openness and natural light to feel timeless and deeply personal.",
        feature: { name: "The Horizon House", location: "Lonavala" },
        img: res.exterior,
      },
      {
        name: "Commercial",
        headline: "Buildings that evolve with the work they hold.",
        intro:
          "Businesses change. Buildings must keep pace. Our commercial projects support growth and adaptability while shaping a clear architectural identity for the organisations they serve.",
        onLabel: "On commercial.",
        onText:
          "From offices to mixed-use developments, we create environments that support business growth while delivering a lasting architectural presence.",
        feature: { name: "Monster HQ", location: "Mumbai" },
        img: com.reception,
      },
      {
        name: "Hospitality",
        headline: "Destinations remembered long after the stay.",
        intro:
          "The best hospitality spaces stay with you. Through planning, atmosphere and detail, we craft destinations that feel welcoming, intuitive and deeply tied to the experience they hold.",
        onLabel: "On hospitality.",
        onText:
          "Compositions of arrival, connection and belonging — architecture that feels distinctive yet quietly timeless.",
        feature: { name: "Energize Resort", location: "Nashik" },
        img: realImages.brand.hospitalityPoolsideResort,
      },
      {
        name: "Institutional",
        headline: "Civic spaces built to last generations.",
        intro:
          "Institutional architecture carries a singular responsibility — to serve thousands, perform consistently, and stay relevant across decades. We design for enduring public use.",
        onLabel: "On institutional.",
        onText:
          "Educational, civic and public buildings rooted in functionality, accessibility and enduring value for the communities they serve.",
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
        headline: "Interiors shaped by the lives lived within.",
        intro:
          "Great interiors are not defined by trends but by how naturally they become part of everyday life. Our residential interiors are designed around the people who live in them.",
        onLabel: "On residential.",
        onText:
          "Through planning, material richness and detail, we create homes that feel comfortable, refined and unmistakably personal.",
        feature: { name: "Atelier Residence", location: "Mumbai" },
        img: res.gallery,
      },
      {
        name: "Commercial",
        headline: "Workplaces where culture becomes spatial.",
        intro:
          "A workplace is more than desks and meeting rooms. It reflects culture, shapes collaboration, and frames how people experience an organisation every day.",
        onLabel: "On commercial.",
        onText:
          "Workplaces and retail environments that turn brand values into spatial experiences — balancing function, culture and a strong visual identity.",
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
      <div className="vx-grid">
        {/* LEFT — discipline + sector + CTA */}
        <aside className="vx-rail">
          <nav className="vx-rail-top">
            <div className="vx-block">
              <span className="vx-eyebrow">Discipline</span>
              <div className="vx-discipline">
                {groups.map((g, i) => (
                  <button
                    key={g.key}
                    type="button"
                    className={`vx-discipline-btn${i === groupIdx ? " is-active" : ""}`}
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
            </div>

            <div className="vx-block vx-block--sector">
              <span className="vx-eyebrow">Sector</span>
              <div className="vx-sector-list">
                {items.map((it, i) => (
                  <button
                    key={`${group.key}-${it.name}`}
                    type="button"
                    className={`vx-sector-btn${i === idx ? " is-active" : ""}`}
                    data-hover
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    {it.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <a className="vx-cta" href={group.href} data-hover>
            <span>Explore {group.label}</span>
            <span className="vx-cta-rule" aria-hidden />
          </a>
        </aside>

        {/* MIDDLE — editorial copy */}
        <div className="vx-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${group.key}-${current.name}-copy`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={FADE}
              className="vx-copy-inner"
            >
              <span className="vx-num">( {String(idx + 1).padStart(2, "0")} )</span>
              <h2 className="vx-headline">{current.headline}</h2>
              <p className="vx-intro">{current.intro}</p>

              <div className="vx-on">
                <p className="vx-on-text">
                  <strong className="vx-on-label">{current.onLabel}</strong> {current.onText}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — dominant image */}
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
                width={1200}
                height={1500}
                loading="lazy"
              />
            </AnimatePresence>
          </div>
          <div className="vx-media-badge">
            <p className="vx-media-badge-name">{current.feature.name}</p>
            <p className="vx-media-badge-loc">{current.feature.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
