import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Grain } from "@/components/visual/grain";
import { site } from "@/config/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.organizationName} — ${site.tagline}`,
    template: `%s — ${site.abbreviation}`,
  },
  description: site.description,
  applicationName: site.organizationName,
  keywords: [
    "Oman Computing Society",
    "OCS",
    "student technology community Oman",
    "programming workshops Oman",
    "artificial intelligence Oman",
    "hackathons Oman",
    "computer science students",
  ],
  authors: [{ name: site.organizationName }],
  creator: site.organizationName,
  publisher: site.organizationName,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_OM",
    url: site.url,
    siteName: site.organizationName,
    title: `${site.organizationName} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.organizationName} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f3f0ea",
  colorScheme: "light dark",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("ocs-theme");var theme=t==="dark"?"dark":"light";document.documentElement.setAttribute("data-theme",theme);document.documentElement.style.colorScheme=theme;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute("content",theme==="light"?"#f3f0ea":"#0c0b0a");}catch(e){document.documentElement.setAttribute("data-theme","light");document.documentElement.style.colorScheme="light";}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <div aria-hidden="true" className="ocs-atmosphere pointer-events-none fixed inset-0 -z-10" />
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-md focus-visible:bg-surface-3 focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:text-ink"
        >
          Skip to content
        </a>
        {children}
        <Grain />
        <Analytics />
      </body>
    </html>
  );
}
