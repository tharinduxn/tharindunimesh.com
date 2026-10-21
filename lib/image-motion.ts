import { gsap } from "gsap";

/** Reveal the real product imagery once; frames retain their independent hover behavior. */
export function revealProductImages(element: HTMLElement) {
  if (!element.querySelector("img")) return () => {};
  const context = gsap.context(() => {
    gsap.fromTo(
      "img",
      { scale: 1.035, opacity: 0.85 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity",
      },
    );
  }, element);
  return () => context.revert();
}
