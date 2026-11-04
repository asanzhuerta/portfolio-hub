import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { panel } from "@/components/styles";
import { sideProjects, type SideProject } from "@/content/sideProjects";
import { href, isLocale, type Locale } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = await getDict();
  return {
    title: t.side.title,
    description: t.meta.sideDescription,
    alternates: {
      canonical: href(lang, "/paralelos"),
      languages: { es: href("es", "/paralelos"), en: href("en", "/paralelos"), "x-default": href("es", "/paralelos") },
    },
    openGraph: { title: t.side.title, description: t.meta.sideDescription, url: href(lang, "/paralelos") },
  };
}

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Card({ project, index, lang, soon, open }: { project: SideProject; index: number; lang: Locale; soon: string; open: string }) {
  const glow = project.glow ?? "47 82 230";
  const body = (
    <>
      {/* A coloured glow behind the mark, like stage light through smoke. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 60% 45% at 50% 48%, rgb(${glow} / 0.24), transparent 72%)` }}
      />
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
          {project.kind[lang]}
        </span>
        <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="flex flex-1 items-center justify-center py-6">
        {project.logo ? (
          <Image
            src={project.logo.src}
            alt={project.name[lang]}
            width={project.logo.width}
            height={project.logo.height}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 85vw"
            loading="eager"
            className="h-auto w-full max-w-[320px] opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
            style={{ filter: `drop-shadow(0 0 22px rgb(${glow} / 0.4))` }}
          />
        ) : (
          <span
            className="text-center font-display text-4xl font-extrabold uppercase leading-none tracking-[0.1em] text-foreground/90"
            style={{ filter: `drop-shadow(0 0 22px rgb(${glow} / 0.4))` }}
          >
            {project.name[lang]}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-semibold tracking-tight">{project.name[lang]}</h2>
        <p className="text-sm leading-relaxed text-muted">{project.summary[lang]}</p>
        {project.page ? (
          <span className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest" style={{ color: `rgb(${glow})` }}>
            {open} <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        ) : (
          <span className="mt-2 font-mono text-[11px] uppercase tracking-widest text-accent">{soon}</span>
        )}
      </div>
    </>
  );
  const className = `${panel} group relative isolate flex h-full min-h-[24rem] flex-col justify-between overflow-hidden p-6`;
  return project.page ? (
    <Link href={href(lang, project.page)} className={`${className} transition-colors hover:border-line-strong`}>
      {body}
    </Link>
  ) : (
    <article className={className}>{body}</article>
  );
}

export default async function SideProjectsPage({ params }: PageProps<"/[lang]/paralelos">) {
  if (!isLocale((await params).lang)) notFound();
  const lang = await getLang();
  const t = await getDict();

  return (
    <div className="flex flex-col gap-16 pb-28 pt-16 sm:pt-24">
      <header className="flex flex-col gap-5">
        <p data-reveal className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {t.side.kicker}
        </p>
        <h1 data-reveal style={stagger(1)} className="font-display text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">
          {t.side.title}
        </h1>
        <p data-reveal style={stagger(2)} className="max-w-xl text-lg leading-relaxed text-muted">
          {t.side.intro}
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sideProjects.map((project, i) => (
          <li key={project.slug} id={project.slug} data-reveal style={stagger(i)} className="scroll-mt-24">
            <Card project={project} index={i} lang={lang} soon={t.side.soon} open={project.cta === "orion" ? t.orion.open : t.odisea.open} />
          </li>
        ))}
      </ul>
    </div>
  );
}
