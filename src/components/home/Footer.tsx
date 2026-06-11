import { Link } from "@tanstack/react-router";
import logo from "@/assets/idl-logo.png";

const navLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Expertise", to: "/expertise" },
  { label: "Studio", to: "/studio/about" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="idl-footer">
      <div className="idl-footer-top">
        <img src={logo} alt="Interarch Design Labs" className="idl-footer-logo" />
        <p className="idl-footer-statement">
          Architecture, interiors and spatial strategy — shaped with clarity, care, and intent.
        </p>
      </div>

      <div className="idl-footer-grid">
        <div className="idl-footer-col">
          <span className="idl-footer-label">Studios</span>
          <p>Mumbai, Maharashtra</p>
          <p>Ahmedabad, Gujarat</p>
        </div>

        <div className="idl-footer-col">
          <span className="idl-footer-label">Navigate</span>
          <nav className="idl-footer-nav">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} data-hover>{l.label}</Link>
            ))}
          </nav>
        </div>

        <div className="idl-footer-col">
          <span className="idl-footer-label">Connect</span>
          <a href="mailto:hello@interarchlabs.com" data-hover>hello@interarchlabs.com</a>
          <p>India · Middle East · Africa</p>
        </div>
      </div>

      <div className="idl-footer-base">
        <span>© {new Date().getFullYear()} Interarch Design Labs</span>
        <span className="idl-footer-tag">Designed with intention.</span>
      </div>
    </footer>
  );
}
