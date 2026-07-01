import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import TopNavBar from "./components/TopNavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import TechMarquee from "./components/TechMarquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import Preloader from "./components/Preloader";
import CursorGlow from "./components/CursorGlow";
import ScrollProgressBar from "./components/ScrollProgressBar";
import PageTransitionOverlay from "./components/PageTransitionOverlay";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio-theme", next);
      return next;
    });
  };

  // Sync data-theme attribute on root element so CSS vars cascade correctly
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme} className="relative min-h-screen t-bg t-txt antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Preloader />
      <ScrollProgressBar />
      <PageTransitionOverlay />
      <CursorGlow />

      <TopNavBar onOpenResume={() => setIsResumeOpen(true)} theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero theme={theme} />
        <About />
        <Skills />
        <TechMarquee />
        <Projects theme={theme} />
        <Services />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
