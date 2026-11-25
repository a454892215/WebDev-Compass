import {
  prefixHeights,
  visibleRange,
  preserveAnchor,
  yieldMain,
  queueIdle,
} from "./logic.mjs";
import { TaskPool } from "./pool.mjs";
const $ = (id) => document.getElementById(id);
const observations = { longtasks: [], events: [] };
const observers = [];
for (const type of ["longtask", "event"])
  if (PerformanceObserver.supportedEntryTypes.includes(type)) {
    const observer = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        const row = {
          name: e.name,
          startTime: e.startTime,
          duration: e.duration,
        };
        if (type === "event")
          Object.assign(row, {
            interactionId: e.interactionId,
            processingStart: e.processingStart,
            processingEnd: e.processingEnd,
          });
        observations[type === "event" ? "events" : "longtasks"].push(row);
      }
    });
    observer.observe({
      type,
      buffered: true,
      ...(type === "event" ? { durationThreshold: 16 } : {}),
    });
    observers.push(observer);
  }
function burn(ms) {
  const until = performance.now() + ms;
  while (performance.now() < until) {}
}
$("block").onclick = () => {
  const start = performance.now();
  $("feedback").textContent = "已设置反馈，但同步阻塞期间未保证已绘制";
  burn(90);
  $("task-result").textContent = JSON.stringify({
    kind: "blocking",
    duration: performance.now() - start,
  });
};
let epoch = 0;
$("slice").onclick = async () => {
  const id = ++epoch,
    start = performance.now();
  $("feedback").textContent = "分片处理中，可取消";
  let steps = 0;
  for (let i = 0; i < 6; i++) {
    if (id !== epoch) return;
    burn(12);
    steps++;
    await yieldMain();
  }
  if (id !== epoch) return;
  $("task-result").textContent = JSON.stringify({
    kind: "sliced",
    steps,
    duration: performance.now() - start,
  });
  $("feedback").textContent = "分片完成";
};
$("cancel").onclick = () => {
  epoch++;
  $("feedback").textContent = "分片已取消，旧结果不再回写";
};
class Stage9RetainedPanel {
  constructor(index) {
    this.node = document.createElement("div");
    this.node.textContent = `Detached teaching panel ${index}`;
    document.body.append(this.node);
    this.node.remove();
    this.listener = () => (this.node.dataset.last = "event");
    window.addEventListener("stage9-panel-event", this.listener);
  }
  dispose() {
    window.removeEventListener("stage9-panel-event", this.listener);
    this.node = null;
    this.listener = null;
  }
}
const retainedPanels = [];
function leak() {
  for (let i = 0; i < 20; i++) retainedPanels.push(new Stage9RetainedPanel(i));
  $("memory").textContent = `${retainedPanels.length} 个强引用`;
}
function clean() {
  for (const panel of retainedPanels) panel.dispose();
  retainedPanels.length = 0;
  $("memory").textContent = "0 个强引用";
}
$("leak").onclick = leak;
$("clean").onclick = clean;
const heights = Array.from({ length: 1000 }, (_, i) => 32 + (i % 4) * 8);
let prefix = prefixHeights(heights),
  full = false;
function render() {
  const viewport = $("viewport"),
    list = $("list"),
    range = full
      ? { start: 0, end: heights.length }
      : visibleRange(prefix, viewport.scrollTop, viewport.clientHeight);
  const fragment = document.createDocumentFragment();
  for (let i = range.start; i < range.end; i++) {
    const row = document.createElement("div");
    row.role = "listitem";
    row.dataset.index = String(i);
    row.setAttribute("aria-posinset", String(i + 1));
    row.setAttribute("aria-setsize", "1000");
    row.style.top = `${prefix[i]}px`;
    row.style.height = `${heights[i]}px`;
    row.textContent = `课程第 ${i + 1} 行，高度 ${heights[i]}px`;
    fragment.append(row);
  }
  list.style.height = `${prefix.at(-1)}px`;
  list.replaceChildren(fragment);
  $("range").textContent =
    `${full ? "全量" : "窗口"} DOM ${range.end - range.start} / 1000`;
}
$("viewport").onscroll = render;
$("full").onclick = () => {
  full = !full;
  render();
};
$("grow").onclick = () => {
  const old = prefix,
    scroll = $("viewport").scrollTop;
  heights[0] += 20;
  prefix = prefixHeights(heights);
  $("viewport").scrollTop = preserveAnchor(old, prefix, scroll);
  render();
};
render();
const pool = new TaskPool();
let cancelIdle = null;
$("worker").onclick = async () => {
  try {
    const values = new Uint32Array(10000).fill(1);
    const promise = pool.submit(values.buffer);
    const detached = values.byteLength === 0;
    $("background").textContent =
      `Worker结果 ${await promise}，主线程buffer已转移=${detached}`;
  } catch (error) {
    $("background").textContent = error.message;
  }
};
$("idle").onclick = () => {
  cancelIdle?.();
  cancelIdle = queueIdle((deadline) => {
    $("background").textContent =
      `空闲回调 didTimeout=${deadline.didTimeout}，预算=${deadline.timeRemaining()}`;
  });
};
function dispose() {
  epoch++;
  cancelIdle?.();
  pool.dispose();
  clean();
  for (const observer of observers) observer.disconnect();
}
window.addEventListener("pagehide", dispose, { once: true });
window.stage9Runtime = {
  observations,
  leak,
  clean,
  retainedPanels,
  pool,
  queueIdle,
  getWindow: () => ({
    scroll: $("viewport").scrollTop,
    prefix: [...prefix],
    count: $("list").children.length,
  }),
  dispose,
};
