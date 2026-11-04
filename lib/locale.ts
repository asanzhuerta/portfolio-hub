import { lang } from "next/root-params";
import { dictionaries } from "@/content/ui";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

/** Language of the current route; unknown segments (a 404) fall back to Spanish. */
export async function getLang(): Promise<Locale> {
  const value = await lang();
  return value && isLocale(value) ? value : defaultLocale;
}

export async function getDict() {
  return dictionaries[await getLang()];
}
