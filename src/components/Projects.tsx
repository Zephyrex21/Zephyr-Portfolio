import React, { useState, useEffect } from "react";
import {
  ArrowUpRight, ExternalLink, Github, BookOpen,
  Target, Shield, Check, X, Sparkles, Terminal,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface ProjectsProps { theme: "dark" | "light"; }

// ── Gradient fallbacks (shown when no screenshot file exists) ──────────────
const FALLBACK_GRADIENTS: Record<string, string> = {
  "forge":         "linear-gradient(135deg, #0d1117 0%, #1a3a6e 50%, #0d1117 100%)",
  "urban-heat":    "linear-gradient(135deg, #003d1f 0%, #00994d 50%, #004d28 100%)",
  "cryptex":       "linear-gradient(135deg, #0d1b2a 0%, #1b3a5c 50%, #0a1628 100%)",
  "automata-lab":  "linear-gradient(135deg, #1a0a2e 0%, #4a1f8c 50%, #2d0f5e 100%)",
};

// ── Theme-aware image component ────────────────────────────────────────────
// Tries  /screenshots/{id}-{theme}.png  first.
// Falls back to gradient card if the file is missing (or still being added).
function ProjectImage({
  project,
  theme,
}: {
  project: Project;
  theme: "dark" | "light";
}) {
  const src = `/screenshots/${project.id}-${theme}.png`;
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  // When theme switches, try the new theme-specific screenshot
  useEffect(() => {
    setFailed(false);
    setCurrentSrc(`/screenshots/${project.id}-${theme}.png`);
  }, [theme, project.id]);

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{
          background:
            FALLBACK_GRADIENTS[project.id] ??
            "linear-gradient(135deg,#111,#333)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 mx-auto">
            <Terminal className="w-8 h-8 text-white/80" />
          </div>
          <h4 className="text-white font-display font-black text-xl uppercase tracking-tight mb-2">
            {project.name}
          </h4>
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-white/15 border border-white/20 text-white/90 text-[10px] font-mono rounded uppercase"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-white/50 text-xs mt-4 font-mono uppercase tracking-wider">
            // Add screenshot: {project.id}-{theme}.png
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      key={currentSrc}               /* key forces remount on src change */
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      src={currentSrc}
      alt={`${project.name} ${theme} preview`}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Projects({ theme }: ProjectsProps) {
  const [filter, setFilter] = useState<string>("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const projects: Project[] = [
    // ── 1. Forge (GitHub Contribution Radar) ──
    {
      id: "forge",
      name: "Forge",
      category: "Full-Stack App",
      tagline: "GitHub Contribution Intelligence Platform.",
      description:
        "Full-stack MERN app that helps developers discover meaningful open-source opportunities. The backend scores every GitHub issue (0–100) against your skill preferences using a multi-axis rules engine. A Kanban-style pipeline lets you track issues from Saved all the way through to Merged PR.",
      imageUrl: "",
      liveUrl:  "https://github-contribution-radar.vercel.app",
      codeUrl:  "https://github.com/Zephyrex21/github-contribution-radar",
      tags: ["React 18", "Vite", "Node.js", "Express", "MongoDB", "GitHub OAuth", "JWT", "TanStack Query", "Recharts", "Tailwind CSS"],
      features: [
        "GitHub OAuth + JWT auth",
        "Issue search with language & label filters",
        "Rules-based skill-match scoring (0–100)",
        "Contribution pipeline (Saved → Merged)",
        "Dashboard with stats & charts",
        "Repository search",
        "Save & annotate issues",
        "User skill preferences",
      ],
      challenges:
        "Building a relevance-scoring system that feels personalised without any ML model — using only GitHub issue metadata and user-declared skill preferences.",
      solutions:
        "Four scoring axes: language match (40 pts), friendly-label detection like 'good first issue' (30 pts), activity recency (20 pts), and low comment count to surface un-crowded issues (10 pts) — capped at 100.",
    },

    // ── 2. Urban Heat Mitigation ──
    {
      id: "urban-heat",
      name: "Urban Heat Mitigation",
      category: "AI/ML Project",
      tagline: "AI-Powered Urban Heat Analysis for 20 Indian Cities.",
      description:
        "Full-stack AI application — FastAPI backend with XGBoost + SHAP for heat island analysis, and a React/Deck.gl frontend for interactive geospatial visualisation. Covers 20 Indian cities with a cooling-intervention scenario builder.",
      imageUrl: "",
      liveUrl:  "https://urban-heat-mitigation-mu.vercel.app/",
      codeUrl:  "https://github.com/Zephyrex21/urban-heat-mitigation",
      tags: ["Python", "FastAPI", "XGBoost", "SHAP", "React", "Deck.gl", "MapLibre", "Recharts"],
      features: [
        "Interactive geospatial heat map",
        "SHAP-based driver analysis",
        "Cooling scenario builder",
        "20 Indian cities covered",
        "Before/after split view",
        "Light / Dark mode",
        "LST vs Air Temp explainer",
        "Documented FastAPI",
      ],
      challenges:
        "Training a single shared model across 20 geographically diverse Indian cities while keeping accuracy fair for each city and not overfitting to any one region.",
      solutions:
        "Leave-cities-out cross-validation — a fair test of generalisation to entirely new cities — alongside XGBoost's built-in regularisation to prevent region-specific overfitting.",
    },

    // ── 3. Cryptex ──
    {
      id: "cryptex",
      name: "Cryptex",
      category: "Full-Stack App",
      tagline: "Secure Token-Based File Sharing Platform.",
      description:
        "MERN-stack full-stack app: Node/Express REST API backend, Supabase Storage for files, MongoDB for metadata, and a vanilla JS/HTML frontend. Users upload files, organise into folders, generate share tokens, and control access — no account required.",
      imageUrl: "",
      liveUrl:  "https://cryptex-file-sharing.onrender.com/",
      codeUrl:  "https://github.com/Zephyrex21/Cryptex_File_Sharing",
      tags: ["Node.js", "Express.js", "MongoDB", "Supabase", "JavaScript", "HTML", "CSS"],
      features: [
        "File upload & download",
        "Folder organisation system",
        "Unique share token per file",
        "Public / private visibility",
        "File preview support",
        "Rename & delete operations",
        "Token-based access — no accounts",
        "Full REST API",
      ],
      challenges:
        "Designing a secure access-control system that allows sharing files without exposing raw database IDs or requiring user authentication.",
      solutions:
        "Opaque-token system — every file/folder gets a unique share token. MongoDB IDs never leave the server; Supabase Service Role Keys remain server-side only.",
    },

    // ── 4. Automata Lab ──
    {
      id: "automata-lab",
      name: "Automata Lab",
      category: "Algorithm Visualizer",
      tagline: "Making Theory of Computation Visual & Intuitive.",
      description:
        "React/JavaScript app that implements NFA→DFA subset construction and DFA minimisation from scratch — all algorithm logic is client-side. Built to make Theory of Automata hands-on for CS students through animation and step-by-step simulation.",
      imageUrl: "",
      liveUrl:  "https://automata-lab.netlify.app/",
      codeUrl:  "https://github.com/Zephyrex21/Automata-Visualizer",
      tags: ["React.js", "Tailwind CSS", "JavaScript", "Netlify"],
      features: [
        "NFA to DFA conversion",
        "Step-by-step subset construction",
        "DFA minimisation algorithm",
        "Interactive state transition diagrams",
        "State simulation / step through",
        "Visual state highlighting",
      ],
      challenges:
        "Rendering complex state transition diagrams — especially with self-loops and bidirectional transitions — readably for larger automata.",
      solutions:
        "Custom graph layout with force-directed positioning and arc-curve interpolation for self-loops, ensuring transitions never overlap state nodes.",
    },
  ];

  const categories = ["All", "Full-Stack App", "AI/ML Project", "Algorithm Visualizer"];
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const codeSnippets: Record<string, string> = {
    forge: `// GET /api/issues/search — fetch & rank GitHub issues by skill match
router.get("/search", authenticate, async (req, res) => {
  const { lang, label, sort = "updated" } = req.query;
  const { preferences } = req.user;

  const issues = await githubService.searchIssues({ lang, label, sort });
  const scored = issues
    .map(issue => ({ ...issue, score: scoreIssue(issue, preferences) }))
    .sort((a, b) => b.score - a.score);

  res.json({ issues: scored, total: scored.length });
});

// Scoring engine — 4 axes → 0–100
function scoreIssue(issue, { languages }) {
  let score = 0;
  if (languages.includes(issue.language))           score += 40;
  const friendly = ["good first issue", "help wanted"];
  issue.labels.filter(l => friendly.includes(l.name.toLowerCase()))
              .forEach(() => score += 10);
  const days = (Date.now() - new Date(issue.updatedAt)) / 86400000;
  score += days < 7 ? 20 : days < 30 ? 10 : days < 90 ? 5 : 0;
  if (issue.comments < 3) score += 10;
  return Math.min(score, 100);
}`,
    "urban-heat": `# FastAPI — heat grid with SHAP driver scores
@app.get("/grid")
async def get_city_grid(city: str = "delhi"):
    df        = load_city_data(city)
    preds     = model.predict(df[FEATURES])
    shap_vals = explainer.shap_values(df[FEATURES])
    df["lst_pred"]   = preds
    df["top_driver"] = pd.Series(shap_vals).apply(
        lambda row: FEATURES[np.argmax(np.abs(row))]
    )
    return df[["lat","lon","lst_pred","top_driver"]].to_dict("records")`,
    cryptex: `// Generate opaque share token & upload to Supabase
const generateToken = () => crypto.randomBytes(16).toString("hex");

router.post("/upload", upload.single("file"), async (req, res) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(\`files/\${Date.now()}_\${req.file.originalname}\`, req.file.buffer);

  if (error) return res.status(500).json({ error: error.message });
  const file = await File.create({
    name:        req.file.originalname,
    storagePath: data.path,
    shareToken:  generateToken(),
    visibility:  "private",
  });
  res.status(201).json(file);
});`,
    "automata-lab": `// NFA → DFA subset construction (core algorithm)
function nfaToDfa(nfa) {
  const startClosure = epsilonClosure(nfa, [nfa.start]);
  const queue = [startClosure];
  const dfa   = { states: new Map(), start: stateKey(startClosure) };

  while (queue.length > 0) {
    const current = queue.shift();
    const key     = stateKey(current);
    dfa.states.set(key, {
      accepting: current.some(s => nfa.accepting.has(s)),
    });
    for (const symbol of nfa.alphabet) {
      const next = epsilonClosure(nfa, move(nfa, current, symbol));
      if (!dfa.states.has(stateKey(next))) queue.push(next);
      dfa.states.get(key)[symbol] = stateKey(next);
    }
  }
  return dfa;
}`,
  };

  return (
    <section id="projects" className="py-24 md:py-32 t-bg border-b t-bdr5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">
              // SELECTED_WORKS
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase t-txt">
              Project Showcase
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0 t-card p-1 border t-bdr rounded-lg self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded text-[10px] font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? "bg-primary text-on-primary shadow-lg font-bold"
                    : "t-txt60 hover:text-primary"
                }`}
              >
                {cat === "All" ? "All" : cat.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Project rows ── */}
        <div className="space-y-24 md:space-y-32">
          {filtered.map((project, idx) => {
            const isImageLeft = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Image card */}
                <div className={`lg:col-span-7 ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
                  <div
                    onClick={() => setSelectedCaseStudy(project)}
                    className="t-card2 border t-bdr rounded-2xl p-4 shadow-2xl relative overflow-hidden group transition-all duration-300 ease-out cursor-pointer hover:border-primary"
                  >
                    <div className="aspect-[16/10] w-full rounded-xl overflow-hidden t-bg relative">
                      <ProjectImage project={project} theme={theme} />
                      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white text-black px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-black shadow-2xl flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <span>Open Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text panel */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded text-[10px] font-mono uppercase tracking-wider mb-5 text-primary max-w-fit">
                    <Sparkles className="w-3.5 h-3.5" />
                    {project.category}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter t-txt mb-2">
                    {project.name}
                  </h3>
                  <p className="text-primary font-mono text-xs uppercase tracking-wider mb-4">
                    // {project.tagline}
                  </p>
                  <p className="t-txt60 text-sm md:text-base font-light mb-8 leading-relaxed font-sans">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 t-surface border t-bdr rounded text-[10px] font-mono uppercase tracking-wide t-txt60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCaseStudy(project)}
                      className="px-6 py-3 t-card border t-bdr2 t-txt rounded-full text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer t-btn-inv transition-all duration-300"
                    >
                      Case Study <BookOpen className="w-4 h-4" />
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary text-on-primary rounded-full text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer t-btn-inv transition-all duration-300"
                    >
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border t-bdr hover:border-primary hover:bg-primary/10 rounded-full flex items-center justify-center t-txt hover:text-primary transition-all duration-300"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedCaseStudy(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="t-card w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border t-bdr"
            >
              {/* Modal header */}
              <div className="p-6 md:p-8 border-b t-bdr flex justify-between items-center t-bg shrink-0">
                <div>
                  <div className="text-primary text-[10px] font-mono uppercase tracking-widest mb-1">
                    // CASE_STUDY
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight t-txt">
                    {selectedCaseStudy.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="p-2 hover:bg-primary/10 rounded-full t-txt60 hover:text-primary transition-all cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1 font-sans">
                {/* Image + overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-6 border-b t-bdr5">
                  <div className="rounded-xl overflow-hidden border t-bdr shadow-2xl t-bg aspect-video">
                    <ProjectImage project={selectedCaseStudy} theme={theme} />
                  </div>
                  <div className="space-y-4">
                    <div className="inline-block px-2.5 py-1 bg-primary/5 text-primary border border-primary/10 text-[10px] font-mono uppercase rounded">
                      {selectedCaseStudy.category}
                    </div>
                    <h4 className="font-display text-xl font-black uppercase tracking-tight t-txt">
                      Project Overview
                    </h4>
                    <p className="text-sm t-txt60 leading-relaxed font-light">
                      {selectedCaseStudy.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {selectedCaseStudy.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 t-surface border t-bdr text-[9px] font-mono uppercase rounded t-txt80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                {selectedCaseStudy.features && (
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-2">
                      // KEY_CAPABILITIES
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedCaseStudy.features.map((feat, fi) => (
                        <div
                          key={fi}
                          className="flex items-start gap-3 p-3 rounded-lg t-surface border t-bdr5"
                        >
                          <div className="p-1 bg-primary/10 border border-primary/20 text-primary rounded shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs t-txt80 leading-relaxed font-light">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenge / Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t t-bdr5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                      <Target className="w-4 h-4" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs t-txt60 leading-relaxed font-light">
                      {selectedCaseStudy.challenges}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                      <Shield className="w-4 h-4" />
                      <span>The Solution</span>
                    </div>
                    <p className="text-xs t-txt60 leading-relaxed font-light">
                      {selectedCaseStudy.solutions}
                    </p>
                  </div>
                </div>

                {/* Code snippet */}
                <div className="space-y-3 pt-6 border-t t-bdr5">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                    <Terminal className="w-4 h-4" />
                    <span>Core Logic</span>
                  </div>
                  <pre className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl text-xs overflow-x-auto font-mono text-primary leading-relaxed whitespace-pre">
                    {codeSnippets[selectedCaseStudy.id]}
                  </pre>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-6 border-t t-bdr flex justify-end gap-3 t-bg shrink-0">
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-6 py-2 border t-bdr2 t-txt rounded-full text-xs font-mono uppercase tracking-widest font-bold cursor-pointer t-btn-inv transition-all duration-200"
                >
                  Close
                </button>
                <a
                  href={selectedCaseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-primary text-on-primary rounded-full text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-1.5 cursor-pointer t-btn-inv transition-all duration-200"
                >
                  Live Site <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
