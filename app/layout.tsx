import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bangers } from "next/font/google";
import "./globals.css";
import { CamoWrapper } from "./components/CamoWrapper";
import { LayoutOverlays } from "./components/LayoutOverlays";

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
  title: "Chaitanya Patil — Full-Stack Developer",
  description:
    "Portfolio of Chaitanya Patil — crafting digital experiences that push the web to its limits.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Chaitanya Patil — Full-Stack Developer",
    description:
      "Crafting digital experiences that push the web to its limits.",
    type: "website",
  },
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
        <LayoutOverlays />
        <CamoWrapper>{children}</CamoWrapper>
      </body>
    </html>
  );
}
