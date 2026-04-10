"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

/* Hero — client only, no SSR (heaviest component) */
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });

/* Below-fold sections — code-split */
const Introduction = dynamic(() => import("./components/Introduction"));
const Skills = dynamic(() => import("./components/Skills"));
const Expertise = dynamic(() => import("./components/Expertise"));
const Projects = dynamic(() => import("./components/Projects"));
const About = dynamic(() => import("./components/About"));
const Experience = dynamic(() => import("./components/Experience"));
const Certificates = dynamic(() => import("./components/Certificates"));
const Contact = dynamic(() => import("./components/Contact"));
const MarqueeTicker = dynamic(() => import("./components/MarqueeTicker"));
const Footer = dynamic(() => import("./components/Footer"));

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Loading screen — always renders on mount, self-manages its exit */}
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Site content — renders in background (invisible until loader finishes) */}
      <main
        className="bg-[var(--theme-bg)] transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <Navbar />
        <Hero />
        <Introduction />
        <Skills />
        <Expertise />
        <Projects />
        <Experience />
        <About />
        <Certificates />
        <Contact />
        <MarqueeTicker />
        <Footer />
      </main>
    </>
  );
}
