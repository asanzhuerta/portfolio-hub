"use client";

import { useEffect } from "react";

/**
 * Turns the coarse steps of a mouse wheel into a continuous glide: each notch moves
 * a target, and the page eases towards it every frame. Links to a section of the
 * current page glide there too, landing exactly below the sticky header. Trackpads
 * already send fine deltas and glide the same way; touch, keyboard and the
 * scrollbar stay native.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = window.scrollY;
    let current = window.scrollY;
    let frame = 0;
    let last = 0;
    let rate = 9;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 1 / 60);
      last = now;
      // Exponential ease, frame-rate independent.
      current += (target - current) * (1 - Math.exp(-dt * rate));
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo(0, current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const glideTo = (y: number, speed: number) => {
      if (!frame) current = window.scrollY;
      target = Math.max(0, Math.min(maxScroll(), y));
      rate = speed;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      // Leave inner scrollable areas alone.
      const el = event.target instanceof Element ? event.target.closest("[data-native-scroll]") : null;
      if (el) return;

      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      if (!frame) target = window.scrollY;
      glideTo(target + event.deltaY * unit, 9);
    };

    // Where a section's top lands: its layout position (never a transformed child,
    // which would be off while it reveals) minus its scroll-margin for the header.
    const sectionTop = (el: Element) => {
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      return el.getBoundingClientRect().top + window.scrollY - margin;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = event.target instanceof Element ? event.target.closest("a[href*='#']") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!section) return;

      // Handle it before Next.js does, so the jump is ours and lands where it should.
      event.preventDefault();
      event.stopPropagation();
      history.pushState(history.state, "", url.hash);
      if (reduceMotion) {
        stop();
        window.scrollTo(0, sectionTop(section));
      } else {
        glideTo(sectionTop(section), 5);
      }
    };

    // A page loaded or navigated to with a #section: land below the header too,
    // once fonts and images have settled the layout.
    const settleHash = () => {
      const section = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (section) window.scrollTo(0, sectionTop(section));
    };

    // Anything else that scrolls the page (scrollbar, keys, a touch) takes over.
    const onUserScroll = () => {
      if (frame) stop();
    };
    const onScroll = () => {
      if (!frame) current = target = window.scrollY;
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", settleHash);
    if (location.hash) document.fonts.ready.then(() => requestAnimationFrame(settleHash));
    if (!reduceMotion) {
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("touchstart", onUserScroll, { passive: true });
      window.addEventListener("keydown", onUserScroll);
      window.addEventListener("mousedown", onUserScroll);
    }
    return () => {
      stop();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", settleHash);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
      window.removeEventListener("mousedown", onUserScroll);
    };
  }, []);

  return null;
}
