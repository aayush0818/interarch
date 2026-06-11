import { realImages } from "@/data/realImages";
import { projects } from "@/data/projects";

const { institutional: inst, residential: res, commercial: com } = realImages;

const grid: Array<{ img: string; slug?: string; span: "wide" | "tall" }> = [
  { img: inst.aerial, slug: projects[0]?.slug, span: "wide" },
  { img: res.gallery, slug: projects[1]?.slug, span: "tall" },
  { img: com.lounge, slug: projects[2]?.slug, span: "tall" },
  { img: inst.pool, slug: projects[3]?.slug, span: "tall" },
  { img: res.warm, slug: projects[4]?.slug, span: "tall" },
  { img: com.boutiquePanorama, slug: projects[5]?.slug, span: "wide" },
];


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
        {grid.map((cell, i) => (
          <a
            key={i}
            href={cell.slug ? `/project/${cell.slug}` : "/projects"}
            className={`works-card works-card--${cell.span}`}
            data-hover
          >
            <div className="img-reveal-wrap works-drop-wrap">
              <div className="img-parallax">
                <img src={cell.img} alt="" className="object-fill" loading={i < 2 ? "eager" : "lazy"} decoding="async" />
              </div>
            </div>
            <span className="works-card-label">View Project →</span>
          </a>
        ))}
      </div>
    </section>
  );
}


