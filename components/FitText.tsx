"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Keeps its content on one line: when it is wider than its container, the font
 * shrinks just enough to fit. The font size from `className` is the maximum.
 */
export function FitText({ children, className = "", as: Tag = "span" }: { children: React.ReactNode; className?: string; as?: "span" | "div" }) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const fit = () => {
      el.style.fontSize = "";
      const max = parseFloat(getComputedStyle(el).fontSize);
      const available = parent.clientWidth;
      const needed = el.scrollWidth;
      if (needed > available) el.style.fontSize = `${Math.floor(max * (available / needed) * 100) / 100}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`inline-block max-w-none whitespace-nowrap ${className}`}>
      {children}
    </Tag>
  );
}
