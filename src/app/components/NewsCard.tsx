"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function NewsCard({
  img,
  text,
  category,
  href,
  className = "",
  imageHeight = "469",
}: {
  img: string;
  text: string;
  category?: string;
  href?: string;
  className?: string;
  imageHeight?: string;
}) {
  const imgRef      = useRef<HTMLImageElement>(null);
  const readMoreRef = useRef<HTMLDivElement>(null);
  const arrow1Ref   = useRef<SVGPathElement>(null);
  const arrow2Ref   = useRef<SVGPathElement>(null);

  const onEnter = useCallback(() => {
    gsap.to(imgRef.current,                    { scale: 1.08, duration: 0.6,  ease: "power3.out" });
    gsap.to(readMoreRef.current,               { x: 6,        duration: 0.4,  ease: "power3.out" });
    gsap.to([arrow1Ref.current, arrow2Ref.current], { x: 2, y: -2, duration: 0.35, ease: "power3.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(imgRef.current,                    { scale: 1,    duration: 0.55, ease: "power3.out" });
    gsap.to(readMoreRef.current,               { x: 0,        duration: 0.4,  ease: "power3.out" });
    gsap.to([arrow1Ref.current, arrow2Ref.current], { x: 0, y: 0,   duration: 0.35, ease: "power3.out" });
  }, []);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`flex-1 min-w-0 flex flex-col gap-4 ${className}`}
    >
      <div className="relative overflow-hidden" style={{ height: `${imageHeight}px` }}>
        <img
          ref={imgRef}
          src={img}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
      </div>
      {category && (
        <p className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1] [letter-spacing:0.04em]">
          {category}
        </p>
      )}
      <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">{text}</p>
      {href ? (
        <Link
          href={href}
          ref={readMoreRef as React.Ref<HTMLAnchorElement>}
          aria-label={`Read article: ${text.substring(0, 80)}`}
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
