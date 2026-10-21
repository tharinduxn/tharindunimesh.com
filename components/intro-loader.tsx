"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "@/app/styles/intro.css";

const WORDS = ["THOUGHT", "FORM", "FUNCTION"];
const COLUMNS = [0, 1, 2, 3, 4];

export function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const brandRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root) return;

    // 1. Lightweight 60fps interactive binary/architectural glyph field on Canvas
    let rafId = 0;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    if (canvas) {
      const ctx2d = canvas.getContext("2d");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const resizeCanvas = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx2d?.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resizeCanvas();

      const count = window.innerWidth < 600 ? 36 : 68;
      const glyphs = ["0", "1", "·", "+"];
      const particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.35 - Math.random() * 0.55,
        char: glyphs[i % glyphs.length],
        alpha: 0.12 + Math.random() * 0.28,
        accent: i % 6 === 0,
        size: i % 4 === 0 ? 11 : 9,
      }));

      const renderParticles = () => {
        if (!ctx2d) return;
        ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx2d.font = '500 10px monospace';
        ctx2d.textAlign = "center";
        ctx2d.textBaseline = "middle";

        for (const p of particles) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 16000 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 126) * 1.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -20) p.y = window.innerHeight + 20;
          if (p.x < -20) p.x = window.innerWidth + 20;
          if (p.x > window.innerWidth + 20) p.x = -20;

          ctx2d.fillStyle = p.accent
            ? `rgba(229, 155, 134, ${p.alpha + 0.15})`
            : `rgba(246, 244, 238, ${p.alpha})`;
          ctx2d.fillText(p.char, p.x, p.y);
        }

        rafId = window.requestAnimationFrame(renderParticles);
      };
      rafId = window.requestAnimationFrame(renderParticles);
    }

    // 2. GSAP Choreographed Overture + Seamless Hero Handoff
    const heroSection = document.querySelector<HTMLElement>(".hero");
    const heroLines = document.querySelectorAll<HTMLElement>(".hero-line-inner");
    const heroIntro = document.querySelector<HTMLElement>(".hero-intro");
    const heroDesc = document.querySelector<HTMLElement>(".hero-description");
    const portraitWrap = document.querySelector<HTMLElement>(".portrait-image-wrap");
    const portraitImg = document.querySelector<HTMLElement>(".portrait-image-wrap img");
    const portraitCaption = document.querySelector<HTMLElement>(".hero-portrait figcaption");
    const navbar = document.querySelector<HTMLElement>(".navigation");

    const ctx = gsap.context(() => {
      const columns = gsap.utils.toArray<HTMLElement>(".intro-col", root);
      const corners = gsap.utils.toArray<HTMLElement>(".intro-corner", root);
      const crosshairs = gsap.utils.toArray<HTMLElement>(".intro-cross", root);
      const axisLines = gsap.utils.toArray<HTMLElement>(".intro-axis", root);

      // Prepare Hero initial states behind the architectural shutters
      if (heroSection) gsap.set(heroSection, { scale: 1.035, transformOrigin: "center top" });
      if (heroLines.length) {
        gsap.set(heroLines, { yPercent: 118, rotateZ: 1.5, transformOrigin: "left bottom" });
      }
      if (heroIntro) gsap.set(heroIntro, { y: 18, opacity: 0 });
      if (heroDesc) gsap.set(heroDesc, { y: 22, opacity: 0 });
      if (portraitWrap) {
        gsap.set(portraitWrap, {
          clipPath: "inset(18% 14% 18% 14% round 4px)",
          opacity: 0,
        });
      }
      if (portraitImg) gsap.set(portraitImg, { scale: 1.22, filter: "contrast(1.15)" });
      if (portraitCaption) gsap.set(portraitCaption, { y: 14, opacity: 0 });
      if (navbar) gsap.set(navbar, { y: -24, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          window.cancelAnimationFrame(rafId);
          setDone(true);
        },
      });

      // Stage A: Blueprint axes, corners, crosshairs, and SVG optical ring
      tl.fromTo(
        axisLines,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.75, stagger: 0.06, ease: "expo.inOut" },
        0,
      )
        .fromTo(
          corners,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          0.08,
        )
        .fromTo(
          crosshairs,
          { scale: 0, rotate: -90, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 0.65, duration: 0.65, stagger: 0.05, ease: "back.out(1.7)" },
          0.1,
        );

      if (ringRef.current) {
        tl.fromTo(
          ringRef.current,
          { strokeDashoffset: 566, rotate: -45, transformOrigin: "center center" },
          { strokeDashoffset: 0, rotate: 0, duration: 1.35, ease: "expo.inOut" },
          0.05,
        );
      }

      // Stage B: Kinetic Typography Trilogy (THOUGHT -> FORM -> FUNCTION)
      wordRefs.current.forEach((wordEl, index) => {
        if (!wordEl) return;
        const startAt = 0.08 + index * 0.35;
        tl.fromTo(
          wordEl,
          { yPercent: 120, skewY: 4, opacity: 0 },
          { yPercent: 0, skewY: 0, opacity: 1, duration: 0.34, ease: "expo.out" },
          startAt,
        ).to(
          wordEl,
          { yPercent: -120, skewY: -3, opacity: 0, duration: 0.24, ease: "expo.in" },
          startAt + 0.26,
        );
      });

      // Stage C: Signature Monogram "tharindu." + Terracotta Light Bloom
      tl.fromTo(
        brandRef.current,
        { yPercent: 115, scale: 0.94, opacity: 0 },
        { yPercent: 0, scale: 1, opacity: 1, duration: 0.55, ease: "expo.out" },
        1.26,
      )
        .fromTo(
          dotRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.4)" },
          1.38,
        )
        .fromTo(
          glowRef.current,
          { scale: 0.4, opacity: 0 },
          { scale: 1.45, opacity: 0.85, duration: 0.6, ease: "power2.out" },
          1.26,
        );

      // Stage D: Aperture Expansion + 5-Column Architectural Wave Shutter Reveal
      tl.to(
        [corners, crosshairs, axisLines, canvas, glowRef.current],
        { opacity: 0, duration: 0.38, ease: "power2.in" },
        1.72,
      )
        .to(
          apertureRef.current,
          {
            scale: 1.32,
            y: -28,
            opacity: 0,
            duration: 0.55,
            ease: "expo.in",
          },
          1.66,
        )
        .to(
          columns,
          {
            yPercent: -102,
            duration: 0.92,
            stagger: { each: 0.055, from: "center" },
            ease: "expo.inOut",
          },
          1.7,
        );

      // Stage E: Synchronized Hero Spatial Entrance (overlaps shutter opening)
      if (heroSection) {
        tl.to(
          heroSection,
          { scale: 1, duration: 1.2, ease: "expo.out", clearProps: "transform" },
          1.82,
        );
      }
      if (navbar) {
        tl.to(
          navbar,
          { y: 0, opacity: 1, duration: 0.85, clearProps: "transform,opacity" },
          1.92,
        );
      }
      if (heroIntro) {
        tl.to(
          heroIntro,
          { y: 0, opacity: 1, duration: 0.85, clearProps: "transform,opacity" },
          1.96,
        );
      }
      if (heroLines.length) {
        tl.to(
          heroLines,
          {
            yPercent: 0,
            rotateZ: 0,
            duration: 1.1,
            stagger: 0.09,
            ease: "expo.out",
            clearProps: "transform",
          },
          1.9,
        );
      }
      if (portraitWrap) {
        tl.to(
          portraitWrap,
          {
            clipPath: "inset(0% 0% 0% 0% round 3px)",
            opacity: 1,
            duration: 1.15,
            ease: "expo.out",
            clearProps: "clipPath,opacity",
          },
          1.92,
        );
      }
      if (portraitImg) {
        tl.to(
          portraitImg,
          {
            scale: 1,
            filter: "contrast(1)",
            duration: 1.45,
            ease: "expo.out",
            clearProps: "transform,filter",
          },
          1.92,
        );
      }
      if (heroDesc) {
        tl.to(
          heroDesc,
          { y: 0, opacity: 1, duration: 0.9, clearProps: "transform,opacity" },
          2.08,
        );
      }
      if (portraitCaption) {
        tl.to(
          portraitCaption,
          { y: 0, opacity: 1, duration: 0.85, clearProps: "transform,opacity" },
          2.14,
        );
      }
    }, root);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div className="intro-stage" ref={rootRef} aria-hidden="true">
      {/* 5 Architectural Vertical Shutter Columns */}
      <div className="intro-shutters">
        {COLUMNS.map((col) => (
          <div key={col} className="intro-col">
            <span className="intro-col-line" />
          </div>
        ))}
      </div>

      {/* Interactive 60fps Binary & Coordinate Particle Field */}
      <canvas className="intro-canvas" ref={canvasRef} />

      {/* Warm Terracotta Ambient Bloom */}
      <div className="intro-glow" ref={glowRef} />

      {/* Architectural Axis Hairlines */}
      <span className="intro-axis intro-axis-h" />
      <span className="intro-axis intro-axis-v" />

      {/* Precision Optical Crosshairs */}
      <span className="intro-cross intro-cross-tl">+</span>
      <span className="intro-cross intro-cross-tr">+</span>
      <span className="intro-cross intro-cross-bl">+</span>
      <span className="intro-cross intro-cross-br">+</span>

      {/* Corner Editorial Telemetry */}
      <div className="intro-corner intro-corner-tl eyebrow">
        <span className="intro-dot" /> Tharindu Nimesh · Portfolio
      </div>
      <div className="intro-corner intro-corner-tr eyebrow">
        6.9271° N, 80.5469° E — Matara, LK
      </div>
      <div className="intro-corner intro-corner-bl eyebrow">
        Thought → Form → Function
      </div>
      <div className="intro-corner intro-corner-br eyebrow">
        Web &amp; Mobile Engineering
      </div>

      {/* Center Optical Aperture + Kinetic Typography Stage */}
      <div className="intro-aperture" ref={apertureRef}>
        <svg className="intro-ring-svg" viewBox="0 0 200 200">
          <circle
            className="intro-ring-track"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            strokeWidth="0.75"
          />
          <circle
            ref={ringRef}
            className="intro-ring-active"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            strokeWidth="1.25"
            strokeDasharray="566"
            strokeDashoffset="566"
          />
        </svg>

        <div className="intro-kinetic-box">
          {WORDS.map((word, index) => (
            <span key={word} className="intro-kinetic-mask">
              <span
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="intro-kinetic-word eyebrow"
              >
                {word}
              </span>
            </span>
          ))}

          <span className="intro-brand-mask">
            <span className="intro-brand-word" ref={brandRef}>
              tharindu
              <span className="intro-brand-dot" ref={dotRef}>
                .
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
