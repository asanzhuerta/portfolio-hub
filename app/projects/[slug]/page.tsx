import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DownloadButton } from "@/components/DownloadButton";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonSecondary, panel } from "@/components/styles";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.tagline } : {};
}

function List({ index, title, items }: { index: string; title: string; items: string[] }) {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeading index={index} title={title} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={item}
            data-reveal
            style={{ "--i": i % 4 } as React.CSSProperties}
            className={`${panel} flex gap-3 p-4`}
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

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
              {project.platforms.join(" · ")} · Licencia {project.licence}
            </p>
          </div>
        </div>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="max-w-2xl text-xl leading-relaxed text-muted">
          {project.tagline}
        </p>
        <div data-reveal style={{ "--i": 2 } as React.CSSProperties} className="flex flex-wrap items-start gap-3">
          <DownloadButton repo={project.repo} />
          <a href={`https://github.com/${project.repo}`} className={buttonSecondary}>
            <Icon name="github" /> Código fuente
          </a>
        </div>
      </header>

      <section className="flex max-w-3xl flex-col gap-5 text-lg leading-relaxed">
        {project.description.map((paragraph, i) => (
          <p key={paragraph} data-reveal style={{ "--i": i } as React.CSSProperties}>
            {paragraph}
          </p>
        ))}
      </section>

      <List index="01" title="Características" items={project.features} />
      <List index="02" title="Requisitos" items={project.requirements} />

      {project.notice && (
        <p data-reveal className="max-w-3xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">
          {project.notice}
        </p>
      )}
    </article>
  );
}
