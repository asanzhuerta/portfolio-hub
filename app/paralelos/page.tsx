import type { Metadata } from "next";
import { panel } from "@/components/styles";
import { sideProjects } from "@/content/sideProjects";

export const metadata: Metadata = {
  title: "Proyectos paralelos",
  description: "Mi banda y Orion Rituals, mi marca de festivales.",
};

export default function SideProjectsPage() {
  return (
    <div className="flex flex-col gap-16 pb-28 pt-16 sm:pt-24">
      <header className="flex flex-col gap-5">
        <p data-reveal className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Fuera del código
        </p>
        <h1
          data-reveal
          style={{ "--i": 1 } as React.CSSProperties}
          className="font-display text-5xl font-semibold tracking-[-0.03em] sm:text-6xl"
        >
          Proyectos paralelos
        </h1>
      </header>

      <ul className="grid gap-5 md:grid-cols-2">
        {sideProjects.map((project, i) => (
          <li
            key={project.slug}
            id={project.slug}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className={`${panel} flex min-h-[24rem] scroll-mt-24 flex-col justify-between gap-10 p-8`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted">
                {project.kind}
              </span>
              <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-4xl font-semibold tracking-tight">{project.name}</h2>
              <p className="max-w-sm text-muted">{project.summary}</p>
              <span className="mt-2 font-mono text-xs uppercase tracking-widest text-accent">Próximamente</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
