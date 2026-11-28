import React from "react";
import Link from "next/link";
import { TMinusWordmark } from "@/components/landing/t-minus-wordmark";

/** Shared frame for the legal pages: same ground and type as the site, nothing else. */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-ground text-ink">
      <header className="flex h-14 items-center justify-between px-5 sm:h-[68px] sm:px-9">
        <Link href="/" aria-label="T-minus home" className="text-ink">
          <TMinusWordmark className="[--wm-scale:1.05] sm:[--wm-scale:1.3]" />
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-[8px] bg-ink px-4 text-[13.5px] font-semibold uppercase tracking-[0.03em] text-accent transition-opacity duration-150 ease-out active:opacity-70 [@media(hover:hover)]:hover:opacity-90"
        >
          Join the waitlist
        </Link>
      </header>
      <main className="mx-auto w-full max-w-[720px] px-5 pb-24 pt-10 sm:px-9 sm:pt-16">
        <h1 className="statement text-[clamp(2.4rem,6vw,4rem)] text-ink">{title}</h1>
        <p className="mt-3 text-[14px] text-mute">Last updated {updated}</p>
        <div className="legal mt-10 space-y-8 text-[17px] leading-[1.6] text-soft">{children}</div>
      </main>
      <footer className="mx-auto flex w-full max-w-[720px] items-center gap-1 px-5 pb-10 text-[14px] text-mute sm:px-9">
        <span className="pr-2">&copy; 2026 T^minus</span>
        <Link href="/privacy" className="inline-flex h-11 items-center px-2 [@media(hover:hover)]:hover:text-ink">
          Privacy
        </Link>
        <Link href="/terms" className="inline-flex h-11 items-center px-2 [@media(hover:hover)]:hover:text-ink">
          Terms
        </Link>
      </footer>
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">{heading}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}
