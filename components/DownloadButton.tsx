import { Icon } from "@/components/Icon";
import { buttonDisabled, buttonPrimary } from "@/components/styles";
import { localeTags } from "@/lib/i18n";
import { formatSize, getLatestRelease } from "@/lib/github";
import { getDict, getLang } from "@/lib/locale";

export async function DownloadButton({ repo }: { repo: string }) {
  const lang = await getLang();
  const t = await getDict();
  const release = await getLatestRelease(repo);

  if (!release) {
    return <span className={buttonDisabled}>{t.project.soon}</span>;
  }

  const href = release.installer?.url ?? release.pageUrl;
  const date = new Intl.DateTimeFormat(localeTags[lang].intl, { dateStyle: "long" });

  return (
    <div className="flex flex-col gap-3">
      <a href={href} className={buttonPrimary}>
        <Icon name="download" /> {t.project.download}
        <span className="font-mono text-xs opacity-60">v{release.version}</span>
      </a>
      <p className="font-mono text-xs text-faint">
        {release.installer && `${formatSize(release.installer.size)} · `}
        {date.format(new Date(release.publishedAt))} ·{" "}
        <a href={release.pageUrl} className="underline underline-offset-4 hover:text-foreground">
          {t.project.notes}
        </a>
      </p>
    </div>
  );
}
