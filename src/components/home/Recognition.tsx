import { realImages } from "@/data/realImages";

const { institutional: inst, commercial: com } = realImages;

const items = [
  {
    img: inst.pool,
    category: "Civic Recognition",
    date: "2010",
    headline: "Chief Minister of Maharashtra Award — Babasaheb Ambedkar Bhavan",
    href: "/news/awards",
  },
  {
    img: inst.tower,
    category: "Institutional Trust",
    date: "25 Years",
    headline: "25 years of continuous service to DRDO, Ministry of Defence",
    href: "/news/awards",
  },
  {
    img: com.reception,
    category: "Academy of Architecture",
    date: "2015",
    headline: "Rachana Sansad Diamond Jubilee felicitation of Ar. Dipak Thaker",
    href: "/news/awards",
  },
];

export function Recognition() {
  return (
    <section className="recognition-section">
      <div className="recognition-grid">
        <div className="recognition-left">
          <h2 className="recognition-title">Awards</h2>
          <a className="idl-pill" href="/news/awards" data-hover>
            View archive
          </a>
        </div>
        <div className="recognition-cards">
          {items.map((a, i) => (
            <a key={i} href={a.href} className="rec-card" data-hover>
              <div className="rec-card-img static-image-wrap">
                <img src={a.img} alt="" width={960} height={1280} loading="lazy" />
              </div>
              <div className="rec-card-rule" />
              <div className="rec-card-meta">
                <span>{a.category}</span>
                <span>{a.date}</span>
              </div>
              <div className="rec-card-headline">{a.headline}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
