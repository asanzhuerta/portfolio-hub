import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProject, projects } from "@/content/projects";
import { isLocale, locales } from "@/lib/i18n";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Cover_Maker";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: segment, slug } = await params;
  const lang = isLocale(segment) ? segment : "es";
  const project = getProject(slug) ?? projects[0];
  const svg = await readFile(join(process.cwd(), "public", project.icon));
  return ogImage({
    kicker: lang === "en" ? "Project · Free download" : "Proyecto · Descarga gratuita",
    title: project.name,
    subtitle: project.tagline[lang],
    footer: `${project.platforms[lang].join(" · ")} · ${project.licence}`,
    icon: `data:image/svg+xml;base64,${svg.toString("base64")}`,
  });
}
