import "./style.css";
// STAGE10_SOURCE_COMMENT: hidden maps can retain source comments.
document.querySelector("#label").textContent =
  import.meta.env.VITE_PUBLIC_LABEL;
let cleanup = () => {},
  epoch = 0;
function disable(label) {
  epoch++;
  cleanup();
  cleanup = () => {};
  localStorage.removeItem("stage10:optional-id");
  document.querySelector("#status").textContent = label;
}
document.querySelector("#accept").addEventListener("click", async () => {
  const revision = ++epoch;
  const { startOptional } = await import("./optional.mjs");
  if (revision !== epoch) return;
  cleanup();
  cleanup = startOptional();
  document.querySelector("#status").textContent = "可选演示已允许";
});
document
  .querySelector("#reject")
  .addEventListener("click", () => disable("已拒绝，可选能力不再运行"));
document
  .querySelector("#withdraw")
  .addEventListener("click", () => disable("已撤回，可选数据已清除"));
window.addEventListener("pagehide", () => cleanup(), { once: true });
