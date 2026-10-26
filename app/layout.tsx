import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { BUSINESS_NAME, site } from "@/config/site";
import "./globals.css";

// Fonturi găzduite local: Cormorant Garamond (titluri) și Source Sans 3 (text).
// Fiecare are fișier „latin” + „latin-ext” (pentru ă, â, î, ș, ț).
const display = localFont({
  src: "./fonts/cormorant-garamond-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-display-latin",
  display: "swap",
  adjustFontFallback: false,
});
const displayExt = localFont({
  src: "./fonts/cormorant-garamond-latin-ext-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-display-ext",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});
// Italicul (doar pentru accente) nu se preîncarcă.
const italic = localFont({
  src: "./fonts/cormorant-garamond-latin-wght-italic.woff2",
  weight: "300 700",
  style: "italic",
  variable: "--font-italic-latin",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});
const italicExt = localFont({
  src: "./fonts/cormorant-garamond-latin-ext-wght-italic.woff2",
  weight: "300 700",
  style: "italic",
  variable: "--font-italic-ext",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});
const text = localFont({
  src: "./fonts/source-sans-3-latin-wght-normal.woff2",
  weight: "200 900",
  variable: "--font-text-latin",
  display: "swap",
  adjustFontFallback: false,
});
const textExt = localFont({
  src: "./fonts/source-sans-3-latin-ext-wght-normal.woff2",
  weight: "200 900",
  variable: "--font-text-ext",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

export const metadata: Metadata = {
  title: { default: `${BUSINESS_NAME} — ${site.tagline}`, template: `%s | ${BUSINESS_NAME}` },
  description: `${BUSINESS_NAME}: ${site.shortDescription}`,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#EADFCB",
  colorScheme: "light",
};

const fontVars = [display, displayExt, italic, italicExt, text, textExt].map((f) => f.variable).join(" ");

// Marcaj „js”: animațiile de apariție nu ascund nimic dacă JavaScript nu rulează.
const jsFlag = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <Header />
        <ViewTransition default="pagina">
          <main id="continut" tabIndex={-1}>
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
