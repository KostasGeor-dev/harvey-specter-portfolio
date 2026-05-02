"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function FooterReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hide below viewport on mount
    gsap.set(el, { yPercent: 100 });

    // Keep body padding-bottom = footer height so scroll space exists
    const syncPadding = () => {
      document.body.style.paddingBottom = el.offsetHeight + "px";
    };
    syncPadding();
    const ro = new ResizeObserver(syncPadding);
    ro.observe(el);

    let revealed = false;

    const items = () => el.querySelectorAll<HTMLElement>("[data-footer-item]");

    const onScroll = () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - el.offsetHeight * 0.25;

      if (atBottom && !revealed) {
        revealed = true;
        gsap.to(el, { yPercent: 0, duration: 1, ease: "power4.out" });
        gsap.fromTo(
          items(),
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.4 }
        );
      } else if (!atBottom && revealed) {
        revealed = false;
        gsap.to(el, { yPercent: 100, duration: 0.55, ease: "power4.in" });
        gsap.set(items(), { y: 40, autoAlpha: 0 });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 0 }}
    >
      {children}
    </div>
  );
}
