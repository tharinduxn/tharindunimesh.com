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
          Different challenges. The same care.
          <br />A selection of web experiences and mobile products I’ve brought to life.
        </p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project" data-reveal key={project.slug}>
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
              <div>
                <div className="eyebrow project-category">
                  <span>{project.number}</span>
                  {project.category}
                </div>
                <h3>
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>
                <p>{project.tagline}</p>
              </div>
              <div className="project-caption-right">
                <div className="project-tags">
                  {project.stack.slice(0, 3).map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                <Link className="text-link" href={`/work/${project.slug}`}>
                  Explore case study <Arrow />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
