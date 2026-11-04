import { formatSize, getLatestRelease } from "@/lib/github";

const dateFormat = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" });

export async function DownloadButton({ repo }: { repo: string }) {
  const release = await getLatestRelease(repo);

  if (!release) {
    return (
      <span className="inline-flex min-h-12 w-fit items-center rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-widest text-faint">
        Próximamente
      </span>
    );
  }

  const href = release.installer?.url ?? release.pageUrl;

  return (
    <div className="flex flex-col gap-3">
      <a
        href={href}
        className="inline-flex min-h-12 w-fit items-center gap-4 rounded-full bg-foreground px-7 py-3 font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-white"
      >
        Descargar para Windows
        <span className="opacity-60">v{release.version}</span>
      </a>
      <p className="font-mono text-xs text-faint">
        {release.installer && `${formatSize(release.installer.size)} · `}
        {dateFormat.format(new Date(release.publishedAt))} ·{" "}
        <a href={release.pageUrl} className="underline underline-offset-4 hover:text-foreground">
          notas de la versión
        </a>
      </p>
    </div>
  );
}
