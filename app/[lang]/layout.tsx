import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { InkBackground } from "@/components/InkBackground";
import { LangSwitch } from "@/components/LangSwitch";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import { profile } from "@/content/profile";
import { href, localeTags, locales } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = await getDict();
  const title = `${profile.name} · ${profile.title}`;
  return {
    metadataBase: new URL(profile.website),
    title: { default: title, template: `%s · ${profile.name}` },
    description: t.meta.description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: profile.website }],
    creator: profile.name,
    keywords: [profile.name, profile.title, ...profile.focus, "Cover_Maker", "Orion Rituals"],
    alternates: {
      canonical: href(lang),
      languages: { es: href("es"), en: href("en"), "x-default": href("es") },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title,
      description: t.meta.description,
      url: href(lang),
      locale: localeTags[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeTags[l].og),
    },
    twitter: { card: "summary_large_image", title, description: t.meta.description },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const t = await getDict();
  const nav = [
    { href: `${href(lang)}#bio`, label: t.nav.bio, mobile: false },
    { href: `${href(lang)}#proyectos`, label: t.nav.projects, mobile: true },
    { href: href(lang, "/paralelos"), label: t.nav.side, mobile: true },
    { href: `${href(lang)}#contacto`, label: t.nav.contact, mobile: true },
  ];

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <InkBackground />
        <RevealObserver />
        <SmoothScroll />
        <header className="sticky top-0 z-20 border-b border-line bg-background/50 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-8">
            <Link href={href(lang)} className="whitespace-nowrap font-display text-[15px] font-semibold tracking-tight">
              <span className="sm:hidden">A. Sanz</span>
              <span className="hidden sm:inline">Alejandro Sanz</span>
              <span className="text-accent">.</span>
            </Link>
            <div className="flex items-center gap-1 sm:gap-3">
              <nav aria-label={t.nav.label}>
                <ul className="flex text-[13px] text-muted sm:gap-1 sm:text-sm">
                  {nav.map((item) => (
                    <li key={item.href} className={item.mobile ? undefined : "hidden sm:block"}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-11 items-center rounded-full px-2 transition-colors sm:px-3 hover:bg-white/5 hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
              <LangSwitch lang={lang} label={t.language.label} names={t.language} />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-8">{children}</main>
        <footer className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-4 border-t border-line px-4 py-8 font-mono text-xs text-faint sm:px-8">
          <span>© {profile.name}</span>
          <span>asanzhuerta.netlify.app</span>
        </footer>
      </body>
    </html>
  );
}
