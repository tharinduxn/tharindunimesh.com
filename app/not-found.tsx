import Link from "next/link";
import { Header } from "@/components/header";
import { Arrow } from "@/components/arrow";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="container section" tabIndex={-1}>
        <div className="section-label eyebrow">
          <span className="index">404 /</span> A small detour
        </div>
        <h1 className="section-heading" style={{ marginTop: 24 }}>
          Nothing here.
          <br />
          <span className="muted">Plenty to explore.</span>
        </h1>
        <p style={{ marginBlock: "24px 32px", maxWidth: 420, color: "var(--muted)" }}>
          This page could not be found. Return to the main portfolio to explore selected web and
          mobile case studies.
        </p>
        <Link className="button button-dark" href="/">
          Back to the portfolio <Arrow />
        </Link>
      </main>
    </>
  );
}
