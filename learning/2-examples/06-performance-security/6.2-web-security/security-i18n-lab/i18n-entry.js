import { createApp, h, ref } from "vue";
import { createLocale, formatDate, formatMoney } from "./messages.mjs";
import "./style.css";
const i18n = createLocale("en");
createApp({
  setup() {
    const count = ref(3);
    return () =>
      h("main", [
        h("h1", "Internationalization boundary lab"),
        h("label", { for: "locale" }, "Language"),
        h(
          "select",
          {
            id: "locale",
            value: i18n.global.locale.value,
            onChange: (event) => {
              i18n.global.locale.value = event.target.value;
              document.documentElement.lang = event.target.value;
              document.documentElement.dir =
                event.target.value === "ar" ? "rtl" : "ltr";
            },
          },
          ["zh-CN", "en", "ar"].map((v) => h("option", { value: v }, v)),
        ),
        h("p", { id: "greeting" }, i18n.global.t("greeting", { name: "Ada" })),
        h(
          "p",
          { id: "count" },
          i18n.global.t("count", count.value, { count: count.value }),
        ),
        h("p", { id: "date" }, formatDate(i18n.global.locale.value)),
        h("p", { id: "money" }, formatMoney(i18n.global.locale.value)),
        h("p", { id: "fallback" }, i18n.global.t("fallbackOnly")),
        h("div", { class: "row" }, [
          h("span", { class: "start" }, "START"),
          h("span", { class: "end" }, "END"),
        ]),
        h(
          "p",
          "This independent lab is CSR; Nuxt SSR is validated separately.",
        ),
      ]);
  },
})
  .use(i18n)
  .mount("#app");
