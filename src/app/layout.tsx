import type { Metadata } from "next";
import { Inter, Geist_Mono, Playfair_Display } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import ModalProvider from "./components/ModalProvider";
import ReducedMotion from "./components/ReducedMotion";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://h.studio";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harvey Specter — Creative Director & Photographer",
    template: "%s — Harvey Specter",
  },
  description: "Chicago-based creative director and photographer with 12+ years building bold brands. Photography, web design, marketing, and brand discovery.",
  openGraph: {
    siteName: "Harvey Specter",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Harvey Specter — Creative Director & Photographer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harvey Specter",
              description: "Creative director and photographer based in Chicago",
              jobTitle: "Creative Director",
              url: siteUrl,
              image: `${siteUrl}/og-image.jpg`,
              email: "hello@h.studio",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chicago",
                addressRegion: "IL",
                addressCountry: "US",
              },
              sameAs: [],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:text-sm focus:font-medium focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ModalProvider>
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </ModalProvider>
        <SanityLive />
        <ReducedMotion />
      </body>
    </html>
  );
}
