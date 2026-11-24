const theme = document.querySelector("#theme");
const status = document.querySelector("#status");
if (!(theme instanceof HTMLSelectElement) || !(status instanceof HTMLElement))
  throw new Error("主题表单缺失");
theme.addEventListener("change", () => {
  const value = ["light", "dark"].includes(theme.value)
    ? theme.value
    : "system";
  if (value === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = value;
  const meta = document.querySelector('meta[name="color-scheme"]');
  meta?.setAttribute("content", value === "system" ? "light dark" : value);
  status.textContent = `当前：${theme.selectedOptions[0]?.textContent ?? "跟随系统"}`;
});
document.querySelector("#save")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  const saved = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(saved));
  status.textContent = saved ? "已收藏卡片" : "已取消收藏";
});
document.querySelector("#icon-only")?.addEventListener("click", () => {
  const help = document.querySelector("#help");
  if (help instanceof HTMLElement) help.hidden = !help.hidden;
});
