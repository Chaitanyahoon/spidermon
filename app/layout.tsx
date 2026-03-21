import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bebas_Neue, Sedgwick_Ave_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { WebCursor } from "./components/WebCursor";
import { HalftoneOverlay } from "./components/HalftoneOverlay";
import { SpiderSenseTransition } from "./components/SpiderSenseTransition";
import { WebScrollbar } from "./components/WebScrollbar";
import { WebPullToTop } from "./components/WebPullToTop";
import { CamoWrapper } from "./components/CamoWrapper";
import { WebShooterLoader } from "./components/WebShooterLoader";
import { IdleSpiderMan } from "./components/IdleSpiderMan";
import { WebSlingTransition } from "./components/WebSlingTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Strong geometric display font
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

// Cinematic, sharp header font for Earth-1610 Miles Morales mode (replacing Anton which was too thick)
const bebas = Bebas_Neue({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Authentic street art font for Earth-1610 Miles Morales accents
const sedgwick = Sedgwick_Ave_Display({
  variable: "--font-graffiti",
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${bebas.variable} ${sedgwick.variable} antialiased bg-[var(--theme-bg)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >

          <WebShooterLoader />
          <HalftoneOverlay />
          <SpiderSenseTransition />
          <WebScrollbar />
          <WebCursor />
          <WebPullToTop />
          <IdleSpiderMan />
          <WebSlingTransition />
          <CamoWrapper>{children}</CamoWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
