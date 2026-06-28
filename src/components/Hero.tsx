import { useEffect, useState, useRef } from "react";
import { ArrowDown, Code, Sparkles, Send } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps { theme: "dark" | "light"; }

export default function Hero({ theme }: HeroProps) {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const roles = [
    "Full-Stack Developer",
    "AI/ML Enthusiast",
    "CS Undergrad @ NSUT",
    "Algo Visualizer Builder",
  ];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;
    if (isDeleting) {
      timer = setTimeout(() => { setTypedText(currentRole.substring(0, charIndex - 1)); setCharIndex((p) => p - 1); }, 50);
    } else {
      timer = setTimeout(() => { setTypedText(currentRole.substring(0, charIndex + 1)); setCharIndex((p) => p + 1); }, 100);
    }
    if (!isDeleting && charIndex === currentRole.length) { timer = setTimeout(() => setIsDeleting(true), 2000); }
    else if (isDeleting && charIndex === 0) { setIsDeleting(false); setRoleIndex((p) => (p + 1) % roles.length); }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Canvas — adapts colors based on theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const onResize = () => { if (!canvas) return; w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2 };
    const onMouseMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; };
    window.addEventListener("mousemove", onMouseMove);

    const isDark = theme === "dark";
    const lineColor = isDark ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.04)";
    const blobColor1 = isDark ? "rgba(0, 255, 102, 0.025)" : "rgba(0, 153, 77, 0.04)";
    const blobColor2 = isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)";
    const glowColor  = isDark ? "rgba(0, 255, 102, 0.018)" : "rgba(0, 153, 77, 0.035)";

    const blobs = [
      { x: w * 0.3, y: h * 0.4, r: Math.min(w, h) * 0.25, c: blobColor1, vx: 0.4, vy: 0.25 },
      { x: w * 0.7, y: h * 0.6, r: Math.min(w, h) * 0.20, c: blobColor2, vx: -0.35, vy: 0.4 },
      { x: w * 0.5, y: h * 0.5, r: Math.min(w, h) * 0.15, c: blobColor1, vx: 0.25, vy: -0.25 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
      glow.addColorStop(0, glowColor);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2); ctx.fill();

      blobs.forEach((b) => {
        b.x += b.vx; b.y += b.vy;
        if (b.x - b.r < 0 || b.x + b.r > w) b.vx *= -1;
        if (b.y - b.r < 0 || b.y + b.r > h) b.vy *= -1;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.c); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      });

      ctx.strokeStyle = lineColor; ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("mousemove", onMouseMove); cancelAnimationFrame(animId); };
  }, [theme]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden t-bg pt-24 pb-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute top-1/4 left-10 md:left-24 text-primary/10 animate-pulse">
        <Sparkles className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <div className="absolute bottom-1/4 right-10 md:right-24 text-primary/10 animate-pulse">
        <Code className="w-12 h-12 md:w-16 md:h-16" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left */}
        <div className="lg:col-span-8 text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 t-surface border t-bdr text-primary font-mono text-xs font-semibold tracking-widest rounded-full uppercase">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
              CSE Student &amp; Full-Stack Developer
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
            <h1 className="font-display text-5xl sm:text-7xl md:text-[90px] leading-[0.85] font-black tracking-tighter uppercase t-txt mb-4">
              Hi, I'm <br />
              <span className="text-primary">Saurabh</span> <br />
              <span>Shekhar.</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center min-h-[40px] mb-6">
            <span className="font-mono text-xl sm:text-2xl font-bold t-txt80 uppercase tracking-widest typing-cursor">
              {typedText}
            </span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="t-txt60 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-sans">
            Building full-stack web apps, algorithm visualizers, and AI/ML tools from end to end. 2nd year CSE (Data Science) student at NSUT Delhi — learning through shipping.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer t-btn-inv transition-all duration-250">
              View My Work
              <ArrowDown className="w-4 h-4" />
            </a>
            <a href="#contact" className="px-8 py-4 border t-bdr2 t-txt rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer t-btn-inv transition-all duration-250">
              Get In Touch
              <Send className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right: Stats card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-4 hidden lg:block">
          <div className="border t-bdr rounded-2xl t-card p-8 space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-primary to-transparent" />
            <div className="absolute bottom-0 left-0 h-32 w-[1px] bg-gradient-to-t from-primary to-transparent" />
            <div className="font-mono text-[11px] text-primary tracking-widest uppercase pb-4 border-b t-bdr flex justify-between items-center">
              <span>// STUDENT_STATS</span>
              <span className="text-[9px] t-txt40">NSUT.28</span>
            </div>
            <div className="space-y-8">
              <div>
                <div className="text-5xl font-black tracking-tighter t-txt mb-1">12+ <span className="text-lg font-bold opacity-30">PROJECTS</span></div>
                <div className="text-[10px] uppercase tracking-widest t-txt40 font-bold">Full-Stack &amp; Deployed</div>
              </div>
              <div>
                <div className="text-5xl font-black tracking-tighter t-txt mb-1">157+ <span className="text-lg font-bold opacity-30">DSA</span></div>
                <div className="text-[10px] uppercase tracking-widest t-txt40 font-bold">Problems Solved</div>
              </div>
              <div>
                <div className="text-5xl font-black tracking-tighter t-txt mb-1">22+ <span className="text-lg font-bold opacity-30 text-primary">REPOS</span></div>
                <div className="text-[10px] uppercase tracking-widest t-txt40 font-bold">On GitHub</div>
              </div>
            </div>
            <div className="pt-4 border-t t-bdr flex items-center justify-between text-[9px] font-mono t-txt40">
              <span>STATUS: BUILDING</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                NSUT'28
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-[9px] font-bold font-sans uppercase tracking-widest t-txt40">Scroll Down</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
    </section>
  );
}
