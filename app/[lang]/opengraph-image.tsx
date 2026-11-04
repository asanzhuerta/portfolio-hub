import { profile } from "@/content/profile";
import { isLocale, locales } from "@/lib/i18n";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.title.en}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: segment } = await params;
  const lang = isLocale(segment) ? segment : "es";
  const beyond = lang === "en" ? "Music · Events" : "Música · Eventos";
  return ogImage({
    kicker: profile.title[lang],
    title: profile.name,
    subtitle: profile.focus[lang].join(" · "),
    footer: `Software · ${beyond}`,
  });
}
