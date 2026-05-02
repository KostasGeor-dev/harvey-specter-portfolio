"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { urlFor } from "@/sanity/lib/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Project = { _id: string; title: string; slug?: string | null; tags: string[] | null; coverImage: any; imageUrl: string | null };

export default function ProjectCard({
  project,
  imageClassName,
  titleClassName,
}: {
  project: Project;
  imageClassName: string;
  titleClassName: string;
}) {
  const imgRef    = useRef<HTMLImageElement>(null);
  const titleRef  = useRef<HTMLParagraphElement>(null);
  const fillRef   = useRef<SVGCircleElement>(null);
  const strokeRef = useRef<SVGCircleElement>(null);
  const path1Ref  = useRef<SVGPathElement>(null);
  const path2Ref  = useRef<SVGPathElement>(null);

  const onEnter = useCallback(() => {
    gsap.to(imgRef.current,   { scale: 1.08,       duration: 0.6,  ease: "power3.out" });
    gsap.to(titleRef.current, { x: 10,             duration: 0.45, ease: "power3.out" });
    gsap.to(fillRef.current,  { attr: { r: 15.5 }, duration: 0.45, ease: "power3.out" });
    gsap.to([strokeRef.current, path1Ref.current, path2Ref.current],
      { attr: { stroke: "white" }, duration: 0.2, delay: 0.18 });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(imgRef.current,   { scale: 1,        duration: 0.55, ease: "power3.out" });
    gsap.to(titleRef.current, { x: 0,            duration: 0.4,  ease: "power3.out" });
    gsap.to(fillRef.current,  { attr: { r: 0 },  duration: 0.4,  ease: "power3.in"  });
    gsap.to([strokeRef.current, path1Ref.current, path2Ref.current],
      { attr: { stroke: "#111111" }, duration: 0.2 });
  }, []);

  const src = project.coverImage
    ? urlFor(project.coverImage).url()
    : project.imageUrl ?? null;

  const inner = (
    <>
      <div className={`relative ${imageClassName} overflow-hidden`}>
        {src
          ? <img ref={imgRef} src={src} alt={project.title} loading="lazy" className="absolute inset-0 size-full object-cover pointer-events-none" />
          : <div className="absolute inset-0 bg-[#c8c8c8]" />
        }
        <div className="absolute bottom-4 left-4 flex gap-3">
          {(project.tags ?? []).map((tag) => (
            <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-3xl text-[14px] font-medium text-[#111] [letter-spacing:-0.56px] whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p ref={titleRef} className={`font-black uppercase text-black leading-[1.1] whitespace-nowrap ${titleClassName}`}>
          {project.title}
        </p>
        <div className="shrink-0 size-8">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle ref={fillRef}   cx="16" cy="16" r="0"    fill="#111111" />
            <circle ref={strokeRef} cx="16" cy="16" r="15.5" stroke="#111111" strokeWidth="1" />
            <path ref={path1Ref} d="M12 20L20 12" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
            <path ref={path2Ref} d="M14 12H20V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </>
  );

  if (project.slug) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="flex flex-col gap-[10px] cursor-pointer"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="flex flex-col gap-[10px]">
      {inner}
    </div>
  );
}
