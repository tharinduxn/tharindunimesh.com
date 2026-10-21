import Lenis from "lenis";

/** Desktop wheel smoothing. Native touch, anchors, and keyboard navigation stay available. */
export function startScrollMotion() {
  const lenis = new Lenis({
    lerp: 0.18,
    syncTouch: false,
    anchors: false,
    stopInertiaOnNavigate: true,
  });
  let frame = 0;
  const tick = (time: number) => {
    frame = 0;
    lenis.raf(time);
    if (lenis.isScrolling === "smooth") frame = requestAnimationFrame(tick);
  };
  // No idle animation loop: wake only in response to a wheel gesture.
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };
  lenis.on("virtual-scroll", wake);
  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
  };
}
