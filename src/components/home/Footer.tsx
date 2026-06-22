import { Link } from "@tanstack/react-router";
import logo from "@/assets/idl-logo.png";

const navLinks = [
  { label: "Projects", to: "/projects" as const },
  { label: "About IDL", to: "/studio/about" as const },
  { label: "Awards & Recognition", to: "/awards" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Footer() {
  return (
    <footer className="idl-footer">
      <div className="idl-footer-top">
        <img src={logo} alt="Interarch Design Labs" className="idl-footer-logo" />
        <p className="idl-footer-statement">
          Spaces that work beautifully today and endure tomorrow.
        </p>
      </div>

      <div className="idl-footer-grid">
        <div className="idl-footer-col">
          <span className="idl-footer-label">Office</span>
          <p>Interarch Design Lab</p>
          <p>Unit No 205, Peninsula Centre,</p>
          <p>Co-Op Premises Society Ltd,</p>
          <p>Dr. S. S. Rao Marg, Parel East,</p>
          <p>Mumbai, Maharashtra 400012</p>
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
          <a href="https://www.instagram.com/interarchdesignlabs" target="_blank" rel="noreferrer" data-hover>Instagram</a>
          <a href="https://www.linkedin.com/company/interarch-design-lab/" target="_blank" rel="noreferrer" data-hover>LinkedIn</a>
        </div>
      </div>

      <div className="idl-footer-base">
        <span>© {new Date().getFullYear()} Interarch Design Labs</span>
        <span className="idl-footer-tag">Designed with intention.</span>
      </div>
    </footer>
  );
}
