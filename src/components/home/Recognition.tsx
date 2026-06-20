import awardDrdo2009 from "@/assets/awards/award-drdo-silver-jubilee-2009.jpg.asset.json";
import awardRachana2015 from "@/assets/awards/award-rachana-sansad-2015.jpg.asset.json";
import awardAica2010 from "@/assets/awards/award-aica-asia-fest-2010.jpg.asset.json";

const items = [
  {
    img: awardDrdo2009.url,
    category: "Institutional Trust",
    date: "25 Years",
    headline: "25 years of continuous service to DRDO, Ministry of Defence",
    href: "/awards",
  },
  {
    img: awardAica2010.url,
    category: "AICA Asia Fest",
    date: "2014–15",
    headline: "Commendation Award — Educational Bio Medical Academy",
    href: "/awards",
  },
  {
    img: awardRachana2015.url,
    category: "Academy of Architecture",
    date: "2015",
    headline: "Rachana Sansad Diamond Jubilee felicitation of Ar. Dipak Thaker",
    href: "/awards",
  },
];

export function Recognition() {
  return (
    <section className="recognition-section">
      <div className="recognition-grid">
        <div className="recognition-left">
          <h2 className="recognition-title">Awards</h2>
          <a className="idl-pill" href="/awards" data-hover>
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
