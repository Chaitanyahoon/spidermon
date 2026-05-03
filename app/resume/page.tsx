import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resume.module.css";

const resumePdf = "/ChaitanyaPatil.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Chaitanya Patil, a Full Stack Developer specializing in Java, Spring Boot, React, Next.js, and .NET.",
  alternates: {
    canonical: "/resume/",
  },
  openGraph: {
    type: "profile",
    title: "Resume | Chaitanya Patil",
    description:
      "View and download the resume of Chaitanya Patil, Full Stack Developer.",
    url: "https://www.chaitanyapatil.online/resume/",
    siteName: "Chaitanya Patil",
  },
  twitter: {
    card: "summary",
    title: "Resume | Chaitanya Patil",
    description:
      "View and download the resume of Chaitanya Patil, Full Stack Developer.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Resume | Chaitanya Patil",
  url: "https://www.chaitanyapatil.online/resume/",
  description: "Resume of Chaitanya Patil, Full Stack Developer.",
  mainEntity: {
    "@type": "Person",
    name: "Chaitanya Patil",
    jobTitle: "Full Stack Developer",
    url: "https://www.chaitanyapatil.online/",
  },
};

export default function ResumePage() {
  return (
    <main className={styles.shell}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.toolbar}>
        <Link className={styles.homeLink} href="/">
          Back to Home
        </Link>
        <div className={styles.actions}>
          <a className={styles.secondaryButton} href={resumePdf} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
          <a className={styles.primaryButton} href={resumePdf} download="ChaitanyaPatil.pdf">
            Download
          </a>
        </div>
      </header>

      <section className={styles.viewerWrap} aria-label="Resume PDF viewer">
        <object className={styles.viewer} data={`${resumePdf}#view=FitH`} type="application/pdf">
          <div className={styles.fallback}>
            <p>Your browser cannot display the resume PDF inline.</p>
            <a href={resumePdf} download="ChaitanyaPatil.pdf">
              Download Resume
            </a>
          </div>
        </object>
      </section>
    </main>
  );
}
