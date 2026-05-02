import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import NewsSlider from "./components/NewsSlider";
import CTAButton from "./components/CTAButton";
import NavBar from "./components/NavBar";
import PortraitReveal from "./components/PortraitReveal";
import ParallaxX from "./components/ParallaxX";
import IdentityText from "./components/IdentityText";
import BlurImage from "./components/BlurImage";
import ServiceRow from "./components/ServiceRow";
import ProjectCard from "./components/ProjectCard";
import TestimonialCard from "./components/TestimonialCard";
import NewsCard from "./components/NewsCard";
import FooterReveal from "./components/FooterReveal";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Harvey Specter — Creative Director & Photographer",
    description: "Chicago-based creative director and photographer with 12+ years building bold brands.",
    url: "/",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

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


const PORTFOLIO_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  tags,
  coverImage,
  imageUrl
}`;

const NEWS_QUERY = `*[_type == "post"] | order(order asc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  imageUrl,
  category
}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortfolioProject = { _id: string; title: string; slug: string | null; tags: string[] | null; coverImage: any; imageUrl: string | null };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NewsPost = { _id: string; title: string; slug: string | null; excerpt: string; coverImage: any; imageUrl: string | null; category: string | null };


export default async function Home() {
  const [portfolioProjects, newsPosts] = await Promise.all([
    client.fetch<PortfolioProject[]>(PORTFOLIO_QUERY, {}, { cache: "no-store" }),
    client.fetch<NewsPost[]>(NEWS_QUERY, {}, { cache: "no-store" }),
  ]);

  const newsItems = newsPosts.map((p) => ({
    img: p.coverImage ? urlFor(p.coverImage).width(900).url() : (p.imageUrl ?? ""),
    text: p.excerpt,
    category: p.category ?? undefined,
    href: p.slug ? `/news/${p.slug}` : undefined,
  }));

  return (
    <>
      <NavBar />
      <main className="relative bg-white z-[1]">
      <HeroSection heroImg={heroImg} />

      {/* ── About / Identity Section ─────────────────────────── */}
      <section id="about" className="overflow-x-hidden px-4 py-12 md:px-8 md:py-[120px]">
        <h2 className="sr-only">About</h2>
        {/* Header: industry label + divider */}
        <div className="flex flex-col gap-3 items-end mb-6">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </p>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        <IdentityText />
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
            <ParallaxX className="relative p-6 shrink-0 w-[220px] lg:w-[340px] xl:w-[460px]">
              <div className="absolute top-0 left-0 size-4 border-t border-l border-[#1f1f1f]" />
              <div className="absolute bottom-0 left-0 size-4 border-b border-l border-[#1f1f1f]" />
              <div className="absolute top-0 right-0 size-4 border-t border-r border-[#1f1f1f]" />
              <div className="absolute bottom-0 right-0 size-4 border-b border-r border-[#1f1f1f]" />
              <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px]">
                I&apos;m a creative director and photographer based in Chicago,
                with over 12 years of turning bold ideas into visual identities
                that stick. My passion lives at the intersection of storytelling
                and strategy — I believe great design doesn&apos;t just catch
                the eye, it earns trust and moves people to act.
              </p>
              <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px] mt-3">
                I work alongside every client as a genuine partner, taking the
                time to understand your audience, your goals, and the story you
                need to tell. Where others deliver off-the-shelf solutions, I
                build from the ground up — combining photography, design, and
                code to craft work that doesn&apos;t just look remarkable today,
                but stays relevant tomorrow.
              </p>
            </ParallaxX>

            {/* 002 label + portrait */}
            <div className="flex gap-6 items-start shrink-0">
              <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                002
              </p>
              <PortraitReveal
                src={aboutPortrait}
                className="w-[200px] lg:w-[280px] xl:w-[436px] aspect-[436/614]"
              />
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
              I&apos;m a creative director and photographer based in Chicago,
              with over 12 years of turning bold ideas into visual identities
              that stick. My passion lives at the intersection of storytelling
              and strategy — I believe great design doesn&apos;t just catch the
              eye, it earns trust and moves people to act.
            </p>
            <p className="text-[14px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.56px] mt-3">
              I work alongside every client as a genuine partner, taking the
              time to understand your audience, your goals, and the story you
              need to tell. Where others deliver off-the-shelf solutions, I
              build from the ground up — combining photography, design, and code
              to craft work that doesn&apos;t just look remarkable today, but
              stays relevant tomorrow.
            </p>
          </div>

          {/* Portrait image */}
          <PortraitReveal src={aboutPortrait} className="w-full aspect-[422/594]" />
        </div>
      </section>

      {/* ── Full-bleed photo ───────────────────────────────────── */}
      {/*
        Desktop: 900px tall, full viewport width, centred crop.
        Mobile: 500px tall, focus shifted right (object-[70%]) to keep
        the face + camera in frame instead of showing empty sky on the left.
      */}
      <section data-nav-theme="dark" className="relative overflow-hidden h-[500px] md:h-[900px]">
        <BlurImage
          src={fullBleedPhoto}
          className="absolute inset-0 size-full object-cover object-[70%_50%] md:object-center pointer-events-none select-none"
        />
      </section>

      {/* ── Services Section ──────────────────────────────────── */}
      <section id="services" data-nav-theme="dark" className="bg-black px-4 py-12 md:px-8 md:py-20">
        <h2 className="sr-only">Services</h2>
        <div className="flex flex-col gap-8 md:gap-12">

          {/* [ services ] label */}
          <p className="font-mono text-[14px] text-white uppercase leading-[1.1]" aria-hidden="true">
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
              <ServiceRow key={s.num} s={s} />
            ))}
          </div>

        </div>
      </section>

      {/* ─── Selected Work ─── */}
      <section id="projects" className="px-4 py-12 md:px-8 md:py-20">
        <h2 className="sr-only">Selected Work</h2>

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
            <ProjectCard
              key={p._id}
              project={p}
              imageClassName="h-[390px]"
              titleClassName="text-[24px] [letter-spacing:-0.96px]"
            />
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
              <CTAButton className="self-start bg-black text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap border border-black">
                Let&apos;s talk
              </CTAButton>
            </div>
          </div>

        </div>

        {/* ── Desktop: two-column staggered ── */}
        <div className="hidden lg:flex gap-6">

          {/* Left column: justify-between distributes cards + CTA vertically */}
          <div className="flex-1 flex flex-col justify-between">

            {/* Item 0 */}
            {portfolioProjects[0] && (
              <ProjectCard
                project={portfolioProjects[0]}
                imageClassName="h-[744px]"
                titleClassName="text-[36px] [letter-spacing:-1.44px]"
              />
            )}

            {/* Item 1 */}
            {portfolioProjects[1] && (
              <ProjectCard
                project={portfolioProjects[1]}
                imageClassName="h-[699px]"
                titleClassName="text-[36px] [letter-spacing:-1.44px]"
              />
            )}

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
                <CTAButton className="self-start bg-black text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap border border-black">
                  Let&apos;s talk
                </CTAButton>
              </div>
            </div>

          </div>

          {/* Right column: offset 240px from top, 117px gap between cards */}
          <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">

            {/* Item 2 */}
            {portfolioProjects[2] && (
              <ProjectCard
                project={portfolioProjects[2]}
                imageClassName="h-[699px]"
                titleClassName="text-[36px] [letter-spacing:-1.44px]"
              />
            )}

            {/* Item 3 */}
            {portfolioProjects[3] && (
              <ProjectCard
                project={portfolioProjects[3]}
                imageClassName="h-[744px]"
                titleClassName="text-[36px] [letter-spacing:-1.44px]"
              />
            )}

          </div>

        </div>

      </section>

      {/* ─── Testimonials — Mobile ─── */}
      <section className="px-4 py-16 lg:hidden">
        <h2 className="font-medium text-[64px] text-black text-center leading-[0.8] [letter-spacing:-0.07em] capitalize mb-8">
          Testimonials
        </h2>
        <div className="flex flex-col gap-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </section>

      {/* ─── Testimonials — Desktop ─── */}
      <section className="hidden lg:block relative overflow-hidden h-[987px]">

        {/* Lukas Weber — rendered first so heading layers on top of it */}
        <TestimonialCard
          t={testimonials[1]}
          rotation={parseFloat(testimonials[1].rot)}
          className="absolute w-[353px]"
          style={{ left: testimonials[1].dx, top: testimonials[1].dy }}
        />

        {/* Giant centred heading — sits on top of Lukas, behind the other three */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="font-medium text-[198px] text-black text-center leading-[1.1] [letter-spacing:-0.07em] capitalize whitespace-nowrap">
            Testimonials
          </h2>
        </div>

        {/* Marko Stojković */}
        <TestimonialCard
          t={testimonials[0]}
          rotation={parseFloat(testimonials[0].rot)}
          className="absolute w-[353px]"
          style={{ left: testimonials[0].dx, top: testimonials[0].dy }}
        />

        {/* Sarah Jenkins */}
        <TestimonialCard
          t={testimonials[2]}
          rotation={parseFloat(testimonials[2].rot)}
          className="absolute w-[353px]"
          style={{ left: testimonials[2].dx, top: testimonials[2].dy }}
        />

        {/* Sofia Martínez */}
        <TestimonialCard
          t={testimonials[3]}
          rotation={parseFloat(testimonials[3].rot)}
          className="absolute w-[353px]"
          style={{ left: testimonials[3].dx, top: testimonials[3].dy }}
        />

      </section>

      {/* ─── News anchor (shared for mobile + desktop) ─── */}
      <div id="news" />

      {/* ─── News — Mobile ─── */}
      <section className="bg-[#f3f3f3] px-4 py-16 lg:hidden">
        <h2 className="font-light text-[32px] text-black uppercase leading-[0.86] [letter-spacing:-0.08em] mb-8">
          Keep up with my latest news &amp; achievements
        </h2>
        <NewsSlider items={newsItems} />
      </section>

      {/* ─── News — Desktop ─── */}
      <section className="hidden lg:flex items-end justify-between bg-[#f3f3f3] px-8 py-[120px]">
        <h2 className="sr-only">News</h2>

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
          <NewsCard img={newsItems[0].img} text={newsItems[0].text} href={newsItems[0].href} category={newsItems[0].category} />

          {/* Divider */}
          <div className="w-px self-stretch bg-black/15 mx-[31px]" />

          {/* Card 2 — staggered 120px lower */}
          <NewsCard img={newsItems[1].img} text={newsItems[1].text} href={newsItems[1].href} category={newsItems[1].category} className="pt-[120px]" />

          {/* Divider */}
          <div className="w-px self-stretch bg-black/15 mx-[31px]" />

          {/* Card 3 */}
          <NewsCard img={newsItems[2].img} text={newsItems[2].text} href={newsItems[2].href} category={newsItems[2].category} />

        </div>
      </section>

      {/* ─── Footer ─── */}
      </main>

      <FooterReveal>
        <footer id="contact" data-nav-theme="dark" className="bg-black overflow-hidden">

          {/* ── Top: CTA / Socials / Divider ── */}
          <div data-footer-item className="px-4 pt-12 lg:px-8 lg:pt-[48px] flex flex-col gap-6 lg:gap-12">

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">

              {/* CTA — shared across breakpoints */}
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

              {/* Mobile: all 4 socials stacked below CTA */}
              <div className="lg:hidden flex flex-col gap-1 text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px]">
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Facebook</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Instagram</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">X.com</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Linkedin</a>
              </div>

              {/* Desktop center col: Facebook / Instagram */}
              <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-center w-[298px]">
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Facebook</a>
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Instagram</a>
              </div>

              {/* Desktop right col: X.com / Linkedin */}
              <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-right w-[298px]">
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">X.com</a>
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Linkedin</a>
              </div>

            </div>

            {/* Divider */}
            <div className="h-px bg-white/20 w-full" />

          </div>

          {/* ── Bottom: Desktop ── */}
          <div data-footer-item className="hidden lg:flex items-end justify-between px-8 mt-[120px]">

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
              <a href="#" className="underline hover:opacity-70 transition-opacity">Licences</a>
              <a href="#" className="underline hover:opacity-70 transition-opacity">Privacy policy</a>
            </div>

          </div>

          {/* ── Bottom: Mobile ── */}
          <div data-footer-item className="lg:hidden px-4 mt-12 flex flex-col gap-4 overflow-hidden">

            {/* Legal links centred */}
            <div className="flex gap-[34px] justify-center text-[12px] text-white uppercase leading-[1.1] [letter-spacing:-0.48px] whitespace-nowrap">
              <a href="#" className="underline hover:opacity-70 transition-opacity">Licences</a>
              <a href="#" className="underline hover:opacity-70 transition-opacity">Privacy policy</a>
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
      </FooterReveal>
    </>
  );
}
