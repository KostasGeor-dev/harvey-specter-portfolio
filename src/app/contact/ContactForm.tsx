"use client";

import { useActionState, useRef, useCallback } from "react";
import gsap from "gsap";
import { sendContactMessage, type ContactState } from "./actions";

const services = [
  "Brand Discovery",
  "Web Design & Dev",
  "Marketing",
  "Photography",
  "Other",
];

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, null);

  const btnRef   = useRef<HTMLButtonElement>(null);
  const fillRef  = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const onEnter = useCallback(() => {
    if (!fillRef.current || !labelRef.current) return;
    gsap.killTweensOf([fillRef.current, labelRef.current, btnRef.current]);
    gsap.fromTo(fillRef.current,
      { clipPath: "inset(50% 0% 50% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power4.inOut" }
    );
    gsap.to(labelRef.current, { color: "#000000", duration: 0.18, delay: 0.2 });
    gsap.to(btnRef.current, { y: -3, duration: 0.35, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    if (!fillRef.current || !labelRef.current) return;
    gsap.killTweensOf([fillRef.current, labelRef.current, btnRef.current]);
    gsap.to(fillRef.current, { clipPath: "inset(50% 0% 50% 0%)", duration: 0.45, ease: "power4.inOut" });
    gsap.to(labelRef.current, { color: "#ffffff", duration: 0.18, delay: 0.12 });
    gsap.to(btnRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
  }, []);

  if (state?.success) {
    return (
      <div role="status" aria-live="polite" className="flex flex-col gap-5 py-12">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full border border-[#1f1f1f] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L5.5 10.5L12 3.5" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-mono text-[13px] text-[#1f1f1f] uppercase leading-[1.1] [letter-spacing:-0.52px]">
            Message sent.
          </p>
        </div>
        <p className="text-[18px] text-[#1f1f1f] leading-[1.5] [letter-spacing:-0.04em] max-w-[420px]">
          Thanks for reaching out. We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state?.error && (
        <p role="alert" aria-live="assertive" className="font-mono text-[12px] text-red-600 uppercase leading-[1.1]">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field id="name"  label="Name"  name="name"  required />
        <Field id="email" label="Email" name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1]">
          Service
        </label>
        <select
          id="service"
          name="service"
          className="bg-transparent border-b border-[#1f1f1f]/20 pb-3 text-[16px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em] focus:outline-none focus:border-[#1f1f1f] transition-colors duration-200 w-full cursor-pointer appearance-none"
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1]">
          Tell me about your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={5}
          className="bg-transparent border-b border-[#1f1f1f]/20 pt-2 text-[16px] text-[#1f1f1f] leading-[1.5] [letter-spacing:-0.04em] focus:outline-none focus:border-[#1f1f1f] transition-colors duration-200 w-full resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          ref={btnRef}
          type="submit"
          disabled={pending}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="relative overflow-hidden bg-black text-white text-[14px] font-medium px-6 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap border border-black disabled:opacity-50 transition-opacity"
        >
          <span
            ref={fillRef}
            className="absolute inset-0 bg-white pointer-events-none"
            style={{ clipPath: "inset(50% 0% 50% 0%)" }}
          />
          <span ref={labelRef} className="relative z-10 text-white">
            {pending ? "Sending…" : "Send message →"}
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1]">
        {label}{required && " *"}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        className="bg-transparent border-b border-[#1f1f1f]/20 pb-3 text-[16px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em] focus:outline-none focus:border-[#1f1f1f] transition-colors duration-200 w-full"
      />
    </div>
  );
}

export type { ContactState };
