"use client";

import { useEffect } from "react";

/**
 * Turns the coarse steps of a mouse wheel into a continuous glide: each notch moves
 * a target, and the page eases towards it every frame. Trackpads already send fine
 * deltas and glide the same way; touch, keyboard and the scrollbar stay native.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let frame = 0;
    let last = 0;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 1 / 60);
      last = now;
      // Exponential ease, frame-rate independent.
      current += (target - current) * (1 - Math.exp(-dt * 9));
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        frame = 0;
        return;
      }
      window.scrollTo(0, current);
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      // Leave inner scrollable areas alone.
      const el = event.target instanceof Element ? event.target.closest("[data-native-scroll]") : null;
      if (el) return;

      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      if (!frame) current = target = window.scrollY;
      target = Math.max(0, Math.min(maxScroll(), target + event.deltaY * unit));
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    // Anything else that scrolls the page (scrollbar, keys, anchors) resets the glide.
    const onScroll = () => {
      if (!frame) current = target = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
