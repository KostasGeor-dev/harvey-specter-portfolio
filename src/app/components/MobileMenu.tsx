"use client";

import { useState } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-1"
        aria-label="Open menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col px-4 py-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base text-white [letter-spacing:-0.64px]">
              H.Studio
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1 text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-8 mt-16">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-white text-5xl font-medium [letter-spacing:-2px] capitalize leading-none"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <button className="flex items-center justify-center bg-white text-black text-sm font-medium rounded-3xl px-4 py-3 [letter-spacing:-0.56px]">
              Let&apos;s talk
            </button>
          </div>
        </div>
      )}
    </>
  );
}
