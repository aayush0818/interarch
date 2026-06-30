import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";


import heroImg from "@/assets/idl/PAB9031-HDR.jpg.asset.json";
import mvvImg from "@/assets/idl/PAB9056-HDR.jpg.asset.json";

import cultureLeftImg from "@/assets/idl/PAB9071-HDR.jpg.asset.json";
import cultureRightImg from "@/assets/idl/PAB8838-HDR.jpg.asset.json";
import bottomSplitOne from "@/assets/idl/PAB9081-HDR.jpg.asset.json";
import bottomSplitTwo from "@/assets/idl/PAB9186-HDR.jpg.asset.json";
import boardroomImg from "@/assets/idl/about-split-1.png.asset.json";
import manifestoImg from "@/assets/PAB9021-HDR_1.jpg.asset.json";
import splitTwoImg from "@/assets/idl/about-split-2.png.asset.json";

const studioHero = heroImg.url;

import {
  aboutCopy,
  mission,
  vision,
  values,
  recognitionList,
  cultureBlocks,
} from "@/data/siteContent";

export const Route = createFileRoute("/studio/about")({
  head: () => ({
    meta: [
      { title: "About - Studio · Interarch Design Labs" },
      { name: "description", content: aboutCopy.intro.slice(0, 160) },
      { property: "og:title", content: "About - Studio · IDL" },
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
        meta="Mumbai - Est. 1989"
        className="studio-about-hero"
      />

      {/* Manifesto */}
      <section className="idlx-section">
        <div className="idlx-manifesto">
          <div>
            <Reveal>
              <img
                src={boardroomImg.url}
                alt="Interarch Design Labs studio"
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Reveal>
          </div>
          <Reveal delay={0.15} className="idlx-manifesto-body">
            <p className="idlx-body idlx-body--lg">{aboutCopy.intro}</p>
            <p className="idlx-body idlx-body--lg">{aboutCopy.body}</p>
            <p className="idlx-body idlx-body--lg">{aboutCopy.legacy}</p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="idlx-section idlx-section--bordered">
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> The conviction</span>
        </Reveal>
        <div style={{ height: 36 }} />
        <div className="idlx-mvv" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
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
        </div>
      </section>

      {/* Values list */}
      <section className="idlx-section--sm" style={{ padding: "0 clamp(28px,6vw,120px) clamp(56px,8vw,96px)" }}>
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

      {/* Full bleed image break */}
      <div style={{ width: "100%", aspectRatio: "21 / 9", overflow: "hidden" }}>
        <Reveal>
          <img src={mvvImg.url} alt="IDL studio detail" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </Reveal>
      </div>

      {/* Full-width manifesto image */}
      <div style={{ width: "100%", overflow: "hidden", marginTop: "clamp(40px, 6vw, 96px)" }}>
        <Reveal>
          <img src={manifestoImg.url} alt="Interarch Design Labs studio interior" loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
        </Reveal>
      </div>

      {/* Split image break */}
      <div className="idlx-split">
        <div className="idlx-split-img"><img src={cultureLeftImg.url} alt="Studio interior" loading="lazy" /></div>
      </div>

      {/* Recognition */}
      <section className="idlx-section idlx-section--bordered">
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Industry Recognition</span>
          <h2 className="idlx-h2" style={{ marginTop: 20, maxWidth: 760 }}>Quiet acknowledgement, over three decades.</h2>
        </Reveal>
        <div style={{ height: 40 }} />
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

      {/* Marquee */}
      <Marquee speed={50}>
        <span>Mumbai · India</span>
        <span>Architecture · Interiors · Planning · Engineering</span>
        <span>Residential · Commercial · Hospitality · Industrial · Institutional · Workplace</span>
      </Marquee>

      {/* Culture */}
      <section className="idlx-section idlx-section--bordered">
        <Reveal>
          <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Culture</span>
          <h2 className="idlx-h2" style={{ marginTop: 20, maxWidth: 760 }}>How the studio works, every day.</h2>
        </Reveal>
        <div style={{ height: 40 }} />
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

      {/* Closing split */}
      <div className="idlx-split">
        <div className="idlx-split-img"><img src={bottomSplitOne.url} alt="Studio detail" loading="lazy" /></div>
        <div className="idlx-split-img"><img src={bottomSplitTwo.url} alt="Studio detail" loading="lazy" /></div>
      </div>

      {/* CTA — cross-navigate to the other studio chapters */}
      <section className="idlx-cta idlx-section--bordered">
        <Reveal>
          <p className="idlx-lead" style={{ maxWidth: 720 }}>Continue through the studio.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="idlx-cta-links">
            <Link to="/studio/directors" className="idlx-cta-link" data-hover>Meet the Directors →</Link>
            <Link to="/studio/history" className="idlx-cta-link" data-hover>Read our Legacy →</Link>
          </div>
        </Reveal>
        <img src={cultureRightImg.url} alt="" loading="lazy" style={{ display: "none" }} />
      </section>
    </>
  );
}
