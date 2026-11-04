import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/LegalArticle";
import { cookiePolicy } from "@/content/legal";
import { profile } from "@/content/profile";
import { href, isLocale } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

const path = "/cookies";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: cookiePolicy[lang].title,
    alternates: { canonical: href(lang, path), languages: { es: href("es", path), en: href("en", path) } },
  };
}

export default async function CookiesPage({ params }: PageProps<"/[lang]/cookies">) {
  if (!isLocale((await params).lang)) notFound();
  const lang = await getLang();
  const t = await getDict();
  return (
    <LegalArticle page={cookiePolicy[lang]} lang={lang} email={profile.email} emailLabel={t.legal.email} updatedLabel={t.legal.updated} />
  );
}
