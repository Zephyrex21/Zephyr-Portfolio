import { useState, useEffect } from "react";
import { Menu, X, FileText, Sun, Moon, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TopNavBarProps {
  onOpenResume: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function TopNavBar({ onOpenResume, theme, toggleTheme }: TopNavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollState = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
      rafId = null;
    };

    const handleScroll = () => {
      // Coalesce rapid scroll events into one layout read per frame
      if (rafId === null) rafId = requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { name: "Home",     href: "#home",     id: "home" },
    { name: "About",    href: "#about",    id: "about" },
    { name: "Skills",   href: "#skills",   id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact",  href: "#contact",  id: "contact" },
  ];

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "t-nav-bg backdrop-blur-md border-b t-bdr py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12">
          {/* Brand */}
          <a href="#home" className="font-display text-2xl md:text-3xl font-black tracking-tighter uppercase t-txt hover:text-primary transition-colors duration-200">
            ZEPHYREX<span className="text-primary">.21</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className={`relative font-sans text-xs font-bold uppercase tracking-widest transition-all py-2 px-3 rounded-lg ${
                  activeSection === link.id ? "text-primary" : "t-txt opacity-60 hover:opacity-100"
                }`}
              >
                {/* Sliding background pill */}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 border t-bdr rounded-full flex items-center justify-center t-txt60 hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenResume}
              className="px-5 py-2 border t-bdr2 t-txt rounded-full text-xs uppercase tracking-widest font-bold cursor-pointer flex items-center gap-1.5 t-btn-inv transition-all duration-250"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </button>

            <a
              href="/resume.pdf"
              download
              className="w-9 h-9 border t-bdr rounded-full flex items-center justify-center t-txt60 hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer"
              title="Download Resume PDF"
            >
              <Download className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="px-5 py-2 bg-primary text-on-primary rounded-full text-xs uppercase tracking-widest font-bold cursor-pointer t-btn-inv transition-all duration-250"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 border t-bdr t-txt60 hover:text-primary rounded-full transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenResume}
              className="p-2 border t-bdr t-txt rounded-full transition-colors cursor-pointer"
              title="Resume"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 t-txt hover:text-primary transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-30 t-nav-bg backdrop-blur-lg border-b t-bdr shadow-lg md:hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={closeMobile}
                  className={`font-display text-sm font-extrabold uppercase tracking-widest py-1 transition-colors ${
                    activeSection === link.id ? "text-primary pl-2 border-l-2 border-primary" : "t-txt60 hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t t-bdr flex flex-col gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => { closeMobile(); onOpenResume(); }}
                    className="flex-1 py-3 border t-bdr2 t-txt rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer t-btn-inv transition-all duration-200"
                  >
                    <FileText className="w-4 h-4" />
                    Resume
                  </button>
                  <a
                    href="/resume.pdf"
                    download
                    onClick={closeMobile}
                    className="py-3 px-4 border t-bdr t-txt60 hover:text-primary hover:border-primary rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href="#contact"
                  onClick={closeMobile}
                  className="w-full py-3 bg-primary text-on-primary rounded-full text-xs uppercase tracking-widest text-center font-bold block cursor-pointer t-btn-inv transition-all duration-200"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
