import Link from "next/link";
import { projects } from "@/lib/projects";
import { Arrow } from "./arrow";
import { ProjectVisual } from "./project-visual";

export function Projects() {
  return (
    <section id="work" className="section container work-section" aria-labelledby="work-heading">
      <div className="section-top" data-reveal>
        <div>
          <div className="section-label eyebrow">
            <span className="index">01 /</span> Selected work
          </div>
          <h2 className="section-heading" id="work-heading">
            Built for a purpose.
            <br />
            <span className="muted">Made for people.</span>
          </h2>
        </div>
        <p>
          Different challenges. The same care. A selection of web platforms and mobile products
          designed and engineered from initial concept to release.
        </p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project" data-reveal key={project.slug}>
            <div className="project-meta-bar eyebrow">
              <div className="project-category">
                <span>{project.number}</span>
                <span>/</span>
                <span>{project.category}</span>
              </div>
              <span className="project-role-badge">{project.role}</span>
            </div>
            <div className="project-preview">
              <ProjectVisual project={project} />
              <Link
                href={`/work/${project.slug}`}
                className="project-open"
                aria-label={`Read the ${project.title} case study`}
              >
                <Arrow />
              </Link>
            </div>
            <div className="project-caption">
              <div className="project-caption-main">
                <h3>
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-summary">{project.description}</p>
              </div>
              <div className="project-caption-right">
                <div className="project-tags" aria-label={`${project.title} technology stack`}>
                  {project.stack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <Link className="button button-dark" href={`/work/${project.slug}`}>
                    Explore case study <Arrow />
                  </Link>
                  <a
                    className="text-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.linkLabel}
                    <span className="sr-only"> for {project.title} (opens in a new tab)</span>{" "}
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
