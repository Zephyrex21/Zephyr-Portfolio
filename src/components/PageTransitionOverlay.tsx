import { useEffect, useRef } from "react";

// Listens for clicks on <a href="#..."> anchor links and flashes a brief
// semi-transparent overlay (150ms in, 150ms out) before the scroll jump.
// This is done via direct DOM manipulation to avoid any React render overhead
// during the animation — the overlay must respond instantly to feel snappy.
export default function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a[href^='#']");
      if (!anchor) return;
      el.style.opacity = "1";
      setTimeout(() => { el.style.opacity = "0"; }, 150);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] pointer-events-none"
      style={{
        backgroundColor: "var(--t-bg)",
        opacity: 0,
        transition: "opacity 0.15s ease",
      }}
    />
  );
}
