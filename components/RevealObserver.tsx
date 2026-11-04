"use client";

import { useEffect } from "react";

/**
 * Toggles `data-shown` on every `[data-reveal]` element as it enters or leaves the
 * viewport, including elements added later by client navigation. `data-side` says
 * where a hidden element went, so it leaves upwards and comes back from below.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Set here rather than in the server HTML: React owns <html>'s class and would
    // undo it during hydration.
    document.documentElement.dataset.motion = "on";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          el.toggleAttribute("data-shown", entry.isIntersecting);
          if (!entry.isIntersecting) el.dataset.side = entry.boundingClientRect.top < 0 ? "above" : "below";
        }
      },
      { rootMargin: "-6% 0px -10% 0px", threshold: 0.15 },
    );

    const observeAll = () => document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      delete document.documentElement.dataset.motion;
    };
  }, []);

  return null;
}
