import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="container section" tabIndex={-1}>
      <p className="eyebrow accent">404 / A small detour</p>
      <h1 className="section-heading">
        Nothing here.
        <br />
        Plenty to explore.
      </h1>
      <p style={{ marginBlock: 30 }}>
        This page could not be found. Let’s get you back to the work.
      </p>
      <Link className="button button-dark" href="/">
        Back to the portfolio ↗
      </Link>
    </main>
  );
}
