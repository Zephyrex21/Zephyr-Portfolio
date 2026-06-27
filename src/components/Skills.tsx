import { Laptop, Server, BookOpen, Wrench, Star } from "lucide-react";
import { motion } from "motion/react";

export default function Skills() {
  const cats = [
    {
      id: "frontend", title: "Frontend", tag: "REACT / JS / CSS",
      desc: "Building responsive, animated UIs with React, Tailwind, and modern CSS.",
      icon: <Laptop className="w-5 h-5 text-primary group-hover:text-on-primary transition-colors" />,
      skills: [
        { name: "React.js", level: "Proficient", pct: 85 },
        { name: "JavaScript (ES6+)", level: "Proficient", pct: 82 },
        { name: "HTML5 / CSS3", level: "Proficient", pct: 90 },
        { name: "Tailwind CSS", level: "Proficient", pct: 85 },
      ],
    },
    {
      id: "backend", title: "Backend & APIs", tag: "NODE / PYTHON / FASTAPI",
      desc: "Designing REST APIs with Node/Express, and ML-serving pipelines with FastAPI.",
      icon: <Server className="w-5 h-5 text-primary group-hover:text-on-primary transition-colors" />,
      skills: [
        { name: "Node.js / Express.js", level: "Intermediate", pct: 72 },
        { name: "Python / FastAPI", level: "Intermediate", pct: 75 },
        { name: "MongoDB / Supabase", level: "Intermediate", pct: 70 },
        { name: "C++", level: "Intermediate", pct: 68 },
      ],
    },
    {
      id: "cs", title: "CS Fundamentals", tag: "DSA / TAFL / OS / DBMS",
      desc: "Strong grounding in data structures, automata theory, OS internals, and DBMS.",
      icon: <BookOpen className="w-5 h-5 text-primary group-hover:text-on-primary transition-colors" />,
      skills: [
        { name: "Data Structures & Algorithms", level: "Intermediate", pct: 75 },
        { name: "Theory of Automata (TAFL)", level: "Intermediate", pct: 78 },
        { name: "Operating Systems", level: "Intermediate", pct: 68 },
        { name: "DBMS Concepts", level: "Intermediate", pct: 65 },
      ],
    },
    {
      id: "tools", title: "Tools & DevOps", tag: "GIT / VERCEL / NETLIFY",
      desc: "Version control with Git/GitHub, CI-free deploys via Netlify and Vercel.",
      icon: <Wrench className="w-5 h-5 text-primary group-hover:text-on-primary transition-colors" />,
      skills: [
        { name: "Git / GitHub", level: "Proficient", pct: 85 },
        { name: "Netlify / Vercel", level: "Proficient", pct: 88 },
        { name: "Postman / REST Testing", level: "Intermediate", pct: 70 },
        { name: "VS Code / Dev Tools", level: "Proficient", pct: 87 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 md:py-32 t-bg border-b t-bdr5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-left mb-16 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">// TECHNICAL_ARSENAL</span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase t-txt">Full-Stack Capabilities</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cats.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl border t-bdr hover:border-primary hover:scale-[1.01] transition-all duration-300 t-card flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 t-surface border t-bdr rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight t-txt">{cat.title}</h3>
                    <span className="text-[9px] font-mono text-primary/80 tracking-wider">{cat.tag}</span>
                  </div>
                </div>
                <p className="t-txt60 text-sm font-light mb-8 leading-relaxed font-sans mt-3">{cat.desc}</p>
                <div className="space-y-5">
                  {cat.skills.map((skill, si) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold t-txt80 font-sans">{skill.name}</span>
                        <span className="font-mono text-[10px] text-primary/95 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-primary/10 text-primary" />{skill.level}
                        </span>
                      </div>
                      <div className="w-full h-1 t-surface rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.pct}%` }} viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + si * 0.05 }} className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t t-bdr flex items-center justify-between text-[10px] font-mono uppercase tracking-widest t-txt40">
                <span>Active Stack</span>
                <span className="font-bold text-primary">Node</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
