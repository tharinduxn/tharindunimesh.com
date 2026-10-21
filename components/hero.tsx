import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { Arrow } from "./arrow";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading" id="top">
      <div className="hero-intro eyebrow">
        <span className="status-dot" aria-hidden="true" /> Tharindu Nimesh{" "}
        <span className="hero-intro-divider" aria-hidden="true">
          /
        </span>{" "}
        Developer &amp; product builder
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
              I design and engineer web and mobile products, from the first user flow to the last
              performance detail. React, Next.js, and Flutter, shaped by a product mindset.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore selected work <Arrow direction="down" />
              </a>
              <a className="text-link" href="#contact">
                Start a conversation <Arrow />
              </a>
            </div>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-image-wrap">
            <Image
              src="/images/tharindu-portrait.webp"
              alt="Tharindu Nimesh, rendered in a monochrome pattern of binary digits"
              width={1000}
              height={1000}
              sizes="(max-width: 600px) 112px, (max-width: 1000px) 40vw, 420px"
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
              Matara, Sri Lanka
            </span>
          </figcaption>
        </figure>
      </div>
      <nav className="hero-index" aria-label="Selected case studies">
        <span className="hero-index-label eyebrow">Selected work</span>
        <ol>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/work/${project.slug}`}>
                <span className="eyebrow hero-index-number">{project.number}</span>
                <span className="hero-index-title">{project.title}</span>
                <span className="eyebrow hero-index-category">
                  {project.category.split(" / ")[0]}
                </span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
