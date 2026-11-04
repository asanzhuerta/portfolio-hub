"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type LightboxImage = { src: string; alt: string; width: number; height: number; caption: string };

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * A grid of screenshots that open full screen: the picture grows out of its
 * thumbnail (FLIP), arrows and swipes move between them, Esc or a click closes.
 */
export function Lightbox({ images, labels }: { images: LightboxImage[]; labels: { open: string; close: string; prev: string; next: string } }) {
  const [open, setOpen] = useState<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const picture = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const touchX = useRef<number | null>(null);

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Transform that puts the full-screen picture exactly over thumbnail `i`.
  const fromThumb = (i: number) => {
    const thumb = thumbs.current[i]?.getBoundingClientRect();
    const full = picture.current?.getBoundingClientRect();
    if (!thumb || !full || full.width === 0) return "scale(0.92)";
    const scale = thumb.width / full.width;
    const dx = thumb.left + thumb.width / 2 - (full.left + full.width / 2);
    const dy = thumb.top + thumb.height / 2 - (full.top + full.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${scale})`;
  };

  const close = useCallback(() => {
    if (open === null || closing.current) return;
    closing.current = true;
    const done = () => {
      closing.current = false;
      setOpen(null);
    };
    if (reduce() || !picture.current || !stage.current) return done();
    picture.current.animate([{ transform: "none" }, { transform: fromThumb(open) }], { duration: 380, easing: EASE });
    stage.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: EASE }).finished.then(done);
  }, [open]);

  const go = useCallback(
    (step: number) => setOpen((i) => (i === null ? i : (i + step + images.length) % images.length)),
    [images.length],
  );

  // Grow out of the thumbnail when opening.
  useEffect(() => {
    if (open === null || reduce() || !picture.current || !stage.current) return;
    stage.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: EASE });
    picture.current.animate([{ transform: fromThumb(open) }, { transform: "none" }], { duration: 520, easing: EASE });
    // Only on open, not when moving between images.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const current = open === null ? null : images[open];

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {images.map((image, i) => (
          <figure
            key={image.src}
            data-reveal
            style={{ "--i": i % 2 } as React.CSSProperties}
            className={`flex flex-col gap-3 ${i === 0 ? "md:col-span-2" : ""}`}
          >
            <button
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${labels.open}: ${image.alt}`}
              className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-line-strong bg-black/40 shadow-2xl shadow-black/60 transition-colors hover:border-accent/60"
              style={{ visibility: open === i ? "hidden" : undefined }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={i === 0 ? "(min-width: 1152px) 1088px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
              />
              <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-foreground/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                ⤢
              </span>
            </button>
            <figcaption className="font-mono text-xs text-faint">{image.caption}</figcaption>
          </figure>
        ))}
      </div>

      {current && (
        <div
          ref={stage}
          role="dialog"
          data-native-scroll
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/85 p-4 backdrop-blur-xl sm:p-10"
          onClick={close}
          onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchX.current === null) return;
            const dx = event.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div
            ref={picture}
            className="relative w-full max-w-[min(100%,calc((100svh-9rem)*var(--ratio)))] overflow-hidden rounded-2xl border border-line-strong shadow-2xl shadow-black/70"
            style={{ "--ratio": current.width / current.height } as React.CSSProperties}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              quality={90}
              priority
              className="h-auto w-full"
            />
          </div>
          <div className="flex w-full max-w-3xl items-center justify-between gap-4" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:text-foreground">
              ←
            </button>
            <p className="text-center font-mono text-xs text-muted">
              {current.caption}
              <span className="ml-3 text-faint">
                {open! + 1}/{images.length}
              </span>
            </p>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:text-foreground">
              →
            </button>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-background/60 text-lg text-muted transition-colors hover:text-foreground"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
