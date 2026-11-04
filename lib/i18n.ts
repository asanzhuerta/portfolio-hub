export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** A value written once per language. */
export type Localized<T = string> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** BCP 47 tags for dates and the Open Graph locale. */
export const localeTags: Record<Locale, { intl: string; og: string }> = {
  es: { intl: "es-ES", og: "es_ES" },
  en: { intl: "en-GB", og: "en_GB" },
};

/** `path` is relative to the language root: "" for home, "/paralelos", "/projects/x". */
export function href(lang: Locale, path = ""): string {
  return `/${lang}${path}`;
}
