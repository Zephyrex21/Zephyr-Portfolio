export default function TechMarquee() {
  const techs = [
    { name: "React 18",     icon: "⚛" },
    { name: "Node.js",      icon: "🟢" },
    { name: "Python",       icon: "🐍" },
    { name: "TypeScript",   icon: "TS" },
    { name: "Express",      icon: "⚡" },
    { name: "FastAPI",      icon: "🚀" },
    { name: "MongoDB",      icon: "🍃" },
    { name: "Supabase",     icon: "⚡" },
    { name: "Tailwind CSS", icon: "💨" },
    { name: "GitHub OAuth", icon: "🔐" },
    { name: "TanStack",     icon: "🔄" },
    { name: "Deck.gl",      icon: "🗺" },
    { name: "C++",          icon: "⚙" },
    { name: "Git",          icon: "🔀" },
    { name: "Vercel",       icon: "▲" },
    { name: "Netlify",      icon: "◆" },
  ];

  return (
    <div className="py-14 t-bg2 border-y t-bdr5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">// TECH_STACK</span>
          <span className="text-[10px] font-mono t-txt40 uppercase tracking-wider">{techs.length} technologies</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border t-bdr t-surface hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-default"
            >
              <span className="text-[11px] leading-none select-none">{tech.icon}</span>
              <span className="text-[11px] font-mono font-bold t-txt60 group-hover:text-primary transition-colors duration-200 uppercase tracking-wide whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
