import Link from "next/link";
import { Arrow } from "./arrow";

export function Footer() {
  return <footer className="footer container"><Link className="wordmark" href="/" aria-label="Tharindu Nimesh home">tharindu<span className="accent">.</span></Link><span className="footer-copyright">© 2026 Tharindu Nimesh<span>Made with care in Sri Lanka.</span></span><Link className="text-link" href="/#top">Back to top <Arrow /></Link></footer>;
}
