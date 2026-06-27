import { Linkedin, Github, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full py-16 md:py-24 t-bg border-t t-bdr">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-4 space-y-6">
            <div className="font-display text-2xl font-black tracking-tighter uppercase t-txt">
              ZEPHYREX<span className="text-primary">.21</span>
            </div>
            <p className="t-txt60 text-sm font-sans font-light leading-relaxed max-w-sm">
              CSE (Data Science) undergrad at NSUT Delhi '28. Building full-stack apps, algorithm visualizers, and AI/ML experiments — end to end, from backend to deployed UI.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/saurabh-raj-shekhar-8a92b73b0/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 border t-bdr hover:border-primary hover:bg-primary/10 rounded-full flex items-center justify-center t-txt hover:text-primary transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/Zephyrex21" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 border t-bdr hover:border-primary hover:bg-primary/10 rounded-full flex items-center justify-center t-txt hover:text-primary transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              {/* LeetCode */}
              <a href="https://leetcode.com/u/Zephyrex_21/" target="_blank" rel="noopener noreferrer" title="LeetCode"
                className="w-10 h-10 border t-bdr hover:border-primary hover:bg-primary/10 rounded-full flex items-center justify-center t-txt hover:text-primary transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <h5 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">// NAVIGATE</h5>
            <ul className="space-y-4 text-sm font-sans font-medium t-txt60">
              {["home","about","skills","projects","contact"].map((s) => (
                <li key={s}><a href={`#${s}`} className="hover:text-primary transition-colors capitalize">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Profiles */}
          <div className="md:col-span-2">
            <h5 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">// PROFILES</h5>
            <ul className="space-y-4 text-sm font-sans font-medium t-txt60">
              <li><a href="https://github.com/Zephyrex21" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="https://leetcode.com/u/Zephyrex_21/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LeetCode</a></li>
              <li><a href="https://www.naukri.com/code360/profile/6400d92c-a88f-4fdc-a831-7013a7da700e" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Code360</a></li>
              <li><a href="https://www.linkedin.com/in/saurabh-raj-shekhar-8a92b73b0/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>

          {/* Quote + scroll to top */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between">
            <div className="space-y-3 text-left md:text-right">
              <p className="t-txt50 text-sm font-sans italic font-light max-w-xs leading-relaxed">
                "First, solve the problem. Then, write the code."
              </p>
              <p className="text-xs font-mono text-primary uppercase tracking-wider">— John Johnson</p>
            </div>
            <button onClick={scrollToTop}
              className="mt-8 md:mt-0 px-5 py-3 t-card border t-bdr hover:border-primary text-primary hover:bg-primary/5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 font-bold text-[10px] font-mono uppercase tracking-widest"
            >
              Back To Top
              <ArrowUp className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t t-bdr flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono t-txt40 font-medium">
          <div>&copy; {new Date().getFullYear()} Saurabh Raj Shekhar. All rights reserved.</div>
          <div className="text-primary font-bold tracking-wider">NSUT CSE (DS) '28 · NEW DELHI</div>
        </div>
      </div>
    </footer>
  );
}
