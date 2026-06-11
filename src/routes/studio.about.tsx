import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { realImages } from "@/data/realImages";

const studioHero = realImages.institutional.aerial;
const studioCulture = realImages.residential.stair;
const teamHero = realImages.residential.exterior;
const work2 = realImages.residential.atrium;
const work4 = realImages.residential.doubleheight;

import {
  aboutCopy,
  mission,
  vision,
  values,
  idlStudioNarrative,
  rangeOfExperience,
  recognitionList,
  cultureBlocks,
} from "@/data/siteContent";

export const Route = createFileRoute("/studio/about")({
  head: () => ({
    meta: [
      { title: "About — Studio · Interarch Design Labs" },
      { name: "description", content: aboutCopy.intro.slice(0, 160) },
      { property: "og:title", content: "About — Studio · IDL" },
      { property: "og:description", content: aboutCopy.intro.slice(0, 160) },
      { property: "og:image", content: studioHero },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <CinematicHero
        image={studioHero}
        alt="Interarch Design Labs studio"
        eyebrow={aboutCopy.eyebrow}
        title={aboutCopy.headline}
        meta="Mumbai · Ahmedabad — Est. 1989"
      />

      {/* Manifesto */}
      <section className="idlx-section">
        <div className="idlx-manifesto">
          <Reveal>
            <MaskText as="h2" className="idlx-h2">
              {`Where rigorous intent\nmeets modern refinement.`}
            </MaskText>
          </Reveal>
          <Reveal delay={0.15} className="idlx-manifesto-body">
            <p className="idlx-lead">{aboutCopy.intro}</p>
            <p className="idlx-body idlx-body--lg">{aboutCopy.body}</p>
            <p className="idlx-body idlx-body--lg">{aboutCopy.legacy}</p>
          </Reveal>
        </div>
      </section>

      {/* Pullquote */}
      <section className="idlx-pullquote idlx-section--bordered">
        <Reveal>
          <p>{aboutCopy.signoff}</p>
        </Reveal>
      </section>

      {/* Mission / Vision / Values */}
      <section className="idlx-section idlx-section--bordered">
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> The conviction</span>
        </Reveal>
        <div style={{ height: 60 }} />
        <div className="idlx-mvv">
          <Reveal>
            <div className="idlx-mvv-block">
              <span className="idlx-eyebrow">{mission.eyebrow}</span>
              <p className="idlx-lead" style={{ fontSize: "clamp(20px,1.8vw,26px)" }}>{mission.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="idlx-mvv-block">
              <span className="idlx-eyebrow">{vision.eyebrow}</span>
              <p className="idlx-lead" style={{ fontSize: "clamp(20px,1.8vw,26px)" }}>{vision.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="idlx-mvv-block">
              <span className="idlx-eyebrow">— Values</span>
              <p className="idlx-body">Four principles that hold every project — small or civic — to the same line of intent.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values list */}
      <section className="idlx-section--sm" style={{ padding: "0 clamp(28px,6vw,120px) clamp(80px,12vw,160px)" }}>
        <div className="idlx-values">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="idlx-value-row">
                <span className="idlx-value-n">{v.n}</span>
                <span className="idlx-value-title">{v.title}</span>
                <span className="idlx-value-body">{v.body}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Split: IDL Studio narrative */}
      <div className="idlx-split">
        <div className="idlx-split-img">
          <Reveal>
            <img src={studioCulture} alt="Studio life — drawings, samples and the long table" loading="lazy" />
          </Reveal>
        </div>
        <div className="idlx-split-body">
          <Reveal>
            <span className="idlx-eyebrow">{idlStudioNarrative.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <MaskText as="h2" className="idlx-h2">{idlStudioNarrative.headline}</MaskText>
          </Reveal>
          {idlStudioNarrative.body.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.08}>
              <p className="idlx-body idlx-body--lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Range of experience */}
      <section className="idlx-section idlx-section--bordered">
        <div className="idlx-manifesto">
          <Reveal>
            <span className="idlx-eyebrow">{rangeOfExperience.eyebrow}</span>
            <MaskText as="h2" className="idlx-h2" delay={0.1}>{`A studio with reach\nand a steady register.`}</MaskText>
          </Reveal>
          <Reveal delay={0.15} className="idlx-manifesto-body">
            <p className="idlx-lead">{rangeOfExperience.intro}</p>
            <div className="idlx-values" style={{ marginTop: 24 }}>
              {rangeOfExperience.partners.map((p) => (
                <div key={p.note} className="idlx-value-row">
                  <span className="idlx-value-n">{p.y}</span>
                  <span className="idlx-value-body" style={{ gridColumn: "2 / -1" }}>{p.note}</span>
                </div>
              ))}
            </div>
            <ul className="idlx-bullets" style={{ marginTop: 24 }}>
              {rangeOfExperience.fields.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Recognition */}
      <section className="idlx-section idlx-section--bordered">
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Industry Recognition</span>
          <h2 className="idlx-h2" style={{ marginTop: 24, maxWidth: 760 }}>Quiet acknowledgement, over three decades.</h2>
        </Reveal>
        <div style={{ height: 60 }} />
        <div className="idlx-awards">
          {recognitionList.map((r, i) => (
            <Reveal key={r.award} delay={i * 0.04}>
              <div className="idlx-award-row">
                <span className="idlx-award-year">{r.year}</span>
                <span className="idlx-award-name">{r.award}</span>
                <span className="idlx-award-note">{r.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marquee — image strip */}
      <Marquee speed={50}>
        <span>— Mumbai · Ahmedabad · India · Middle East · Africa</span>
        <span>— Architecture · Interiors · Planning · Engineering</span>
        <span>— Residential · Hospitality · Institutional · Workplace</span>
      </Marquee>

      {/* Culture / Internships / Mentorship / Working at IDL */}
      <section className="idlx-section idlx-section--bordered">
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Culture</span>
          <h2 className="idlx-h2" style={{ marginTop: 24, maxWidth: 760 }}>How the studio works, every day.</h2>
        </Reveal>
        <div style={{ height: 60 }} />
        <div className="idlx-culture">
          {cultureBlocks.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="idlx-culture-card">
                <span className="idlx-eyebrow">{c.eyebrow}</span>
                <h3 className="idlx-h3">{c.title}</h3>
                <p className="idlx-body idlx-body--lg">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Strip */}
      <div className="idlx-split">
        <div className="idlx-split-img"><img src={teamHero} alt="The leadership" /></div>
        <div className="idlx-split-img"><img src={work2} alt="Architectural detail" /></div>
      </div>

      {/* CTA */}
      <section className="idlx-cta idlx-section--bordered">
        <Reveal>
          <p className="idlx-lead" style={{ maxWidth: 720 }}>Meet the four partners — and the studio behind every project.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/studio/team" className="idlx-cta-link" data-hover>The leadership →</Link>
        </Reveal>
        <img src={work4} alt="" loading="lazy" style={{ display: "none" }} />
      </section>
    </>
  );
}
