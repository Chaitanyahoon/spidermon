import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { WebCursor } from "./components/WebCursor";
import { HalftoneOverlay } from "./components/HalftoneOverlay";
import { SpiderSenseTransition } from "./components/SpiderSenseTransition";
import { WebScrollbar } from "./components/WebScrollbar";
import { WebPullToTop } from "./components/WebPullToTop";
import { CamoWrapper } from "./components/CamoWrapper";

// Clean sans-serif for body and subtext - architectural precision
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Strong geometric display font - bold and dominant
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
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
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <HalftoneOverlay />
          <SpiderSenseTransition />
          <WebScrollbar />
          <WebCursor />
          <WebPullToTop />
          <CamoWrapper>{children}</CamoWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
