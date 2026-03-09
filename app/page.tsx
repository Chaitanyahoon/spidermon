import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import dynamic from 'next/dynamic';

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
  return (
    <main className="bg-[var(--theme-bg)]">
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
  );
}
