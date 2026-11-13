import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DownloadButton } from "@/components/DownloadButton";
import { Icon } from "@/components/Icon";
import { Lightbox } from "@/components/Lightbox";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonPrimary, buttonSecondary, panel } from "@/components/styles";
import { getProject, projects, type FeatureGroup, type Project, type Screenshot } from "@/content/projects";
import { href, isLocale, locales, type Locale } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";
import { tapeFonts } from "@/lib/tapeFonts";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const project = getProject(slug);
  if (!project) return {};
  const path = `/projects/${slug}`;
  const title = `${project.name} · ${project.tagline[lang]}`;
  return {
    title: project.name,
    description: project.summary[lang],
    alternates: {
      canonical: href(lang, path),
      languages: { es: href("es", path), en: href("en", path), "x-default": href("es", path) },
    },
    openGraph: { title, description: project.summary[lang], url: href(lang, path) },
  };
}

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Features({ index, title, groups, lang }: { index: string; title: string; groups: FeatureGroup[]; lang: Locale }) {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeading index={index} title={title} />
      <div className="grid gap-5 lg:grid-cols-3">
        {groups.map((group, i) => (
          <div key={group.title.en} data-reveal style={stagger(i)} className={`${panel} flex flex-col gap-5 p-6`}>
            <h3 className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight">
              <span className="font-mono text-xs font-normal text-accent">{String(i + 1).padStart(2, "0")}</span>
              {group.title[lang]}
            </h3>
            {group.image && (
              <Image
                src={group.image.src[lang]}
                alt={group.image.alt[lang]}
                width={group.image.width}
                height={group.image.height}
                sizes="(min-width: 1024px) 330px, (min-width: 640px) 460px, 100vw"
                className="h-auto w-full max-w-[460px] rounded-lg border border-line"
              />
            )}
            <ul className="flex flex-col gap-3">
              {group.items[lang].map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

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
  lang: Locale;
  labels: { open: string; close: string; prev: string; next: string };
}) {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeading index={index} title={title} />
      <Lightbox
        labels={labels}
        images={shots.map((shot) => ({
          src: shot.src[lang],
          alt: shot.alt[lang],
          caption: shot.caption[lang],
          width: shot.width,
          height: shot.height,
        }))}
      />
    </section>
  );
}

async function Downloads({ project }: { project: Project }) {
  const t = await getDict();
  const source = (
    <a href={`https://github.com/${project.repo}`} className={buttonSecondary}>
      <Icon name="github" /> {t.project.source}
    </a>
  );
  if (!project.download) {
    return (
      <>
        <DownloadButton repo={project.repo} />
        {source}
      </>
    );
  }
  return (
    <>
      <a href={project.download.installer} className={buttonPrimary}>
        <Icon name="download" /> {t.project.download}
        {project.version && <span className="font-mono text-xs opacity-70">v{project.version}</span>}
      </a>
      <a href={project.download.release} className={buttonSecondary}>
        {t.project.release} <Icon name="arrow" className="h-4 w-4 -rotate-45" />
      </a>
      {source}
    </>
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
    // A project can carry its own look (Cover_Maker: "Tape & Console", see globals.css).
    <article className={`relative flex flex-col gap-24 pb-28 pt-16 sm:pt-24 ${project.theme === "theme-tape" ? `theme-tape ${tapeFonts}` : ""}`}>
      <header className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex flex-col gap-8">
          <div data-reveal className="flex items-center gap-5">
            <Image
              src={project.icon}
              alt={lang === "es" ? `Logo de ${project.name}` : `${project.name} logo`}
              width={88}
              height={88}
              priority
              unoptimized
              className="h-20 w-20 rounded-full shadow-xl shadow-black/50 sm:h-22 sm:w-22"
            />
            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-6xl">{project.name}</h1>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-faint">
                {project.version && (
                  <span className="rounded border border-accent/50 bg-accent/10 px-2 py-0.5 normal-case text-accent">
                    <span className="sr-only">{t.project.version} </span>v{project.version}
                  </span>
                )}
                <span>
                  {project.platforms[lang].join(" · ")} · {t.project.licence} {project.licence}
                </span>
              </p>
            </div>
          </div>
          <div data-reveal style={stagger(1)} className="flex max-w-2xl flex-col gap-3">
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{project.tagline[lang]}</p>
            <p className="text-lg leading-relaxed text-muted">{project.summary[lang]}</p>
          </div>
          <div data-reveal style={stagger(2)} className="flex flex-wrap items-start gap-3">
            <Downloads project={project} />
          </div>
        </div>

        {/* Slot for a vertical video (TikTok / Reel) beside the header, still to be
            decided how it is embedded. To turn it on, uncomment this block and put the
            video or the embed inside the 9:16 frame.
        <div
          data-reveal
          style={stagger(3)}
          className="mx-auto aspect-[9/16] w-full max-w-[18rem] overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-2xl shadow-black/60 lg:mx-0 lg:w-[18rem]"
        >
          <div className="flex h-full items-center justify-center p-6 text-center font-mono text-xs uppercase tracking-widest text-faint">
            {lang === "es" ? "Vídeo próximamente" : "Video coming soon"}
          </div>
        </div>
        */}
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
      <Features index={index("features")} title={t.project.features} groups={project.features} lang={lang} />
      <List index={index("requirements")} title={t.project.requirements} items={project.requirements[lang]} />

      {project.notice && (
        <p data-reveal className="max-w-3xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">
          {project.notice[lang]}
        </p>
      )}
    </article>
  );
}
