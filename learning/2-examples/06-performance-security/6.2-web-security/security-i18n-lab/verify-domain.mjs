import { strict as assert } from "node:assert";
import { createLocale, formatDate, formatMoney } from "./messages.mjs";
const records = [];
function check(name, run) {
  run();
  records.push({ name, passed: true });
}
check("parameters, fallback, English plurals", () => {
  const i = createLocale("en");
  assert.equal(i.global.t("greeting", { name: "Ada" }), "Hello, Ada");
  assert.equal(i.global.t("count", 0), "No courses");
  assert.equal(i.global.t("count", 1), "One course");
  assert.equal(i.global.t("count", 3, { count: 3 }), "3 courses");
  assert.equal(
    createLocale("zh-CN").global.t("fallbackOnly"),
    "Fallback message",
  );
});
check("Arabic categories and per-instance locale isolation", () => {
  const a = createLocale("ar"),
    b = createLocale("en");
  assert.equal(a.global.t("count", 2), "دورتان");
  assert.equal(new Intl.PluralRules("ar").select(11), "many");
  a.global.locale.value = "zh-CN";
  assert.equal(b.global.locale.value, "en");
  assert.equal(b.global.t("greeting", { name: "Ada" }), "Hello, Ada");
});
check("explicit UTC and number format parts", () => {
  assert.equal(formatDate("en"), "11/25/2026");
  assert.ok(formatMoney("en").includes("1,234.50"));
  const parts = new Intl.DateTimeFormat("en", {
    day: "numeric",
    timeZone: "UTC",
  }).formatToParts(new Date("2026-11-25T23:30:00Z"));
  assert.equal(parts.find((p) => p.type === "day").value, "25");
});
check("unsupported locale rejected", () =>
  assert.throws(() => createLocale("invalid")),
);
console.log(
  JSON.stringify(
    {
      checks: records,
      passed: records.length,
      scope: "pure Intl/vue-i18n; not real SSR or screen reader",
    },
    null,
    2,
  ),
);
