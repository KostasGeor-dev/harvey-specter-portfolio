"use client";

import { useEffect } from "react";
import gsap from "gsap";

// Speeds GSAP to effectively instant when the user prefers reduced motion.
// Rendered once in layout.tsx — applies globally to every animation on the site.
export default function ReducedMotion() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = (matches: boolean) => {
      gsap.globalTimeline.timeScale(matches ? 1000 : 1);
    };
    apply(mq.matches);
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return null;
}
