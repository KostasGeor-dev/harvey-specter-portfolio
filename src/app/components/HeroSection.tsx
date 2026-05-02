"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ heroImg }: { heroImg: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const harveyRef  = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })
        .to(harveyRef.current,  { x: "-55vw", ease: "none" }, 0)
        .to(labelRef.current,   { x: "-55vw", ease: "none" }, 0)
        .to(specterRef.current, { x: "55vw",  ease: "none" }, 0)
        .to(imgRef.current,     { scale: 1.18, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="relative overflow-hidden h-screen">

      {/* Full-bleed background photo */}
      <img
        ref={imgRef}
        src={heroImg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
      />

      {/* Progressive blur: stacked layers so blur intensity increases toward the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[18vh] md:h-[28vh] pointer-events-none">
        <div className="absolute inset-0 [backdrop-filter:blur(0.5px)] md:[backdrop-filter:blur(0.5px)] [mask-image:linear-gradient(to_top,black_80%,transparent)]" />
        <div className="absolute inset-0 [backdrop-filter:blur(1px)] md:[backdrop-filter:blur(1px)] [mask-image:linear-gradient(to_top,black_65%,transparent)]" />
        <div className="absolute inset-0 [backdrop-filter:blur(2px)] md:[backdrop-filter:blur(2px)] [mask-image:linear-gradient(to_top,black_50%,transparent)]" />
        <div className="absolute inset-0 [backdrop-filter:blur(4px)] md:[backdrop-filter:blur(3px)] [mask-image:linear-gradient(to_top,black_35%,transparent)]" />
        <div className="absolute inset-0 [backdrop-filter:blur(6px)] md:[backdrop-filter:blur(5px)] [mask-image:linear-gradient(to_top,black_20%,transparent)]" />
        <div className="absolute inset-0 [backdrop-filter:blur(10px)] md:[backdrop-filter:blur(8px)] [mask-image:linear-gradient(to_top,black_5%,transparent)]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col px-4 md:px-8 justify-end md:justify-start md:pt-[calc(28vh+72px)] pb-6 md:pb-0">

        {/* ── Hero body ──────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-6 md:gap-0 w-full">

          {/* Label + heading */}
          <div className="flex flex-col items-center md:items-start w-full md:pb-[15px]">

            {/* "Hello I'm" — moves with Harvey */}
            <div
              ref={labelRef}
              className="flex items-center justify-center md:justify-start px-[18px] w-full md:mb-[-15px]"
            >
              <p className="font-mono text-sm text-white mix-blend-overlay uppercase leading-[1.1]">
                [ Hello i&apos;m ]
              </p>
            </div>

            {/* Harvey ← → Specter */}
            <h1
              className="
                text-[21vw] md:text-[13.5vw]
                font-medium text-white mix-blend-overlay
                [letter-spacing:-0.07em]
                leading-[0.8] md:leading-[1.1]
                text-left capitalize whitespace-pre-wrap md:whitespace-nowrap w-full
              "
            >
              <span ref={harveyRef} className="inline-block">Harvey</span>
              <span className="whitespace-pre select-none">{"   "}</span>
              <span ref={specterRef} className="inline-block">Specter</span>
            </h1>
          </div>

          {/* Tagline + CTA */}
          <div className="flex flex-col items-start md:items-end w-full">
            <div className="flex flex-col gap-[17px] w-[85%] md:w-[294px]">
              <p className="text-[14px] text-[#1f1f1f] [letter-spacing:-0.56px] uppercase leading-[1.1] italic">
                <span className="font-bold">H.Studio is a </span>
                <span className="font-normal">full-service</span>
                <span className="font-bold">
                  {" "}creative studio creating beautiful digital experiences and
                  products. We are an{" "}
                </span>
                <span className="font-normal">award winning</span>
                <span className="font-bold">
                  {" "}desing and art group specializing in branding, web design
                  and engineering.
                </span>
              </p>
              <CTAButton className="w-fit flex items-center justify-center bg-black text-white text-sm font-medium rounded-3xl px-4 py-3 [letter-spacing:-0.56px] border border-black">
                Let&apos;s talk
              </CTAButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
