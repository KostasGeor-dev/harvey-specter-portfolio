"use client";

import { useState } from "react";

// Replace heroImg with your own photo in /public once the Figma asset URL expires (7 days)
const heroImg =
  "https://www.figma.com/api/mcp/asset/cac4d7b4-3f4a-487c-b365-0f582df81394";

// Replace with your own portrait photo in /public once the Figma asset URL expires (7 days)
const aboutPortrait =
  "https://www.figma.com/api/mcp/asset/818054be-8caa-4691-875a-bfd002365f0d";

// Replace with your own photo in /public once the Figma asset URL expires (7 days)
const fullBleedPhoto =
  "https://www.figma.com/api/mcp/asset/29565f9f-4779-4e66-b5a7-090e6e863cab";

// Replace with your own service thumbnails in /public once Figma asset URLs expire (7 days)
const services = [
  {
    num: "1",
    title: "Brand Discovery",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "https://www.figma.com/api/mcp/asset/85456912-50b7-4f95-adf4-1583793f7ece",
  },
  {
    num: "2",
    title: "Web design & Dev",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "https://www.figma.com/api/mcp/asset/c0f5db98-2178-4e9d-b10d-0e56b0afac99",
  },
  {
    num: "3",
    title: "Marketing",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "https://www.figma.com/api/mcp/asset/849b03c5-73fe-4e6f-8d60-289fdab3ebed",
  },
  {
    num: "4",
    title: "Photography",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "https://www.figma.com/api/mcp/asset/e27b45d1-8899-43bc-8130-cfdfc31481d2",
  },
];

// Replace portfolio images in /public once Figma asset URLs expire (7 days)
const portfolioProjects = [
  {
    title: "Surfers paradise",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/652bd38e-b599-4e71-91c5-b8c3122f3021",
  },
  {
    title: "Cyberpunk caffe",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/62be2e91-7645-4c4d-bf3e-f78293c4d2c4",
  },
  {
    title: "Agency 976",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/62f3e35a-3f0d-4bc7-8b35-c4a61d74a799",
  },
  {
    title: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/1a637a20-621a-4b29-bebb-165ecf562662",
  },
];

// Replace testimonial logos in /public once Figma asset URLs expire (7 days)
const testimonials = [
  {
    name: "Marko Stojković",
    logo: "https://www.figma.com/api/mcp/asset/953cc622-60aa-4436-89a6-9f3bf9a4e15d",
    logoW: 143,
    logoH: 19,
    text: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    dx: 102,
    dy: 142,
    rot: "-6.85deg",
  },
  {
    name: "Lukas Weber",
    logo: "https://www.figma.com/api/mcp/asset/890267a4-8d4c-4cab-ba58-ed391e8f6bfc",
    logoW: 138,
    logoH: 19,
    text: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    dx: 676,
    dy: 272,
    rot: "2.9deg",
  },
  {
    name: "Sarah Jenkins",
    logo: "https://www.figma.com/api/mcp/asset/8465461c-7416-4ff4-93dd-f06bfbdf5c82",
    logoW: 109,
    logoH: 31,
    text: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    dx: 305,
    dy: 553,
    rot: "2.23deg",
  },
  {
    name: "Sofia Martínez",
    logo: "https://www.figma.com/api/mcp/asset/476dd30a-67de-4082-8678-0811f094a232",
    logoW: 81,
    logoH: 36,
    text: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    dx: 987,
    dy: 546,
    rot: "-4.15deg",
  },
];

