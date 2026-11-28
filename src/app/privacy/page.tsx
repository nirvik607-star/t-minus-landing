import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { SMS_PROGRAM } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the T^minus waitlist collects, why, and how to have it removed.",
};

export default function PrivacyPage() {
  const mail = SMS_PROGRAM.supportEmail;
  return (
    <LegalShell title="Privacy" updated="November 28, 2026">
      <LegalSection heading="What this covers">
        <p>
          This page covers the T^minus waitlist at this website. The T^minus app will have its own
          privacy policy when it launches.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>When you join the waitlist we collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>your mobile phone number;</li>
          <li>whether you joined as a shopper or as a brand, and your brand&rsquo;s name if you gave one;</li>
          <li>the date and time you agreed to receive text messages;</li>
          <li>the link or campaign that brought you here, if the address you arrived from carried one.</li>
        </ul>
        <p>We do not ask for your name, email address, payment details or location.</p>
      </LegalSection>

      <LegalSection heading="The public map">
        <p>
          This website shows a globe of where people have joined from. It is drawn from the area
          code of each number and nothing else: an area code tells us a broad region, such as a
          metro area or part of a state, shared by a very large number of phones.
        </p>
        <p>
          The map never shows or sends your number, any part of it, the time you joined, or the order
          people joined in. It shows a region&rsquo;s name and a mark on the globe, and a count of
          how many people are on the list.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>
          We use your number to send you the text messages you asked for: a message when T^minus is
          live on the App Store, and alerts about drops. If you joined as a brand we may also text you
          about setting up your first drop.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          <strong className="font-semibold text-ink">
            We do not sell, rent or share your mobile number or your text-message consent with third
            parties or affiliates for their marketing.
          </strong>
        </p>
        <p>
          We share your number only with the service providers that deliver our text messages and store
          the waitlist for us, and only so they can do that work. We may disclose information if the law
          requires it.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          Reply <strong className="font-semibold text-ink">STOP</strong> to any message to stop receiving
          texts. Reply <strong className="font-semibold text-ink">HELP</strong> for help. To have your
          number removed from the waitlist entirely, email{" "}
          <a href={`mailto:${mail}`} className="text-ink underline decoration-peri/60 underline-offset-2">
            {mail}
          </a>{" "}
          from any address and include the number.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep waitlist records until you ask us to remove them or until the waitlist is retired
          after launch, whichever comes first. We keep a record of consent and of opt-outs for as long
          as the law requires.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and contact">
        <p>
          If this page changes we will update the date at the top. Questions go to{" "}
          <a href={`mailto:${mail}`} className="text-ink underline decoration-peri/60 underline-offset-2">
            {mail}
          </a>
          . The text-message program is described in the{" "}
          <Link href="/terms" className="text-ink underline decoration-peri/60 underline-offset-2">
            Terms
          </Link>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
