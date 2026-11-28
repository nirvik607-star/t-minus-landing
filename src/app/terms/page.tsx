import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { SMS_PROGRAM } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Text message terms",
  description: "Terms for T^minus launch and drop alerts by text message.",
};

export default function TermsPage() {
  const mail = SMS_PROGRAM.supportEmail;
  const brand = SMS_PROGRAM.brand;
  return (
    <LegalShell title="Text message terms" updated="November 28, 2026">
      <LegalSection heading="The program">
        <p>
          {brand} launch and drop alerts is a text-message program run by {brand}. When you enter your
          mobile number on this website and tick the consent box, you agree to receive recurring
          automated text messages from {brand} at that number: a message when the app is live on the App
          Store, and alerts about drops. Brands that join may also receive messages about setting up a
          drop.
        </p>
        <p>Consent is not a condition of any purchase.</p>
      </LegalSection>

      <LegalSection heading="How many messages">
        <p>
          Message frequency varies. You will receive up to {SMS_PROGRAM.maxMessagesPerMonth} messages a
          month.
        </p>
      </LegalSection>

      <LegalSection heading="Cost">
        <p>Message and data rates may apply, depending on your mobile plan.</p>
      </LegalSection>

      <LegalSection heading="Stopping and getting help">
        <p>
          <strong className="font-semibold text-ink">
            Reply STOP to any message to cancel. You will get one final message confirming it. Reply HELP
            for help.
          </strong>
        </p>
        <p>
          You can also reach us at{" "}
          <a href={`mailto:${mail}`} className="text-ink underline decoration-peri/60 underline-offset-2">
            {mail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Carriers">
        <p>Carriers are not liable for any delayed or undelivered messages.</p>
      </LegalSection>

      <LegalSection heading="Your number">
        <p>
          Join only with a mobile number that is yours. If you change numbers, reply STOP from the old
          one first or email us so we can remove it.
        </p>
      </LegalSection>

      <LegalSection heading="Privacy">
        <p>
          How we handle your number is set out on the{" "}
          <Link href="/privacy" className="text-ink underline decoration-peri/60 underline-offset-2">
            Privacy
          </Link>{" "}
          page. We do not share mobile numbers or text-message consent with third parties for their
          marketing.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
