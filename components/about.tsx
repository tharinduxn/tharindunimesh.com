const principles = [
  {
    number: "01",
    title: "Clarity over complexity.",
    detail:
      "Interfaces and architectures that make the next step self-evident for the person using them.",
  },
  {
    number: "02",
    title: "Details that serve a purpose.",
    detail:
      "Typography, spacing, and motion chosen to guide attention rather than compete with the task.",
  },
  {
    number: "03",
    title: "Care, all the way through.",
    detail:
      "From responsive layouts and keyboard accessibility to clean, maintainable application code.",
  },
];

export function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="container section">
        <div className="section-label eyebrow">
          <span className="index">02 /</span> The thinking behind the making
        </div>
        <div className="about-grid" data-reveal>
          <div className="about-lead-col">
            <h2 className="section-heading" id="about-heading">
              Good software
              <br />
              feels obvious.
              <br />
              <span className="muted">
                Getting there
                <br />
                takes care.
              </span>
            </h2>
            <dl className="about-dossier">
              <div>
                <dt className="eyebrow">Base</dt>
                <dd>Matara, Sri Lanka</dd>
              </div>
              <div>
                <dt className="eyebrow">Focus</dt>
                <dd>Web &amp; Mobile Products</dd>
              </div>
              <div>
                <dt className="eyebrow">Education</dt>
                <dd>BSc (Hons) MIS · NSBM</dd>
              </div>
              <div>
                <dt className="eyebrow">Core Stack</dt>
                <dd>Next.js · TypeScript · Flutter</dd>
              </div>
            </dl>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              I’m Tharindu, a developer based in Matara, Sri Lanka. I care about the space where a
              useful idea becomes something people can actually use.
            </p>
            <p>
              That means thinking beyond the screen. What is someone trying to do? Where does the
              experience get in their way? How can the engineering make it feel simpler?
            </p>
            <p>
              I work across web and mobile, connecting React, Next.js, and Flutter with a product
              mindset. Studying Management Information Systems at NSBM adds another lens:
              understanding the people and processes behind the technology.
            </p>
            <div className="about-signature">
              <span className="signature-mark" aria-hidden="true">
                tn.
              </span>
              <div>
                <strong>Tharindu Nimesh</strong>
                <span className="eyebrow">Curious by nature. Builder by practice.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-principles" data-reveal>
          <div className="about-principles-header">
            <span className="eyebrow">Operating principles / A few things I build by</span>
          </div>
          <div className="about-principles-grid">
            {principles.map((item) => (
              <div className="principle-card" key={item.number}>
                <span className="eyebrow principle-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
