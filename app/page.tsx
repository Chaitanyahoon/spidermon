import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import Skills from "./components/Skills";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import MarqueeTicker from "./components/MarqueeTicker";
import Footer from "./components/Footer";

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
