"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlurImage({
  src,
  className,
  blur = 24,
}: {
  src: string;
  className?: string;
  blur?: number;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const section = img.closest<HTMLElement>("section") ?? img;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { filter: `blur(${blur}px)` },
        {
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [blur]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      loading="lazy"
      className={className}
    />
  );
}
