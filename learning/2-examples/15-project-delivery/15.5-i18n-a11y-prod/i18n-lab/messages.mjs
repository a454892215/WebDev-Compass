import { IntlMessageFormat } from "intl-messageformat";
const loaders = {
  en: () => import("./messages-en.mjs"),
  ar: () => import("./messages-ar.mjs"),
};
export function createMessages() {
  const cache = new Map();
  return async function format(locale, key, values) {
    if (!Object.hasOwn(loaders, locale)) throw new Error("unsupported-locale");
    if (!cache.has(locale))
      cache.set(
        locale,
        loaders[locale]()
          .then((module) => module.default)
          .catch((error) => {
            cache.delete(locale);
            throw error;
          }),
      );
    const messages = await cache.get(locale);
    if (!Object.hasOwn(messages, key)) throw new Error("missing-key");
    return new IntlMessageFormat(messages[key], locale).format(values);
  };
}
export function instantParts(iso, zone) {
  if (!/(Z|[+-]\d\d:\d\d)$/.test(iso)) throw new Error("offset-required");
  const date = new Date(iso);
  if (!Number.isFinite(date.valueOf())) throw new Error("invalid-instant");
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .formatToParts(date)
    .filter((p) => p.type !== "literal")
    .reduce((o, p) => ((o[p.type] = p.value), o), {});
}
