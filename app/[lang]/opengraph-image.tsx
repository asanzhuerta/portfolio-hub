import { profile } from "@/content/profile";
import { isLocale, locales } from "@/lib/i18n";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.title}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const beyond = isLocale(lang) && lang === "en" ? "Music · Events" : "Música · Eventos";
  return ogImage({
    kicker: profile.title,
    title: profile.name,
    subtitle: profile.focus.join(" · "),
    footer: `Software · ${beyond}`,
  });
}
