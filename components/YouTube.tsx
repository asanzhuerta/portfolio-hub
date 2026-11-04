"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

/**
 * A YouTube video that only loads YouTube when it is played: until then it is
 * the video's thumbnail and a play button, so the page stays light and no
 * third-party cookies are set by just visiting it.
 */
export function YouTube({ id, title, label, size = "lg" }: { id: string; title: string; label: string; size?: "lg" | "sm" }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-line-strong bg-black shadow-2xl shadow-black/60">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${label}: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span
            className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-black/50 transition-transform duration-500 group-hover:scale-110 ${
              size === "lg" ? "h-16 w-16" : "h-12 w-12"
            }`}
          >
            <Icon name="play" className={size === "lg" ? "h-7 w-7" : "h-5 w-5"} />
          </span>
        </button>
      )}
    </div>
  );
}
