"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useModal } from "./ModalProvider";

const navLinks = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "News",     href: "/#news" },
  { label: "Contact",  href: "/contact" },
];

export default function NavBar() {
  const [isDark, setIsDark] = useState(true);

  const overlayRef         = useRef<HTMLDivElement>(null);
  const linkRefs           = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileCTARef       = useRef<HTMLButtonElement>(null);
  const desktopCTARef      = useRef<HTMLButtonElement>(null);
  const desktopCTAFillRef  = useRef<HTMLSpanElement>(null);
  const desktopCTALabelRef = useRef<HTMLSpanElement>(null);
  const tlRef              = useRef<gsap.core.Timeline | null>(null);

  // ── Scroll-aware theme detection ──────────────────────────────
  useEffect(() => {
    const NAVBAR_H = 72;

    const detect = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let theme = "light";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= NAVBAR_H && rect.bottom > 0) {
          theme = section.dataset.navTheme ?? "light";
        }
      });
      setIsDark(theme === "dark");
    };

    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  // ── Animate desktop CTA base style on theme change ───────────
  useEffect(() => {
    const btn = desktopCTARef.current;
    if (!btn) return;
    gsap.killTweensOf(btn);
    gsap.to(btn, {
      backgroundColor: isDark ? "rgba(0,0,0,0)" : "#000000",
      borderColor: isDark ? "#ffffff" : "#000000",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isDark]);

  // ── Build GSAP mobile menu timeline on mount ─────────────────
  useEffect(() => {
    const overlay   = overlayRef.current;
    const links     = linkRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const mobileCTA = mobileCTARef.current;
    if (!overlay || !mobileCTA) return;

    gsap.set(overlay,  { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
    gsap.set([links, mobileCTA], { y: 50, opacity: 0 });

    tlRef.current = gsap.timeline({
      paused: true,
      onStart: () => {
        gsap.set(overlay, { pointerEvents: "auto" });
        document.body.style.overflow = "hidden";
      },
      onReverseComplete: () => {
        gsap.set(overlay, { pointerEvents: "none" });
        document.body.style.overflow = "";
      },
    })
      .to(overlay, { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "power4.inOut" })
      .to(links, { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: "power3.out" }, "-=0.35")
      .to(mobileCTA, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.2");

    return () => { tlRef.current?.kill(); };
  }, []);

  const { openModal } = useModal();

  const openMenu  = useCallback(() => tlRef.current?.play(), []);
  const closeMenu = useCallback(() => tlRef.current?.reverse(), []);

  // ── Desktop link hover ────────────────────────────────────────
  const onLinkEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector<HTMLElement>("[data-line]");
    if (!line) return;
    gsap.killTweensOf(line);
    gsap.to(line, { scaleX: 1, duration: 0.35, ease: "power3.out", transformOrigin: "left center" });
  }, []);

  const onLinkLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector<HTMLElement>("[data-line]");
    if (!line) return;
    gsap.killTweensOf(line);
    gsap.to(line, { scaleX: 0, duration: 0.28, ease: "power3.in", transformOrigin: "right center" });
  }, []);

  // ── Desktop CTA hover (eye open / close) ─────────────────────
  const onBtnEnter = useCallback(() => {
    const fill  = desktopCTAFillRef.current;
    const label = desktopCTALabelRef.current;
    if (!fill || !label) return;
    gsap.killTweensOf([fill, label]);
    gsap.fromTo(fill,
      { clipPath: "inset(50% 0% 50% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power4.inOut" }
    );
    gsap.to(label, { color: "#000000", duration: 0.18, delay: 0.2 });
  }, []);

  const onBtnLeave = useCallback(() => {
    const fill  = desktopCTAFillRef.current;
    const label = desktopCTALabelRef.current;
    if (!fill || !label) return;
    gsap.killTweensOf([fill, label]);
    gsap.to(fill,  { clipPath: "inset(50% 0% 50% 0%)", duration: 0.45, ease: "power4.inOut" });
    gsap.to(label, { color: "#ffffff", duration: 0.18, delay: 0.12 });
  }, []);

  const textColor = isDark ? "text-white" : "text-black";

  return (
    <>
      {/* ── Fixed nav bar ───────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <nav className={`flex items-center justify-between px-4 md:px-8 py-6 transition-colors duration-300 ${textColor}`}>
          <Link href="/" className="font-semibold text-base [letter-spacing:-0.64px]">
            H.Studio
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-14 font-semibold text-base [letter-spacing:-0.64px]">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="relative pb-0.5"
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
              >
                {label}
                <span
                  data-line=""
                  className="absolute bottom-0 left-0 right-0 h-px bg-current"
                  style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA — fill span handles eye hover, GSAP controls base border/bg */}
          <button
            ref={desktopCTARef}
            onClick={openModal}
            onMouseEnter={onBtnEnter}
            onMouseLeave={onBtnLeave}
            className="hidden md:flex items-center justify-center text-sm font-medium rounded-3xl px-4 py-3 [letter-spacing:-0.56px] border relative overflow-hidden"
          >
            <span
              ref={desktopCTAFillRef}
              className="absolute inset-0 bg-white pointer-events-none"
              style={{ clipPath: "inset(50% 0% 50% 0%)" }}
            />
            <span ref={desktopCTALabelRef} className="relative z-10 text-white">
              Let&apos;s talk
            </span>
          </button>

          {/* Mobile hamburger */}
          <button onClick={openMenu} className="md:hidden p-1" aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="7"  x2="21" y2="7"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black flex flex-col px-4 py-6 md:hidden"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold text-base text-white [letter-spacing:-0.64px]">
            H.Studio
          </Link>
          <button onClick={closeMenu} aria-label="Close menu" className="p-1 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="4"  x2="20" y2="20" />
              <line x1="20" y1="4" x2="4"  y2="20" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-8 mt-16">
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={label}
              ref={(el) => { linkRefs.current[i] = el; }}
              href={href}
              onClick={closeMenu}
              className="text-white text-5xl font-medium [letter-spacing:-2px] capitalize leading-none"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            ref={mobileCTARef}
            onClick={() => { closeMenu(); openModal(); }}
            className="flex items-center justify-center bg-white text-black text-sm font-medium rounded-3xl px-4 py-3 [letter-spacing:-0.56px]"
          >
            Let&apos;s talk
          </button>
        </div>
      </div>
    </>
  );
}