// Replace news images in /public once Figma asset URLs expire (7 days)
const newsItems = [
  {
    img: "https://www.figma.com/api/mcp/asset/3ef76b42-b723-48e8-ab42-ca20a2ea3f49",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/b6cfa92b-3c3f-4ed5-a6dc-fd5de3c18c35",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/32209d3a-c8bf-4455-8c36-740c063b1239",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      {/* ── Mobile full-screen menu overlay ──────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col px-4 py-6 md:hidden">
          {/* Top row: logo + close */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base text-white [letter-spacing:-0.64px]">
              H.Studio
            </span>
            <button
              onClick={() => setMenuOpen(false)}
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

          {/* Nav links */}
          <nav className="flex flex-col gap-8 mt-16">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-white text-5xl font-medium [letter-spacing:-2px] capitalize leading-none"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="mt-auto">
            <button className="flex items-center justify-center bg-white text-black text-sm font-medium rounded-3xl px-4 py-3 [letter-spacing:-0.56px]">
              Let&apos;s talk
            </button>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden h-screen">
        {/* Full-bleed background photo */}
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
        />

        {/* Frosted glass overlay at the bottom third */}
        <div className="absolute bottom-0 left-0 right-0 h-[55vh] md:h-[41vh] [backdrop-filter:blur(10px)] bg-[rgba(217,217,217,0.01)] [mask-image:linear-gradient(to_top,black_60%,transparent)]" />

        {/* All content sits above the image via DOM order (no z-index so mix-blend-mode works) */}
        <div className="relative h-full flex flex-col px-4 md:px-8 justify-between md:justify-start md:gap-[28vh] pb-6 md:pb-0">

          {/* ── Navbar ───────────────────────────────────────────── */}
          <nav className="flex items-center justify-between py-6">
            <span className="font-semibold text-base text-black [letter-spacing:-0.64px]">
              H.Studio
            </span>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-14 font-semibold text-base text-black [letter-spacing:-0.64px]">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`}>
                  {link}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <button className="hidden md:flex items-center justify-center bg-black text-white text-sm font-medium rounded-3xl px-4 py-3 [letter-spacing:-0.56px]">
              Let&apos;s talk
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
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
          </nav>

          {/* ── Hero body ────────────────────────────────────────── */}
          <div className="flex flex-col items-center md:items-start gap-6 md:gap-0 w-full">

            {/* Label + heading */}
            <div className="flex flex-col items-center md:items-start w-full md:pb-[15px]">
              <div className="flex items-center justify-center md:justify-start px-[18px] w-full md:mb-[-15px]">
                <p className="font-mono text-sm text-white mix-blend-overlay uppercase leading-[1.1]">
                  [ Hello i&apos;m ]
                </p>
              </div>
              <h1
                className="
                  text-[25vw] md:text-[13.5vw]
                  font-medium text-white mix-blend-overlay
                  [letter-spacing:-0.07em]
                  leading-[0.8] md:leading-[1.1]
                  text-center capitalize whitespace-pre-wrap md:whitespace-nowrap w-full
                "
              >
                {"Harvey   Specter"}
              </h1>
            </div>

            {/* Tagline + CTA — left on mobile, right on desktop */}
            <div className="flex flex-col items-start md:items-end w-full">
              <div className="flex flex-col gap-[17px] w-[293px] md:w-[294px]">
                <p className="text-[14px] text-[#1f1f1f] [letter-spacing:-0.56px] uppercase leading-[1.1] italic">
                  <span className="font-bold">H.Studio is a </span>
                  <span className="font-normal">full-service</span>
                  <span className="font-bold">
                    {" "}
                    creative studio creating beautiful digital experiences and
                    products. We are an{" "}
                  </span>
                  <span className="font-normal">award winning</span>
                  <span className="font-bold">
                    {" "}
                    desing and art group specializing in branding, web design
                    and engineering.
                  </span>
                </p>
                <button className="w-fit flex items-center justify-center bg-black text-white text-sm font-medium rounded-3xl px-4 py-3 [letter-spacing:-0.56px]">
                  Let&apos;s talk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About / Identity Section ─────────────────────────── */}
      <section className="overflow-x-hidden px-4 py-12 md:px-8 md:py-[120px]">
        {/* Header: industry label + divider */}
        <div className="flex flex-col gap-3 items-end mb-6">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </p>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        {/* ── Desktop: staggered typographic layout ── */}
        <div className="hidden md:flex flex-col gap-2">
          <div className="flex gap-3 items-start">
            <p className="font-light text-[9.375vw] text-black leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
              {"A creative director   /"}
            </p>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
              001
            </span>
          </div>
          <p className="font-light text-[9.375vw] text-black leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap pl-[22.3%]">
            Photographer
          </p>
          <div className="flex justify-end">
            <p className="font-light text-[9.375vw] text-black leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
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
          <p className="font-light text-[9.375vw] text-black leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
            on the south side
          </p>
          <div className="flex items-baseline justify-end gap-3">
            <p className="font-light text-[9.375vw] text-black leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
              of chicago.
            </p>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] whitespace-nowrap">
              [ creative freelancer ]
            </span>
          </div>
        </div>

        {/* ── Mobile: centered layout ── */}
        <div className="md:hidden flex flex-col gap-3 items-center text-center">
          <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
            001
          </span>
          <div className="flex flex-col gap-2 items-center uppercase">
            <p className="font-light text-[8.5vw] text-black leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
              {"A creative director   /"}
            </p>
            <p className="font-light text-[8.5vw] text-black leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
              Photographer
            </p>
            <p className="font-light text-[8.5vw] text-black leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
              {"Born "}
              <span
                className="font-playfair italic font-normal"
                style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
              >
                {"&"}
              </span>
              {" raised"}
            </p>
            <p className="font-light text-[8.5vw] text-black leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
              on the south side
            </p>
            <p className="font-light text-[8.5vw] text-black leading-[0.84] [letter-spacing:-0.08em] whitespace-nowrap">
              of chicago.
            </p>
          </div>
          <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
            [ creative freelancer ]
          </span>
        </div>
      </section>

      {/* ── About Section ──────────────────────────────────────── */}
      <section className="px-4 py-12 md:px-8 md:py-20">

        {/* ── Desktop layout ── */}
        {/*
          Figma at 1440px: [ About ] far-left, then 329px gap, then
          text(461px) + gap(32px) + 002+portrait(490px) = 983px block.
          ml-auto on the right group reproduces that push-to-right at every
          viewport. Text and image widths scale in three steps to stay
          proportional across md / lg / xl.
        */}
        <div className="hidden md:flex items-start">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap shrink-0">
            [ About ]
          </p>

          {/* Right group pushed to the far right, text + portrait bottom-aligned */}
          <div className="ml-auto flex gap-8 items-end">
            {/* Bracketed bio text — fixed responsive width */}
            <div className="relative p-6 shrink-0 w-[220px] lg:w-[340px] xl:w-[460px]">
              <div className="absolute top-0 left-0 size-4 border-t border-l border-[#1f1f1f]" />
              <div className="absolute bottom-0 left-0 size-4 border-b border-l border-[#1f1f1f]" />
              <div className="absolute top-0 right-0 size-4 border-t border-r border-[#1f1f1f]" />
              <div className="absolute bottom-0 right-0 size-4 border-b border-r border-[#1f1f1f]" />
              <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">
                Placeholder paragraph one. This is where you introduce yourself
                — your background, your passion for your craft, and what drives
                you creatively. Two to three sentences work best here.
                Placeholder paragraph two. Here you can describe your technical
                approach, how you collaborate with clients, or what sets your
                work apart from others in your field.
              </p>
            </div>

            {/* 002 label + portrait */}
            <div className="flex gap-6 items-start shrink-0">
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                002
              </p>
              <div className="relative overflow-hidden w-[200px] lg:w-[280px] xl:w-[436px] aspect-[436/614]">
                <img
                  src={aboutPortrait}
                  alt=""
                  className="absolute inset-0 size-full object-cover pointer-events-none select-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="md:hidden flex flex-col gap-5">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            002
          </p>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ About ]
          </p>

          {/* Bracketed bio text */}
          <div className="relative p-6">
            <div className="absolute top-0 left-0 size-4 border-t border-l border-[#1f1f1f]" />
            <div className="absolute bottom-0 left-0 size-4 border-b border-l border-[#1f1f1f]" />
            <div className="absolute top-0 right-0 size-4 border-t border-r border-[#1f1f1f]" />
            <div className="absolute bottom-0 right-0 size-4 border-b border-r border-[#1f1f1f]" />
            <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">
              Placeholder paragraph one. This is where you introduce yourself —
              your background, your passion for your craft, and what drives you
              creatively. Two to three sentences work best here. Placeholder
              paragraph two. Here you can describe your technical approach, how
              you collaborate with clients, or what sets your work apart from
              others in your field.
            </p>
          </div>

          {/* Portrait image */}
          <div className="relative overflow-hidden w-full aspect-[422/594]">
            <img
              src={aboutPortrait}
              alt=""
              className="absolute inset-0 size-full object-cover pointer-events-none select-none"
            />
          </div>
        </div>
      </section>

      {/* ── Full-bleed photo ───────────────────────────────────── */}
      {/*
        Desktop: 900px tall, full viewport width, centred crop.
        Mobile: 500px tall, focus shifted right (object-[70%]) to keep
        the face + camera in frame instead of showing empty sky on the left.
      */}
      <section className="relative overflow-hidden h-[500px] md:h-[900px]">
        <img
          src={fullBleedPhoto}
          alt=""
          className="absolute inset-0 size-full object-cover object-[70%_50%] md:object-center pointer-events-none select-none"
        />
      </section>

      {/* ── Services Section ──────────────────────────────────── */}
      <section className="bg-black px-4 py-12 md:px-8 md:py-20">
        <div className="flex flex-col gap-8 md:gap-12">

          {/* [ services ] label */}
          <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
            [ services ]
          </p>

          {/* [4]  DELIVERABLES — Inter Light, same vw scale as identity section */}
          <div className="flex items-center justify-between font-light text-white uppercase leading-none whitespace-nowrap [letter-spacing:-0.08em] text-[8.5vw] md:text-[9.375vw]">
            <span>[4]</span>
            <span>Deliverables</span>
          </div>

          {/* Service rows */}
          <div className="flex flex-col gap-12">
            {services.map((s) => (
              <div key={s.num} className="flex flex-col gap-[9px]">

                {/* Number + divider */}
                <div className="flex flex-col gap-[9px]">
                  <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
                    [ {s.num} ]
                  </p>
                  <div className="w-full h-px bg-white/30" />
                </div>

                {/* Content: title left | description + thumb right on lg+ */}
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
                  <p className="font-bold italic text-[36px] text-white uppercase leading-[1.1] [letter-spacing:-1.44px] whitespace-nowrap">
                    {s.title}
                  </p>
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-start lg:shrink-0">
                    <p className="text-[14px] text-white leading-[1.3] [letter-spacing:-0.56px] lg:w-[340px] xl:w-[393px]">
                      {s.desc}
                    </p>
                    <div className="relative size-[151px] overflow-hidden shrink-0">
                      <img
                        src={s.img}
                        alt={s.title}
                        className="absolute inset-0 size-full object-cover pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Selected Work ─── */}
      <section className="px-4 py-12 md:px-8 md:py-20">

        {/* Header */}
        <div className="mb-8 lg:mb-[61px]">
          {/* [ portfolio ] label — mobile only, shown above heading */}
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-4 lg:hidden">
            [ portfolio ]
          </p>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2.5 uppercase">
              <div className="font-light leading-[0.86] text-[8.5vw] md:text-[9.375vw] text-black [letter-spacing:-0.08em]">
                <p>Selected</p>
                <p>Work</p>
              </div>
              <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
            </div>
            {/* [ PORTFOLIO ] — desktop only, rotated on far right */}
            <div className="hidden lg:flex items-center justify-center h-[110px] w-[15px]">
              <p className="-rotate-90 font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap">
                [ portfolio ]
              </p>
            </div>
          </div>
        </div>

        {/* ── Mobile: single column ── */}
        <div className="flex flex-col gap-6 lg:hidden">

          {portfolioProjects.map((p) => (
            <div key={p.title} className="flex flex-col gap-[10px]">
              <div className="relative h-[390px] overflow-hidden">
                <img src={p.img} alt={p.title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {p.tags.map((tag) => (
                    <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-3xl text-[14px] font-medium text-[#111] [letter-spacing:-0.56px] whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-black text-[24px] uppercase text-black leading-[1.1] [letter-spacing:-0.96px] whitespace-nowrap">
                  {p.title}
                </p>
                <div className="shrink-0 size-8">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15.5" stroke="#111111" strokeWidth="1" />
                    <path d="M12 20L20 12" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14 12H20V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* CTA box */}
          <div className="relative flex items-center gap-3 w-full px-6 py-3 mt-2">
            <div className="absolute top-0 left-0 size-4 border-t border-l border-black pointer-events-none" />
            <div className="absolute top-0 right-0 size-4 border-t border-r border-black pointer-events-none" />
            <div className="absolute bottom-0 left-0 size-4 border-b border-l border-black pointer-events-none" />
            <div className="absolute bottom-0 right-0 size-4 border-b border-r border-black pointer-events-none" />
            <div className="flex flex-col gap-2.5 py-3 flex-1">
              <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <button className="self-start bg-black text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap">
                Let&apos;s talk
              </button>
            </div>
          </div>

        </div>

        {/* ── Desktop: two-column staggered ── */}
        <div className="hidden lg:flex gap-6">

          {/* Left column: justify-between distributes cards + CTA vertically */}
          <div className="flex-1 flex flex-col justify-between">

            {/* Surfers Paradise */}
            <div className="flex flex-col gap-[10px]">
              <div className="relative h-[744px] overflow-hidden">
                <img src={portfolioProjects[0].img} alt={portfolioProjects[0].title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {portfolioProjects[0].tags.map((tag) => (
                    <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-3xl text-[14px] font-medium text-[#111] [letter-spacing:-0.56px] whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-black text-[36px] uppercase text-black leading-[1.1] [letter-spacing:-1.44px] whitespace-nowrap">
                  {portfolioProjects[0].title}
                </p>
                <div className="shrink-0 size-8">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15.5" stroke="#111111" strokeWidth="1" />
                    <path d="M12 20L20 12" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14 12H20V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Cyberpunk Caffe */}
            <div className="flex flex-col gap-[10px]">
              <div className="relative h-[699px] overflow-hidden">
                <img src={portfolioProjects[1].img} alt={portfolioProjects[1].title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {portfolioProjects[1].tags.map((tag) => (
                    <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-3xl text-[14px] font-medium text-[#111] [letter-spacing:-0.56px] whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-black text-[36px] uppercase text-black leading-[1.1] [letter-spacing:-1.44px] whitespace-nowrap">
                  {portfolioProjects[1].title}
                </p>
                <div className="shrink-0 size-8">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15.5" stroke="#111111" strokeWidth="1" />
                    <path d="M12 20L20 12" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14 12H20V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CTA box */}
            <div className="relative flex items-center gap-3 w-[465px] px-6 py-3">
              <div className="absolute top-0 left-0 size-4 border-t border-l border-black pointer-events-none" />
              <div className="absolute top-0 right-0 size-4 border-t border-r border-black pointer-events-none" />
              <div className="absolute bottom-0 left-0 size-4 border-b border-l border-black pointer-events-none" />
              <div className="absolute bottom-0 right-0 size-4 border-b border-r border-black pointer-events-none" />
              <div className="flex flex-col gap-2.5 py-3 flex-1">
                <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">
                  Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
                </p>
                <button className="self-start bg-black text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap">
                  Let&apos;s talk
                </button>
              </div>
            </div>

          </div>

          {/* Right column: offset 240px from top, 117px gap between cards */}
          <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">

            {/* Agency 976 */}
            <div className="flex flex-col gap-[10px]">
              <div className="relative h-[699px] overflow-hidden">
                <img src={portfolioProjects[2].img} alt={portfolioProjects[2].title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {portfolioProjects[2].tags.map((tag) => (
                    <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-3xl text-[14px] font-medium text-[#111] [letter-spacing:-0.56px] whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-black text-[36px] uppercase text-black leading-[1.1] [letter-spacing:-1.44px] whitespace-nowrap">
                  {portfolioProjects[2].title}
                </p>
                <div className="shrink-0 size-8">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15.5" stroke="#111111" strokeWidth="1" />
                    <path d="M12 20L20 12" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14 12H20V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Minimal Playground */}
            <div className="flex flex-col gap-[10px]">
              <div className="relative h-[744px] overflow-hidden">
                <img src={portfolioProjects[3].img} alt={portfolioProjects[3].title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {portfolioProjects[3].tags.map((tag) => (
                    <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-3xl text-[14px] font-medium text-[#111] [letter-spacing:-0.56px] whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-black text-[36px] uppercase text-black leading-[1.1] [letter-spacing:-1.44px] whitespace-nowrap">
                  {portfolioProjects[3].title}
                </p>
                <div className="shrink-0 size-8">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15.5" stroke="#111111" strokeWidth="1" />
                    <path d="M12 20L20 12" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14 12H20V18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ─── Testimonials — Mobile ─── */}
      <section className="px-4 py-16 lg:hidden">
        <p className="font-medium text-[64px] text-black text-center leading-[0.8] [letter-spacing:-0.07em] capitalize mb-8">
          Testimonials
        </p>
        <div className="flex flex-col gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4">
              <img
                src={t.logo}
                alt=""
                style={{ width: t.logoW, height: t.logoH, objectFit: "contain" }}
              />
              <p className="text-[18px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">
                {t.text}
              </p>
              <p className="font-black text-[16px] text-black uppercase leading-[1.1] [letter-spacing:-0.04em] whitespace-nowrap">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonials — Desktop ─── */}
      <section className="hidden lg:block relative overflow-hidden h-[987px]">

        {/* Lukas Weber — rendered first so heading layers on top of it */}
        <div
          className="absolute bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px]"
          style={{ left: 676, top: 272, transform: "rotate(2.9deg)" }}
        >
          <img src={testimonials[1].logo} alt="" style={{ width: testimonials[1].logoW, height: testimonials[1].logoH, objectFit: "contain" }} />
          <p className="text-[18px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">{testimonials[1].text}</p>
          <p className="font-black text-[16px] text-black uppercase leading-[1.1] [letter-spacing:-0.04em] whitespace-nowrap">{testimonials[1].name}</p>
        </div>

        {/* Giant centred heading — sits on top of Lukas, behind the other three */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-medium text-[198px] text-black text-center leading-[1.1] [letter-spacing:-0.07em] capitalize whitespace-nowrap">
            Testimonials
          </p>
        </div>

        {/* Marko Stojković */}
        <div
          className="absolute bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px]"
          style={{ left: 102, top: 142, transform: "rotate(-6.85deg)" }}
        >
          <img src={testimonials[0].logo} alt="" style={{ width: testimonials[0].logoW, height: testimonials[0].logoH, objectFit: "contain" }} />
          <p className="text-[18px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">{testimonials[0].text}</p>
          <p className="font-black text-[16px] text-black uppercase leading-[1.1] [letter-spacing:-0.04em] whitespace-nowrap">{testimonials[0].name}</p>
        </div>

        {/* Sarah Jenkins */}
        <div
          className="absolute bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px]"
          style={{ left: 305, top: 553, transform: "rotate(2.23deg)" }}
        >
          <img src={testimonials[2].logo} alt="" style={{ width: testimonials[2].logoW, height: testimonials[2].logoH, objectFit: "contain" }} />
          <p className="text-[18px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">{testimonials[2].text}</p>
          <p className="font-black text-[16px] text-black uppercase leading-[1.1] [letter-spacing:-0.04em] whitespace-nowrap">{testimonials[2].name}</p>
        </div>

        {/* Sofia Martínez */}
        <div
          className="absolute bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px]"
          style={{ left: 987, top: 546, transform: "rotate(-4.15deg)" }}
        >
          <img src={testimonials[3].logo} alt="" style={{ width: testimonials[3].logoW, height: testimonials[3].logoH, objectFit: "contain" }} />
          <p className="text-[18px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">{testimonials[3].text}</p>
          <p className="font-black text-[16px] text-black uppercase leading-[1.1] [letter-spacing:-0.04em] whitespace-nowrap">{testimonials[3].name}</p>
        </div>

      </section>

      {/* ─── News — Mobile ─── */}
      <section className="bg-[#f3f3f3] px-4 py-16 lg:hidden">
        <div className="font-light text-[32px] text-black uppercase leading-[0.86] [letter-spacing:-0.08em] mb-8">
          Keep up with my latest news &amp; achievements
        </div>
        {/* Horizontal scroll */}
        <div className="overflow-x-auto -mx-4 px-4 pb-2">
          <div className="flex gap-4">
            {newsItems.map((item, i) => (
              <div key={i} className="flex flex-col gap-4 w-[300px] shrink-0">
                <div className="relative h-[398px] overflow-hidden">
                  <img src={item.img} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
                </div>
                <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">{item.text}</p>
                <div className="border-b border-black flex items-center gap-2.5 py-1 self-start">
                  <span className="font-medium text-[14px] text-black [letter-spacing:-0.56px] whitespace-nowrap">Read more</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 14L14 4" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M6.5 4H14V11.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── News — Desktop ─── */}
      <section className="hidden lg:flex items-end justify-between bg-[#f3f3f3] px-8 py-[120px]">

        {/* Rotated sideways heading */}
        <div className="flex items-center justify-center w-[110px] h-[706px] shrink-0">
          <div className="-rotate-90 whitespace-nowrap">
            <div className="font-light text-[64px] text-black uppercase leading-[0.86] [letter-spacing:-0.08em]">
              <p>Keep up with my latest</p>
              <p>news &amp; achievements</p>
            </div>
          </div>
        </div>

        {/* Three staggered cards */}
        <div className="flex items-start flex-1 min-w-0 max-w-[1020px]">

          {/* Card 1 */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="relative h-[469px] overflow-hidden">
              <img src={newsItems[0].img} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
            </div>
            <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">{newsItems[0].text}</p>
            <div className="border-b border-black flex items-center gap-2.5 py-1 self-start">
              <span className="font-medium text-[14px] text-black [letter-spacing:-0.56px] whitespace-nowrap">Read more</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M6.5 4H14V11.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-black/15 mx-[31px]" />

          {/* Card 2 — staggered 120px lower */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 pt-[120px]">
            <div className="relative h-[469px] overflow-hidden">
              <img src={newsItems[1].img} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
            </div>
            <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">{newsItems[1].text}</p>
            <div className="border-b border-black flex items-center gap-2.5 py-1 self-start">
              <span className="font-medium text-[14px] text-black [letter-spacing:-0.56px] whitespace-nowrap">Read more</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M6.5 4H14V11.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-black/15 mx-[31px]" />

          {/* Card 3 */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="relative h-[469px] overflow-hidden">
              <img src={newsItems[2].img} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
            </div>
            <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">{newsItems[2].text}</p>
            <div className="border-b border-black flex items-center gap-2.5 py-1 self-start">
              <span className="font-medium text-[14px] text-black [letter-spacing:-0.56px] whitespace-nowrap">Read more</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 14L14 4" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M6.5 4H14V11.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-black overflow-hidden">

        {/* ── Top: CTA / Socials / Divider ── */}
        <div className="px-4 pt-12 lg:px-8 lg:pt-[48px] flex flex-col gap-6 lg:gap-12">

          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">

            {/* CTA — shared across breakpoints */}
            <div className="flex flex-col gap-3 lg:w-[298px]">
              <p className="font-light italic text-[24px] text-white uppercase leading-[1.1] [letter-spacing:-0.96px]">
                Have a{" "}
                <span className="font-black not-italic">project</span>
                {" "}in mind?
              </p>
              <button className="self-start border border-white text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap">
                Let&apos;s talk
              </button>
            </div>

            {/* Mobile: all 4 socials stacked below CTA */}
            <div className="lg:hidden flex flex-col gap-1 text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px]">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>X.com</p>
              <p>Linkedin</p>
            </div>

            {/* Desktop center col: Facebook / Instagram */}
            <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-center w-[298px]">
              <p>Facebook</p>
              <p>Instagram</p>
            </div>

            {/* Desktop right col: X.com / Linkedin */}
            <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-right w-[298px]">
              <p>X.com</p>
              <p>Linkedin</p>
            </div>

          </div>

          {/* Divider */}
          <div className="h-px bg-white/20 w-full" />

        </div>

        {/* ── Bottom: Desktop ── */}
        <div className="hidden lg:flex items-end justify-between px-8 mt-[120px]">

          {/* Clipped H.Studio logotype */}
          <div className="relative overflow-hidden h-[219px] w-[1093px]">
            {/* [Coded By Claude] rotated label at far left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-[160px] w-[15px]">
              <p className="-rotate-90 font-mono text-[14px] text-white uppercase whitespace-nowrap leading-[1.1]">
                [ Coded By Claude ]
              </p>
            </div>
            {/* Giant name — vertically centred, top/bottom intentionally clipped */}
            <p className="absolute left-0 top-1/2 -translate-y-1/2 font-semibold text-[290px] text-white leading-[0.8] [letter-spacing:-0.06em] capitalize whitespace-nowrap">
              H.Studio
            </p>
          </div>

          {/* Legal links — bottom-right */}
          <div className="flex gap-[34px] pb-8 text-[12px] text-white uppercase leading-[1.1] [letter-spacing:-0.48px] whitespace-nowrap">
            <span className="underline">Licences</span>
            <span className="underline">Privacy policy</span>
          </div>

        </div>

        {/* ── Bottom: Mobile ── */}
        <div className="lg:hidden px-4 mt-12 flex flex-col gap-4 overflow-hidden">

          {/* Legal links centred */}
          <div className="flex gap-[34px] justify-center text-[12px] text-white uppercase leading-[1.1] [letter-spacing:-0.48px] whitespace-nowrap">
            <span className="underline">Licences</span>
            <span className="underline">Privacy policy</span>
          </div>

          {/* [Coded By Claude] + H.Studio bleed */}
          <div className="overflow-hidden">
            <p className="font-mono text-[10px] text-white uppercase leading-[1.1] mb-3">
              [ Coded By Claude ]
            </p>
            <p className="font-semibold text-[91px] text-white leading-[0.8] [letter-spacing:-0.06em] capitalize whitespace-nowrap">
              H.Studio
            </p>
          </div>

        </div>

      </footer>
    </main>
  );
}
