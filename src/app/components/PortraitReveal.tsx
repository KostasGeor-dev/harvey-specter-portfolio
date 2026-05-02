"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortraitReveal({ src, className, alt = "Portrait of Harvey Specter" }: { src: string; className?: string; alt?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    /* Pin the overlay to exact wrapper pixel dimensions so it
       can never exceed the portrait bounds regardless of how
       the browser resolves percentage sizing on absolute children. */
    const syncSize = () => {
      overlay.style.width  = wrapper.offsetWidth  + "px";
      overlay.style.height = wrapper.offsetHeight + "px";
    };
    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(wrapper);

    const ctx = gsap.context(() => {
      gsap.fromTo(overlay,
        { clipPath: "inset(0% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            end: "center 50%",
            scrub: 1,
          },
        }
      );
    }, wrapper);

    return () => {
      ctx.revert();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 size-full object-cover pointer-events-none select-none"
      />
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 bg-black"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      />
    </div>
  );
}
