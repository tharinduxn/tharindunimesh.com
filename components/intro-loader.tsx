"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "@/app/styles/intro.css";

const SIGNATURE_CHARS = ["t", "h", "a", "r", "i", "n", "d", "u"];
const INTRO_SEEN_KEY = "tharinduxn-intro-seen";

export function IntroLoader() {
  const stageRef = useRef<HTMLDivElement>(null);
  const flipCardRef = useRef<HTMLDivElement>(null);
  const flipImgRef = useRef<HTMLImageElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const accentCharRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const flipCard = flipCardRef.current;
    const signature = signatureRef.current;
    if (!stage || !flipCard || !signature) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    try {
      if (window.sessionStorage.getItem(INTRO_SEEN_KEY) === "true") {
        stage.hidden = true;
        return;
      }
    } catch {
      // Storage may be disabled; keep the intro available in that case.
    }

    const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line-inner");
    const heroIntro = document.querySelector<HTMLElement>(".hero-intro");
    const heroDesc = document.querySelector<HTMLElement>(".hero-description p");
    const heroActions = document.querySelectorAll<HTMLElement>(".hero-actions > *");
    const portraitWrap = document.querySelector<HTMLElement>(".portrait-image-wrap");
    const portraitImg = document.querySelector<HTMLElement>(".portrait-image-wrap img");
    const portraitCross = document.querySelector<HTMLElement>(".portrait-cross");
    const portraitCaption = document.querySelector<HTMLElement>(".hero-portrait figcaption");
    const logoEl = document.querySelector<HTMLElement>(".navigation .wordmark");
    const navItems = document.querySelectorAll<HTMLElement>(
      ".navigation .desktop-nav, .navigation .nav-contact, .navigation .mobile-menu",
    );
    const atmosphere = stage.querySelector<HTMLElement>(".overture-atmosphere");
    const orbits = stage.querySelector<HTMLElement>(".overture-orbits");
    const trails = stage.querySelectorAll<SVGElement>(".overture-orbit-trail");
    const glow = stage.querySelector<HTMLElement>(".overture-eclipse");
    const notes = stage.querySelectorAll<HTMLElement>(".overture-note");
    const chars = stage.querySelectorAll<HTMLElement>(".overture-char");

    const isDesktop = window.innerWidth >= 900;
    const isMobile = window.innerWidth <= 600;

    const ctx = gsap.context(() => {
      gsap.set(stage, { visibility: "visible" });
      // 1. Measure live destination coordinates for BOTH Dual-FLIP elements
      const targetPortraitRect = portraitWrap?.getBoundingClientRect();
      const targetLogoRect = logoEl?.getBoundingClientRect();

      // 2. Lock centered starting coordinates for the FLIP Portrait Card
      const startW = isMobile ? 176 : Math.min(320, Math.max(245, window.innerWidth * 0.22));
      const startH = isMobile ? 176 : startW / 0.91;
      const startLeft = (window.innerWidth - startW) / 2;
      const startTop = (window.innerHeight - startH) / 2;

      gsap.set(flipCard, {
        left: startLeft,
        top: startTop,
        width: startW,
        height: startH,
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
      });

      if (flipImgRef.current) {
        gsap.set(flipImgRef.current, { scale: 1.18, filter: "contrast(1.1)" });
      }

      // 3. Lock centered starting coordinates for the FLIP Signature Wordmark ("tharindu.")
      const baseLogoW = signature.offsetWidth || targetLogoRect?.width || 118;
      const baseLogoH = signature.offsetHeight || targetLogoRect?.height || 44;
      const startLogoScale = isMobile ? 1.95 : 3.1;
      const sigStartLeft = (window.innerWidth - baseLogoW * startLogoScale) / 2;
      const sigStartTop = (window.innerHeight - baseLogoH * startLogoScale) / 2;

      gsap.set(signature, {
        left: sigStartLeft,
        top: sigStartTop,
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        scale: startLogoScale,
      });

      // 4. Prepare Hero & Navbar elements underneath the stage
      if (portraitWrap) gsap.set(portraitWrap, { opacity: 0 });
      if (logoEl) gsap.set(logoEl, { opacity: 0 });
      if (navItems.length) gsap.set(navItems, { y: -18, opacity: 0 });
      if (heroIntro) gsap.set(heroIntro, { y: 18, opacity: 0 });
      if (heroLines.length) {
        gsap.set(heroLines, {
          yPercent: 115,
          rotateZ: 1.8,
          transformOrigin: "left bottom",
        });
      }
      if (heroDesc) gsap.set(heroDesc, { y: 20, opacity: 0 });
      if (heroActions.length) gsap.set(heroActions, { y: 16, opacity: 0 });
      if (portraitCaption) gsap.set(portraitCaption, { y: 14, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          try {
            window.sessionStorage.setItem(INTRO_SEEN_KEY, "true");
          } catch {
            // The intro remains usable when browser storage is unavailable.
          }
          document.documentElement.classList.remove("intro-playing");
          document.documentElement.classList.add("intro-seen");
          setDone(true);
        },
      });

      // Light gathers around the portrait as the signature rises.
      tl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.62,
          stagger: 0.024,
          ease: "expo.out",
        },
        0,
      )
        .fromTo(
          glow,
          { scale: 0.72, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
          0,
        )
        .fromTo(
          orbits,
          { scale: 0.88, rotation: -12, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.75 },
          0,
        )
        .fromTo(
          trails,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.35,
            stagger: 0.08,
            ease: "power2.inOut",
          },
          0.03,
        )
        .fromTo(
          notes,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
          0.12,
        )
        // A circular aperture opens behind the original portrait/name handoff.
        .to(notes, { y: -8, opacity: 0, duration: 0.28 }, 0.72)
        .to(
          orbits,
          { scale: 1.22, rotation: 16, opacity: 0, duration: 0.65, ease: "power2.in" },
          0.65,
        )
        .to(
          atmosphere,
          {
            "--reveal-radius": `${Math.hypot(window.innerWidth, window.innerHeight) / 2 + 2}px`,
            duration: 1.05,
            ease: "expo.inOut",
          },
          0.72,
        );

      // Dual-FLIP 1: Giant center "tharindu." flies & scales directly into Navbar .wordmark
      if (targetLogoRect && targetLogoRect.width > 0) {
        tl.to(
          signature,
          {
            left: targetLogoRect.left,
            top: targetLogoRect.top,
            scale: 1,
            duration: 0.9,
            ease: "expo.inOut",
          },
          0.7,
        ).to(
          signature,
          {
            color: "#1c1d1a",
            textShadow: "0 0px 0px rgba(0, 0, 0, 0)",
            duration: 0.48,
            ease: "power2.out",
          },
          0.98,
        );
        if (accentCharRef.current) {
          tl.to(
            accentCharRef.current,
            {
              color: "#9e3e28",
              duration: 0.48,
              ease: "power2.out",
            },
            0.98,
          );
        }
      } else {
        tl.to(signature, { y: -60, opacity: 0, duration: 0.5 }, 0.7);
      }

      // Dual-FLIP 2: Center Portrait Card flies & resizes directly into Hero .portrait-image-wrap
      if (targetPortraitRect && targetPortraitRect.width > 0) {
        tl.to(
          flipCard,
          {
            left: targetPortraitRect.left,
            top: targetPortraitRect.top,
            width: targetPortraitRect.width,
            height: targetPortraitRect.height,
            borderRadius: "3px",
            borderColor: "rgba(246, 244, 238, 0)",
            boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
            duration: 1.0,
            ease: "expo.inOut",
          },
          0.74,
        );
      } else {
        tl.to(flipCard, { scale: 1.08, opacity: 0, duration: 0.65, ease: "expo.inOut" }, 0.74);
      }

      if (flipImgRef.current) {
        tl.to(
          flipImgRef.current,
          {
            scale: 1,
            filter: "contrast(1)",
            duration: 1.02,
            ease: "expo.inOut",
          },
          0.74,
        );
      }

      // Phase 3 (1.14s - 1.92s): Hero typography & Navbar links cascade into place
      if (heroLines.length) {
        tl.to(
          heroLines,
          {
            yPercent: 0,
            rotateZ: 0,
            duration: 0.92,
            stagger: 0.07,
            ease: "expo.out",
            clearProps: "transform",
          },
          1.14,
        );
      }
      if (navItems.length) {
        tl.to(
          navItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.05,
            clearProps: "transform,opacity",
          },
          1.12,
        );
      }
      if (heroIntro) {
        tl.to(
          heroIntro,
          { y: 0, opacity: 1, duration: 0.74, clearProps: "transform,opacity" },
          1.14,
        );
      }
      if (heroDesc) {
        tl.to(heroDesc, { y: 0, opacity: 1, duration: 0.74, clearProps: "transform,opacity" }, 1.2);
      }
      if (heroActions.length) {
        tl.to(
          heroActions,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            clearProps: "transform,opacity",
          },
          1.26,
        );
      }
      if (portraitCaption) {
        tl.to(
          portraitCaption,
          { y: 0, opacity: 1, duration: 0.7, clearProps: "transform,opacity" },
          1.3,
        );
      }

      // Phase 4 (1.76s - 1.92s): Seamless zero-seam handoff to live DOM elements
      if (portraitWrap) {
        tl.to(
          portraitWrap,
          {
            opacity: 1,
            duration: 0.12,
            ease: "none",
            clearProps: "opacity",
          },
          1.76,
        );
      }
      if (logoEl) {
        tl.to(
          logoEl,
          {
            opacity: 1,
            duration: 0.12,
            ease: "none",
            clearProps: "opacity",
          },
          1.76,
        );
      }
      tl.to(
        [flipCard, signature],
        {
          opacity: 0,
          duration: 0.16,
          ease: "power1.out",
        },
        1.8,
      );
    }, stage);

    // Subtle 3D magnetic parallax on Hero portrait after entrance
    let cleanupParallax: (() => void) | undefined;
    if (isDesktop && portraitWrap && portraitImg && portraitCross) {
      const xToWrap = gsap.quickTo(portraitWrap, "x", { duration: 0.7, ease: "power3.out" });
      const yToWrap = gsap.quickTo(portraitWrap, "y", { duration: 0.7, ease: "power3.out" });
      const xToImg = gsap.quickTo(portraitImg, "x", { duration: 0.9, ease: "power3.out" });
      const yToImg = gsap.quickTo(portraitImg, "y", { duration: 0.9, ease: "power3.out" });
      const rToCross = gsap.quickTo(portraitCross, "rotation", {
        duration: 0.6,
        ease: "power2.out",
      });

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        xToWrap(nx * 12);
        yToWrap(ny * 9);
        xToImg(nx * -7);
        yToImg(ny * -5);
        rToCross(nx * 90);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      cleanupParallax = () => window.removeEventListener("pointermove", onMove);
    }

    const onMotionChange = () => {
      if (!motionPreference.matches) return;
      cleanupParallax?.();
      ctx.revert();
      setDone(true);
    };
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      motionPreference.removeEventListener("change", onMotionChange);
      cleanupParallax?.();
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div className="overture-stage" ref={stageRef} aria-hidden="true">
      <div className="overture-atmosphere">
        <div className="overture-eclipse" />
      </div>
      <div className="overture-orbits">
        <svg viewBox="0 0 1000 700" fill="none" focusable="false">
          {[-24, 24, -58].map((angle, index) => (
            <g key={angle} transform={`rotate(${angle} 500 350)`}>
              <ellipse className="overture-orbit-track" cx="500" cy="350" rx="440" ry="176" />
              <ellipse
                className={`overture-orbit-trail overture-orbit-trail-${index}`}
                cx="500"
                cy="350"
                rx="440"
                ry="176"
                pathLength="1"
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="overture-note overture-note-bottom">
        <span className="overture-spark">✳</span>
        <span>Welcome to my world</span>
      </div>

      {/* Center Portrait Card that physically FLIP-morphs into the Hero section's portrait slot */}
      <div className="overture-flip-card" ref={flipCardRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={flipImgRef}
          src="/images/tharindu-portrait.webp"
          alt=""
          decoding="sync"
          fetchPriority="high"
        />
        <span className="portrait-index eyebrow">The person behind the pixels</span>
        <span className="portrait-cross">+</span>
      </div>

      {/* Dual-FLIP Signature Wordmark — physically flies from center to top-left Navbar .wordmark */}
      <div className="overture-signature" ref={signatureRef}>
        {SIGNATURE_CHARS.map((ch, idx) => (
          <span className="overture-char" key={idx}>
            {ch}
          </span>
        ))}
        <span className="overture-char overture-char-accent" ref={accentCharRef}>
          .
        </span>
      </div>
    </div>
  );
}
