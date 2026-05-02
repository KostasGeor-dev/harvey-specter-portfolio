"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ContactForm from "../contact/ContactForm";

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const overlayRef       = useRef<HTMLDivElement>(null);
  const panelRef         = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [visible,  setVisible]  = useState(false);
  const [formKey,  setFormKey]  = useState(0);

  // Capture the triggering element; show overlay
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setVisible(true);
    }
  }, [isOpen]);

  // Animate in / out
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    if (isOpen && visible) {
      gsap.killTweensOf([overlay, panel]);
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power3.out" });
      gsap.fromTo(panel,   { x: "100%" }, { x: "0%", duration: 0.55, ease: "power4.out" });
      document.body.style.overflow = "hidden";
    } else if (!isOpen && visible) {
      gsap.killTweensOf([overlay, panel]);
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power3.in" });
      gsap.to(panel, {
        x: "100%", duration: 0.45, ease: "power4.in",
        onComplete: () => {
          setVisible(false);
          setFormKey((k) => k + 1);
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen, visible]);

  // Focus trap while open
  useEffect(() => {
    if (!visible || !isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      );

    const rafId = requestAnimationFrame(() => getFocusable()[0]?.focus());

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = getFocusable();
      if (!els.length) return;
      const first = els[0];
      const last  = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { last.focus(); e.preventDefault(); }
      } else {
        if (document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    };

    window.addEventListener("keydown", onTab);
    return () => { window.removeEventListener("keydown", onTab); cancelAnimationFrame(rafId); };
  }, [visible, isOpen]);

  // Restore focus to the element that opened the modal
  useEffect(() => {
    if (!visible && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [visible]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Contact us"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[60] bg-black/60 flex items-stretch justify-end"
    >
      <div
        ref={panelRef}
        className="relative h-full w-full md:max-w-[560px] flex flex-col bg-white overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark header */}
        <div className="bg-black px-6 pt-8 pb-10 flex flex-col gap-8 shrink-0">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] text-white/50 uppercase leading-[1.1] [letter-spacing:0.04em]">
              [ H.Studio ]
            </p>
            <button
              onClick={onClose}
              aria-label="Close contact modal"
              className="text-white/60 hover:text-white transition-colors duration-200 p-1"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                <line x1="4" y1="4"  x2="16" y2="16" />
                <line x1="16" y1="4" x2="4"  y2="16" />
              </svg>
            </button>
          </div>
          <p className="font-light text-[52px] md:text-[64px] text-white leading-[0.88] [letter-spacing:-0.08em] uppercase">
            Let&apos;s<br />
            <span className="font-playfair italic font-normal" style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}>
              Talk.
            </span>
          </p>
        </div>

        {/* White form body */}
        <div className="flex-1 px-6 py-10 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1] [letter-spacing:0.04em]">
              [ Get in touch ]
            </p>
            <p className="text-[15px] text-[#1f1f1f]/70 leading-[1.5] [letter-spacing:-0.02em]">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <ContactForm key={formKey} />
        </div>
      </div>
    </div>
  );
}
