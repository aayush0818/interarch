import { useState } from "react";
import { realImages } from "@/data/realImages";

const { institutional: inst, residential: res, commercial: com } = realImages;

type Vertical = {
  name: string;
  intro: string;
  statement: string;
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
        intro:
          "A home is never just a structure. It's where memories are built over decades and where architecture quietly shapes everyday life. We design residences that balance aspiration with practicality, creating spaces that feel as relevant twenty years from now as they do on the day they're handed over.",
        statement:
          "Homes shaped around people, routines and place. We design residences that balance privacy, openness and natural light, creating environments that feel timeless, personal and deeply connected to everyday living.",
        img: res.exterior,
      },
      {
        name: "Commercial",
        intro:
          "Businesses evolve. Buildings must evolve with them. Our commercial projects are designed to support growth, efficiency, and long-term adaptability while creating a strong architectural identity that reflects the ambition of the organisations they serve.",
        statement:
          "Buildings that express identity through clarity and purpose. From offices to mixed-use developments, we create commercial environments that support business growth while delivering lasting architectural presence.",
        img: com.reception,
      },
      {
        name: "Hospitality",
        intro:
          "The best hospitality spaces are remembered long after the stay is over. Through thoughtful planning, atmosphere, and attention to detail, we create destinations that feel welcoming, intuitive, and deeply connected to the experience they are meant to deliver.",
        statement:
          "Destinations designed around experience, comfort and memory. Every hospitality project is carefully composed to create a sense of arrival, connection and belonging through architecture that feels both distinctive and timeless.",
        img: realImages.brand.hospitalityPoolsideResort,
      },
      {
        name: "Institutional",
        intro:
          "Institutional architecture carries a unique responsibility. It must serve thousands of people, perform consistently over time, and remain relevant across generations. Our approach focuses on creating enduring spaces that support learning, community, culture, and public engagement with equal importance.",
        statement:
          "Spaces that serve communities with responsibility and longevity. We design educational, civic and public buildings that prioritise functionality, accessibility and enduring value for generations to come.",
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
        intro:
          "Great interiors aren't defined by trends. They're defined by how naturally they become a part of everyday life. Our residential interiors are designed around the people who live in them, combining comfort, character, and craftsmanship to create spaces that feel personal and timeless.",
        statement:
          "Interiors crafted to reflect the lives lived within them. Through thoughtful planning, material richness and attention to detail, we create homes that feel comfortable, refined and deeply personal.",
        img: res.gallery,
      },
      {
        name: "Commercial",
        intro:
          "A workplace is more than desks and meeting rooms. It reflects culture, influences collaboration, and shapes the way people experience an organisation every day. We create commercial interiors that bring together functionality, efficiency, and identity to support the people who use them.",
        statement:
          "Workplaces and retail environments that transform brand values into spatial experiences. Designed to support productivity, culture and engagement, each space balances functionality with a strong visual identity.",
        img: com.lounge,
      },
    ],
  },
];

export function Verticals() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [active, setActive] = useState(0);
  const group = groups[groupIdx];
  const items = group.items;
  const current = items[Math.min(active, items.length - 1)];

  return (
    <section className="verticals-section">
      <div className="verticals-left">
        <div className="v-tabs" role="tablist" aria-label="Discipline">
          {groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={i === groupIdx}
              className={`v-tab${i === groupIdx ? " active" : ""}`}
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

        <div className="verticals-names">
          {items.map((it, i) => (
            <button
              key={it.name}
              className={`v-name${i === active ? " active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
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
              <p className="v-desc-text">{it.intro}</p>
              <p className="v-desc-text v-desc-text--quiet">
                <em>On {it.name.toLowerCase()}.</em> {it.statement}
              </p>
              <a className="v-desc-btn" href={group.href} data-hover>
                Explore {group.label} →
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="v-image-panel">
        {items.map((it, i) => (
          <img
            key={`${group.key}-${it.name}`}
            src={it.img}
            alt={`${group.label} — ${it.name}`}
            className={i === active ? "active" : ""}
            width={1200}
            height={1500}
            loading={i === 0 && groupIdx === 0 ? "eager" : "lazy"}
          />
        ))}
        {/* Force re-render image transitions per current */}
        <span hidden aria-hidden>{current.name}</span>
      </div>
    </section>
  );
}
