import Link from "next/link";
import { href } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

export default async function NotFound() {
  const lang = await getLang();
  const t = await getDict();
  return (
    <div className="flex min-h-[60vh] flex-col justify-center gap-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">Error 404</p>
      <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] sm:text-7xl">{t.notFound.title}</h1>
      <Link href={href(lang)} className="w-fit font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground">
        {t.notFound.back}
      </Link>
    </div>
  );
}
