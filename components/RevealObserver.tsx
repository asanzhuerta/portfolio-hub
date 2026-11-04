"use client";

import { useEffect } from "react";

/** Longest wait for an element's images before revealing it anyway. */
const IMAGE_TIMEOUT = 2500;

/** Resolves once every image inside `el` (or `el` itself) has loaded or failed. */
function imagesReady(el: Element): Promise<void> {
  const images = el instanceof HTMLImageElement ? [el] : [...el.querySelectorAll("img")];
  const pending = images.filter((img) => !img.complete);
  if (pending.length === 0) return Promise.resolve();
  const loads = pending.map(
    (img) =>
      new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      }),
  );
  return Promise.race([Promise.all(loads).then(() => {}), new Promise<void>((r) => setTimeout(r, IMAGE_TIMEOUT))]);
}

/**
 * Toggles `data-shown` on every `[data-reveal]` element as it enters or leaves the
 * viewport, including elements added later by client navigation. CSS keeps them
 * hidden from the first paint; an element is only shown once its images (and the
 * fonts) are ready, so a slow photo never pops in after its animation has played.
 * `data-side` says where a hidden element went, so it leaves upwards and comes
 * back from below.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const visible = new WeakSet<Element>();
    const fonts = document.fonts?.ready ?? Promise.resolve();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visible.add(el);
            Promise.all([fonts, imagesReady(el)]).then(() => {
              // Still on screen? Then play it (two frames so the hidden state is painted first).
              if (!visible.has(el)) return;
              requestAnimationFrame(() => requestAnimationFrame(() => el.setAttribute("data-shown", "")));
            });
          } else {
            visible.delete(el);
            el.removeAttribute("data-shown");
            el.dataset.side = entry.boundingClientRect.top < 0 ? "above" : "below";
          }
        }
      },
      { rootMargin: "-6% 0px -10% 0px", threshold: 0.15 },
    );

    const observed = new WeakSet<Element>();
    const observeAll = () =>
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
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
