import { Sparkles } from "lucide-react";

export default function TechMarquee() {
  const techs = ["REACT", "NODE.JS", "PYTHON", "TAILWIND", "EXPRESS", "C++", "FASTAPI", "MONGODB", "SUPABASE", "DSA", "GIT", "VERCEL"];
  const full = [...techs, ...techs];
  return (
    <div className="py-14 t-bg2 overflow-hidden whitespace-nowrap relative border-y t-bdr5">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--t-bg2)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--t-bg2)] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee inline-flex items-center gap-16 md:gap-24">
        {full.map((tech, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-8 select-none">
            <span className="text-3xl md:text-5xl font-black t-txt20 font-display hover:text-primary transition-colors duration-300 tracking-tighter uppercase">
              {tech}
            </span>
            <Sparkles className="w-5 h-5 text-primary/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
