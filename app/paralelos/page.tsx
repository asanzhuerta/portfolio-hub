import type { Metadata } from "next";
import { sideProjects } from "@/content/sideProjects";

export const metadata: Metadata = {
  title: "Proyectos paralelos",
  description: "Mi banda y Orion Rituals, mi marca de festivales.",
};

export default function SideProjectsPage() {
  return (
    <div className="flex flex-col gap-20 pb-32 pt-24">
      <header className="flex flex-col gap-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Fuera del código</p>
        <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight">
          Proyectos <em className="text-muted">paralelos</em>
        </h1>
      </header>

      <ul className="grid gap-6 md:grid-cols-2">
        {sideProjects.map((project, i) => (
          <li
            key={project.slug}
            id={project.slug}
            className="reveal flex min-h-[28rem] scroll-mt-24 flex-col justify-between gap-10 border border-line bg-background/30 p-8 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-4 font-mono text-xs uppercase tracking-widest text-faint">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{project.kind}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-5xl tracking-tight sm:text-6xl">{project.name}</h2>
              <p className="max-w-sm text-muted">{project.summary}</p>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Próximamente</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
