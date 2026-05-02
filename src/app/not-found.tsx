import Link from "next/link";
import NavBar from "./components/NavBar";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center" data-nav-theme="dark">
        <p className="font-mono text-[13px] text-white/40 uppercase leading-[1.1] mb-6">
          [ 404 — Page not found ]
        </p>
        <p className="font-light text-[20vw] md:text-[15vw] text-white leading-[0.84] [letter-spacing:-0.08em] uppercase mb-10">
          404
        </p>
        <p className="text-[16px] text-white/60 leading-[1.5] [letter-spacing:-0.04em] max-w-[320px] mb-8">
          This page doesn&apos;t exist. It may have moved or been removed.
        </p>
        <Link
          href="/"
          className="border border-white text-white text-[14px] font-medium px-6 py-3 rounded-3xl [letter-spacing:-0.56px] hover:bg-white hover:text-black transition-colors duration-200"
        >
          Back to home
        </Link>
      </main>
    </>
  );
}
