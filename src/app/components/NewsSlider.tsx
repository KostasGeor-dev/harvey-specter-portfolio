"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type NewsItem = { img: string; text: string; category?: string; href?: string };

function ArrowButton({ onClick, ariaLabel, children }: { onClick: () => void; ariaLabel: string; children: React.ReactNode }) {
  const btnRef  = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const onEnter = useCallback(() => {
    const fill = fillRef.current;
    const btn  = btnRef.current;
    if (!fill || !btn) return;
    gsap.killTweensOf([fill, btn]);
    gsap.fromTo(fill,
      { clipPath: "inset(50% 0% 50% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "power4.inOut" }
    );
    gsap.to(btn,  { color: "#ffffff", duration: 0.18, delay: 0.18 });
  }, []);

  const onLeave = useCallback(() => {
    const fill = fillRef.current;
    const btn  = btnRef.current;
    if (!fill || !btn) return;
    gsap.killTweensOf([fill, btn]);
    gsap.to(fill, { clipPath: "inset(50% 0% 50% 0%)", duration: 0.4, ease: "power4.inOut" });
    gsap.to(btn,  { color: "#000000", duration: 0.18, delay: 0.12 });
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={ariaLabel}
      className="relative overflow-hidden w-9 h-9 rounded-full border border-black flex items-center justify-center"
    >
      <span
        ref={fillRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ clipPath: "inset(50% 0% 50% 0%)" }}
      />
      <span className="relative z-10" aria-hidden="true">{children}</span>
    </button>
  );
}

function SlideItem({ item }: { item: NewsItem }) {
  const imgRef      = useRef<HTMLImageElement>(null);
  const readMoreRef = useRef<HTMLDivElement>(null);
  const arrow1Ref   = useRef<SVGPathElement>(null);
  const arrow2Ref   = useRef<SVGPathElement>(null);

  const onEnter = useCallback(() => {
    gsap.to(imgRef.current,                         { scale: 1.08, duration: 0.6,  ease: "power3.out" });
    gsap.to(readMoreRef.current,                    { x: 6,        duration: 0.4,  ease: "power3.out" });
    gsap.to([arrow1Ref.current, arrow2Ref.current], { x: 2, y: -2, duration: 0.35, ease: "power3.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(imgRef.current,                         { scale: 1,    duration: 0.55, ease: "power3.out" });
    gsap.to(readMoreRef.current,                    { x: 0,        duration: 0.4,  ease: "power3.out" });
    gsap.to([arrow1Ref.current, arrow2Ref.current], { x: 0, y: 0,  duration: 0.35, ease: "power3.out" });
  }, []);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="w-full shrink-0 flex flex-col gap-4"
    >
      <div className="relative h-[398px] overflow-hidden">
        <img
          ref={imgRef}
          src={item.img}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover pointer-events-none select-none"
        />
      </div>
      {item.category && (
        <p className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1] [letter-spacing:0.04em]">
          {item.category}
        </p>
      )}
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">
        {item.text}
      </p>
      {item.href ? (
        <Link
          href={item.href}
          ref={readMoreRef as React.Ref<HTMLAnchorElement>}
          aria-label={`Read article: ${item.text.substring(0, 80)}`}
          className="border-b border-black flex items-center gap-2.5 py-1 self-start"
        >
          <span className="font-medium text-[14px] text-black [letter-spacing:-0.56px] whitespace-nowrap">Read more</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path ref={arrow1Ref} d="M4 14L14 4"      stroke="black" strokeWidth="1.2" strokeLinecap="round" />
            <path ref={arrow2Ref} d="M6.5 4H14V11.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ) : (
        <div
          ref={readMoreRef}
          className="border-b border-black flex items-center gap-2.5 py-1 self-start"
        >
          <span className="font-medium text-[14px] text-black [letter-spacing:-0.56px] whitespace-nowrap">Read more</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path ref={arrow1Ref} d="M4 14L14 4"      stroke="black" strokeWidth="1.2" strokeLinecap="round" />
            <path ref={arrow2Ref} d="M6.5 4H14V11.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function NewsSlider({ items }: { items: NewsItem[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + items.length) % items.length);
  const next = () => setCurrent((i) => (i + 1) % items.length);

  return (
    <div className="flex flex-col gap-6">
      {/* Slide track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <SlideItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex gap-2" role="tablist" aria-label="Slides">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === current}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-black" : "w-2 bg-black/30"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex gap-3">
          <ArrowButton onClick={prev} ariaLabel="Previous slide">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ArrowButton>
          <ArrowButton onClick={next} ariaLabel="Next slide">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}
