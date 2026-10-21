import Link from "next/link";
import { Arrow } from "./arrow";

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#approach", label: "Approach" },
  { href: "/#work", label: "Work" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer container">
        <div className="footer-brand">
          <Link className="wordmark" href="/" aria-label="Tharindu Nimesh home">
            tharindu<span className="accent">.</span>
          </Link>
          <span className="footer-tagline eyebrow">
            Developer &amp; Product Builder · Sri Lanka
          </span>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="text-link footer-top-link" href="/#top">
          Back to top <Arrow />
        </Link>
      </div>
      <div className="footer-bottom container">
        <span className="footer-copyright">
          <span>© 2026 Tharindu Nimesh.</span>
          <span>Made with care in Sri Lanka.</span>
        </span>
        <span className="eyebrow footer-colophon">Next.js · TypeScript · Built for people</span>
      </div>
    </footer>
  );
}
