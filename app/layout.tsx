import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bangers } from "next/font/google";
import "./globals.css";
import { AppChrome } from "./components/AppChrome";
import { projects } from "./data/projects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const bangers = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chaitanyapatil.online"),
  title: {
    default: "Chaitanya Patil | Full Stack Developer in India",
    template: "%s | Chaitanya Patil",
  },
  description: "Portfolio of Chaitanya Patil, a Full Stack Developer in India building Java Spring Boot, React, Next.js, ASP.NET Core, MySQL, and real-time web applications.",
  keywords: ["Chaitanya Patil", "Full Stack Developer India", "Java Spring Boot Developer", "React Developer", "Next.js Developer", "ASP.NET Core Developer", "Software Engineer Portfolio", "MySQL Developer"],
  authors: [{ name: "Chaitanya Patil", url: "https://www.chaitanyapatil.online" }],
  creator: "Chaitanya Patil",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Chaitanya Patil | Full Stack Developer in India",
    description: "Full Stack Developer portfolio featuring Java Spring Boot, React, Next.js, ASP.NET Core, real-time apps, and production web projects.",
    url: "https://www.chaitanyapatil.online",
    siteName: "Chaitanya Patil Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.chaitanyapatil.online/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Chaitanya Patil full stack developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaitanya Patil | Full Stack Developer in India",
    description: "Full Stack Developer portfolio featuring Java Spring Boot, React, Next.js, ASP.NET Core, and production web projects.",
    creator: "@Chaitanyahoon", 
    images: ["https://www.chaitanyapatil.online/opengraph-image"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chaitanya Patil",
  url: "https://www.chaitanyapatil.online",
  jobTitle: "Full Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN"
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "MET Institute of Information Technology"
    },
    {
      "@type": "EducationalOrganization",
      name: "Laxmi Institute of Technology"
    }
  ],
  sameAs: [
    "https://github.com/Chaitanyahoon",
    "https://www.linkedin.com/in/chaitanyapatil700"
  ],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "ASP.NET Core",
    "MySQL",
    "Full Stack Development",
    "REST APIs"
  ],
  hasPart: projects.map((project) => ({
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: project.category,
    url: `https://www.chaitanyapatil.online/projects/${project.slug}/`,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Chaitanya Patil Portfolio",
  url: "https://www.chaitanyapatil.online",
  author: {
    "@type": "Person",
    name: "Chaitanya Patil",
  },
  inLanguage: "en",
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Chaitanya Patil Full Stack Developer Portfolio",
  url: "https://www.chaitanyapatil.online",
  hasPart: projects.map((project, index) => ({
    "@type": "CreativeWork",
    position: index + 1,
    name: project.title,
    description: project.description,
    url: `https://www.chaitanyapatil.online/projects/${project.slug}/`,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${bangers.variable} antialiased bg-[var(--theme-bg)]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd, portfolioJsonLd]) }}
        />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
