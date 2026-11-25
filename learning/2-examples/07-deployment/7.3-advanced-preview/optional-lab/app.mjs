import { wasmAdd, validateSchema, validSeries } from "./logic.mjs";
class CourseCounter extends HTMLElement {
  count = 0;
  connections = 0;
  disconnections = 0;
  onTick = () => this.increment();
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open", delegatesFocus: true });
    const style = document.createElement("style");
    style.textContent =
      "button {font:inherit;color:#123b70;background:#fff;border:2px solid #123b70;min-height:44px;padding:.5rem} button:focus-visible {outline:3px solid #ae3300;outline-offset:3px}";
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.addEventListener("click", () => this.increment());
    root.append(style, this.button);
    this.update();
  }
  connectedCallback() {
    this.connections++;
    window.addEventListener("stage7-tick", this.onTick);
    this.update();
  }
  disconnectedCallback() {
    this.disconnections++;
    window.removeEventListener("stage7-tick", this.onTick);
  }
  increment() {
    this.count++;
    this.update();
    this.dispatchEvent(
      new CustomEvent("count-change", {
        bubbles: true,
        composed: true,
        detail: { count: this.count },
      }),
    );
  }
  update() {
    this.button.textContent = `课程计数 ${this.count}`;
  }
}
customElements.define("course-counter", CourseCounter);
const counter = document.querySelector("course-counter");
document.querySelector("#reconnect").addEventListener("click", () => {
  counter.remove();
  document.querySelector("#counter-mount").append(counter);
});
document
  .querySelector("#counter-mount")
  .addEventListener("count-change", (event) => {
    document.querySelector("#events").textContent =
      `收到 count-change: ${event.detail.count}`;
  });
document.querySelector("#wasm").addEventListener("click", async () => {
  document.querySelector("#wasm-result").textContent =
    `WASM add(7, 5) = ${await wasmAdd(7, 5)}`;
});
export function renderSchema(value) {
  const nodes = validateSchema(value); // validate the whole input before changing DOM
  const fragment = document.createDocumentFragment();
  for (const node of nodes) {
    const element = document.createElement(
      node.kind === "heading" ? "h3" : "p",
    );
    element.textContent = node.text;
    fragment.append(element);
  }
  document.querySelector("#schema-result").replaceChildren(fragment);
}
renderSchema({
  version: 1,
  nodes: [
    { kind: "heading", text: "声明式课程卡" },
    { kind: "text", text: "文本作为文本渲染，不执行脚本。" },
  ],
});
document.querySelector("#invalid-schema").addEventListener("click", () => {
  try {
    renderSchema({
      version: 1,
      nodes: [{ kind: "script", text: "window.__injected=1" }],
    });
  } catch (error) {
    document.querySelector("#schema-status").textContent =
      `拒绝：${error.message}`;
  }
});
const data = validSeries([
  { label: "构建", value: 30 },
  { label: "验证", value: 50 },
  { label: "发布", value: 20 },
]);
const svg = document.querySelector("#chart");
const tbody = document.querySelector("#data-body");
for (const [i, row] of data.entries()) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "0");
  rect.setAttribute("y", String(5 + i * 35));
  rect.setAttribute("width", String(row.value * 3));
  rect.setAttribute("height", "22");
  rect.setAttribute("fill", "#174b85");
  svg.append(rect);
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.scope = "row";
  th.textContent = row.label;
  const td = document.createElement("td");
  td.textContent = String(row.value);
  tr.append(th, td);
  tbody.append(tr);
}
// Explicit observation hooks for local tests, not an app API or auth boundary.
window.stage7Lab = { counter, renderSchema };
