import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/landing-experience";

export const metadata: Metadata = {
  title: "T^minus · Fashion. Minus the Noise.",
  description:
    "The best clothes in the world rarely have the loudest voice. Independent clothing drops on a live clock. App Store v1.0 launching January 1, 2027.",
};

export default function LandingPage() {
  return <LandingExperience />;
}
