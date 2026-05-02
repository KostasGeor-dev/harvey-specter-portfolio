"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useModal } from "./ModalProvider";

type Variant = "dark" | "ghost";

export default function CTAButton({
  children,
  className = "",
  variant = "dark",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  onClick?: () => void;
}) {
  const { openModal } = useModal();
  const btnRef   = useRef<HTMLButtonElement>(null);
  const fillRef  = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const onEnter = useCallback(() => {
    const fill  = fillRef.current;
    const label = labelRef.current;
    const btn   = btnRef.current;
    if (!fill || !label || !btn) return;

    gsap.killTweensOf([fill, label, btn]);

    // Fill expands from center outward (eye opening)
    gsap.fromTo(fill,
      { clipPath: "inset(50% 0% 50% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power4.inOut" }
    );
    gsap.to(label, { color: "#000000", duration: 0.18, delay: 0.2 });
    // Slight upward lift
    gsap.to(btn, { y: -3, duration: 0.35, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    const fill  = fillRef.current;
    const label = labelRef.current;
    const btn   = btnRef.current;
    if (!fill || !label || !btn) return;

    gsap.killTweensOf([fill, label, btn]);

    // Fill contracts back to center (eye closing)
    gsap.to(fill, { clipPath: "inset(50% 0% 50% 0%)", duration: 0.45, ease: "power4.inOut" });
    gsap.to(label, { color: "#ffffff", duration: 0.18, delay: 0.12 });
    // Return to resting position
    gsap.to(btn, { y: 0, duration: 0.35, ease: "power2.out" });
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick ?? openModal}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* The sweeping fill layer */}
      <span
        ref={fillRef}
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ clipPath: "inset(50% 0% 50% 0%)" }}
      />
      {/* Text sits above the fill */}
      <span ref={labelRef} className="relative z-10">
        {children}
      </span>
    </button>
  );
}
