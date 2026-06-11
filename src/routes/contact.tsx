import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { contactCopy } from "@/data/siteContent";
import { realImages } from "@/data/realImages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Interarch Design Labs" },
      { name: "description", content: contactCopy.subline },
      { property: "og:title", content: "Contact — IDL" },
      { property: "og:description", content: contactCopy.subline },
    ],
  }),
  component: ContactPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function ContactPage() {
  const [sent, setSent] = useState(false);

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
                { label: "Your name", name: "name", type: "text", ph: "Anya Rangwala" },
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
                <textarea name="message" rows={4} placeholder="Site, scale, timeline — anything that helps us listen." required />
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
        </div>

        <aside className="idlx-contact-info">
          <Reveal>
            <h3>Studios</h3>
            {contactCopy.studios.map((s) => (
              <div key={s.city} style={{ marginTop: 18 }}>
                <strong>{s.city}</strong>
                <p>{s.address}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.12}>
            <h3>Write</h3>
            <p style={{ marginTop: 10 }}>
              <a href={`mailto:${contactCopy.email}`} data-hover>{contactCopy.email}</a>
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <h3>Regions</h3>
            <p style={{ marginTop: 10 }}>{contactCopy.regions}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="idlx-contact-img">
              <img src={realImages.commercial.reception} alt="Interarch Design Labs interior" loading="lazy" />
            </div>
          </Reveal>
        </aside>
      </main>
      <Footer />
    </>
  );
}
