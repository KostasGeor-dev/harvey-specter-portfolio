import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import FooterReveal from "../components/FooterReveal";
import PortraitReveal from "../components/PortraitReveal";
import BlurImage from "../components/BlurImage";
import CTAButton from "../components/CTAButton";
import ServiceRow from "../components/ServiceRow";
import TestimonialCard from "../components/TestimonialCard";
import ParallaxX from "../components/ParallaxX";

export const metadata: Metadata = {
  title: "About",
  description: "Harvey Specter is a Chicago-based creative director and photographer with 12+ years of experience in brand discovery, web design, marketing, and photography.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Harvey Specter",
    description: "Chicago-based creative director and photographer with 12+ years building bold brands that move people.",
    url: "/about",
    type: "website",
  },
};

// ─── Assets (replace with /public paths once Figma URLs expire) ────────────
const aboutPortrait =
  "https://www.figma.com/api/mcp/asset/818054be-8caa-4691-875a-bfd002365f0d";
const fullBleedPhoto =
  "https://www.figma.com/api/mcp/asset/29565f9f-4779-4e66-b5a7-090e6e863cab";
const studioPhoto =
  "https://www.figma.com/api/mcp/asset/cac4d7b4-3f4a-487c-b365-0f582df81394";

// ─── Data ─────────────────────────────────────────────────────────────────
const stats = [
  { value: "12+", label: "Years in\nIndustry" },
  { value: "200+", label: "Projects\nDelivered" },
  { value: "50+", label: "Clients\nWorldwide" },
  { value: "4", label: "Core\nDisciplines" },
];

const process = [
  {
    num: "01",
    title: "Discover",
    desc: "We start with a deep-dive session — your brand, your audience, your ambitions. No templates, no assumptions. Just honest questions and sharper answers.",
  },
  {
    num: "02",
    title: "Conceive",
    desc: "Ideas become directions. Directions become concepts. Every visual choice is intentional, rooted in strategy, and tested against the brief.",
  },
  {
    num: "03",
    title: "Craft",
    desc: "Where precision meets passion. Photography, design, and development executed at the highest level — sweating every detail so you don't have to.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "On time, on brief, on brand. Shipped with full documentation, source files, and the confidence to go live without hesitation.",
  },
];

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

