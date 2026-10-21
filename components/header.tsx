"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./arrow";

const links = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
];

export function Header({ home = false }: { home?: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;

        setScrolled(currentY > 16);

        if (menu.current?.open || currentY <= 64) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }

        lastScrollY = currentY;
        ticking = false;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.clientY <= 36) {
        setHidden(false);
      }
    };

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
    const desktop = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (desktop.matches && menu.current) menu.current.open = false;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
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
    <header
      className="navigation"
      data-hidden={hidden ? "true" : undefined}
      data-scrolled={scrolled ? "true" : undefined}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="nav-inner container">
        <div className="nav-brand">
          <Link className="wordmark" href="/" aria-label="Tharindu Nimesh home">
            tharindu<span className="accent">.</span>
          </Link>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.id}
              href={`${home ? "" : "/"}#${link.id}`}
              aria-current={home && active === link.id ? "location" : undefined}
              onClick={() => closeMenu(link.id)}
            >
              {link.label}
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
            {[...links, { id: "contact", label: "Let’s talk" }].map((link) => (
              <Link
                key={link.id}
                href={`${home ? "" : "/"}#${link.id}`}
                onClick={() => closeMenu(link.id)}
              >
                {link.label}
                <Arrow />
              </Link>
            ))}
            <div className="mobile-menu-footer">
              <p className="eyebrow">Thoughtful products. Built right.</p>
              <span className="eyebrow">Matara, Sri Lanka · Web &amp; mobile</span>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
