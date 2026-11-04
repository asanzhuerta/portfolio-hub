"use client";

import { useEffect } from "react";

/**
 * Toggles `data-shown` on every `[data-reveal]` element as it enters or leaves the
 * viewport, including elements added later by client navigation.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-shown", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const observeAll = () => document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
