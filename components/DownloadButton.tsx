import { Icon } from "@/components/Icon";
import { buttonDisabled, buttonPrimary } from "@/components/styles";
import { formatSize, getLatestRelease } from "@/lib/github";

const dateFormat = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" });

export async function DownloadButton({ repo }: { repo: string }) {
  const release = await getLatestRelease(repo);

  if (!release) {
    return <span className={buttonDisabled}>Próximamente</span>;
  }

  const href = release.installer?.url ?? release.pageUrl;

  return (
    <div className="flex flex-col gap-3">
      <a href={href} className={buttonPrimary}>
        <Icon name="download" /> Descargar para Windows
        <span className="font-mono text-xs opacity-60">v{release.version}</span>
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
