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
    const entrances = document.querySelectorAll<HTMLElement>("[data-page-enter]");
    // Every page mounts this component (case studies are keyed by slug), so navigation
    // gets a short entrance without delaying links or hiding server-rendered content.
    if (!preference.matches) {
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
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (preference.matches) return;
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          const element = entry.target;
          visited.add(element);
          observer.unobserve(element);
          const animation = animate(
            element,
            {
              opacity: [0.8, 1],
              transform: [`translateY(${compact.matches ? 8 : 16}px)`, "translateY(0px)"],
            },
            { duration: compact.matches ? 0.35 : 0.5, ease: [0.22, 1, 0.36, 1] },
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
        elements.forEach((element) => {
          if (!visited.has(element)) observer.observe(element);
        });
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

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
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
        if (reduced.matches) return;
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          const element = entry.target;
          visited.add(element);
          observer.unobserve(element);
          const current = generation;
          void import("@/lib/image-motion")
            .then(({ revealProductImages }) => {
              if (!disposed && current === generation && !reduced.matches && element.isConnected) {
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
      if (reduced.matches || !desktop.matches || stopScroll || loadingScroll) return;
      loadingScroll = true;
      const current = generation;
      void import("@/lib/scroll-motion")
        .then(({ startScrollMotion }) => {
          if (!disposed && current === generation && !reduced.matches && desktop.matches) {
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
      if (!reduced.matches) {
        visuals.forEach((element) => {
          if (!visited.has(element)) observer.observe(element);
        });
      }
    };
    sync();
    window.addEventListener("wheel", startWheel, { passive: true });
    reduced.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      disposed = true;
      sync();
      observer.disconnect();
      window.removeEventListener("wheel", startWheel);
      reduced.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);
  return null;
}
