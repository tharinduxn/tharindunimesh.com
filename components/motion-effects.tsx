"use client";

import { useEffect } from "react";
import { animate } from "framer-motion/dom/mini";

/** Progressive enhancement: server-rendered content is always visible. */
export function MotionEffects() {
  useEffect(() => {
    const compact = window.matchMedia("(max-width: 600px)");
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const visited = new Set<Element>();
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const entrances = document.querySelectorAll<HTMLElement>("[data-page-enter]");

    entrances.forEach((element) => {
      const animation = animate(
        element,
        { transform: ["translateY(6px)", "translateY(0px)"] },
        { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      );
      animations.set(element, animation);
      animation.then(() => {
        element.style.removeProperty("transform");
        animations.delete(element);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          const element = entry.target;
          visited.add(element);
          observer.unobserve(element);
          const delay = Math.min(batchIndex * 0.05, 0.15);
          batchIndex += 1;
          const animation = animate(
            element,
            {
              opacity: [0.82, 1],
              transform: [`translateY(${compact.matches ? 8 : 16}px)`, "translateY(0px)"],
            },
            {
              duration: compact.matches ? 0.36 : 0.52,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          );
          animations.set(element, animation);
          animation.then(() => {
            element.style.removeProperty("opacity");
            element.style.removeProperty("transform");
            animations.delete(element);
          });
        }
      },
      { threshold: 0.08 },
    );

    elements.forEach((element) => {
      if (!visited.has(element)) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      animations.forEach((animation, element) => {
        animation.stop();
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    let disposed = false;
    let generation = 0;
    let stopScroll: (() => void) | undefined;
    let loadingScroll = false;
    const imageCleanups = new Set<() => void>();
    const visited = new Set<Element>();
    const visuals = document.querySelectorAll<HTMLElement>(".project-visual");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          const element = entry.target;
          visited.add(element);
          observer.unobserve(element);
          const current = generation;
          void import("@/lib/image-motion")
            .then(({ revealProductImages }) => {
              if (!disposed && current === generation && element.isConnected) {
                imageCleanups.add(revealProductImages(element));
              }
            })
            .catch(() => {
              /* Images remain visible if the optional enhancement cannot load. */
            });
        }
      },
      { threshold: 0.12 },
    );

    const startWheel = () => {
      if (!desktop.matches || stopScroll || loadingScroll) return;
      loadingScroll = true;
      const current = generation;
      void import("@/lib/scroll-motion")
        .then(({ startScrollMotion }) => {
          if (!disposed && current === generation && desktop.matches) {
            stopScroll = startScrollMotion();
          }
        })
        .catch(() => {
          /* Native scrolling is the fallback. */
        })
        .finally(() => {
          loadingScroll = false;
        });
    };
    const sync = () => {
      generation += 1;
      stopScroll?.();
      stopScroll = undefined;
      observer.disconnect();
      imageCleanups.forEach((cleanup) => cleanup());
      imageCleanups.clear();
      visuals.forEach((element) => {
        if (!visited.has(element)) observer.observe(element);
      });
    };
    sync();
    window.addEventListener("wheel", startWheel, { passive: true });
    desktop.addEventListener("change", sync);
    return () => {
      disposed = true;
      sync();
      observer.disconnect();
      window.removeEventListener("wheel", startWheel);
      desktop.removeEventListener("change", sync);
    };
  }, []);
  return null;
}
