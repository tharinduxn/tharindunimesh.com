const milestones = [
  {
    chapter: "01",
    period: "Mar — Sep 2023",
    year: "2023",
    domain: "Operations",
    theme: "A real-world starting point.",
    role: "Banking Trainee",
    organisation: "People’s Bank · Morawaka",
    description:
      "An early chapter outside software, in a setting where clear communication, trust, and everyday processes matter.",
    focus: ["Process clarity", "Client trust", "Service workflows"],
  },
  {
    chapter: "02",
    period: "Nov 2023 — Present",
    year: "2023–26",
    domain: "Systems",
    theme: "Connecting business and technology.",
    role: "BSc in Management Information Systems",
    organisation: "NSBM Green University · Special degree",
    description:
      "Building a foundation in information systems, with a focus on Information and Communication Technologies.",
    focus: ["Information systems", "Software architecture", "Product strategy"],
  },
  {
    chapter: "03",
    period: "Feb 2026 — Present",
    year: "2026",
    domain: "Leadership",
    theme: "Building with a team.",
    role: "Development Committee Lead",
    organisation: "IEEE Computer Society · NSBM Student Branch",
    description:
      "Leading development of student branch websites and digital assets, and coordinating technical resources for competitions and hackathons.",
    focus: ["Technical leadership", "Web platforms", "Team coordination"],
  },
];

export function Experience() {
  return (
    <section
      className="section container experience-section"
      id="journey"
      aria-labelledby="journey-heading"
    >
      <div className="section-top" data-reveal>
        <div>
          <div className="section-label eyebrow">
            <span className="index">03 /</span> The journey
          </div>
          <h2 className="section-heading" id="journey-heading">
            Different chapters.
            <br />
            <span className="muted">A growing perspective.</span>
          </h2>
        </div>
        <p>
          Learning how real-world processes work, studying the systems behind them, and leading
          teams that build for people.
        </p>
      </div>
      <ol className="milestones">
        {milestones.map((milestone) => (
          <li data-reveal key={milestone.role}>
            <div className="milestone-top eyebrow">
              <span className="milestone-date">
                <span className="milestone-dot" aria-hidden="true" />
                {milestone.period}
              </span>
              <span className="milestone-chapter">CH. {milestone.chapter}</span>
            </div>
            <div className="milestone-year-row" aria-hidden="true">
              <span className="milestone-year">
                {milestone.year}
                <span className="accent">.</span>
              </span>
              <span className="eyebrow milestone-domain">{milestone.domain}</span>
            </div>
            <h3>{milestone.theme}</h3>
            <div className="milestone-role">
              {milestone.role}
              <span>{milestone.organisation}</span>
            </div>
            <p>{milestone.description}</p>
            <div className="milestone-tags" aria-label={`Focus areas for ${milestone.role}`}>
              {milestone.focus.map((item) => (
                <span key={item} className="eyebrow">
                  {item}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
