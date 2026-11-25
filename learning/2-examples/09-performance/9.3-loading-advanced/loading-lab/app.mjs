import { speculationPlan } from "./logic.mjs";
const stylesheet = document.querySelector("#noncritical");
function activate() {
  stylesheet.media = "all";
}
if (stylesheet.sheet) activate();
else stylesheet.addEventListener("load", activate, { once: true });
document.querySelector("#speculate").addEventListener("click", () => {
  const supported = Boolean(HTMLScriptElement.supports?.("speculationrules"));
  const plan = speculationPlan(supported, {
    saveData: Boolean(navigator.connection?.saveData),
  });
  if (plan && !document.querySelector('script[type="speculationrules"]')) {
    const script = document.createElement("script");
    script.type = "speculationrules";
    script.textContent = JSON.stringify(plan);
    document.head.append(script);
  }
  document.querySelector("#spec-status").textContent = plan
    ? "已添加公开页prefetch建议；浏览器可忽略，未声称已经预渲染。"
    : "当前不添加推测加载；仍可使用正常链接。";
});
