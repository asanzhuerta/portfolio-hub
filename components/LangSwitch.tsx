"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

/** ES / EN pill: links to the same page in the other language. */
export function LangSwitch({ lang, label, names }: { lang: Locale; label: string; names: Record<Locale, string> }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");

  return (
    <nav aria-label={label}>
      <ul className="flex font-mono text-[11px] uppercase tracking-widest">
        {locales.map((locale) => {
          const current = locale === lang;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}${rest}`}
                hrefLang={locale}
                lang={locale}
                title={names[locale]}
                aria-current={current ? "true" : undefined}
                className={`inline-flex min-h-11 min-w-8 items-center justify-center rounded-full px-1.5 transition-colors sm:px-2 ${
                  current ? "text-foreground" : "text-faint hover:text-foreground"
                }`}
              >
                <span className={current ? "border-b border-accent pb-px" : "pb-px"}>{locale}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
