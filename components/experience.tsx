const milestones = [
  { period: "Mar — Sep 2023", year: "2023", theme: "A real-world starting point.", role: "Banking Trainee", organisation: "People’s Bank · Morawaka", description: "An early chapter outside software, in a setting where clear communication, trust, and everyday processes matter." },
  { period: "Nov 2023 — Present", year: "2023", theme: "Connecting business and technology.", role: "BSc in Management Information Systems", organisation: "NSBM Green University · Special degree", description: "Building a foundation in information systems, with a focus on Information and Communication Technologies." },
  { period: "Feb 2026 — Present", year: "2026", theme: "Building with a team.", role: "Development Committee Lead", organisation: "IEEE Computer Society · NSBM Student Branch", description: "Leading development of student branch websites and digital assets, and coordinating technical resources for competitions and hackathons." },
];

export function Experience() {
  return (
    <section className="section container experience-section" id="journey" aria-labelledby="journey-heading">
      <div className="section-top" data-reveal><div><div className="section-label eyebrow"><span className="index">03 /</span> The journey</div><h2 className="section-heading" id="journey-heading">Different chapters.<br /><span className="muted">A growing perspective.</span></h2></div><p>Learning how things work.<br />Then learning how to make them better.</p></div>
      <ol className="milestones">{milestones.map(milestone => <li data-reveal key={milestone.role}><div className="milestone-date eyebrow"><span className="milestone-dot" />{milestone.period}</div><span className="milestone-year" aria-hidden="true">{milestone.year}<span className="accent">.</span></span><h3>{milestone.theme}</h3><div className="milestone-role">{milestone.role}<span>{milestone.organisation}</span></div><p>{milestone.description}</p></li>)}</ol>
    </section>
  );
}
