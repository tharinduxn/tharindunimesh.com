"use client";

import { useEffect } from "react";
import { animate } from "framer-motion/dom/mini";

/** Progressive enhancement: server-rendered content is always visible. */
export function MotionEffects() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 600px)");
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const visited = new Set<Element>();
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => {
      if (preference.matches) return;
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
        const element = entry.target;
        visited.add(element);
        observer.unobserve(element);
        const animation = animate(element, {
          opacity: [0.8, 1],
          transform: [`translateY(${compact.matches ? 8 : 16}px)`, "translateY(0px)"],
        }, { duration: compact.matches ? 0.35 : 0.5, ease: [0.22, 1, 0.36, 1] });
        animations.set(element, animation);
        animation.then(() => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
          animations.delete(element);
        });
      }
    }, { threshold: 0.08 });

    const syncPreference = () => {
      observer.disconnect();
      if (preference.matches) {
        animations.forEach((animation, element) => {
          animation.stop();
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
        });
        animations.clear();
      } else {
        elements.forEach(element => { if (!visited.has(element)) observer.observe(element); });
      }
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPreference);
      animations.forEach((animation, element) => {
        animation.stop();
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    };
  }, []);
  return null;
}
