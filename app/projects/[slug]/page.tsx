import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadButton } from "@/components/DownloadButton";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.tagline } : {};
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-mono text-sm text-muted">{`// ${title}`}</h2>
      <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-accent">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="flex flex-col gap-10 pt-8">
      <header className="flex flex-col gap-4">
        <h1 className="font-mono text-3xl font-semibold tracking-tight">{project.name}</h1>
        <p className="text-lg text-muted">{project.tagline}</p>
        <p className="font-mono text-xs text-muted">
          {project.platforms.join(" · ")} · licencia {project.licence} ·{" "}
          <a href={`https://github.com/${project.repo}`} className="underline hover:text-foreground">
            código fuente
          </a>
        </p>
      </header>

      <DownloadButton repo={project.repo} />

      <section className="flex flex-col gap-3">
        {project.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <List title="características" items={project.features} />
      <List title="requisitos" items={project.requirements} />

      {project.notice && (
        <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">{project.notice}</p>
      )}
    </article>
  );
}
