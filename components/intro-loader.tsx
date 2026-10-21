"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function IntroLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const heroLines = document.querySelectorAll<HTMLElement>(".hero-line-inner");
    const heroIntro = document.querySelector<HTMLElement>(".hero-intro");
    const heroDesc = document.querySelector<HTMLElement>(".hero-description");
    const portraitWrap = document.querySelector<HTMLElement>(".portrait-image-wrap");
    const portraitImg = document.querySelector<HTMLElement>(".portrait-image-wrap img");
    const portraitCaption = document.querySelector<HTMLElement>(".hero-portrait figcaption");
    const navbar = document.querySelector<HTMLElement>(".navigation");

    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      // Prepare Hero initial states behind the curtain
      if (heroLines.length) gsap.set(heroLines, { yPercent: 115 });
      if (heroIntro) gsap.set(heroIntro, { y: 16, opacity: 0 });
      if (heroDesc) gsap.set(heroDesc, { y: 20, opacity: 0 });
      if (portraitWrap) gsap.set(portraitWrap, { clipPath: "inset(14% 0% 14% 0%)", opacity: 0 });
      if (portraitImg) gsap.set(portraitImg, { scale: 1.14 });
      if (portraitCaption) gsap.set(portraitCaption, { y: 14, opacity: 0 });
      if (navbar) gsap.set(navbar, { y: -20, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          setDone(true);
        },
      });

      // 1. Minimalist wordmark, counter & architectural hairline entrance
      tl.fromTo(
        wordRef.current,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.85, ease: "expo.out" },
        0.1,
      )
        .fromTo(
          metaRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          0.2,
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.15, ease: "power3.inOut" },
          0.12,
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1.15,
            ease: "power3.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = `${Math.round(counter.value)}%`;
              }
            },
          },
          0.12,
        )
        // 2. Wordmark exits upward as architectural curtain lifts
        .to(
          wordRef.current,
          { yPercent: -120, duration: 0.55, ease: "expo.in" },
          1.28,
        )
        .to(
          [metaRef.current, countRef.current],
          { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" },
          1.28,
        )
        .to(
          overlay,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.95,
            ease: "expo.inOut",
          },
          1.38,
        );

      // 3. Synchronized Hero & Navigation reveal as curtain opens
      if (navbar) {
        tl.to(
          navbar,
          { y: 0, opacity: 1, duration: 0.8, clearProps: "transform,opacity" },
          1.72,
        );
      }
      if (heroIntro) {
        tl.to(
          heroIntro,
          { y: 0, opacity: 1, duration: 0.8, clearProps: "transform,opacity" },
          1.76,
        );
      }
      if (heroLines.length) {
        tl.to(
          heroLines,
          {
            yPercent: 0,
            duration: 1.05,
            stagger: 0.095,
            ease: "expo.out",
            clearProps: "transform",
          },
          1.74,
        );
      }
      if (portraitWrap) {
        tl.to(
          portraitWrap,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.05,
            ease: "expo.out",
            clearProps: "clipPath,opacity",
          },
          1.78,
        );
      }
      if (portraitImg) {
        tl.to(
          portraitImg,
          {
            scale: 1,
            duration: 1.35,
            ease: "expo.out",
            clearProps: "transform",
          },
          1.78,
        );
      }
      if (heroDesc) {
        tl.to(
          heroDesc,
          { y: 0, opacity: 1, duration: 0.85, clearProps: "transform,opacity" },
          1.92,
        );
      }
      if (portraitCaption) {
        tl.to(
          portraitCaption,
          { y: 0, opacity: 1, duration: 0.8, clearProps: "transform,opacity" },
          1.98,
        );
      }
    });

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div className="intro-loader" ref={overlayRef} aria-hidden="true">
      <div className="intro-loader-inner container">
        <div className="intro-loader-row">
          <span className="intro-word-mask">
            <span className="intro-word" ref={wordRef}>
              tharindu<span className="accent">.</span>
            </span>
          </span>
          <div className="intro-loader-right eyebrow">
            <span className="intro-meta" ref={metaRef}>
              Portfolio
            </span>
            <span className="intro-count" ref={countRef}>
              0%
            </span>
          </div>
        </div>
        <span className="intro-line-rail">
          <span className="intro-line-fill" ref={lineRef} />
        </span>
      </div>
    </div>
  );
}
