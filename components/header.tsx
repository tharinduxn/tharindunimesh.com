"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./arrow";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "approach", label: "Approach" },
];

export function Header({ home = false }: { home?: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    const pointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        menu.current?.open &&
        !menu.current.contains(event.target)
      )
        menu.current.open = false;
    };
    const desktop = window.matchMedia("(min-width: 701px)");
    const resize = () => {
      if (desktop.matches && menu.current) menu.current.open = false;
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", pointer);
    desktop.addEventListener("change", resize);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -65% 0px", threshold: 0 },
    );
    if (home)
      document
        .querySelectorAll("main > section[id]")
        .forEach((section) => observer.observe(section));
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", pointer);
      desktop.removeEventListener("change", resize);
      observer.disconnect();
    };
  }, [home]);

  function closeMenu(id: string) {
    if (menu.current) menu.current.open = false;
    if (home) {
      const target = document.getElementById(id);
      target?.setAttribute("tabindex", "-1");
      target?.focus({ preventScroll: true });
    }
  }

  return (
    <header className="navigation">
      <div className="nav-inner container">
        <Link className="wordmark" href="/" aria-label="Tharindu Nimesh home">
          tharindu<span className="accent">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.id}
              href={`${home ? "" : "/"}#${link.id}`}
              aria-current={home && active === link.id ? "location" : undefined}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <Link className="nav-contact" href={`${home ? "" : "/"}#contact`}>
          Let’s talk <Arrow />
        </Link>
        <details className="mobile-menu" ref={menu}>
          <summary>
            Menu
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </summary>
          <nav aria-label="Mobile navigation">
            {[...links, { id: "contact", label: "Let’s talk" }].map((link, index) => (
              <Link
                key={link.id}
                href={`${home ? "" : "/"}#${link.id}`}
                onClick={() => closeMenu(link.id)}
              >
                <span className="eyebrow">0{index + 1}</span>
                {link.label}
                <Arrow />
              </Link>
            ))}
            <p className="eyebrow">Thoughtful products. Built right.</p>
          </nav>
        </details>
      </div>
    </header>
  );
}
