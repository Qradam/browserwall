export const LOCALES = ["en", "ru", "fr", "pt", "cs"] as const;
export type Locale = (typeof LOCALES)[number];
export const ALT_LOCALES = ["ru", "fr", "pt", "cs"] as const;
export type AltLocale = (typeof ALT_LOCALES)[number];

export const LOCALE_META: Record<Locale, { name: string; short: string; og: string; intl: string }> = {
  en: { name: "English", short: "EN", og: "en_US", intl: "en-US" },
  ru: { name: "Русский", short: "RU", og: "ru_RU", intl: "ru-RU" },
  fr: { name: "Français", short: "FR", og: "fr_FR", intl: "fr-FR" },
  pt: { name: "Português", short: "PT", og: "pt_BR", intl: "pt-BR" },
  cs: { name: "Čeština", short: "CS", og: "cs_CZ", intl: "cs-CZ" },
};

export const LOCALIZED_BASES = ["/", "/quiz", "/wall", "/tiers"] as const;

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v);
}

export function isLocalizedBase(base: string): boolean {
  return (LOCALIZED_BASES as readonly string[]).includes(base);
}

export function stripLocale(path: string): { lang: Locale; base: string } {
  const m = path.match(/^\/(ru|fr|pt|cs)(\/.*)?$/);
  if (!m) return { lang: "en", base: path || "/" };
  return { lang: m[1] as Locale, base: m[2] || "/" };
}

export function localePath(base: string, lang: Locale): string {
  if (lang === "en") return base;
  return base === "/" ? `/${lang}` : `/${lang}${base}`;
}

export function localizedHref(path: string, lang: Locale): string {
  return isLocalizedBase(path) ? localePath(path, lang) : path;
}

export function updatedMonth(lang: Locale, date: Date): string {
  return date.toLocaleDateString(LOCALE_META[lang].intl, { month: "long", year: "numeric" });
}

export type PluralForms = readonly [string, string, string?];

export function pluralForm(n: number, forms: PluralForms, lang: Locale): string {
  const abs = Math.abs(n);
  if (lang === "ru") {
    const m10 = abs % 10;
    const m100 = abs % 100;
    if (m10 === 1 && m100 !== 11) return forms[0];
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return forms[1];
    return forms[2] ?? forms[1];
  }
  if (lang === "cs") {
    if (abs === 1) return forms[0];
    if (abs >= 2 && abs <= 4) return forms[1];
    return forms[2] ?? forms[1];
  }
  if (lang === "fr") return abs <= 1 ? forms[0] : forms[1];
  return abs === 1 ? forms[0] : forms[1];
}

export const formatCount = (n: number, forms: PluralForms, lang: Locale) => `${n} ${pluralForm(n, forms, lang)}`;
