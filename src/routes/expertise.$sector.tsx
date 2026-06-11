import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { sectors } from "@/data/siteContent";
import { projectsBySector } from "@/data/projects";

export const Route = createFileRoute("/expertise/$sector")({
  beforeLoad: ({ params }) => {
    if (!sectors.find((s) => s.slug === params.sector)) throw redirect({ to: "/expertise" });
  },
  head: ({ params }) => {
    const s = sectors.find((x) => x.slug === params.sector);
    return {
      meta: [
        { title: `${s?.name ?? "Sector"} — Expertise · IDL` },
        { name: "description", content: s?.statement?.slice(0, 160) ?? "" },
        { property: "og:title", content: `${s?.name} — Expertise · IDL` },
        { property: "og:description", content: s?.statement?.slice(0, 160) ?? "" },
        ...(s?.image ? [{ property: "og:image", content: s.image }] : []),
      ],
    };
  },
  component: SectorPage,
});

function SectorPage() {
  const { sector } = Route.useParams();
  const data = sectors.find((s) => s.slug === sector)!;
  // Map slug to old sector name for project list — gracefully empty otherwise
  const sectorMap: Record<string, string> = {
    residential: "Residential",
    commercial: "Commercial",
    institutional: "Institutional",
    hospitality: "Hospitality",
    industrial: "Industrial",
    workplace: "Workplace",
  };
  const list = projectsBySector(sectorMap[sector] ?? data.name);

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <CinematicHero
          image={data.image}
          alt={data.name}
          eyebrow={`— Expertise / ${data.name}`}
          title={data.name + "."}
          height="full"
        />

        {/* Intro with drop-cap */}
        <section className="idlx-sector-intro">
          <Reveal>
            <MaskText as="h2" className="idlx-h2">{`On ${data.name.toLowerCase()}.`}</MaskText>
          </Reveal>
          <Reveal delay={0.12}>
            <p>{data.statement}</p>
          </Reveal>
        </section>

        {Array.isArray((data as { gallery?: string[] }).gallery) && (data as { gallery?: string[] }).gallery!.length > 0 ? (
          <div className="idlx-sector-band">
            {(data as { gallery?: string[] }).gallery!.map((g, i) => (
              <Reveal key={g + i} delay={(i % 3) * 0.06}>
                <div className="idlx-sector-band-img">
                  <img src={g} alt={`${data.name} ${i + 1}`} loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* Sub-spread for Residential or bullets for Sustainability */}
        {data.sub ? (
          <div className="idlx-sub-spread">
            {data.sub.map((sub, i) => (
              <Reveal key={sub.title} delay={i * 0.08}>
                <article className="idlx-sub-card">
                  <div className="idlx-sub-card-img">
                    <img src={(sub as { image?: string }).image ?? data.image} alt={sub.title} loading="lazy" />
                  </div>
                  <h3 className="idlx-h3" style={{ marginTop: 8 }}>{sub.title}</h3>
                  <p className="idlx-body idlx-body--lg">{sub.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}

        {data.bullets ? (
          <section className="idlx-section idlx-section--bordered">
            <div className="idlx-manifesto">
              <Reveal>
                <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Practice</span>
                <MaskText as="h2" className="idlx-h2" delay={0.1}>{`How we design\nfor longevity.`}</MaskText>
              </Reveal>
              <Reveal delay={0.18} className="idlx-manifesto-body">
                <ul className="idlx-bullets">
                  {data.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* Related work filmstrip */}
        {list.length > 0 && (
          <>
            <section className="idlx-section--sm" style={{ padding: "clamp(60px,8vw,100px) clamp(28px,6vw,100px) 40px" }}>
              <Reveal>
                <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Selected work</span>
                <h2 className="idlx-h2" style={{ marginTop: 18, maxWidth: 720 }}>{data.name} in practice.</h2>
              </Reveal>
            </section>
            <div className="idlx-filmstrip">
              {list.map((p) => (
                <Link key={p.slug} to="/project/$slug" params={{ slug: p.slug }} data-hover>
                  <div className="idlx-filmstrip-img">
                    <img src={p.cover} alt={p.name} loading="lazy" />
                  </div>
                  <div className="idlx-pcard2-cap">
                    <span className="idlx-pcard2-name">{p.name}</span>
                    <span className="idlx-pcard2-meta">{p.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <section className="idlx-cta idlx-section--bordered">
          <Reveal>
            <p className="idlx-lead">Begin a {data.name.toLowerCase()} project with the studio.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/contact" className="idlx-cta-link" data-hover>Contact →</Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
