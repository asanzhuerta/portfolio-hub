import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DownloadButton } from "@/components/DownloadButton";
import { Icon } from "@/components/Icon";
import { Lightbox } from "@/components/Lightbox";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonSecondary, panel } from "@/components/styles";
import { getProject, projects, type Screenshot } from "@/content/projects";
import { href, isLocale, locales } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const project = getProject(slug);
  if (!project) return {};
  const path = `/projects/${slug}`;
  return {
    title: project.name,
    description: project.tagline[lang],
    alternates: {
      canonical: href(lang, path),
      languages: { es: href("es", path), en: href("en", path), "x-default": href("es", path) },
    },
    openGraph: { title: project.name, description: project.tagline[lang], url: href(lang, path) },
  };
}

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

function List({ index, title, items }: { index: string; title: string; items: string[] }) {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeading index={index} title={title} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item} data-reveal style={stagger(i % 4)} className={`${panel} flex gap-3 p-4`}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Gallery({
  index,
  title,
  shots,
  lang,
  labels,
}: {
  index: string;
  title: string;
  shots: Screenshot[];
  lang: "es" | "en";
  labels: { open: string; close: string; prev: string; next: string };
}) {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeading index={index} title={title} />
      <Lightbox
        labels={labels}
        images={shots.map((shot) => ({
          src: shot.src[lang],
          alt: shot.caption[lang],
          caption: shot.caption[lang],
          width: shot.width,
          height: shot.height,
        }))}
      />
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang: segment, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(segment)) notFound();
  const lang = await getLang();
  const t = await getDict();
  const sections = [
    project.screenshots.length > 0 && "screenshots",
    "features",
    "requirements",
  ].filter(Boolean);
  const index = (name: string) => String(sections.indexOf(name) + 1).padStart(2, "0");

  return (
    <article className="flex flex-col gap-24 pb-28 pt-16 sm:pt-24">
      <header className="flex flex-col gap-8">
        <div data-reveal className="flex items-center gap-5">
          <Image
            src={project.icon}
            alt=""
            width={88}
            height={88}
            priority
            unoptimized
            className="h-20 w-20 rounded-3xl shadow-xl shadow-black/50 sm:h-22 sm:w-22"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">{project.name}</h1>
            <p className="font-mono text-xs uppercase tracking-widest text-faint">
              {project.platforms[lang].join(" · ")} · {t.project.licence} {project.licence}
            </p>
          </div>
        </div>
        <p data-reveal style={stagger(1)} className="max-w-2xl text-xl leading-relaxed text-muted">
          {project.tagline[lang]}
        </p>
        <div data-reveal style={stagger(2)} className="flex flex-wrap items-start gap-3">
          <DownloadButton repo={project.repo} />
          <a href={`https://github.com/${project.repo}`} className={buttonSecondary}>
            <Icon name="github" /> {t.project.source}
          </a>
        </div>
      </header>

      <section className="flex max-w-3xl flex-col gap-5 text-lg leading-relaxed">
        {project.description[lang].map((paragraph, i) => (
          <p key={paragraph} data-reveal style={stagger(i)}>
            {paragraph}
          </p>
        ))}
      </section>

      {project.screenshots.length > 0 && (
        <Gallery index={index("screenshots")} title={t.project.screenshots} shots={project.screenshots} lang={lang} labels={t.lightbox} />
      )}
      <List index={index("features")} title={t.project.features} items={project.features[lang]} />
      <List index={index("requirements")} title={t.project.requirements} items={project.requirements[lang]} />

      {project.notice && (
        <p data-reveal className="max-w-3xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">
          {project.notice[lang]}
        </p>
      )}
    </article>
  );
}
