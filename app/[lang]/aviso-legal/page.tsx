import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/LegalArticle";
import { legalNotice } from "@/content/legal";
import { profile } from "@/content/profile";
import { href, isLocale } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

const path = "/aviso-legal";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: legalNotice[lang].title,
    alternates: { canonical: href(lang, path), languages: { es: href("es", path), en: href("en", path) } },
  };
}

export default async function LegalNoticePage({ params }: PageProps<"/[lang]/aviso-legal">) {
  if (!isLocale((await params).lang)) notFound();
  const lang = await getLang();
  const t = await getDict();
  return (
    <LegalArticle page={legalNotice[lang]} lang={lang} email={profile.email} emailLabel={t.legal.email} updatedLabel={t.legal.updated} />
  );
}
