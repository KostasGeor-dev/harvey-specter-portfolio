"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DIM  = "rgba(0,0,0,0.12)";
const FULL = "rgba(0,0,0,1)";

function DesktopText() {
  return (
    <div className="hidden md:flex flex-col gap-2">
      <div data-fill-line="" className="flex gap-3 items-start">
        <p className="font-light text-[9.375vw] leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
          {"A creative director   /"}
        </p>
        <span className="font-mono text-[14px] leading-[1.1]">001</span>
      </div>
      <p data-fill-line="" className="font-light text-[9.375vw] leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap pl-[22.3%]">
        Photographer
      </p>
      <div data-fill-line="" className="flex justify-end">
        <p className="font-light text-[9.375vw] leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
          {"Born "}
          <span
            className="font-playfair italic font-normal"
            style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
          >
            {"&"}
          </span>
          {" raised"}
        </p>
      </div>
      <p data-fill-line="" className="font-light text-[9.375vw] leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
        on the south side
      </p>
      <div data-fill-line="" className="flex items-baseline justify-end gap-3">
        <p className="font-light text-[9.375vw] leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
          of chicago.
        </p>
        <span className="font-mono text-[14px] leading-[1.1] whitespace-nowrap">
          [ creative freelancer ]
        </span>
      </div>
    </div>
  );
}

function MobileText() {
  return (
    <div className="md:hidden flex flex-col gap-3 items-center text-center">
      <span data-fill-line="" className="font-mono text-[14px] leading-[1.1]">001</span>
      <div className="flex flex-col gap-2 items-center uppercase">
        <p data-fill-line="" className="font-light text-[8.5vw] leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
          {"A creative director   /"}
        </p>
        <p data-fill-line="" className="font-light text-[8.5vw] leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
          Photographer
        </p>
        <p data-fill-line="" className="font-light text-[8.5vw] leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
          {"Born "}
          <span
            className="font-playfair italic font-normal"
            style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
          >
            {"&"}
          </span>
          {" raised"}
        </p>
        <p data-fill-line="" className="font-light text-[8.5vw] leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
          on the south side
        </p>
        <p data-fill-line="" className="font-light text-[8.5vw] leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
          of chicago.
        </p>
      </div>
      <span data-fill-line="" className="font-mono text-[14px] leading-[1.1]">
        [ creative freelancer ]
      </span>
    </div>
  );
}

export default function IdentityText() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const lines = Array.from(wrapper.querySelectorAll<HTMLElement>("[data-fill-line]"));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { color: DIM },
        {
          color: FULL,
          ease: "none",
          stagger: { each: 0.18, from: "start" },
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <DesktopText />
      <MobileText />
    </div>
  );
}
