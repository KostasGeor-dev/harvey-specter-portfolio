"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxX({
  children,
  className,
  offset = "-8vw",
}: {
  children: React.ReactNode;
  className?: string;
  offset?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: offset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [offset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
