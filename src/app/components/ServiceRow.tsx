"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

type Service = { num: string; title: string; desc: string; img: string };

export default function ServiceRow({ s }: { s: Service }) {
  const imgRef   = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const numRef   = useRef<HTMLParagraphElement>(null);
  const bgRef    = useRef<HTMLSpanElement>(null);

  const targets = () => [imgRef.current, titleRef.current, lineRef.current, numRef.current, bgRef.current];

  const onEnter = useCallback(() => {
    gsap.killTweensOf(targets());
    gsap.to(bgRef.current,    { scaleX: 1,    duration: 0.55, ease: "power4.out",  transformOrigin: "left center" });
    gsap.to(lineRef.current,  { opacity: 1,   duration: 0.3,  ease: "power2.out" });
    gsap.to(numRef.current,   { opacity: 1,   duration: 0.3,  ease: "power2.out" });
    gsap.to(titleRef.current, { x: 10,        duration: 0.45, ease: "power3.out" });
    gsap.to(imgRef.current,   { scale: 1.08,  duration: 0.6,  ease: "power3.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.killTweensOf(targets());
    gsap.to(bgRef.current,    { scaleX: 0,   duration: 0.45, ease: "power4.in",  transformOrigin: "right center" });
    gsap.to(lineRef.current,  { opacity: 0.3, duration: 0.3,  ease: "power2.out" });
    gsap.to(numRef.current,   { opacity: 0.5, duration: 0.3,  ease: "power2.out" });
    gsap.to(titleRef.current, { x: 0,         duration: 0.4,  ease: "power3.out" });
    gsap.to(imgRef.current,   { scale: 1,     duration: 0.55, ease: "power3.out" });
  }, []);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      className="relative flex flex-col gap-[9px] focus:outline-none"
    >
      {/* Hover background — sweeps left→right */}
      <span
        ref={bgRef}
        className="absolute inset-0 bg-white/[0.06] pointer-events-none"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      />

      {/* Number + divider */}
      <div className="flex flex-col gap-[9px]">
        <p ref={numRef} className="font-mono text-[14px] text-white uppercase leading-[1.1]" style={{ opacity: 0.5 }}>
          [ {s.num} ]
        </p>
        <div ref={lineRef} className="w-full h-px bg-white" style={{ opacity: 0.3 }} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
        <p
          ref={titleRef}
          className="font-bold italic text-[36px] text-white uppercase leading-[1.1] [letter-spacing:-1.44px] whitespace-nowrap"
        >
          {s.title}
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-start lg:shrink-0">
          <p className="text-[14px] text-white leading-[1.3] [letter-spacing:-0.56px] lg:w-[340px] xl:w-[393px]">
            {s.desc}
          </p>
          <div className="relative size-[151px] overflow-hidden shrink-0">
            <img
              ref={imgRef}
              src={s.img}
              alt={s.title}
              loading="lazy"
              className="absolute inset-0 size-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
