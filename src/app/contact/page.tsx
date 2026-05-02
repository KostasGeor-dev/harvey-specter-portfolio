import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import FooterReveal from "../components/FooterReveal";
import CTAButton from "../components/CTAButton";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Harvey Specter. Tell me about your project — no templates, no assumptions. Available for brand, web design, and photography work.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Harvey Specter",
    description: "Get in touch. No templates, no assumptions — just an honest conversation about what you want to build.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="relative bg-white z-[1]">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          data-nav-theme="dark"
          className="bg-black px-4 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28 overflow-hidden"
        >
          <div className="flex flex-col gap-10 md:gap-16">

            <div className="flex items-center justify-between">
              <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1]">
                [ H.Studio — Contact ]
              </p>
              <p className="font-mono text-[14px] text-white/50 uppercase leading-[1.1]">
                005
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase">
                Let&apos;s
              </p>
              <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase pl-[15%] md:pl-[22%]">
                Build
              </p>
              <div className="flex items-baseline justify-end">
                <p className="font-light text-[12vw] md:text-[9.375vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase">
                  Together
                  <span
                    className="font-playfair italic font-normal"
                    style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
                  >
                    .
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8">
              <p className="text-[14px] text-white/60 leading-[1.4] [letter-spacing:-0.56px] max-w-[320px]">
                Tell me about your project. No templates, no assumptions — just an honest conversation about what you want to build.
              </p>
            </div>

          </div>
        </section>

        {/* ── Contact body ─────────────────────────────────────────── */}
        <section className="px-4 py-16 md:px-8 md:py-[120px]">
          <div className="flex flex-col md:flex-row gap-16 md:gap-20 lg:gap-32">

            {/* ── Info column ── */}
            <div className="md:w-[260px] lg:w-[300px] shrink-0 flex flex-col gap-10">

              <div className="flex flex-col gap-2">
                <p className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1]">Email</p>
                <a
                  href="mailto:hello@h.studio"
                  className="text-[16px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em] hover:opacity-50 transition-opacity duration-200"
                >
                  hello@h.studio
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1]">Based in</p>
                <p className="text-[16px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">Chicago, IL</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1]">Availability</p>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
                  <p className="text-[16px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em]">
                    Open to new projects
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#1f1f1f]/15 w-full" />

              <div className="flex flex-col gap-1.5 text-[16px] text-[#1f1f1f] uppercase leading-[1.1] [letter-spacing:-0.64px]">
                <a href="#" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity duration-200">Facebook</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity duration-200">Instagram</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity duration-200">X.com</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity duration-200">Linkedin</a>
              </div>

            </div>

            {/* ── Form column ── */}
            <div className="flex-1 min-w-0">
              <div className="mb-10">
                <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-4">
                  [ Get in touch ]
                </p>
                <p className="text-[18px] md:text-[22px] text-[#1f1f1f] leading-[1.3] [letter-spacing:-0.04em] max-w-[480px]">
                  Fill in the form and I&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>

          </div>
        </section>

      </main>

      <FooterReveal>
        <footer data-nav-theme="dark" className="bg-black overflow-hidden">

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
