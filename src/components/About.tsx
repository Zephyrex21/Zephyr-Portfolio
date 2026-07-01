import { useEffect, useState, useRef } from "react";
import { GraduationCap, CheckCircle2, User } from "lucide-react";
import { motion, useInView } from "motion/react";

function Counter({ target, duration = 1.8, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / (duration * 1000);
      // Cubic ease-out: starts fast, decelerates as it approaches target
      const eased = 1 - Math.pow(1 - Math.min(elapsed, 1), 3);
      setCount(Math.floor(eased * target));
      if (elapsed < 1) requestAnimationFrame(animate); else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);
  return <div ref={ref} className="font-display text-4xl md:text-5xl font-black tracking-tighter text-primary">{count}{suffix}</div>;
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 t-bg2 border-y t-bdr5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image column */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="relative w-full max-w-sm md:max-w-md">
              <div className="aspect-square rounded-2xl overflow-hidden t-bg border t-bdr p-3 shadow-2xl">
                <motion.img
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.02] transition-transform duration-500 ease-out cursor-pointer"
                  src="/photo.jpg"
                  alt="Saurabh Raj Shekhar"
                  referrerPolicy="no-referrer"
                  initial={{ filter: "grayscale(100%)" }}
                  whileInView={{ filter: "grayscale(0%)" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                />
              </div>
              {/* Name badge — top left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -top-5 -left-4 md:-left-6 t-card border t-bdr p-4 md:p-5 rounded-xl shadow-2xl flex items-center gap-3 hover:border-primary transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-primary font-display text-base md:text-lg font-black leading-none">SAURABH</div>
                  <div className="t-txt40 font-mono text-[9px] uppercase tracking-widest mt-1">Raj Shekhar</div>
                </div>
              </motion.div>

              {/* College badge — bottom right */}
              <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-4 md:-right-6 t-card border t-bdr p-5 md:p-6 rounded-xl shadow-2xl flex items-center gap-4 hover:border-primary transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-primary font-display text-xl md:text-2xl font-black leading-none">NSUT</div>
                  <div className="t-txt40 font-mono text-[9px] uppercase tracking-widest mt-1">CSE (DS) '28</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">// MY_STORY</span>
              <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase t-txt mb-6 leading-none">
                Full-Stack by <span className="text-primary">Choice</span>
              </h2>
              <p className="t-txt60 text-base md:text-lg mb-8 leading-relaxed font-sans font-light">
                2nd year B.Tech CSE (Data Science) student at NSUT Delhi. I build full-stack — from React frontends and Express/Node backends to Python/FastAPI ML pipelines and MongoDB/Supabase data layers. I love turning abstract CS concepts into interactive visual tools anyone can explore. Learning through shipping, one project at a time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {["Full-Stack Web Apps", "Algorithm Visualizers", "AI/ML Experiments", "Consistent DSA Practice"].map((item) => (
                  <div key={item} className="flex items-center gap-3 t-txt80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-bold text-[10px] font-mono uppercase tracking-widest">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t t-bdr">
                <div className="text-center md:text-left"><Counter target={12} suffix="+" /><div className="t-txt40 text-[10px] font-mono uppercase tracking-widest mt-1.5">Projects Shipped</div></div>
                <div className="text-center md:text-left"><Counter target={157} suffix="+" /><div className="t-txt40 text-[10px] font-mono uppercase tracking-widest mt-1.5">DSA Problems</div></div>
                <div className="text-center md:text-left"><Counter target={22} suffix="+" /><div className="t-txt40 text-[10px] font-mono uppercase tracking-widest mt-1.5">GitHub Repos</div></div>
              </div>

              {/* Certifications */}
              <div className="mt-10 pt-8 border-t t-bdr">
                <span className="text-xs font-mono uppercase tracking-widest text-primary mb-5 block">// CERTIFICATIONS</span>
                <div className="space-y-3">
                  {[
                    { title: "Designing Blockchain Solutions — Amazon Managed Blockchain", org: "AWS", year: "Nov 2025" },
                    { title: "Fundamentals of Machine Learning & Artificial Intelligence",  org: "AWS", year: "Nov 2025" },
                    { title: "Soft Skills and Personality Development",                     org: "NPTEL Swayam", year: "Aug–Nov 2025" },
                  ].map((c) => (
                    <div key={c.title} className="flex items-start gap-3 p-3 rounded-lg t-surface border t-bdr5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold t-txt80 leading-snug">{c.title}</p>
                        <p className="text-[10px] font-mono t-txt40 uppercase tracking-wider mt-0.5">{c.org} · {c.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
