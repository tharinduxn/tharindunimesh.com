import Image from "next/image";
import { Arrow } from "./arrow";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading" id="top">
      <div className="hero-intro eyebrow">
        <span className="status-dot" /> Tharindu Nimesh{" "}
        <span className="hero-intro-divider">/</span> Developer & product builder
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-heading">
            Thoughtful
            <br />
            products.
            <br />
            <span className="hero-final-line">
              Built right<span className="accent">.</span>
            </span>
          </h1>
          <div className="hero-description" data-page-enter>
            <p>
              I bring ideas to life through considered design and thoughtful engineering. For the
              web. For mobile. For people.
            </p>
            <a className="button button-dark" href="#work">
              Explore selected work <Arrow direction="down" />
            </a>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-image-wrap">
            <Image
              src="/images/tharindu-portrait.webp"
              alt="Tharindu Nimesh, rendered in a monochrome pattern of binary digits"
              width={1000}
              height={1000}
              sizes="(max-width: 600px) calc(100vw - 160px), (max-width: 1000px) 45vw, 420px"
              loading="eager"
              fetchPriority="high"
            />
            <span className="portrait-index eyebrow" aria-hidden="true">
              Fig. 01 — The person behind the pixels
            </span>
            <span className="portrait-cross" aria-hidden="true">
              +
            </span>
          </div>
          <figcaption>
            <span>
              Human perspective.
              <br />
              Engineering mindset.
            </span>
            <span className="eyebrow">
              Based in
              <br />
              Sri Lanka ↗
            </span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-bottom eyebrow">
        <span>Web & mobile experiences</span>
        <span>Design with intent. Build with care.</span>
        <Arrow direction="down" />
      </div>
    </section>
  );
}
