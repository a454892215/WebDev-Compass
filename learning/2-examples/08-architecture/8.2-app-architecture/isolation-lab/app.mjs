import { createRegistry, parseMessage, parseFields } from "./logic.mjs";
const registry = createRegistry();
const stats = { ticks: 0, accepted: 0, rejected: 0, unmounted: 0 };
registry.register("counter", 1, (root) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "插件计数";
  const tick = () => {
    stats.ticks++;
    document.querySelector("#ticks").textContent = String(stats.ticks);
  };
  window.addEventListener("lab-tick", tick);
  button.addEventListener("click", tick);
  root.append(button);
  return () => {
    window.removeEventListener("lab-tick", tick);
    button.remove();
    stats.unmounted++;
  };
});
let dispose = registry.mount("counter", document.querySelector("#mount"));
document.querySelector("#remount").addEventListener("click", () => {
  dispose();
  dispose();
  dispose = registry.mount("counter", document.querySelector("#mount"));
});
const shadow = document.querySelector("#shadow").attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = ".badge{color:rgb(15,76,129)}";
const badge = document.createElement("span");
badge.className = "badge";
badge.textContent = "Shadow标签";
shadow.append(style, badge);
const frame = document.querySelector("#trusted");
const trustedOrigin = "http://127.0.0.1:4516";
const receive = (event) => {
  try {
    if (event.origin !== trustedOrigin || event.source !== frame.contentWindow)
      throw new Error("Untrusted sender");
    const msg = parseMessage(event.data);
    stats.accepted++;
    document.querySelector("#message").textContent = msg.slug;
  } catch {
    stats.rejected++;
  }
};
window.addEventListener("message", receive);
function renderForm(fields) {
  const parsed = parseFields(fields);
  const fragment = document.createDocumentFragment();
  for (const field of parsed) {
    const label = document.createElement("label");
    label.textContent = field.label;
    const input = document.createElement("input");
    input.id = field.id;
    label.htmlFor = field.id;
    input.maxLength = 80;
    fragment.append(label, input);
  }
  document.querySelector("#fields").replaceChildren(fragment);
}
renderForm([{ id: "title", label: "标题" }]);
function route() {
  const path = location.pathname;
  document.querySelector("#route").textContent =
    path === "/" || path === "/catalog.html"
      ? "目录模块"
      : path === "/reports.html"
        ? "报表模块"
        : "404 未知模块";
}
document.querySelectorAll("[data-route]").forEach((a) =>
  a.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState({}, "", a.pathname);
    route();
  }),
);
window.addEventListener("popstate", route);
route();
window.lab = { stats, registry, dispose: () => dispose(), receive, renderForm };
