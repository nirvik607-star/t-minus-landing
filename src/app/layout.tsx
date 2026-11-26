import type { Metadata } from "next";
import { Inter, Inter_Tight, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T^minus · Fashion. Minus the Noise.",
  description:
    "The best clothes in the world rarely have the loudest voice. Independent clothing drops on a live clock. App Store v1.0 launching January 1, 2027.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${ibmPlexMono.variable} ${newsreader.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#040206] text-white">{children}</body>
    </html>
  );
}
