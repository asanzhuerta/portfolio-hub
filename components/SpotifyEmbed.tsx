"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

/** Spotify's player, loaded only on request so the page sets no third-party cookies. */
export function SpotifyEmbed({ artist, title, label, note }: { artist: string; title: string; label: string; note: string }) {
  const [loaded, setLoaded] = useState(false);

  return loaded ? (
    <iframe
      src={`https://open.spotify.com/embed/artist/${artist}?utm_source=generator&theme=0`}
      title={title}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="block h-[420px] w-full"
    />
  ) : (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group flex h-[420px] w-full flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgb(30_215_96/0.12),transparent_70%)] p-8 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-xl shadow-black/50 transition-transform duration-500 group-hover:scale-110">
        <Icon name="spotify" className="h-8 w-8" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">{label}</span>
      <span className="max-w-xs text-xs leading-relaxed text-faint">{note}</span>
    </button>
  );
}
