import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/idl-logo.png";
import { realImages } from "@/data/realImages";

const navWork = realImages.sketches.projects;
const navStory = realImages.sketches.studio;
const navTeam = realImages.sketches.contact;
const navNews = realImages.sketches.news;
const navContact = realImages.sketches.expertise;

type SubItem = { label: string; to: string; params?: Record<string, string> };
type NavItem = {
  label: string;
  to?: string;
  image: string;
  blurb: string;
  children?: SubItem[];
};

const NAV: NavItem[] = [
  {
    label: "Projects",
    to: "/projects",
    image: navWork,
    blurb: "Architecture and interiors presented as a calm, image-led archive.",
    children: [
      { label: "Architecture", to: "/projects/$category", params: { category: "architecture" } },
      { label: "Interiors", to: "/projects/$category", params: { category: "interiors" } },
    ],
  },
  {
    label: "Expertise",
    to: "/expertise",
    image: navContact,
    blurb: "Residential, commercial, institutional, hospitality, industrial, and workplace design.",
    children: [
      { label: "Residential", to: "/expertise/$sector", params: { sector: "residential" } },
      { label: "Commercial", to: "/expertise/$sector", params: { sector: "commercial" } },
      { label: "Institutional", to: "/expertise/$sector", params: { sector: "institutional" } },
      { label: "Hospitality", to: "/expertise/$sector", params: { sector: "hospitality" } },
      { label: "Industrial", to: "/expertise/$sector", params: { sector: "industrial" } },
      { label: "Workplace", to: "/expertise/$sector", params: { sector: "workplace" } },
    ],
  },
  {
    label: "Studio",
    to: "/studio/about",
    image: navStory,
    blurb: "Legacy, team, and history shaped into a quieter documentary-like experience.",
    children: [
      { label: "About", to: "/studio/about" },
      { label: "Team", to: "/studio/team" },
      { label: "History", to: "/studio/history" },
    ],
  },
  {
    label: "News",
    to: "/news",
    image: navNews,
    blurb: "A refined journal and awards archive with publication-like pacing.",
    children: [
      { label: "Journal", to: "/news/journal" },
      { label: "Awards", to: "/news/awards" },
    ],
  },
  {
    label: "Contact",
    to: "/contact",
    image: navTeam,
    blurb: "Wherever you are, we design for you.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setHoverIdx(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setActiveIdx(null);
  };

  const active = useMemo(() => (activeIdx !== null ? NAV[activeIdx] : null), [activeIdx]);
  const headerClass = `idl-header${scrolled ? " is-scrolled" : ""}${open ? " is-menu" : ""}`;

  return (
    <>
      <header className={headerClass}>
        <Link to="/" className="idl-logo" aria-label="Interarch Design Labs — Home" onClick={closeAll}>
          <img src={logo} alt="Interarch Design Labs" className="idl-logo-mark" />
        </Link>

        <nav className="idl-topnav" aria-label="Primary" onMouseLeave={() => setHoverIdx(null)}>
          {NAV.map((item, i) =>
            !item.children ? (
              <Link key={item.label} to={item.to!} className="idl-topnav-link" data-hover onMouseEnter={() => setHoverIdx(null)}>
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="idl-topnav-item" onMouseEnter={() => setHoverIdx(i)}>
                <Link to={item.to!} className="idl-topnav-link" data-hover>
                  {item.label}
                </Link>
                <AnimatePresence>
                  {hoverIdx === i ? (
                    <motion.div className="idl-topnav-drop" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.22, ease: EASE }}>
                      {item.children.map((c) => (
                        <Link key={c.label} to={c.to} params={c.params as never} className="idl-topnav-drop-link" data-hover onClick={() => setHoverIdx(null)}>
                          {c.label}
                        </Link>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          )}
        </nav>

        <div className="idl-header-right">
          <button className="idl-menu-btn" data-hover type="button" onClick={() => (open ? closeAll() : setOpen(true))} aria-expanded={open} aria-controls="idl-mega-menu">
            <span className="idl-menu-btn-label">{open ? "Close" : "Menu"}</span>
            <span className="idl-menu-btn-icon" aria-hidden>
              <span /><span />
            </span>
          </button>
          <button type="button" className="idl-icon-btn" aria-label="Search" data-hover>
            <SearchIcon />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div id="idl-mega-menu" className="idl-mega" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} role="dialog" aria-modal="true">
            <div className="idl-mega-left">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div key={active.label} className="idl-mega-left-inner" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: EASE }}>
                    <div className="idl-mega-eyebrow">— {String((activeIdx ?? 0) + 1).padStart(2, "0")} / {String(NAV.length).padStart(2, "0")}</div>
                    <h2 className="idl-mega-title">{active.label}</h2>
                    <p className="idl-mega-blurb">{active.blurb}</p>
                    <div className="idl-mega-image">
                      <img src={active.image} alt="" width={1200} height={1500} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="idle" className="idl-mega-left-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                    <div className="idl-mega-eyebrow">— Index</div>
                    <h2 className="idl-mega-title">Interarch<br />Design Labs</h2>
                    <p className="idl-mega-blurb">Architecture, interiors and spatial strategy presented through image, calm pacing, and restraint.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="idl-mega-right">
              <div className="idl-mega-eyebrow idl-mega-eyebrow--right">Navigation</div>
              <ul className="idl-mega-nav">
                {NAV.map((item, i) => {
                  const isActive = i === activeIdx;
                  const hasKids = !!item.children?.length;
                  return (
                    <motion.li key={item.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.06 }} className={`idl-mega-nav-row${isActive ? " is-active" : ""}`}>
                      {hasKids ? (
                        <button type="button" className="idl-mega-nav-link" data-hover aria-expanded={isActive} onClick={() => setActiveIdx(isActive ? null : i)} onMouseEnter={() => setActiveIdx(i)}>
                          <span className="idl-mega-nav-index">{String(i + 1).padStart(2, "0")}</span>
                          <span className="idl-mega-nav-label">{item.label}</span>
                          <span className="idl-mega-nav-caret" aria-hidden>{isActive ? "—" : "+"}</span>
                        </button>
                      ) : (
                        <Link to={item.to!} className="idl-mega-nav-link" data-hover onClick={closeAll} onMouseEnter={() => setActiveIdx(i)}>
                          <span className="idl-mega-nav-index">{String(i + 1).padStart(2, "0")}</span>
                          <span className="idl-mega-nav-label">{item.label}</span>
                        </Link>
                      )}
                      <AnimatePresence initial={false}>
                        {isActive && hasKids ? (
                          <motion.ul className="idl-mega-sub" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                            {item.children!.map((c, ci) => (
                              <motion.li key={c.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE, delay: 0.06 + ci * 0.06 }}>
                                <Link to={c.to} params={c.params as never} className="idl-mega-sub-link" data-hover onClick={closeAll}>
                                  {c.label}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="idl-mega-foot">
                <span>Interarch Design Labs</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
