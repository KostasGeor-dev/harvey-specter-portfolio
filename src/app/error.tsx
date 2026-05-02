"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-[13px] text-white/40 uppercase leading-[1.1] mb-6">
        [ Something went wrong ]
      </p>
      <p className="text-[16px] text-white/60 leading-[1.5] [letter-spacing:-0.04em] max-w-[320px] mb-8">
        An unexpected error occurred. Try again or return home.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="border border-white text-white text-[14px] font-medium px-6 py-3 rounded-3xl [letter-spacing:-0.56px] hover:bg-white hover:text-black transition-colors duration-200"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border border-white/30 text-white/60 text-[14px] font-medium px-6 py-3 rounded-3xl [letter-spacing:-0.56px] hover:border-white hover:text-white transition-colors duration-200"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
