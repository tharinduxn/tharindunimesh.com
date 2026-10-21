import { Hero } from "@/components/hero";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="site-header container">
        <Link className="wordmark" href="/" aria-label="Tharindu Nimesh home">tharindu<span className="accent">.</span></Link>
        <span className="eyebrow">Independent developer</span>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Hero />
      </main>
    </>
  );
}
