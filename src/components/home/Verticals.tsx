import { useState } from "react";
import { realImages } from "@/data/realImages";
import mb56 from "@/assets/meril-bld-5-6-1.png.asset.json";
import dcp from "@/assets/d-cp-office-belapur-1.jpg.asset.json";

const { institutional: inst, residential: res, commercial: com } = realImages;

const items = [
  {
    name: "Residential",
    href: "/expertise/residential",
    desc: "Apartments, bungalows and villas — composed around light, view, and movement.",
    img: res.gallery,
  },
  {
    name: "Commercial",
    href: "/expertise/commercial",
    desc: "Workplaces and retail that translate brand identity into spatial performance.",
    img: com.lounge,
  },
  {
    name: "Hospitality",
    href: "/expertise/hospitality",
    desc: "Hotels and retreats choreographed through warmth, sequence and view.",
    img: realImages.brand.hospitalityPoolsideResort,
  },
  {
    name: "Industrial",
    href: "/expertise/industrial",
    desc: "Factories and R&D campuses shaped with rigour, light and material intelligence.",
    img: mb56.url,
  },
  {
    name: "Institutional",
    href: "/expertise/institutional",
    desc: "Civic buildings designed for long life, accessibility and quiet presence.",
    img: inst.aerial,
  },
  {
    name: "Workplace",
    href: "/expertise/workplace",
    desc: "Offices and workspaces where culture, focus and collaboration are made spatial.",
    img: dcp.url,
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
