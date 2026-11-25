import { selectCapabilities, createFormatter } from "./capabilities.mjs";
const forced = new URL(location.href).searchParams.get("fixture") === "missing";
const capability = selectCapabilities({
  listFormat: forced ? undefined : Intl.ListFormat,
});
let formatter;
try {
  formatter = await createFormatter(capability);
  document.querySelector("#feature-status").textContent =
    "增强模式：" + formatter.mode + (forced ? "（注入缺失能力）" : "");
  document.querySelector("#format").addEventListener("click", () => {
    document.querySelector("#result").textContent = formatter.format([
      "契约",
      "能力",
      "回退",
    ]);
  });
} catch {
  document.querySelector("#feature-status").textContent =
    "增强加载失败，仍可使用基础说明";
  document.querySelector("#format").disabled = true;
}
