import { projects } from "@/data/projects";

const slugs = [
  "lantern-villa",
  "meril-park-1",
  "monster",
  "mvvpl-hilltop-hotel",
  "panorama-house",
  "quest-ajay-seth",
  "house-of-layers",
];

const spans: Array<"wide" | "tall"> = ["wide", "tall", "tall", "tall", "tall", "wide", "wide"];

const picks = slugs
  .map((s, i) => {
    const p = projects.find((x) => x.slug === s);
    return p ? { img: p.cover, slug: p.slug, name: p.name, span: spans[i] } : null;
  })
  .filter(Boolean) as Array<{ img: string; slug: string; name: string; span: "wide" | "tall" }>;

export function FeaturedWorks() {
  return (
    <section className="works-section idl-section">
      <div className="works-header">
        <h2 className="idl-section-title">Selected Works</h2>
        <a className="works-viewall" href="/projects" data-hover>
          View all works →
        </a>
      </div>

      <div className="works-grid">
        {picks.map((cell, i) => (
          <a
            key={cell.slug}
            href={`/project/${cell.slug}`}
            className={`works-card works-card--${cell.span}`}
            data-hover
          >
            <div className="img-reveal-wrap works-drop-wrap">
              <div className="img-parallax">
                <img src={cell.img} alt={cell.name} className="object-fill" loading={i < 2 ? "eager" : "lazy"} decoding="async" />
              </div>
            </div>
            <span className="works-card-label">View Project →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
