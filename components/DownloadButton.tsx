import { formatSize, getLatestRelease } from "@/lib/github";

const dateFormat = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" });

export async function DownloadButton({ repo }: { repo: string }) {
  const release = await getLatestRelease(repo);
  const repoUrl = `https://github.com/${repo}`;

  if (!release) {
    return (
      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit cursor-not-allowed items-center rounded-lg border border-border px-5 py-3 font-medium text-muted">
          Próximamente
        </span>
        <p className="text-sm text-muted">
          Aún no hay ninguna versión publicada. Sigue el progreso en{" "}
          <a href={repoUrl} className="underline hover:text-foreground">
            GitHub
          </a>
          .
        </p>
      </div>
    );
  }

  const href = release.installer?.url ?? release.pageUrl;

  return (
    <div className="flex flex-col gap-2">
      <a
        href={href}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Descargar para Windows
        <span className="font-mono text-sm opacity-80">v{release.version}</span>
      </a>
      <p className="font-mono text-xs text-muted">
        {release.installer && `${release.installer.name} · ${formatSize(release.installer.size)} · `}
        {dateFormat.format(new Date(release.publishedAt))} ·{" "}
        <a href={release.pageUrl} className="underline hover:text-foreground">
          notas de la versión
        </a>
      </p>
    </div>
  );
}
