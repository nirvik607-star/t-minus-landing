import type { Metadata } from "next";
import {
  Fragment_Mono,
  Funnel_Display,
  Host_Grotesk,
  Newsreader,
} from "next/font/google";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  style: ["normal"],
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
      className={`${funnelDisplay.variable} ${hostGrotesk.variable} ${fragmentMono.variable} ${newsreader.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#040206] text-white">{children}</body>
    </html>
  );
}
