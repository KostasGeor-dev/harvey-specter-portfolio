"use client";

import { useRef, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

type T = {
  name: string;
  logo: string;
  logoW: number;
  logoH: number;
  text: string;
};

export default function TestimonialCard({
  t,
  rotation = 0,
  className = "",
  style,
}: {
  t: T;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Set initial rotation via GSAP before first paint so it owns the transform
  useLayoutEffect(() => {
    gsap.set(ref.current, { rotation });
  }, [rotation]);

  const onEnter = useCallback(() => {
    gsap.set(ref.current, { zIndex: 10 });
    gsap.to(ref.current, {
      rotation: 0,
      y: -12,
      scale: 1.03,
      boxShadow: "0 28px 64px rgba(0,0,0,0.18)",
      duration: 0.45,
      ease: "power3.out",
    });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(ref.current, {
      rotation,
      y: 0,
      scale: 1,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => { if (ref.current) gsap.set(ref.current, { zIndex: "auto" }); },
    });
  }, [rotation]);

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 ${className}`}
      style={style}
    >
      <img
        src={t.logo}
        alt={t.name}
        loading="lazy"
        style={{ width: t.logoW, height: t.logoH, objectFit: "contain" }}
      />
      <p className="text-[18px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">
        {t.text}
      </p>
      <p className="font-black text-[16px] text-black uppercase leading-[1.1] [letter-spacing:-0.04em] whitespace-nowrap">
        {t.name}
      </p>
    </div>
  );
}
