import { cacheLife } from "next/cache";

export type Release = {
  version: string;
  publishedAt: string;
  /** Release page on GitHub. */
  pageUrl: string;
  /** Direct download of the Windows installer, when the release has one. */
  installer: { name: string; url: string; size: number } | null;
};

type GitHubAsset = { name: string; browser_download_url: string; size: number };
type GitHubRelease = {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets: GitHubAsset[];
};

/** Picks the NSIS installer that tauri-action uploads (`*_x64-setup.exe`), preferring x64. */
export function pickInstaller(assets: GitHubAsset[]): GitHubAsset | undefined {
  const exes = assets.filter((asset) => asset.name.toLowerCase().endsWith(".exe"));
  const setups = exes.filter((asset) => asset.name.toLowerCase().endsWith("-setup.exe"));
  const isX64 = (asset: GitHubAsset) => /x64|amd64/i.test(asset.name);
  return setups.find(isX64) ?? setups[0] ?? exes.find(isX64) ?? exes[0];
}

export function toRelease(data: GitHubRelease): Release {
  const installer = pickInstaller(data.assets);
  return {
    version: data.tag_name.replace(/^v/, ""),
    publishedAt: data.published_at,
    pageUrl: data.html_url,
    installer: installer
      ? { name: installer.name, url: installer.browser_download_url, size: installer.size }
      : null,
  };
}

/**
 * Latest published release of `repo` ("owner/name"), or null when there is none
 * (drafts and pre-releases are ignored by GitHub) or the API is unavailable.
 */
export async function getLatestRelease(repo: string): Promise<Release | null> {
  "use cache";
  cacheLife("hours");

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-hub",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
    if (!res.ok) return null;
    return toRelease((await res.json()) as GitHubRelease);
  } catch {
    return null;
  }
}

export function formatSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
