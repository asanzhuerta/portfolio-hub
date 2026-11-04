import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { panel } from "@/components/styles";
import { sideProjects } from "@/content/sideProjects";
import { href, isLocale } from "@/lib/i18n";
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

      <ul className="flex flex-col gap-6">
        {sideProjects.map((project, i) => (
          <li key={project.slug} id={project.slug} className="scroll-mt-24">
            <article
              data-reveal
              className={`${panel} group relative isolate flex min-h-[28rem] flex-col justify-between gap-10 overflow-hidden p-6 sm:min-h-[34rem] sm:p-10`}
            >
              {/* A cold glow behind the mark, like stage light through smoke. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_52%,rgb(47_82_230/0.22),transparent_70%)]"
              />
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                  {project.kind[lang]}
                </span>
                <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="flex flex-1 items-center justify-center py-4">
                {project.logo ? (
                  <Image
                    src={project.logo.src}
                    alt={project.name[lang]}
                    width={project.logo.width}
                    height={project.logo.height}
                    sizes="(min-width: 1152px) 720px, 85vw"
                    className="h-auto w-full max-w-[720px] opacity-90 drop-shadow-[0_0_28px_rgb(91_124_255/0.35)] transition duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                  />
                ) : (
                  <h2 className="text-center font-display text-5xl font-extrabold uppercase leading-none tracking-[0.12em] text-foreground/90 drop-shadow-[0_0_28px_rgb(91_124_255/0.35)] sm:text-7xl lg:text-8xl">
                    {project.name[lang]}
                  </h2>
                )}
              </div>

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-2">
                  {project.logo && <h2 className="font-display text-2xl font-semibold tracking-tight">{project.name[lang]}</h2>}
                  <p className="max-w-md text-muted">{project.summary[lang]}</p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{t.side.soon}</span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
