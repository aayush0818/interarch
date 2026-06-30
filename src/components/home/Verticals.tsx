import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import archCommercial from "@/assets/verticals/arch-commercial-new.png";
import intResidential from "@/assets/verticals/int-residential.jpg";
import intCommercial from "@/assets/verticals/int-commercial.jpg";
import verticalResidentialAsset from "@/assets/uploads/vertical-residential-2026.png.asset.json";
import verticalHospitalityAsset from "@/assets/uploads/vertical-hospitality-2026.png.asset.json";
import verticalInstitutionalAsset from "@/assets/uploads/vertical-institutional-via-2026.webp.asset.json";

const archResidential = verticalResidentialAsset.url;
const hospitalityImg = verticalHospitalityAsset.url;
const archInstitutional = verticalInstitutionalAsset.url;

type Vertical = {
  name: string;
  sectorSlug: string;
  tagline: string;
  feature: { name: string; location: string };
  img: string;
  focal?: string;
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
        img: archResidential,
        focal: "center 60%",
      },
      {
        name: "Commercial",
        sectorSlug: "commercial",
        tagline: "Workplaces and business environments designed to balance performance, presence, and experience.",
        feature: { name: "Meril Corporate HQ", location: "Vapi" },
        img: archCommercial,
        focal: "center 35%",
      },
      {
        name: "Hospitality",
        sectorSlug: "hospitality",
        tagline: "Destinations crafted to elevate comfort, atmosphere, and memorable guest experiences",
        feature: { name: "Energize Resort", location: "Nashik" },
        img: hospitalityImg,
        focal: "center 52%",
      },
      {
        name: "Institutional",
        sectorSlug: "institutional",
        tagline: "Spaces that serve communities through thoughtful planning, longevity, and purpose.",
        feature: { name: "Kanu Desai VIA Auditorium", location: "Vapi" },
        img: archInstitutional,
        focal: "center center",
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
        tagline: "Thoughtfully composed interiors that bring warmth, character, and everyday functionality together.",
        feature: { name: "Atelier Residence", location: "Mumbai" },
        img: intResidential,
        focal: "center 45%",
      },
      {
        name: "Commercial",
        sectorSlug: "commercial",
        tagline: "Interior environments designed to reflect brand identity while enhancing the way people work and interact.",
        feature: { name: "Monster Energy HQ", location: "Mumbai" },
        img: intCommercial,
        focal: "center 45%",
      },
    ],
  },
];

const FADE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

export function Verticals() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [active, setActive] = useState(0);
  // On touch devices, track which row the user has explicitly tapped.
  // First tap reveals (mouseenter from touch emulation pre-activates), second tap navigates.
  const [tapped, setTapped] = useState<number | null>(null);
  const group = groups[groupIdx];
  const items = group.items;
  const idx = Math.min(active, items.length - 1);
  const current = items[idx];
  const preloadSources = useMemo(() => Array.from(new Set(groups.flatMap((group) => group.items.map((item) => item.img)))), []);

  useEffect(() => {
    preloadSources.forEach((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [preloadSources]);

  return (
    <section className="vx-section">
      <div className="vx-grid">
        {/* LEFT - discipline tabs + sector list */}
        <div className="vx-list">
          <span className="vx-eyebrow">( 02 ) - Disciplines</span>

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
                    onClick={(e) => {
                      const isTouch =
                        typeof window !== "undefined" &&
                        (window.matchMedia?.("(hover: none), (max-width: 768px)").matches ?? false);
                      if (isTouch && tapped !== i) {
                        // First tap on this row: reveal only.
                        e.preventDefault();
                        e.stopPropagation();
                        setActive(i);
                        setTapped(i);
                      }
                    }}
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

        {/* RIGHT - contained image */}
        <div className="vx-media">
          <div className="vx-media-frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${group.key}-${current.name}-img`}
                src={current.img}
                alt={`${group.label} - ${current.name}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                loading={groupIdx === 0 && idx === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={groupIdx === 0 && idx === 0 ? "high" : "auto"}
                style={{ objectPosition: current.focal ?? "center center" }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
