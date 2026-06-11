import { useState } from "react";
import { realImages } from "@/data/realImages";

const { institutional: inst, residential: res, commercial: com } = realImages;

const items = [
  {
    name: "Residential",
    href: "/expertise/residential",
    desc: "Apartments, bungalows and villas conceived for privacy, openness and a seamless connection to the outdoors. Every decision, from plan to finish, supports daily life with calm precision.",
    img: res.gallery,
  },
  {
    name: "Commercial",
    href: "/expertise/commercial",
    desc: "Workplaces and retail environments that translate brand identity into spatial performance. Designed for productivity, culture and adaptability — now and into future growth.",
    img: com.lounge,
  },
  {
    name: "Institutional",
    href: "/expertise/institutional",
    desc: "Buildings that serve public life with clarity and durability. Schools, civic centres and cultural landmarks designed for long-term relevance, efficiency and civic presence.",
    img: inst.aerial,
  },
  {
    name: "Hospitality",
    href: "/expertise/hospitality",
    desc: "Bespoke hospitality interiors that elevate lifestyle — choreographed through warmth, sequence, tactility and the careful art of arrival.",
    img: realImages.brand.hospitalityPoolsideResort,
  },
  {
    name: "Industrial",
    href: "/expertise/industrial",
    desc: "Functional environments designed with the same rigour and material intelligence as our finest interiors. Performance and presence, unified.",
    img: inst.tower,
  },
  {
    name: "Workplace",
    href: "/expertise/workplace",
    desc: "Spaces that balance the needs of individuals and teams. Culture made visible through architecture and interior design.",
    img: com.boardroom,
  },
];

export function Verticals() {
  const [active, setActive] = useState(0);
  return (
    <section className="verticals-section">
      <div className="verticals-left">
        <div className="verticals-names">
          {items.map((it, i) => (
            <button
              key={it.name}
              className={`v-name${i === active ? " active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              type="button"
              data-hover
            >
              {it.name}
            </button>
          ))}
        </div>
        <div className="verticals-center">
          {items.map((it, i) => (
            <div key={it.name} className={`v-desc${i === active ? " visible" : ""}`}>
              <div className="v-desc-label">({String(i + 1).padStart(2, "0")})</div>
              <p className="v-desc-text">{it.desc}</p>
              <a className="v-desc-btn" href={it.href} data-hover>
                Explore {it.name} →
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="v-image-panel">
        {items.map((it, i) => (
          <img
            key={it.name}
            src={it.img}
            alt={`${it.name} architecture`}
            className={i === active ? "active" : ""}
            width={1200}
            height={1500}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </section>
  );
}
