import type { Metadata } from "next";
import Image from "next/image";
import { Bug, Home } from "lucide-react";
import { SupportPayment } from "./SupportPayment";
import styles from "./support.module.css";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support Chaitanya Patil with a UPI contribution and help fund portfolio work, side projects, and product engineering experiments.",
  keywords: [
    "Support Chaitanya Patil",
    "UPI tip",
    "UPI contribution",
    "donate to developer",
    "Chaitanya Patil",
  ],
  alternates: {
    canonical: "/support/",
  },
  openGraph: {
    type: "website",
    title: "Support Chaitanya Patil | UPI Contributions",
    description:
      "Support Chaitanya Patil with a UPI contribution and help fund portfolio work and side projects.",
    url: "https://www.chaitanyapatil.online/support/",
    siteName: "Chaitanya Patil",
  },
  twitter: {
    card: "summary",
    title: "Support Chaitanya Patil | UPI Contributions",
    description:
      "Support Chaitanya Patil with a UPI contribution and help fund portfolio work and side projects.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Support Chaitanya Patil",
  alternateName: ["Tip Chaitanya Patil", "UPI Support for Chaitanya Patil"],
  url: "https://www.chaitanyapatil.online/support/",
  description: "Support Chaitanya Patil with a UPI contribution for portfolio work and side projects.",
  about: {
    "@type": "Person",
    name: "Chaitanya Patil",
    url: "https://www.chaitanyapatil.online/",
  },
};

export default function SupportPage() {
  return (
    <main className={styles.shell}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.header}>
        <a className={styles.home} href="/">
          <Home size={16} aria-hidden="true" />
          Home
        </a>
        <div className={styles.brand}>
          <Bug size={20} aria-hidden="true" />
          <span>Support Signal</span>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Friendly neighborhood tip jar</p>
          <h1>
            Support the next
            <span> build.</span>
          </h1>
          <p>
            If my projects helped you, made you curious, or saved you a debugging hour, you can send a small UPI
            contribution here.
          </p>
        </div>
        <div className={styles.heroMascot} aria-hidden="true">
          <Image
            src="/easter-eggs/swingang.jpg"
            alt=""
            fill
            sizes="220px"
            className={styles.heroMascotImage}
            priority
          />
        </div>
      </section>

      <SupportPayment />
    </main>
  );
}
