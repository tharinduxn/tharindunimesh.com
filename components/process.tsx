const steps = [
  {
    name: "Discover",
    question: "Start with the right questions.",
    description:
      "Understand the people, the problem, and the context before deciding what to make.",
    output: "Context & constraints",
  },
  {
    name: "Define",
    question: "Make the problem specific.",
    description:
      "Turn a broad idea into a clear scope, a useful user journey, and a shared picture of success.",
    output: "Scope & user flows",
  },
  {
    name: "Design",
    question: "Find the simplest useful form.",
    description:
      "Shape the structure, visual language, and small interactions around what someone needs to do.",
    output: "Interface & interaction",
  },
  {
    name: "Build",
    question: "Make the details work together.",
    description:
      "Translate the design into responsive components and connect them to reliable application logic.",
    output: "A working product",
  },
  {
    name: "Refine",
    question: "Care for the last ten percent.",
    description:
      "Test across screens, review accessibility, measure performance, and improve the rough edges.",
    output: "A considered release",
  },
];

export function Process() {
  return (
    <section
      className="section container process-section"
      id="approach"
      aria-labelledby="process-heading"
    >
      <div className="process-intro">
        <div className="section-label eyebrow">
          <span className="index">05 /</span> How I work
        </div>
        <h2 className="section-heading" id="process-heading">
          A clear process.
          <br />
          <span className="muted">
            Room for
            <br /> discovery.
          </span>
        </h2>
        <p>
          Good work comes from asking, making, and paying attention. This is how I bring an idea
          into focus.
        </p>
        <span className="process-footnote eyebrow">Thought → Form → Function</span>
      </div>
      <ol className="process-steps">
        {steps.map((step, index) => (
          <li data-reveal key={step.name}>
            <span className="process-number eyebrow">0{index + 1}</span>
            <div>
              <h3>
                {step.name}
                <span aria-hidden="true">↗</span>
              </h3>
              <h4>{step.question}</h4>
              <p>{step.description}</p>
              <span className="process-output eyebrow">{step.output}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
