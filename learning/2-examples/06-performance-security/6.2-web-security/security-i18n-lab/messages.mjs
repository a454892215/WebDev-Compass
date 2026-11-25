import { createI18n } from "vue-i18n";
export const messages = {
  "zh-CN": {
    greeting: "你好，{name}",
    count: "没有课程 | 一门课程 | {count} 门课程",
  },
  en: {
    greeting: "Hello, {name}",
    count: "No courses | One course | {count} courses",
    fallbackOnly: "Fallback message",
  },
  ar: {
    greeting: "مرحبًا، {name}",
    count:
      "لا دورات | دورة واحدة | دورتان | {count} دورات | {count} دورة | {count} دورة",
  },
};
export const locales = ["zh-CN", "en", "ar"];
export function createLocale(locale) {
  if (!locales.includes(locale)) throw new Error("Unsupported locale");
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: "en",
    messages,
    missingWarn: false,
    fallbackWarn: false,
    pluralRules: {
      ar: (choice) =>
        ["zero", "one", "two", "few", "many", "other"].indexOf(
          new Intl.PluralRules("ar").select(choice),
        ),
    },
  });
}
export function formatDate(locale) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date("2026-11-25T23:30:00Z"));
}
export function formatMoney(locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(1234.5);
}
