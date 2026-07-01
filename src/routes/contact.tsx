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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Interarch Design Labs",
          url: "/contact",
          telephone: "+912240885587",
          email: "info@interarchdesignlabs.com",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "Unit No 205, Peninsula Centre, Co-Op Premises Society Ltd, Dr. S. S. Rao Marg, Parel East",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400012",
            addressCountry: "IN",
          },
          sameAs: [
            "https://www.instagram.com/interarchdesignlabs/",
            "https://www.linkedin.com/company/interarch-design-lab/",
            "https://linktr.ee/interarchdesignlab",
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;
const careerRoles = [
  "Sr. Architect",
  "Architect",
  "Interior Designer",
  "Draftsman",
  "3D Visualizer",
  "Site Supervisor",
  "Project Manager",
  "Marketing",
  "Social Media",
  "Administration",
  "Other",
] as const;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [careerSent, setCareerSent] = useState(false);
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

          <section className="idlx-careers-block">
            <Reveal>
              <span className="idlx-eyebrow"><span className="idlx-eyebrow-dot" /> Work With Us</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="idlx-careers-head">Work With Us</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="idlx-careers-sub">
                We're always looking for passionate & creative thinkers who care about thoughtful design and attention to detail.
              </p>
              <p className="idlx-careers-sub">
                If you believe great spaces are built through curiosity, collaboration, and craftsmanship, we'd love to hear from you.
              </p>
            </Reveal>

            {careerSent ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                style={{ marginTop: 32 }}
              >
                <p className="idlx-lead">Thank you. We’ll review your profile and get in touch if there’s a fit.</p>
              </motion.div>
            ) : (
              <motion.form
                className="idlx-cform idlx-cform--career"
                onSubmit={(e) => { e.preventDefault(); setCareerSent(true); }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
              >
                <motion.div className="idlx-form-section" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <h3>Personal Details</h3>
                </motion.div>
                {[
                  { label: "Full Name*", name: "fullName", type: "text", ph: "Full name", required: true },
                  { label: "Email Address*", name: "emailAddress", type: "email", ph: "you@example.com", required: true },
                  { label: "Mobile Number*", name: "mobile", type: "tel", ph: "+91", required: true },
                  { label: "Current City*", name: "city", type: "text", ph: "City", required: true },
                ].map((f) => (
                  <motion.label key={f.name} className="idlx-field" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                    <label>{f.label}</label>
                    <input type={f.type} name={f.name} placeholder={f.ph} required={f.required} />
                  </motion.label>
                ))}

                <motion.div className="idlx-form-section" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <h3>Professional Details</h3>
                </motion.div>
                <motion.label className="idlx-field" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <label>Position Applying For*</label>
                  <select name="position" defaultValue="" required>
                    <option value="" disabled>Select a role</option>
                    {careerRoles.map((role) => <option key={role} value={role}>{role}</option>)}
                  </select>
                </motion.label>
                {[
                  { label: "Total Years of Experience*", name: "experience", type: "text", ph: "0–10+", required: true },
                  { label: "Current Company", name: "company", type: "text", ph: "Current company" },
                  { label: "Current CTC", name: "currentCtc", type: "text", ph: "Current CTC" },
                  { label: "Expected CTC", name: "expectedCtc", type: "text", ph: "Expected CTC" },
                  { label: "Notice Period", name: "noticePeriod", type: "text", ph: "Immediate / 30 days / etc." },
                ].map((f) => (
                  <motion.label key={f.name} className="idlx-field" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                    <label>{f.label}</label>
                    <input type={f.type} name={f.name} placeholder={f.ph} required={f.required} />
                  </motion.label>
                ))}
                <motion.label className="idlx-field" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <label>Are you willing to work from our Parel office?</label>
                  <select name="parelOffice" defaultValue="Yes">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </motion.label>

                <motion.div className="idlx-form-section" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <h3>Portfolio & Resume</h3>
                </motion.div>
                <motion.label className="idlx-field idlx-field--file" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <label>Upload Resume (PDF/DOC)*</label>
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
                </motion.label>
                <motion.label className="idlx-field idlx-field--file" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <label>Upload Portfolio (PDF)</label>
                  <input type="file" name="portfolioFile" accept=".pdf" />
                </motion.label>
                <motion.label className="idlx-field" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <label>Portfolio / Behance / Website Link</label>
                  <input type="url" name="portfolioLink" placeholder="https://" />
                </motion.label>

                <motion.div className="idlx-form-section" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <h3>About You</h3>
                </motion.div>
                <motion.label className="idlx-field" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
                  <label>Tell us a little about yourself.</label>
                  <textarea name="aboutYou" rows={5} placeholder="A few lines about your background, interests, and approach to design." />
                </motion.label>
                <motion.button
                  type="submit"
                  className="idlx-submit"
                  data-hover
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  Submit application →
                </motion.button>
              </motion.form>
            )}
          </section>

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
