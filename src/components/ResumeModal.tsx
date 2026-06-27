import { useState } from "react";
import { X, Printer, Copy, Check, GraduationCap, Award, Code } from "lucide-react";
import { motion } from "motion/react";

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const plainText = `SAURABH RAJ SHEKHAR
Full-Stack Developer & CSE (Data Science) Student
Email: shekharsaurabhraj@gmail.com | GitHub: github.com/Zephyrex21
New Delhi, India | LeetCode: leetcode.com/u/Zephyrex_21

SUMMARY
2nd year B.Tech CSE (Data Science) student at NSUT Delhi (2028). Full-stack developer
building end-to-end web apps, algorithm visualizers, and AI/ML tools with Python and React.
157+ DSA problems solved across LeetCode (62) and Code360 (95).

EDUCATION
B.Tech CSE (Data Science) — NSUT Delhi | 2024–2028
Higher Secondary — Kendriya Vidyalaya Gole Market, Delhi | 2023

PROJECTS
1. Urban Heat Mitigation — Python, FastAPI, XGBoost, SHAP, React, Deck.gl, MapLibre
   AI full-stack app covering 20 Indian cities with interactive heat maps and scenario builder.
   Live: urban-heat-mitigation-mu.vercel.app | GitHub: Zephyrex21/urban-heat-mitigation

2. Cryptex (Full-Stack) — Node.js, Express.js, MongoDB, Supabase
   Token-based secure file sharing — REST API backend + vanilla JS frontend.
   Live: cryptex-file-sharing.onrender.com | GitHub: Zephyrex21/Cryptex_File_Sharing

3. Automata Lab — React.js, Tailwind CSS, JavaScript
   Interactive NFA→DFA converter with step-by-step subset construction.
   Live: automata-lab.netlify.app | GitHub: Zephyrex21/Automata-Visualizer

4. Red Blackify — React.js, Tailwind CSS
   Interactive RBT & AVL Tree visualizer with animations and pseudocode.
   Live: rbt-visualizer.netlify.app

5. CFG Studio — React.js, Tailwind CSS
   Context-Free Grammar tool with derivation visualization and parse trees.
   Live: cfgstudio.netlify.app

TECHNICAL SKILLS
Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, Python, FastAPI, C++
Databases: MongoDB, Supabase Storage
CS Theory: Theory of Automata, DSA, OS, DBMS
Tools: Git, GitHub, Netlify, Vercel, Postman

CODING PROFILES
LeetCode: 62 problems (38E/21M/3H) | leetcode.com/u/Zephyrex_21
Code360: 95 problems (70E/21M/4H) | Max streak: 41 days

CERTIFICATIONS
- Designing Blockchain Solutions using Amazon Managed Blockchain, AWS (Nov 2025)
- Fundamentals of Machine Learning and Artificial Intelligence, AWS (Nov 2025)
- Soft Skills and Personality Development, NPTEL Swayam (Aug–Nov 2025)`;

  const handleCopy = () => { navigator.clipboard.writeText(plainText); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const projects = [
    { name: "Urban Heat Mitigation", stack: "Python · FastAPI · XGBoost · SHAP · React · Deck.gl", desc: "AI full-stack app — heat island analysis + scenario builder for 20 Indian cities.", url: "urban-heat-mitigation-mu.vercel.app" },
    { name: "Cryptex", stack: "Node.js · Express · MongoDB · Supabase", desc: "Secure token-based file sharing REST API + frontend. No accounts required.", url: "cryptex-file-sharing.onrender.com" },
    { name: "Automata Lab", stack: "React.js · Tailwind CSS · JavaScript", desc: "Interactive NFA→DFA visual converter with subset construction & DFA minimization.", url: "automata-lab.netlify.app" },
    { name: "Red Blackify", stack: "React.js · Tailwind CSS", desc: "Interactive Red-Black Tree & AVL Tree visualizer with animations and pseudocode.", url: "rbt-visualizer.netlify.app" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="t-card w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border t-bdr"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b t-bdr flex justify-between items-center t-bg">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-black uppercase t-txt tracking-tight">Curriculum Vitae</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy}
              className="px-4 py-2 t-card border t-bdr2 t-txt rounded-full text-[10px] font-mono uppercase tracking-widest t-btn-inv transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Text"}
            </button>
            <button onClick={() => window.print()}
              className="px-4 py-2 t-card border t-bdr2 t-txt rounded-full text-[10px] font-mono uppercase tracking-widest t-btn-inv transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />PDF
            </button>
            <div className="w-px h-6 t-surface mx-1" />
            <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-full t-txt60 hover:text-primary transition-all cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12 overflow-y-auto flex-1 font-sans space-y-8 t-card">
          {/* Header block */}
          <div className="border-b-2 border-primary pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-black tracking-tighter uppercase t-txt">SAURABH RAJ SHEKHAR</h1>
              <p className="text-primary font-mono text-xs tracking-widest uppercase mt-1">Full-Stack Developer · CSE (Data Science) Student · AI/ML Enthusiast</p>
            </div>
            <div className="text-xs t-txt60 space-y-1 md:text-right font-medium font-mono uppercase tracking-wide">
              <p>shekharsaurabhraj@gmail.com</p>
              <p>github.com/Zephyrex21</p>
              <p>New Delhi, India</p>
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">// ABOUT</h4>
            <p className="text-sm t-txt60 leading-relaxed font-light">
              2nd year B.Tech CSE (Data Science) at NSUT Delhi (Class of 2028). Full-stack developer building end-to-end apps — from Node/Express REST APIs and Python/FastAPI ML backends to interactive React frontends. 157+ DSA problems solved, 18+ GitHub repositories, 7+ deployed projects.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">// EDUCATION</h4>
            {[
              { deg: "B.Tech CSE (Data Science) — NSUT Delhi", sub: "Netaji Subhas University of Technology, New Delhi", year: "2024–2028" },
              { deg: "Higher Secondary — Kendriya Vidyalaya Gole Market", sub: "Mathematics & Science stream, New Delhi", year: "2023" },
            ].map((e) => (
              <div key={e.deg} className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <div className="font-bold t-txt text-sm flex items-center gap-1.5 font-display uppercase tracking-tight">
                    <GraduationCap className="w-4 h-4 text-primary shrink-0" />{e.deg}
                  </div>
                  <p className="text-xs t-txt50 ml-6 mt-1 font-light">{e.sub}</p>
                </div>
                <span className="text-[10px] font-mono border border-primary/20 bg-primary/5 text-primary px-2 py-0.5 rounded uppercase">{e.year}</span>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-5">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">// KEY_PROJECTS</h4>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.name} className="flex items-start gap-3">
                  <div className="p-1 bg-primary/10 border border-primary/20 text-primary rounded shrink-0 mt-0.5">
                    <Code className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold t-txt text-sm font-display uppercase tracking-tight">{p.name}</div>
                    <div className="text-[10px] font-mono text-primary/80 mt-0.5 uppercase tracking-wide">{p.stack}</div>
                    <p className="text-xs t-txt60 mt-1 font-light leading-relaxed">{p.desc}</p>
                    <p className="text-[10px] font-mono t-txt40 mt-0.5">🔗 {p.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">// TECHNICAL_SKILLS</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed t-txt60">
              {[
                { label: "FRONTEND", val: "React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS" },
                { label: "BACKEND / LANGUAGES", val: "Python, C++, Node.js, Express.js, FastAPI" },
                { label: "DATABASES", val: "MongoDB, Supabase Storage" },
                { label: "CS THEORY", val: "Theory of Automata, DSA, OS, DBMS" },
                { label: "TOOLS", val: "Git, GitHub, Netlify, Vercel, Postman" },
              ].map((sk) => (
                <div key={sk.label}>
                  <span className="font-mono t-txt font-bold block mb-1 uppercase tracking-wider text-[10px]">// {sk.label}</span>
                  {sk.val}
                </div>
              ))}
            </div>
          </div>

          {/* DSA */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">// CODING_PROFILES</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs t-txt60">
              <div><span className="font-bold t-txt block mb-1 font-mono uppercase">LeetCode</span>62 problems · 38E / 21M / 3H · Max streak: 29 days</div>
              <div><span className="font-bold t-txt block mb-1 font-mono uppercase">Code360 (Coding Ninjas)</span>95 problems · 70E / 21M / 4H · Max streak: 41 days · 602 submissions</div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">// CERTIFICATIONS</h4>
            <ul className="text-xs t-txt60 space-y-2 font-light">
              <li>→ Designing Blockchain Solutions using Amazon Managed Blockchain, AWS (Nov 2025)</li>
              <li>→ Fundamentals of Machine Learning and Artificial Intelligence, AWS (Nov 2025)</li>
              <li>→ Soft Skills and Personality Development, NPTEL Swayam (Aug–Nov 2025)</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t t-bdr flex justify-end gap-3 t-bg">
          <button onClick={onClose} className="px-6 py-2 border t-bdr2 t-txt rounded-full text-xs uppercase tracking-widest font-bold cursor-pointer t-btn-inv transition-all duration-200">
            Close
          </button>
          <button onClick={() => window.print()} className="px-6 py-2 bg-primary text-on-primary rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 cursor-pointer t-btn-inv transition-all duration-200">
            <Printer className="w-4 h-4" />Print / Save PDF
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
