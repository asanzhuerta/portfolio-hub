import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadButton } from "@/components/DownloadButton";
import { SectionHeading } from "@/components/SectionHeading";
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
    <section className="reveal flex flex-col gap-8">
      <SectionHeading index={index} title={title} />
      <ul className="grid gap-x-12 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="border-b border-line py-4 text-lg">
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
    <article className="flex flex-col gap-28 pb-32 pt-24">
      <header className="flex flex-col gap-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {project.platforms.join(" · ")} · Licencia {project.licence}
        </p>
        <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-tight">{project.name}</h1>
        <p className="max-w-2xl text-xl leading-relaxed text-muted">{project.tagline}</p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <DownloadButton repo={project.repo} />
          <a
            href={`https://github.com/${project.repo}`}
            className="w-fit font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            Código fuente ↗
          </a>
        </div>
      </header>

      <section className="reveal flex max-w-3xl flex-col gap-6 text-xl leading-relaxed">
        {project.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <List index="01" title="Características" items={project.features} />
      <List index="02" title="Requisitos" items={project.requirements} />

      {project.notice && (
        <p className="reveal max-w-3xl border-l border-accent pl-6 text-sm leading-relaxed text-muted">{project.notice}</p>
      )}
    </article>
  );
}
