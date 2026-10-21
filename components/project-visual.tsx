import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  if (project.visual === "internly") {
    return (
      <div
        className="project-visual visual-internly"
        role="img"
        aria-label="Internly interface study: illustrative mobile screens for discovering internships and tracking applications"
      >
        <div className="study-heading">
          <span className="eyebrow">Internly / Career companion</span>
          <div>
            A clearer path.
            <br />
            <span>Your next chapter.</span>
          </div>
          <span className="study-note">Interface study · Illustrative content</span>
        </div>
        <div className="study-phones" aria-hidden="true">
          <div className="study-phone study-phone-back">
            <div className="phone-notch" />
            <div className="study-brand">
              internly<span>↗</span>
            </div>
            <div className="study-small">YOUR JOURNEY</div>
            <div className="study-title">
              Make every
              <br />
              application count.
            </div>
            <div className="application-row">
              <span className="application-symbol">↗</span>
              <div>
                Product internship<small>Application sent</small>
              </div>
            </div>
            <div className="application-row">
              <span className="application-symbol">◎</span>
              <div>
                Frontend internship<small>Preparing for interview</small>
              </div>
            </div>
            <div className="study-tip">
              One step at a time.
              <br />
              <strong>You’re making progress.</strong>
            </div>
            <div className="phone-home" />
          </div>
          <div className="study-phone study-phone-front">
            <div className="phone-notch" />
            <div className="study-brand">
              internly<span>✳</span>
            </div>
            <div className="study-small">A NEW POSSIBILITY</div>
            <div className="study-title">
              Your future.
              <br />A little closer.
            </div>
            <div className="study-search">
              ⌕ <span>Find your next opportunity</span>
            </div>
            <div className="study-opportunity">
              <span className="study-small">EXPLORE YOUR DIRECTION</span>
              <strong>
                Find work that
                <br />
                feels like you.
              </strong>
              <span className="study-fake-button">Discover internships ↗</span>
            </div>
            <div className="study-mini-row">
              <span>Build your CV</span>
              <span>↗</span>
            </div>
            <div className="study-mini-row">
              <span>Your AI companion</span>
              <span>↗</span>
            </div>
            <div className="phone-home" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`project-visual visual-${project.visual}`}>
      <span className="visual-topline eyebrow">
        {project.visual === "everlife" ? "Stories worth remembering" : "Built for the next wave"}
      </span>
      <div className="browser-frame">
        <div className="browser-chrome" aria-hidden="true">
          <span className="browser-dots">● ● ●</span>
          <span>{new URL(project.url).hostname.replace("www.", "")}</span>
          <span>↗</span>
        </div>
        <Image
          src={`/images/projects/${project.visual}-desktop.webp`}
          alt={`${project.title} live website, desktop homepage`}
          width={1440}
          height={960}
          sizes="(max-width: 600px) 90vw, 80vw"
          preload={priority}
        />
      </div>
      <div className="mobile-frame">
        <Image
          src={`/images/projects/${project.visual}-mobile.webp`}
          alt={`${project.title} live website, mobile homepage`}
          width={390}
          height={844}
          sizes="(max-width: 600px) 110px, 200px"
        />
      </div>
      <span className="visual-bottomline eyebrow">Desktop & mobile / Live website</span>
    </div>
  );
}
