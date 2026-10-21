"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { projects } from "@/lib/projects";
import { Arrow } from "./arrow";
import { ProjectVisual } from "./project-visual";

const AUTOPLAY_DURATION = 5.5;

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timerTweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const inViewRef = useRef(false);
  const pausedRef = useRef(false);

  const animateSlideIn = useCallback((index: number, direction: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll<HTMLElement>(".project-slide");
    const currentSlide = slides[index];
    if (!currentSlide) return;

    const preview = currentSlide.querySelector<HTMLElement>(".project-preview");
    const frames = currentSlide.querySelectorAll<HTMLElement>(
      ".browser-frame, .mobile-frame, .study-phone-back, .study-phone-front",
    );
    const copyItems = currentSlide.querySelectorAll<HTMLElement>("[data-slide-copy]");

    if (preview) {
      gsap.fromTo(
        preview,
        { scale: 0.95, opacity: 0.55 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          clearProps: "scale,opacity",
          overwrite: "auto",
        },
      );
    }

    if (frames.length) {
      gsap.fromTo(
        frames,
        { x: direction * 28, y: 20, opacity: 0.65 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          clearProps: "x,y,opacity",
          overwrite: "auto",
        },
      );
    }

    if (copyItems.length) {
      gsap.fromTo(
        copyItems,
        { x: direction * 32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.055,
          ease: "expo.out",
          clearProps: "x,opacity",
          overwrite: "auto",
        },
      );
    }
  }, []);

  const startAutoplayFor = useCallback(
    (index: number, slideToNext: (target: number) => void) => {
      timerTweenRef.current?.kill();

      fillRefs.current.forEach((fill) => {
        if (!fill) return;
        gsap.killTweensOf(fill);
        gsap.set(fill, { scaleX: 0 });
      });

      const currentFill = fillRefs.current[index];
      if (!currentFill) return;

      timerTweenRef.current = gsap.fromTo(
        currentFill,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTOPLAY_DURATION,
          ease: "none",
          paused: !inViewRef.current || pausedRef.current,
          onComplete: () => {
            slideToNext((index + 1) % projects.length);
          },
        },
      );
    },
    [],
  );

  const slideToIndex = useCallback(
    function go(index: number, immediate = false) {
      const next = (index + projects.length) % projects.length;
      const prev = activeRef.current;
      const direction =
        index > prev || (prev === projects.length - 1 && next === 0 && index >= projects.length)
          ? 1
          : -1;

      activeRef.current = next;
      setActiveIndex(next);

      const track = trackRef.current;
      if (track) {
        gsap.to(track, {
          xPercent: -next * 100,
          duration: immediate ? 0 : 0.9,
          ease: "expo.out",
          overwrite: "auto",
        });
      }

      if (!immediate) {
        animateSlideIn(next, direction);
      }

      startAutoplayFor(next, (target) => go(target));
    },
    [animateSlideIn, startAutoplayFor],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let enteredOnce = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            if (!enteredOnce) {
              enteredOnce = true;
              animateSlideIn(activeRef.current, 1);
              startAutoplayFor(activeRef.current, (target) => slideToIndex(target));
            } else if (!pausedRef.current) {
              timerTweenRef.current?.play();
            }
          } else {
            timerTweenRef.current?.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      timerTweenRef.current?.kill();
    };
  }, [animateSlideIn, slideToIndex, startAutoplayFor]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let startX = 0;
    let startY = 0;
    let dragging = false;
    let wheelCooldown = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button")) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) slideToIndex(activeRef.current + 1);
        else slideToIndex(activeRef.current - 1);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (wheelCooldown) return;
      if (Math.abs(e.deltaX) > 28 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.3) {
        wheelCooldown = true;
        if (e.deltaX > 0) slideToIndex(activeRef.current + 1);
        else slideToIndex(activeRef.current - 1);
        window.setTimeout(() => {
          wheelCooldown = false;
        }, 650);
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown, { passive: true });
    viewport.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [slideToIndex]);

  const handlePause = () => {
    pausedRef.current = true;
    timerTweenRef.current?.pause();
  };

  const handleResume = () => {
    pausedRef.current = false;
    if (inViewRef.current) {
      timerTweenRef.current?.play();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section container work-section"
      aria-labelledby="work-heading"
    >
      <div className="section-top work-header" data-reveal>
        <div>
          <div className="section-label eyebrow">Selected work</div>
          <h2 className="section-heading" id="work-heading">
            Built for a purpose.
            <br />
            <span className="muted">Made for people.</span>
          </h2>
        </div>
        <p>
          Different challenges. The same care. A selection of web platforms and mobile products
          designed and engineered from initial concept to release.
        </p>
      </div>

      <div
        className="project-showcase"
        onPointerEnter={handlePause}
        onPointerLeave={handleResume}
        onFocusCapture={handlePause}
        onBlurCapture={handleResume}
      >
        <div className="project-slider-viewport" ref={viewportRef}>
          <div className="project-track" ref={trackRef}>
            {projects.map((project, index) => (
              <article
                className="project-slide"
                aria-hidden={activeIndex !== index}
                key={project.slug}
              >
                <div className="project-preview">
                  <ProjectVisual project={project} />
                  <Link
                    href={`/work/${project.slug}`}
                    className="project-open"
                    tabIndex={activeIndex === index ? 0 : -1}
                    aria-label={`Read the ${project.title} case study`}
                  >
                    <Arrow />
                  </Link>
                </div>

                <div className="project-info">
                  <div className="project-info-top">
                    <span className="project-category eyebrow" data-slide-copy>
                      {project.category}
                    </span>
                    <h3 data-slide-copy>
                      <Link
                        href={`/work/${project.slug}`}
                        tabIndex={activeIndex === index ? 0 : -1}
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="project-tagline" data-slide-copy>
                      {project.tagline}
                    </p>
                    <p className="project-summary" data-slide-copy>
                      {project.description}
                    </p>
                  </div>

                  <div className="project-info-bottom">
                    <div
                      className="project-stack eyebrow"
                      data-slide-copy
                      aria-label={`${project.title} technology stack`}
                    >
                      {project.stack.join(" · ")}
                    </div>
                    <div className="project-actions" data-slide-copy>
                      <Link
                        className="button button-dark"
                        href={`/work/${project.slug}`}
                        tabIndex={activeIndex === index ? 0 : -1}
                      >
                        Explore case study <Arrow />
                      </Link>
                      <a
                        className="text-link"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={activeIndex === index ? 0 : -1}
                      >
                        {project.linkLabel}
                        <span className="sr-only">
                          {" "}
                          for {project.title} (opens in a new tab)
                        </span>{" "}
                        <Arrow />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="work-dots" role="tablist" aria-label="Selected projects">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`View ${project.title}`}
              className="work-dot"
              data-active={activeIndex === index ? "true" : undefined}
              onClick={() => slideToIndex(index)}
            >
              <span className="work-dot-rail" aria-hidden="true">
                <span
                  ref={(el) => {
                    fillRefs.current[index] = el;
                  }}
                  className="work-dot-fill"
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