const testimonials = [
  {
    name: "Marko Stojković",
    logo: "https://www.figma.com/api/mcp/asset/953cc622-60aa-4436-89a6-9f3bf9a4e15d",
    logoW: 143,
    logoH: 19,
    text: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    dx: 0, dy: 0, rot: "0deg",
  },
  {
    name: "Sarah Jenkins",
    logo: "https://www.figma.com/api/mcp/asset/8465461c-7416-4ff4-93dd-f06bfbdf5c82",
    logoW: 109,
    logoH: 31,
    text: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    dx: 0, dy: 0, rot: "0deg",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className="relative bg-white z-[1]">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section
          data-nav-theme="dark"
          className="bg-black px-4 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28 overflow-hidden"
        >
          <h1 className="sr-only">About — A Creative Director &amp; Storyteller</h1>
          <div className="flex flex-col gap-10 md:gap-16">

            {/* Label row */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1]">
                [ H.Studio — About ]
              </p>
              <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1]">
                003
              </p>
            </div>

            {/* Large display type */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
                  A creative
                </p>
              </div>
              <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap pl-[15%] md:pl-[22%]">
                Director
              </p>
              <div className="flex items-baseline justify-end gap-4">
                <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase whitespace-nowrap">
                  {"& "}
                  <span
                    className="font-playfair italic font-normal"
                    style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
                  >
                    Storyteller.
                  </span>
                </p>
              </div>
            </div>

            {/* Sub-line */}
            <div className="flex items-end justify-between">
              <p className="text-[14px] text-white/60 leading-[1.4] [letter-spacing:-0.56px] max-w-[320px]">
                Born and raised on the south side of Chicago. Building brands that move people — visually, emotionally, commercially.
              </p>
              <CTAButton
                variant="ghost"
                className="hidden md:flex self-end border border-white text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap"
              >
                Let&apos;s talk
              </CTAButton>
            </div>

          </div>
        </section>

        {/* ── Who I Am ───────────────────────────────────────────── */}
        <section className="px-4 py-16 md:px-8 md:py-[120px] overflow-x-hidden">

          {/* Desktop */}
          <div className="hidden md:flex items-start gap-8 lg:gap-16">

            {/* Portrait */}
            <PortraitReveal
              src={aboutPortrait}
              className="w-[260px] lg:w-[360px] xl:w-[460px] aspect-[436/614] shrink-0"
            />

            {/* Right: label + bio + stats */}
            <div className="flex flex-col gap-12 flex-1 pt-4">

              <div className="flex flex-col gap-6">
                <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                  [ Who I Am ]
                </p>
                <ParallaxX offset="-4vw" className="flex flex-col gap-4">
                  <p className="text-[18px] text-[#1f1f1f] leading-[1.5] [letter-spacing:-0.04em] max-w-[520px]">
                    I&apos;m a creative director and photographer based in Chicago, with over 12 years of turning bold ideas into visual identities that stick. My passion lives at the intersection of storytelling and strategy — I believe great design doesn&apos;t just catch the eye, it earns trust and moves people to act. What drives me every day is the challenge of finding the visual language that belongs to your brand and absolutely no one else&apos;s.
                  </p>
                  <p className="text-[18px] text-[#1f1f1f] leading-[1.5] [letter-spacing:-0.04em] max-w-[520px]">
                    I work alongside every client as a genuine partner — not just a vendor — taking the time to understand your audience, your goals, and the story you need to tell. Where others deliver off-the-shelf solutions, I build from the ground up, combining photography, design, and code into work that doesn&apos;t just look remarkable today, but stays relevant tomorrow.
                  </p>
                </ParallaxX>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 border-t border-[#1f1f1f]/20 pt-10">
                {stats.map((s) => (
                  <div key={s.value} className="flex flex-col gap-1">
                    <p className="font-light text-[48px] text-black leading-[0.9] [letter-spacing:-0.08em]">
                      {s.value}
                    </p>
                    <p className="font-mono text-[12px] text-[#1f1f1f]/60 uppercase leading-[1.3] whitespace-pre-line">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-10">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ Who I Am ]
            </p>
            <PortraitReveal
              src={aboutPortrait}
              className="w-full aspect-[422/594]"
            />
            <div className="flex flex-col gap-4">
              <p className="text-[16px] text-[#1f1f1f] leading-[1.5] [letter-spacing:-0.04em]">
                I&apos;m a creative director and photographer based in Chicago, with over 12 years of turning bold ideas into visual identities that stick. My passion lives at the intersection of storytelling and strategy — I believe great design doesn&apos;t just catch the eye, it earns trust and moves people to act.
              </p>
              <p className="text-[16px] text-[#1f1f1f] leading-[1.5] [letter-spacing:-0.04em]">
                I work alongside every client as a genuine partner, taking the time to understand your audience, your goals, and the story you need to tell. Where others deliver off-the-shelf solutions, I build from the ground up — combining photography, design, and code to craft work that stays relevant tomorrow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-[#1f1f1f]/20 pt-8">
              {stats.map((s) => (
                <div key={s.value} className="flex flex-col gap-1">
                  <p className="font-light text-[40px] text-black leading-[0.9] [letter-spacing:-0.08em]">
                    {s.value}
                  </p>
                  <p className="font-mono text-[11px] text-[#1f1f1f]/60 uppercase leading-[1.3] whitespace-pre-line">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ── Full-bleed photo ───────────────────────────────────── */}
        <section data-nav-theme="dark" className="relative overflow-hidden h-[500px] md:h-[780px]">
          <BlurImage
            src={fullBleedPhoto}
            className="absolute inset-0 size-full object-cover object-[70%_50%] md:object-center pointer-events-none select-none"
          />
        </section>

        {/* ── Disciplines / Services ─────────────────────────────── */}
        <section
          id="disciplines"
          data-nav-theme="dark"
          className="bg-black px-4 py-16 md:px-8 md:py-20"
        >
          <div className="flex flex-col gap-8 md:gap-12">

            <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
              [ Disciplines ]
            </p>

            <div className="flex items-center justify-between font-light text-white uppercase leading-none whitespace-nowrap [letter-spacing:-0.08em] text-[8.5vw] md:text-[9.375vw]">
              <span>[4]</span>
              <span>Expertise</span>
            </div>

            <div className="flex flex-col gap-12">
              {services.map((s) => (
                <ServiceRow key={s.num} s={s} />
              ))}
            </div>

          </div>
        </section>

        {/* ── The Process ────────────────────────────────────────── */}
        <section className="px-4 py-16 md:px-8 md:py-[120px]">

          {/* Header */}
          <div className="flex flex-col gap-4 mb-12 md:mb-16">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ How I Work ]
            </p>
            <div className="flex items-end justify-between">
              <div className="font-light text-[8.5vw] md:text-[9.375vw] text-black uppercase leading-[0.86] [letter-spacing:-0.08em]">
                <p>The</p>
                <p>Process</p>
              </div>
              <p className="hidden md:block text-[14px] text-[#1f1f1f] leading-[1.4] [letter-spacing:-0.56px] max-w-[320px] text-right">
                Four phases. Zero guesswork. A creative workflow refined over a decade of practice.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {process.map((step, i) => (
              <div
                key={step.num}
                className="group flex flex-col gap-3 py-8 border-t border-[#1f1f1f]/20 last:border-b hover:pl-4 transition-all duration-300"
              >
                <div className="flex items-start gap-6 md:gap-12">
                  <p className="font-mono text-[14px] text-[#1f1f1f]/50 uppercase leading-[1.1] shrink-0 mt-1">
                    [ {step.num} ]
                  </p>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-12 flex-1">
                    <p className="font-bold italic text-[28px] md:text-[36px] text-black uppercase leading-[1.1] [letter-spacing:-1.44px] whitespace-nowrap group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </p>
                    <p className="text-[14px] text-[#1f1f1f] leading-[1.4] [letter-spacing:-0.56px] md:max-w-[420px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ── Studio photo ───────────────────────────────────────── */}
        <section className="px-4 pb-16 md:px-8 md:pb-20">
          <div className="relative overflow-hidden h-[320px] md:h-[560px]">
            <img
              src={studioPhoto}
              alt="H.Studio workspace, Chicago"
              className="absolute inset-0 size-full object-cover pointer-events-none select-none"
            />
            {/* Overlay label */}
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[12px] text-white uppercase leading-[1.1]">
                [ Studio, Chicago ]
              </p>
            </div>
          </div>
        </section>

        {/* ── Selected Testimonials ──────────────────────────────── */}
        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-10">

            <div className="flex items-end justify-between">
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                [ What Clients Say ]
              </p>
              <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">002</span>
            </div>

            {/* Desktop: side by side */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>

            {/* Mobile: stacked */}
            <div className="md:hidden flex flex-col gap-4">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>

          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section
          data-nav-theme="dark"
          className="bg-black px-4 py-20 md:px-8 md:py-32 overflow-hidden"
        >
          <div className="flex flex-col gap-8 md:gap-12">

            <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1]">
              [ Let&apos;s Build Together ]
            </p>

            <div className="flex flex-col gap-1">
              <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase">
                Ready to make
              </p>
              <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase pl-[12%]">
                something
              </p>
              <div className="flex items-baseline justify-end gap-4">
                <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase">
                  {"remarkable"}
                  <span
                    className="font-playfair italic font-normal"
                    style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
                  >
                    {"?"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4 border-t border-white/20">
              <p className="text-[14px] text-white/60 leading-[1.4] [letter-spacing:-0.56px] max-w-[360px]">
                Whether it&apos;s a brand identity, a campaign, or a digital product — if you want it done right, let&apos;s talk.
              </p>
              <CTAButton
                variant="ghost"
                className="border border-white text-white text-[14px] font-medium px-6 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap"
              >
                Let&apos;s talk
              </CTAButton>
            </div>

          </div>
        </section>

      </main>

      <FooterReveal>
        <footer id="contact" data-nav-theme="dark" className="bg-black overflow-hidden">

          <div data-footer-item className="px-4 pt-12 lg:px-8 lg:pt-[48px] flex flex-col gap-6 lg:gap-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
              <div className="flex flex-col gap-3 lg:w-[298px]">
                <p className="font-light italic text-[24px] text-white uppercase leading-[1.1] [letter-spacing:-0.96px]">
                  Have a{" "}
                  <span className="font-black not-italic">project</span>
                  {" "}in mind?
                </p>
                <CTAButton variant="ghost" className="self-start border border-white text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap">
                  Let&apos;s talk
                </CTAButton>
              </div>
              <div className="lg:hidden flex flex-col gap-1 text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px]">
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Facebook</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Instagram</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">X.com</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Linkedin</a>
              </div>
              <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-center w-[298px]">
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Facebook</a>
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Instagram</a>
              </div>
              <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-right w-[298px]">
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">X.com</a>
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Linkedin</a>
              </div>
            </div>
            <div className="h-px bg-white/20 w-full" />
          </div>

          <div data-footer-item className="hidden lg:flex items-end justify-between px-8 mt-[120px]">
            <div className="relative overflow-hidden h-[219px] w-[1093px]">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-[160px] w-[15px]">
                <p className="-rotate-90 font-mono text-[14px] text-white uppercase whitespace-nowrap leading-[1.1]">[ Coded By Claude ]</p>
              </div>
              <p className="absolute left-0 top-1/2 -translate-y-1/2 font-semibold text-[290px] text-white leading-[0.8] [letter-spacing:-0.06em] capitalize whitespace-nowrap">
                H.Studio
              </p>
            </div>
            <div className="flex gap-[34px] pb-8 text-[12px] text-white uppercase leading-[1.1] [letter-spacing:-0.48px] whitespace-nowrap">
              <a href="#" className="underline hover:opacity-70 transition-opacity">Licences</a>
              <a href="#" className="underline hover:opacity-70 transition-opacity">Privacy policy</a>
            </div>
          </div>

          <div data-footer-item className="lg:hidden px-4 mt-12 flex flex-col gap-4 overflow-hidden">
            <div className="flex gap-[34px] justify-center text-[12px] text-white uppercase leading-[1.1] [letter-spacing:-0.48px] whitespace-nowrap">
              <a href="#" className="underline hover:opacity-70 transition-opacity">Licences</a>
              <a href="#" className="underline hover:opacity-70 transition-opacity">Privacy policy</a>
            </div>
            <div className="overflow-hidden">
              <p className="font-mono text-[10px] text-white uppercase leading-[1.1] mb-3">[ Coded By Claude ]</p>
              <p className="font-semibold text-[91px] text-white leading-[0.8] [letter-spacing:-0.06em] capitalize whitespace-nowrap">H.Studio</p>
            </div>
          </div>

        </footer>
      </FooterReveal>
    </>
  );
}
