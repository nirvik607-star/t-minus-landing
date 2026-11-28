import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

/** Functional sans: the wordmark's own sans, with its display cut for numerals. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

/** Brand serif: the family the wordmark's T is drawn in. Statements only. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic", "normal"],
  axes: ["opsz"],
  display: "swap",
});

/** Glyph material and live values. */
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nirvik607-star.github.io";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "T^minus | Fashion, minus the noise",
    template: "%s | T^minus",
  },
  description:
    "Limited drops from independent brands, on one live clock. T^minus launches on the App Store January 1, 2027. Join the waitlist.",
  alternates: { canonical: `${basePath}/` },
  openGraph: {
    type: "website",
    siteName: "T^minus",
    title: "T^minus | Fashion, minus the noise",
    description:
      "Limited drops from independent brands, on one live clock. On the App Store January 1, 2027.",
    url: `${basePath}/`,
    images: [{ url: `${basePath}/og.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "T^minus | Fashion, minus the noise",
    description:
      "Limited drops from independent brands, on one live clock. On the App Store January 1, 2027.",
    images: [`${basePath}/og.png`],
  },
  icons: {
    icon: `${basePath}/icon.png`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#2C0735",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ground text-ink">{children}</body>
    </html>
  );
}
