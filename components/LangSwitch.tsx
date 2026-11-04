"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { locales, type Locale } from "@/lib/i18n";

const FADE_MS = 280;

/**
 * ES / EN pill: links to the same page in the other language. The page fades
 * out, changes language in place (same scroll position) and fades back in.
 */
export function LangSwitch({ lang, label, names }: { lang: Locale; label: string; names: Record<Locale, string> }) {
  const pathname = usePathname();
  const router = useRouter();
  const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");

  // The new language has rendered: fade back in.
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.fade !== "out") return;
    const frame = requestAnimationFrame(() => delete root.dataset.fade);
    return () => cancelAnimationFrame(frame);
  }, [lang]);

  const change = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    document.documentElement.dataset.fade = "out";
    setTimeout(() => router.push(href + location.hash, { scroll: false }), FADE_MS);
  };

  return (
    <nav aria-label={label}>
      <ul className="flex font-mono text-[11px] uppercase tracking-widest">
        {locales.map((locale) => {
          const current = locale === lang;
          const href = `/${locale}${rest}`;
          return (
            <li key={locale}>
              <Link
                href={href}
                hrefLang={locale}
                lang={locale}
                title={names[locale]}
                aria-current={current ? "true" : undefined}
                onClick={current ? (event) => event.preventDefault() : (event) => change(event, href)}
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
