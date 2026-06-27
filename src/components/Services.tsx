import { Layers, Server, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function Services() {
  const services = [
    {
      id: "fullstack",
      name: "Full-Stack Engineering",
      desc: "End-to-end web apps with React frontends, Node/Express APIs, and MongoDB/Supabase data layers. From database schema to deployed UI — fully integrated.",
      icon: <Server className="w-6 h-6 text-primary group-hover:text-on-primary transition-colors" />,
      tag: "MERN / SUPABASE",
    },
    {
      id: "visualizers",
      name: "Algorithm Visualization",
      desc: "Turning abstract CS concepts — automata, self-balancing trees, OS scheduling, constraint solving — into animated, step-by-step interactive tools for learning.",
      icon: <Layers className="w-6 h-6 text-primary group-hover:text-on-primary transition-colors" />,
      tag: "EDUCATIONAL-TOOLS",
    },
    {
      id: "aiml",
      name: "AI/ML Development",
      desc: "Building Python/FastAPI ML backends with XGBoost and SHAP explainability, paired with rich React/geospatial frontends for data-driven, intelligent applications.",
      icon: <Zap className="w-6 h-6 text-primary group-hover:text-on-primary transition-colors" />,
      tag: "PYTHON / FASTAPI",
    },
  ];

  return (
    <section className="py-24 md:py-32 t-bg2 border-b t-bdr5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-left mb-16 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">// WHAT_I_BUILD</span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase t-txt">Focus Areas</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.a key={s.id} href="#projects"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 md:p-10 rounded-2xl border t-bdr hover:border-primary transition-all duration-300 t-card flex flex-col justify-between group cursor-pointer relative overflow-hidden shadow-sm"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 t-surface border t-bdr rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    {s.icon}
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-primary bg-primary/5 px-2.5 py-1 border border-primary/10 rounded">{s.tag}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-black tracking-tight uppercase t-txt mb-4 group-hover:text-primary transition-colors duration-200">{s.name}</h3>
                <p className="t-txt60 text-sm md:text-base font-light leading-relaxed font-sans mb-8">{s.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest group-hover:translate-x-1.5 transition-transform duration-300 mt-4">
                <span>See Projects</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
