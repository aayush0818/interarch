import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Link2 } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { contactCopy } from "@/data/siteContent";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Interarch Design Labs" },
      { name: "description", content: contactCopy.subline },
      { property: "og:title", content: "Contact - IDL" },
      { property: "og:description", content: contactCopy.subline },
    ],
  }),
  component: ContactPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const SRC = "https://elfsightcdn.com/platform.js";
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);



  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page idlx-contact">
        <div className="idlx-contact-form">
          <Reveal>
            <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> {contactCopy.eyebrow.replace(/^—\s*/, "")}</span>
          </Reveal>
          <MaskText as="h1" className="idlx-contact-head" delay={0.15}>{contactCopy.headline}</MaskText>
          <Reveal delay={0.35}>
            <p className="idlx-contact-sub">{contactCopy.subline}</p>
          </Reveal>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ marginTop: 40 }}
            >
              <p className="idlx-lead">Thank you. The studio will write back with care.</p>
            </motion.div>
          ) : (
            <motion.form
              className="idlx-cform"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
            >
              {[
                { label: "Your name", name: "name", type: "text", ph: "Full name" },
                { label: "Email", name: "email", type: "email", ph: "you@studio.com" },
                { label: "Project type", name: "type", type: "text", ph: "Residence, workplace, hospitality…" },
                { label: "Location", name: "loc", type: "text", ph: "City, country" },
              ].map((f) => (
                <motion.label
                  key={f.name}
                  className="idlx-field"
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <label>{f.label}</label>
                  <input type={f.type} name={f.name} placeholder={f.ph} required />
                </motion.label>
              ))}
              <motion.label
                className="idlx-field"
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <label>Tell us about the project</label>
                <textarea name="message" rows={4} placeholder="Site, scale, timeline - anything that helps us listen." required />
              </motion.label>
              <motion.button
                type="submit"
                className="idlx-submit"
                data-hover
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                Send the letter →
              </motion.button>
            </motion.form>
          )}

          <Reveal delay={0.3} className="idlx-ig-block">
            <h3 className="idlx-ig-h">Instagram</h3>
            <p className="idlx-ig-lead">
              Follow our latest projects, publications, studio updates, and architectural insights.
            </p>
            <div className="idlx-ig-feed" suppressHydrationWarning>
              {mounted ? (
                <div
                  className="elfsight-app-41b2e8ed-d5a5-4d65-9789-65526979679e"
                  data-elfsight-app-lazy
                />
              ) : null}
            </div>
            <div className="idlx-social-icons" aria-label="Social links">
              <a href={contactCopy.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" data-hover>
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a href={contactCopy.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-hover>
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
              <a href={contactCopy.linktree} target="_blank" rel="noreferrer" aria-label="Linktree" data-hover>
                <Link2 size={22} strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>
        </div>



        <aside className="idlx-contact-info">
          <Reveal>
            <h3>Studios</h3>
            {contactCopy.studios.map((s) => (
              <div key={s.city} style={{ marginTop: 18 }}>
                <strong>{s.city}</strong>
                <p style={{ whiteSpace: "pre-line" }}>{s.address}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.12}>
            <h3>Write & Call</h3>
            <p style={{ marginTop: 10 }}>
              <a href={`mailto:${contactCopy.email}`} data-hover>{contactCopy.email}</a>
            </p>
            <p style={{ marginTop: 6 }}>
              <a href={contactCopy.phoneHref} data-hover>{contactCopy.phone}</a>
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <h3>Follow</h3>
            <div className="idlx-social-icons" style={{ marginTop: 12 }} aria-label="Social links">
              <a href={contactCopy.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" data-hover>
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a href={contactCopy.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-hover>
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
              <a href={contactCopy.linktree} target="_blank" rel="noreferrer" aria-label="Linktree" data-hover>
                <Link2 size={22} strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <h3>Visit</h3>
            <div style={{ marginTop: 14, width: "100%", aspectRatio: "4 / 3", overflow: "hidden", border: "1px solid var(--stone)" }}>
              <iframe
                title="Interarch Design Lab - Mumbai office location"
                src={contactCopy.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p style={{ marginTop: 10 }}>
              <a href={contactCopy.mapLink} target="_blank" rel="noreferrer" data-hover>Open in Google Maps →</a>
            </p>
          </Reveal>
        </aside>
      </main>
      <Footer />
    </>
  );
}
